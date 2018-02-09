var margin = {
        top: 50,
        left: 50,
        right: 50,
        bottom: 50
    },
    height = 400 - margin.top - margin.bottom,
    width = 800 - margin.left - margin.right;

var datapath = "./data1.csv"
d3.csv(datapath,function(dataset){
    var svg = d3.select('#map')
    .append('svg')
    .attr('height', 600)
    .attr('width', 500)
    .attr('transform', 'translate(0,0)')
    
    var color = d3.scale.linear().domain([200,1600]).range(["#FFFFFF","#003377"]);
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
    var temp = 0;

    for(var i=features.length - 1; i >= 0; i-- ) {
        for(var j=features.length - 1; j >= 0; j-- ){
            if(dataset[j].county == features[i].properties.COUNTYNAME){     
                temp++;
                features[i].properties.density = dataset[j].serve;
                features[i].properties.doctor = dataset[j].doctor;
                features[i].properties.population = dataset[j].population;
                features[i].properties.rank = dataset[j].rank;
            }
        }
    }
    /*for(var i=features.length - 1; i >= 0; i-- ) {
         console.log(features[i].properties.COUNTYNAME+" "+features[i].properties.doctor+" "+features[i].properties.population+" "+features[i].properties.density);
    }*/
    //console.log(dataset);


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
            d3.select(this).style('stroke-width', '2');
            d3.select(this).style('stroke', '#FB7F7F');
            $("#countyname").text(d.properties.COUNTYNAME);
            $("#population").text("人口數量 : "+d.properties.population+"人");
            $("#doctor")    .text("醫師數量 : "+d.properties.doctor+"人");
            $("#servenum")     .text(d.properties.density+"人");
            $("#ranknum").text(d.properties.rank+"/22");
        })
        .on("mouseout", function (d) {
            d3.select(this).style('stroke-width', '0');
            d3.select(this).style('stroke', '#C6C6C6');
            
        })
        //

});
