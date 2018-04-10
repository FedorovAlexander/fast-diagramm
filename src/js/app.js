const width = 560;
const height = 500;
const barBtn = document.querySelector('.js-toggle-btn-bar');
const pieBtn = document.querySelector('.js-toggle-btn-pie');
const chart = document.querySelector('.chart');
const input = document.querySelectorAll('.input-block__item');
const inputBlock = document.querySelector('.input-block');
const addInput = document.querySelector('.add-input');
const color = d3.scaleOrdinal(d3.schemeAccent);
const margin = 30;
let data = [1, 2, 3, 4, 5];

addInput.addEventListener('click', () => {
  const newInput = document.createElement('input');
  newInput.className = 'input-block__item';
  newInput.value = '1';
  inputBlock.appendChild(newInput);
  data.push(newInput.value);
});

function pushData() {
  const inputVal = document.querySelectorAll('.input-block__item');
  for (i = 0; i < inputVal.length; i++) {
    data.push(inputVal[i].value);
  }
}

piechart();

pieBtn.addEventListener('click', function () {
  if (this.classList.contains('active')) {
    return false;
  }
  chart.innerHTML = ' ';
  this.classList.toggle('active');
  barBtn.classList.remove('active');
  piechart();
});

barBtn.addEventListener('click', function () {
  if (this.classList.contains('active')) {
    return false;
  }
  chart.innerHTML = ' ';
  this.classList.toggle('active');
  pieBtn.classList.remove('active');
  barchart();
});

function piechart() {
  const radius = Math.min(width, height) / 2;

  const arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  const pie = d3.pie()
    .sort(null)
    .value((d, i) => d);

  const svg = d3.select('.chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);

  // join
  let block = svg.selectAll('.arc')
    .data(pie(data));

  // enter
  block.enter()
    .append('g')
    .attr('class', 'arc')
    .append('path')
    .attr('d', arc)
    .style('fill', (d, i) => color(i));

  // initial data update
  updatePie(data);

  function arc2Tween(d) {
    const interp = d3.interpolate(this._current, d);
    this._current = d;
    return function (t) {
      const tmp = interp(t);
      return arc(tmp);
    };
  }

  d3.selectAll('.input-block__item')
    .on('input', () => {
      pushData();
      updatePie(data);
    });

  function updatePie(data) {
    // join
    block = svg
      .selectAll('.arc')
      .data(pie(data));
    // update
    block.select('path')
      .transition()
      .duration(1000)
      .ease(d3.easeBack)
      .attrTween('d', arc2Tween);
  }
}

function barchart() {
  const maxVal = Math.max(...data);
  			const xScale = d3.scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([0, width])
    .paddingInner(0.05);

  const yScale = d3.scaleLinear()
    .domain([0, maxVal])
    .range([0, height]);

  // Create SVG element
  const svg = d3.select('.chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // Create bars
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => xScale(i))
    .attr('y', d => height - yScale(d))
    .attr('width', xScale.bandwidth())
    .attr('height', d => yScale(d))
    .style('fill', (d, i) => color(i));

  // Create labels
  svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(d => d)
    .attr('text-anchor', 'middle')
    .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
    .attr('y', d => height - yScale(d) + 14)
    .attr('font-family', 'sans-serif')
    .attr('font-size', '11px')
    .attr('fill', 'white');
  // axis

  d3.selectAll('.input-block__item')
    .on('input', () => {
      data = [];
      pushData();
      updateBar(data);
    });

  function updateBar() {
    data = [];
    pushData();
    const maxVal = Math.max(...data);

    const yScale = d3.scaleLinear()
      .domain([0, maxVal])
      .range([0, height]);
    const xScale = d3.scaleBand()
      .domain(d3.range(data.length))
      .rangeRound([0, width])
      .paddingInner(0.05);
    // Update all rects
    svg.selectAll('rect')
      .data(data)
      .transition()
      .ease(d3.easeBounce)
      .duration(1000)
      .attr('y', d => height - yScale(d))
      .attr('height', d => yScale(d))
      .style('fill', (d, i) => color(i));

    // Update all labels
    svg.selectAll('text')
      .data(data)
      .text(d => d)
      .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
      .attr('y', d => height - yScale(d) + 14);
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

$(document.body).ready(() => {
  $('#saveButton').click(() => {
    html2canvas(
      $('#container'),
      {
        onrendered(canvas) {
          const a = $('<a>').attr('href', canvas.toDataURL('image/png'))
            .attr('download', 'output.png')
            .appendTo('body');
          a[0].click();
          a.remove();
        },
      },
    );
  });
});
