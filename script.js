var dataset = {
  nodes: [
    {text: "andrew smith-mui", r: 100, color: "#000066"},
    {text: "connect", r: 80, color: "#00FF99"},
    {text: "twitter", r: 70, color: "#22A4FE", link: "https://twitter.com/SpinMaui"},
    {text: "email", r: 70, color: "#22A4FE", link: "mailto:asmithmui@gmail.com"},
    {text: "projects", r: 80, color: "#00FF99"},
    {text: "license plates", r: 70, color: "#22A4FE", link: "https://license-plates-database.herokuapp.com"},
    {text: "electric cars", r: 70, color: "#22A4FE", link: "https://electric-vehicles-map-light.herokuapp.com"},
    {text: "D3 bars", r: 70, color: "#22A4FE", link: "https://d3-bars.herokuapp.com/"},
    {text: "gitHub", r: 40, color: "rgb(215, 47, 83)", link: "https://github.com/arsm800/electric_vehicles_map"},
    {text: "gitHub", r: 40, color: "rgb(215, 47, 83)", link: "https://github.com/arsm800/license_plates"},
    {text: "gitHub", r: 40, color: "rgb(215, 47, 83)", link:"https://github.com/arsm800/d3_bars"},
    {text: "profile", r: 70, color: "#22A4FE", link: "https://profiles.generalassemb.ly/andrew-smith-mui"}
  ],
  edges: [
    {source: 0, target: 1},
    {source: 0, target: 4},
    {source: 1, target: 2},
    {source: 1, target: 3},
    {source: 4, target: 5},
    {source: 4, target: 6},
    {source: 4, target: 7},
    {source: 6, target: 8},
    {source: 5, target: 9},
    {source: 7, target: 10},
    {source: 1, target: 11}
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
                     .linkDistance([-100])
                     .charge([-10000])
                     .start();

//Create a line for each edge in dataset.//
var edges = svg.selectAll("line")
               .data(dataset.edges)
               .enter()
               .append("line")
               .style("stroke", "black")
               .style("stroke-width", 5);

//Create a circle for each node.//
var nodes = svg.selectAll("circle")
               .data(dataset.nodes)
               .enter()
               .append("g");    //In order to append other elements to shapes in and svg throughd d3, you must create and append a "g" element on top of the svg.  You can append it to each instance of circle as seen here.  Once you do this, you can append the text.  You are appending both the circle and the text to the g element.  See the DOM in the browser to confirm.//

nodes[0].fixed = true;
nodes[0].x = w / 2;
nodes[0].y = h / 2;

nodes.append("circle")
     .attr("r", function(d) {
                 return d.r;              //Appends individual radii specified in dataset to nodes.//
               })
     .style("fill", function(d) {
                 return d.color;
               })
     .call(force.drag)     //Enable drag and drop interaction.//
     .on("mouseover", function(d, i) {
       d3.select(this)
        .style("cursor", "pointer");
       if (d.link) {
        d3.select(this)
        .style("fill-opacity", 0.75);
       }
     })
     .on("mouseout", function(d, i) {
       if (d.link) {
         d3.select(this)
         .style("fill-opacity", 1);
       }

     })
     .on("click", function(d, i) {
       if (d.link) {
         window.open(d.link, "_blank");
         //location.href sets the url of the current window.  Use window.open() to open a new window or tab//
       }
     });
nodes.append("text")
     .text(function(d) {
            return d.text;
          })
     .style("fill", "white")
     .style("text-anchor", "middle")
     .style("font-weight", "bold")
     .on("mouseover", function(d,i) {
       if (d.link) {
         d3.select(this)
         .style("cursor", "pointer");
       }
     })
     .on("click", function(d, i) {
       if (d.link) {
         window.open(d.link, "_blank");
       }
     });


//Specifies what happens when force layout ticks.  It also seems to be where you set locations of shapes in svg.//
force.on("tick", function() {

  edges.attr("x1", function(d) { return d.source.x; })
       .attr("y1", function(d) { return d.source.y; })
       .attr("x2", function(d) { return d.target.x; })
       .attr("y2", function(d) { return d.target.y; });

  nodes.select("circle").attr("cx", function(d) { return d.x; })
       .attr("cy", function(d) { return d.y; });

  nodes.select("text").attr("x", function(d) { return d.x; })
       .attr("y", function(d) { return d.y; });
});
