export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = 0;
        this.height = 0;
        this.ctx = canvas.getContext('2d');
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
    drawBars(bars, viewport) {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Set up drawing parameters
        const barWidth = viewport.barWidth * viewport.scale;
        const visibleBars = viewport.getVisibleBars(bars);
        const maxPrice = viewport.maxPrice;
        const minPrice = viewport.minPrice;
        const priceRange = maxPrice - minPrice;
        const chartHeight = this.canvas.height / this.pixelRatio;
        // Draw each visible bar
        visibleBars.forEach((bar, index) => {
            const x = viewport.getXPosition(index);
            const openY = this.priceToY(bar.open, minPrice, maxPrice, chartHeight);
            const closeY = this.priceToY(bar.close, minPrice, maxPrice, chartHeight);
            const highY = this.priceToY(bar.high, minPrice, maxPrice, chartHeight);
            const lowY = this.priceToY(bar.low, minPrice, maxPrice, chartHeight);
            // Determine the color of the bar
            const isBullish = bar.close >= bar.open;
            this.ctx.fillStyle = isBullish ? '#26a69a' : '#ef5350';
            this.ctx.strokeStyle = this.ctx.fillStyle;
            // Draw the candle wick
            this.ctx.beginPath();
            this.ctx.moveTo(x + barWidth / 2, highY);
            this.ctx.lineTo(x + barWidth / 2, lowY);
            this.ctx.stroke();
            // Draw the candle body
            const bodyHeight = Math.abs(closeY - openY);
            const bodyY = Math.min(openY, closeY);
            this.ctx.fillRect(x, bodyY, barWidth, bodyHeight > 0 ? bodyHeight : 1);
        });
        // Draw price scale and date labels
        this.drawScales(visibleBars, viewport);
    }
    priceToY(price, minPrice, maxPrice, chartHeight) {
        // Convert a price to a Y coordinate on the canvas
        const priceRange = maxPrice - minPrice;
        return ((maxPrice - price) / priceRange) * chartHeight;
    }
    drawScales(bars, viewport) {
        // Draw the price scale on the right and date labels at the bottom
        const ctx = this.ctx;
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        // Draw price scale on the right
        const priceSteps = 5;
        const priceStepSize = (viewport.maxPrice - viewport.minPrice) / priceSteps;
        for (let i = 0; i <= priceSteps; i++) {
            const price = viewport.minPrice + i * priceStepSize;
            const y = this.priceToY(price, viewport.minPrice, viewport.maxPrice, this.height / this.pixelRatio);
            ctx.fillText(price.toFixed(5), this.width / this.pixelRatio - 50, y);
        }
        // Draw date labels at the bottom
        const dateSteps = 5;
        const barsInView = bars.length;
        for (let i = 0; i < dateSteps; i++) {
            const index = Math.floor((i * barsInView) / dateSteps);
            const bar = bars[index];
            const x = viewport.getXPosition(index);
            const dateStr = this.formatDate(bar.time);
            ctx.fillText(dateStr, x, this.height / this.pixelRatio - 10);
        }
    }
    formatDate(date) {
        // Format date to display on the chart (e.g., "HH:MM")
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
}
//# sourceMappingURL=Renderer.js.map
