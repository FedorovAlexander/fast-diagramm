function pushData() {
    var inputVal = document.querySelectorAll('.input-block__item');
    for (i=0; i<inputVal.length; i++) {
      data.push(inputVal[i].value)
    }
  }
