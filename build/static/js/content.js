!function(){console.log("Hello Content");var o="",e="",t="";chrome.storage.sync.get(["colorPalette"],(function(n){o=n.colorPalette,e=JSON.parse(JSON.stringify(o)),console.log(e),function(){var o=document.getElementById("nav-home-link").href,e=/(\w{2}-\w*-\w)/g;t=o.match(e)[0],console.log(t)}(),function(){var o=e[t];console.log(o);for(var n=document.getElementsByClassName("globalNav-122"),l=0;l<n.length;l++)n[l].style.setProperty("background-color",o,"important")}()}))}();
//# sourceMappingURL=content.js.map