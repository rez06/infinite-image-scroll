const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;

//Unsplash API
let initialCount = 5;
const apiKey = 'E-LdUNKw-ydRqmefYYJG0Cr_qK7L2WjU2UBdQvaykCo';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;


function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}
  
//Check if all imags are loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}
    //Helper function to set Attributes on DOM elements
    function setAttribute(element, attributes) {
        for (const key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
    }

    //Create Elements for Links and Photos, Add to DOM
function displayPhotos() {
        imagesLoaded = 0;
        totalImages = photosArray.length;
        //run function for each object in PhotosArray
        photosArray.forEach((photo) => {
            //Create <a> to link to Unplash
            const item = document.createElement('a');
            setAttribute(item, {
                href: photo.links.html,
                target: '_blank',
            });
            //create <img> for photo
            const img = document.createElement('img');
            setAttribute(img, {
                src: photo.urls.regular,
                alt: photo.alt_description,
                title: photo.alt_description,
            });
            //Event listener, check when each image is finished loading
            img.addEventListener('load', imageLoaded);
            //Put <img> inside <a>, then put both inside imageContainer Element
            item.appendChild(img);
            imageContainer.appendChild(item);
        });
    }
    //Get photos from Unsplash API
    async function getPhotos() {
        try {
            const response = await fetch(apiUrl);
            photosArray = await response.json();
            displayPhotos();
            if (isInitialLoad) {
                updateAPIURLWithNewCount(30)
                isInitialLoad = false
            }
        } catch (error) {
            //Catch error here
        }
    }

    //Check to see if scrolling near bottom of page, Load More Photo
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
            ready = false;
            getPhotos();
        }
    });

    //on Load
    getPhotos();

