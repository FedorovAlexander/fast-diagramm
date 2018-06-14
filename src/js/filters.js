const filtersBtn = d3.selectAll(".filters__item");

//toggle css class
function firstDesign() {
  const result = document.querySelector('.result__output')
  result.classList.toggle('design-1')
}

//prevent default action
document.querySelector('.filters__item--1').addEventListener('click', function(e){
  e.preventDefault()
  firstDesign()
})

filtersBtn.on("click", function(_, i) {
  d3.selectAll(".arc path").style("fill", function(_, j) {
    return colorSet[i](j)
  })
});
