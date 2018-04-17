var width = 560,
    height = 500
var barBtn = document.querySelector(".js-toggle-btn-bar");
var pieBtn = document.querySelector(".js-toggle-btn-pie");
var chart = document.querySelector(".chart")
var input = document.querySelectorAll(".input-block__item");
var inputBlock = document.querySelector(".input-block");
var addInput = document.querySelector(".add-input");
var color = d3.scaleOrdinal(d3.schemeAccent)
var margin = 30;
var data = [1,2,3,4,5];

function pushData() {
    var inputVal = document.querySelectorAll('.input-block__item');
    for (i=0; i<inputVal.length; i++) {
      data.push(inputVal[i].value)
    }
  }

piechart()

pieBtn.addEventListener('click', function() {
    if(this.classList.contains("active")) {
      return false;
    } else {
       chart.innerHTML = " ";
       this.classList.toggle("active")
       barBtn.classList.remove("active")
       piechart()
    }
})

function piechart() {

  var radius = Math.min(width, height) / 2;

  var arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

  var pie = d3.pie()
      .sort(null)
      .value(function(d,i) { return d; });

  var svg = d3.select(".chart").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // join
  var block = svg.selectAll(".arc")
      .data(pie(data));

  // enter
  block.enter()
      .append("g")
      .attr("class", "arc")
      .append("path")
      .attr("d", arc)
      .style("fill", function(d,i) { return color(i); });

  // initial data update
  updatePie(data);

  function arc2Tween(d) {
      var interp = d3.interpolate(this._current, d);
      this._current = d;
      return function(t) {
        var tmp = interp(t);
        return arc(tmp);
      }
    };

  d3.selectAll(".input-block__item")
    .on("input", function () {
      data = []
      pushData();
      updatePie(data);
  });

  function updatePie(data) {
    // join
    block = svg
        .selectAll(".arc")
        .data(pie(data));
    // update
    block.select("path")
        .transition()
        .duration(1000)
        .ease(d3.easeBack)
        .attrTween("d", arc2Tween);
  }
}

$(document.body).ready(function() {
  $('#saveButton').click(function(){

        html2canvas($('#container'),
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
