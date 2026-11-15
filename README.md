# Dharmika Janvar — Portfolio

Responsive, static portfolio website built with HTML, CSS and vanilla JavaScript. No build step, external library, paid API or backend is required.

## Before publishing

- **Education:** M.Tech in Computer Engineering, RK University, completed May 2026.
- **GitHub:** replace the placeholder profile URL in the contact section of `index.html` with the correct profile before publishing. No account URL was supplied.
- **Skills:** no proficiency ratings are claimed. The listed skills reflect the supplied résumé.
- **Interests:** AI, data analytics, cybersecurity, networking, IoT, cloud, robotics and automation are presented as areas of interest.
- **Résumé:** `assets/dharmika-janvar-resume.pdf` is the updated one-page résumé. Check contact details and all content before sharing.

## Preview locally

Open `index.html` in a browser. For a local web server, run from this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a public repository named `YOUR-GITHUB-USERNAME.github.io` (replace with your GitHub username).
2. Upload the contents of this folder to the repository root. Keep `index.html`, `styles.css`, `script.js`, `README.md` and the `assets/` folder together.
3. In the repository, open **Settings → Pages**. Set the build source to **Deploy from a branch**, choose `main` and `/ (root)`, then save.
4. After GitHub Pages finishes deploying, open `https://YOUR-GITHUB-USERNAME.github.io`.
5. Check the page and downloaded résumé on desktop and phone; update the GitHub placeholder before publishing.

All website asset references are relative, so the site can also be deployed under a repository path. The contact form uses `mailto:` and opens the visitor’s configured email app; it does not store or send form data to a server.

## Files

- `index.html` — semantic page content and metadata
- `styles.css` — responsive layout, colors, motion and accessibility states
- `script.js` — skill/project filters, navigation, contact form and intro panel
- `assets/dharmika-janvar-resume.pdf` — updated one-page résumé
- `assets/dharmika-janvar-portfolio.pdf` — updated portfolio overview
- `assets/favicon.svg` — site icon
