$(document).ready(function() {
    console.log("Ready");

    listOfCarousels = ["data/photos.json", "data/photos2.json"]
    listOfCarousels.forEach((carousel_list, index) => {
        new Carousel(carousel_list, "#carousel-container", index);
        
    });

}); // end document ready


class Carousel {
    constructor(dataUrl, carouselContainerSelector, id) {
        this.dataUrl = dataUrl; //folder where the images are stored
        this.carouselContainer = $(carouselContainerSelector); // jQuery object conataining the carousel
        this.id = id; // Unique identifier for the carousel


        // Dynamically create jQuery objects for the display and buttons
        this.$display = $(`<div id="image-display-carousel-container" class="image-display"></div>`);
        this.$prevButton = $(`<button id="prev-button-carousel-container" class="prev">Previous</button>`);
        this.$nextButton = $(`<button id="next-button-carousel-container" class="next">Next</button>`);


        this.images = [];
        this.currentIndex = 0;


        // Load data and initialize
        this.loadData().then(() => {
                this.initializeCarousel();
                this.attachEventListeners();
                

            });
    }




    async loadData() {
        try {
            const response = await $.getJSON(this.dataUrl);
            this.images = response.images.map(img => img.image);
        } catch (error) {
            console.error('Error loading JSON data:', error);
        }
    }




    initializeCarousel() {
        // Append dynamically created elements to the container
        this.carouselContainer.append(this.$prevButton);
        this.carouselContainer.append(this.$display);
        this.carouselContainer.append(this.$nextButton);


        // Load the first image
        if (this.images.length > 0) {
            this.updateImage();
        } else {
            console.warn('No images found in the data.');
        }
    }






    attachEventListeners() {
        // Attach click events to the buttons
        this.$prevButton.on('click', () => this.showPreviousImage());
        this.$nextButton.on('click', () => this.showNextImage());
    }


    
    showPreviousImage() {
        // Navigate to the previous image
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
    }


    showNextImage() {

        this.currentIndex = (this.currentIndex +1 + this.images.length) % this.images.length;
        this.updateImage();
    }

    updateImage() {
        const oldImage = this.$display.find("img");
        if (oldImage.length > 0) {

            oldImage.fadeOut("fast", () =>{
                const imageSrc = this.images[this.currentIndex];
                oldImage.attr('src', imageSrc).fadeIn("slow");
            });
        } else {
            const oldImage = this.images[this.currentIndex];
            this.$display.append(`<img src="${oldImage}" alt="Product Image" style="display:none;">`).find('img').fadeIn("slow");
        
        }
    }
    
}
