var margin = {
        top: 50,
        left: 50,
        right: 50,
        bottom: 50
    },
    height = 400 - margin.top - margin.bottom,
    width = 800 - margin.left - margin.right;



var datapath = "./data.csv"
d3.csv(datapath,function(dataset){
    var svg = d3.select('#map')
    .append('svg')
    .attr('height', 400)
    .attr('width', 700)
    .attr('transform', 'translate(0,0)')
    
   /* var option = d3.select('.option')
    .append('svg')
    .attr('height',30)
    .attr('width',100)*/

   /* var choose = option.append('g')
    .selectAll('circle')
    .data(2)
    .enter()
    .append('circle')
    .attr('r',5)*/
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

    var projection = d3.geo.mercator().center([121, 24]).scale(6000);
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
                features[i].properties.rank2 = dataset[j].rank2;
                features[i].properties.bed = dataset[j].bed;
                features[i].properties.average = dataset[j].average;

            }
        }
    }
    //console.log(features);
    var map = svg.append('g')
        .attr('transform', 'translate(120,-80)')
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
        .on("click", function (d) {

            d3.select(this).style('stroke-width', '2');
            d3.select(this).style('stroke', '#FB7F7F');
            $("#countyname").text(d.properties.COUNTYNAME);
            $("#population").text("人口數量 : "+d.properties.population+"人");
            $("#doctor")    .text("醫師數量 : "+d.properties.doctor+"人");
            $("#servenum")     .text(d.properties.density+"人");
            $("#ranknum").text(d.properties.rank+"/22");
        })
        .on("mouseover", function (d) {
            d3.select(this).style('stroke-width', '2');
            d3.select(this).style('stroke', '#FB7F7F');
        })
        .on("mouseout", function (d) {
            d3.select(this).style('stroke-width', '0');
            d3.select(this).style('stroke', '#C6C6C6');
            
        })
            //
    d3.select('button:nth-child(2)').on('click', function () {
        color = d3.scale.linear().domain([200,1600]).range(["#FFFFFF","#003377"]);
        $("#countyname")    .text("臺北市");
        $("#population")    .text("人口數量 : 2695704人");
        $("#doctor")    .text("醫師數量 : 9719人");
        $("#serve")    .text("每位醫生服務人數");
        $("#servenum")    .text("277.36人");
        $("#ranknum").text("1/22");
        d3.selectAll('.county')
        .data(features)
        .attr('fill', function (d) {
                return color(d.properties.density);
        })
        .on("click", function (d) {
            d3.select(this).style('stroke-width', '2');
            d3.select(this).style('stroke', '#FB7F7F');
            $("#countyname").text(d.properties.COUNTYNAME);
            $("#population").text("人口數量 : "+d.properties.population+"人");
            $("#doctor")    .text("醫師數量 : "+d.properties.doctor+"人");
            $("#servenum")     .text(d.properties.density+"人");
            $("#ranknum").text(d.properties.rank+"/22");
        })
    });
    d3.select('button:nth-child(1)').on('click', function () {
        color = d3.scale.linear().domain([50,400]).range(["#FFFFFF","#003377"]);
        $("#countyname")    .text("臺北市");
        $("#population")    .text("人口數量 : 2695704人");
        $("#doctor")    .text("病床數量 : 19951床");
        $("#serve")    .text("一張病床提供幾人使用");
        $("#servenum")    .text("135.11人");
        $("#ranknum").text("4/22");
        d3.selectAll('.county')
        .data(features)
        .attr('fill', function (d) {
                return color(d.properties.average);
            })
        .on("click", function (d) {
            d3.select(this).style('stroke-width', '2');
            d3.select(this).style('stroke', '#FB7F7F');
            $("#countyname").text(d.properties.COUNTYNAME);
            $("#population").text("人口數量 : "+d.properties.population+"人");
            $("#doctor")    .text("病床數量 : "+d.properties.bed+"床");
            $("#servenum")     .text(d.properties.average+"人");
            $("#ranknum").text(d.properties.rank2+"/22");
        })
    });
});

/*d3.csv("./data2.csv", function(data) {
    var svg = d3.select('.bubble')
    .append('svg')
    .attr('height', 600)
    .attr('width',500)
    .attr('transform', 'translate(0,0)')

    var dataobj = { children: data };
    var pack = d3.layout.pack();
    pack = pack.padding(2).size([500,600]).sort(function(a,b) { b.value - a.value; });
    var nodes = pack.nodes(dataobj);
    nodes = nodes.filter(function(it) { return it.parent; });
    console.log(nodes);
    var color = d3.scale.category20b();

    var bubble_chart = svg.append('g')
        .selectAll("circle")                 // 建立 circle 的 Selection
        .data(nodes)                         // 綁定 selection 與資料
        .enter()                             // 對於任何沒被對應而落單的資料 ...
        .append("circle")                    // 新增一個 circle 標籤
        .attr('cx', function(it) { return it.x; }) // 用 x,y 當圓心
        .attr('cy', function(it) { return it.y; })
        .attr('r' , function(it) { return it.r; }) // 用 r 當半徑
        .attr('fill', function(it) { return color(it.county); })
        //.attr('stroke', '#444') ;                  // 邊框畫深灰色
    
    d3.select(".bubble svg").selectAll("text").data(nodes).enter()
      .append("text")
      .attr('x', function(it) { return it.x; })
      .attr('y', function(it) { return it.y; })
      .attr( "text-anchor", "middle")                   // 文字水平置中
      .text(function(it)  { return (it.value>400?it.county:""); }); // 設定文字為國名
    
    });
    
    function map_bubble(){

    }*/