function checkDec(el){
  var ex = /^[0-9]+\.?[0-9]*$/;
  if (ex.test(el.value)==false) {
    el.value = el.value.substring(0,el.value.length - 1);
  }
}

var inputData = document.querySelectorAll(".input-block__item")

inputData.forEach(function(item) {
  item.addEventListener('keyup', function() {
    checkDec(item);
  })
})