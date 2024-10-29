import {Bar} from "../models/Bar";

export class Viewport {
    offset: number; // Horizontal offset for scrolling
    scale: number;  // Scale factor for zooming
    barWidth: number;
    minPrice: number;
    maxPrice: number;
    canvasWidth: number;
    gapPercentage: number;

    constructor(canvasWidth: number) {
        this.offset = 0;
        this.scale = 1;
        this.barWidth = 5;
        this.canvasWidth = canvasWidth;
        this.minPrice = Infinity;
        this.maxPrice = -Infinity;
        this.gapPercentage = 0.2;
    }

    updatePriceRange(bars: Bar[]) {
        const {visibleBars} = this.getVisibleBars(bars);
        if (visibleBars.length > 0) {
            this.minPrice = Math.min(...visibleBars.map(bar => bar.low));
            this.maxPrice = Math.max(...visibleBars.map(bar => bar.high));
        }
    }

    getVisibleBars(bars: Bar[]): { visibleBars: Bar[]; startIndex: number } {
        const totalBarSpace = this.getTotalBarSpace();

        const barsInView = Math.ceil(this.canvasWidth / totalBarSpace);
        const totalBars = bars.length;
        const maxOffset = Math.max(totalBars * totalBarSpace - this.canvasWidth, 0);
        this.offset = Math.max(0, Math.min(this.offset, maxOffset));

        const startIndex = Math.floor(this.offset / totalBarSpace);
        const endIndex = Math.min(startIndex + barsInView + 1, totalBars);

        const visibleBars = bars.slice(startIndex, endIndex);

        return { visibleBars, startIndex };
    }

    getXPosition(globalIndex: number): number {
        const totalBarSpace = this.getTotalBarSpace();
        return globalIndex * totalBarSpace - this.offset;
    }

    getBarWidthWithScale(): number {
        return this.barWidth * this.scale;
    }

    getGapSize(): number {
        return this.getBarWidthWithScale() * this.gapPercentage;
    }

    getAdjustedBarWidth(): number {
        return Math.max(this.getBarWidthWithScale() - this.getGapSize(), 1);
    }

    getTotalBarSpace(): number {
        return this.getAdjustedBarWidth() + this.getGapSize();
    }

    getGlobalIndexAtX(x: number): number {
        return Math.floor((x + this.offset) / this.getTotalBarSpace());
    }

    zoom(factor: number) {
        // Update the scale factor within reasonable limits
        const newScale = this.scale * factor;
        this.scale = Math.max(0.5, Math.min(newScale, 5));
    }

    scroll(delta: number) {
        // Update the offset based on scroll delta
        this.offset += delta;
    }
}
