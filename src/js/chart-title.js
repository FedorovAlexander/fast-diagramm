function titleInput() {
  var inputText = document.querySelector(".input-block__input-title").value;
  var titleText = document.querySelector(".result__output-title");
  titleText.innerHTML = inputText;
}
titleInput()
