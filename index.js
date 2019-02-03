var svg = d3.select("#venue-svg");

var groupDs = {
  boothWidth: 50,
  boothHeight: 65,
  gutter: 5
};

function zoomed() {
  g.attr("transform", d3.event.transform);
}

var g = svg
  .append("g")
  .attr("id", "master-group")
  .attr("transform", "translate(45 0)");

// Append booth groups to master group
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

// For each booth group, append group rects
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
        parseInt(
          positions[position][0] * groupDs.boothWidth +
            positions[position][0] * groupDs.gutter
        ) +
        " " +
        parseInt(
          positions[position][1] * groupDs.boothHeight +
            positions[position][1] * groupDs.gutter
        ) +
        ")"
      );
    })
    .append("text")
    .text(function(d) {
      return "" + d.id;
    })
    .attr("font-size", "10px")
    .attr("font-weight", "bold")
    .attr("dy", 60)
    .attr("dx", 5);
});

g.selectAll("g.booth")
  .append("rect")
  .attr("width", groupDs.boothWidth)
  .attr("height", groupDs.boothHeight)
  .attr("stroke", "steelblue")
  .attr("fill", "none")
  .attr("stroke-width", "1px");

boothReservations.forEach(function(reservation) {
  var booth = g.select("g#booth-" + reservation.boothId);
  booth
    .append("text")
    .text(function() {
      return reservation.orgName ? reservation.orgName : "Available";
    })
    .attr("dy", 15)
    .attr("dx", 5)
    .attr("font-size", "9px")
    .attr("font-weight", "bold");
  booth
    .select("rect")
    .attr("fill", "#FF5733")
    .attr("fill-opacity", 0.5);
});

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
