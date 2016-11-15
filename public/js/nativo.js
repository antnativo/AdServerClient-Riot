function placeAd(html) { 
  var placement = document.querySelector("#my-ad-placement")
  if (!placement) {
    setTimeout(function () { placement(html); },0)
    return null;
  }
  placement.innerHTML = html;
  for (var i = 0; i < placement.children.length; i++)
    if (placement.children[i].tagName.toLowerCase() == "script") 
      window.eval( placement.children[i].textContent )
}
function getAd(e) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", "http://localhost:8082/api/")
  xhr.onreadystatechange = function () { 
    if (xhr.status >= 200 && xhr.status <= 300 || xht.status == 304)
      placeAd(xhr.responseText)
  }
  xhr.send(null)
}
getAd();