function setupVisualizations(slideshow)
{
    slideshow.on('afterShowSlide', function (slide)
    {
        if (slide.properties.viz)
        {
            var container = d3.select('#' + slide.properties.viz);
            window[slide.properties.viz](container);
        }
    });
}

function vizSelections(container)
{
    console.log('initializing viz d3MalUsado in container %s', container.attr('id'));
}
