import {Bar} from "../models/Bar";
import {Viewport} from "./Viewport";

export class Renderer {
    private ctx: CanvasRenderingContext2D;
    private width: number = 0;
    private height: number = 0;
    private pixelRatio: number;

    constructor(private canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d')!;
        this.pixelRatio = window.devicePixelRatio || 1;
        this.adjustCanvasResolution();
    }

    adjustCanvasResolution() {
        // Adjust the canvas resolution for high-DPI screens
        this.width = this.canvas.clientWidth * this.pixelRatio;
        this.height = this.canvas.clientHeight * this.pixelRatio;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);
    }

    drawBars(bars: Bar[], viewport: Viewport) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const barWidth = viewport.barWidth * viewport.scale;
        const gapSize = barWidth * viewport.gapPercentage;
        const adjustedBarWidth = Math.max(barWidth - gapSize, 1);

        const {visibleBars, startIndex} = viewport.getVisibleBars(bars);
        const maxPrice = viewport.maxPrice;
        const minPrice = viewport.minPrice;
        const chartHeight = this.canvas.height / this.pixelRatio;

        visibleBars.forEach((bar, i) => {
            const globalIndex = startIndex + i;
            const x = viewport.getXPosition(globalIndex);
            const xAdjusted = x + gapSize / 2;

            const openY = this.priceToY(bar.open, minPrice, maxPrice, chartHeight);
            const closeY = this.priceToY(bar.close, minPrice, maxPrice, chartHeight);
            const highY = this.priceToY(bar.high, minPrice, maxPrice, chartHeight);
            const lowY = this.priceToY(bar.low, minPrice, maxPrice, chartHeight);

            const isBullish = bar.close >= bar.open;
            this.ctx.fillStyle = isBullish ? '#26a69a' : '#ef5350';
            this.ctx.strokeStyle = this.ctx.fillStyle;

            // Draw the candle wick
            const wickX = xAdjusted + adjustedBarWidth / 2;
            this.ctx.beginPath();
            this.ctx.moveTo(wickX, highY);
            this.ctx.lineTo(wickX, lowY);
            this.ctx.stroke();

            // Draw the candle body
            const bodyHeight = Math.abs(closeY - openY);
            const bodyY = Math.min(openY, closeY);
            this.ctx.fillRect(
                xAdjusted,
                bodyY,
                adjustedBarWidth,
                bodyHeight > 0 ? bodyHeight : 1
            );
        });

        this.drawScales(bars, viewport);
    }


    private priceToY(price: number, minPrice: number, maxPrice: number, chartHeight: number): number {
        // Convert a price to a Y coordinate on the canvas
        const priceRange = maxPrice - minPrice;
        return ((maxPrice - price) / priceRange) * chartHeight;
    }

    private drawScales(bars: Bar[], viewport: Viewport) {
        const ctx = this.ctx;
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        const padding = 5;

        // Draw price scale on the right
        const priceSteps = 5;
        const priceStepSize = (viewport.maxPrice - viewport.minPrice) / priceSteps;

        for (let i = 0; i <= priceSteps; i++) {
            const price = viewport.minPrice + i * priceStepSize;
            const y = this.priceToY(price, viewport.minPrice, viewport.maxPrice, this.height / this.pixelRatio);
            console.log(price.toFixed(5), this.width / this.pixelRatio);
            ctx.fillText(price.toFixed(5), this.width / this.pixelRatio - 50, y);
        }

        if (bars.length === 0) {
            return;
        }

        // Draw date labels at the bottom
        const dateSteps = 5;
        const totalBars = bars.length;

        for (let i = 0; i <= dateSteps; i++) {

            let x = (this.width / this.pixelRatio) * (i / dateSteps);

            if (i === 0) {
                x = padding;
                ctx.textAlign = 'left';
            } else if (i === dateSteps) {
                x = (this.width / this.pixelRatio) - padding;
                ctx.textAlign = 'right';
            } else {
                ctx.textAlign = 'center';
            }

            // Calculate the global index (bar index) at this x position
            const globalIndex = viewport.getGlobalIndexAtX(x);

            if (globalIndex >= 0 && globalIndex < totalBars) {
                const bar = bars[globalIndex];
                const dateStr = this.formatDate(bar.time);

                ctx.fillText(
                    dateStr,
                    x,
                    this.height / this.pixelRatio - 10
                );
            }
            ctx.textAlign = 'left';
        }
    }

    private formatDate(date: Date): string {
        // Format date to display on the chart (e.g., "HH:MM")
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
}
