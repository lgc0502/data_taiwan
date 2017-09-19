var margin={top:50 , left:50, right:50, bottom:50},
    height = 400 - margin.top-margin.bottom,
    width = 800 - margin.left - margin.right; 


var svg = d3.select('#map')
    .append('svg')
    .attr('height',400)
    .attr('width',500)
    

d3.queue().defer(d3.json,'./taiwan.json')
.await(ready);

var projection = d3.geo.mercator().center([121,24]).scale(6000);
var path = d3.geoPath().projection(projection);


function ready(error,data){
    var features = topojson.feature(data, data.objects.TOWN_MOI_1060525).features;
    svg.append('g')
    .attr('transform','translate(-160,-90)')
    .selectAll('.county')
    .data(features)
    .enter()
    .append("path")
    .attr('class','county')
    .attr('d',path)
    .attr('fill','#55AA00');
}


/*var width = 800,
height = 600;

var svg = d3.select("#map").append("svg")
.attr("width", width)
.attr("height", height);

var projection = d3.geo.mercator().center([121,24]).scale(6000);
var path = d3.geo.path().projection(projection);

d3.json("./taiwan.json", function(error, topology) {
var g = svg.append("g");

d3.select("g").append("path").datum(
        topojson.mesh(topology,
                topology.objects["TOWN_MOI_1060525"], function(a,
                        b) {
                    return a !== b;
                })).attr("d", path).attr("class","subunit-boundary");

d3.select("g").selectAll("path")
      .data(topojson.feature(topology, topology.objects.TOWN_MOI_1060525).features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr({
            d : path,
            fill : '#55AA00'
    });
    
});*/