let pageUrls = {
    about: '/index.html?about',
    contact: '/index.html?contact',
    gallery: '/index.html?gallery',
};

function OnStartUp() {
    popStateHandler();
}

OnStartUp();

document.querySelector('#about-link').addEventListener('click', () => {
    let stateObj = { page: 'about' };
    document.title = 'About';
    history.pushState(stateObj, "about", "?about");
    RenderAboutPage();
});
document.querySelector('#contact-link').addEventListener('click', (event) => {
    let stateObj = { page: 'contact' };
    document.title = 'Contact';
    history.pushState(stateObj, "contact", "?contact");
    RenderContactPage();
});
document.querySelector('#gallery-link').addEventListener('click', (event) => {
    let stateObj = { page: 'gallery' };
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
     <textarea id="message" name="message" required></textarea>    
     <div class="g-recaptcha" data-sitekey="6LdaJx0rAAAAAHjZZnmWBudHWgRG9GQZHOXXzK9z"></div> 
     <button type="submit" class="default-button">Send</button>     
     </form>     
     </div>`;


    document.getElementById('contact-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const nameField = document.getElementById('name');
        const nameRegex = /^[a-zA-Z\s'-]+$/;
        if (!nameRegex.test(nameField.value)) {
            alert('Invalid name. ');
            return;
        }
        const emailField = document.getElementById('email');
        const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
        if (!emailRegex.test(emailField.value)) {
            alert('Invalid Email.');
            return;
        }
        const msgField = document.getElementById('message');
        const msgLen = msgField.value.trim().length;
        if (msgLen < 50 || msgLen > 5000) {
            alert('Message too long or too short.');
            return;
        }
        const recaptchaResponse = grecaptcha.getResponse();
        if (recaptchaResponse.length === 0) {
            alert('Please verify reCaptcha.');
            return;
        }
        alert('Form submitted!');
    });
    if (typeof grecaptcha !== "undefined") {
        grecaptcha.render(document.querySelector('.g-recaptcha'), {
            sitekey: '6LdaJx0rAAAAAHjZZnmWBudHWgRG9GQZHOXXzK9z'
        });
    }

}

function RenderGalleryPage() {
    document.querySelector('main').innerHTML =
        `     <h1 class="title">Gallery Page</h1>   
               <div class="main-image-container"></div> 
               <div class="modal-wrapper">
               <div class="" id="imgModal">
                <img src="https://picsum.photos/id/1/800/480" alt="modal">
                <div class="button-row"><button id="closeModalButton" class="default-button">Close</button></div>
                            
               </div>
               </div>
        `;
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const url = img.dataset.src;

                fetch(url)
                    .then(res => res.blob())
                    .then(blob => {
                        img.src = URL.createObjectURL(blob);
                        obs.unobserve(img);
                    })
                    .catch(err => console.error("Image load failed", err));
            }
        });
    }, {
        rootMargin: "200px",
        threshold: 0.1
    });

    let imgID = 0;
    for (let i = 0; i < 150; i++) {
        let smallImgContainer = document.createElement('div');
        smallImgContainer.classList.add("small-image-container")
        for (let j = 0; j < 3; j++) {
            imgID++;
            let img = document.createElement('img');
            // img.loading = 'lazy';
            img.width = 500;
            img.height = 300;
            img.dataset.id = imgID;
            img.dataset.src = `https://picsum.photos/id/${imgID}/1000/600`;
            img.classList.add("gallery-image")
            smallImgContainer.appendChild(img);
            observer.observe(img);

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
                const imgID = img.dataset.id;
                modalImage.src = `https://picsum.photos/id/${imgID}/800/480`;
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
    if (loc === pageUrls.gallery) {
        RenderGalleryPage();
    }
}

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});


window.onpopstate = popStateHandler;