var margin = {
        top: 50,
        left: 50,
        right: 50,
        bottom: 50
    },
    height = 400 - margin.top - margin.bottom,
    width = 800 - margin.left - margin.right;


var svg = d3.select('#map')
    .append('svg')
    .attr('height', 600)
    .attr('width', 500)
    .attr('transform', 'translate(0,0)')
    
var color = d3.scale.category20();
//var fisheye = d3.fisheye.circular().radius(100).distortion(2);  
var zoom = d3.behavior.zoom()
    .scaleExtent([1, 10])
    .on("zoom", zoomed);

function zoomed() {
    map.attr("transform",
        "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

var features = topojson.feature(topodata, topodata.objects.TOWN_MOI_1060525).features;

var projection = d3.geo.mercator().center([121, 24]).scale(8000);
var path = d3.geoPath().projection(projection);
console.log(features);
var map = svg.append('g')
    .attr('transform', 'translate(-180,0)')
    .call(zoom)
    .selectAll('.county')
    .data(features)
    .enter()
    .append("path")
    .attr('class', 'county')
    .attr('d', path)
    .attr('fill', function (d, i) {
        return color(d.properties.TOWNID.slice(0, 1));
    })
    .style('opacity', '0.5')
    .on("mouseover", function (d) {
        d3.select(this).style('opacity', '1.0');
        $("#countyname").text(d.properties.COUNTYNAME+" "+d.properties.TOWNNAME);
    })
    .on("mouseout", function (d) {
        d3.select(this).style('opacity', '0.5');
    })
    //