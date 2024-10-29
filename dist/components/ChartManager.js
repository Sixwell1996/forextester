import { Chart } from "./Chart";
export class ChartManager {
    constructor() {
        this.charts = [];
    }
    addChart(canvas, dataUrl) {
        const chart = new Chart(canvas, dataUrl);
        this.charts.push(chart);
    }
}
//# sourceMappingURL=ChartManager.js.map