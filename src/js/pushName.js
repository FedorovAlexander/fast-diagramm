function pushName() {
    var inputName = document.querySelectorAll('.input-block__name');
    for (i=0; i<inputName.length; i++) {
      dataName.push(inputName[i].value)
    }
  }
