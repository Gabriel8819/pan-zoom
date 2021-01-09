function draw(ctx, rx, ry){
    
ctx.fillRect(rx, ry, 100, 100)
ctx.fillRect(-150, -150, 100, 100)

ctx.beginPath();
ctx.strokeStyle="black"
ctx.moveTo(0,0);
ctx.lineTo(600, 0)
ctx.lineTo(600, 600)
ctx.lineTo(0, 600)
ctx.closePath();
ctx.stroke();

ctx.beginPath();
ctx.strokeStyle="red"
ctx.moveTo(50,50);
ctx.lineTo(550, 50)
ctx.lineTo(550, 550)
ctx.lineTo(50, 550)
ctx.closePath();
ctx.stroke();

ctx.beginPath()
ctx.strokeStyle = "blue"
ctx.moveTo(-50, -600)
ctx.lineTo(-50, 600)
ctx.stroke()
}

function mousemove(e, ctx, x, y, dx, dy, draw){
    ctx.save();
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,600, 600);
    ctx.restore();

    ctx.translate(dx, dy);
    draw(ctx, 100, 100)

  
}


function mouseup(e){
    canvas.removeEventListener("mousemove", mousemove)
    canvas.removeEventListener("mousedown", mousedown)
    console.log("mouseup")
}


function mousedown(e){

}


function mouseWheel(e, ctx, x, y){
    console.log(x, y)


    ctx.save();
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,600, 600);
    ctx.restore();


    if(e.deltaY < 0){
        //zoom in
        ctx.scale(2,2)
        
    }else{
        //zoom out
        
        ctx.scale(0.5, 0.5)
    }

    draw(ctx, 100, 100);
}





export { 
    draw,
    mousedown,
    mousemove,
    mouseup,
    mouseWheel
};