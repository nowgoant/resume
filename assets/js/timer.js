﻿var timer;
(function (timer) {
    function format(d, pattern) {
        pattern = pattern || 'yyyy-MM-dd';
        var y = d.getFullYear().toString(), o = {
            M: d.getMonth() + 1,
            d: d.getDate(),
            h: d.getHours(),
            m: d.getMinutes(),
            s: d.getSeconds()
        };

        pattern = pattern.replace(/(y+)/ig, function (a, b) {
            return y.substr(4 - Math.min(4, b.length));
        });

        for (var i in o) {
            pattern = pattern.replace(new RegExp('(' + i + '+)', 'g'), function (a, b) {
                return (o[i] < 10 && b.length > 1) ? '0' + o[i] : o[i];
            });
        }

        return pattern;
    }
    timer.format = format;

    function diff(dateStart, dateEnd) {
        var start, end, daysFebruary, daysInMonths;

        if (!dateStart || !dateEnd) {
            return;
        }

        start = {
            d: dateStart.getDate(),
            m: dateStart.getMonth() + 1,
            y: dateStart.getFullYear()
        };

        end = {
            d: dateEnd.getDate(),
            m: dateEnd.getMonth() + 1,
            y: dateEnd.getFullYear()
        };

        daysFebruary = end.y % 4 != 0 || (end.y % 100 == 0 && end.y % 400 != 0) ? 28 : 29;
        daysInMonths = [0, 31, daysFebruary, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (end.d < start.d) {
            end.d += daysInMonths[parseInt(end.m)];
            start.m += 1;
        }

        if (end.m < start.m) {
            end.m += 12;
            start.y += 1;
        }

        return {
            years: (end.y - start.y) || 0,
            months: (end.m - start.m) || 0,
            days: (end.d - start.d) || 0
        };
    }
    timer.diff = diff;
})(timer || (timer = {}));
//# sourceMappingURL=timer.js.map
