(function(){
  "use strict";
  // 异常档案登记表：目录页据此渲染。新增异常时，在本数组中加一条记录，
  // 并新建对应的档案 HTML（href 指向它）即可自动进入目录。
  window.HGEF_ARCHIVE = [
    {
      code: "HGEF-ARC-042",
      name: "隅影",
      kind: "事件档案",
      cls: "Euclid",
      clear: "3 级",
      status: "已归档 · 观测中",
      img: "images/HGEF-ARC-042-P1.jpg",
      href: "arc042.html",
      syn: "模因具象化类人异常实体，终生蜷缩墙角、以多只细长手掌遮面。不可物理销毁；凝视与黑暗会放大其认知危害辐射。"
    },
    {
      code: "HGEF-ARC-001",
      name: "兰陵花女士",
      kind: "事件档案",
      cls: "Keter",
      clear: "5 级",
      status: "归零行动 · 观察期",
      img: "images/hgef-arc-001/entity_approach.png",
      href: "object.html",
      syn: "与公园求生系统关联的认知危害实体。于「归零」行动后被判定抹除，关联档案转销毁，仅存故事一档。"
    },
    {
      code: "HGEF-ARC-001-T",
      name: "兰陵花不再开放",
      kind: "故事档案",
      cls: "密级 5",
      clear: "5 级",
      status: "唯一留存",
      img: "images/hgef-arc-001/empty_archive.png",
      href: "story.html",
      syn: "抹除行动后唯一留存的故事记录。圣录部保留它的理由是——行动必须被记录。"
    }
  ];
})();
