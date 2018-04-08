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

addInput.addEventListener("click", function() {
  var newInput = document.createElement('input')
  newInput.className = "input-block__item"
  newInput.value = "1"
  inputBlock.appendChild(newInput)
  data.push(newInput.value)

})

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

barBtn.addEventListener('click', function() {
   if(this.classList.contains("active")) {
      return false;
    } else {
    chart.innerHTML = " ";
		this.classList.toggle("active")
    pieBtn.classList.remove("active")
    barchart()
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

function barchart() {
        var maxVal = Math.max.apply(Math, data);
  			var xScale = d3.scaleBand()
							.domain(d3.range(data.length))
							.rangeRound([0, width])
							.paddingInner(0.05);

			var yScale = d3.scaleLinear()
							.domain([0, maxVal])
							.range([0, height]);

			//Create SVG element
			var svg = d3.select(".chart")
						.append("svg")
						.attr("width", width)
						.attr("height", height);

			//Create bars
			svg.selectAll("rect")
			   .data(data)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return xScale(i);
			   })
			   .attr("y", function(d) {
			   		return height - yScale(d);
			   })
			   .attr("width", xScale.bandwidth())
			   .attr("height", function(d) {
			   		return yScale(d);
			   })
			   .style("fill", function(d,i) { return color(i); });

			//Create labels
			svg.selectAll("text")
			   .data(data)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d;
			   })
			   .attr("text-anchor", "middle")
			   .attr("x", function(d, i) {
			   		return xScale(i) + xScale.bandwidth() / 2;
			   })
			   .attr("y", function(d) {
			   		return height - yScale(d) + 14;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "white");
      //axis

        d3.selectAll(".input-block__item")
        .on("input", function () {
          data = []
          pushData();
          updateBar(data);
  });

  function updateBar() {
    data = []
    pushData();
    var maxVal = Math.max.apply(Math, data);

    var yScale = d3.scaleLinear()
    .domain([0, maxVal])
    .range([0, height]);
    var xScale = d3.scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([0, width])
    .paddingInner(0.05);
    //Update all rects
    svg.selectAll("rect")
      .data(data)
      .transition()
      .ease(d3.easeBounce)
      .duration(1000)
      .attr("y", function(d) {
      return height - yScale(d);
    })
      .attr("height", function(d) {
      return yScale(d);
    })
      .style("fill", function(d,i) { return color(i); });

    //Update all labels
    svg.selectAll("text")
      .data(data)
      .text(function(d) {
      return d;
    })
      .attr("x", function(d, i) {
      return xScale(i) + xScale.bandwidth() / 2;
    })
      .attr("y", function(d) {
      return height - yScale(d) + 14;
    });
  }
}



// EXPORT


// d3.select('#saveButton').on('click', function () {
//              html2canvas(document.getElementById("chart"), {

//         onrendered: function (canvas) {
//             chart.appendChild(canvas);
//         },
//          timeout: 500
//     });
//             });
console.log()

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
