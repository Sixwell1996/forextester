import { Bar } from '../models/Bar';
export class DataLoader {
    async fetchData(url) {
        try {
            const response = await fetch(url);
            const jsonData = await response.json();
            const bars = [];
            const chunkStart = jsonData[0].ChunkStart;
            jsonData[0].Bars.forEach((barData) => {
                bars.push(new Bar(barData, chunkStart));
            });
            return bars;
        }
        catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }
}
//# sourceMappingURL=DataLoader.js.map