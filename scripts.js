var DURATION = 2000;

var interval;

function cleanup()
{
    // Cancel any interval started by a previous slide
    clearInterval(interval);
}

function setupVisualizations(slideshow)
{
    slideshow.on('afterShowSlide', function (slide)
    {
        cleanup();

        if (slide.properties.viz && document.getElementById(slide.properties.viz))
        {
            d3.select('#' + slide.properties.viz).call(startViz);
        }
    });

    // start visualizations with a click in the container
    d3.selectAll(".viz-container").on("click", function()
    {
        cleanup();

        viz(this);
    });
}

function viz(element)
{
    startViz(d3.select(element));
}

function startViz(selection)
{
    var id = selection.attr("id");
    console.log('starting viz %s', id);
    window[id](selection);
}

function width(selection)
{
    if (!selection){ throw 'selection argument is required'; }

    var svg = selection.select('svg'),
        $svg = jQuery(svg[0]);

    return $svg.width();
}

function startInterval(cb, duration)
{
    interval = setInterval(cb, duration || DURATION);

    cb();
}




////////////////////////////////////////////////////////////////////////



function vizSelections1(selection)
{
    selection.select('rect')
        .transition().duration(DURATION)
        .style("fill", "green");
}

function vizSelections2(selection)
{
    selection.selectAll('rect')
        .transition().duration(DURATION)
        .style("fill", "green");
}

function vizSelections3(selection)
{
    selection.selectAll('rect')
        .transition().duration(DURATION)
        .attr("height", "150")
        .transition().duration(DURATION)
        .attr("width", "100")
        .transition().duration(DURATION)
        .style("fill", "gray")
        .transition().duration(DURATION)
        .style("stroke", "indigo").style("stroke-width", 15);
}

function vizSelections4(selection)
{
    selection.selectAll('rect')
        .transition().duration(DURATION)
        .attr("height", "150")
        .transition().duration(DURATION)
        .attr("width", 100)
        .transition().duration(DURATION)
        .style("fill", function (d, i) {
            return ["gray", "orange"][i];
        })
}

function vizSelectionsPractice(selection)
{
    startInterval(function ()
    {
        selection.selectAll('circle')
            .transition().duration(DURATION)
            .attr("r", function () {
                return Math.random() * 200;
            })
            .attr("class", function (d, i) {
                return ['php', 'js', 'ruby'][i] + ' transparent';
            });
    });
}

function vizDataJoin1(selection)
{
    var data = [200, 100, 15];

    var circles = selection.select('g').selectAll('circle').data(data);

    var circleEnter = circles.enter().append("circle").attr("r", 0);

    circles.transition().duration(DURATION)
        .attr("r", function (d, i)
        {
            return d;
        })
        .attr("class", function (d, i)
        {
            return ['js', 'php', 'ruby'][i];
        });

}

vizDataJoin2 = vizDataJoin1;



function vizEUE1(selection)
{
    var data = [
        {lang: 'js',   popularity: 200},
        {lang: 'php',  popularity: 100},
        {lang: 'ruby', popularity: 15},
    ];

    var circles = selection.select('g').selectAll('circle').data(data);

    var circleEnter = circles.enter().append("circle").attr("r", 0);

    circles.transition().duration(DURATION)
        .attr("r", function (d, i)
        {
            return d.popularity;
        })
        .attr("class", function (d, i)
        {
            return d.lang;
        });
}



// -----------------------------------------------------------------------------


var eue2Data = [
    {lang: 'js',   popularity: 200},
    {lang: 'php',  popularity: 100},
];

eue2Data.times = 2;

function vizEUE2(selection)
{
    switch (eue2Data.times++ % 3)
    {
        case 0:
            eue2Data.push({lang: 'ruby', popularity: 60});
            break;

        case 1:
            eue2Data[1].popularity = 70 + _.random(0, 130);
            break;

        case 2:
            eue2Data.length =  2;
            break;
    }

    console.log(JSON.stringify(eue2Data));

    var circles = selection.select('g').selectAll('circle').data(eue2Data);

    circles.enter()
        .append("circle")
        .style("opacity", 0)
        .attr("r", 0);

    circles
        .transition().duration(DURATION)
        .style("opacity", 1)
        .attr("r", function (d, i)
        {
            return d.popularity;
        })
        .attr("class", function (d, i)
        {
            return d.lang;
        });

    circles.exit()
        .transition().duration(DURATION)
        .style("opacity", 0)
        .remove();
}


