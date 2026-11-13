# NetAcad Learning Hub

An independent, responsive course-discovery website featuring **Gateway to Networking 2026**: six free self-paced Cisco Networking Academy course links for aspiring network professionals.

## Features
- Responsive landing page
- JSON-driven course catalog
- Search by course title, description and topic
- Category and level filters
- Suggested learning paths
- Paid courses marked as coming soon
- Light/dark theme toggle
- Direct links to official course pages
- No backend or build step required

## Run locally
Because the catalog is loaded using `fetch`, run the site through a local web server rather than opening `index.html` directly. For example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy with GitHub Pages
1. Create a public repository named `netacad-learning-hub`.
2. Upload the contents of this project to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select `main` and `/ (root)`, then save.
6. After deployment, visit `https://YOUR-USERNAME.github.io/netacad-learning-hub/`.

## Add or update courses
Edit `data/courses.json`. Each course has an ID, title, category, level, type, provider, official URL, status, description and tags. Keep the course URL linked to the provider's official enrollment page and verify availability before publishing.

## Project structure
- `index.html` — homepage
- `assets/css/style.css` — responsive design and themes
- `assets/js/app.js` — course rendering, search, filters and theme
- `data/courses.json` — course catalog
- `pages/disclaimer.html` — independent-resource and trademark notice

## Attribution and disclaimer
This is an independent educational resource, not an official Cisco website and not affiliated with, endorsed by, or sponsored by Cisco. Cisco and Cisco Networking Academy marks belong to their respective owners. Course materials are not hosted or redistributed here.

## License
The original website code is made available under the MIT License. This license does not grant rights to third-party trademarks, course materials, logos or other third-party intellectual property.
