var database

var drawing = [];
var currentPath,show;
var isDrawing = false;

function setup(){
  canvas = createCanvas(500,400);
  canvas.mousePressed(startPath);
  canvas.parent('canvascontainer');
  canvas.mouseReleased(endPath);

  var config = {  
    apiKey: "AIzaSyCo4bwBU9lkMrUJV82HJb8PTZ1NdmP5PXM",
    authDomain: "project-36-149df.firebaseapp.com",
    databaseURL: "https://project-36-149df.firebaseio.com",
    projectId: "project-36-149df",
    storageBucket: "project-36-149df.appspot.com",
    messagingSenderId: "857121212615",
    appId: "1:857121212615:web:a8b7c9fca7d681af1356e2"
  };
  firebase.initializeApp(config);
  database = firebase.database();  

  var params = getURLParams();
  console.log(params)
  if(params.id){
    console.log(params.id);
    showDrawing(params.id);
  }
}


function startPath(){
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath(){
  isDrawing = false;
}

function draw(){

  

  background("#C8FA55");
  

  if (isDrawing){
    var point = {
      x: mouseX,
      y:mouseY
    }
    currentPath.push(point);
  }



  fill("white");

  strokeWeight(10);
  noFill();
  for(var i = 0; i<drawing.length; i++){
    var path = drawing[i];
    beginShape();
    for(var j = 0; j<path.length; j++){
      vertex(path[j].x,path[j].y)
    }
    endShape();
  }
}



function saveDrawing(){
  
 
  var ref = database.ref('/').set({
    drawing : drawing
  });
 
}



function gotData(data){

  var ref = database.ref('/');
  ref.on('value', gotData, errData)

  var drawings = data.val();
  var keys = Object.keys(drawings);
  for (var i = 0; i< keys.length; i++ ){
    var key = keys[i];
    //console.log(key);
    var li = createElement('li', '');
    var ahref = createButton('#', key);  
    
    ahref.mousePressed(showDrawing);
    ahref.parent(li);     
    li.parent('drawinglist');
  }
}

function errData(err) {
  console.log(err);
}

function showDrawing(){


  var ref = database.ref('/');
  ref.on('value', oneDrawing, errData);

  function oneDrawing(data){
    var dbdrawing = data.val();
    drawing = dbdrawing.drawing                                                                                                                  //.
  }
}