var svg = d3.select("#venue-svg");

function zoomed() {
  g.attr("transform", d3.event.transform);
}

var g = svg.append("g");

var tables = g
  .selectAll("g")
  .data(venueBooths)
  .enter()
  .append("g")
  .attr("transform", function(d) {
    return "translate(" + d.x + " " + d.y + ")";
  });

var tableRects = tables
  .append("rect")
  .attr("stroke", "steelblue")
  .attr("stroke-width", "2px")
  .attr("width", function(d) {
    return d.w;
  })
  .attr("height", function(d) {
    return d.h;
  })
  .attr("fill", "none")
  .attr("fill", function(d) {
    return $.isEmptyObject(d.reservation) ? "none" : "#FF5733";
  })
  .attr("id", function(d) {
    return "table-" + d.id;
  });

tables
  .append("text")
  .text(function(d) {
    return "Booth " + d.id;
  })
  .attr("dx", 5)
  .attr("dy", 60)
  .attr("font-size", "8px");

tables
  .append("text")
  .text(function(d) {
    return d.reservation.orgName ? d.reservation.orgName : "Available";
  })
  .attr("dy", 15)
  .attr("dx", 5)
  .attr("font-size", "9px")
  .attr("font-weight", "bold");

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
