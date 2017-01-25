$( document ).ready(function() {
var settings = {
    canvasObj: document.getElementById("myCanvas"),
    nextObject: "Rectangle",
    nextColor: "Black",
    currentShape: undefined,
    shapes: []
};

$("#myCanvas").mousedown(function(e) {
    var shape = undefined;
    var context = settings.canvasObj.getContext("2d");
    //console.log("Mouse down!");
    // mouse possiton source
    // http://stackoverflow.com/questions/3234256/find-mouse-position-relative-to-element
    var x = e.pageX - $('#myCanvas').offset().left;
    var y = e.pageY - $('#myCanvas').offset().top;

    if (settings.nextObject == "Circle") {
        shape = new Circle(/* TODO: Fynna x og y */settings.nextColor);
    } else if (settings.nextObject == "Rectangle") {
        settings.currentShape == "Rectangle"
        console.log("Drawing Rectangle!");
        shape = new Rectangle(x, y, settings.nextColor);
    }
    //...
    settings.currentShape = shape;
    settings.shapes.push(shape)
    shape.draw(context);
});



$("#myCanvas").mousemove( function(e) {
    console.log("mouse moved")
        if(settings.currentShape !== undefined) {
            var x = e.pageX - $('#myCanvas').offset().left;
            var y = e.pageY - $('#myCanvas').offset().top;
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
