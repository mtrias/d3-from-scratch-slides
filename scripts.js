var DURATION = 3000;

function setupVisualizations(slideshow)
{
    slideshow.on('afterShowSlide', function (slide)
    {
        if (slide.properties.viz)
        {
            startViz(d3.select('#' + slide.properties.viz));
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
