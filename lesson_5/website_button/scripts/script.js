let moviePosters = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfMrzXyHwhlsfpQ4Lo69gYh2SPU_RO_3i1qgmWBALUJkEySSHc6DK7Z-SSlh3zGhsqZpJD6g",
    "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQEVAWmLfjnanTC1j-DdSrSHGsbQWp_bR_Hw1XhiXgsQDI9C0ThXKqI1fnR0V01kAeCbn5vEg",
    "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTZd2BT-GmYpSbLgDvhkvSdHPOWb41dcesnJb6TQ3v74ViPXwNFZL32QCO3WvMcUozr65CV",
    "https://v3img.voot.com/v3Storage/assets/hp1_ivy-16x9-carousel-1688116560057.jpg"
]

let movie = document.createElement('img')

function changePicture() {

    movie.src = moviePosters[Math.floor(Math.random() * moviePosters.length)];
    document.getElementById('body').appendChild(movie);

}


