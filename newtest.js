import {
    draw,
    mousedown,
    mousemove as move,
    mouseup,
    mouseWheel as wheel
} from "./utils.js";




let canvas = document.querySelector("canvas");

canvas.width = 600;
canvas.height = 600;

let ctx = canvas.getContext("2d")

let x, y;
let dx = 0, dy = 0;
let offset = {
    x:0,
    y:0
}

draw(ctx, 100, 100);

canvas.addEventListener("mousedown", (e)=>{
    x = e.clientX - canvas.offsetLeft;
    y = e.clientY - canvas.offsetTop;
    console.log(x , ctx.getTransform().e)

    canvas.addEventListener("mousemove", mousemove);
});


canvas.addEventListener("mouseup", (e)=>{
    canvas.removeEventListener("mousemove", mousemove)

});

canvas.addEventListener("wheel", mouseWheel)


function mousemove(e){
    dx = (e.clientX - canvas.offsetLeft) - x;
    dy = (e.clientY - canvas.offsetTop) - y;
    
    x = e.clientX - canvas.offsetLeft;
    y = e.clientY - canvas.offsetTop;

    move(e, ctx, x, y , dx / ctx.getTransform().a, dy / ctx.getTransform().a, draw);

    offset.x = offset.x + (dx / ctx.getTransform().a);
    offset.y = offset.y + (dy / ctx.getTransform().a);

}

let scaleFactor = 1.1;

function mouseWheel(e){

    x = e.clientX - canvas.offsetLeft;
    y = e.clientY - canvas.offsetTop;

    let pt = {
            x: (x - ctx.getTransform().e) / ctx.getTransform().a,
            y: (y - ctx.getTransform().f) / ctx.getTransform().a
        }   



    let scale = ctx.getTransform().a
    let scaleFactor = Math.pow(0.9, e.deltaY);

    if(e.deltaY < 0 && ctx.getTransform().a < 10){
        ctx.translate(pt.x, pt.y)
        ctx.scale(scaleFactor, scaleFactor);
        ctx.translate(-pt.x, -pt.y)
        
    }else if(e.deltaY > 0 && ctx.getTransform().a > 0.2){
        ctx.translate(pt.x, pt.y)
        ctx.scale(scaleFactor, scaleFactor);
        ctx.translate(-pt.x, -pt.y)
    }

    ctx.save();
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,600, 600);
    ctx.restore();
    
    draw(ctx, 100, 100);

    
}






/*
    **************  NOTES  **************



    World to screen
        (origin offset - mouse position) * scale factor

    Screen to world (Most used formula)
        (origin offset - mouse position) / scale factor


    Get the WORLD distance between the mouse position and the origin point 
        distance = (origin point offset - mousePos) / scale factor

    Local Zoom
        -Technique #1
            - Get the vector between before the transformation and after the transformation
                1 -  before distance = (origin offset - mouse position) / scale factor
                2 -  zoom
                3 -  after distance = (origin offset - mouse position) / scale factor
                4 -  vector = before distance - after distance
                5 -  Translate by the vector
     

        -Technique #2
            - Translate - Zoom - Translate negative
                1 - vector = (origin - mouse positon ) / scale factor
                2 - translate by the vector
                3 - zoom
                4 - translate by the inverse vector

*/











