Rakshan CH — 3D Portfolio

A clean, interactive developer portfolio highlighting my work, skills, and experience.

Highlights
- 3D hero section with smooth animations and lighting
- Projects showcase (E‑commerce Platform, Social Media REST API, Customizable AI Agent)


Tech Stack
- React 19, Vite 6
- Three.js, @react-three/fiber, @react-three/drei, @react-three/postprocessing
- GSAP (animations)
- Tailwind CSS (via @tailwindcss/vite)


Live Demo
- Portfolio: `https://portfolio-rakshan.vercel.app/`

Getting Started
1) Install dependencies: `npm install`
2) Run locally: `npm run dev`
3) Build production: `npm run build`

Environment Variables
Create a `.env` in the project root:
```
VITE_APP_EMAILJS_SERVICE_ID=your_service_id
VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id
VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

Project Structure (key parts)
```
src/
  components/
    models/            # 3D scenes & effects (hero, tech cards, contact)
  sections/            # Page sections (Hero, Projects, Experience, Skills, Contact)
  constants/           # Content data (experience, projects, socials)
```

Available Scripts
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint



