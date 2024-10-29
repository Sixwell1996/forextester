import { DataLoader } from "../services/DataLoader";
import { Viewport } from "./Viewport";
import { Renderer } from "./Renderer";
import { EventHandler } from "./EventHandler";
export class Chart {
    constructor(canvas, dataUrl) {
        this.canvas = canvas;
        this.dataUrl = dataUrl;
        this.bars = [];
        this.renderer = new Renderer(canvas);
        this.dataLoader = new DataLoader();
        this.viewport = new Viewport(canvas.clientWidth);
        this.eventHandler = new EventHandler(canvas, this.viewport, this.render.bind(this));
        this.init();
    }
    async init() {
        this.bars = await this.dataLoader.fetchData(this.dataUrl);
        this.viewport.updatePriceRange(this.bars);
        this.render();
        // Handle window resize events
        window.addEventListener('resize', this.onResize.bind(this));
    }
    render() {
        this.viewport.updatePriceRange(this.bars);
        this.renderer.drawBars(this.bars, this.viewport);
    }
    onResize() {
        // Update canvas size and viewport
        this.viewport.canvasWidth = this.canvas.clientWidth;
        this.renderer.adjustCanvasResolution();
        this.render();
    }
}
//# sourceMappingURL=Chart.js.map