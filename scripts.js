function setupVisualizations(slideshow)
{
    slideshow.on('afterShowSlide', function (slide)
    {
        if (slide.properties.viz)
        {
            var container = d3.select('#' + slide.properties.viz);

            console.log('initializing viz selections in container %s', container.attr('id'));
            window[slide.properties.viz](container);
        }
    });
}

function vizSelections(container)
{
    container.select('rect').style("fill", "green");
}

function vizSelections2(container)
{
    container.selectAll('rect').style("fill", "green");
}
