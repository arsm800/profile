var dataset = {
  nodes: [
    {text: "name"},
    {text: "Contact"},
    {text: "email"},
    {text: "gitHub"},
    {text: "projects"},
    {text: "license plates"},
    {text: "electric car maps"},
    {text: "vision"}
  ],
  edges: [
    {source: 0, target: 1},
    {source: 0, target: 4},
    {source: 0, target: 7},
    {source: 1, target: 2},
    {source: 1, target: 3},
    {source: 4, target: 5},
    {source: 4, target: 6}
  ]
};

var h = 600;
var w = 1000;

var svg = d3.select("body")
            .append("svg")
            .attr("height", h)
            .attr("width", w);

//Initialize a force layout.//
var force = d3.layout.force()
                     .nodes(dataset.nodes)
                     .links(dataset.edges)
                     .size([w, h])
                     .linkDistance([250])
                     .charge([-100])
                     .start();

//Create a line for each edge in dataset.//
var edges = svg.selectAll("line")
               .data(dataset.edges)
               .enter()
               .append("line")
               .style("stroke", "red")
               .style("stroke-width", 1);

//Create a circle for each node.//
var nodes = svg.selectAll("circle")
               .data(dataset.nodes)
               .enter()
               .append("circle")
               .attr("r", 10)
               .style("fill", "blue")
               .call(force.drag);     //Enable drag and drop interaction.//

//Specifies what happens when force layout ticks.//
force.on("tick", function() {

  edges.attr("x1", function(d) { return d.source.x; })
       .attr("y1", function(d) { return d.source.y; })
       .attr("x2", function(d) { return d.source.x; })
       .attr("y2", function(d) { return d.source.y; });

  nodes.attr("cx", function(d) { return d.x; })
       .attr("cy", function(d) { return d.y; });
});
