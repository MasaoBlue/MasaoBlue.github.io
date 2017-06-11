(function() {
    var e, t = function(e, t) {
        return function() {
            return e.apply(t, arguments);
        };
    };
    window.undefined_title = [], e = function() {
        function e() {
            this.init_filter = t(this.init_filter, this), this.init_data_table = t(this.init_data_table, this), 
            this.create_table = t(this.create_table, this), this.create_table_with_timeout = t(this.create_table_with_timeout, this), 
            this.init_column_defs = t(this.init_column_defs, this), this.load_current_csv = t(this.load_current_csv, this), 
            this.parse_csv = t(this.parse_csv, this), this.score_to_rank = t(this.score_to_rank, this), 
            this.to_version_label = t(this.to_version_label, this), this.to_version_num = t(this.to_version_num, this), 
            this.convert_title = t(this.convert_title, this);
            var e, n, r, i, a;
            e = this, n = URI(location.href).search(!0), this.table = $("#score_table"), this.header = $(".filter_header .inner"), 
            this.score_viewer = $(".filter_header, .table_container"), this.loading = $(".loading_message"), 
            console.log("start", +new Date()), window.notes_csv = this.notes_csv = this.parse_csv(notes_data), 
            this.rank_names = [ "MIN", "F", "E", "D", "C", "B", "A", "AA", "AAA", "MAX" ], this.clear_types = {
                "NO PLAY": "NO PLAY",
                FAILED: "FAILED",
                "ASSIST CLEAR": "ASSIST",
                "EASY CLEAR": "EASY",
                CLEAR: "CLEAR",
                "HARD CLEAR": "HARD",
                "EX HARD CLEAR": "EX HARD",
                "FULLCOMBO CLEAR": "FULLCOMBO"
            }, this.long_clear_types = _(this.clear_types).keys(), i = $(".score_tooltip"), 
            $(document).on("mouseover", "td.notes", function() {
                var t, n, r;
                return 9, r = 2 * parseInt($(this).text()), t = r / 9, n = _(9).times(function(n) {
                    return function(n) {
                        var r;
                        return r = e.rank_names[n + 1] + "：" + Math.ceil(t * (n + 1)), $("<div>").text(r);
                    };
                }()), i.empty().append(n.reverse()), i.appendTo(this);
            }), r = [ "around", "prev", "next" ], _(r).each(function(e) {
                return function(e, t) {
                    return $(document).on("contextmenu", "th." + e + "_rank", function() {
                        var n;
                        return window.dt.column(e + "_rank:name").visible(!1), n = r[t + 1] || r[0], window.dt.column(n + "_rank:name").visible(!0), 
                        !1;
                    });
                };
            }()), $(document).on("contextmenu", "th", function(e) {
                return function() {
                    return !1;
                };
            }()), n.debug ? (this.csv_name = n.csv, this.old_csv_name = n.old_csv, this.with_old = !!this.old_csv_name, 
            this.with_old ? $.ajax({
                url: "./csv/" + this.old_csv_name,
                success: function(e) {
                    return function(t) {
                        return e.old_csv_data = t, e.load_current_csv();
                    };
                }(this)
            }) : this.load_current_csv()) : ($("content").show(), a = $("label.view_score"), 
            $(document).on("change", "li input:file", function(e) {
                return function(t) {
                    var n, r, i;
                    return i = $(t.target), n = t.target.files[0], r = new FileReader(), r.onload = function(t) {
                        return i.closest("label").find(".button").text("[" + n.name + "] selected"), i.is(".current_csv") ? (e.csv_name = n.name, 
                        e.csv_data = t.target.result, $("input.old_csv").prop({
                            disabled: !1
                        }).closest("label").removeClass("disabled"), a.removeClass("disabled")) : (e.old_csv_name = n.name, 
                        e.with_old = !0, e.old_csv_data = t.target.result);
                    }, r.readAsText(n);
                };
            }(this)).on("click", "label.view_score", function(e) {
                return function() {
                    if (!a.is(".disabled")) return console.log("view start", +new Date()), e.create_table_with_timeout();
                };
            }(this)));
        }
        return e.prototype.convert_title = function(e) {
            return {
                "19，November": "19,November",
                "Sweet Sweet Magic": "Sweet Sweet♥Magic",
                "Raspberry Heart(English version)": "Raspberry♥Heart(English version)",
                "ピアノ協奏曲第１番”蠍火”": 'ピアノ協奏曲第1番"蠍火"',
                "ＵＬＴｉＭΛＴＥ": "ULTiM∧TE",
                "100％ minimoo-G": "100% minimoo-G",
                "Double Loving Heart": "Double♥♥Loving Heart",
                "Blind Justice ～Torn souls， Hurt Faiths ～": "Blind Justice ～Torn souls, Hurt Faiths～",
                "never…": "never...",
                "花吹雪 ～ IIDX LIMITED ～": "花吹雪 ～IIDX LIMITED～",
                Ubertreffen: "Übertreffen",
                "Punch Love 仮面": "Punch Love♡仮面",
                "Raison d'etre～交差する宿命～": "Raison d'être～交差する宿命～",
                "ワルツ第17番 ト短調”大犬のワルツ”": 'ワルツ第17番 ト短調"大犬のワルツ"',
                "A MINSTREL ～ ver. short-scape ～": "A MINSTREL ～ver. short-scape～",
                "恋する☆宇宙戦争っ！！": "恋する☆宇宙戦争っ!!",
                "Light and Cyber…": "Light and Cyber･･･",
                Praludium: "Präludium",
                "キャトられ恋はモ～モク": "キャトられ♥恋はモ～モク",
                ATHER: "ÆTHER",
                Atropos: "Atröpøs",
                "Close the World feat. a☆ru": "Close the World feat.a☆ru",
                "旋律のドグマ～Miserables～": "旋律のドグマ～Misérables～",
                "超!!遠距離らぶメ～ル": "超!!遠距離らぶ♡メ～ル",
                "表裏一体！？怪盗いいんちょの悩み": "表裏一体！？怪盗いいんちょの悩み♥",
                "!Viva!": "¡Viva!",
                "火影": "焱影",
                "Verflucht†LEGGENDARIA": "Verflucht †LEGGENDARIA"
            }[e] || e;
        }, e.prototype.to_version_num = function(e) {
            var t;
            return t = [ "IIDX RED", "HAPPY SKY", "DistorteD", "GOLD", "DJ TROOPERS", "EMPRESS", "SIRIUS", "Resort Anthem", "Lincle", "tricoro", "SPADA", "PENDUAL", "copula", "SINOBUZ" ], 
            void 0, t.indexOf(e) >= 0 ? t.indexOf(e) + 11 : e.match("\\d+")[0];
        }, e.prototype.to_version_label = function(e) {
            var t;
            return t = {
                "1st&substream": "1st&s",
                "DJ TROOPERS": "TROOPERS"
            }, t[e] ? t[e] : e.replace(" style", "");
        }, e.prototype.score_to_rank = function(e, t) {
            var n, r, i, a;
            return 9, i = 2 * t, n = i / 9, r = _(9).times(function(e) {
                return function(e) {
                    return Math.ceil(n * (e + 1));
                };
            }()), a = _(r).find(function(t) {
                return function(t) {
                    return t >= e;
                };
            }()), this.rank_names[r.indexOf(a)];
        }, e.prototype.parse_csv = function(e) {
            return null == e && (e = ""), Papa.parse(e.trim()).data;
        }, e.prototype.load_current_csv = function() {
            return $.ajax({
                url: "./csv/" + this.csv_name,
                success: function(e) {
                    return function(t) {
                        return console.log("loaded", +new Date()), e.csv_data = t, e.create_table_with_timeout();
                    };
                }(this)
            });
        }, e.prototype.init_column_defs = function() {
            var e;
            return e = [ "desc", "asc" ], this.column_defs = {
                version_number: {
                    visible: !1
                },
                version: {
                    orderSequence: e
                },
                title: {},
                difficulty: {},
                level: {
                    orderSequence: e
                },
                notes: {
                    orderSequence: e
                },
                score_diff: {
                    visible: this.with_old,
                    orderSequence: e
                },
                score_diff_filter: {
                    visible: !1
                },
                score_bar: {
                    sortable: !this.with_old,
                    orderSequence: e
                },
                score_rate: {
                    sortable: !this.with_old,
                    orderSequence: e
                },
                score: {
                    visible: !1
                },
                rank: {
                    sortable: !this.with_old
                },
                rank_filter: {
                    visible: !1
                },
                next_rank: {
                    visible: !1,
                    sortable: !this.with_old
                },
                prev_rank: {
                    visible: !1,
                    sortable: !this.with_old
                },
                around_rank: {
                    sortable: !this.with_old
                },
                miss: {
                    sortable: !this.with_old,
                    orderSequence: e
                },
                miss_filter: {
                    visible: !1
                },
                clear_type: {
                    sortable: !this.with_old
                },
                clear_type_filter: {
                    visible: !1
                },
                play_count: {
                    sortable: !this.with_old,
                    orderSequence: e
                },
                date: {
                    sortable: !this.with_old,
                    orderSequence: e
                }
            }, _({
                version: "version_number",
                score_bar: "score"
            }).each(function(e) {
                return function(t, n) {
                    var r;
                    return r = _(e.column_defs).chain().keys().findIndex(function(e) {
                        return e === t;
                    }).value(), e.column_defs[n].orderData = [ r ];
                };
            }(this));
        }, e.prototype.create_table_with_timeout = function() {
            return $("content").hide(), this.score_viewer.show().css({
                visibility: "hidden"
            }), this.loading.show(), setTimeout(function(e) {
                return function() {
                    return e.create_table();
                };
            }(this), 100);
        }, e.prototype.create_table = function() {
            var e, t, n, r, i, a, s, o, c, l, u, d, h, f;
            return this.with_old = !!this.with_old, $("body").toggleClass("with_old", this.with_old), 
            this.init_column_defs(), window.csv = n = this.parse_csv(this.csv_data), o = this.old_csv = this.parse_csv(this.old_csv_data), 
            h = this.table.find("thead"), d = this.table.find("tbody"), window.columns = [], 
            r = null, c = null, i = {}, l = {}, t = {
                "バージョン": "version",
                "タイトル": "title",
                "プレー回数": "play_count",
                "最終プレー日時": "date"
            }, e = {}, s = {}, a = _(n).min(function(e, t) {
                return 0 === t ? "99999999" : _.last(e);
            }), a = _.last(a), _(n).select(function(e) {
                return function(e) {
                    return _.last(e) === a;
                };
            }()).length <= 1 && (a = null), _(n).each(function(n) {
                return function(o, u) {
                    var f, p, v, m, b, w;
                    return 0 === u ? (r = o, c = b = n.old_csv[u], _([ "normal", "hyper", "another" ]).each(function(e) {
                        return i[e] = _(o).findIndex(function(t) {
                            return t.match("^" + e.toUpperCase());
                        }), l[e] = _(b).findIndex(function(t) {
                            return t.match("^" + e.toUpperCase());
                        });
                    }), _(o).each(function(n, r) {
                        var i;
                        if (i = t[n]) return e[i] = r;
                    }), _(b).each(function(e, n) {
                        var r;
                        if (r = t[e]) return s[r] = n;
                    }), w = $("<tr>").appendTo(h), _(n.column_defs).each(function(e, t) {
                        var n, r;
                        return r = {
                            score_bar: "score",
                            score_rate: "rate",
                            score_diff: "score diff",
                            clear_type: "clear",
                            play_count: "play count",
                            next_rank: "next rank",
                            prev_rank: "prev rank",
                            around_rank: "around rank",
                            date: "last play",
                            difficulty: "N,H,A",
                            lavel: "LV"
                        }, n = r[t] || t, w.append($("<th>").text(n));
                    }), console.log(o)) : (p = _(e).reduce(function(e, t, r) {
                        var i;
                        switch (i = o[t], r) {
                          case "date":
                            i = i === a ? "" : moment(i, "YYYY-MM-DD HH:mm").format("MM/DD HH:mm");
                            break;

                          case "title":
                            e.original_title = i, i = n.convert_title(i);
                        }
                        return e[r] = i, e;
                    }, {}), b = _(n.old_csv).find(function(e, t) {
                        return e[s.title] === p.original_title;
                    }), m = _(s).reduce(function(e, t, r) {
                        var i;
                        if (b) {
                            switch (i = b[t], r) {
                              case "date":
                                i = i === a ? "" : moment(i, "YYYY-MM-DD HH:mm").format("MM/DD HH:mm");
                                break;

                              case "title":
                                i = n.convert_title(i);
                            }
                            e[r] = i;
                        }
                        return e;
                    }, {}), f = {
                        level: "難易度",
                        score: "EXスコア",
                        p_great: "PGreat",
                        great: "Great",
                        clear_type: "クリアタイプ",
                        miss: "ミスカウント",
                        rank: "DJ LEVEL"
                    }, v = -1, _(i).each(function(e, t) {
                        var i, a, s, l, u;
                        if (i = t.toUpperCase(), v++, s = function(e) {
                            return o[r.indexOf(i + " " + f[e])];
                        }, a = function(e) {
                            if (b) return b[c.indexOf(i + " " + f[e])];
                        }, "0" !== s("level") && (!n.with_old || parseInt(s("score")) > 0 && parseInt(a("score")) > 0)) return w = $("<tr>").appendTo(d), 
                        u = _.find(n.notes_csv, function(e) {
                            return e[0] === p.title;
                        }), l = "not found", u ? l = parseInt(u[v + 1]) : window.undefined_title.push(p.title), 
                        _(n.column_defs).each(function(e, r) {
                            var o, c, u, d, h, f, v, b, k, g, y, x, I, A, D, E, L, C, R, S, O, T, M, H, P, U;
                            if (D = !1, H = $("<td>").appendTo(w), U = p[r], u = [], I = [], o = {}, x = {}, 
                            _.isUndefined(U)) switch (P = s(r), _.isUndefined(P) || (U = P), C = a(r), _.isUndefined(C) || (R = C), 
                            r) {
                              case "miss":
                                D = !0, "---" === U && (U = ""), parseInt(R) < 0 && (R = "");
                                break;

                              case "miss_filter":
                                U = (y = parseInt(s("miss")) - parseInt(a("miss"))) < 0 ? "win" : y > 0 ? "lose" : "even";
                                break;

                              case "difficulty":
                                U = i.substr(0, 1), u.push(t);
                                break;

                              case "next_rank":
                                D = !0, U = R = "", l > 0 && (b = (g = 2 * l) / (M = 9), k = _(M).times(function(e) {
                                    return Math.ceil(b * (e + 1));
                                }), U = (d = function(e, t) {
                                    var r, i, a;
                                    if ((a = parseInt(e("score"))) > 0) return i = _(k).find(function(e) {
                                        return e > a;
                                    }), r = n.rank_names[k.indexOf(i) + 1], t.rank = r, a - i;
                                })(s, o), R = d(a, x));
                                break;

                              case "prev_rank":
                                D = !0, U = R = "", l > 0 && (b = (g = 2 * l) / (M = 9), k = _(M).times(function(e) {
                                    return Math.ceil(b * (e + 1));
                                }), U = (d = function(e, t) {
                                    var r, i, a;
                                    if ((a = parseInt(e("score"))) > 0) return i = _(k).find(function(e, t) {
                                        return k[t + 1] > a;
                                    }), r = n.rank_names[k.indexOf(i) + 1], t.rank = r, "+" + (a - i);
                                })(s, o), R = d(a, x));
                                break;

                              case "around_rank":
                                D = !0, U = R = "", l > 0 && (b = (g = 2 * l) / (M = 9), k = _(M).times(function(e) {
                                    return Math.ceil(b * (e + 1));
                                }), U = (d = function(e, t) {
                                    var r, i, a, s, o, c;
                                    if ((c = parseInt(e("score"))) > 0) return s = _(k).find(function(e) {
                                        return e > c;
                                    }), o = k[k.indexOf(s) - 1], i = s - c > c - o ? o : s, a = n.rank_names[k.indexOf(i) + 1], 
                                    t.rank = a, r = c - i, r < 0 ? r : "+" + r;
                                })(s, o), R = d(a, x));
                                break;

                              case "notes":
                                U = l;
                                break;

                              case "score_rate":
                                D = !0, U = 0, (O = parseInt(s("score"))) > 0 && (U = O / (g = 2 * l) * 100);
                                break;

                              case "score_bar":
                                D = !0, H.attr({
                                    colspan: 2
                                }), _([ "a", "aa", "aaa" ]).each(function(e) {
                                    return H.append($("<div>").addClass("line " + e));
                                }), U = (h = function(e) {
                                    var t, r, i;
                                    return i = e("score"), r = 0, O = parseInt(i), t = n.header.find(".score_bar_container").clone(), 
                                    O > 0 && (r = O / (g = 2 * l) * 100), _.isUndefined(i) ? P = r = "---" : (P = i + "(" + e("p_great") + "/" + e("great") + ")", 
                                    r = "not found" === l ? "---" : r.toFixed(2), t.find(".bar").css({
                                        width: r + "%"
                                    })), t.find(".rate").text(r), t.find(".value").text(P), t;
                                })(s), R = h(a);
                                break;

                              case "score_diff":
                                (U = parseInt(s("score")) - parseInt(a("score"))) > 0 ? U = "+" + U : U < 0 && u.push("minus");
                                break;

                              case "score_diff_filter":
                                U = (T = parseInt(s("score")) - parseInt(a("score"))) > 0 ? "win" : T < 0 ? "lose" : "even";
                                break;

                              case "clear_type":
                                D = !0, U = n.clear_types[U] || "", R = n.clear_types[R] || "", u.push(U.replace(/ /g, "_").toLowerCase()), 
                                I.push(R.replace(/ /g, "_").toLowerCase());
                                break;

                              case "clear_type_filter":
                                U = (c = n.long_clear_types.indexOf(s("clear_type")) - n.long_clear_types.indexOf(a("clear_type"))) > 0 ? "win" : c < 0 ? "lose" : "even";
                                break;

                              case "version_number":
                                U = n.to_version_num(p.version);
                                break;

                              case "rank":
                                D = !0, O = parseInt(s("score")), (L = parseInt(a("score"))) > 0 && _.isEmpty(R) && (R = n.score_to_rank(L, l)), 
                                U && u.push(U.toLowerCase()), R && I.push(R.toLowerCase());
                                break;

                              case "rank_filter":
                                f = s("rank"), E = a("rank"), _.isEmpty(E) && (L = parseInt(a("score"))) > 0 && (E = n.score_to_rank(L, l)), 
                                U = (S = n.rank_names.indexOf(f) - n.rank_names.indexOf(E)) > 0 ? "win" : S < 0 ? "lose" : "even";
                            } else switch (R = m[r], r) {
                              case "date":
                              case "play_count":
                                D = !0;
                                break;

                              case "version":
                                U = n.to_version_label(U);
                            }
                            return D && n.with_old ? (H.addClass("no_padding"), v = $("<div>").addClass("inner").appendTo(H), 
                            A = $("<div>").addClass("old").appendTo(v).addClass(I.join(" ")).attr(x), $("<div>").addClass("split_line").appendTo(v), 
                            $("<div>").addClass("current").appendTo(v).addClass(u.join(" ")).attr(o).append(U), 
                            A.append(R)) : H.append(U).addClass(u.join(" ")).attr(o);
                        });
                    }));
                };
            }(this)), f = _(n).last()[e.version], this.header.find(".current_file").text(this.csv_name + "(" + f + ")"), 
            this.with_old && (u = _(o).last()[e.version], this.header.find(".old_file").text(this.old_csv_name + "(" + u + ")")), 
            this.init_data_table(), this.init_filter();
        }, e.prototype.init_data_table = function() {
            var e;
            return console.log("ended", +new Date()), e = !1, window.dt = this.table.DataTable({
                autoWidth: !1,
                pageLength: 100,
                paging: !0,
                fixedHeader: {
                    header: !0,
                    footer: !0
                },
                columns: _(this.column_defs).map(function(e, t) {
                    return e.className = t, e.name = t, e;
                }),
                drawCallback: function(t) {
                    return function() {
                        if (!e) return e = !0, setTimeout(function() {
                            return $(window.dt.column("version:name").header()).click();
                        }, 0);
                    };
                }(),
                order: [ [ 1, "desc" ] ]
            }), window.dt.fixedHeader.headerOffset(this.header.closest(".filter_header").outerHeight()), 
            this.loading.hide(), this.score_viewer.css({
                visibility: "visible"
            }).hide().fadeIn(), $("#score_table_paginate, #score_table_info").appendTo(this.header), 
            console.log("notes data not found", undefined_title);
        }, e.prototype.init_filter = function() {
            var e, t, n, r, i, a;
            return e = {
                version: {},
                difficulty: {
                    reverse: !0
                },
                level: {
                    sort: "integer",
                    reverse: !0
                },
                rank: {
                    sort: this.rank_names
                },
                clear_type: {
                    sort: _(this.clear_types).values()
                }
            }, this.with_old && (e.score_diff = {
                target: "score_diff_filter"
            }, e.rank = {
                target: "rank_filter"
            }, e.miss = {
                target: "miss_filter"
            }, e.clear_type = {
                target: "clear_type_filter"
            }), _(e).each(function(t) {
                return function(t, n) {
                    var r;
                    return (r = e[n]).target || (r.target = n);
                };
            }()), a = this.header.find(".checkbox"), t = function(e) {
                return function(t) {
                    var n;
                    return (n = $($(".fixedHeader-floating")[0] || e.table[0]).find("th." + t)).addClass("filter_visible"), 
                    setTimeout(function() {
                        return n.removeClass("filter_visible");
                    }, 1);
                };
            }(this), n = function(t) {
                return function(t) {
                    return _(e).each(function(e, n) {
                        var r, i, a, s, o, c;
                        if (c = e.target, r = window.dt.column(c + ":name", {
                            search: "applied"
                        }), o = window.dt.column(n + ":name", {
                            search: "applied"
                        }), !t || t.index() !== r.index()) return a = r.search(), r.search(""), s = r.data(), 
                        i = _(s).countBy(), _($(o.header()).find(".check_container input")).each(function(e) {
                            var t;
                            return e = $(e), t = i[$("<div>").text(e.val()).html()] || 0, e.siblings("label").text(e.val() + " (" + t + ")"), 
                            e.prop("disabled", 0 === t), e.parent().toggleClass("disabled", 0 === t);
                        }), r.search(a, !0);
                    });
                };
            }(), r = $("input.search"), i = function() {
                return window.dt.column("title:name").search(r.val().trim()).draw(), n();
            }, r.on("keyup", function() {
                return i();
            }), _(e).each(function(e) {
                return function(e, r) {
                    var i, s, o, c, l, u, d, h, f, p, v;
                    return p = e.target, o = window.dt.column(p + ":name"), d = window.dt.column(r + ":name"), 
                    v = $(d.header()), c = a.clone(), s = c.find(".check_container"), i = c.find(".all input"), 
                    v.append(c), c.on("click", function(e) {
                        return e.stopPropagation();
                    }), i.on("click", function(e) {
                        var t;
                        return t = $(this).is(":checked"), s.find("input").prop({
                            checked: t
                        }), f();
                    }), f = function(e) {
                        var a, c, l;
                        return null == e && (e = !0), a = _(s.find("input:checked")).map(function(e) {
                            return $(e).val().replace(" ", "\\s");
                        }), l = !!s.find("input:not(:checked)")[0], v.toggleClass("searched", l), i.prop({
                            checked: !l
                        }), c = "^(" + a.join("|") + ")$", o.search(c, !0).draw(), t(r), n(o);
                    }, u = o.data(), l = _(u).chain().countBy().map(function(e, t) {
                        return {
                            key: t,
                            value: e
                        };
                    }), console.log(r, e), e.sort && (l = l.sortBy(function(t) {
                        return "integer" === e.sort ? parseInt(t.key) : -e.sort.indexOf(t.key);
                    })), l = l.value(), c = void 0, h = 0, _(l).each(function(t) {
                        var n, r, i, a;
                        return a = t.key, t.value, h % 12 == 0 && (c = $("<div>"), s.append(c)), a = $("<div>").html(a).text(), 
                        n = $("<input>").attr({
                            type: "checkbox",
                            checked: !0,
                            value: a
                        }), i = $("<label>"), r = $("<div>").append(n).append(i), e.reverse ? c.prepend(r) : c.append(r), 
                        h++, i.on("click", function() {
                            if (!$(this).closest(".disabled")[0]) return n.prop({
                                checked: !0
                            }), s.find("input").not(n).prop({
                                checked: !1
                            }), f();
                        }), n.on("change", function() {
                            return f();
                        });
                    });
                };
            }()), n();
        }, e;
    }(), $(function() {
        return $.ajax({
            url: "csv/notes.csv",
            success: function(t) {
                return window.notes_data = t, new e();
            }
        });
    });
}).call(this);