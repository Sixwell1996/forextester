import {Viewport} from "./Viewport";

export class EventHandler {
    private isDragging: boolean = false;
    private lastX: number = 0;

    constructor(
        private canvas: HTMLCanvasElement,
        private viewport: Viewport,
        private renderCallback: () => void
    ) {
        this.initEvents();
    }

    private initEvents() {
        this.canvas.addEventListener('wheel', this.onWheel.bind(this), { passive: false });
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.addEventListener('mouseleave', this.onMouseUp.bind(this));
    }

    private onWheel(event: WheelEvent) {
        event.preventDefault();
        if (event.ctrlKey || event.metaKey) {
            // Zooming
            const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
            this.viewport.zoom(zoomFactor);
        } else {
            // Scrolling horizontally
            this.viewport.scroll(event.deltaY);
        }
        this.renderCallback();
    }

    private onMouseDown(event: MouseEvent) {
        this.isDragging = true;
        this.lastX = event.clientX;
    }

    private onMouseMove(event: MouseEvent) {
        if (this.isDragging) {
            const deltaX = this.lastX - event.clientX;
            this.viewport.scroll(deltaX);
            this.lastX = event.clientX;
            this.renderCallback();
        }
    }

    private onMouseUp() {
        this.isDragging = false;
    }
}
