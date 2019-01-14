function filters() {
  const filtersBtn = d3.selectAll(".filters__item");
  const filtersBtnAll = document.querySelectorAll(".filters__item");
  const colorBtn1 = d3.selectAll(".filters__item--2");
  const result = document.querySelector('.result__output');
  const resultTitle = document.querySelector('.result__output-title');
  const legendItem = document.querySelectorAll('.legend__item');

  var radius = Math.min(width, height) / 2;

  function firstDesign() {
    var itemColor = document.querySelectorAll('.legend__color')
    itemColor.forEach(function (item) {
      item.classList.add('border-radius-none')
      item.classList.remove('border-radius')
    })
    resultTitle.classList.add('design-title-1');
    resultTitle.classList.remove('design-title-2');
    result.style.backgroundColor = '#fff';

    legendItem.forEach(function (item) {
      item.style.borderBottom = '1px solid transparent';

    })
  }

  function secondDesign() {
    var itemColor = document.querySelectorAll('.legend__color')
    itemColor.forEach(function (item) {
      item.classList.remove('border-radius-none')
      item.classList.add('border-radius')
    })
    resultTitle.classList.remove('design-title-1');
    resultTitle.classList.add('design-title-2');
    result.style.backgroundColor = '#fff';

    legendItem.forEach(function (item) {
      item.style.borderBottom = '1px solid #f0f0f0'
    })
  }

  //prevent default action
  filtersBtnAll.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault()
    })
  })

  document.querySelector('.filters__item--1').addEventListener('click', function () {
    firstDesign()
  })

  document.querySelector('.filters__item--2').addEventListener('click', function () {
    secondDesign()
  })

  filtersBtn.on("click", function (_, i) {
    d3.selectAll(".arc path").style("fill", function (_, j) {
      return colorSet[i](j)
    })
    d3.selectAll(".legend__item-color rect").style("fill", function (_, j) {
      return colorSet[i](j)
    })
  });
}