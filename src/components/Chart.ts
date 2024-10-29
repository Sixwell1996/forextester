import {DataLoader} from "../services/DataLoader";
import {Bar} from "../models/Bar";
import {Viewport} from "./Viewport";
import {Renderer} from "./Renderer";
import {EventHandler} from "./EventHandler";

export class Chart {
    private renderer: Renderer;
    private dataLoader: DataLoader;
    private viewport: Viewport;
    private eventHandler: EventHandler;
    private bars: Bar[] = [];

    constructor(private canvas: HTMLCanvasElement, private dataUrl: string) {
        this.renderer = new Renderer(canvas);
        this.dataLoader = new DataLoader();
        this.viewport = new Viewport(canvas.clientWidth);
        this.eventHandler = new EventHandler(canvas, this.viewport, this.render.bind(this));

        this.init();
    }

    private async init() {
        this.bars = await this.dataLoader.fetchData(this.dataUrl);
        this.render();

        window.addEventListener('resize', this.onResize.bind(this));
    }

    private render() {
        this.viewport.updatePriceRange(this.bars);
        this.renderer.drawBars(this.bars, this.viewport);
    }

    private onResize() {
        this.viewport.canvasWidth = this.canvas.clientWidth;
        this.renderer.adjustCanvasResolution();
        this.render();
    }
}
