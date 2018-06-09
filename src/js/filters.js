const filtersBtn = document.querySelectorAll('.filters__item')

//remove active class from all links
function removeActive() {
  filtersBtn.forEach(function(item) {
    item.classList.remove('active')
  })
}

//add active class to the clicked item
filtersBtn.forEach(function(item,i) {
  item.addEventListener('click', function() {
    removeActive();
    this.classList.add('active')
  })
})

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
