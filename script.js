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

var h = 300;
var w = 500;

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
               .style("stroke", "#ccc")
               .style("stroke-width", 1);

//Create a circle for each node.//
var nodes = svg.selectAll("circle")
               .data(dataset.nodes)
               .enter()
               .append("circle")
               .attr("r", 20)
               .style("fill", "#ccc");
              //  .call(force.drag);     //Enable drag and drop interaction.//
