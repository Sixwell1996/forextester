export class EventHandler {
    constructor(canvas, viewport, renderCallback) {
        this.canvas = canvas;
        this.viewport = viewport;
        this.renderCallback = renderCallback;
        this.isDragging = false;
        this.lastX = 0;
        this.initEvents();
    }
    initEvents() {
        this.canvas.addEventListener('wheel', this.onWheel.bind(this), { passive: false });
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.canvas.addEventListener('mouseleave', this.onMouseUp.bind(this));
    }
    onWheel(event) {
        event.preventDefault();
        if (event.ctrlKey || event.metaKey) {
            // Zooming
            const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
            this.viewport.zoom(zoomFactor);
        }
        else {
            // Scrolling horizontally
            this.viewport.scroll(event.deltaY);
        }
        this.renderCallback();
    }
    onMouseDown(event) {
        this.isDragging = true;
        this.lastX = event.clientX;
    }
    onMouseMove(event) {
        if (this.isDragging) {
            const deltaX = this.lastX - event.clientX;
            this.viewport.scroll(deltaX);
            this.lastX = event.clientX;
            this.renderCallback();
        }
    }
    onMouseUp(event) {
        this.isDragging = false;
    }
}
//# sourceMappingURL=EventHandler.js.map