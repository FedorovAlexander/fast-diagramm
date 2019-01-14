function filters() {
  const filtersBtn = d3.selectAll(".filters__item");
  const filtersBtnAll = document.querySelectorAll(".filters__item");
  const colorBtn1 = d3.selectAll(".filters__item--2");
  const result = document.querySelector('.result__output');
  const resultTitle = document.querySelector('.result__output-title');
  const legendItem = document.querySelectorAll('.legend__item');
  const colorDefault = d3.scaleOrdinal(d3.schemeSet3);
  const colorFoo = d3.scaleOrdinal(d3.schemeSet2);
  const colorMoo = d3.scaleOrdinal(d3.schemeSet1);
  const colorHaiku = d3.scaleOrdinal(['#466874', '#958840', '#71c34a', '#a8c1b1', '#5d604c', '#92a95e', '#4e814c', '#7f2967', '#a85245', '#00595f'])
  const colorSet = [colorDefault, colorHaiku, colorFoo, colorMoo];

  var radius = Math.min(width, height) / 2;

  function colorButtons() {
    var button1 = document.querySelector('.filters__item--1')
    var button2 = document.querySelector('.filters__item--2')
    var button3 = document.querySelector('.filters__item--3')
    var button4 = document.querySelector('.filters__item--4')
    var colorSpan1 = button1.querySelectorAll('.filters__item-color')
    var colorSpan2 = button2.querySelectorAll('.filters__item-color')
    var colorSpan3 = button3.querySelectorAll('.filters__item-color')
    var colorSpan4 = button4.querySelectorAll('.filters__item-color')
    colorSpan1.forEach(function(item, i) {
      item.style.backgroundColor = colorDefault(i)
    })
    colorSpan2.forEach(function(item, i) {
      item.style.backgroundColor = colorHaiku(i)
    })
    colorSpan3.forEach(function(item, i) {
      item.style.backgroundColor = colorFoo(i)
    })
    colorSpan4.forEach(function(item, i) {
      item.style.backgroundColor = colorMoo(i)
    })
  }

  colorButtons();

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