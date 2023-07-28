"use strict";
var Clock = /** @class */ (function () {
    function Clock() {
    }
    Clock.nowSeconds = function () {
        return Date.now() / 1000;
    };
    return Clock;
}());
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.info = function (message) {
        console.log("".concat(new Date().toUTCString(), " [INFO]: ").concat(message));
    };
    return ConsoleLogger;
}());
var SimulationTime = /** @class */ (function () {
    function SimulationTime(startTimeSeconds) {
        this.step = 0;
        this.startTimeSeconds = startTimeSeconds;
    }
    SimulationTime.new = function (startTimeSeconds) {
        return new SimulationTime(startTimeSeconds);
    };
    SimulationTime.prototype.tick = function () {
        this.step += 1;
    };
    SimulationTime.prototype.format = function () {
        var deltaSeconds = Clock.nowSeconds() - this.startTimeSeconds;
        return "Average ticks per second: ".concat(this.step / deltaSeconds);
    };
    return SimulationTime;
}());
function main() {
    var canvasElement = document.getElementById("screen");
    if (!canvasElement) {
        throw new Error("Canvas could not be found in DOM");
    }
    var renderer = Renderer.fromCanvas(canvasElement);
    requestAnimationFrame(function () { return loop(new ConsoleLogger(), SimulationTime.new(Clock.nowSeconds()), renderer); });
}
var Renderer = /** @class */ (function () {
    function Renderer(context, boundingBox) {
        this.context = context;
        this.boundingBox = boundingBox;
    }
    Renderer.fromCanvas = function (canvas) {
        var context = canvas.getContext("2d");
        if (!context) {
            throw new Error("Context null");
        }
        return new Renderer(context, Rectangle.new(0, 0, canvas.width, canvas.height));
    };
    Renderer.prototype.clearScreen = function () {
        this.context.clearRect(this.boundingBox.x(), this.boundingBox.y(), this.boundingBox.width(), this.boundingBox.height());
    };
    Renderer.prototype.renderLine = function (start, end) {
        this.context.beginPath();
        this.context.moveTo(start.x(), start.y());
        this.context.lineTo(end.x(), end.y());
        this.context.stroke();
    };
    return Renderer;
}());
var Vector2D = /** @class */ (function () {
    function Vector2D(x, y) {
        this.x_ = x;
        this.y_ = y;
    }
    Vector2D.new = function (x, y) {
        return new Vector2D(x, y);
    };
    Vector2D.prototype.x = function () {
        return this.x_;
    };
    Vector2D.prototype.y = function () {
        return this.y_;
    };
    return Vector2D;
}());
var Rectangle = /** @class */ (function () {
    function Rectangle(topLeft, dimensions) {
        this.topLeft = topLeft;
        this.dimensions = dimensions;
    }
    Rectangle.new = function (x, y, width, height) {
        return new Rectangle(Vector2D.new(x, y), Vector2D.new(width, height));
    };
    Rectangle.prototype.x = function () {
        return this.topLeft.x();
    };
    Rectangle.prototype.y = function () {
        return this.topLeft.y();
    };
    Rectangle.prototype.width = function () {
        return this.dimensions.x();
    };
    Rectangle.prototype.height = function () {
        return this.dimensions.y();
    };
    return Rectangle;
}());
function loop(logger, time, renderer) {
    logger.info(time.format());
    renderer.clearScreen();
    update();
    render(renderer);
    time.tick();
    requestAnimationFrame(function () { return loop(logger, time, renderer); });
}
function update() {
}
function render(renderer) {
    drawRoad(renderer);
}
function drawRoad(renderer) {
    renderer.renderLine(Vector2D.new(0, 0), Vector2D.new(200, 200));
}
main();