// -----------------------------------------------------------------------------


function vizQuantitativeScales(selection)
{
    var svg = selection.select('svg'),

        types = ['linear', 'pow', 'sqrt', 'log'],

        domain = [0, 100],

        range = [0, width(selection)];

    _(types).each(function (t, i)
    {
        console.log("creating %s scale", t);

        var axis

            g = svg.append("g"),

            scale = d3.scale[t]().range(range);

        switch(t)
        {
            case 'pow':
                scale.domain(domain).exponent(2);
                break;

            case 'log':
                scale.domain([1, 10]);
                break;

            default:
                scale.domain(domain);
        }

        axis = d3.svg.axis().scale(scale).tickSize(10, 2).tickPadding(5);

        g.attr("transform", "translate(0, " + (i * 100 + 40) + ")").call(axis);

        g.append('circle')
            .attr("r", 7)
            .attr("class", "no-stroke php")
            .attr("cx", scale(10));

        g.append('text').attr("x", 2).attr("y", -10).text(t);


    }).value();
}

function vizQuantitativeScales2(selection)
{
    function scale()
    {
        return d3.scale.linear()
            .domain([0.012, 0.90000000001])
            .range(range)
    }

    var range = [0, width(selection) * 0.7],

        svg = selection.select('svg'),

        scales = {
            '': scale(),
            nice:  scale(),
            roundRange: scale(),
            clamp: scale(),
        },

        i = 0,

        container = svg.append("g").attr("transform", "translate(50, 0)");

    scales.nice.nice();
    scales.roundRange.nice().rangeRound(range);
    scales.clamp.nice().rangeRound(range).clamp(true);

    _.each(scales, function (scale, k)
    {
        var g = container.append("g"),

            axis = d3.svg.axis().scale(scale).tickSize(10, 2).tickPadding(5).ticks(6);

        g.selectAll('circle').data([0.478, 1.1]).enter().append('circle')
            .attr("r", 7)
            .attr("class", "no-stroke php")
            .attr("cx", scale);

        g.append('text').attr("x", 0).attr("y", -10).text(k);

        g.attr("transform", "translate(0, " + (i++ * 100 + 40) + ")").call(axis);
    });
}


// -----------------------------------------------------------------------------


function vizAxisDemo(selection)
{
    var now = Date.now(),

        svg = selection.select('svg'),

        offset = 30 * 1e3,

        tScale = d3.time.scale()
            .range([0, width(selection)])
            .nice(),

        tAxis = d3.svg.axis().ticks(5).scale(tScale);

    startInterval(function refresh()
    {
        offset *= 1.02;

        if (offset > 1e3 * 60 * 60 * 24 * 365 * 20)
        {
            cleanup();
        }

        tScale.domain([now - offset, now]);

        svg.transition().call(tAxis);
    }, 100);
}


// -----------------------------------------------------------------------------


function vizTrans1(selection)
{
    var r = 80,
        w = Math.round(width(selection) - r);

    selection.select('circle').transition()
        .ease('linear')
        .duration(8e3)
        .attr("r", r)
        .attr("cx", w)
        .attr("fill", 'yellow');
}


// -----------------------------------------------------------------------------


function vizTrans2(selection)
{
    var path = selection.select('path');

    var line = d3.svg.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; })
        .interpolate("linear");

    function data()
    {
        var samplesize = 50;
        return _.range(0, width(selection) / samplesize)
            .map(function(d){ return d * samplesize; })
            .map(function(d){ return {x: d, y: _.random(200)} });
    }

    function draw(path)
    {
        path.attr("d", line(data()));
    }

    function transition()
    {
        var t = path.transition().ease('linear').duration(DURATION * 3)

        draw(t);
    }

    draw(path);
    startInterval(transition, DURATION * 3);
}


// -----------------------------------------------------------------------------
