//SVG width and height values
var svgWidth = 1000;
var svgHeight = 600;

//Margin data
var margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
  };
  
//Declare graphing area (relative to SVG)
  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

//SVG wrapper, append to html page
var svg = d3.select("#scatter")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight);


//Variable for chart group area
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

//CSV import
d3.csv("assets/data/data.csv").then(function(HealthData){
    console.log(HealthData)

//Parse data
HealthData.forEach(function(data){
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
});

//Axis scale x
 var xLinearScale = d3.scaleLinear()
 .domain([10, d3.max(HealthData, d => d.poverty)])
 .range([0, width]);

//Axis scale y
 var yLinearScale = d3.scaleLinear()
  .domain([0, d3.max(HealthData, d => d.healthcare)])
  .range([height, 0]);

//Create and append axes
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);
