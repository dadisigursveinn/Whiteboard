class Shape {
    // params: x and y positions on canvas
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.endX = 0;
        this.endY = 0;
        this.color = color;
    }

    setEnd(x, y) {
        this.endX = x-this.x;
        this.endY = y-this.y;
    }
}

class Rectangle extends Shape {
    constructor(x, y, color) {
        super(x, y, color);
        //this. ...
    }
    draw(context) {
        context.strokeStyle = this.color;
        context.strokeRect(this.x, this.y, this.endX, this.endY);
    }
}

class Circle extends Shape {
    constructor(x, y, color) {
        super(x, y, color);
        //this. ...
    }
    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.endX, this.endY);
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
		context.fillStyle = this.color;
		context.beginPath( );     // Starts the line drawing
		context.moveTo( this.x, this.y );
		context.lineTo( this.endX, this.endY );
		context.stroke( );
    }
}

class Text extends Shape {
    constructor(x, y, color) {
        super(x, y, color);
        //this. ...
    }
}
