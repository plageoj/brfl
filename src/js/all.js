window.addEventListener('load', function() {
    setTimeout(function() {
        var remove = ['fc2_footer', 'fc2_bottom_bar', 'fc2_ad_box', 'fc2_affili-footer'];
        angular.forEach(remove, function(e) {
            if (document.getElementById(e))
                document.getElementById(e).remove();
        });
        document.body.style = '';
    }, 2000)
})
angular.module("app", ["ngRoute", "ngAnimate", "mdTOC"])
    .config(["$routeProvider", "$locationProvider", function(n, t) {
        n
            .when("/", { redirectTo: "/home" })
            .when("/:id*", {
                templateUrl: function(n) {
                    return document.title = "PENTA日和", "page/" + angular.lang + "/" + n.id + ".html"
                },
                controller: "pageCtrl"
            });
        t.hashPrefix("x");
    }]).controller("pageCtrl", ["$scope", function(n) {
        n.$on("$routeChangeSuccess", function() {
            setTimeout(function() {
                var n = document.getElementsByTagName("h2")[0];
                document.title = (n ? n.innerText + " - " : "") + "PENTA日和"
            }, 500);
        });
        n.$on("$routeChangeError", function() {
            location.href = "#x/err/404";
        });
        n.date = function(n) {
            var t = new Date(n);
            return t.toLocaleDateString();
        }
    }])
    .controller("mainCtrl", ["$scope", "$http", function(n, t) {
        var e = new Date;
        (function(a) {
            n.year = e.getFullYear();
            var o = function() {
                try {
                    return (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0, 2);
                } catch (n) {
                    return;
                }
            };
            r = localStorage.getItem("lang");
            r || (r = o() || "ja"), "ja".includes(r) || (r = "ja"), document.body.lang = r, angular.lang = r, localStorage.setItem("lang", r), t.get("trans/" + r + ".json").then(function(t) { n.trans = t.data, a() }, a())
        })(function() { n.t = function(t) { return n.trans ? n.trans[t] : t.replace(/_/g, " ") }, t.get("menu.json").then(function(t) { n.menu = t.data[angular.lang].m, n.lang = [], angular.forEach(t.data, function(t, e) { n.lang.push({ s: e, c: t.c }) }) }, null) });
        n.temp = function() {
                return location.hash.replace(/#x\//, "md/" + angular.lang + "/") + ".md"
            }, n.setLang = function(n) { localStorage.setItem("lang", n), location.reload() },
            n.size = function() { n.ss = window.innerWidth + " x " + window.innerHeight }, n.size();
    }]).controller('SudokuCtrl', ['$scope', function(s) {
        var t = this;
        t.seq = [];
        t.actv = 1;
        var hist = [];
        t.reset = function() {
            var empty = { solve: 0, len: 8 };
            for (var i = 1; i <= 9; i++) {
                empty[i] = true;
                t.seq.push(i);
            }
            t.tbl = angular.fromJson(
                ('[' +
                    ('[' + (angular.toJson(empty) + ',').repeat(9) + '],').replace(/,\]/, ']')
                    .repeat(9) + ']').replace(/,\]/, ']')
            );
        };
        t.reset();
        if (localStorage.getItem('sudoku')) {
            t.tbl = angular.fromJson(localStorage.getItem('sudoku'));
        }
        t.fill = function(i, j, h) {
            var ci = parseInt(i / 3) * 3;
            var cj = parseInt(j / 3) * 3;
            var n = parseInt(t.actv);
            if (t.tbl[i][j].len === 0) {
                angular.forEach(t.tbl[i][j], function(v, k) {
                    if (v && k <= 9) n = parseInt(k);
                });
            } else if (!t.tbl[i][j][n]) return;
            if (h)
                hist.push(angular.toJson(t.tbl));
            var red = function(i, j, n) {
                if (t.tbl[i][j].solve) return;
                t.tbl[i][j].len -= t.tbl[i][j][n];
                t.tbl[i][j][n] = false;
            };
            var k;
            t.tbl[i][j] = { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, solve: n, len: 0 };
            for (k = 0; k < 9; k++) {
                red(k, j, n);
                red(i, k, n);
            }
            for (k = 0; k < 3; k++) {
                for (var l = 0; l < 3; l++) {
                    red(ci + k, cj + l, n);
                }
            }
            localStorage.setItem('sudoku', angular.toJson(t.tbl));
        };
        t.undo = function() {
            if (hist.length) {
                t.tbl = angular.fromJson(hist.pop());
                localStorage.setItem('sudoku', angular.toJson(t.tbl));
            }
        };
        t.solve = function(step) {
            var i, j;
            var f;
            var cnt, rnt, bnt;
            var col, row, box;
            var bx, by;
            var n;
            hist.push(angular.toJson(t.tbl));
            do {
                f = false;
                for (i = 0; i < 9; i++) {
                    for (j = 0; j < 9; j++) {
                        if (!t.tbl[i][j].len && !t.tbl[i][j].solve) {
                            angular.forEach(t.tbl[i][j], function(v, k) {
                                if (v && k <= 9) {
                                    t.actv = parseInt(k);
                                    t.fill(i, j, false);
                                    console.log(i, j, '-l->', k);
                                }
                            });
                            f = true;
                            break;
                        }
                    }
                    if (f) break;
                }
                for (i = 0; i < 9; i++) {
                    cnt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    rnt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    bnt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    col = [];
                    row = [];
                    box = [];
                    for (j = 0; j < 9; j++) {
                        if (!t.tbl[i][j].solve) {
                            angular.forEach(t.tbl[i][j], function(v, k) {
                                k = parseInt(k);
                                if (k <= 9 && v) {
                                    cnt[k] += 1;
                                    col[k] = j;
                                }
                            });
                        }
                        if (!t.tbl[j][i].solve) {
                            angular.forEach(t.tbl[j][i], function(v, k) {
                                k = parseInt(k);
                                if (k <= 9 && v) {
                                    rnt[k] += 1;
                                    row[k] = j;
                                }
                            });
                        }
                        bx = (i % 3) * 3 + j % 3;
                        by = parseInt(i / 3) * 3 + parseInt(j / 3);
                        if (!t.tbl[by][bx].solve) {
                            angular.forEach(t.tbl[by][bx], function(v, k) {
                                k = parseInt(k);
                                if (k <= 9 && v) {
                                    bnt[k] += 1;
                                    box[k] = j;
                                }
                            });
                        }
                    }
                    n = cnt.findIndex(function(v) { return v === 1 });
                    if (n !== -1) {
                        console.log(i, col[n], '-c->', n);
                        t.actv = n;
                        t.fill(i, col[n]);
                        f = true;
                        break;
                    }
                    n = rnt.findIndex(function(v) { return v === 1 });
                    if (n !== -1) {
                        console.log(row[n], i, '-r->', n);
                        t.actv = n;
                        t.fill(row[n], i);
                        f = true;
                        break;
                    }
                    n = bnt.findIndex(function(v) { return v === 1 });
                    if (n !== -1) {
                        bx = (i % 3) * 3 + box[n] % 3;
                        by = parseInt(i / 3) * 3 + parseInt(box[n] / 3);
                        console.log(by, bx, '-b->', n);
                        t.actv = n;
                        t.fill(by, bx);
                        f = true;
                        break;
                    }
                }
            }
            while (f && !step);
        };
    }]);
angular.module("mdTOC", [])
    .directive('twLoad', function() {
        return {
            restrict: 'A',
            scope: {},
            controller: function() {
                if (twttr)
                    twttr.widgets.load();
            }
        }
    })
    .directive("mdToc", function() {
        return {
            restrict: "E",
            template: '<p>Table of contents</p><ul><li class="md-1"><a onclick="zenscroll.toY(0)">Top</a></li><li ng-repeat="i in ct" class="md-{{i.lvl}}"><a ng-click="jump(i)" ng-bind="i.content"></a></li></ul>',
            scope: {},
            link: function(n, t, e) {
                n.ct = angular.fromJson(e.content);
                n.jump = function(n) {
                    angular.forEach(document.getElementsByTagName("h" + n.lvl), function(t) {
                        if (t.innerText === n.content) {
                            t.getBoundingClientRect().top + window.pageXOffset;
                            zenscroll.to(t);
                        }
                    });
                };
            }
        };
    });