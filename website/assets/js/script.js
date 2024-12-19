$(document).ready(async function () {

    // if user hasnt accessed page before then create a local storage item
    if (!window.localStorage.getItem('sentEmail')) {
        // set local storage value to see total emails sent
        window.localStorage.setItem('sentEmail', 0);
    }
    // check which page is open
    let pageLoaded = $("body").data("page");

    // use query selector to find contact button
    var contactElement = document.querySelector('.contactbutton');
    
    // add an on click for it
    contactElement.addEventListener("click", function() {
        updateTotalEmails();
    },);

    // I only want the index page to loop through pictures this way
    if (pageLoaded == "homepage") {
        // create instance of portfolio
        let myPortfolio = new Portfolio(".portfolioimage", "assets/data/website_data.json");
        // load JSON data
        await myPortfolio.loadData(); 
        // start the portfolio loop
        myPortfolio.runPortfolioLoop(); }
    
    else if (pageLoaded == "projects") {

        // create instance of portfolio
        let myProjects = new Portfolio(".portfoliogrid", "assets/data/website_data.json");
        // load JSON data
        await myProjects.loadData(); 
        myProjects.displayAllImages();

    }

    // for all of the individual project pages
    else {

        let projectPages = new MoveImages(".extrapictures", "assets/data/project_pictures.json", pageLoaded)
        await projectPages.loadData();
        projectPages.findMatchingImages();
        projectPages.updateImage()
        projectPages.enableButtons($('#next'), $('#prev'));

    }
    
    
});

class Portfolio {
    constructor(elementToEdit, dataUrl) {
        // the element to change, by using $ it makes it a jquery object
        this.elementToEdit = $(elementToEdit); 
        // json file to load
        this.dataUrl = dataUrl;
        // to be used to store data for each instance
        this.data = []; 
        // keep track of successful results
        this.successCount = 0;
    }

    // This function is a helper function that allows a programm to wait for a few milliseconds
    // ms is the number of milliseconds
    // setting it to a static method because it doesnt use anything from the instance
    static sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async loadData() {
        try {
            // after loaded, we dont need to load it again
            const response = await $.ajax({
                url: this.dataUrl,
                dataType: "json",
            });
            // store the data in the instance 
            this.data = response; 

            // error handling incase the file cant be loaded or found
        } catch (error) {
            console.error("Error loading data:", error);
        }
    }

    // check to see if JSON obkect has the keys needed
    checkValidKeys(project) {
        // required keys for a valid project
        const requiredKeys = ["imagepath", "title", "url"]; 
        // get all the keys from the json object
        const projectKeys = Object.keys(project);

        // in javascript you can't compare 2 arrays so you need to make them strings first
        if (JSON.stringify(requiredKeys) == JSON.stringify(projectKeys)) {

            return true;
        }

        return false;

    }

    // Change the background and update the UI with project details
    changeBackground(project) {

        let hasNeededKeys = this.checkValidKeys(project);

        if (hasNeededKeys) {
            // set the background image
            this.elementToEdit.css("background-image", `url(assets/images/${project.imagepath})`);
            // change the text of the overlay div to the project name
            this.elementToEdit.find(".overlay").find($("h2")).text(project.title);
            // the overlay also contains a URL so I change it here, use prop to change current value
            this.elementToEdit.find("#changingurl").prop("href", project.url);

            this.successCount++;

            return true;
        }
        
        return false;
    }

    displayAllImages() {

        // loop through the data array and generate inject html
        this.data.forEach((project) => {
            let hasNeededKeys = this.checkValidKeys(project);
            
            if (hasNeededKeys) {
                
                // create the HTML string for each portfolio item
                const html = `<a href="${project.url}">
                    <div class="portfolioimage" style="background-image: url(assets/images/${project.imagepath});">
                        <div class="overlay">
                            <h2>${project.title}</h2>
                        </div>
                    </div>
                </a>`;
                // add each div to the grid
                this.elementToEdit.append(html);
            }
        });
    }
    

