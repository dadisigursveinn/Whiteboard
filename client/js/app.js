$( document ).ready(function() {
    var settings = {
        canvasObj: document.getElementById("myCanvas"),
        nextObject: "Pen",
        nextColor: $('input[name=color]:checked').val(),
        nextLineWidth: $('input[name=lineWidth]:checked').val(),
        currentShape: undefined,
        shapes: [],
        undone: []
    };

    $("#myCanvas").mousedown(function(e) {
        var shape = undefined;
        var context = settings.canvasObj.getContext("2d");
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var canvasInfo = document.getElementById("myCanvas").getBoundingClientRect();
        settings.undone = [] // clear undo history

        settings.nextColor = $('input[name=color]:checked').val();
        settings.nextLineWidth = $('input[name=lineWidth]:checked').val();
        if (settings.nextObject === "Circle") {
            settings.currentShape = "Circle";
            shape = new Circle(x, y, settings.nextColor, settings.nextLineWidth);
        } else if (settings.nextObject === "Rectangle") {
            settings.currentShape = "Rectangle";
            shape = new Rectangle(x, y, settings.nextColor, settings.nextLineWidth);
        }
        else if (settings.nextObject === "Line") {
            settings.currentShape = "Line";
            shape = new Line(x, y, settings.nextColor, settings.nextLineWidth);
        } else if (settings.nextObject === "Text") {
            currentShape = "Text";
            $("#myCanvas").click(function(e){
                var font = $('select').val();
                shape = new Text(settings.nextColor, font, canvasInfo, e, this);
                if (settings.nextObject === "Text") {
                    $("body").append(shape.html);
                }
            })
        } else if (settings.nextObject === "Pen") {
            settings.currentShape = "Pen";
            shape = new Pen(x, y, settings.nextColor, settings.nextLineWidth);
        } else if (settings.nextObject === "Select") {
          settings.currentShape = settings.shapes[settings.shapes.length-1].shape;
          return;
        }
        else {
            return ;
        }
        if (settings.nextObject !== undefined && settings.nextObject !== "Text") {
            settings.shapes.push({type: settings.currentShape, shape: shape});
            settings.currentShape = shape;
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
                break;
            case "text":
                settings.nextObject = "Text";
                break;
            case "pen":
                settings.nextObject = "Pen";
                break;
            case "undo":
                // Dont undo unless there is somethig to undo
                if (settings.shapes[settings.shapes.length - 1] != undefined ) {
                    var removed = settings.shapes[settings.shapes.length - 1];
                    settings.undone.push(removed);
                    settings.shapes.pop();
                    drawAll();
                }
                break;
            case "redo":
                // Dont redo unless there is somethig to redo
                if(settings.undone[settings.undone.length -1] != undefined) {
                    settings.shapes.push(settings.undone[settings.undone.length -1]);
                    settings.undone.pop();
                    drawAll();
                }
                break;
            case "saveDrawing":
                saveDrawing();
                break;
            case "loadDrawing":
                loadDrawing();
                drawAll();
                break;
            case "select":
                settings.nextObject = "Select";
              break;
        }
    });

    $("#myCanvas").mousemove( function(e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;

        if(settings.currentShape !== undefined && settings.currentShape !== "Text") {
            if(settings.nextObject === "Select") {
              settings.currentShape.moveTo(x, y);
            } else {
              settings.currentShape.setEnd(x, y)
            }
            drawAll();
        }
    });

    function drawAll() {
        var context = settings.canvasObj.getContext("2d");
        // TODO: clear the canvasObj
        context.clearRect(0, 0, settings.canvasObj.width, settings.canvasObj.height);
        // TODO: draw all from array
        for (var i = 0; i < settings.shapes.length; i++) {
            settings.shapes[i].shape.draw(context);
        }

    }

    function loadDrawing() {
        var url = "http://localhost:3000/api/drawings/" + $('select[name=drawingsList]').val();

        $.getJSON( url, function( data ) {
            var items = [];
            $.each( data, function( key, val ) {
                if(key == "content") {
                    var jsonShapes = val;
                    $.each( jsonShapes, function(key, val) {
                        console.log(val.type);
                        shape = eval("new " + val.type + "()");
                        $.each( val.shape, function(key, val) {
                            console.log(key + val);
                            shape[key] = val;
                        });
                        settings.shapes.push({type: val.type, shape: shape});
                    });
                };
            });
        });
    }

    updateDrawingList();
    function updateDrawingList() {
        $('#drawingsList').empty();
        var url = "http://localhost:3000/api/drawings";

        $.getJSON( url, function( data ) {
            var items = [];
            $.each( data, function( key, val ) {
                $('#drawingsList').append($('<option>', {
                    value: val.id,
                    text : val.title
                }));
            });
        });
    }

    function saveDrawing() {
        var drawing = {
            title: $('#drawingName').val(),
            content: settings.shapes
        };
        var url = "http://localhost:3000/api/drawings";
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: url,
            data: JSON.stringify(drawing),
            success: function (data) {
                console.log("Success");
            },
            error: function (xhr, err) {
                console.log(xhr + err);
            }
        });
        updateDrawingList();
    }

    $("#myCanvas").mouseup( function(e) {
        settings.currentShape = undefined;
    });
});
