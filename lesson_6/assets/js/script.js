// This function is a helper function that allows a programm to wait for a few milliseconds
// ms is the number of milliseconds
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// Wait until the DOM is loaded in memory
$(document).ready(function () {
	// load the json file into memory --  note that the jQuery $.ajax() function takes a JavaScript Object as argument
	$.ajax({
		url: "assets/js/dogs.json", // where can it find what we want to load?
		dataType: "json", // so that the json will be available as a JavaScript Object
		success: async function (data) {
			// when the file was successfully loaded and parsed we have a data object available to us

			let wrapper = $(".wrapper"); // the element in the DOM that we're about to target

			for (i = 0; i < data.length; i++) {
				// loop through the elements that we got from the json file

				let theDog = data[i]; // create a variable and assign the current element to that variable

				changeBackground(wrapper, theDog); // call the function that changes the background image and give it the element it needs to change and the source of information

				await sleep(3000); //let it wait for 1000 milliseconds (1 second) before performing the next iteration.
				if (i == data.length - 1) {
					i = 0;
				}
			}
		},
	});
});

function changeBackground(element, dog) {
	element.css("background-image", `url(assets/img/${dog.path})`); // change the image

	/*
  check if the window width is less than 500px
	set background-position-x of every dog to a mobile friendly position
  */
	if (window.innerWidth <= 500) {
		console.log("yep");
		element.css("background-position-x", dog.position);
	}

	element.find("#dog-title").text(dog.title); // update the title
	element.find("#dog-description").text(dog.description); //update the description
}

/**
 * Dog pictures and info from https://www.nylabone.com/dog101/10-great-small-dog-breeds
 */
