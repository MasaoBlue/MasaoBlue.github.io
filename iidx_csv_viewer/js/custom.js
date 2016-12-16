(function() {
  var TableManager,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.undefined_title = [];

  TableManager = (function() {
    TableManager.prototype.convert_title = function(title) {
      return {
        '19，November': '19,November',
        'Sweet Sweet Magic': 'Sweet Sweet♥Magic',
        'Raspberry Heart(English version)': 'Raspberry♥Heart(English version)',
        'ピアノ協奏曲第１番”蠍火”': 'ピアノ協奏曲第1番"蠍火"',
        'ＵＬＴｉＭΛＴＥ': 'ULTiM∧TE',
        '100％ minimoo-G': '100% minimoo-G',
        'Double Loving Heart': 'Double♥♥Loving Heart',
        'Blind Justice ～Torn souls， Hurt Faiths ～': 'Blind Justice ～Torn souls, Hurt Faiths～',
        'never…': 'never...',
        '花吹雪 ～ IIDX LIMITED ～': '花吹雪 ～IIDX LIMITED～',
        'Ubertreffen': 'Übertreffen',
        'Punch Love 仮面': 'Punch Love♡仮面',
        'Raison d\'etre～交差する宿命～': 'Raison d\'être～交差する宿命～',
        'ワルツ第17番 ト短調”大犬のワルツ”': 'ワルツ第17番 ト短調"大犬のワルツ"',
        'A MINSTREL ～ ver. short-scape ～': 'A MINSTREL ～ver. short-scape～',
        '恋する☆宇宙戦争っ！！': '恋する☆宇宙戦争っ!!',
        'Light and Cyber…': 'Light and Cyber･･･',
        'Praludium': 'Präludium',
        'キャトられ恋はモ～モク': 'キャトられ♥恋はモ～モク',
        'ATHER': 'ÆTHER',
        'Atropos': 'Atröpøs',
        'Close the World feat. a☆ru': 'Close the World feat.a☆ru',
        '旋律のドグマ～Miserables～': '旋律のドグマ～Misérables～',
        '超!!遠距離らぶメ～ル': '超!!遠距離らぶ♡メ～ル',
        '表裏一体！？怪盗いいんちょの悩み': '表裏一体！？怪盗いいんちょの悩み♥',
        '!Viva!': '¡Viva!',
        '火影': '焱影',
        'Verflucht†LEGGENDARIA': 'Verflucht †LEGGENDARIA'
      }[title] || title;
    };

    TableManager.prototype.to_version_num = function(v) {
      var result, versions;
      versions = ['IIDX RED', 'HAPPY SKY', 'DistorteD', 'GOLD', 'DJ TROOPERS', 'EMPRESS', 'SIRIUS', 'Resort Anthem', 'Lincle', 'tricoro', 'SPADA', 'PENDUAL', 'copula', 'SINOBUZ'];
      result = void 0;
      if (versions.indexOf(v) >= 0) {
        return versions.indexOf(v) + 11;
      } else {
        return v.match('\\d+')[0];
      }
    };

    TableManager.prototype.to_version_label = function(v) {
      var versions;
      versions = {
        '1st&substream': '1st&s',
        'DJ TROOPERS': 'TROOPERS'
      };
      if (versions[v]) {
        return versions[v];
      } else {
        return v.replace(' style', '');
      }
    };

    TableManager.prototype.score_to_rank = function(score, notes) {
      var interval, line_scores, max_score, next_score, split;
      split = 9;
      max_score = notes * 2;
      interval = max_score / split;
      line_scores = _(split).times((function(_this) {
        return function(i) {
          return Math.ceil(interval * (i + 1));
        };
      })(this));
      next_score = _(line_scores).find((function(_this) {
        return function(s) {
          return s >= score;
        };
      })(this));
      return this.rank_names[line_scores.indexOf(next_score)];
    };

    TableManager.prototype.parse_csv = function(text) {
      if (text == null) {
        text = '';
      }
      return Papa.parse(text.trim()).data;
    };

    TableManager.prototype.load_current_csv = function() {
      return $.ajax({
        url: './csv/' + this.csv_name,
        success: (function(_this) {
          return function(data) {
            console.log('loaded', +(new Date));
            _this.csv_data = data;
            return _this.create_table_with_timeout();
          };
        })(this)
      });
    };

    TableManager.prototype.init_column_defs = function() {
      var reverse_order;
      reverse_order = ['desc', 'asc'];
      this.column_defs = {
        version_number: {
          visible: false
        },
        version: {
          orderSequence: reverse_order
        },
        title: {},
        difficulty: {},
        level: {
          orderSequence: reverse_order
        },
        notes: {
          orderSequence: reverse_order
        },
        score_diff: {
          visible: this.with_old,
          orderSequence: reverse_order
        },
        score_diff_filter: {
          visible: false
        },
        score_bar: {
          sortable: !this.with_old,
          orderSequence: reverse_order
        },
        score_rate: {
          sortable: !this.with_old,
          orderSequence: reverse_order
        },
        score: {
          visible: false
        },
        rank: {
          sortable: !this.with_old
        },
        rank_filter: {
          visible: false
        },
        next_rank: {
          visible: false,
          sortable: !this.with_old
        },
        prev_rank: {
          visible: false,
          sortable: !this.with_old
        },
        around_rank: {
          sortable: !this.with_old
        },
        miss: {
          sortable: !this.with_old,
          orderSequence: reverse_order
        },
        miss_filter: {
          visible: false
        },
        clear_type: {
          sortable: !this.with_old
        },
        clear_type_filter: {
          visible: false
        },
        play_count: {
          sortable: !this.with_old,
          orderSequence: reverse_order
        },
        date: {
          sortable: !this.with_old,
          orderSequence: reverse_order
        }
      };
      return _({
        version: 'version_number',
        score_bar: 'score'
      }).each((function(_this) {
        return function(order_name, column_name) {
          var order_index;
          order_index = _(_this.column_defs).chain().keys().findIndex(function(name) {
            return name === order_name;
          }).value();
          return _this.column_defs[column_name].orderData = [order_index];
        };
      })(this));
    };

    TableManager.prototype.create_table_with_timeout = function() {
      $('content').hide();
      this.score_viewer.show().css({
        visibility: 'hidden'
      });
      this.loading.show();
      return setTimeout((function(_this) {
        return function() {
          return _this.create_table();
        };
      })(this), 100);
    };

    TableManager.prototype.create_table = function() {
      var common_column_indexes, common_columns, csv, csv_columns, dates, indexes, initial_date, old_common_column_indexes, old_csv, old_csv_columns, old_indexes, old_vname, tbody, thead, vname;
      this.with_old = !!this.with_old;
      $('body').toggleClass('with_old', this.with_old);
      this.init_column_defs();
      window.csv = csv = this.parse_csv(this.csv_data);
      old_csv = this.old_csv = this.parse_csv(this.old_csv_data);
      thead = this.table.find('thead');
      tbody = this.table.find('tbody');
      window.columns = [];
      csv_columns = null;
      old_csv_columns = null;
      indexes = {};
      old_indexes = {};
      common_columns = {
        'バージョン': 'version',
        'タイトル': 'title',
        'プレー回数': 'play_count',
        '最終プレー日時': 'date'
      };
      common_column_indexes = {};
      old_common_column_indexes = {};
      initial_date = _(csv).min(function(c, i) {
        if (i === 0) {
          return '99999999';
        } else {
          return _.last(c);
        }
      });
      initial_date = _.last(initial_date);
      dates = _(csv).select((function(_this) {
        return function(r) {
          return _.last(r) === initial_date;
        };
      })(this));
      if (dates.length <= 1) {
        initial_date = null;
      }
      _(csv).each((function(_this) {
        return function(row, i) {
          var column_labels, common_values, diff_index, old_common_values, old_row, tr;
          if (i === 0) {
            csv_columns = row;
            old_csv_columns = old_row = _this.old_csv[i];
            _(['normal', 'hyper', 'another']).each(function(l) {
              indexes[l] = _(row).findIndex(function(r) {
                return r.match("^" + l.toUpperCase());
              });
              return old_indexes[l] = _(old_row).findIndex(function(r) {
                return r.match("^" + l.toUpperCase());
              });
            });
            _(row).each(function(c, i) {
              var name;
              name = common_columns[c];
              if (name) {
                return common_column_indexes[name] = i;
              }
            });
            _(old_row).each(function(c, i) {
              var name;
              name = common_columns[c];
              if (name) {
                return old_common_column_indexes[name] = i;
              }
            });
            tr = $('<tr>').appendTo(thead);
            _(_this.column_defs).each(function(opt, name) {
              var label, label_text;
              label_text = {
                score_bar: 'score',
                score_rate: 'rate',
                score_diff: 'score diff',
                clear_type: 'clear',
                play_count: 'play count',
                next_rank: 'next rank',
                prev_rank: 'prev rank',
                around_rank: 'around rank',
                date: 'last play',
                difficulty: 'N,H,A',
                lavel: 'LV'
              };
              label = label_text[name] || name;
              return tr.append($('<th>').text(label));
            });
            return console.log(row);
          } else {
            common_values = _(common_column_indexes).reduce(function(memo, index, name) {
              var value;
              value = row[index];
              switch (name) {
                case 'date':
                  if (value === initial_date) {
                    value = '';
                  } else {
                    value = moment(value, 'YYYY-MM-DD HH:mm').format('MM/DD HH:mm');
                  }
                  break;
                case 'title':
                  memo.original_title = value;
                  value = _this.convert_title(value);
              }
              memo[name] = value;
              return memo;
            }, {});
            old_row = _(_this.old_csv).find(function(orow, i) {
              return orow[old_common_column_indexes['title']] === common_values.original_title;
            });
            old_common_values = _(old_common_column_indexes).reduce(function(memo, index, name) {
              var value;
              if (old_row) {
                value = old_row[index];
                switch (name) {
                  case 'date':
                    if (value === initial_date) {
                      value = '';
                    } else {
                      value = moment(value, 'YYYY-MM-DD HH:mm').format('MM/DD HH:mm');
                    }
                    break;
                  case 'title':
                    value = _this.convert_title(value);
                }
                memo[name] = value;
              }
              return memo;
            }, {});
            column_labels = {
              'level': '難易度',
              'score': 'EXスコア',
              'p_great': 'PGreat',
              'great': 'Great',
              'clear_type': 'クリアタイプ',
              'miss': 'ミスカウント',
              'rank': 'DJ LEVEL'
            };
            diff_index = -1;
            return _(indexes).each(function(index, difficulty) {
              var diff, get_old_value, get_value, notes, notes_row;
              diff = difficulty.toUpperCase();
              diff_index++;
              get_value = function(name) {
                return row[csv_columns.indexOf(diff + ' ' + column_labels[name])];
              };
              get_old_value = function(name) {
                if (old_row) {
                  return old_row[old_csv_columns.indexOf(diff + ' ' + column_labels[name])];
                }
              };
              if (get_value('level') === "0") {
                return;
              }
              if (_this.with_old) {
                if (!(parseInt(get_value('score')) > 0 && parseInt(get_old_value('score')) > 0)) {
                  return;
                }
              }
              tr = $('<tr>').appendTo(tbody);
              notes_row = _.find(_this.notes_csv, function(n_row) {
                return n_row[0] === common_values.title;
              });
              notes = 'not found';
              if (notes_row) {
                notes = parseInt(notes_row[diff_index + 1]);
              } else {
                window.undefined_title.push(common_values.title);
              }
              return _(_this.column_defs).each(function(opt, name) {
                var attrs, clear_diff, cls, container, create_next_rank, create_score_bar, current_rank, inner, interval, line_scores, max_score, miss_diff, old_attrs, old_cls, old_container, old_flg, old_rank, old_score, old_v, old_value, rank_diff, score, score_diff, split, td, v, value;
                old_flg = false;
                td = $('<td>').appendTo(tr);
                value = common_values[name];
                cls = [];
                old_cls = [];
                attrs = {};
                old_attrs = {};
                if (!_.isUndefined(value)) {
                  old_value = old_common_values[name];
                  switch (name) {
                    case 'date':
                      old_flg = true;
                      break;
                    case 'play_count':
                      old_flg = true;
                      break;
                    case 'version':
                      value = _this.to_version_label(value);
                  }
                } else {
                  v = get_value(name);
                  if (!_.isUndefined(v)) {
                    value = v;
                  }
                  old_v = get_old_value(name);
                  if (!_.isUndefined(old_v)) {
                    old_value = old_v;
                  }
                  switch (name) {
                    case 'miss':
                      old_flg = true;
                      if (value === '---') {
                        value = '';
                      }
                      if (parseInt(old_value) < 0) {
                        old_value = '';
                      }
                      break;
                    case 'miss_filter':
                      miss_diff = parseInt(get_value('miss')) - parseInt(get_old_value('miss'));
                      value = miss_diff < 0 ? 'win' : miss_diff > 0 ? 'lose' : 'even';
                      break;
                    case 'difficulty':
                      value = diff.substr(0, 1);
                      cls.push(difficulty);
                      break;
                    case 'next_rank':
                      old_flg = true;
                      value = old_value = '';
                      if (notes > 0) {
                        split = 9;
                        max_score = notes * 2;
                        interval = max_score / split;
                        line_scores = _(split).times(function(i) {
                          return Math.ceil(interval * (i + 1));
                        });
                        create_next_rank = function(get_value_func, attrs_hash) {
                          var next_rank, next_score, score;
                          score = parseInt(get_value_func('score'));
                          if (score > 0) {
                            next_score = _(line_scores).find(function(s) {
                              return s > score;
                            });
                            next_rank = _this.rank_names[line_scores.indexOf(next_score) + 1];
                            attrs_hash.rank = next_rank;
                            return score - next_score;
                          }
                        };
                        value = create_next_rank(get_value, attrs);
                        old_value = create_next_rank(get_old_value, old_attrs);
                      }
                      break;
                    case 'prev_rank':
                      old_flg = true;
                      value = old_value = '';
                      if (notes > 0) {
                        split = 9;
                        max_score = notes * 2;
                        interval = max_score / split;
                        line_scores = _(split).times(function(i) {
                          return Math.ceil(interval * (i + 1));
                        });
                        create_next_rank = function(get_value_func, attrs_hash) {
                          var next_rank, next_score, score;
                          score = parseInt(get_value_func('score'));
                          if (score > 0) {
                            next_score = _(line_scores).find(function(s, i) {
                              return line_scores[i + 1] > score;
                            });
                            next_rank = _this.rank_names[line_scores.indexOf(next_score) + 1];
                            attrs_hash.rank = next_rank;
                            return '+' + (score - next_score);
                          }
                        };
                        value = create_next_rank(get_value, attrs);
                        old_value = create_next_rank(get_old_value, old_attrs);
                      }
                      break;
                    case 'around_rank':
                      old_flg = true;
                      value = old_value = '';
                      if (notes > 0) {
                        split = 9;
                        max_score = notes * 2;
                        interval = max_score / split;
                        line_scores = _(split).times(function(i) {
                          return Math.ceil(interval * (i + 1));
                        });
                        create_next_rank = function(get_value_func, attrs_hash) {
                          var around, around_score, next_rank, next_score, prev_score, score;
                          score = parseInt(get_value_func('score'));
                          if (score > 0) {
                            next_score = _(line_scores).find(function(s) {
                              return s > score;
                            });
                            prev_score = line_scores[line_scores.indexOf(next_score) - 1];
                            around_score = next_score - score > score - prev_score ? prev_score : next_score;
                            next_rank = _this.rank_names[line_scores.indexOf(around_score) + 1];
                            attrs_hash.rank = next_rank;
                            around = score - around_score;
                            if (around < 0) {
                              return around;
                            } else {
                              return '+' + around;
                            }
                          }
                        };
                        value = create_next_rank(get_value, attrs);
                        old_value = create_next_rank(get_old_value, old_attrs);
                      }
                      break;
                    case 'notes':
                      value = notes;
                      break;
                    case 'score_rate':
                      old_flg = true;
                      value = 0;
                      score = parseInt(get_value('score'));
                      if (score > 0) {
                        max_score = notes * 2;
                        value = score / max_score * 100;
                      }
                      break;
                    case 'score_bar':
                      old_flg = true;
                      td.attr({
                        colspan: 2
                      });
                      _(['a', 'aa', 'aaa']).each(function(rank) {
                        return td.append($('<div>').addClass('line ' + rank));
                      });
                      create_score_bar = function(value_func) {
                        var bar_container, rate, val;
                        val = value_func('score');
                        rate = 0;
                        score = parseInt(val);
                        bar_container = _this.header.find('.score_bar_container').clone();
                        if (score > 0) {
                          max_score = notes * 2;
                          rate = score / max_score * 100;
                        }
                        if (_.isUndefined(val)) {
                          v = rate = '---';
                        } else {
                          v = val + '(' + value_func('p_great') + '/' + value_func('great') + ')';
                          if (notes === 'not found') {
                            rate = '---';
                          } else {
                            rate = rate.toFixed(2);
                          }
                          bar_container.find('.bar').css({
                            width: rate + '%'
                          });
                        }
                        bar_container.find('.rate').text(rate);
                        bar_container.find('.value').text(v);
                        return bar_container;
                      };
                      value = create_score_bar(get_value);
                      old_value = create_score_bar(get_old_value);
                      break;
                    case 'score_diff':
                      value = parseInt(get_value('score')) - parseInt(get_old_value('score'));
                      if (value > 0) {
                        value = '+' + value;
                      } else if (value < 0) {
                        cls.push('minus');
                      }
                      break;
                    case 'score_diff_filter':
                      score_diff = parseInt(get_value('score')) - parseInt(get_old_value('score'));
                      value = score_diff > 0 ? 'win' : score_diff < 0 ? 'lose' : 'even';
                      break;
                    case 'clear_type':
                      old_flg = true;
                      value = _this.clear_types[value] || '';
                      old_value = _this.clear_types[old_value] || '';
                      cls.push(value.replace(/ /g, '_').toLowerCase());
                      old_cls.push(old_value.replace(/ /g, '_').toLowerCase());
                      break;
                    case 'clear_type_filter':
                      clear_diff = _this.long_clear_types.indexOf(get_value('clear_type')) - _this.long_clear_types.indexOf(get_old_value('clear_type'));
                      value = clear_diff > 0 ? 'win' : clear_diff < 0 ? 'lose' : 'even';
                      break;
                    case 'version_number':
                      value = _this.to_version_num(common_values.version);
                      break;
                    case 'rank':
                      old_flg = true;
                      score = parseInt(get_value('score'));
                      old_score = parseInt(get_old_value('score'));
                      if (old_score > 0 && _.isEmpty(old_value)) {
                        old_value = _this.score_to_rank(old_score, notes);
                      }
                      if (value) {
                        cls.push(value.toLowerCase());
                      }
                      if (old_value) {
                        old_cls.push(old_value.toLowerCase());
                      }
                      break;
                    case 'rank_filter':
                      current_rank = get_value('rank');
                      old_rank = get_old_value('rank');
                      if (_.isEmpty(old_rank)) {
                        old_score = parseInt(get_old_value('score'));
                        if (old_score > 0) {
                          old_rank = _this.score_to_rank(old_score, notes);
                        }
                      }
                      rank_diff = _this.rank_names.indexOf(current_rank) - _this.rank_names.indexOf(old_rank);
                      value = rank_diff > 0 ? 'win' : rank_diff < 0 ? 'lose' : 'even';
                  }
                }
                if (old_flg && _this.with_old) {
                  td.addClass('no_padding');
                  inner = $('<div>').addClass('inner').appendTo(td);
                  old_container = $('<div>').addClass('old').appendTo(inner).addClass(old_cls.join(' ')).attr(old_attrs);
                  $('<div>').addClass('split_line').appendTo(inner);
                  container = $('<div>').addClass('current').appendTo(inner).addClass(cls.join(' ')).attr(attrs);
                  container.append(value);
                  return old_container.append(old_value);
                } else {
                  return td.append(value).addClass(cls.join(' ')).attr(attrs);
                }
              });
            });
          }
        };
      })(this));
      vname = _(csv).last()[common_column_indexes.version];
      this.header.find('.current_file').text(this.csv_name + '(' + vname + ')');
      if (this.with_old) {
        old_vname = _(old_csv).last()[common_column_indexes.version];
        this.header.find('.old_file').text(this.old_csv_name + '(' + old_vname + ')');
      }
      this.init_data_table();
      return this.init_filter();
    };

    TableManager.prototype.init_data_table = function() {
      var init;
      console.log('ended', +(new Date));
      init = false;
      window.dt = this.table.DataTable({
        autoWidth: false,
        pageLength: 100,
        paging: true,
        fixedHeader: {
          header: true,
          footer: true
        },
        columns: _(this.column_defs).map(function(opt, name) {
          opt.className = name;
          opt.name = name;
          return opt;
        }),
        drawCallback: (function(_this) {
          return function() {
            if (!init) {
              init = true;
              return setTimeout(function() {
                return $(window.dt.column('version:name').header()).click();
              }, 0);
            }
          };
        })(this),
        order: [[1, 'desc']]
      });
      window.dt.fixedHeader.headerOffset(this.header.closest('.filter_header').outerHeight());
      this.loading.hide();
      this.score_viewer.css({
        visibility: 'visible'
      }).hide().fadeIn();
      return $('#score_table_paginate, #score_table_info').appendTo(this.header);
    };

    TableManager.prototype.init_filter = function() {
      var filter_columns, filter_toggle, refresh_check, search_field, search_title, template;
      filter_columns = {
        version: {},
        difficulty: {
          reverse: true
        },
        level: {
          sort: 'integer',
          reverse: true
        },
        rank: {
          sort: this.rank_names
        },
        clear_type: {
          sort: _(this.clear_types).values()
        }
      };
      if (this.with_old) {
        filter_columns.score_diff = {
          target: 'score_diff_filter'
        };
        filter_columns.rank = {
          target: 'rank_filter'
        };
        filter_columns.miss = {
          target: 'miss_filter'
        };
        filter_columns.clear_type = {
          target: 'clear_type_filter'
        };
      }
      _(filter_columns).each((function(_this) {
        return function(config, header) {
          var base;
          return (base = filter_columns[header]).target || (base.target = header);
        };
      })(this));
      template = this.header.find('.checkbox');
      filter_toggle = (function(_this) {
        return function(header_name) {
          var fixed_header;
          fixed_header = $($('.fixedHeader-floating')[0] || _this.table[0]).find('th.' + header_name);
          fixed_header.addClass('filter_visible');
          return setTimeout(function() {
            return fixed_header.removeClass('filter_visible');
          }, 1);
        };
      })(this);
      refresh_check = (function(_this) {
        return function(exclude_column) {
          return _(filter_columns).each(function(config, header_name) {
            var column, counts, current_search, data, header_column, target_name;
            target_name = config.target;
            column = window.dt.column(target_name + ':name', {
              search: 'applied'
            });
            header_column = window.dt.column(header_name + ':name', {
              search: 'applied'
            });
            if (exclude_column && exclude_column.index() === column.index()) {
              return;
            }
            current_search = column.search();
            column.search('');
            data = column.data();
            counts = _(data).countBy();
            _($(header_column.header()).find('.check_container input')).each(function(input) {
              var count;
              input = $(input);
              count = counts[$('<div>').text(input.val()).html()] || 0;
              input.siblings('label').text(input.val() + ' (' + count + ')');
              input.prop('disabled', count === 0);
              return input.parent().toggleClass('disabled', count === 0);
            });
            return column.search(current_search, true);
          });
        };
      })(this);
      search_field = $('input.search');
      search_title = function() {
        window.dt.column('title:name').search(search_field.val().trim()).draw();
        return refresh_check();
      };
      search_field.on('keyup', function() {
        return search_title();
      });
      _(filter_columns).each((function(_this) {
        return function(config, header_name) {
          var all_check, checkboxes, column, container, counts, data, header_column, i, search_column, target_name, th;
          target_name = config.target;
          column = window.dt.column(target_name + ':name');
          header_column = window.dt.column(header_name + ':name');
          th = $(header_column.header());
          container = template.clone();
          checkboxes = container.find('.check_container');
          all_check = container.find('.all input');
          th.append(container);
          container.on('click', function(e) {
            return e.stopPropagation();
          });
          all_check.on('click', function(e) {
            var checked;
            checked = $(this).is(':checked');
            checkboxes.find('input').prop({
              checked: checked
            });
            return search_column();
          });
          search_column = function(all) {
            var checked_values, reg, searched;
            if (all == null) {
              all = true;
            }
            checked_values = _(checkboxes.find('input:checked')).map(function(input) {
              return $(input).val().replace(' ', '\\s');
            });
            searched = !!checkboxes.find('input:not(:checked)')[0];
            th.toggleClass('searched', searched);
            all_check.prop({
              checked: !searched
            });
            reg = '^(' + checked_values.join('|') + ')$';
            column.search(reg, true).draw();
            filter_toggle(header_name);
            return refresh_check(column);
          };
          data = column.data();
          counts = _(data).chain().countBy().map(function(v, k) {
            return {
              key: k,
              value: v
            };
          });
          console.log(header_name, config);
          if (config.sort) {
            counts = counts.sortBy(function(c) {
              if (config.sort === 'integer') {
                return parseInt(c.key);
              } else {
                return -config.sort.indexOf(c.key);
              }
            });
          }
          counts = counts.value();
          container = void 0;
          i = 0;
          return _(counts).each(function(c) {
            var count, input, input_row, label, value;
            value = c.key;
            count = c.value;
            if (i % 12 === 0) {
              container = $('<div>');
              checkboxes.append(container);
            }
            value = $('<div>').html(value).text();
            input = $('<input>').attr({
              type: 'checkbox',
              checked: true,
              value: value
            });
            label = $('<label>');
            input_row = $('<div>').append(input).append(label);
            if (config.reverse) {
              container.prepend(input_row);
            } else {
              container.append(input_row);
            }
            i++;
            label.on('click', function() {
              if ($(this).closest('.disabled')[0]) {
                return;
              }
              input.prop({
                checked: true
              });
              checkboxes.find('input').not(input).prop({
                checked: false
              });
              return search_column();
            });
            return input.on('change', function() {
              return search_column();
            });
          });
        };
      })(this));
      return refresh_check();
    };

    function TableManager() {
      this.init_filter = bind(this.init_filter, this);
      this.init_data_table = bind(this.init_data_table, this);
      this.create_table = bind(this.create_table, this);
      this.create_table_with_timeout = bind(this.create_table_with_timeout, this);
      this.init_column_defs = bind(this.init_column_defs, this);
      this.load_current_csv = bind(this.load_current_csv, this);
      this.parse_csv = bind(this.parse_csv, this);
      this.score_to_rank = bind(this.score_to_rank, this);
      this.to_version_label = bind(this.to_version_label, this);
      this.to_version_num = bind(this.to_version_num, this);
      this.convert_title = bind(this.convert_title, this);
      var _self, query, rotate_rank, tooltip, view_score;
      _self = this;
      query = URI(location.href).search(true);
      this.table = $('#score_table');
      this.header = $('.filter_header .inner');
      this.score_viewer = $('.filter_header, .table_container');
      this.loading = $('.loading_message');
      console.log('start', +(new Date));
      window.notes_csv = this.notes_csv = this.parse_csv(notes_data);
      this.rank_names = ['MIN', 'F', 'E', 'D', 'C', 'B', 'A', 'AA', 'AAA', 'MAX'];
      this.clear_types = {
        'NO PLAY': 'NO PLAY',
        'FAILED': 'FAILED',
        'ASSIST CLEAR': 'ASSIST',
        'EASY CLEAR': 'EASY',
        'CLEAR': 'CLEAR',
        'HARD CLEAR': 'HARD',
        'EX HARD CLEAR': 'EX HARD',
        'FULLCOMBO CLEAR': 'FULLCOMBO'
      };
      this.long_clear_types = _(this.clear_types).keys();
      tooltip = $('.score_tooltip');
      $(document).on('mouseover', 'td.notes', function() {
        var interval, line_scores, max_score, split;
        split = 9;
        max_score = parseInt($(this).text()) * 2;
        interval = max_score / split;
        line_scores = _(split).times((function(_this) {
          return function(i) {
            var line_score;
            line_score = _self.rank_names[i + 1] + '：' + Math.ceil(interval * (i + 1));
            return $('<div>').text(line_score);
          };
        })(this));
        tooltip.empty().append(line_scores.reverse());
        return tooltip.appendTo(this);
      });
      rotate_rank = ['around', 'prev', 'next'];
      _(rotate_rank).each((function(_this) {
        return function(d, i) {
          return $(document).on('contextmenu', 'th.' + d + '_rank', function() {
            var visible_rank;
            window.dt.column(d + '_rank:name').visible(false);
            visible_rank = rotate_rank[i + 1] || rotate_rank[0];
            window.dt.column(visible_rank + '_rank:name').visible(true);
            return false;
          });
        };
      })(this));
      $(document).on('contextmenu', 'th', (function(_this) {
        return function() {
          return false;
        };
      })(this));
      if (query.debug) {
        this.csv_name = query.csv;
        this.old_csv_name = query.old_csv;
        this.with_old = !!this.old_csv_name;
        if (this.with_old) {
          $.ajax({
            url: './csv/' + this.old_csv_name,
            success: (function(_this) {
              return function(old_data) {
                _this.old_csv_data = old_data;
                return _this.load_current_csv();
              };
            })(this)
          });
        } else {
          this.load_current_csv();
        }
      } else {
        $('content').show();
        view_score = $('label.view_score');
        $(document).on('change', 'li input:file', (function(_this) {
          return function(e) {
            var file, fr, input;
            input = $(e.target);
            file = e.target.files[0];
            fr = new FileReader();
            fr.onload = function(fe) {
              input.closest('label').find('.button').text('[' + file.name + '] selected');
              if (input.is('.current_csv')) {
                _this.csv_name = file.name;
                _this.csv_data = fe.target.result;
                $('input.old_csv').prop({
                  disabled: false
                }).closest('label').removeClass('disabled');
                return view_score.removeClass('disabled');
              } else {
                _this.old_csv_name = file.name;
                _this.with_old = true;
                return _this.old_csv_data = fe.target.result;
              }
            };
            return fr.readAsText(file);
          };
        })(this)).on('click', 'label.view_score', (function(_this) {
          return function() {
            if (!view_score.is('.disabled')) {
              console.log('view start', +(new Date));
              return _this.create_table_with_timeout();
            }
          };
        })(this));
      }
    }

    return TableManager;

  })();

  $(function() {
    return new TableManager();
  });

}).call(this);

