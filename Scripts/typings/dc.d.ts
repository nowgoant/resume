/// <reference path="d3/d3.d.ts" />

declare module dc {
    export function lineChart(selector: string, groupName?: string): any;
    export function barChart(selector: string, groupName?: string): any;
    export function pieChart(selector: string, groupName?: string): any;
    export function bubbleChart(selector: string, groupName?: string): any;
    export function rowChart(selector: string, groupName?: string): any;
    export function renderAll(groupName?:string): any;
    export function legend(): any;
    export function scatterPlot(selector: string): any;
    export var units: any;
}