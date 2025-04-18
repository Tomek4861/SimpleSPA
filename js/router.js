let pageUrls = {
    about: '/index.html?about',
    contact: '/index.html?contact'
};

function OnStartUp() {
    popStateHandler();
}

OnStartUp();

document.querySelector('#about-link').addEventListener('click', (event) => {
    let stateObj = {page: 'about'};
    document.title = 'About';
    history.pushState(stateObj, "about", "?about");
    RenderAboutPage();
});
document.querySelector('#contact-link').addEventListener('click', (event) => {
    let stateObj = {page: 'contact'};
    document.title = 'Contact';
    history.pushState(stateObj, "contact", "?contact");
    RenderContactPage();
});
document.querySelector('#gallery-link').addEventListener('click', (event) => {
    let stateObj = {page: 'gallery'};
    document.title = 'Gallery';
    history.pushState(stateObj, "Gallery", "?gallery");
    RenderGalleryPage();
});

function RenderAboutPage() {
    document.querySelector('main').innerHTML = `
     <h1 class="title">About Me</h1>
     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>`;
}

function RenderContactPage() {
    document.querySelector('main').innerHTML = `
     <h1 class="title">Contact with me</h1>
     <div class="contact-form-container">
     <form id="contact-form">
     <label for="name">Name:</label>
     <input type="text" id="name" name="name" required>
     <label for="email">Email:</label>
     <input type="email" id="email" name="email" required>
     <label for="message">Message:</label>
     <textarea id="message" name="message" required></textarea>     <button type="submit" class="default-button">Send</button>     </form>     </div>`;
    document.getElementById('contact-form').addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Form submitted!');
    });
}

function RenderGalleryPage() {
    document.querySelector('main').innerHTML =
        `     <h1 class="title">Gallery Page</h1>   
               <div class="main-image-container"></div> 
               <div class="modal-wrapper">
               <div class="" id="imgModal">
                <img src="https://picsum.photos/id/1/1000/600" alt="modal">
                <div class="button-row"><button id="closeModalButton" class="default-button">Close</button></div>
                            
               </div>
               </div>
        `;
    let imgID = 0;
    for (let i = 0; i < 15; i++) {
        let smallImgContainer = document.createElement('div');
        smallImgContainer.classList.add("small-image-container")
        for (let j= 0; j < 3; j++){
            imgID++;
            let img = document.createElement('img');
            img.src = `https://picsum.photos/id/${imgID}/1000/600`;
            img.width = 500;
            img.loading = 'lazy';
            img.classList.add("gallery-image")
            smallImgContainer.appendChild(img);
        }
        document.querySelector('.main-image-container').appendChild(smallImgContainer);

    }
    document.getElementById('closeModalButton').addEventListener('click', () => {
        document.querySelector('.modal-wrapper').classList.remove("show")

    })

    document.querySelectorAll('.gallery-image').forEach(
        img => {
            img.addEventListener("click", () => {
                    const modalImage = document.querySelector("#imgModal img");
                    const urlParts = img.src.split("/");
                    const imgID = urlParts[4];
                    modalImage.src = `https://picsum.photos/id/${imgID}/1000/600`;
                    document.querySelector(".modal-wrapper").classList.add("show")
                }

            )
        }
    )
    document.querySelector(".modal-wrapper").addEventListener("click", (e) => {
        if (e.target === e.currentTarget) {
            document.querySelector('.modal-wrapper').classList.remove("show")
        }
    });




}

function popStateHandler() {
    let loc = window.location.href.toString().split(window.location.host)[1];
    if (loc === pageUrls.contact) {
        RenderContactPage();
    }
    if (loc === pageUrls.about) {
        RenderAboutPage();
    }
}

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});


window.onpopstate = popStateHandler;