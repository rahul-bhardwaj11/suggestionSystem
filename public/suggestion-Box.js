
var proto = Object.create(HTMLElement.prototype);
proto.createdCallback = function() {
  this.shadowRoot = this.createShadowRoot();
  let template = `
  <div class = "col-lg-8 col-lg-offset-2">
  <input id = "inputfield" class = " form-control" placeholder = "search here ..."></input>
  <div id ="namelist" class = "col-lg-6" style = "max-height:200px; height:auto; overflow-y:scroll;">
  </div>
  <div id = "details" class = "col-lg-6" style = "max-height:200px; height:auto; overflow-y:scroll; background-color:#cdd2d8">
  </div>
  <link rel="stylesheet" href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>
  </div>
    `
  this.shadowRoot.innerHTML = template;
  this.dataArray = [];
  if(this.getAttribute('size') == null || this.getAttribute('size')<=4){
    this.setAttribute('size',5);
  }
  if(this.getAttribute('title') == null){
    this.setAttribute('title', 'first_name')
  }
  this.setAttribute('page',0);

  this.shadowRoot.getElementById("namelist").addEventListener('scroll', (e)=>{
    var div=this.shadowRoot.getElementById("namelist");
    if(div.scrollHeight  == div.clientHeight + div.scrollTop){
      let input = this.shadowRoot.getElementById('inputfield').value;
      if(input != ""){
      let page  = parseInt(this.getAttribute('page'));
      this.setAttribute('page' , page+1);
      page = page+1;
      let url = this.getAttribute('apiEndPoint') + input +'?pageNo=' + page + "&size="+ this.getAttribute('size');
      this.fetchdata(url);
    }}
  })

  this.shadowRoot.getElementById('inputfield').addEventListener("keyup",()=>{
    this.delayfunction(this.fetchDataOnInputChange,300)
  });

  this.fetchdata= (url)=>{
    fetch(url)
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
              this.displaydata(data);
            })
        }
  
  this.displaydata = (data)=>{
    for(element in data){
      let newIndexValue= this.dataArray.length;
      this.dataArray.push(data[element]);
      let namelist = this.shadowRoot.getElementById("namelist");
      let newdiv = document.createElement('div');
      newdiv.innerHTML = data[element][this.getAttribute('title')];
      newdiv.addEventListener('click' ,this.clickNameListHandler);
      newdiv.setAttribute('index' , newIndexValue);
      newdiv.style = " background: rgba(39, 43, 48, 0.5); height:40px; padding : 10px;margin-top:2px; font-size:20px;font-family:Trebuchet MS, sans-serif; color:white;";
      namelist.appendChild(newdiv);
    }
  }
  
 this.clickNameListHandler = (e)=>{
   e.preventDefault();
   this.displayDetail(e.target);
 }


 this.delayfunction = (function(){
  var timerId = 0;
  return function(callback, timeout){
    clearTimeout (timerId);
    timerId = setTimeout(callback, timeout);
  };
})();

 this.fetchDataOnInputChange = ()=>{
   let input = this.shadowRoot.getElementById('inputfield').value;
   this.shadowRoot.getElementById('namelist').innerHTML ="";
   this.shadowRoot.getElementById('details').innerHTML="";
   this.setAttribute('page',0);
   if(input != ""){
     let page = parseInt(this.getAttribute('page'));
     let size =this.getAttribute('size');
     let url = this.getAttribute('apiEndPoint') + input + "/?pageNo=" + page + "&size=" + size;
     this.fetchdata(url);
    }
 }

  
  this.displayDetail = (element)=>{
    let namelist = this.shadowRoot.getElementById('namelist').children;
    for(let i =0;i<namelist.length;i++){
      namelist[i].style.backgroundColor = "rgba(39, 43, 48, 0.5)";
    }
    element.style.backgroundColor = "#386002";
    let displaybox = this.shadowRoot.getElementById('details');
    displaybox.innerHTML ="";
    let index = element.getAttribute('index');
    for(info in this.dataArray[index]){
      let newdiv = document.createElement('h4');
      newdiv.innerHTML = info + " : " + this.dataArray[index][info];
      newdiv.style.padding= " 0px 30px";
      displaybox.appendChild(newdiv); 
    }
  }
};

var suggestionBox = document.registerElement('suggestion-Box', {prototype: proto});