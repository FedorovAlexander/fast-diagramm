function filters() {
  const filtersBtn = d3.selectAll(".filters__item");
  const filtersBtnAll = document.querySelectorAll(".filters__item");
  const result = document.querySelector('.result__output');
  const legend = document.querySelector('.legend');
  const resultTitle = document.querySelector('.result__output-title-wrap');
  const legendItem = document.querySelectorAll('.legend__item');
  const colorDefault = d3.scaleOrdinal(d3.schemeSet3);
  const colorFoo = d3.scaleOrdinal(d3.schemeSet2);
  const colorMoo = d3.scaleOrdinal(d3.schemePaired);
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
      item.classList.remove('border-radius-50')
      item.classList.remove('border-radius-20')
    })
    resultTitle.classList.add('design-title-1');
    resultTitle.classList.remove('design-title-2');
    resultTitle.classList.remove('design-title-3');
    resultTitle.classList.remove('design-title-4');
    result.style.backgroundColor = '#fff';

    legendItem.forEach(function (item) {
      item.style.borderBottom = '1px solid transparent';
    })
  }

  function secondDesign() {
    var itemColor = document.querySelectorAll('.legend__color')
    itemColor.forEach(function (item) {
      item.classList.remove('border-radius-none')
      item.classList.remove('border-radius-20')
      item.classList.add('border-radius-50')
    })
    resultTitle.classList.add('design-title-2');
    resultTitle.classList.remove('design-title-1');
    resultTitle.classList.remove('design-title-3');
    resultTitle.classList.remove('design-title-4');
    result.style.backgroundColor = '#fff';

    legendItem.forEach(function (item) {
      item.style.borderBottom = '1px solid #f0f0f0'
    })
  }

  function thirdDesign() {
    var itemColor = document.querySelectorAll('.legend__color')
    itemColor.forEach(function (item) {
      item.classList.add('border-radius-20')
      item.classList.remove('border-radius-50')
      item.classList.remove('border-radius-none')
    })
    result.style.backgroundColor = "#ffffff";
    resultTitle.classList.add('design-title-3');
    resultTitle.classList.remove('design-title-1');
    resultTitle.classList.remove('design-title-2');
    resultTitle.classList.remove('design-title-4');
    result.style.backgroundColor = '#fff';
  }

  function fourthDesign() {
    var itemColor = document.querySelectorAll('.legend__color')
    itemColor.forEach(function (item) {
      item.classList.add('border-radius-20')
      item.classList.remove('border-radius-50')
      item.classList.remove('border-radius-none')
    })
    resultTitle.classList.add('design-title-4');
    resultTitle.classList.remove('design-title-1');
    resultTitle.classList.remove('design-title-2');
    resultTitle.classList.remove('design-title-3');
    result.style.backgroundColor = "#f1f1f1";
  }

  //prevent default action
  filtersBtnAll.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault()
    })
  })

  document.querySelector('.filters__item--1').addEventListener('click', function () {
    newArc = d3.arc()
		.outerRadius(radius - 30)
		.innerRadius(0)
    .padAngle(0);
    
    d3.selectAll(".arc path").attr("d", newArc)

    var filterItems = document.querySelectorAll('.filters__item');
    filterItems.forEach(function(item) {
      item.classList.remove('filters__item--active')
    })
    this.classList.add('filters__item--active')
    firstDesign()
  })

  document.querySelector('.filters__item--2').addEventListener('click', function () {
    newArc = d3.arc()
		.outerRadius(radius - 30)
		.innerRadius((radius - 30) / 2)
    .padAngle(0.02);
    
    d3.selectAll(".arc path").attr("d", newArc)

    var filterItems = document.querySelectorAll('.filters__item');
    filterItems.forEach(function(item) {
      item.classList.remove('filters__item--active')
    })
    this.classList.add('filters__item--active')
    secondDesign()
  })

  document.querySelector('.filters__item--3').addEventListener('click', function () {
    newArc = d3.arc()
		.outerRadius(radius - 30)
		.innerRadius(10)
    .padAngle(0.08);
    
    d3.selectAll(".arc path").attr("d", newArc)

    var filterItems = document.querySelectorAll('.filters__item');
    filterItems.forEach(function(item) {
      item.classList.remove('filters__item--active')
    })
    this.classList.add('filters__item--active')
    thirdDesign();
  })

  document.querySelector('.filters__item--4').addEventListener('click', function () {
    newArc = d3.arc()
    .outerRadius(radius - 30)
    .innerRadius(170)
    .padAngle(0.01);
    
    d3.selectAll(".arc path").attr("d", newArc)
    var filterItems = document.querySelectorAll('.filters__item');
    filterItems.forEach(function(item) {
      item.classList.remove('filters__item--active')
    })
    this.classList.add('filters__item--active')
    fourthDesign();
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


