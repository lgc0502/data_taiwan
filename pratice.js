var margin = {
        top: 50,
        left: 50,
        right: 50,
        bottom: 50
    },
    height = 400 - margin.top - margin.bottom,
    width = 800 - margin.left - margin.right;
var density = {
    '連江縣':787.19,
    '金門縣':1589.58,
    '宜蘭縣':690.10,
    '彰化縣':638.78,
    '南投縣':798.05,
    '雲林縣':788.73,
    '屏東縣':735.09,
    '澎湖縣':732.36,
    '基隆市':518.25,
    '新竹市':521.88,
    '臺北市':227.36,
    '新北市':772.51,
    '臺中市':467.76,
    '臺南市':538.25,
    '桃園市':561.65,
    '苗栗縣':1005.74,
    '新竹縣':1131.16,
    '嘉義市':309.84,
    '嘉義縣':644.15,
    '高雄市':452.52,
    '臺東縣':738.47,
    '花蓮縣':403.55
};

var svg = d3.select('#map')
    .append('svg')
    .attr('height', 600)
    .attr('width', 500)
    .attr('transform', 'translate(0,0)')
    
 var color = d3.scale.linear().domain([200,1600]).range(["#090","#f00"]);
//var fisheye = d3.fisheye.circular().radius(100).distortion(2);  
/*var zoom = d3.behavior.zoom()
    .scaleExtent([1, 10])
    .on("zoom", zoomed);

function zoomed() {
    map.attr("transform",
        "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}*/

var features = topojson.feature(topodata, topodata.objects.COUNTY_MOI_1060525).features;

var projection = d3.geo.mercator().center([121, 24]).scale(8000);
var path = d3.geoPath().projection(projection);
console.log(features);

for(var i=features.length - 1; i >= 0; i-- ) {
    features[i].properties.density = density[features[i].properties.COUNTYNAME];
  }
console.log(features[0].properties.density);
var map = svg.append('g')
    .attr('transform', 'translate(-180,0)')
    //.call(zoom)
    .selectAll('.county')
    .data(features)
    .enter()
    .append("path")
    .attr('class', 'county')
    .attr('d', path)
    .attr('fill', function (d, i) {
        return color(d.properties.density);
    })
    //.style('opacity', '0.5')
    .on("mouseover", function (d) {
        //d3.select(this).style('opacity', '1.0');
        $("#countyname").text(d.properties.COUNTYNAME+" 每一位醫師需要服務"+d.properties.density+"人");
    })/*
    .on("mouseout", function (d) {
        d3.select(this).style('opacity', '0.5');
    })*/
    //