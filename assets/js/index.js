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
        "1": { name: '远洋地产SOA', duration: 1.5 },
        "2": { name: '中石油管道移动平台', duration: 0.5 },
        "3": { name: '微软123导航', duration: 1.1 }
    };

    function filterProjects(d) {
        return projectsHash[d.project] ? projectsHash[d.project].duration : 0;
    }

    d3.csv('data/resume-2014.csv', function (resume) {
        var projectNames = [], timelong = [];

        var ndx = crossfilter(resume);

        var experChart;

        //项目经验
        (function (_ndx) {
            var projects = _ndx.dimension(function (d) {
                return d.project;
            });

            var resumeByProjectGroup = projects.group().reduceSum(filterProjects);

            experChart = dc.pieChart("#projectExperiences-area").width($("#projectExperiences-area").parent().width()).height(250).radius(125).innerRadius(50).dimension(projects).group(resumeByProjectGroup).legend(dc.legend().x(10).y(10).itemHeight(20).gap(10));
        })(ndx);

        //技能
        (function (_ndx) {
            var techs = _ndx.dimension(function (d) {
                return d.tech.toLowerCase();
            });
            console.log(techs);
            var resumeByTechGroup = techs.group().reduceSum(function (d) {
                return +d.duration;
            });

            var techChart = dc.rowChart("#tech-area").width($("#tech-area").parent().width()).height(800).dimension(techs).group(resumeByTechGroup).elasticX(true);
        })(ndx);

        dc.renderAll();

        d3.selectAll("#projectExperiences-area .dc-legend text").forEach(function (item, index, array) {
            item.forEach(function (txt, index) {
                d3.select(txt).text(projectsHash[index].name);
            });
        });
        //.attr("transform", "translate(0,10)");
    });
})();
//# sourceMappingURL=index.js.map
