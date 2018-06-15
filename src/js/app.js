var width = 480
var height = 480
var radius = Math.min(width, height) / 2;
var barBtn = document.querySelector(".js-toggle-btn-bar");
var pieBtn = document.querySelector(".js-toggle-btn-pie");
var chart = document.querySelector(".result")
var input = document.querySelectorAll(".input-block__item");
var inputBlock = document.querySelector(".input-block");
var addInput = document.querySelector(".add-input");
const colorDefault = d3.scaleOrdinal(d3.schemeSet3);
const colorFoo = d3.scaleOrdinal(d3.schemeSet2);
const colorMoo = d3.scaleOrdinal(d3.schemeSet1);
const colorHaiku = d3.scaleOrdinal(['#466874', '#958840', '#71c34a', '#a8c1b1', '#5d604c', '#92a95e', '#4e814c', '#7f2967', '#a85245', '#00595f'])
const colorSet = [colorDefault, colorHaiku, colorFoo, colorMoo];
var margin = 30;
var data = [1,2,3,4,5];
var dataName = [];

pushData()
pushName()
piechart()

function piechart() {



  var arc = d3.arc()
      .outerRadius(radius - 30)
      .innerRadius(0);

  var pie = d3.pie()
      .sort(null)
      .value(function(d,i) { return d; });

  var svg = d3.select(".result__output-chart").append("svg")
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
      .style("fill", function(d,i) { return colorDefault(i); });

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
  chartLegend();
}
