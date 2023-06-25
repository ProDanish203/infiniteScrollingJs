const imageContainer = document.getElementById('imgContainer');
const loader = document.getElementById('loader');

let photos = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const count = 30;
const accessKey = "fHMPRHuJ77KOARJZa19EaZUWX91LEmz71iFHZZqwNyI"
const url = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`

const imageLoaded = () => {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.style.display = "none";
        console.log(`ready = ` + ready);
    }
}

const displayPhotos = () => {
    imagesLoaded = 0;
    totalImages = photos.length;
    console.log(`Total Images = ` + totalImages)

    photos.forEach((photo) => {

        const item = document.createElement("a");
        item.setAttribute("href", photo.links.html)
        item.setAttribute("target", "_blank")

        const image = document.createElement("img");
        image.setAttribute("src", photo.urls.regular)
        image.setAttribute("alt", photo.alt_description)
        image.setAttribute("title", photo.alt_description)

        image.addEventListener("load", imageLoaded)

        item.appendChild(image);
        imageContainer.appendChild(item);

    })    
}

// Getting data from api
const getPhotos = async () => {
    try{
        const res = await fetch(url);
        photos = await res.json();
        displayPhotos();
        console.log(photos)
    }
    catch(error){
        console.log(error)
    }
}

// Infinite Scrolling 
window.addEventListener("scroll", () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready=false;
        getPhotos();
    }
})


getPhotos(); 