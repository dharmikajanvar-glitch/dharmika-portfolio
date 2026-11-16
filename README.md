# Dharmika Sisodiya — Portfolio

A responsive, static portfolio site using HTML, CSS, and vanilla JavaScript. It has a dark-first theme with a light-mode toggle, accessible mobile navigation, project filters, reduced-motion support, and small pointer interactions. There is no build step or required third-party library.

## Before publishing

- Review the email, phone number, LinkedIn, GitHub, WhatsApp, education, and experience details.
- The résumé supplied no headshot, project screenshots, project-specific live demos/repositories, or certificate entries. The profile monogram and project preview artwork are design placeholders—not a photograph or screenshots of delivered work. Replace them with genuine assets/links when available; do not present the visual concepts as project evidence.
- Skills are not given percentage ratings because the source did not establish proficiency levels. AI, analytics, cybersecurity, networking, and cloud are labeled as learning interests.
- The contact form validates its fields and opens the visitor's email app with a prepared message. It does not submit to or store data on a server. To receive messages without an email app, add a real form endpoint and update the submit handler in `script.js`.
- Résumé: `assets/dharmika-sisodiya-resume.pdf`.
- Portfolio overview: `assets/dharmika-sisodiya-portfolio.pdf`.
- Published URL in metadata: `https://dharmikajanvar-glitch.github.io/dharmika-portfolio/`.

## Add a verified project

Duplicate a `.project-card` in `index.html`. Keep `data-category` as `embedded`, `software`, or `digital` (or add a matching filter), replace the summary and tags with verified details, and use only real demo/repository URLs. Replace the decorative preview with a genuine screenshot when you have permission to share it.

## Add a profile photo or certificates

Replace the `.profile-monogram` element in `index.html` with a portrait you provide, with descriptive alternative text. Add certificate cards only for credentials you have actually earned; no certificate records were present in the supplied résumé.

## Preview locally

Open `index.html` in a browser, or start a server in this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Upload this folder's contents to the `dharmika-portfolio` repository under `dharmikajanvar-glitch`.
2. In **Settings → Pages**, select **Deploy from a branch**, choose `main` and `/ (root)`, then save.
3. After deployment, check links, the résumé, theme toggle, and contact flow on desktop and mobile.

All asset references are relative, so the site works from a repository path. The selected theme is saved locally when browser storage is available.
