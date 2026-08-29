(function(){
  "use strict";
  var page = document.body.getAttribute("data-page") || "home";
  var q = function(s,c){return (c||document).querySelector(s)};
  var qa = function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};

  var NAV = [
    {code:"01", key:"home",       label:"门厅",   href:"index.html"},
    {code:"02", key:"catalog",    label:"目录",   href:"catalog.html"},
    {code:"03", key:"worldview",  label:"圣典",   href:"worldview.html"},
    {code:"04", key:"manual",     label:"规程",   href:"manual.html"},
    {code:"05", key:"operations", label:"行动",   href:"operations.html"}
  ];
  var TITLES = {home:"门厅", catalog:"异常档案目录", worldview:"圣典 · 辉光信仰",
                manual:"规程 · HGEF-PRO-001", operations:"行动台账 · HGEF-PRO-002",
                object:"事件档案 · HGEF-ARC-001", story:"故事档案 · HGEF-ARC-001-T",
                arc042:"事件档案 · HGEF-ARC-042"};

  /* ---- brand ---- */
  var brand =
    '<div class="brand">'+
      '<div class="mark"><img src="assets/hgef-logo.jpg" alt="HGEF FOUNDATION 徽记"></div>'+
      '<div class="t"><b>HGEF 基金会</b><span>HUMAN GLOW<br>FOUNDATION</span></div>'+
      '<div class="creed">守护者不得饮下遗忘。<br>我们所记的，终将被世界所遗忘；我们所做的，便是那未被写下的祷文。</div>'+
    '</div>';

  /* ---- nav ---- */
  var navHTML = '<div class="nav"><div class="cap">圣务档案 · 目录</div>';
  NAV.forEach(function(n){
    navHTML += '<a href="'+n.href+'"'+(page===n.key?' class="on"':'')+'>'+
               '<span class="code">'+n.code+'</span><span class="dot"></span>'+n.label+'</a>';
  });
  navHTML += '</div>';

  var railFoot =
    '<div class="rail-foot">'+
      '<div class="status"><span class="led"></span>档案接口 在线</div>'+
      '圣录部档案系统 v3.1<br>观察期进行中<br>第 0 号 · 未定级'+
    '</div>';

  var rail = q("#app-rail");
  if(rail){ rail.innerHTML = brand + navHTML + railFoot; rail.classList.add("rail"); }

  /* ---- topbar ---- */
  var main = q("#app-main");
  if(main){
    var tb = document.createElement("div");
    tb.className = "topbar";
    tb.innerHTML =
      '<div class="crumb">HGEF 基金会 / <b>'+TITLES[page]+'</b></div>'+
      '<div class="spacer"></div>'+
      '<div class="meta">'+
        '<span class="clr">密级 █</span>'+
        '<span class="n">内部公开</span>'+
        '<span class="clock" id="hgef-clock">--:--:--</span>'+
      '</div>';
    main.insertBefore(tb, main.firstChild);
  }

  /* ---- footer ---- */
  var foot = document.createElement("div");
  foot.className = "footer";
  var y = new Date().getFullYear();
  foot.innerHTML =
    '<div>HGEF 基金会 · 圣录部档案系统</div>'+
    '<div class="f"><span>人类辉光永存</span><span>仅限知情范围</span><span>记录先于收容</span></div>'+
    '<div>圣务档案 · '+y+'</div>';
  if(main){ main.appendChild(foot); }

  /* ---- top button ---- */
  var toTop = document.createElement("div");
  toTop.className = "totop"; toTop.innerHTML = "&#8593;";
  document.body.appendChild(toTop);
  toTop.addEventListener("click", function(){ window.scrollTo({top:0,behavior:"smooth"}); });
  window.addEventListener("scroll", function(){
    toTop.classList.toggle("show", window.scrollY > 700);
  }, {passive:true});

  /* ---- clock ---- */
  var clock = q("#hgef-clock");
  if(clock){
    function tick(){
      var d = new Date();
      var p = function(n){return ("0"+n).slice(-2)};
      clock.textContent = p(d.getHours())+":"+p(d.getMinutes())+":"+p(d.getSeconds());
    }
    tick(); setInterval(tick, 1000);
  }

  /* ---- reveal on scroll ---- */
  if("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
    }, {threshold:.08});
    qa(".reveal").forEach(function(el){ io.observe(el); });
  } else {
    qa(".reveal").forEach(function(el){ el.classList.add("in"); });
  }

  /* ---- object contact gate (ARC-001) ---- */
  var cgate = q("#contact-gate");
  if(cgate){
    var body2 = q("#contact-body");
    var btn = q("#contact-enter");
    if(btn){ btn.addEventListener("click", function(){
      cgate.classList.add("hidden");
      if(body2){ body2.classList.add("in"); }
      setTimeout(function(){ window.scrollTo({top:0,behavior:"smooth"}); }, 60);
    }); }
  }

  /* ---- access terminal gate ---- */
  var gate = document.createElement("div");
  gate.className = "gate";
  gate.id = "app-gate";
  gate.innerHTML =
    '<div class="gate-shell">'+
      '<div class="term" id="gate-term"></div>'+
      '<form id="gate-form">'+
        '<label>圣职识别号</label>'+
        '<input id="gate-input" autocomplete="off" autofocus placeholder="\u25AE\u25AE\u25AE\u2013\u25AE\u25AE">'+
        '<button type="submit" id="gate-submit">接入档案库</button>'+
      '</form>'+
      '<div class="hint">辉光之下 · 记录先于收容 · 圣务不休</div>'+
    '</div>';
  document.body.insertBefore(gate, document.body.firstChild);

  if(!sessionStorage.getItem("hgef_gate")){
    var term = q("#gate-term");
    var lines = [
      "HGEF 圣务档案系统 v3.1",
      "圣务接入 · 记录先于收容 · 保护公众认知",
      "> 正在校验辉光余烬 ………… 完成",
      "> 检校裂隙边缘 ……………… 0 项活动",
      "> 申请圣职识别号"
    ];
    var li = 0, ci = 0, cur = "";
    function typeLine(){
      if(li >= lines.length){ addCursor(); return; }
      var line = lines[li];
      cur = line.slice(0, ++ci);
      term.innerHTML = lines.slice(0, li).join("<br>") +
        (li>0?"<br>":"") + cur + '<span class="cursor"></span>';
      if(ci >= line.length){ ci = 0; li++; addCursor(); setTimeout(typeLine, 430); }
      else { setTimeout(typeLine, 16); }
    }
    function addCursor(){
      term.innerHTML = lines.slice(0, li).join("<br>") + '<span class="cursor"></span>';
    }
    typeLine();
    var gatesub = q("#gate-submit");
    if(gatesub){
      gatesub.addEventListener("click", function(){
        sessionStorage.setItem("hgef_gate","1");
        gate.classList.add("hidden");
      });
    }
    q("#gate-form").addEventListener("submit", function(e){
      e.preventDefault();
      sessionStorage.setItem("hgef_gate","1");
      gate.classList.add("hidden");
    });
  } else if(gate){ gate.classList.add("hidden"); }

  /* ---- set page title ---- */
  document.title = TITLES[page] + " · HGEF 基金会";
})();
