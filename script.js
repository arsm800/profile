var dataset = {
  nodes: [
    {text: "name", r: 200, color: "#000066"},
    {text: "Contact", r: 100, color: "#00FF99"},
    {text: "email", r: 50, color: "#22A4FE"},
    {text: "gitHub", r: 50, color: "#22A4FE"},
    {text: "projects", r: 100, color: "#00FF99"},
    {text: "license plates", r: 50, color: "#22A4FE"},
    {text: "electric car maps", r: 50, color: "#22A4FE"},
    {text: "vision", r: 100, color: "#00FF99"}
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
var w = 1200;

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
               .style("stroke-width", 10);

//Create a circle for each node.//
var nodes = svg.selectAll("circle")
               .data(dataset.nodes)
               .enter()
               .append("circle")
               .attr("r", function(d) {
                 return d.r;              //Appends individual radii specified in dataset to nodes.//
               })
               .attr("text", function(d) {
                 return d.text;
               })
               .style("fill", function(d) {
                 return d.color;
               })
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
