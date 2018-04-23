
$(document.body).ready(function() {
  $('#saveButton').click(function(){

        html2canvas($('#result__output'),
        {
          onrendered: function (canvas) {
            var a = $("<a>").attr("href", canvas.toDataURL('image/png'))
            .attr("download", "output.png")
            .appendTo("body");
            a[0].click();
            a.remove();
          }
        });
  });
});
