//SVG width and height values
var svgWidth = 800;
var svgHeight = 600;

//Margin data
var margin = {
    top: 20,
    right: 20,
    bottom: 100,
    left: 30
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

chartGroup.append("g")
.attr("transform", `translate(0, ${height})`)
.call(bottomAxis);

chartGroup.append("g")
.call(leftAxis);

//Circles for scatter plot
chartGroup.selectAll("circle")
.data(HealthData)
.enter()
.append("circle")
.attr("cx", d => xLinearScale(d.poverty))
.attr("cy", d => yLinearScale(d.healthcare))
.attr("r", "15")
.classed("stateCircle", true)


//State abbreviation labels and append to circle coordinates
 chartGroup.selectAll(".stateText")
 .data(HealthData)
 .enter()
 .append("text")
 .classed('stateText', true)
 .attr("x", d => xLinearScale(d.poverty))
 .attr("y", d => yLinearScale(d.healthcare)+5)
 .text(d => d.abbr)

// Axes Labels
chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", -5- margin.left )
.attr("x", 5- (height/1.5))
.attr("dy", "1em")
.attr("class", "axisText")
.style("font-weight", "bold")
.text("Lacks Healthcare (%)");

chartGroup.append("text")
.attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
.attr("class", "axisText")
.attr("y", 35 - margin.left )
.attr("x", 300 - (height/1.5))
.style("font-weight", "bold")
.text("In Poverty (%)");
}).catch(function(error) {
console.log(error);
});