    async runPortfolioLoop() {
        if (this.data.length == 0) {
            // incase the json file has no data
            console.warn("No data to process.");
            return;
        }

        let i = 0;
        while (true) {

            let project = this.data[i];
            let successful = this.changeBackground(project);

            console.log(successful);

            // if no data was found then I skip until i find data that I can use, otherwise it
            // would show the same picture for longer
            // I added 1 extra json object to the json file to show this
            if (successful) {
                await Portfolio.sleep(3000); 
            }
            console.log(this.successCount)

            // after each loop add 1
            i++;
        
            // reset to 0 to restart the loop
            // also to check if there were any successful results
            if (i == this.data.length && this.successCount > 0) {
                i = 0;
                this.successCount = 0;
            }
            // if there were no successful results then exit the loop to stop it running forever
            else if (i == this.data.length && this.successCount == 0) {
                // break exits the while loop
                break;
            }
        }
    }
}

// use inheritance to get the functions of the Portfolio class
class MoveImages extends Portfolio{
    constructor(elementToEdit, dataUrl, pageLoaded) {
        // initialise the constuctor of the parent class
        super(elementToEdit, dataUrl);
        this.currentIndex = 0;
        this.matchingPictures = []
        this.pageLoaded = pageLoaded

    }

    
    findMatchingImages(){

        // go through array of json objects
        for (let i=0; i < this.data.length; i++){
            // go through array of images
            for (let j=0; j < this.data[i].images.length;j++) {
                // check to see if the images page name is in the filename
                if (this.data[i].images[j].includes(this.pageLoaded)){
                    this.matchingPictures.push(this.data[i].images[j])
                }
            }
        }

    }

    // Update image in the carousel
    updateImage() {
        const oldImage = this.elementToEdit.find('img');
   
        if (oldImage.length > 0) {

            oldImage.fadeOut("fast", () => {
                const imageSrc = `assets/images/${this.pageLoaded}/${this.matchingPictures[this.currentIndex]}`;
                // Update the `src` of the existing `img` and fade it back in
                oldImage.attr('src', imageSrc).fadeIn("fast");
            });
        } else {
            // If no image exists, append a new image and fade it in
            const imageSrc = this.matchingPictures[this.currentIndex];
             $(this.elementToEdit).append(`<img src="assets/images/${this.pageLoaded}/${imageSrc}" alt="Portfolio image">`).find('img').fadeIn("fast");
       
            }
    }

    // move to next image
    nextImage() {
        if (this.currentIndex < this.matchingPictures.length - 1) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }
        this.updateImage();
    }

    // move to the previous image
    prevImage() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.matchingPictures.length - 1;
        }
        this.updateImage();
    }

    // assign on click to previous and next buttons
    enableButtons(nextButton, prevButton) {
        nextButton.on('click', () => this.nextImage());
        prevButton.on('click', () => this.prevImage());
    }

    };

// only needed when every page is loaded
function updateTotalEmails() {
    let currentDate = new Date().getTime();

    // get most recent email time
    let firstEmailTime = parseInt(localStorage.getItem("firstEmailTime"));
            
    // get the number of emails sent
    let totalSentEmails = parseInt(localStorage.getItem("sentEmail", 0));

    // if there was never any email made, great the firstEmailTime item
    if (!firstEmailTime) {
        localStorage.setItem("firstEmailTime", currentDate)
    }

    // get the number of hours since the last email (javascript time is in miliseconds)
    let hoursElapsed = (currentDate - firstEmailTime) / (1000 * 60 * 60);

    // Reset sentEmail count if 24 hours have elapsed
    if (hoursElapsed >= 24) {
        // reset all items if it's been longer than 24 hours
        localStorage.setItem("sentEmail", 0);
        localStorage.setItem("firstEmailTime", currentDate);
    }


    // if they sent less than 5 emails in 24 hours then update the total number sent
    if (totalSentEmails < 5) {
        localStorage.setItem("sentEmail", totalSentEmails + 1);
        window.location.href='mailto:hex5@tcd.ie'
        console.log("Email sent. Total sent: " + (totalSentEmails + 1));

    
    } else {
        // if they already sent 5 in the same day then send error notification  
        setTimeout(function() {
            sendErrorNotification(totalSentEmails, hoursElapsed);
        }, 100); // Execute after a small delay
        console.log("Email not sent, too many sent recently");
    }
}

function sendErrorNotification(emailsSent, hoursElapsed) {
    // display pop up alert saying how long they need to wait
    alert(emailsSent + " emails sent already. Please wait " + Math.round(24 - hoursElapsed) + " hours.");
}
