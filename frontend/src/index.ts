class Clock {
    static nowSeconds() {
        return Date.now() / 1000;
    }
}

class ConsoleLogger {
    info(message: string) {
        console.log(`${new Date().toUTCString()} [INFO]: ${message}`)
    }
}

class SimulationTime {
    private step: number = 0;
    private startTimeSeconds: number;

    constructor(startTimeSeconds: number) {
        this.startTimeSeconds = startTimeSeconds;
    }

    static new(startTimeSeconds: number) {
        return new SimulationTime(startTimeSeconds);
    }

    tick() {
        this.step += 1;
    }

    format(): string {
        let deltaSeconds = Clock.nowSeconds() - this.startTimeSeconds;
        return `Average ticks per second: ${this.step / deltaSeconds}`;
    }
}

function main() {
    const canvasElement = document.getElementById("screen");

    if (!canvasElement) {
        throw new Error("Canvas could not be found in DOM");
    }

    const renderer = Renderer.fromCanvas(canvasElement as HTMLCanvasElement);

    requestAnimationFrame(() => loop(new ConsoleLogger(), SimulationTime.new(Clock.nowSeconds()), renderer));
}

class Renderer {
    context: CanvasRenderingContext2D;
    boundingBox: Rectangle;

    constructor(context: CanvasRenderingContext2D, boundingBox: Rectangle) {
        this.context = context;
        this.boundingBox = boundingBox;
    }

    static fromCanvas(canvas: HTMLCanvasElement) {
        const context = canvas.getContext("2d");

        if (!context) {
            throw new Error("Context null");
        }

        return new Renderer(context, Rectangle.new(0, 0, canvas.width, canvas.height));
    }

    clearScreen() {
        this.context.clearRect(this.boundingBox.x(), this.boundingBox.y(), this.boundingBox.width(), this.boundingBox.height());
    }

    renderLine(start: Vector2D, end: Vector2D) {
        this.context.beginPath();
        this.context.moveTo(start.x(), start.y());
        this.context.lineTo(end.x(), end.y());
        this.context.stroke();
    }
}

class Vector2D {
    private x_: number;
    private y_: number;

    constructor(x: number, y: number) {
        this.x_ = x;
        this.y_ = y;
    }

    static new(x: number, y: number) {
        return new Vector2D(x, y);
    }

    x() {
        return this.x_;
    }

    y() {
        return this.y_;
    }
}

class Rectangle {
    private topLeft: Vector2D;
    private dimensions: Vector2D;

    constructor(topLeft: Vector2D, dimensions: Vector2D) {
        this.topLeft = topLeft;
        this.dimensions = dimensions;
    }

    static new(x: number, y: number, width: number, height: number) {
        return new Rectangle(Vector2D.new(x, y), Vector2D.new(width, height));
    }

    x() {
        return this.topLeft.x();
    }

    y() {
        return this.topLeft.y();
    }

    width() {
        return this.dimensions.x();
    }

    height() {
        return this.dimensions.y();
    }
}

enum RoadType {
    TWO_WAY,
    ONE_WAY
}

class Road {
    private type_: RoadType;
    private lanes_: Lane[];

    constructor(type: RoadType, lanes: Lane[]) {
        this.type_ = type;
        this.lanes_ = lanes;
    }

    static createOneWay(lanes: Lane[]) {
        return new Road(RoadType.ONE_WAY, lanes);
    }

    type() {
        return this.type;
    }

    lanes() {
        return this.lanes;
    }
}

class Lane {
}

function loop(logger: ConsoleLogger, time: SimulationTime, renderer: Renderer) {
    logger.info(time.format());

    renderer.clearScreen();
    update();
    render(renderer);

    time.tick();
    requestAnimationFrame(() => loop(logger, time, renderer));
}

function update() {
}

function render(renderer: Renderer) {
    drawRoad(renderer);
}

function drawRoad(renderer: Renderer) {
    renderer.renderLine(Vector2D.new(0, 0), Vector2D.new(200, 200));
}

main();
