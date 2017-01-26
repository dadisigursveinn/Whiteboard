# Whiteboard
In this assignment, your task is to write a drawing application, using JavaScript and HTML5. It should use the HTML5 canvas element, and use object-oriented design for the JavaScript code. A use case for your application could be for a teacher which wants to use your application instead of a regular whiteboard.

## The application should be capable of the following:

### (40%) it should be possible to add primitive drawing objects to the drawing, i.e.:
+ circle
+ rectangle
+ line
+ text
+ pen (i.e. a freehand drawing)

### This should work similarly as in most drawing programs (MSPaint, Gimp etc.). The pen should be the default drawing object.
+ (10%) It should be able to manipulate various properties of the drawing objects, such as their color(s), linewidth, font etc.
+ (10%) the application should support undo and redo. It is sufficient that each object added to the drawing can be "undone" (and redone). A penstroke should be considered a single object, i.e. when that object is undone it should disappear completely.
+ (10%) all elements should be movable.
+ (10%) it should be possible to save and load a drawing (See below: an API is provided which makes this easier).

### Also, the following will be considered in the final grade as well:
+(10%) code quality (consistency in indentation, variable names, brace placements, whitespace usage etc., structure of the code (are there many global variables? Is the code split up into different files?)
+(10%) usability: is it easy to use the application? Does it have sensible defaults? 

### Bonus points (which could bring the grade up to 12) will be awarded if the solution contains any of the following features:

A more advanced undo/redo: such as when an object is moved, when the color is changed and more.
Multiple move: The ability to move many objects simultaneously (i.e. select many objects first, then move them all together).
The ability to group primitives (rect, circle, line etc.) together into a template, which can be saved and then added to a new whiteboard with ease (example: a teacher might want to create a "binary tree node" template, containing a circle with text inside, and two arrows pointing downwards from the circle)
Math formulas, and symbols commonly used in math (such as Pi, the sum symbol etc.). You are free to experiment with the implementation of this, one possibility is to be able to write equations in some sort of a language which would then be converted to a drawing by the application (see example here).
Other features may come into consideration when bonus points are awarded. The question "how much do we have to implement to get 12?" can only be answered by: "It depends on the quality of the implementation".

A number of web-based drawing applications and tutorials are available online, including (but not limited to):

An example from Opera
SketchPad
You may find some of these to be helpful, but they are not necessarily doing exactly what we want. If you happen to stumble upon other examples you think might be useful, please allow other to enjoy your findings.

Using libraries to help with the implementation is allowed (such as jQuery, Bootstrap etc.)

## API for saving

UPDATE: A node.js server is provided, which is preferred over the old one, as you have more control over it, and it does not have any size restrictions as the old one. Note however that the server does not have any database, i.e. all drawings are stored in memory, and are therefore lost when you shut down the server.

The code is available as an attachment, and requires Node.js (which you will need to install anyway in the course). Download the code, extract the code, and run the following commands inside the root folder:

npm install
node src/index.js
The API is different as well, i.e. you have the following methods which you can call:

http://localhost:3000/api/drawings - GET
Returns a list of all drawings. Each item in the list contains the properties id and title
 
http://localhost:3000/api/drawings/{id} - GET
Returns a single drawing, both the title and id, as well as the content of the drawing, and the created date.
 
http://localhost:3000/api/drawings - POST
Adds a single drawing to the in-memory database. The body of the request should contain the following two properties: "title" and "content". Example:

var drawing = {
    title: "Nú er gaman",
    content: "the contents of the shapes array"
};
var url = "http://localhost:3000/api/drawings";

$.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: url,
    data: JSON.stringify(drawing),
    success: function (data) {
        // The drawing was successfully saved
    },
    error: function (xhr, err) {
        // The drawing could NOT be saved
    }
});

 
 An identical set of methods are available for templates, i.e. /api/templates, /api/templates/{id} etc.
