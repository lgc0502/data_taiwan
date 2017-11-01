var data = [{
        name: '椪柑',
        weight: [107086.2145, 108058, 137136, 133253, 135796, 142369, 102341, 98179],
        price: [
            [36.38, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [39.48, 27.5, 0, 0, 0, 0, 0, 0, 0, 44.34, 35.69, 31.49],
            [43.61, 45.56, 38.94, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [49.08, 35.98, 39.28, 55.5, 0, 0, 0, 0, 0, 0, 0, 0],
            [41.31, 30.13, 27.78, 28.67, 0, 0, 0, 0, 0, 0, 0, 0],
            [35.09, 21.13, 25.42, 38, 0, 0, 0, 0, 0, 0, 0, 0],
            [35.2, 34.82, 37.1, 38.67, 0, 0, 0, 0, 0, 0, 0, 0],
            [30.99, 37.89, 33.1, 45.67, 0, 0, 0, 0, 0, 0, 0, 0]
            /*[23.11,	21.15,	24.28,	25,	    0,	0,	0,	0,	0,	0,	0,	0],
            [45.58,	41.65,	38,	    43.33,	0,	0,	0,	0,	0,	0,	0,	0],
            [37.67,	42.04,	41.42,	47,	    0,	0,	0,	0,	0,	0,	0,	0],
            [43.41,	39.19,	40.52,	41.11,	0,	0,	0,	0,	0,	0,	0,	0],
            [36.01,	35.5,	32.91,	32.78,	0,	0,	0,	0,	0,	0,	0,	35],
            [34.07,	29.72,	31.54,	42.94,	0,	0,	0,	0,	0,	0,	0,	27.67],
            [29.09,	23.81,	23.57,	26.66,	0,	0,	0,	0,	0,	0,	0,	15.33],
            [27.12,	29.24,	27.26,	25.83,	0,	0,	0,	0,	0,	0,	0,	26],
            [35.8,  32.7,	33.32,	30.67,	0,	0,	0,	0,	0,	0,	0,	0],
            [32.05,	28.96,	26.32,	26.38,	0,	0,	0,	0,	0,	0,	0,	0],
            [29.67,	34.4,	26.3,	17.49,	0,	0,	0,	0,	0,	0,	0,	0],
            [28.17,	26.93,	25.18,	25.78,	25,	0,	0,	0,	0,	0,	0,	0]*/

        ]
    },
    {
        name: '番荔枝',
        weight: [25319.91777, 55426, 55938, 52612, 49864, 59739, 64243, 70370, 67749],
        price: [
            [93.83, 118.05, 151.67, 0, 0, 0, 125, 0, 0, 0, 0, 0],
            [58.76, 65.09, 74.75, 0, 0, 0, 130, 90, 60, 93, 84.36, 82.47],
            [26, 17, 18.72, 17.83, 0, 0, 0, 35, 37.5, 41.17, 38.33, 31.67],
            [33.5, 30.17, 33.56, 36.67, 0, 0, 0, 0, 28.83, 35.39, 41.72, 34.67],
            [17.6, 15.29, 21.08, 23.5, 0, 0, 0, 22, 28.05, 31.11, 32.22, 32],
            [21.83, 17.97, 19.17, 27.33, 0, 0, 0, 31, 30.44, 29.36, 28.28, 25.25],
            [27.42, 20.19, 20.5, 26.33, 0, 0, 0, 29, 20.33, 20.28, 22.08, 20.69],
            [27.92, 24.72, 17.75, 18.33, 0, 24, 24.33, 23.58, 18.17, 25, 24.42, 25.58]

        ]
    }
];
fruit=[{key:9,name:'漿果類'},
{key:10,name:'柑橘類'},
{key:11,name:'葡萄類'},
{key:12,name:'核果類'},
{key:13,name:'仁果類'},
{key:14,name:'瓜類'},
{key:15,name:'其他'}

];
vegetable=[{key:3,name:'根莖類'},
{key:4,name:'葉菜類'},
{key:5,name:'花菜類'},
{key:6,name:'瓜類'},
{key:7,name:'豆子與種子類'},
{key:8,name:'其他'}

];
/*console.log(data[1].price[0]);*/
/*宣告SVG ***********************************************************/
var itemsvg = d3.select('#item')
    .append('svg')
    .attr('height', 300)
    .attr('width', 400);
var weightbar = d3.select('.bar2')
    .append('svg')
    .attr('height', 400)
    .attr('width', 400);
var priceline = d3.select('.price')
    .append('svg')
    .attr('height', 400)
    .attr('width', 400)
/*宣告比例 *******************************************************/
//Bar
var minBar = d3.min(data[0].weight);
var maxBar = d3.max(data[0].weight);
var scaleBar = d3.scale.linear()
    .range([100, 280])
    .domain([minBar - 100, maxBar]); //x 的最大值與最小值

//Line
var minLine = d3.min(data[0].price[0]);
var maxLine = d3.max(data[0].price[0]);
var scaleY = d3.scale.linear()
    .range([100, 300])
    .domain([minLine, maxLine]); //x 的最大值與最小值
var scaleX = d3.scale.linear()
    .range([10, 390])
    .domain([0, data[0].price[0].length]); //x 的最大值與最小值

/*顏色比例 **********************************************************/
var color = d3.scale
    .linear()
    .domain([1, 7])
    .range(['#FF8888', '#009FCC']);
var Barcolor = d3.scale
    .linear()
    .domain([minBar, maxBar])
    .range(['#F6FFDF', '#FF2000']);

/* */
d3.select('#menu').on('change', function () {
    if (this.value == 1) {
    choose(fruit);
} else {
    choose(vegetable);
}
});
d3.select('#btn1').on('click', function () {
    choose2(1);
});
d3.select('#btn2').on('click', function () {
    choose2(2);
});

/*d3.select('#menu2').on('change', function () {
    if (this.value == 3) {
    choose(fruit);
} else {
    choose(vegetable);
}
});*/
function choose(area) {

    d3.select('#menu2').selectAll('option').remove();
    //d3.selectAll('svg').remove();

    d3.select('#menu2').selectAll('option')
        .data(area)
        .enter()
        .append('option')
        .attr('value', function (d) {
                return d.key;
            })
        .text(function (d) {
            return d.name ;
        });


    /*var dataMap = d3.map(area, function (d) {
        return d.key;
    });
    if (dataMap.has('關廟區')) {
        areaData = dataMap.get('關廟區');
        draw(areaData.values);
    } else if (dataMap.has('南花里')) {
        areaData = dataMap.get('南花里');
        draw(areaData.values);
    }

    d3.select('#submenu')
        .on('change', function () {
            var dataMap = d3.map(area, function (d) {
                return d.key;
            });
            if (dataMap.has(this.value)) {
                areaData = dataMap.get(this.value);
                draw(areaData.values);
            }
        });*/
}
function choose2(way){

    d3.select('#menu2').selectAll('option').remove();
    d3.select('#ways').selectAll('text')
        .text(function (d) {
            if(way==1){
                return '季節'
            }
            else{
                return '種類'
            }
        });
    
}
itemsvg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', 10)
    .attr('cx', 50)
    .attr('cy', function (d, i) {
        return 20 + i * 35;
    })
    .attr('fill', function (d, i) {
        return color(i * 2 + 3);
    })
    .style('opacity', '0.8')
    .on('mouseover', function (d) {
        d3.select(this).style('opacity', '1.0');
    })
    .on('mouseout', function (d) {
        d3.select(this).style('opacity', '0.8');
    })
    .on('click', function (d, i) {
        show_weight(i);

    });

itemsvg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('x', 65)
    .attr('y', function (d, i) {
        return 24 + i * 35;
    })
    .attr('fill', 'rgb(152, 197, 75)')
    .style('font-size', '13')
    .style('fill', 'black')
    .text(function (d) {
        return d.name;

    });

weightbar.selectAll('rect')
    .data(data[0].weight)
    .enter()
    .append('rect')
    .attr('y', function (d) {
        return 300 - scaleBar(d);
    })
    .attr('x', function (d, i) {
        return 400 - i * 40 - 40
    })
    .attr('width', 35)
    .attr('height', function (d) {
        return scaleBar(d);
    })
    .attr('fill', function (d) {
        return Barcolor(d);
    })
    .on('mouseover', function (d, i) {
        show_price(0, i);
    })

/*weightbar.selectAll('text')
    .data(data[0].weight)
    .enter()
    .append('text')
    .attr('y',function (d) {
        return 300-scaleBar(d)-10;
    })
    .attr('x', function (d, i) {
        return 400 - i * 40 -40
    })
    .attr('fill', 'black')
    .style('font-size', '13')
    .style('fill', 'black')
    .text(function (d,i) {
        return d;

    })*/
var axisX = d3.svg.axis()
    .scale(scaleX)
    .ticks(10);
var axisY = d3.svg.axis()
    .scale(scaleY)
    .ticks(10);

priceline.append('g')
    .call(d3.axisBottom(scaleX)) //call axisX
    .attr('transform', 'translate(35,' + (320) + ')');

/*priceline.append('g')
     .call(d3.axisLeft(scaleY))  //call axisY
     .attr('transform','translate(35,20)');*/

var line = d3.svg.line()
    .x(function (d, i) {
        return scaleX(i + 1);
    }).y(function (d) {
        return 400 - scaleY(d);
    });

priceline.append('path')
    .attr('d', line(data[0].price[0]))
    .attr('stroke', 'black')
    .attr('fill', 'none');
priceline.selectAll('circle')
    .data(data[0].price[0])
    .enter()
    .append('circle')
    .attr('r', 3)
    .attr('cx', function (d, i) {
        return scaleX(i + 1);
    })
    .attr('cy', function (d) {
        return 400 - scaleY(d);
    })
    .attr('fill', function (d, i) {
        if (d == 0) {
            return 'red';
        }
        return 'black'
    });


function show_weight(d) {
    var x = d;
    minBar = d3.min(data[d].weight);
    maxBar = d3.max(data[d].weight);
    scaleBar = d3.scale.linear()
        .range([100, 280])
        .domain([minBar - 100, maxBar]);
    Barcolor = d3.scale
        .linear()
        .domain([minBar, maxBar])
        .range(['#F6FFDF', '#FF2000']);
    weightbar.selectAll('rect')
        .data(data[d].weight)
        .transition()
        .duration(1500)
        .attr('y', function (d) {
            return 300 - scaleBar(d);
        })
        .attr('x', function (d, i) {
            return 400 - i * 40 - 40;
        })
        .attr('height', function (d) {
            return scaleBar(d);
        })
        .attr('fill', function (d) {
            return Barcolor(d);
        })

    weightbar.selectAll('text')
        .data(data[d].weight)
        .transition()
        .duration(1500)
        .attr('y', function (d) {
            return 300 - scaleBar(d) - 10;
        })
        .text(function (d, i) {
            return d;
        });
    weightbar.selectAll('rect')
        .on('mouseover', function (d, i) {
            show_price(x, i);
        })

    /*.tween('number',function(d,i){
          var x = d3.interpolateRound(newNumber[i], data[d].weight);
          newNumber[i] = d;
            return function(t) {
            this.textContent = x(t);
          };
      });*/
}

function show_price(what, year) {

    var minLine = d3.min(data[what].price[year]);
    var maxLine = d3.max(data[what].price[year]);
    var scaleY = d3.scale.linear()
        .range([100, 300])
        .domain([minLine, maxLine]); //x 的最大值與最小值
    var scaleX = d3.scale.linear()
        .range([10, 390])
        .domain([0, data[what].price[year].length]); //x 的最大值與最小值

    var line = d3.svg.line()
        .x(function (d, i) {
            return scaleX(i + 1);
        }).y(function (d) {
            return 400 - scaleY(d);
        });

    priceline.selectAll('path')
        .data(data[what].price[year])
        .transition()
        .duration(1500)
        .attr('d', line(data[what].price[year]))
        .attr('stroke', function (d, i) {
            if (d = 0) {
                return 'red';
            }
            return 'black'
        })
        .attr('fill', 'none');
    priceline.selectAll('circle')
        .data(data[what].price[year])
        .transition()
        .duration(1500)
        .attr('cx', function (d, i) {
            return scaleX(i + 1);
        })
        .attr('cy', function (d) {
            return 400 - scaleY(d);
        })
        .attr('fill', function (d, i) {
            if (d == 0) {
                return 'red';
            }
            return 'black'
        });
}