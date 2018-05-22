function nameInput() {
  const inputName = document.querySelectorAll(".input-block__name");
  const nameText = document.querySelectorAll(".legend__item-name");
  const legendItem = document.querySelectorAll(".legend__item");
  var nameVal = [];
  inputName.forEach(function(item) {
    nameVal.push(item.value);
  });

  inputName.forEach(function(item, i) {
    if (item.value !== "") {
      legendItem[i].style.display = 'block'
      nameText[i].innerHTML = nameVal[i]
    } else {
      legendItem[i].style.display = 'none'
    }
  })
}

// color definition
function chartLegend() {
  var legendSvg = d3.selectAll(".legend__item-color")
    .append("svg")
    .attr("width", 15)
    .attr("height", 15)
    .data(dataName)
    .attr('class', 'legend');

  legendSvg.append('rect')
    .attr('width', 15)
    .attr('height', 15)
    .style("fill", function(d, i) {
      return color(i);
    });
}
