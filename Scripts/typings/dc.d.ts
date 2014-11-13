/// <reference path="d3/d3.d.ts" />

declare module dc {
    export function lineChart(selector: string): any;
    export function barChart(selector: string): any;
    export function pieChart(selector: string): any;
    export function bubbleChart(selector: string): any;
    export function rowChart(selector: string): any;
    export function renderAll(): any;
    export function legend(): any;
    export function scatterPlot(selector: string): any;
    export var units: any;
}