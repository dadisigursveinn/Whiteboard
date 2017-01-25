class Shape {
    // params: x and y positions on canvas
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.endX = x;
        this.endY = y;
        this.color = color;
    }

    setEnd(x, y) {
        this.endX = x;
        this.endY = y;
    }
}

class Rectangle extends Shape {
    constructor(x, y, color) {
        super(x, y, color);
        //this. ...
    }
    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, 40/*with*/, 40/*height*/);
    }
}

class Circle extends Shape {
    constructor(x, y, color) {
        super(x, y, color);
        //this. ...
    }
    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, 40/*with*/, 40/*height*/);
    }
}

class Line extends Shape {
    constructor(x, y, color) {
        super(x, y, color);
        this.points = [];
    }

    setEnd(x, y) {
        this.points.push({x: x, y: y});
    }

    draw(context) {
        // ...
    }
}

class Text extends Shape {
    constructor(x, y, color) {
        super(x, y, color);
        //this. ...
    }
}


var settings = {
    canvasObj: document.getElementById("myCanvas"),
    nextObject: "Rectangle",
    nextColor: "Black",
    currentShape: undefined
    shapes: []
};

$("myCanvas").on("mousedown"), function() {
    var shape = undefined;
    var context = settings.canvasObj.getContext("2d");

    if (settings.nextObject == "Circle") {
        shape = new Circle(/* TODO: Fynna x og y */, settings.nextColor);
    } else if (settings.nextObject == "Rectangle") {
        shape = new Rectangle(/* TODO: Fynna x og y */, settings.nextColor);
    }
    //...
    settings.currentShape = shape;
    settings.shapes.push(shape)
    shape.draw(context);
});



$("myCanvas").on("mousemove"), function() {
        if(settings.currentShape !== undefined) {

            settings.currentShape.setEnd(e.x, e.y /* TODO: fix the position! */)
            drawAll();
        }
});

function drawAll() {
    var context = settings.canvasObj.getContext("2d");
    // TODO: clear the canvasObj

    // TODO: draw all from array

}

$("myCanvas").on("mouseup", function(e) {
    settings.currentShape = undefined;
});
