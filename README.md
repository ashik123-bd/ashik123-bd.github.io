# MD ASHIK AHMMED - Personal Portfolio

🌐 **Live Website:** [https://ashik123-bd.github.io/](https://ashik123-bd.github.io/)

This is the source code for the personal and academic portfolio of MD ASHIK AHMMED.

## Structure

- `index.html`: The main HTML file containing all sections (About, Skills, Experience, Projects, etc.).
- `css/style.css`: All the custom styling for the website.
- `js/main.js`: Interactive functionality.
- `assets/`: Contains all images, banners, and documents (like the CV).

## How to Update the Content

The `index.html` file has been organized with clear HTML comments indicating the start and end of major sections. To update content:
1. Open `index.html` in your code editor.
2. Search (`Ctrl + F`) for the section you want to edit. For example, search for `<!-- ABOUT SECTION -->`.
3. Make your text or link changes.

### Updating Images
To replace an image (like your profile picture or a project screenshot), place the new image in the appropriate folder inside `assets/` and update the `src` attribute of the `<img>` tag in `index.html` to point to the new filename.

### Updating the CV
Replace the PDF file inside the `assets/documents/` folder and ensure the download link in `index.html` points to the new file name.

## Deployment

This website is designed to be easily deployed on **GitHub Pages**.
1. Push your changes to the `main` branch.
2. On GitHub, navigate to the repository settings.
3. Click on **Pages** in the left sidebar.
4. Under "Build and deployment", set the source to **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder, then save.
6. Your site will automatically build and go live.
