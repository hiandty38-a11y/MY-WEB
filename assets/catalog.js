(function(){
  "use strict";
  var list = document.getElementById("cat-list");
  var none = document.getElementById("cat-none");
  var count = document.getElementById("cat-count");
  var qbox = document.getElementById("cat-q");

  function esc(s){
    return String(s).replace(/[&<>"]/g, function(c){
      return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c];
    });
  }

  function render(filter){
    var q = (filter || "").trim().toLowerCase();
    var items = (window.HGEF_ARCHIVE || []).filter(function(it){
      if(!q) return true;
      return (it.code + " " + it.name + " " + it.kind + " " + it.cls + " " + it.clear + " " + it.status + " " + it.syn).toLowerCase().indexOf(q) !== -1;
    });
    list.innerHTML = items.map(function(it){
      return '<a class="catrow" href="' + esc(it.href) + '">' +
        '<img class="thumb" src="' + esc(it.img) + '" alt="' + esc(it.name) + '">' +
        '<div class="body">' +
          '<div class="thead"><span class="code">' + esc(it.code) + '</span><span class="kind">' + esc(it.kind) + '</span></div>' +
          '<div class="name">' + esc(it.name) + '</div>' +
          '<div class="syn">' + esc(it.syn) + '</div>' +
          '<div class="meta">' +
            '<span class="tag">' + esc(it.cls) + '</span>' +
            '<span class="tag gold">' + esc(it.clear) + '</span>' +
            '<span class="tag">' + esc(it.status) + '</span>' +
          '</div>' +
        '</div>' +
        '<span class="go">查阅 <span>&#8594;</span></span>' +
      '</a>';
    }).join("");
    count.textContent = items.length + " 项";
    none.style.display = items.length ? "none" : "block";
  }

  render("");
  qbox.addEventListener("input", function(e){ render(e.target.value); });
})();
