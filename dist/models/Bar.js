export class Bar {
    constructor(data, chunkStart) {
        // Adjust the time calculation based on the correct interpretation
        this.time = new Date((chunkStart + data.Time) * 1000);
        this.open = data.Open;
        this.high = data.High;
        this.low = data.Low;
        this.close = data.Close;
        this.tickVolume = data.TickVolume;
    }
}
//# sourceMappingURL=Bar.js.map