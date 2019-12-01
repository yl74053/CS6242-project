

var month = ["All", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

var day = ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

var time = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"]

//ZHENGYANG CHEN UPDATE CITY LIST---------------------------------------------------------------->

var city = ["N/A", "Atlanta", "Los Angeles","Chicago","Dallas","Denver","New York","San Francisco","Seattle","Las Vegas","Orlando","Charlotte","Phoenix","Houston","Miami","Boston","Minneapolis","Detroit","Philadelphia","Washington, D.C.","Salt Lake City","San Diego","Tampa","Portland","Honolulu"]

var city3= ["N/A", "ATL", "LAX","Chicago","Dallas","Denver","New York","San Francisco","Seattle","Las Vegas","Orlando","Charlotte","Phoenix","Houston","Miami","Boston","Minneapolis","Detroit","Philadelphia","Washington, D.C.","Salt Lake City","San Diego","Tampa","Portland","Honolulu"]

//<--------------------------------------------------------- END OF UPDATE

var rawData = null

var curData = null

var curMonth = 0

var curDay = 0

var curOri = null

var curDest = null

var curT1 = 0

var curT2 = 2400

var curA1 = 0

var curA2 = 2400


var mapholder = d3.select('#map')

var map = mapholder.append("g")
            .attr("transform", "translate( -110 , 0 )")

var cityholder = mapholder.append("g")
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
                            curMonth =  month.indexOf(d3.select(this).node().value);
                            updateData()
                        }
                    )


var mOption = mSelector.selectAll("option")
                    .data(month)
                    .enter()
                    .append("option")
                    .text(function(d){ 
                        return d;});


var dSelector = d3.select('#date')
                    .on("change", 
                        function(d) {
                            curDay = day.indexOf(d3.select(this).node().value);
                            updateData();

                        }
                    )



var dOption = dSelector.selectAll("option")
                    .data(day)
                    .enter()
                    .append("option")
                    .text(function(d){ return d;});


var t1Selector = d3.select('#take-off1')
                    .on("change", 
                        function(d) {
                            curT1 = time.indexOf(d3.select(this).node().value)*100;
                            updateData();
                        }
                    )


var t1Option = t1Selector.selectAll("option")
                    .data(time)
                    .enter()
                    .append("option")
                    .text(function(d){ return d;});

var t2Selector = d3.select('#take-off2')
                    .on("change", 
                        function(d) {
                            curT2 = time.indexOf(d3.select(this).node().value)*100;
                            updateData();
                        }
                    )

var t2Option = t2Selector.selectAll("option")
                    .data(time)
                    .enter()
                    .append("option")
                    .text(function(d){ return d;})
                    .property("selected", true);

var a1Selector = d3.select('#arrival1')
                    .on("change", 
                        function(d) {
                            curA1 = time.indexOf(d3.select(this).node().value)*100;
                            updateData();
                        }
                    )

var a1Option = a1Selector.selectAll("option")
                    .data(time)
                    .enter()
                    .append("option")
                    .text(function(d){ return d;});

var a2Selector = d3.select('#arrival2')
                    .on("change", 
                        function(d) {
                            curA2 = time.indexOf(d3.select(this).node().value)*100;
                            updateData();
                        }
                    )

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

                            console.log(origin)

                            curOri = origin

                            updateData();

                            console.log(curData)

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

                            console.log(v)

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

                            curDest = target

                            updateData();

                            console.log(curData)

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


        map.attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .style("fill",  "lightblue");

        map.append("path")
                .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
                .attr("class", "state-borders")
                .attr("d", path);

        map.append("circle")
            .attr("cx", 10)
            .attr("cy", 10)
            .attr("fill", "red")
            .attr("r", 6)


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

var citys = d3.json("data/city.json").then(


    function(data) {

        var piedata = {"Delay": 3, "On-Time": 7}

        var piecolor = d3.scaleOrdinal().domain(piedata).range(["#e74c3c", "#2ecc71"])
        
        var pie = d3.pie().value( d => d.value)

        var data_ready = pie(d3.entries(piedata))

        var arc = d3.arc().innerRadius(8).outerRadius(15)

        /*cityholder.selectAll("circle")
            .data(data.features).enter()
            .append("circle")
            .attr("cx", 
                function (d) {
                    console.log(d)
                    if (projection(d.geometry.coordinates) != null){
                        return projection(d.geometry.coordinates)[0] 
                    }
                    return 0
                }
            )
            .attr("cy", 
                function (d) { 
                    if (projection(d.geometry.coordinates) != null){
                        return projection(d.geometry.coordinates)[1] 
                    }
                    return 0
                }
            )
            .attr("r", function(d){ return 5;})
            .attr("fill", "red")*/


        cityholder.selectAll("g")
            .data(data.features).enter()
            .append("g")
            .attr("transform", 
                function(d) {
                     drawpie(d3.select(this))
                     return "translate(" + projection(d.geometry.coordinates)[0]  +"," + projection(d.geometry.coordinates)[1] +")"
                }
             )
            .on("mouseover",
                function(d) {
                    d3.select(this).select("piechart")
                }
            )
            .append("text")
            .text(
                function(d) {
                    return d.properties.name
                }
            )
            .style("font-size", "12px")
            .style("fill", "black")
            .style("font-weight", "bold")
            

        function drawpie(holder) {

            holder.selectAll("piechart")
                .data(data_ready)
                    .enter()
                    .append('path')
                        .attr('d', arc)
                        .attr('fill', d => piecolor(d.data.key))

        }

    }

)


d3.dsv(",","data/delay.csv",function(d){
        return{
          month:  +d.MONTH,
          day:   d.DAY_OF_WEEK,
          carrier: d.OP_UNIQUE_CARRIER,
          ori:   d.ORIGIN_CITY,
          dest:  d.DEST_CITY,
          time: d.DEP_TIME_BLK.split("-"),
          delay: +d.DELAY_SUM,
          total_num: +d.NUM_TOTAL,
          delay_num: +d.NUM_DELAY
        };
        }).then(function(dataset){
            
            dataset.forEach(
                function(d) {
                    d.dep_time = Number(d.time[0])
                    d.arr_time = Number(d.time[1])
                    return d
                }
            )

            rawData = dataset
            curData = dataset
    })


function updateData() {


    curData = rawData
    if(curDay) {
        curData = curData.filter(d => d.day == curDay)
    }
    if(curMonth) {
        curData = curData.filter(d => d.month == curMonth)
    }

    if(curT2 >= curT1) {
        curData = curData.filter(d => d.dep_time >= curT1 && d.dep_time <= curT2)
    } else {
        curData = curData.filter(d => d.dep_time >= curT2 && d.dep_time <= curT1)
    }

    if(curA2 >= curA1) {
        curData = curData.filter(d => d.arr_time >= curA1 && d.arr_time <= curA2)
    } else {
        curData = curData.filter(d => d.arr_time >= curA2 && d.arr_time <= curA1)
    }

    if (curOri != null) {
        curData = curData.filter(d => d.ori == curOri)
    }

    if (curDest != null) {
        curData = curData.filter(d => d.dest == curDest)
    }

}




