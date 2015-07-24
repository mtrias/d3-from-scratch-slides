var DURATION = 2000;

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
