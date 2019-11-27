

var month = ["All", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

var day = ["All", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

var time = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "22:00", "23:00", "24:00"]

var timeN = ["000", "100", "200", "300", "400", "500", "600", "700", "800", "900", "1000", "1100", "1200", "1300", "1400", "1500", "1600", "1700", "1800", "1900", "2000", "2100", "2200", "2200", "2300", "2400"]

var city = ["N/A", "Atlanta", "Miami"]

var mapholder = d3.select('#map')

var map = mapholder.append("g")
            .attr("transform", "translate( -110 , 0 )")


var info = d3.select('#info')
                .append("g")

var panel1 = info.append("g")
                .attr("transform", "translate( 10 , 30 )")
                

panel1.append("text")
        .attr("font-size", "30px")
        .text("Overview")

panel1.append("text")
        .attr("y", 50)
        .attr("font-size", "18px")
        .text("Average Delay")

panel1.append("text")
        .attr("x", 140)
        .attr("y", 50)
        .attr("font-size", "18px")
        .text("Delay Percentage")

panel1.append("text")
        .attr("y", 150)
        .attr("font-size", "18px")
        .text("Top Delay Routes")

panel1.append("text")
        .attr("y", 350)
        .attr("font-size", "18px")
        .text("Airline Performance")


var panel2 = info.append("g")
                    .attr("transform", "translate( 10 , 20 )")

panel2.append("text")
        .attr("font-size", "12px")
        .text("Origin")

panel2.append("text")
        .attr("class", "oCity")
        .attr("y", 32)
        .attr("x", 10)
        .attr("font-size", "30px")
        .text("Atlanta")

panel2.append("text")
        .attr("y", 60)
        .attr("font-size", "18px")
        .text("Average Delay")

panel2.append("text")
        .attr("x", 140)
        .attr("y", 60)
        .attr("font-size", "18px")
        .text("Delay Percentage")

panel2.append("text")
        .attr("y", 160)
        .attr("font-size", "18px")
        .text("Top Delay Destination")

panel2.append("text")
        .attr("y", 350)
        .attr("font-size", "18px")
        .text("Airline Performance")

panel2.attr("opacity", 0)

var panel3 = info.append("g")
                    .attr("transform", "translate( 10 , 20 )")

panel3.append("text")
        .attr("font-size", "12px")
        .text("Destination")

panel3.append("text")
        .attr("class", "dCity")
        .attr("y", 32)
        .attr("x", 10)
        .attr("font-size", "30px")
        .text("Atlanta")

panel3.append("text")
        .attr("y", 60)
        .attr("font-size", "18px")
        .text("Average Delay")

panel3.append("text")
        .attr("x", 140)
        .attr("y", 60)
        .attr("font-size", "18px")
        .text("Delay Percentage")

panel3.append("text")
        .attr("y", 160)
        .attr("font-size", "18px")
        .text("Top Delay Origin")

panel3.append("text")
        .attr("y", 350)
        .attr("font-size", "18px")
        .text("Airline Performance")

panel3.attr("opacity", 0)

var panel4 = info.append("g")
                .attr("transform", "translate( 10 , 27 )")


panel4.append("text")
        .attr("class", "odCity")
        .attr("font-size", "25px")
        .text("Overview - Overview")


panel4.append("text")
        .attr("y", 50)
        .attr("font-size", "18px")
        .text("Average Delay")

panel4.append("text")
        .attr("x", 140)
        .attr("y", 50)
        .attr("font-size", "18px")
        .text("Delay Percentage")

panel4.append("text")
        .attr("y", 150)
        .attr("font-size", "18px")
        .text("Airline Performance")

panel4.append("text")
        .attr("y", 350)
        .attr("font-size", "18px")
        .text("Predict Delay Time")

panel4.attr("opacity", 0)

var mSelector = d3.select('#month')
                .on("change",

                    function(d) {

                        var v = d3.select(this).node().value
                        if (month.indexOf(v) > 0) {
                            d3.select('#date').property("disabled", false)
                            d3.select('#date2').property("disabled", false)
                            d3.select('#date').selectAll("option").remove()
                            d3.select('#date2').selectAll("option").remove()
                            var daydata = day
                            if ( v == "April" || v ==  "June" || v == "September" || v == "November") {
                                daydata = daydata.slice(0, 31)
                            }
                            if ( v == "February") {
                                daydata = daydata.slice(0, 29)
                            }

                            d3.select('#date').selectAll("option")
                                .data(daydata)
                                .enter()
                                .append("option")
                                .text(function(d){ return d;});

                            d3.select('#date2').selectAll("option")
                                .data(daydata)
                                .enter()
                                .append("option")
                                .text(function(d){ return d;});

                        } else {
                            d3.select('#date').property("disabled", true)
                            d3.select('#date2').property("disabled", true)
                        }


                    } 
                )

var mOption = mSelector.selectAll("option")
        			.data(month)
        			.enter()
        			.append("option")
            		.text(function(d){ return d;});

var dSelector = d3.select('#date')

var dOption = dSelector.selectAll("option")
        			.data(day)
        			.enter()
        			.append("option")
            		.text(function(d){ return d;});

var d2Selector = d3.select('#date2')

var d2Option = d2Selector.selectAll("option")
                    .data(day)
                    .enter()
                    .append("option")
                    .text(function(d){ return d;});


var t1Selector = d3.select('#take-off1')


var t1Option = t1Selector.selectAll("option")
        			.data(time)
        			.enter()
        			.append("option")
            		.text(function(d){ return d;});

var t2Selector = d3.select('#take-off2')

var t2Option = t2Selector.selectAll("option")
        			.data(time)
        			.enter()
        			.append("option")
            		.text(function(d){ return d;})
                    .property("selected", true);

var a1Selector = d3.select('#arrival1')

var a1Option = a1Selector.selectAll("option")
        			.data(time)
        			.enter()
        			.append("option")
            		.text(function(d){ return d;});

var a2Selector = d3.select('#arrival2')

var a2Option = a2Selector.selectAll("option")
        			.data(time)
        			.enter()
        			.append("option")
            		.text(function(d){ return d;})
                    .property("selected", true);


var tSelector = d3.select('#departure')
                    .on("change", 

                        function(d) {

                            var v = d3.select(this).node().value

                            if (v == "N/A") {
                                origin = null
                            }  else {
                                origin = v
                            }

                            if ( origin == null && target == null ) {

                                panel1.attr("opacity", 1)
                                panel2.attr("opacity", 0)
                                panel3.attr("opacity", 0)
                                panel4.attr("opacity", 0)

                            } else if ( target == null || origin == target) {

                                panel1.attr("opacity", 0)
                                panel2.attr("opacity", 1)
                                panel3.attr("opacity", 0)
                                panel4.attr("opacity", 0)
                                panel2.select(".oCity").text(origin)

                            } else if ( origin == null) {

                                panel1.attr("opacity", 0)
                                panel2.attr("opacity", 0)
                                panel3.attr("opacity", 1)
                                panel4.attr("opacity", 0)
                                panel3.select(".dCity").text(target)

                            } else {

                                panel1.attr("opacity", 0)
                                panel2.attr("opacity", 0)
                                panel3.attr("opacity", 0)
                                panel4.attr("opacity", 1)
                                panel4.select(".odCity").text(origin + " - " + target)

                            }

                        }
                    )

var tOption = tSelector.selectAll("option")
        			.data(city)
        			.enter()
        			.append("option")
            		.text(function(d){ return d;});

var aSelector = d3.select('#arrival')
                    .on("change", 

                        function(d) {

                            var v = d3.select(this).node().value

                            if (v == "N/A") {
                                target = null
                            }  else {
                                target = v
                            }

                            if ( origin == null && target == null ) {

                                panel1.attr("opacity", 1)
                                panel2.attr("opacity", 0)
                                panel3.attr("opacity", 0)
                                panel4.attr("opacity", 0)

                            } else if ( target == null || origin == target) {

                                panel1.attr("opacity", 0)
                                panel2.attr("opacity", 1)
                                panel3.attr("opacity", 0)
                                panel4.attr("opacity", 0)
                                panel2.select(".oCity").text(origin)

                            } else if ( origin == null) {

                                panel1.attr("opacity", 0)
                                panel2.attr("opacity", 0)
                                panel3.attr("opacity", 1)
                                panel4.attr("opacity", 0)
                                panel3.select(".dCity").text(target)

                            } else {

                                panel1.attr("opacity", 0)
                                panel2.attr("opacity", 0)
                                panel3.attr("opacity", 0)
                                panel4.attr("opacity", 1)
                                panel4.select(".odCity").text(origin + " - " + target)

                            }

                        }
    
                    )

var aOption = aSelector.selectAll("option")
        			.data(city)
        			.enter()
        			.append("option")
            		.text(function(d){ return d;});






var projection = d3.geoAlbersUsa().scale(850);

var path = d3.geoPath().projection(projection);

var origin = null;

var target = null;


var usmap = d3.json("data/states-10m.json").then(

    function(us) {

        console.log(us)

        map.attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .style("fill",  "steelblue");

        map.append("path")
                .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
                .attr("class", "state-borders")
                .attr("d", path);

        var legend = mapholder.append("g")
                        .attr("transform", "translate( 10 , 500 )")

        legend.append("text")
                .text("On-Time Performance")

        legend.append("rect")
                .attr("y", 15)
                .attr("height", 10)
                .attr("width", 30)
                .style("fill", "green")

        legend.append("text")
                .attr("y", 25)
                .attr("x", 40)
                .text("Smooth")

        legend.append("rect")
                .attr("y", 40)
                .attr("height", 10)
                .attr("width", 30)
                .style("fill", "orange")

        legend.append("text")
                .attr("y", 50)
                .attr("x", 40)
                .text("Moderate")

        legend.append("rect")
                .attr("y", 65)
                .attr("height", 10)
                .attr("width", 30)
                .style("fill", "red")

        legend.append("text")
                .attr("y", 75)
                .attr("x", 40)
                .text("Heavy")

        legend.append("text")
                .attr("x", 180)
                .text("Flight Volume")


        legend.append("rect")
                .attr("x", 180)
                .attr("y", 20)
                .attr("height", 1)
                .attr("width", 30)
                .style("fill", "grey")

        legend.append("text")
                .attr("y", 25)
                .attr("x", 220)
                .text("10")

        legend.append("rect")
                .attr("x", 180)
                .attr("y", 40)
                .attr("height", 2)
                .attr("width", 30)
                .style("fill", "grey")

        legend.append("text")
                .attr("y", 47.5)
                .attr("x", 220)
                .text("20")

        legend.append("rect")
                .attr("x", 180)
                .attr("y", 60)
                .attr("height", 5)
                .attr("width", 30)
                .style("fill", "grey")

        legend.append("text")
                .attr("y", 68)
                .attr("x", 220)
                .text("50")

        legend.append("rect")
                .attr("x", 180)
                .attr("y", 80)
                .attr("height", 10)
                .attr("width", 30)
                .style("fill", "grey")

        legend.append("text")
                .attr("y", 90)
                .attr("x", 220)
                .text("100")

        legend.append("text")
                .attr("x", 360)
                .text("Airport Status")

        var pieholder = legend.append("g")
                            .attr("transform", "translate( 420 , 50 )")
        

        var piedata = {"Delay": 3, "On-Time": 7}

        var piecolor = d3.scaleOrdinal().domain(piedata).range(["#e74c3c", "#2ecc71"])
        
        var pie = d3.pie().value( d => d.value)

        var data_ready = pie(d3.entries(piedata))

        var arc = d3.arc().innerRadius(15).outerRadius(30)

        pieholder.selectAll('piechart')
                .data(data_ready)
                .enter()
                .append('path')
                    .attr('d', arc)
                    .attr('fill', d => piecolor(d.data.key))
        

        pieholder.selectAll('pielabel')
                .data(data_ready)
                .enter()
                .append('text')
                .text( d => d.data.key)
                .attr('transform',
                    function(d){
                        var pos = arc.centroid(d)
                        pos[0] = (pos[0]+1) * 1.7
                        pos[1] = (pos[1]+1) * 1.7
                        return 'translate('+ pos +')' 
                    }
                )
                .style("text-anchor",
                    function(d) {

                        var midangle = d.startAngle + (d.endAngle - d.startAngle) /2
                        return (midangle < Math.PI ? 'start' : 'end')
                    }
                )
        
    }
)

