# ノーツ数が取得できなかった曲のタイトルを保持
window.undefined_title = []

class TableManager
  # タイトルを公式CSVのものからnotes.csvのものに変換する
  # (公式CSVにはunicode文字が使われていないため）
  convert_title: (title) =>
    {
      '19，November': '19,November'
      'Sweet Sweet Magic': 'Sweet Sweet♥Magic'
      'Raspberry Heart(English version)': 'Raspberry♥Heart(English version)'
      'ピアノ協奏曲第１番”蠍火”': 'ピアノ協奏曲第1番"蠍火"'
      'ＵＬＴｉＭΛＴＥ': 'ULTiM∧TE'
      '100％ minimoo-G': '100% minimoo-G'
      'Double Loving Heart': 'Double♥♥Loving Heart'
      'Blind Justice ～Torn souls， Hurt Faiths ～': 'Blind Justice ～Torn souls, Hurt Faiths～'
      'never…': 'never...'
      '花吹雪 ～ IIDX LIMITED ～': '花吹雪 ～IIDX LIMITED～'
      'Ubertreffen': 'Übertreffen'
      'Punch Love 仮面': 'Punch Love♡仮面'
      'Raison d\'etre～交差する宿命～': 'Raison d\'être～交差する宿命～'
      'ワルツ第17番 ト短調”大犬のワルツ”': 'ワルツ第17番 ト短調"大犬のワルツ"'
      'A MINSTREL ～ ver. short-scape ～': 'A MINSTREL ～ver. short-scape～'
      '恋する☆宇宙戦争っ！！': '恋する☆宇宙戦争っ!!'
      'Light and Cyber…': 'Light and Cyber･･･'
      'Praludium': 'Präludium'
      'キャトられ恋はモ～モク': 'キャトられ♥恋はモ～モク'
      'ATHER': 'ÆTHER'
      'Atropos': 'Atröpøs'
      'Close the World feat. a☆ru': 'Close the World feat.a☆ru'
      '旋律のドグマ～Miserables～': '旋律のドグマ～Misérables～'
      '超!!遠距離らぶメ～ル': '超!!遠距離らぶ♡メ～ル'
      '表裏一体！？怪盗いいんちょの悩み': '表裏一体！？怪盗いいんちょの悩み♥'
      '!Viva!': '¡Viva!'
    }[title] or title

  # バージョン名を番号に変換
  to_version_num: (v) =>
    versions = [
      'IIDX RED'
      'HAPPY SKY'
      'DistorteD'
      'GOLD'
      'DJ TROOPERS'
      'EMPRESS'
      'SIRIUS'
      'Resort Anthem'
      'Lincle'
      'tricoro'
      'SPADA'
      'PENDUAL'
      'copula'
      'SINOBUZ'
    ]
    result = undefined
    if versions.indexOf(v) >= 0 then versions.indexOf(v) + 11 else v.match('\\d+')[0]

  # バージョン名を表示用に変換
  to_version_label: (v) =>
    versions =
      '1st&substream': '1st&s'
      'DJ TROOPERS': 'TROOPERS'
    if versions[v] then versions[v] else v.replace(' style', '')

  # スコアとノーツ数からランクを計算
  score_to_rank: (score, notes) =>
    split = 9
    max_score = notes * 2
    interval = max_score / split
    line_scores = _(split).times (i) =>
      Math.ceil(interval * (i + 1))
    next_score = _(line_scores).find (s) =>
      s >= score
    @rank_names[line_scores.indexOf(next_score)]

  # CSV文字列を配列に変換
  parse_csv: (text='') =>
    Papa.parse(text.trim()).data

  # CSVをロードする
  load_current_csv: =>
    $.ajax
      url: './csv/' + @csv_name
      success: (data) =>
        console.log('loaded', +new Date)
        @csv_data = data
        @create_table_with_timeout()

  # 列定義
  init_column_defs: =>
    reverse_order = ['desc', 'asc']
    @column_defs =
      version_number:
        visible: false
      version:
        orderSequence: reverse_order
      title: {}
      difficulty: {}
      level:
        orderSequence: reverse_order
      notes:
        orderSequence: reverse_order
      score_diff:
        visible: @with_old
        orderSequence: reverse_order
      score_diff_filter:
        visible: false
      score_bar:
        sortable: !@with_old
        orderSequence: reverse_order
      score_rate:
        sortable: !@with_old
        orderSequence: reverse_order
      score:
        visible: false
      rank:
        sortable: !@with_old
      next_rank:
        visible: false
        sortable: !@with_old
      prev_rank:
        visible: false
        sortable: !@with_old
      around_rank:
        sortable: !@with_old
      miss:
        sortable: !@with_old
        orderSequence: reverse_order
      clear_type:
        sortable: !@with_old
      play_count:
        sortable: !@with_old
        orderSequence: reverse_order
      date:
        sortable: !@with_old
        orderSequence: reverse_order

    # 表示列とソート列が違うもの
    _({
      version: 'version_number'
      score_bar: 'score'
    }).each (order_name, column_name) =>
      order_index = _(@column_defs).chain().keys().findIndex (name) ->
        name == order_name
      .value()
      @column_defs[column_name].orderData = [order_index]

  # 普通に実行するとhideされる前に処理が固まるのでsetTimeoutする
  create_table_with_timeout: =>
    $('content').hide()
    @score_viewer.show().css(visibility: 'hidden')
    @loading.show()
    setTimeout =>
      @create_table()
    , 100

  # CSVからテーブル作成
  create_table: =>
    @with_old = !!@with_old
    $('body').toggleClass('with_old', @with_old)
    @init_column_defs()

    window.csv = csv = @parse_csv(@csv_data)
    old_csv = @old_csv = @parse_csv(@old_csv_data)
    thead = @table.find('thead')
    tbody = @table.find('tbody')
    window.columns = []
    csv_columns = null
    old_csv_columns = null
    indexes = {}
    old_indexes = {}
    common_columns =
      'バージョン': 'version'
      'タイトル': 'title'
      'プレー回数': 'play_count'
      '最終プレー日時': 'date'
    common_column_indexes = {}
    old_common_column_indexes = {}

    # データ引き継ぎ日時の場合は日付を空にする
    initial_date = _(csv).min (c, i) ->
      if i == 0 then '99999999' else _.last(c)
    initial_date = _.last(initial_date)
    dates = _(csv).select (r) =>
      _.last(r) == initial_date
    if dates.length <= 1
      initial_date = null
    _(csv).each (row, i) =>
      if i == 0
        csv_columns = row
        old_csv_columns = old_row = @old_csv[i]
        _(['normal', 'hyper', 'another']).each (l) =>
          indexes[l] = _(row).findIndex (r) => r.match("^" + l.toUpperCase())
          old_indexes[l] = _(old_row).findIndex (r) => r.match("^" + l.toUpperCase())
        _(row).each (c, i) =>
          name = common_columns[c]
          common_column_indexes[name] = i if name
        _(old_row).each (c, i) =>
          name = common_columns[c]
          old_common_column_indexes[name] = i if name
        tr = $('<tr>').appendTo(thead)
        _(@column_defs).each (opt, name) ->
          label_text =
            score_bar: 'score'
            score_rate: 'rate'
            score_diff: 'score diff'
            clear_type: 'clear'
            play_count: 'play count'
            next_rank: 'next rank'
            prev_rank: 'prev rank'
            around_rank: 'around rank'
            date: 'last play'
            difficulty: 'N,H,A'
            lavel: 'LV'
          label = label_text[name] || name
          tr.append($('<th>').text(label))
        console.log row
      else
        # 共通の値抜き出し
        common_values = _(common_column_indexes).reduce (memo, index, name) =>
          value = row[index]
          switch name
            when 'date'
              if value == initial_date
                value = ''
              else
                value = moment(value, 'YYYY-MM-DD HH:mm').format('MM/DD HH:mm')
            when 'title'
              memo.original_title = value
              value = @convert_title(value)
          memo[name] = value
          memo
        , {}

        # 旧作情報を取得
        old_row = _(@old_csv).find (orow, i) =>
          orow[old_common_column_indexes['title']] == common_values.original_title

        old_common_values = _(old_common_column_indexes).reduce (memo, index, name) =>
          if old_row
            value = old_row[index]
            switch name
              when 'date'
                if value == initial_date
                  value = ''
                else
                  value = moment(value, 'YYYY-MM-DD HH:mm').format('MM/DD HH:mm')
              when 'title'
                value = @convert_title(value)
            memo[name] = value
          memo
        , {}

        column_labels =
          'level': '難易度'
          'score': 'EXスコア'
          'p_great': 'PGreat'
          'great': 'Great'
          'clear_type': 'クリアタイプ'
          'miss': 'ミスカウント'
          'rank': 'DJ LEVEL'
        diff_index = -1
        _(indexes).each (index, difficulty) =>
          # N,H,Aのそれぞれについて処理する
          diff = difficulty.toUpperCase()
          diff_index++

          # 指定したカラムの情報を取得
          get_value = (name) ->
            row[csv_columns.indexOf(diff + ' ' + column_labels[name])]
          get_old_value = (name) ->
            if old_row
              old_row[old_csv_columns.indexOf(diff + ' ' + column_labels[name])]

          # 存在しない譜面
          if get_value('level') == "0"
            return

          if @with_old
            # どちらかがスコア無しの場合無視
            unless parseInt(get_value('score')) > 0 &&
                   parseInt(get_old_value('score')) > 0
              return

          tr = $('<tr>').appendTo(tbody)

          # ノーツ数取得
          notes_row = _.find @notes_csv, (n_row) ->
            n_row[0] == common_values.title
          notes = 'not found'
          if notes_row
            notes = parseInt(notes_row[diff_index + 1])
          else
            window.undefined_title.push common_values.title

          _(@column_defs).each (opt, name) =>
            old_flg = false
            td = $('<td>').appendTo(tr)
            value = common_values[name]
            cls = []
            old_cls = []
            attrs = {}
            old_attrs = {}
            if !_.isUndefined(value)
              # 共通カラムの処理
              old_value = old_common_values[name]
              switch name
                when 'date'
                  old_flg = true
                when 'play_count'
                  old_flg = true
                when 'version'
                  value = @to_version_label(value)
            else
              v = get_value(name)
              value = v unless _.isUndefined(v)
              old_v = get_old_value(name)
              old_value = old_v unless _.isUndefined(old_v)
              switch name
                when 'miss'
                  old_flg = true
                  value = '' if value == '---'
                  old_value = '' if parseInt(old_value) < 0
                when 'difficulty'
                  value = diff.substr(0, 1)
                  cls.push(difficulty)
                when 'next_rank'
                  old_flg = true
                  value = old_value = ''
                  if notes > 0
                    split = 9
                    max_score = notes * 2
                    interval = max_score / split
                    line_scores = _(split).times (i) =>
                      Math.ceil(interval * (i + 1))
                    create_next_rank = (get_value_func, attrs_hash) =>
                      score = parseInt(get_value_func('score'))
                      if score > 0
                        next_score = _(line_scores).find (s) =>
                          # MAX点数の時バグってしまいそう
                          s > score
                        next_rank = @rank_names[line_scores.indexOf(next_score) + 1]
                        attrs_hash.rank = next_rank
                        score - next_score
                    value = create_next_rank(get_value, attrs)
                    old_value = create_next_rank(get_old_value, old_attrs)
                when 'prev_rank'
                  old_flg = true
                  value = old_value = ''
                  if notes > 0
                    split = 9
                    max_score = notes * 2
                    interval = max_score / split
                    line_scores = _(split).times (i) =>
                      Math.ceil(interval * (i + 1))
                    create_next_rank = (get_value_func, attrs_hash) =>
                      score = parseInt(get_value_func('score'))
                      if score > 0
                        next_score = _(line_scores).find (s, i) =>
                          line_scores[i + 1] > score
                        next_rank = @rank_names[line_scores.indexOf(next_score) + 1]
                        attrs_hash.rank = next_rank
                        '+' + (score - next_score)
                    value = create_next_rank(get_value, attrs)
                    old_value = create_next_rank(get_old_value, old_attrs)
                when 'around_rank'
                  old_flg = true
                  value = old_value = ''
                  if notes > 0
                    split = 9
                    max_score = notes * 2
                    interval = max_score / split
                    line_scores = _(split).times (i) =>
                      Math.ceil(interval * (i + 1))
                    create_next_rank = (get_value_func, attrs_hash) =>
                      score = parseInt(get_value_func('score'))
                      if score > 0
                        next_score = _(line_scores).find (s) =>
                          s > score
                        prev_score = line_scores[line_scores.indexOf(next_score) - 1]
                        around_score = if next_score - score > score - prev_score then prev_score else next_score
                        next_rank = @rank_names[line_scores.indexOf(around_score) + 1]
                        attrs_hash.rank = next_rank
                        around = score - around_score
                        if around < 0 then around else '+' + around
                    value = create_next_rank(get_value, attrs)
                    old_value = create_next_rank(get_old_value, old_attrs)
                when 'notes'
                  value = notes
                when 'score_rate'
                  old_flg = true
                  value = 0
                  score = parseInt(get_value('score'))
                  if score > 0
                    max_score = notes * 2
                    value = score / max_score * 100
                when 'score_bar'
                  old_flg = true
                  td.attr(colspan: 2)
                  # 補助線
                  _(['a', 'aa', 'aaa']).each (rank) ->
                    td.append($('<div>').addClass('line ' + rank))
                  create_score_bar = (value_func) =>
                    val = value_func('score')
                    rate = 0
                    score = parseInt(val)
                    bar_container = @header.find('.score_bar_container').clone()
                    if score > 0
                      max_score = notes * 2
                      rate = score / max_score * 100
                    if _.isUndefined(val)
                      v = rate = '---'
                    else
                      v = val + '(' + value_func('p_great') + '/' + value_func('great') +  ')'
                      if notes == 'not found'
                        rate = '---'
                      else
                        rate = rate.toFixed(2)
                      bar_container.find('.bar').css(width: rate + '%')
                    bar_container.find('.rate').text(rate)
                    bar_container.find('.value').text(v)
                    bar_container
                  value = create_score_bar(get_value)
                  old_value = create_score_bar(get_old_value)
                when 'score_diff'
                  value = parseInt(get_value('score')) - parseInt(get_old_value('score'))
                  if value > 0
                    value = '+' + value
                  else if value < 0
                    cls.push('minus')
                when 'score_diff_filter'
                  score_diff = parseInt(get_value('score')) - parseInt(get_old_value('score'))
                  value =
                    if score_diff > 0 then 'win'
                    else if score_diff < 0 then 'lose'
                    else 'even'
                when 'clear_type'
                  old_flg = true
                  value ||= ''
                  old_value ||= ''
                  value = if value == 'CLEAR' then value else value.replace(' CLEAR', '')
                  old_value = if old_value == 'CLEAR' then old_value else old_value.replace(' CLEAR', '')
                  cls.push(value.replace(/ /g, '_').toLowerCase())
                  old_cls.push(old_value.replace(/ /g, '_').toLowerCase())
                when 'version_number'
                  value = @to_version_num(common_values.version)
                when 'rank'
                  old_flg = true
                  score = parseInt(get_value('score'))
                  old_score = parseInt(get_old_value('score'))
                  if old_score > 0 && _.isEmpty(old_value)
                    old_value = @score_to_rank(old_score, notes)
                  cls.push(value.toLowerCase()) if value
                  old_cls.push(old_value.toLowerCase()) if old_value
            if old_flg && @with_old
              td.addClass('no_padding')
              inner = $('<div>').addClass('inner').appendTo(td)
              old_container = $('<div>')
                .addClass('old')
                .appendTo(inner)
                .addClass(old_cls.join(' '))
                .attr(old_attrs)
              $('<div>').addClass('split_line').appendTo(inner)
              container = $('<div>')
                .addClass('current')
                .appendTo(inner)
                .addClass(cls.join(' '))
                .attr(attrs)
              container.append(value)
              old_container.append(old_value)
            else
              td.append(value)
                .addClass(cls.join(' '))
                .attr(attrs)
    @init_data_table()
    @init_filter()

  # DataTablesの初期化
  init_data_table: =>
    console.log('ended', +new Date)
    init = false
    window.dt = @table.DataTable
      autoWidth: false
      pageLength: 100
      paging: true
      fixedHeader:
        header: true
        footer: true
      columns: _(@column_defs).map (opt, name) ->
        opt.className = name
        opt.name = name
        opt
      drawCallback: =>
        # orderの設定だけだと初回クリック時のsort方向が被って何もおきないため、
        # 描画完了時にヘッダを自動で1回だけクリックさせる。
        unless init
          init = true
          # DataTableオブジェクトの変数に代入される前に実行されるので
          # setTimeoutで実行をずらす
          setTimeout ->
            $(window.dt.column('version:name').header()).click()
          , 0
      order: [ [
        1
        'desc'
      ] ]
    window.dt.fixedHeader.headerOffset(@header.closest('.filter_header').outerHeight())

    @loading.hide()
    @score_viewer.css(visibility: 'visible').hide().fadeIn()

    $('#score_table_paginate, #score_table_info').appendTo(@header)

  # 列フィルタを定義
  init_filter: =>
    # 検索可能な項目を定義
    filter_columns =
      version: null
      difficulty: null
      level: null
      score_diff: 'score_diff_filter'
    unless @with_old
      filter_columns.rank = null
      filter_columns.clear_type = null
    _(filter_columns).each (target, header) =>
      filter_columns[header] ||= header
    template = @header.find('.checkbox')

    # drawするとtableが再作成されて表示中のfilterが消えてしまうため、
    # 一瞬だけクラスを付け替えてfilter欄を再表示させる
    filter_toggle = (header_name) =>
      fixed_header =
        $($('.fixedHeader-floating')[0] || @table[0]) # drawで再作成されるため、再取得
          .find('th.' + header_name)
      fixed_header.addClass 'filter_visible'
      setTimeout ->
        fixed_header.removeClass 'filter_visible'
      , 1

    # 検索後、count表示を再計算する
    refresh_check = (exclude_column) =>
      _(filter_columns).each (target_name, header_name) =>
        column = window.dt.column(target_name + ':name', search: 'applied')
        header_column = window.dt.column(header_name + ':name', search: 'applied')
        return if exclude_column && exclude_column.index() == column.index()
        current_search = column.search()
        column.search ''
        data = column.data()
        counts = _(data).countBy()
        _($(header_column.header()).find('.check_container input')).each (input) =>
          input = $(input)
          count = counts[$('<div>').text(input.val()).html()] || 0
          input.siblings('label').text input.val() + ' (' + count + ')'
          input.prop('disabled', count == 0)
          input.parent().toggleClass('disabled', count == 0)
        column.search current_search, true

    # タイトル検索の初期化
    search_field = $('input.search')
    search_title = ->
      window.dt.column('title:name').search(search_field.val().trim()).draw()
      refresh_check()
    search_field.on 'keyup', ->
      search_title()

    # チェックボックス初期化
    _(filter_columns).each (target_name, header_name) =>
      column = window.dt.column(target_name + ':name')
      header_column = window.dt.column(header_name + ':name')
      th = $(header_column.header())
      container = template.clone()
      checkboxes = container.find('.check_container')
      all_check = container.find('.all input')
      th.append(container)

      # チェックした時にソートが変わってしまうのを止める
      container.on 'click', (e) ->
        e.stopPropagation()

      # 全てのチェック
      all_check.on 'click', (e) ->
        checked = $(@).is(':checked')
        checkboxes.find('input').prop(checked: checked)
        search_column()

      # 今のチェック状況で検索
      search_column = (all=true) ->
        checked_values = _(checkboxes.find('input:checked')).map (input) ->
          $(input).val().replace ' ', '\\s'
        searched = !!checkboxes.find('input:not(:checked)')[0]
        th.toggleClass 'searched', searched
        all_check.prop(checked: !searched)
        reg = '^(' + checked_values.join('|') + ')$'
        column.search(reg, true).draw()
        filter_toggle(header_name)
        refresh_check(column)

      data = column.data()
      counts = _(data).countBy()
      container = undefined
      i = 0
      _(counts).each (count, value) ->
        if i % 12 == 0
          container = $('<div>')
          checkboxes.append container
        value = $('<div>').html(value).text()
        input = $('<input>').attr
          type: 'checkbox'
          checked: true
          value: value
        label = $('<label>')
        input_row = $('<div>').append(input).append(label)
        if _(['difficulty', 'level']).include(header_name)
          container.prepend input_row
        else
          container.append input_row
        i++

        # label部分をクリックしたら、その値のみで検索
        label.on 'click', ->
          return if $(@).closest('.disabled')[0]
          input.prop(checked: true)
          checkboxes.find('input').not(input).prop(checked: false)
          search_column()
        # チェックを変更したら、そのまま検索
        input.on 'change', ->
          search_column()

    refresh_check()

  # 初期化
  constructor: ->
    _self = @
    query = URI(location.href).search(true)
    @table = $('#score_table')
    @header = $('.filter_header .inner')
    @score_viewer = $('.filter_header, .table_container')
    @loading = $('.loading_message')

    console.log('start', +new Date)
    window.notes_csv = @notes_csv = @parse_csv(notes_data)

    @rank_names = [
      'MIN'
      'F'
      'E'
      'D'
      'C'
      'B'
      'A'
      'AA'
      'AAA'
      'MAX'
    ]

    # ノーツ数にカーソル当てたらツールチップ表示
    tooltip = $('.score_tooltip')
    $(document).on 'mouseover', 'td.notes', ->
      split = 9
      max_score = parseInt($(@).text()) * 2
      interval = max_score / split
      line_scores = _(split).times (i) =>
        line_score = _self.rank_names[i + 1] + '：' + Math.ceil(interval * (i + 1))
        $('<div>').text(line_score)
      tooltip.empty().append(line_scores.reverse())
      tooltip.appendTo(@)

    # around_rankの切り替え
    rotate_rank = ['around', 'prev', 'next']
    _(rotate_rank).each (d, i) =>
      $(document).on 'contextmenu', 'th.' + d + '_rank', =>
        window.dt.column(d + '_rank:name').visible(false)
        visible_rank = rotate_rank[i + 1] || rotate_rank[0]
        window.dt.column(visible_rank + '_rank:name').visible(true)
        false
    # ややこしいのでヘッダ右クリック無効化
    $(document).on 'contextmenu', 'th', =>
      false

    if query.debug
      @csv_name = query.csv
      @old_csv_name = query.old_csv
      @with_old = !!@old_csv_name
      # 自動ロード
      if @with_old
        $.ajax
          url: './csv/' + @old_csv_name
          success: (old_data) =>
            @old_csv_data = old_data
            @load_current_csv()
      else
        @load_current_csv()
    else
      $('content').show()

      # ファイル読み込みまでの操作
      view_score = $('label.view_score')
      $(document).on 'change', 'li input:file', (e) =>
        input = $(e.target)
        file = e.target.files[0]
        fr = new FileReader()
        fr.onload = (fe) =>
          input.closest('label').find('.button').text('[' + file.name + '] selected')
          if input.is('.current_csv')
            @csv_data = fe.target.result
            $('input.old_csv').prop(disabled: false).closest('label').removeClass('disabled')
            view_score.removeClass('disabled')
          else
            @with_old = true
            @old_csv_data = fe.target.result
        fr.readAsText(file)
      .on 'click', 'label.view_score', =>
        if !view_score.is('.disabled')
          console.log('view start', +new Date)
          @create_table_with_timeout()

$ ->
  new TableManager()
