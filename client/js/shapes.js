class Shape {
    // params: x and y positions on canvas
    constructor(x, y, color, lineWidth) {
        this.x = x;
        this.y = y;
        this.endX = 0;
        this.endY = 0;
        this.color = color;
        this.lineWidth = lineWidth;
    }

    setEnd(x, y) {
        this.endX = x;
        this.endY = y;
    }
}

class Rectangle extends Shape {
    constructor(x, y, color, lineWidth) {
        super(x, y, color, lineWidth);
        this.endX = 0;
        this.endY = 0;
    }

    setEnd(x, y) {
        this.endX = x-this.x;
        this.endY = y-this.y;
    }

    draw(context) {
        context.strokeStyle = this.color;
        context.lineWidth = this.lineWidth;
        context.strokeRect(this.x, this.y, this.endX, this.endY);
    }
}

class Circle extends Shape {
    constructor(x, y, color, lineWidth) {
        super(x, y, color, lineWidth);
        //this. ...
    }
    draw(context) {
        context.strokeStyle = this.color;
        context.lineWidth = this.lineWidth;
        context.beginPath();
        context.arc(this.x, this.y, 50, 0, 2 * Math.PI, false);
        context.stroke();
    }
}

class Line extends Shape {
    constructor(x, y) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.endX = x;
        this.endY = y;
    }

    draw(context) {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.endX, this.endY);
        context.stroke( );
    }
}

class Text extends Shape {
    constructor(color, fontFamily, canvasInfo, e, document) {
        super(color, fontFamily, canvasInfo, document);
        this.x = e.pageX - document.offsetLeft + canvasInfo.left;
        this.y = e.pageY - document.offsetTop + canvasInfo.top;
        this.fontFamily = "helvetica";
        //this. ...
        this.html = "<input class= 'textBox' type='text' style='position:absolute;top:" + this.y + ";left:" + this.x + "; font-family:" + fontFamily + "; color:" + color + "'></input>"
    }
}

class Pen extends Shape {
    constructor(x, y) {
        super(x, y);
        this.x = x;
        this.y = y;
    }

    draw(context) {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.endX, this.endY);
        context.stroke( );
    }
}
