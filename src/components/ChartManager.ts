import {Chart} from "./Chart";

export class ChartManager {
    private charts: Chart[] = [];

    addChart(canvas: HTMLCanvasElement, dataUrl: string) {
        const chart = new Chart(canvas, dataUrl);
        this.charts.push(chart);
    }
}
