import {ChartManager} from './components/ChartManager';

const canvas = document.getElementById('chartCanvas') as HTMLCanvasElement;
const dataUrl = 'https://beta.forextester.com/data/api/Metadata/bars/chunked?Broker=Advanced&Symbol=EURUSD&Timeframe=1&Start=57674&End=59113&UseMessagePack=false';

const chartManager = new ChartManager();
chartManager.addChart(canvas, dataUrl);
