
# SimpleSPA

A simple Single Page Application (SPA) built for a Cloud Programming lab. This project shows how to make basic SPA routing in pure JavaScript, a contact form with reCAPTCHA, a responsive image gallery with lazy loading, and a dark mode toggle.

**Live demo:**

* [GitHub Pages](https://tomek4861.github.io/SimpleSPA/)
* [Azure Static Web Apps](https://chmurylab.z36.web.core.windows.net/)

## Features

* **SPA navigation** – No page reloads between "About", "Gallery", and "Contact".
* **Contact form** – Basic validation and Google reCAPTCHA.
* **Image gallery** – 150+ random images from [Picsum API](https://picsum.photos/), loaded with IntersectionObserver for lazy loading.
* **Modal view** – Click any image to enlarge.
* **Dark mode** – Toggle between light and dark themes.
* **Responsive design** – Works on desktop and mobile.

## Main Files

* `index.html` – App entry point and basic layout
* `js/router.js` – Handles navigation and rendering
* `style.css` – Styles, including dark mode and responsive tweaks

## Notes

* **Form validation and reCAPTCHA are client-side only (no backend)**
* Some images in the gallery might not load (depends on the Picsum API).
* All main browsers and screen sizes tested via browser dev tools.

## Quick Preview

* ![Home Page](https://github.com/user-attachments/assets/54a3df1c-513e-4328-9f76-b2f4c401d9b1)
* ![Gallery Page](https://github.com/user-attachments/assets/62057655-5333-43b3-a525-7bd9485f7804)
* ![Gallery Page Modal](https://github.com/user-attachments/assets/9fb187bc-90aa-49ad-8151-212278cc8fdc)
* ![Contact Page](https://github.com/user-attachments/assets/3479b344-f5f5-4d8e-9b71-b5f8f3a84421)



## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
