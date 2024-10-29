export class Bar {
    time: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    tickVolume: number;

    constructor(data: any, chunkStart: number) {
        this.time = new Date((chunkStart + data.Time) * 1000);
        this.open = data.Open;
        this.high = data.High;
        this.low = data.Low;
        this.close = data.Close;
        this.tickVolume = data.TickVolume;
    }
}
