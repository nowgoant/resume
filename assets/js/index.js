/// <reference path="../../scripts/typings/d3/d3.d.ts" />
/// <reference path="../../scripts/typings/d3/d3.d.ts" />
/// <reference path="../../scripts/typings/crossfilter/crossfilter.d.ts" />
/// <reference path="../../scripts/typings/iresumedata.d.ts" />
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

        //项目经验
        (function (_ndx) {
            var projects = _ndx.dimension(function (d) {
                return d.project;
            });

            var resumeByProjectGroup = projects.group().reduceSum(filterProjects);

            dc.pieChart("#projectExperiences-area").width(500).height(250).radius(125).innerRadius(50).dimension(projects).group(resumeByProjectGroup);
        })(ndx);

        //技能
        (function (_ndx) {
            var techs = _ndx.dimension(function (d) {
                return d.tech;
            });

            var resumeByTechGroup = techs.group();
            dc.pieChart("#tech-area").width(500).height(250).radius(125).innerRadius(50).dimension(techs).group(resumeByTechGroup);
        })(ndx);

        //var expByCampusChart = dc.barChart("#experiences_bar")
        //    .width(500)
        //    .height(250)
        //    .transitionDuration(750)
        //    .margins({ top: 20, right: 10, bottom: 80, left: 80 })
        //    .dimension(projectLong)
        //    .group(resumeByProjectLong)
        ////.centerBar(true)
        //// .brushOn(false)
        //// .gap(1)
        ////.elasticY(true)
        //// .colors(['steelblue'])
        ////.xUnits(dc.units.ordinal)
        ////.x(d3.scale.ordinal().domain(projectNames))
        //    .x(d3.scale.linear().domain([0, d3.max(timelong)]))
        //    .y(d3.scale.linear().domain([0, d3.max(timelong)]))
        //    .renderHorizontalGridLines(true);
        //expByCampusChart.xAxis().ticks(5);
        dc.renderAll();

        d3.selectAll("g.x text").attr("transform", "translate(0,10)");
    });
})();
//# sourceMappingURL=index.js.map
