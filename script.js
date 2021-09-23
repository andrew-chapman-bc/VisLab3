let cities;
d3.csv('cities.csv', d3.autoType).then(data=>{
	cities = data.filter(function(item){
		return item.eu == true;         
	});
	let amount = cities.length
	d3.select('.city-count').text("Number of Cities".concat(" ", amount.toString()))
	makeScatter()
	console.log('cities', data);
	console.log('cities', cities);
	
})

let buildings;
d3.csv('buildings.csv', d3.autoType).then(data=>{
	buildings = data.sort(function (a, b) {
		return b.height_ft - a.height_ft;
	  });
	  makeBar()
	  makeStartingInfo("Burj Khalifa")
	console.log('buildings', buildings);
	
})


function makeScatter() {
	const smallCity = 1000000
	const width = 700;
	const height = 550;
	const svg = d3.select('.population-plot')
		.append('svg')
    	.attr('width', width)
    	.attr('height', height)

	let selection = svg.selectAll('.population-plot')
						.data(cities)
						.enter()
						.append('circle')
						.attr("fill", "blue")
						.attr("cx", function(d,i) {
							return d.x;})
						.attr("cy", function(d,i) {
							return d.y;})
						.attr("r", function(d,i) {
							if (d.population < smallCity) {
								return 4
							}
								return 8
							});
	let labels = svg.selectAll('.population-plot')
						.data(cities)
						.enter()
						.append('text')
						.text(function(d) {
							return d.country;
						})
						.attr("x", function(d,i) {
							return d.x;})
						.attr("y", function(d,i) {
							return d.y;})
						.attr("dx", 3)
						.attr("dy", -10)
						.attr("text-anchor", "middle")
						.attr("font-family", "sans-serif")
						.attr("font-size", "11px")
						.attr("fill", "green")
						.attr("opacity", function(d,i) {
							if (d.population < smallCity) {
								return 0
							}
								return 1
							});
}



function makeBar() {
	const width = 500;
	const height = 500;
	//TODO: Try to do this dynamically 
	const labelBuffer = 160;
	const svg = d3.select('.height-plot')
		.append('svg')
    	.attr('width', width)
    	.attr('height', height)

	let selection = svg.selectAll('.height-plot')
					.data(buildings)
					.enter()
					.append('rect')
					.attr("y", function(d, i) {
						return i * (height / buildings.length);
					})
					.attr("x", labelBuffer)
					.attr("fill", "orange")
					.attr("width", function(d,i) {
						return d.height_px;})
					.attr("height", 35)
					.on("click", function(d) {
						makeInfoSheet(d)
						//console.log(d)
					  });

	let numLabels = svg.selectAll(".height-plot")
					.data(buildings)
					.enter()
					.append("text")
					.text(function(d) {
						return d.height_ft;
					})
					.attr("x", function(d, i) {
						let num = d.height_px + labelBuffer - 2;
						return num;
					})
					.attr("y", function(d, i) {
						return i * 50 + 25;
					})
					.attr("fill", "white")
					.attr("text-anchor", "end");
	let buildLabels = svg.selectAll(".height-plot")
					.data(buildings)
					.enter()
					.append("text")
					.text(function(d) {
						return d.building;
					})
					.attr("font-size", "11px")
					.attr("x", 0)
					.attr("y", function(d, i) {
						return i * 50 + 25;
					});
}

function makeInfoSheet(thing) {
	let pick = thing.target.__data__.building
	var useThis = buildings.filter(function(item){
		return item.building == pick;         
	});
	heightIn = d3.select('.height')
				.data(useThis)
				.text(function(d) {
					return d.height_ft;
				});
	cityIn = d3.select('.city')
				.data(useThis)
				.text(function(d) {
					return d.city;
				});
	countryIn = d3.select('.country')
				.data(useThis)
				.text(function(d) {
					return d.country;
				});
	floorsIn = d3.select('.floors')
				.data(useThis)
				.text(function(d) {
					return d.floors;
				});
	completedIn = d3.select('.completed')
				.data(useThis)
				.text(function(d) {
					return d.completed;
				});
	imageIn = d3.select('.image')
				.data(useThis)
				.attr('src',function(d) {
					return d.image;
				});

}

function makeStartingInfo(start) {
	var useThis = buildings.filter(function(item){
		return item.building == start;         
	});
	heightIn = d3.select('.height')
				.data(useThis)
				.text(function(d) {
					return d.height_ft;
				});
	cityIn = d3.select('.city')
				.data(useThis)
				.text(function(d) {
					return d.city;
				});
	countryIn = d3.select('.country')
				.data(useThis)
				.text(function(d) {
					return d.country;
				});
	floorsIn = d3.select('.floors')
				.data(useThis)
				.text(function(d) {
					return d.floors;
				});
	completedIn = d3.select('.completed')
				.data(useThis)
				.text(function(d) {
					return d.completed;
				});
	imageIn = d3.select('.image')
				.data(useThis)
				.attr('src',function(d) {
					return d.image;
				});

}
