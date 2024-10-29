// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../index.js":[function(require,module,exports) {
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function sent() {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
var Bar = /** @class */function () {
  function Bar(data, chunkStart) {
    // Convert the time offset to a Date object
    this.time = new Date((chunkStart + data.Time) * 1000);
    this.open = data.Open;
    this.high = data.High;
    this.low = data.Low;
    this.close = data.Close;
    this.tickVolume = data.TickVolume;
  }
  return Bar;
}();
;
var DataLoader = /** @class */function () {
  function DataLoader() {}
  DataLoader.prototype.fetchData = function (url) {
    return __awaiter(this, void 0, void 0, function () {
      var response, jsonData, bars_1, chunkStart_1, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 3,, 4]);
            return [4 /*yield*/, fetch(url)];
          case 1:
            response = _a.sent();
            return [4 /*yield*/, response.json()];
          case 2:
            jsonData = _a.sent();
            bars_1 = [];
            chunkStart_1 = jsonData[0].ChunkStart;
            jsonData[0].Bars.forEach(function (barData) {
              bars_1.push(new Bar(barData, chunkStart_1));
            });
            console.log(bars_1);
            return [2 /*return*/, bars_1];
          case 3:
            error_1 = _a.sent();
            console.error('Error fetching data:', error_1);
            return [2 /*return*/, []];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  return DataLoader;
}();
var Renderer = /** @class */function () {
  function Renderer(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.pixelRatio = window.devicePixelRatio || 1;
    this.adjustCanvasResolution();
  }
  Renderer.prototype.adjustCanvasResolution = function () {
    // Adjust the canvas resolution for high-DPI screens
    this.width = this.canvas.clientWidth * this.pixelRatio;
    this.height = this.canvas.clientHeight * this.pixelRatio;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
  };
  Renderer.prototype.drawBars = function (bars, viewport) {
    var _this = this;
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Set up drawing parameters
    var barWidth = viewport.barWidth * viewport.scale;
    var visibleBars = viewport.getVisibleBars(bars);
    var maxPrice = viewport.maxPrice;
    var minPrice = viewport.minPrice;
    var priceRange = maxPrice - minPrice;
    var chartHeight = this.canvas.height / this.pixelRatio;
    // Draw each visible bar
    visibleBars.forEach(function (bar, index) {
      var x = viewport.getXPosition(index);
      var openY = _this.priceToY(bar.open, minPrice, maxPrice, chartHeight);
      var closeY = _this.priceToY(bar.close, minPrice, maxPrice, chartHeight);
      var highY = _this.priceToY(bar.high, minPrice, maxPrice, chartHeight);
      var lowY = _this.priceToY(bar.low, minPrice, maxPrice, chartHeight);
      // Determine the color of the bar
      var isBullish = bar.close >= bar.open;
      _this.ctx.fillStyle = isBullish ? '#26a69a' : '#ef5350';
      _this.ctx.strokeStyle = _this.ctx.fillStyle;
      // Draw the candle wick
      _this.ctx.beginPath();
      _this.ctx.moveTo(x + barWidth / 2, highY);
      _this.ctx.lineTo(x + barWidth / 2, lowY);
      _this.ctx.stroke();
      // Draw the candle body
      var bodyHeight = Math.abs(closeY - openY);
      var bodyY = Math.min(openY, closeY);
      _this.ctx.fillRect(x, bodyY, barWidth, bodyHeight > 0 ? bodyHeight : 1);
    });
    // Draw price scale and date labels
    this.drawScales(visibleBars, viewport);
  };
  Renderer.prototype.priceToY = function (price, minPrice, maxPrice, chartHeight) {
    // Convert a price to a Y coordinate on the canvas
    var priceRange = maxPrice - minPrice;
    return (maxPrice - price) / priceRange * chartHeight;
  };
  Renderer.prototype.drawScales = function (bars, viewport) {
    // Draw the price scale on the right and date labels at the bottom
    var ctx = this.ctx;
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    // Draw price scale on the right
    var priceSteps = 5;
    var priceStepSize = (viewport.maxPrice - viewport.minPrice) / priceSteps;
    for (var i = 0; i <= priceSteps; i++) {
      var price = viewport.minPrice + i * priceStepSize;
      var y = this.priceToY(price, viewport.minPrice, viewport.maxPrice, this.height / this.pixelRatio);
      ctx.fillText(price.toFixed(5), this.width / this.pixelRatio - 50, y);
    }
    // Draw date labels at the bottom
    var dateSteps = 5;
    var barsInView = bars.length;
    for (var i = 0; i <= dateSteps; i++) {
      var index = Math.floor(i * barsInView / dateSteps);
      var bar = bars[index];
      var x = viewport.getXPosition(index);
      var dateStr = this.formatDate(bar.time);
      ctx.fillText(dateStr, x, this.height / this.pixelRatio - 10);
    }
  };
  Renderer.prototype.formatDate = function (date) {
    // Format date to display on the chart (e.g., "HH:MM")
    var hours = date.getHours().toString().padStart(2, '0');
    var minutes = date.getMinutes().toString().padStart(2, '0');
    return "".concat(hours, ":").concat(minutes);
  };
  return Renderer;
}();
var Viewport = /** @class */function () {
  function Viewport(canvasWidth) {
    this.offset = 0;
    this.scale = 1;
    this.barWidth = 5; // Default bar width
    this.canvasWidth = canvasWidth;
    this.minPrice = Infinity;
    this.maxPrice = -Infinity;
  }
  Viewport.prototype.updatePriceRange = function (bars) {
    // Update the min and max price based on visible bars
    var visibleBars = this.getVisibleBars(bars);
    if (visibleBars.length > 0) {
      this.minPrice = Math.min.apply(Math, visibleBars.map(function (bar) {
        return bar.low;
      }));
      this.maxPrice = Math.max.apply(Math, visibleBars.map(function (bar) {
        return bar.high;
      }));
    }
  };
  Viewport.prototype.getVisibleBars = function (bars) {
    // Calculate the number of bars that can fit in the viewport
    var barWidthWithScale = this.barWidth * this.scale;
    var barsInView = Math.ceil(this.canvasWidth / barWidthWithScale);
    // Calculate the starting index based on the offset
    var totalBars = bars.length;
    var maxOffset = totalBars * barWidthWithScale - this.canvasWidth;
    // Clamp offset to allowable range
    this.offset = Math.max(0, Math.min(this.offset, maxOffset));
    var startIndex = Math.floor(this.offset / barWidthWithScale);
    var endIndex = Math.min(startIndex + barsInView + 1, totalBars);
    return bars.slice(startIndex, endIndex);
  };
  Viewport.prototype.getXPosition = function (index) {
    // Calculate the X position of a bar based on its index
    var barWidthWithScale = this.barWidth * this.scale;
    return index * barWidthWithScale - this.offset;
  };
  Viewport.prototype.zoom = function (factor) {
    // Update the scale factor within reasonable limits
    var newScale = this.scale * factor;
    this.scale = Math.max(0.5, Math.min(newScale, 5));
  };
  Viewport.prototype.scroll = function (delta) {
    // Update the offset based on scroll delta
    this.offset += delta;
  };
  return Viewport;
}();
var EventHandler = /** @class */function () {
  function EventHandler(canvas, viewport, renderCallback) {
    this.canvas = canvas;
    this.viewport = viewport;
    this.renderCallback = renderCallback;
    this.isDragging = false;
    this.lastX = 0;
    this.initEvents();
  }
  EventHandler.prototype.initEvents = function () {
    this.canvas.addEventListener('wheel', this.onWheel.bind(this));
    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.canvas.addEventListener('mouseleave', this.onMouseUp.bind(this));
  };
  EventHandler.prototype.onWheel = function (event) {
    event.preventDefault();
    if (event.ctrlKey || event.metaKey) {
      // Zooming
      var zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
      this.viewport.zoom(zoomFactor);
    } else {
      // Scrolling
      this.viewport.scroll(-event.deltaY);
    }
    this.renderCallback();
  };
  EventHandler.prototype.onMouseDown = function (event) {
    this.isDragging = true;
    this.lastX = event.clientX;
  };
  EventHandler.prototype.onMouseMove = function (event) {
    if (this.isDragging) {
      var deltaX = event.clientX - this.lastX;
      this.viewport.scroll(deltaX);
      this.lastX = event.clientX;
      this.renderCallback();
    }
  };
  EventHandler.prototype.onMouseUp = function (event) {
    this.isDragging = false;
  };
  return EventHandler;
}();
var Chart = /** @class */function () {
  function Chart(canvas, dataUrl) {
    this.canvas = canvas;
    this.dataUrl = dataUrl;
    this.bars = [];
    this.renderer = new Renderer(canvas);
    this.dataLoader = new DataLoader();
    this.viewport = new Viewport(canvas.clientWidth);
    this.eventHandler = new EventHandler(canvas, this.viewport, this.render.bind(this));
    this.init();
  }
  Chart.prototype.init = function () {
    return __awaiter(this, void 0, void 0, function () {
      var _a;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _a = this;
            return [4 /*yield*/, this.dataLoader.fetchData(this.dataUrl)];
          case 1:
            _a.bars = _b.sent();
            this.viewport.updatePriceRange(this.bars);
            this.render();
            return [2 /*return*/];
        }
      });
    });
  };
  Chart.prototype.render = function () {
    this.viewport.updatePriceRange(this.bars);
    this.renderer.drawBars(this.bars, this.viewport);
  };
  return Chart;
}();
var ChartManager = /** @class */function () {
  function ChartManager() {
    this.charts = [];
  }
  ChartManager.prototype.addChart = function (canvas, dataUrl) {
    var chart = new Chart(canvas, dataUrl);
    this.charts.push(chart);
  };
  return ChartManager;
}();
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64278" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../index.js"], null)
//# sourceMappingURL=/forextester.80dfb952.js.map