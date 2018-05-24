function firstDesign() {
  const result = document.querySelector('.result__output')
  result.classList.toggle('design-1')
}
document.querySelector('.filters__item--1').addEventListener('click', function(e){
  e.preventDefault()
  firstDesign()
})
