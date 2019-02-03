var svg = d3.select("#venue-svg");

var groupDs = {
  boothWidth: 50,
  boothHeight: 50,
  gutter: 5
};

function zoomed() {
  g.attr("transform", d3.event.transform);
}

var g = svg.append("g");

var boothGroups = g
  .selectAll("g")
  .data(boothGroupData)
  .enter()
  .append("g")
  .attr("class", "boothGroup")
  .attr("id", function(d) {
    return "boothGroup-" + d.id;
  })
  .attr("transform", function(d) {
    return "translate(" + d.groupX + " " + d.groupY + ")";
  });

boothGroupData.forEach(function(group) {
  var positions = {
    1: [0, 0],
    2: [1, 0],
    3: [0, 1],
    4: [1, 1]
  };
  var position = 0;
  g.select("#boothGroup-" + group.id)
    .selectAll("g")
    .data(group.booths)
    .enter()
    .append("g")
    .attr("class", "booth")
    .attr("id", function(d) {
      return "booth-" + d.id;
    })
    .attr("transform", function(d) {
      position = position + 1;
      return (
        "translate(" +
        positions[position][0] * groupDs.boothWidth +
        " " +
        positions[position][1] * groupDs.boothHeight +
        ")"
      );
    });
});

g.selectAll("g.booth")
  .append("rect")
  .attr("width", groupDs.boothWidth)
  .attr("height", groupDs.boothHeight)
  .attr("stroke", "black")
  .attr("fill", "none")
  .attr("stroke-width", "2px");

svg
  .append("rect")
  .attr("width", "100%")
  .attr("height", "100%")
  .style("fill", "none")
  .style("pointer-events", "all")
  .call(
    d3
      .zoom()
      .scaleExtent([1 / 2, 4])
      .on("zoom", zoomed)
  );
