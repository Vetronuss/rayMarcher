var verts = []
var verts2 = []
var angle = 0
function setup() {
  squareCanvas()
  verts.push(createVector(100,100))
  verts.push(createVector(100,200))
  verts.push(createVector(200,200))
  verts.push(createVector(200,100))
  
  verts2.push(createVector(width-200,50))
  verts2.push(createVector(width-100,50))
  verts2.push(createVector(width-100,200))
}

function draw() {
  background(100);
  fill(0)
  
  //draw shapes
  drawPoly(verts,true);
  drawPoly(verts2,true)
  circle(width/2,height/2,50)
  
  if (keyDown('a'))
  {
    angle-=0.014
  }
  if (keyDown('d'))
  {
    angle+=0.014
  }
  
  
  march(createVector(mouseX,mouseY),angle,1)
}

function march(p,ang,a)
{
  
  if (a > 10)
    return;
  
  var f = createVector(p.x,p.y)
  var t = closestEdge(f,verts)
  var e = closestEdge(f,verts2)
  var u = closestEdgeCircle(f,createVector(width/2,height/2),50)
  noFill();
  
  
  var r = min([vDist(f,t)*2,vDist(f,u)*2,vDist(f,e)*2])
  
  
  circle(f.x,f.y,r)
  drawRay(p,ang,r/2)
  var l = createVector(p.x+cos(ang)*r/2,p.y+sin(ang)*r/2)
  if (r < 4)
  {
    return
  }
  march(l,ang,a+1)
}

function drawPoly(poly, close = false)
{
  beginShape();
  for (var i = 0; i < poly.length; i++)
  {
    vertex(poly[i].x,poly[i].y)
  }
  if (close)
    endShape(CLOSE);
  else
    endShape()
}

//converts a array of vectors to an array of lines (2 vector arrays)
function vertsToLines(poly)
{
  var out = [];
  for (var i = 0; i < poly.length-1; i++)
  {
    out.push([poly[i],poly[i+1]])
  }
  out.push([poly[poly.length-1],poly[0]])
  return out;
}

//returns the closest point on a polygon to a point
function closestEdge(p,poly)
{
  
  var lines = vertsToLines(poly)
  var close = [-9999999,-9999999] //crazy far point
  for (var i = 0; i < lines.length; i++)
  {
    var po = perp(p.x,p.y,lines[i][0].x,lines[i][0].y,lines[i][1].x,lines[i][1].y)
    
    if (dist(p.x,p.y,po[0],po[1]) < dist(close[0],close[1],p.x,p.y))
    {
      close = po;
    }
  }
  return createVector(close[0],close[1]);
}

function closestEdgeCircle(p,c,size)
{
  var a = vGetAngle(c,p);
  return createVector(c.x+cos(a)*size/2,c.y+sin(a)*size/2)
}