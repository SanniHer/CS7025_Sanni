// $(document).ready(function() {
//     console.log("Ready");
//     /*hide an image upon clicking - will only work for one! */
// $("#pika").click(function() {
//     $(this).hide();
// });
// $("#toge").dblclick(function() {
//     $(this).hide();
// });

// $(".slidercontent").hide()

// changeColourEnter(".colourblock", "green")

// changeColourLeave(".colourblock", "blue")
  

// $(".colourblockhover").hover(function() {
// /*when mouse enters*/
// changeColourEnter(".colourblockhover", "yellow")
// },
// function() {
//     /*when mouse leaves*/
//     changeColourLeave(".colourblockhover", "red")
// }
// );

// $(".colourblockevents").on({
//     mouseenter: function() {
//     $(".colourblockevents").css("background-color", "purple");
//     },
//     mouseleave: function() {
//     $(".colourblockevents").css("background-color", "pink");
//     },
//     click: function() {
//         increaseSize(".colourblockevents", 200)
//     }
// });

// $(".sliderbutton").on({

//     mouseenter: function() {
//         $(".sliderbutton").css("background-color", "blue");
//         },
//         mouseleave: function() {
//         $(".sliderbutton").css("background-color", "orange");
//         },
        
        
//     click: function() {
//         $(".slidercontent").slideToggle("fast");
//     }

// });


// });
// $.ajax({
//     url: "data/idm.json",
//     success: function(data) {
//         console.log(data);
//              }
// });


// $.ajax({
//         url: "data/idm.json",
//         success: function(data) {
//             console.log(data);
//             $('.modules').html(data.module[0].lecturer);
//             $('.modules').append('<br>' + data.module[1].lecturer);
//         }
//     });


// function changeColourEnter(input_element, colour){
//     $(input_element).mouseenter(function(){
//         $(input_element).css("background-color", colour);
//         });

// }

// function changeColourLeave(input_element, colour){
//     $(input_element).mouseleave(function(){
//     $(input_element).css("background-color", colour);
//     });

// }

// function increaseSize(div_name, total_size){
//     $(div_name).css("width", total_size);
//     $(div_name).css("height", total_size);
// }


$(document).ready(function() {

    // define variables
    let images;
    let currentIndex = 0;


    // Load JSON data
    $.ajax({
        url: "data/photos.json",
        success: function(data) {
            images = data;
            initialise();
        }
    });


    // Initialize the carousel with the first image
    function initialise() {
     updateImage();
}


    // Update image in the carousel
    function updateImage() {
        const oldImage = $('#image-display').find('img');


        if (oldImage.length > 0) {
            oldImage.fadeOut("fast", function() {
                const imageSrc = images.images[currentIndex].image;
                // Update the `src` of the existing `img` and fade it back in
                oldImage.attr('src', imageSrc).fadeIn("fast");
            });
        } else {
            // If no image exists, append a new image and fade it in
            const imageSrc = images.images[currentIndex].image;
            $('#image-display').append(`<img src="${imageSrc}" alt="Product Image" style="display:none;">`).find('img').fadeIn("fast");
        }
    }




    // Next button functionality
    $('#next').on('click', function() {
        if (currentIndex < images.images.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateImage()
    });



    // Previous button functionality
    $('#prev').on('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = images.images.length - 1;
        }
        updateImage()
    });


});
