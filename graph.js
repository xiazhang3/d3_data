
// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%d-%b-%y").parse;
var formatTime = d3.time.format("%d-%b-%y");// Format tooltip date / time

// Set the rangestrann
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line 1
var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.Cholesterol_total); });


// Define the line 2
var valueline2 = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.Triglycerides); });


// Define the line 3
var valueline3 = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.HDL_Cholesterol); });

var valueline4 = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.LDL_Cholesterol); });

var valueline5 = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.Hemoglobin_A1C); });

var valueline6 = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.Lipitor); });

var valueline7 = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.Metformin)/20; });



var title = "Health data with links";

// Define 'div' for tooltips
var div = d3.select("body")
    .append("div")  // declare the tooltip div 
    .attr("class", "tooltip")
    .style("opacity", 0);

// Adds the svg canvas
var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");
// set the colour scale
var color = d3.scale.category20();

// Get the data
d3.json("healthData.json", function(error, data) {

    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.Cholesterol_total = +d.Cholesterol_total;
        d.Triglycerides = +d.Triglycerides;
        d.HDL_Cholesterol = +d.HDL_Cholesterol;
        d.LDL_Cholesterol = +d.LDL_Cholesterol;
        d.Hemoglobin_A1C = +d.Hemoglobin_A1C;
        d.Lipitor = +d.Lipitor;
        d.Metformin = +d.Metformin;
    });


    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    //!!!!
    // Max is hard coded, may need to change 
    y.domain([0, d3.max(data, function(d) { return d.Cholesterol_total; })+20]);

    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .style("stroke", "#6b6ecf")
        .attr("d", valueline(data));

    // draw the scatterplot
    svg.selectAll("dot")                                    
        .data(data)                                            
    .enter().append("circle")                                
        .attr("r", 3)    
        .attr("cx", function(d) { return x(d.date); })         
        .attr("cy", function(d) { return y(d.Cholesterol_total); })
    // Tooltip stuff after this
        .on("mouseover", function(d) {        
            div.transition()
                .style("opacity", 0);
            div.transition()
                .style("opacity", .9);    
            div.html(
                '<a href= "'+d.link+'" target="_blank">' + //with a link
                formatTime(d.date) +
                "</a>" +
                "<br/>"  + d.Cholesterol_total)     
                .style("left", (d3.event.pageX) + "px")             
                .style("top", (d3.event.pageY - 28) + "px")
                .attr("class", "info");
            })
        .on('mouseout', function(d) {
           /* d3.select('.info')
              .transition()
              .duration(2000)
              .style("opacity", 0); 
            */    
        });


    // Add the valueline2 path.
    svg.append("path")        
        .attr("class", "line")
        .style("stroke",  "#b5cf6b")
        .attr("d", valueline2(data));
        // draw the scatterplot
    svg.selectAll("dot")                                    
        .data(data)                                            
    .enter().append("circle")                                
        .attr("r", 3)    
        .attr("cx", function(d) { return x(d.date); })         
        .attr("cy", function(d) { return y(d.Triglycerides); })
    // Tooltip stuff after this
        .on("mouseover", function(d) {        
            div.transition()
                .style("opacity", 0);
            div.transition()
                .style("opacity", .9);    
            div.html(
                '<a href= "'+d.link+'" target="_blank">' + //with a link
                formatTime(d.date) +
                "</a>" +
                "<br/>"  + d.Triglycerides)     
                .style("left", (d3.event.pageX) + "px")             
                .style("top", (d3.event.pageY - 28) + "px")
                .attr("class", "info");
            })
        .on('mouseout', function(d) {
           /* d3.select('.info')
              .transition()
              .duration(2000)
              .style("opacity", 0); 
            */    
        });


        // Add the valueline3 path.
    svg.append("path")        
        .attr("class", "line")
        .style("stroke",  "#d6616b")
        .attr("d", valueline3(data));
        // draw the scatterplot
    svg.selectAll("dot")                                    
        .data(data)                                            
    .enter().append("circle")                                
        .attr("r", 3)    
        .attr("cx", function(d) { return x(d.date); })         
        .attr("cy", function(d) { return y(d.HDL_Cholesterol); })
    // Tooltip stuff after this
        .on("mouseover", function(d) {        
            div.transition()
                .style("opacity", 0);
            div.transition()
                .style("opacity", .9);    
            div.html(
                '<a href= "'+d.link+'" target="_blank">' + //with a link
                formatTime(d.date) +
                "</a>" +
                "<br/>"  + d.HDL_Cholesterol)     
                .style("left", (d3.event.pageX) + "px")             
                .style("top", (d3.event.pageY - 28) + "px")
                .attr("class", "info");
            })
        .on('mouseout', function(d) {
           /* d3.select('.info')
              .transition()
              .duration(2000)
              .style("opacity", 0); 
            */    
        });



            // Add the valueline4 path.
    svg.append("path")        
        .attr("class", "line")
        .style("stroke",  "#e7ba52")
        .attr("d", valueline4(data));
        // draw the scatterplot
    svg.selectAll("dot")                                    
        .data(data)                                            
    .enter().append("circle")                                
        .attr("r", 3)    
        .attr("cx", function(d) { return x(d.date); })         
        .attr("cy", function(d) { return y(d.LDL_Cholesterol); })
    // Tooltip stuff after this
        .on("mouseover", function(d) {        
            div.transition()
                .style("opacity", 0);
            div.transition()
                .style("opacity", .9);    
            div.html(
                '<a href= "'+d.link+'" target="_blank">' + //with a link
                formatTime(d.date) +
                "</a>" +
                "<br/>"  + d.LDL_Cholesterol)     
                .style("left", (d3.event.pageX) + "px")             
                .style("top", (d3.event.pageY - 28) + "px")
                .attr("class", "info");
            })
        .on('mouseout', function(d) {
           /* d3.select('.info')
              .transition()
              .duration(2000)
              .style("opacity", 0); 
            */    
        });



                    // Add the valueline5 path.
    svg.append("path")        
        .attr("class", "line")
        .style("stroke",  "#ad494a")
        .attr("d", valueline5(data));
        // draw the scatterplot
    svg.selectAll("dot")                                    
        .data(data)                                            
    .enter().append("circle")                                
        .attr("r", 3)    
        .attr("cx", function(d) { return x(d.date); })         
        .attr("cy", function(d) { return y(d.Hemoglobin_A1C); })
    // Tooltip stuff after this
        .on("mouseover", function(d) {        
            div.transition()
                .style("opacity", 0);
            div.transition()
                .style("opacity", .9);    
            div.html(
                '<a href= "'+d.link+'" target="_blank">' + //with a link
                formatTime(d.date) +
                "</a>" +
                "<br/>"  + d.Hemoglobin_A1C)     
                .style("left", (d3.event.pageX) + "px")             
                .style("top", (d3.event.pageY - 28) + "px")
                .attr("class", "info");
            })
        .on('mouseout', function(d) {
           /* d3.select('.info')
              .transition()
              .duration(2000)
              .style("opacity", 0); 
            */    
        });


                           // Add the valueline6 path.
    svg.append("path")        
        .attr("class", "line")
        .style("stroke",  "#7b4173")
        .attr("d", valueline6(data));
        // draw the scatterplot
    svg.selectAll("dot")                                    
        .data(data)                                            
    .enter().append("circle")                                
        .attr("r", 3)    
        .attr("cx", function(d) { return x(d.date); })         
        .attr("cy", function(d) { return y(d.Lipitor); })
    // Tooltip stuff after this
        .on("mouseover", function(d) {        
            div.transition()
                .style("opacity", 0);
            div.transition()
                .style("opacity", .9);    
            div.html(
                '<a href= "'+d.link+'" target="_blank">' + //with a link
                formatTime(d.date) +
                "</a>" +
                "<br/>"  + d.Lipitor)     
                .style("left", (d3.event.pageX) + "px")             
                .style("top", (d3.event.pageY - 28) + "px")
                .attr("class", "info");
            })
        .on('mouseout', function(d) {
           /* d3.select('.info')
              .transition()
              .duration(2000)
              .style("opacity", 0); 
            */    
        });


                               // Add the valueline7 path.
    svg.append("path")        
        .attr("class", "line")
        .style("stroke",  "#637939")
        .attr("d", valueline7(data));
        // draw the scatterplot
    svg.selectAll("dot")                                    
        .data(data)                                            
    .enter().append("circle")                                
        .attr("r", 3)    
        .attr("cx", function(d) { return x(d.date); })         
        .attr("cy", function(d) { return y(d.Metformin)/20; }) //change the scale here
    // Tooltip stuff after this
        .on("mouseover", function(d) {        
            div.transition()
                .style("opacity", 0);
            div.transition()
                .style("opacity", .9);    
            div.html(
                '<a href= "'+d.link+'" target="_blank">' + //with a link
                formatTime(d.date) +
                "</a>" +
                "<br/>"  + d.Metformin)     
                .style("left", (d3.event.pageX) + "px")             
                .style("top", (d3.event.pageY - 28) + "px")
                .attr("class", "info");
            })
        .on('mouseout', function(d) {
           /* d3.select('.info')
              .transition()
              .duration(2000)
              .style("opacity", 0); 
            */    
        });


    //add legend




    // Add the X Axis
    svg.append("g")    
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")    
        .attr("class", "y axis")
        .call(yAxis);


    svg.append("text")          // Add the title shadow
        .attr("x", (width / 2))
        .attr("y", margin.top / 4)
        .attr("text-anchor", "middle")
        .attr("class", "shadow")
        .style("font-size", "16px")
        .text(title);

});