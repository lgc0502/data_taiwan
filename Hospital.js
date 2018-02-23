var svg = d3.select('.bar')
.append('svg')
.attr('height', 600)
.attr('width', 900)


datapath="./hospital.csv"

d3.csv(datapath,function(dataset){
    var data=[];
    for(var i=0;i<22;i++){
        data[i]=+dataset[i].center;    
    }
    console.log(data)
    minBar = d3.min(dataset,function(d){ return +d.center});
    maxBar = d3.max(dataset,function(d){ return +d.center})
    scaleBar = d3.scale.linear()
        .range([5, 450])
        .domain([minBar, maxBar]); //x 的最大值與最小值

    svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('y',function(d){
        return 500-10;
    })
    .attr('x',function(d,i){
        return i*40;
    })
    .attr('width',30)
    .attr('height',0)
    .attr('fill','#F58787')
    .transition()
    .duration(2000)
    .attr('y',function(d){
        return 500-scaleBar(d.center);
    })
    .attr('height',function(d){
        return scaleBar(d.center);
    })

    svg.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .text(function(d){ return d.center;})
    .attr('x',function(d,i){
        return i*40+10;
    })
    .attr('y',function(d,i){
        return 500-10;
    })
    .transition()
    .duration(2000)
    .attr('y',function(d,i){
        return 500-scaleBar(d.center)-10;
    })
    .tween("text", function(d) {
        var that = d3.select(this),
            i = d3.interpolateRound(0, +d.center);
        return function(t) { that.text(i(t)); };
      })
    d3.select('.btn-outline-success').on('click',function(){
        minBar = d3.min(dataset,function(d){ return +d.local});
        maxBar = d3.max(dataset,function(d){ return +d.local})
        scaleBar = d3.scale.linear()
        .range([20, 450])
        .domain([minBar, maxBar]); 

        svg.selectAll('rect')
        .data(dataset)
        .transition()
        .duration(500)
        .attr('y',function(d,i){
            return 500;
        })
        .attr('x',function(d,i){
            return i*40;
        })
        .attr('width',30)
        .attr('height',5)
        .transition()
        .duration(1500)
        .attr('y',function(d,i){
            return 500-scaleBar(d.local);
        })
        .attr('height',function(d){
            return scaleBar(d.local);

        })
        .attr('fill','#81C853')

        svg.selectAll('text')
        .data(dataset)
        .text(function(d){ return d.local})
        .transition()
        .duration(500)
        .attr('y',500-10)
        .attr('x',function(d,i){
            return i*40+10;
        })
        .text('0')
        .transition()
        .duration(1500)
        .attr('y',function(d,i){
            return 500-scaleBar(d.local)-10;
        })
        .tween("text", function(d) {
            var that = d3.select(this),
                i = d3.interpolateRound(0, +d.local);
            return function(t) { that.text(i(t)); };
          })
    });

    d3.select('.btn-outline-warning').on('click',function(){
        minBar = d3.min(dataset,function(d){ return +d.region});
        maxBar = d3.max(dataset,function(d){ return +d.region})
        scaleBar = d3.scale.linear()
        .range([5, 450])
        .domain([minBar, maxBar]); 

        svg.selectAll('rect')
        .data(dataset)
        .transition()
        .duration(500)
        .attr('y',function(d,i){
            return 500;
        })
        .attr('x',function(d,i){
            return i*40;
        })
        .attr('width',30)
        .attr('height',5)
        .transition()
        .duration(1500)
        .attr('y',function(d,i){
            return 500-scaleBar(d.region);
        })
        .attr('height',function(d){
            return scaleBar(d.region);

        })
        .attr('fill','#EEC328')

        svg.selectAll('text')
        .data(dataset)
        .text(function(d){ return d.region})
        .transition()
        .duration(500)
        .attr('y',500-10)
        .attr('x',function(d,i){
            return i*40+10;
        })
        .text('0')
        .transition()
        .duration(1500)
        .attr('y',function(d,i){
            return 500-scaleBar(d.region)-10;
        })
        .tween("text", function(d) {
            var that = d3.select(this),
                i = d3.interpolateRound(0, +d.region);
            return function(t) { that.text(i(t)); };
          })
    });
})

