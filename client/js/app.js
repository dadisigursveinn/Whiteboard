$( document ).ready(function() {
    var settings = {
        canvasObj: document.getElementById("myCanvas"),
        nextObject: "Rectangle",
        nextColor: $('input[name=color]:checked').val(),
        currentShape: undefined,
        shapes: []
    };

    $("#myCanvas").mousedown(function(e) {
        var shape = undefined;
        var context = settings.canvasObj.getContext("2d");
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        settings.nextColor = $('input[name=color]:checked').val();
        if (settings.nextObject == "Circle") {
            shape = new Circle(/* TODO: Fynna x og y */settings.nextColor);
        } else if (settings.nextObject == "Rectangle") {
            settings.currentShape = "Rectangle";
            console.log("Drawing Rectangle!");
            shape = new Rectangle(x, y, settings.nextColor);
        }
        else if (settings.nextObject == "Line") {
            settings.currentShape = "Line";
            console.log("Drawing Line!");
            shape = new Line(x, y, settings.nextColor);
        }
        //...
        settings.currentShape = shape;
        settings.shapes.push(shape)
        shape.draw(context);
    });

    $("button").click(function(){
        switch($(this).attr('id')) {
            case "rectangle":
                settings.nextObject = "Rectangle";
                console.log("rectangle");
                break;
            case "circle":
                settings.nextObject = "Circle";
                console.log("circle");
                break;
            case "line":
                settings.nextObject = "Line";
                console.log("line");
                break
            case "text":
                settings.nextObject = "Text";
                console.log("text");
                break
            case "pen":
                settings.nextObject = "Pen";
                console.log("pen");
                break
        }
    });

    $("#myCanvas").mousemove( function(e) {
        //console.log("mouse moved")
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        if(settings.currentShape !== undefined) {
            settings.currentShape.setEnd(x, y)
            drawAll();
        }
    });

    function drawAll() {
        var context = settings.canvasObj.getContext("2d");
        // TODO: clear the canvasObj
        context.clearRect(0, 0, settings.canvasObj.width, settings.canvasObj.height);
        // TODO: draw all from array
        //console.log(settings.shapes)
        for (var i = 0; i < settings.shapes.length; i++) {
            settings.shapes[i].draw(context);
        }

    }

    $("#myCanvas").mouseup( function(e) {
        settings.currentShape = undefined;
    });
});
