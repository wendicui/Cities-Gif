var cities = ["ISTANBUL","FLORENCE","VENICE","ROME","MILAN","BARCELONA","MADRID","SANTORINI","CAPPADOCIA","ATHENS","VANTICAN", "CANCUN"]


//add input form to aray and render it
	
	$(document).on("click", "#addMovie", function(event){
		event.preventDefault();
	// 	// add user input to array , check whether there is anything already there

		 var input = $("#movieInput").val().trim().toUpperCase();
		 
		 if(jQuery.inArray(input, cities)!= -1){return}
		 if(input != ""){
			 cities.push(input)
			 display();
			 $("#movieInput").val("" );
		 }
	});

	function display(event){
		//display array
		$(".names").empty();
		$.each(cities, function(index, value){
		var newDiv = $("<div class = cities>" + value.toUpperCase() +"</div>")
		newDiv.attr("value", value);
		$(".names").append(newDiv);
		})

	}

	display();

	function getGif(){
		var title =$(this).attr("value");
		var URL = `https://api.giphy.com/v1/gifs/search?q=${title}&limit=10&api_key=dc6zaTOxFJmzC`;
	
//get data
		$.ajax({

			url:URL,
			method:"get",

		}).done (getPic)
//get data to show up in images div	
		function getPic(res){
			$(".images").empty();

			for (var i = 0; i < res.data.length; i++) {
				var src = res.data[i].images.fixed_height_still.url
				var img = $(`<img src = ${src} class = "gif">`)
				var newD = $("<div class = 'newD'>")

				//add data information for future use
				img.attr("value1", res.data[i].images.fixed_height.url)
				img.attr("value2", res.data[i].images.fixed_height_still.url)
				img.attr("clicked", false)
				newD.append(`RATING: ${res.data[i].rating.toUpperCase()} </br>`);
				newD.append(img);
				$(".images").append(newD);

			}

			console.log(res)

		}

	}

	$(document).on("click", ".cities", getGif)

	$(document).on("click", ".gif", getStill)


	function getStill(){
		if($(this).attr("clicked") === "false"){
			var newSrc = $(this).attr("value1")
			$(this).attr("src", newSrc)
			$(this).attr("clicked", true)
			console.log(newSrc)

		}else{
			var newSrc = $(this).attr("value2")
			$(this).attr("src", newSrc)
			$(this).attr("clicked", false)
			console.log("2")
		}
	}
	
