$( document ).ready(function() {
    var settings = {
        canvasObj: document.getElementById("myCanvas"),
        nextObject: "Rectangle",
        nextColor: $('input[name=color]:checked').val(),
        nextLineWidth: $('input[name=lineWidth]:checked').val(),
        currentShape: undefined,
        shapes: []
    };

    $("#myCanvas").mousedown(function(e) {
        var shape = undefined;
        var context = settings.canvasObj.getContext("2d");
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        settings.nextColor = $('input[name=color]:checked').val();
        settings.nextLineWidth = $('input[name=lineWidth]:checked').val();
        if (settings.nextObject === "Circle") {
            settings.currentShape = "Circle";
            console.log("Drawing Circle!");
            shape = new Circle(x, y, settings.nextColor, settings.nextLineWidth);
        } else if (settings.nextObject === "Rectangle") {
            settings.currentShape = "Rectangle";
            console.log("Drawing Rectangle!");
            shape = new Rectangle(x, y, settings.nextColor, settings.nextLineWidth);
        }
        else if (settings.nextObject === "Line") {
            settings.currentShape = "Line";
            console.log("Drawing Line!");
            shape = new Line(x, y, settings.nextColor, settings.nextLineWidth);
        } else if (settings.nextObject === "Text") {
            currentShape = "Text";
            $("#myCanvas").click(function(e){
                var canvasInfo = document.getElementById("myCanvas").getBoundingClientRect();
                var font = $('select').val();
                shape = new Text("red", font, canvasInfo, e, this);
                if (settings.nextObject === "Text") {
                    $("body").append(shape.html);
                }
            })
        } else {
            return ;
        }
        if (settings.nextObject != undefined && settings.nextObject != "Text") {
            settings.currentShape = shape;
            settings.shapes.push(shape)
            shape.draw(context);
        }
    });

    $("button").click(function(){
        switch($(this).attr('id')) {
            case "rectangle":
                settings.nextObject = "Rectangle";
                break;
            case "circle":
                settings.nextObject = "Circle";
                break;
            case "line":
                settings.nextObject = "Line";
                break
            case "text":
                settings.nextObject = "Text";
                break
            case "pen":
                settings.nextObject = "Pen";
                break
        }
    });

    $("#myCanvas").mousemove( function(e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        if(settings.currentShape !== undefined && settings.currentShape !== "Text") {
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
