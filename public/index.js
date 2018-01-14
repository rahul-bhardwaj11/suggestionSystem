window.onload = (e)=>{
  pressedKeys=[];
  window.addEventListener("keyup",(e)=>{
    if(e.key == "Escape"){
        document.getElementById("displayContainer").style.display ="none";
    }
     pressedKeys=pressedKeys.filter((val)=>{
         return (val!=e.key);
     })
   });
  window.addEventListener("keydown",(e)=>{
    {   
        if(pressedKeys.find((val)=>{
            return val==e.key;
        })){}
        else{
          pressedKeys.push(e.key);
        }
        if(e.key==" "){
            if(pressedKeys[0]=="Control" && pressedKeys[1]=="a" && pressedKeys[2]==" "){
                
                displayContainer.style.display = "block";
                
            }
        }
      }
  });
}
