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
Run through a local web server because the course catalog is loaded with fetch:
```bash
python -m http.server 8000
```
Then open http://localhost:8000.

## Deploy with GitHub Pages
1. Open **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select `main` and `/(root)`, then save.
4. Visit https://anindya23sarkar.github.io/netacad-learning-hub/ after deployment.

## Add or update courses
Edit `data/courses.json`. Verify course availability and details on the official provider page before publishing.

## Disclaimer
This is an independent educational resource, not an official Cisco website and not affiliated with, endorsed by, or sponsored by Cisco. Cisco and Cisco Networking Academy marks belong to their respective owners. Course materials are not hosted or redistributed here.

## License
Original website code is made available under the MIT License. This does not grant rights to third-party trademarks, course materials, logos or other third-party intellectual property.