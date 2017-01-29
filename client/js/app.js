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
            console.log("Drawing Circle!");
            console.log("Color: " + settings.nextColor);
            console.log("Line Width: " + settings.nextLineWidth);
            shape = new Circle(x, y, settings.nextColor, settings.nextLineWidth);
        } else if (settings.nextObject === "Rectangle") {
            settings.currentShape = "Rectangle";
            console.log("Drawing Rectangle!");
            console.log("Color: " + settings.nextColor);
            console.log("Line Width: " + settings.nextLineWidth);
            shape = new Rectangle(x, y, settings.nextColor, settings.nextLineWidth);
        }
        else if (settings.nextObject === "Line") {
            settings.currentShape = "Line";
            console.log("Drawing Line!");
            console.log("Color: " + settings.nextColor);
            console.log("Line Width: " + settings.nextLineWidth);
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
            console.log("Color: " + settings.nextColor);
            console.log("Line Width: " + settings.nextLineWidth);
            shape = new Pen(x, y, settings.nextColor, settings.nextLineWidth);
        } else if (settings.nextObject === "Select") {
          //for(int i = 0; i )
        //  settings.currentShape = settings.shape[0].find_enclosest(this.x, this.y, this.endX, this.endY)
          settings.currentShape = settings.shapes[0].shape;
          //TODO: find object given x, y
          //Fuzzy search could for example search for the nearset point
          console.log('currentShape', settings.currentShape);
          return;
        }
        else {
            return ;
        }
        if (settings.nextObject !== undefined && settings.nextObject !== "Text") {
            console.log("currentShape is ");
            console.log(settings.currentShape);
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
                //console.log(settings.shapes[settings.shapes.length - 1
                // Dont undo unless there is somethig to undo
                if (settings.shapes[settings.shapes.length - 1] != undefined ) {
                    var removed = settings.shapes[settings.shapes.length - 1];
                    //console.log(removed);
                    settings.undone.push(removed);
                    //console.log(settings.shapes[settings.shapes.length - 1]);
                    settings.shapes.pop();
                    drawAll();
                }
                break;
            case "redo":
                //console.log(settings.undone[settings.undone.length -1]);

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
  //      console.log("x: " + x);
  //      console.log("y: " + y);

        if(settings.currentShape !== undefined && settings.currentShape !== "Text") {
            if(settings.nextObject === "Select") {
              console.log('wow');
              settings.currentShape.x = x;
              settings.currentShape.y = y;
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
        //console.log(settings.shapes)
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
                        //console.log(shape);
                        settings.shapes.push({type: val.type, shape: shape});
                    });
                    //console.log(settings.shapes);
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
                //items.push( "<option id='" + key.id + "'>" + val.title + "</li>" );
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
        console.log(drawing);
        console.log(JSON.stringify(drawing));
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
