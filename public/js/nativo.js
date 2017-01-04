function placeAd(response) { 
 // Used to remove script node once node is loaded -- AC 5/26/2016
  function removeScriptNodeOnLoad(e) { 
      document.head.removeChild(e.target)
  }
  // Used to clone script node and append it to the dom. Set onload event handler to removeScriptNodeOnLoad, which removes node -- AC 5/26/2016
  function createScriptNodeFromNode(node) {
    var jsnode = document.createElement("script")
    jsnode.src = node.src;
    jsnode.type = (node.type) ? node.type : "text/javascript";
    jsnode.onload = removeScriptNodeOnLoad;
    jsnode.onerror = removeScriptNodeOnLoad;
    document.head.appendChild( jsnode )
  }  
  /* Moved inline callback for the traverNode to it's own function named compileInlineJavaScript
     The function is called during the recursive dom tree parsing to find inline script tags -- AC 5/23/2016 */
  function compileInlineJavaScript(el) {
    if (typeof el != "undefined" && typeof el.nodeName != "undefined" && el.nodeName != null && el.nodeName.toUpperCase().localeCompare('SCRIPT') == 0 && (!el.type || el.type.localeCompare('text/javascript') == 0) && !el.src) {
      window['eval'].call(window, el.innerHTML)
      return true;
    } else if (typeof el != "undefined" && typeof el.nodeName != "undefined" && el.nodeName != null && el.nodeName.toUpperCase().localeCompare('SCRIPT') == 0 && (!el.type || el.type.localeCompare('text/javascript') == 0) && el.src){ // Added Condition to find script nodes with src  -- AC 5/26/2016
      createScriptNodeFromNode(el) // Used to load external script and remove node once loaded -- AC 5/26/2016
      return true;
    }
    return false;
  }
  function traverseNode(node, fun) {
    if (typeof node != "undefined") {
         fun(node) // Doc: If script tag with inline code, parse
          for (var i = 0, len = node.childNodes.length; i < len; i++)
            traverseNode(node.childNodes[i],fun) //Doc: determine each child if they are script tags with inline code. If not find the child's children --AC 5/23/16
    }
  }
  
  // Find Placement and Insert HTML
  var placement = document.querySelector(JSON.parse(response).selector);
  if (!placement) {
    setTimeout(function () { placeAd(response); },0)
    return null;
  }
  placement.innerHTML = JSON.parse(response).html;

  //LOOP Through Nodes and Compile
  for (var i = 0; i < placement.children.length; i++)
    if (compileInlineJavaScript(placement.children[i]) && typeof placement.children[i] == "undefined" ) {
    } else
      if ((typeof placement.children[i].children != "undefined" && placement.children[i].children.length))
        traverseNode(placement.children[i], compileInlineJavaScript) // moved inline script to named function: compileInlineJavaScript -- AC 5/23/2016
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