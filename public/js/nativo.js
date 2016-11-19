function placeAd(response) { 
  var placement = document.querySelector(JSON.parse(response).selector);
  if (!placement) {
    setTimeout(function () { placeAd(response); },0)
    return null;
  }
  placement.innerHTML = JSON.parse(response).html;
  for (var i = 0; i < placement.children.length; i++)
    if (placement.children[i].tagName.toLowerCase() == "script") 
      window.eval( placement.children[i].textContent )
}
function getAd(e) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", "http://localhost:8082/api/",true)
  xhr.onload = function () { 
      placeAd(xhr.responseText)
  }
  xhr.send(null)
}
getAd();