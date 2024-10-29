export class Viewport {
    constructor(canvasWidth) {
        this.offset = 0;
        this.scale = 1;
        this.barWidth = 5; // Default bar width
        this.canvasWidth = canvasWidth;
        this.minPrice = Infinity;
        this.maxPrice = -Infinity;
    }
    updatePriceRange(bars) {
        // Update the min and max price based on visible bars
        const visibleBars = this.getVisibleBars(bars);
        if (visibleBars.length > 0) {
            this.minPrice = Math.min(...visibleBars.map(bar => bar.low));
            this.maxPrice = Math.max(...visibleBars.map(bar => bar.high));
        }
    }
    getVisibleBars(bars) {
        // Calculate the number of bars that can fit in the viewport
        const barWidthWithScale = this.barWidth * this.scale;
        const barsInView = Math.ceil(this.canvasWidth / barWidthWithScale);
        // Calculate the starting index based on the offset
        const totalBars = bars.length;
        const maxOffset = totalBars * barWidthWithScale - this.canvasWidth;
        // Clamp offset to allowable range
        this.offset = Math.max(0, Math.min(this.offset, maxOffset));
        const startIndex = Math.floor(this.offset / barWidthWithScale);
        const endIndex = Math.min(startIndex + barsInView + 1, totalBars);
        return bars.slice(startIndex, endIndex);
    }
    getXPosition(index) {
        // Calculate the X position of a bar based on its index
        const barWidthWithScale = this.barWidth * this.scale;
        return index * barWidthWithScale - this.offset;
    }
    zoom(factor) {
        // Update the scale factor within reasonable limits
        const newScale = this.scale * factor;
        this.scale = Math.max(0.5, Math.min(newScale, 5));
    }
    scroll(delta) {
        // Update the offset based on scroll delta
        this.offset += delta;
    }
}
//# sourceMappingURL=Viewport.js.map