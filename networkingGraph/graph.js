// https://bl.ocks.org/mbostock/4062045
var width = 700,
    height = 500,
    radius = 7.5;

// Define the div for the tooltip
// var toolTip = d3.select("body").append("div") 
//     .attr("class", "tooltip")       
//     .style("opacity", 0);

var totalNumPeople = d3.select("body").append("div") 
    .attr("class", "totalPeople");

var svg = d3.select("body").append("svg")
    .attr("id", "mySVG")
    .attr("width", width)
    .attr("height", height);

var toolTip = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);

var color = d3.scaleOrdinal(d3.schemeCategory20);
// var color = d3.scaleOrdinal()
//     .domain(["Blizzard", "Naughty Dog", "Dupont"])
//     .range(["#FF0000", "#009933" , "#0000FF"]);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(20).strength(1))
    // .force("x", d3.forceX())
    // .force("y", d3.forceY())
    .force("charge", d3.forceManyBody().strength(-17))
    // .force('collision', d3.forceCollide().radius(function(d) {
    //   return d.radius + 5
    // }))
    .force("center", d3.forceCenter(width / 2, height / 2));

d3.json("data.json", function(error, graph) {
  if (error) throw error;

  var link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
      // .attr("r", radius)
      .attr("r", function(d,i){
        if(i === 0 || i === 1){
          return radius+5;
        }else{
          return radius;
        }
      })
      .attr("fill", function(d) { return color(d.group);})
      // .attr('fill',function(d, i){
      //   if(i== 0){
      //     return color("#000000");
      //   }else if(i == 1){
      //     return color("#000000");
      //   }else{
      //     return color(d.group);
      //   }
      // })
      .on("mouseover", function(d) {    
            toolTip.transition()    
                .duration(200)    
                .style("opacity", 1);    
            toolTip.html("<p><div class='title'>"+ d.id + "</div> Company: " + d.company+ "<br> Role: "+ d.role )  
                .style("left", (d3.event.pageX - 90) + "px")   
                .style("top", (d3.event.pageY - 150) + "px");  
            })          
        .on("mouseout", function(d) {   
            toolTip.transition()    
                .duration(500)    
                .style("opacity", 0); 
        })
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  totalNumPeople.html("<p>Total Number of People Contacted: " + (graph.nodes.length-2)+"</p>");

    // .style("left", (d3.event.pageX) + "px")   
    // .style("top", (svg.height) + "px");
  // var tip = d3.tip()
  //   .attr('class', 'd3-tip')
  //   .offset([-10, 0])
  //   .html(function(d) {
  //     return "<strong>Frequency:</strong> <span style='color:red'>" + d.id + "</span>";
  //   })

  // node.append("title")
  //     .text(function(d) { return d.id; });

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

 function ticked() {
    node.attr("cx", function(d) { return d.x = Math.max(radius, Math.min(width - radius, d.x)); })
        .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(height - radius, d.y)); });

    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
  }
  // function ticked() {
  //   link
  //       .attr("x1", function(d) { return d.source.x; })
  //       .attr("y1", function(d) { return d.source.y; })
  //       .attr("x2", function(d) { return d.target.x; })
  //       .attr("y2", function(d) { return d.target.y; });

  //   node
  //       .attr("cx", function(d) { return d.x; })
  //       .attr("cy", function(d) { return d.y; });
  // }
});

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
