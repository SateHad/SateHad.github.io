# sate.haddadin — portfolio

Source for my personal portfolio site: [satehaddadin.com](https://satehaddadin.com)

Static site hosted on GitHub Pages. No build step.

## Stack
HTML, Tailwind CSS (CDN), GSAP for animation, marked + DOMPurify for
rendering project READMEs, Panzoom for the architecture viewer.

## Structure
- `index.html` — main page
- `projects.html` — full project list, loaded from `projects.json`
- `neurolink.html` — interactive architecture blueprint
- `Projects/<folder>/README.md` — each project's README, the single source
  of truth, rendered on the site when a project card is clicked

## Adding a project
1. Add `Projects/<folder>/README.md`
2. Add an entry to `projects.json` with `"repo_folder": "<folder>"`
3. Share it at `projects.html#<folder>`

## License
All rights reserved. See [LICENSE](LICENSE). The code is public for viewing
only; please don't copy or reuse it without permission.
