# B-Health Solutions LLC — Website

A 10-page static site (no build step required): Home, About Us, Services, Primary Care,
House Calls, Foot Care, Sleep Study Services, Telemedicine, New Patients, Contact Us.

## Preview locally

```
cd "B-Health Solutions Website"
python3 -m http.server 8000
```

Then open http://localhost:8000 in a browser.

## Before this goes live

1. **Connect the forms.** The New Patients request form and the Contact Us form post to
   `https://formspree.io/f/YOUR_FORM_ID` as a placeholder. Create a free account at
   formspree.io, create a form, and replace `YOUR_FORM_ID` in `new-patients.html` and
   `contact.html` with your real endpoint so submissions reach your inbox. (Any similar
   form backend — Netlify Forms, Basin, etc. — works too; just swap the `action` URL.)
2. **Add real social links.** Facebook/Instagram icons in the header and footer currently
   link to `#` as placeholders — drop in your real profile URLs.
3. **Confirm the second phone number.** Your notes listed a second number
   (469-648-3426) without a label (fax? alternate line?). The site currently only
   displays 469-648-3475 everywhere. Let me know what the second number is for and I'll
   add it.
4. **Domain + hosting.** Once you pick a domain, this folder can be deployed as-is to
   any static host (Netlify, Vercel, GitHub Pages, Bluehost, etc.) — just upload the
   contents of this folder.

## Structure

- `index.html`, `about.html`, `services.html`, `primary-care.html`, `house-calls.html`,
  `foot-care.html`, `sleep-study.html`, `telemedicine.html`, `new-patients.html`,
  `contact.html`
- `css/style.css` — shared design system (colors, type, components)
- `js/main.js` — mobile nav, scroll reveals, FAQ accordion, form handling
- `images/` — logo and generated icon/favicon variants cropped from `Logo.png`
