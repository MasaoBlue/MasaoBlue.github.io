// https://stackoverflow.com/questions/754607/can-jquery-get-all-css-styles-associated-with-an-element
// 要素に適用されている全てのcssを取得する
let allCss = (a) => {
  var sheets = document.styleSheets, o = {};
  for (var i in sheets) {
    var rules = sheets[i].rules || sheets[i].cssRules;
    for (var r in rules) {
      if (a.is(rules[r].selectorText)) {
        o = $.extend(o, css2json(rules[r].style), css2json(a.attr('style')));
      }
    }
  }
  return o;
}

let css2json = (css) => {
  var s = {};
  if (!css) return s;
  if (css instanceof CSSStyleDeclaration) {
    for (var i in css) {
      if ((css[i]).toLowerCase) {
        s[(css[i]).toLowerCase()] = (css[css[i]]);
      }
    }
  } else if (typeof css == "string") {
    css = css.split("; ");
    for (var i in css) {
      var l = css[i].split(": ");
      s[l[0].toLowerCase()] = (l[1]);
    }
  }
  return s;
}

$(() => {
  let images = [
    {
      name: 'person',
      label: 'ヒト',
    },
    {
      name: 'company',
      label: '会社',
    },
    {
      name: 'money',
      label: 'カネ',
    },
    {
      name: 'thing',
      label: 'モノ',
    },
    {
      name: 'information',
      label: '情報',
    },
    {
      name: 'phone',
      label: 'スマホ',
    },
    {
      name: 'shop',
      label: '店舗',
    },
    {
      name: 'other',
      label: 'その他',
    },
    {
      name: 'delete',
      label: '消す',
    },
  ]
  let margin = {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  }
  let grid = {
    size: 260,
    rows: 3,
    cols: 3,
  }
  let marker = {
  }
  let data = {
    margin: margin,
    marker: marker,
    textField: {
      width: grid.size * 0.8,
      height: grid.size * 0.1,
    },
    grids: [...Array(grid.rows * grid.cols)].map((_, i) => {
      let imageRatio = 0.4
      let opt = {
        x: (i % 3) * grid.size,
        y: Math.floor(i / 3) * grid.size,
        width: grid.size,
        height: grid.size,
        active: false,
        text: '',
      }
      opt.image = {
        width: grid.size * imageRatio,
        height: grid.size * imageRatio,
      }
      opt.image.x = (-opt.image.width / 2) + (grid.size / 2)
      opt.image.y = (-opt.image.height / 2) + (grid.size / 2.5)
      return opt
    }),
    images: images.map((image, i) => {
      image.src = '/images/' + ('0000' + (i + 1)).substr(-5) + '.png'
      return image
    }),
    imageList: {
      x: 0,
      y: 0,
      visible: false,
    },
    lines: [],
    lineDrawing: false,
    tmpLinePoints: null,
    exportImage: false,
  }
  data.svg = {
    width: (grid.cols * grid.size) + margin.left + margin.right,
    height: (grid.rows * grid.size) + margin.top + margin.bottom,
  }
  data.textField.x = (grid.size - data.textField.width) / 2
  data.textField.y = grid.size * 0.7

  data.linePoints = [
    [grid.size / 2, grid.size * 0.1],
    [grid.size * 0.2, grid.size / 2],
    [grid.size * 0.8, grid.size / 2],
    [grid.size / 2, grid.size * 0.9],
  ]
  data.linePointSize = grid.size * 0.03

  let v = new Vue({
    el: "#app",
    data: data,
    methods: {
      onImageCellClick: (e) => {
        let selectedCell = $(e.target).closest('.cell').index()
        let selectedImage = v.images[selectedCell]
        v.imageList.x = 0
        v.imageList.y = 0
        v.imageList.visible = false
        v.grids.forEach((grid, i) => {
          if(grid.active){
            grid.image.src = selectedImage.name == 'delete' ? null : v.images[selectedCell].src
          }
        })
        v.selectGrid()
        e.preventDefault()
      },
      onGridMouseOver: (e) => {
        if(v.imageList.visible) return
        let selectedIndex = $(e.target).closest('g.grid').index()
        v.selectGrid(selectedIndex)
      },
      onGridContextMenu: (e) => {
        let selectedIndex = $(e.target).closest('g.grid').index()
        v.selectGrid(selectedIndex)
        v.imageList.x = e.clientX
        v.imageList.y = e.clientY
        v.imageList.visible = true
        e.preventDefault()
      },
      onAppClick: (e) => {
        if(!!$(e.target).closest('.imageList')[0]) return
        v.imageList.visible = false
        if(!v.imageList.visible){
          v.imageList.x = 0
          v.imageList.y = 0
        }
        e.preventDefault()
      },
      selectGrid: (selectIndex) => {
        v.grids.forEach((g, i) => {
          g.active = i == selectIndex
        })
      },
      onDrawLineClick: (e) => {
        v.lineDrawing = true
      },
      onLinePointClick: (e) => {
        if(v.lineDrawing){
          let gridIndex = $(e.target).closest('g.grid').index()
          let pointIndex = $(e.target).index()
          let bb = e.target.getBoundingClientRect()
          let svg = document.querySelector('svg .gridContainer')
          let svgbb = svg.getBoundingClientRect()
          bb.x = bb.x - svgbb.x
          bb.y = bb.y - svgbb.y
          let selfPoint = [bb.x + (bb.width / 2), bb.y + (bb.height / 2)]
          if(v.tmpLinePoints){
            if(v.tmpLinePoints[0][0] == selfPoint[0] && v.tmpLinePoints[0][1] == selfPoint[1]) return
            // 2点目
            let prevPoint = v.tmpLinePoints[v.tmpLinePoints.length - 1]
            let nextPoint = v.getNextLinePoint(selfPoint, pointIndex)
            if(prevPoint[0] != nextPoint[0] && prevPoint[1] != nextPoint[1]){
              if(v.tmpLinePoints[0][0] == v.tmpLinePoints[1][0]){
                // 上下の点から始まる場合
                v.tmpLinePoints.push([nextPoint[0], prevPoint[1]])
              }else{
                // 左右の点から始まる場合
                v.tmpLinePoints.push([prevPoint[0], nextPoint[1]])
              }
            }
            v.tmpLinePoints.push(nextPoint)
            v.tmpLinePoints.push(selfPoint)
            v.lines.push(v.tmpLinePoints)
            v.lineDrawing = false
            v.tmpLinePoints = null
          }else{
            // 1点目
            v.tmpLinePoints = [selfPoint]
            v.tmpLinePoints.push(v.getNextLinePoint(selfPoint, pointIndex))
          }
        }
      },
      onExportClick: (e) => {
        $('.exportImage img').remove()
        let svg = document.querySelector('svg')
        let cloneSvg = svg.cloneNode(true)
        let allElm = svg.querySelectorAll('*')
        let allCloneElm = cloneSvg.querySelectorAll('*')

        // canvasに反映できるよう、CSSの値をオブジェクトに直接書き込む
        allElm.forEach((elm, i) => {
          let $elm = $(allCloneElm[i])
          $elm.css(allCss($(elm)))
          if($elm.is('rect.bg')) $elm.css('stroke', 'none')
        })
        // imageはdataURLに変換しておく
        let promise = Promise.resolve()
        cloneSvg.querySelectorAll('image').forEach((elm) => {
          let src = elm.href.baseVal
          promise = promise.then(() => {
            return new Promise((resolve, reject) => {
              let canvas = document.createElement('canvas')
              let ctx = canvas.getContext('2d')
              let imageElm = new Image()
              imageElm.onload = () => {
                canvas.width = imageElm.naturalWidth
                canvas.height = imageElm.naturalHeight
                ctx.drawImage(imageElm, 0, 0)
                elm.href.baseVal = canvas.toDataURL()
                resolve()
              }
              imageElm.src = src
            })
          })
        })

        promise.then(() => {
          // 全てのimageタグの読み込みが終わったら全体をcanvasに転記
          let svgData = (new XMLSerializer).serializeToString(cloneSvg)
          let canvas = document.createElement('canvas')
          let ctx = canvas.getContext('2d')
          canvas.width = svg.width.baseVal.value
          canvas.height = svg.height.baseVal.value

          let imageElm = new Image
          imageElm.onload = () => {
            $('.exportImage .image').append(imageElm)
            $(imageElm).hide()
            ctx.drawImage(imageElm, 0, 0)
            $('<img>').attr('src', canvas.toDataURL("image/png")).appendTo('.exportImage .image')
            v.exportImage = true
          }
          imageElm.src = 'data:image/svg+xml;charset=utf-8;base64,' + btoa(unescape(encodeURIComponent(svgData)))
        })
      },
      getNextLinePoint: (point, pointIndex) => {
        point = {x: point[0], y: point[1]}
        let nextPoint
        if(pointIndex == 0){
          nextPoint = [point.x, Math.floor(point.y / grid.size) * grid.size]
        }else if(pointIndex == 1){
          nextPoint = [Math.floor(point.x / grid.size) * grid.size, point.y]
        }else if(pointIndex == 2){
          nextPoint = [(Math.floor(point.x / grid.size) + 1) * grid.size, point.y]
        }else if(pointIndex == 3){
          nextPoint = [point.x, (Math.floor(point.y / grid.size) + 1) * grid.size]
        }
        return nextPoint
      },
      onExportImageClose: (e) => {
        v.exportImage = false
      },
    },
  })
  console.log(v)
});
