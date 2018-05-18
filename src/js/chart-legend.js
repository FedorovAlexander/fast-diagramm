function nameInput() {
  const inputName = document.querySelectorAll(".input-block__name");
  const nameText = document.querySelectorAll(".legend__item-name");
  var nameVal = [];
  inputName.forEach(function(item) {
    nameVal.push(item.value);
  });

  nameText.forEach(function(name, i) {
    name.innerHTML = nameVal[i]
  })
}
