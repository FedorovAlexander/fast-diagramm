const filtersBtn = d3.selectAll(".filters__item");
const colorBtn1 = d3.selectAll(".filters__item--2");
const result = document.querySelector('.result__output');
const resultTitle = document.querySelector('.result__output-title');
const legendItem = document.querySelectorAll('.legend__item');
//toggle css class
function secondDesign() {
  resultTitle.classList.add('design-title-2');
  result.style.backgroundColor = '#fff';
  legendItem.forEach(function(item) {
    item.style.borderBottom = '1px solid #f0f0f0'
  })

}
//prevent default action
document.querySelector('.filters__item--2').addEventListener('click', function(e){
  e.preventDefault()
  secondDesign()
})

filtersBtn.on("click", function(_, i) {
  d3.selectAll(".arc path").style("fill", function(_, j) {
    return colorSet[i](j)
  })
  d3.selectAll(".legend__item-color rect").style("fill", function(_, j) {
    return colorSet[i](j)
  })
});
