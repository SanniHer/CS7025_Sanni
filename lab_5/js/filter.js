$(document).ready(function() {


    //project data is read from json and unique tags contains a list of all tags in all projects with repetitions removed
    let projectData, uniqueTags;
    $.ajax({
        url: "data/projects.json",
        success: function(data) {
            console.log(data.projects);
            projectData = data.projects;
            uniqueTags = generateUniqueTags();
            createButtons(uniqueTags);
            displayAllProjects(projectData)
           
        }
    });


    // find all the unique tags in our data
    function generateUniqueTags() {
        let uniqueTags = new Set(); // Use a Set to collect unique tags
        // Iterate over project data to collect tags
        projectData.forEach(element => {
            if (element["Tags"]) { // Check if "Tags" exists
                element["Tags"].forEach(tag => {
                    uniqueTags.add(tag); // Add each tag to the Set
                });
            }
        });


        return uniqueTags;
    }



    // create buttons in our html based on a list of names
    function createButtons(list) {
        list.forEach(item => {
            console.log(item);
            let newButton = $(`<button id="filter-button-${item}" class="button">${item}</button>`);
            // Add click event listener
            newButton.on('click', function() {
                filterProjects(item);
            });
           // console.log(newButton);
            $('#filters').append(newButton);
        });


    }



    // when a button is clicked filter by that 'tag'
    function filterProjects(tag) {
        // Filter projects by the selected tag
        let filteredProjects = projectData.filter(project => project["Tags"] && project["Tags"].includes(tag));
        displayAllProjects(filteredProjects);
    }



    //display the projects in the variable 'projects'
    function displayAllProjects(projects) {
        $('#projects').empty(); // Clear existing projects before displaying
        projects.forEach(item => {
            let newProject = $(`<div class="project"><h1>${item['Name']}</h1></div>`);
            let thisImage = $(`<img class="project-cover" src="img/sample.png">`);
            let thisDescription = $(`<div class="project"><h2>${item['Description']}</h2></div>`);
            newProject.append(thisImage);
            newProject.append(thisDescription);
            $('#projects').append(newProject);
        });


    }

}); // end document ready