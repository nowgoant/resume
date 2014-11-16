/// <reference path="../../scripts/typings/d3/d3.d.ts" />
/// <reference path="../../scripts/typings/d3/d3.d.ts" />
/// <reference path="../../scripts/typings/crossfilter/crossfilter.d.ts" />
/// <reference path="../../scripts/typings/iresumedata.d.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="timer.ts" />

'use strict';

(function () {
    var timeFormat = d3.time.format.iso, projectsHash = {
        "0": { name: '实习', duration: 1 },
        "1": { name: '远洋地产SOA', duration: 1.5, year: '201108-201302', company: '明河伟业科技有限公司' },
        "2": { name: '中石油管道移动平台', duration: 0.5, year: '201304-201310', company: '长城软件' },
        "3": { name: '微软123导航', duration: 1.1, year: '201310-至今', company: '软通动力' }
    };

    function filterProjects(d) {
        return projectsHash[d.project] ? projectsHash[d.project].duration : 0;
    }

    d3.csv('data/resume-2014.csv', function (resume) {
        var projectNames = [], timelong = [];

        var ndx = crossfilter(resume);
        var all = ndx.groupAll();
        var experChart;

        //项目经验
        (function (_ndx) {
            var projects = _ndx.dimension(function (d) {
                return projectsHash[d.project].name;
            });

            var resumeByProjectGroup = projects.group().reduceSum(function (d) {
                return +d.duration;
            });

            experChart = dc.pieChart("#projectExperiences-area").width($("#projectExperiences-area").parent().width()).height(250).radius(125).innerRadius(50).dimension(projects).group(resumeByProjectGroup).legend(dc.legend().x(10).y(10).itemHeight(20).gap(10)).title(function (d) {
                var key = d.key || (d.data && d.data.key), value = d.value || (d.data && d.data.value);
                return "大小:   " + value + "\n" + "项目名称:  " + key + "\n";
            });
        })(ndx);

        //技能
        (function (_ndx) {
            var techs = _ndx.dimension(function (d) {
                return d.tech;
            });

            //console.log(techs);
            var resumeByTechGroup = techs.group().reduceSum(function (d) {
                return +d.duration;
            });

            var techChart = dc.rowChart("#tech-area").width($("#tech-area").parent().width()).height(810).dimension(techs).group(resumeByTechGroup).elasticX(true).title(function (d) {
                var key = d.key, value = d.value;
                return "技术名称:" + key.toUpperCase() + "\n" + "使用时间:" + value / 12 + "(年)\n";
            });
            ;
        })(ndx);

        //工作时间
        (function (_ndx) {
            var tempData = {};
            var projects = _ndx.dimension(function (d) {
                tempData[projectsHash[d.project].year] = d.project;
                return projectsHash[d.project].year;
            });

            var resumeByProjectGroup = projects.group().reduceSum(function (d) {
                return +d.duration;
            });

            experChart = dc.pieChart("#year-area").width($("#year-area").parent().width()).height(250).radius(125).innerRadius(50).dimension(projects).group(resumeByProjectGroup).legend(dc.legend().x(10).y(10).itemHeight(20).gap(10)).title(function (d) {
                var key = d.key || (d.data && d.data.key), value = d.value || (d.data && d.data.value);
                return "时长:" + key + "\n" + "公司名称:  " + projectsHash[tempData[key]]['company'] + "\n";
            });
        })(ndx);

        //公司
        (function (_ndx) {
            var tempData = {};
            var companys = _ndx.dimension(function (d) {
                var temp = projectsHash[d.project].company && projectsHash[d.project].company.substring(0, 2);
                tempData[temp] = d.project;
                return temp;
            });

            var resumeByCompanyGroup = companys.group().reduceSum(function (d) {
                return +d.duration;
            });

            var companysChart = dc.pieChart("#company-area").width($("#company-area").parent().width()).height(180).radius(80).dimension(companys).group(resumeByCompanyGroup).legend(dc.legend().x(10).y(10).itemHeight(20).gap(10)).title(function (d) {
                var key = d.key || (d.data && d.data.key), value = d.value || (d.data && d.data.value);
                return "时长:" + key + "\n" + "公司名称:  " + projectsHash[tempData[key]]['company'] + "\n";
            }).label(function (d) {
                //if (companysChart.hasFilter() && !companysChart.hasFilter(d.key))
                //    return d.key + "(0%)";
                var label = d.key;

                //if (all.value())
                //    label += "(" + Math.floor(d.value / all.value() * 100) + "%)";
                //console.log(d.value + ' ' + all.value());
                return label;
            });
        })(ndx);

        dc.renderAll();
        $('.loader', $("#work-area")).remove();

        //debugger
        $(window).resize(function () {
            // dc.renderAll();
        });
    });
})();

(function () {
    $(document).ready(function () {
        $("#navbar").addClass("slide--up").headroom({
            tolerance: {
                down: 10,
                up: 150
            },
            offset: 10,
            classes: {
                initial: "slide",
                pinned: "slide--reset",
                unpinned: "slide--up"
            }
        });
    });
})();

(function () {
    var timeFormat = d3.time.format.iso;

    d3.csv('data/interest-2014.csv', function (resume) {
        var ndx = crossfilter(resume);

        //兴趣技能类型
        (function (_ndx) {
            var types = _ndx.dimension(function (d) {
                return d.type;
            });

            var resumeByTypesGroup = types.group();

            var typsChart = dc.pieChart("#inter-type-area").width($("#inter-type-area").parent().width()).height(250).radius(125).innerRadius(50).dimension(types).group(resumeByTypesGroup).legend(dc.legend().x(10).y(10).itemHeight(20).gap(10)).title(function (d) {
                var key = d.key || (d.data && d.data.key), value = d.value || (d.data && d.data.value);
                return "类型名称:" + key + "\n";
            });
        })(ndx);

        //兴趣技能
        (function (_ndx) {
            var techs = _ndx.dimension(function (d) {
                return d.tech;
            });

            //console.log(techs);
            var resumeByTechGroup = techs.group().reduceSum(function (d) {
                return +d.duration;
            });

            var techChart = dc.rowChart("#inter-tech-area").width($("#inter-tech-area").parent().width()).height(600).dimension(techs).group(resumeByTechGroup).elasticX(true).title(function (d) {
                var key = d.key, value = d.value;
                return "技术名称:" + key.toUpperCase() + "\n" + "使用时间:" + value / 12 + "(年)\n";
            });
        })(ndx);

        //书
        (function (_ndx) {
            var books = _ndx.dimension(function (d) {
                return d.books;
            });

            var resumeByBooksGroup = books.group().reduceSum(function (d) {
                return +d.bookCount;
            });

            var techChart = dc.rowChart("#inter-book-area").width($("#inter-book-area").parent().width()).height(300).dimension(books).group(resumeByBooksGroup).elasticX(true).title(function (d) {
                var key = d.key, value = d.value;
                return "书名:" + key.toUpperCase() + "\n";
            });
        })(ndx);

        dc.renderAll();
        $('.loader', $("#interest-area")).remove();
    });
})();
//# sourceMappingURL=index.js.map
