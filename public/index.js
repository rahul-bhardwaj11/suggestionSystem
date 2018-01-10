window.onload = (e)=>{
  displayContainer = document.getElementById('displayContainer');
  outputContainer = document.getElementById('outputContainer');
  inputField = document.getElementById('inputField');
  bgimage = document.getElementById('bgimage');
  pressedKeys=[];
  window.addEventListener("keyup",keyUp);
  window.addEventListener("keydown",keyDown);
}
function keyDown(e){
  if(pressedKeys.find((val)=>{
      return val==e.key;
  })){}
  else{
    pressedKeys.push(e.key);
  }
  if(e.key==" "){
      if(pressedKeys[0]=="Control" && pressedKeys[1]=="a" && pressedKeys[2]==" "){
          console.log("pressed");
          displayContainer.style.display = "block";
          inputField.focus();
      }
  }
}

function outputDisplay(strlist){
    outputContainer.innerHTML ="";
    strlist.forEach(element => {
        var newdiv=`<div style = " background: rgba(39, 43, 48, 0.5);; height:40px; padding : 10px;margin-top:2px; font-size:20px;font-family:Trebuchet MS, sans-serif; color:white;" >${element}</div>`;
        outputContainer.innerHTML+=newdiv;
    });
}

function keyUp(e){
   if(e.key == "Escape"){
       displayContainer.style.display = "none";
       inputField.value="";
       outputContainer.innerHTML="";
   }
    pressedKeys=pressedKeys.filter((val)=>{
        return (val!=e.key);
    })
  }

function fetchData(e){
    var url="http://localhost:3000/match/"+inputField.value;
    if(inputField.value!=""){
    fetch(url)
            .then(function(res){
                return res.json()
            })
            .then(function(data){
                outputDisplay(data);
            })
        }
}
var delay = (function(){
    var timerId = 0;
    return function(callback, timeout){
      clearTimeout (timerId);
      timerId = setTimeout(callback, timeout);
    };
  })();

inputField.addEventListener("keyup",function(){
    delay(fetchData,200)}
);