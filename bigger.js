var size = 8;

document.onkeypress=function(e){
  document.getElementById('biggerInput').style.fontSize=size+"px";
  size++;
}
