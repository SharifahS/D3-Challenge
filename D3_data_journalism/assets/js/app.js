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