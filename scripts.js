var DURATION = 2000;

function setupVisualizations(slideshow)
{
    slideshow.on('afterShowSlide', function (slide)
    {
        if (slide.properties.viz && document.getElementById(slide.properties.viz))
        {
            d3.select('#' + slide.properties.viz).call(startViz);
        }
    });

    // start visualizations with a click
    d3.selectAll(".viz-container").on("click", function(){
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
    selection.selectAll('circle')
        .transition().duration(DURATION)
        .attr("r", function () {
            return Math.random() * 200;
        })
        .attr("class", function (d, i) {
            return ['php', 'js', 'ruby'][i] + ' transparent';
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
        .transition().duration(DURATION)
        .remove();
}

// -----------------------------------------------------------------------------
