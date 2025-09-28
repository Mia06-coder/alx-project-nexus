# Job Board Platform

An interactive job board platform built with **Next.js**, **Tailwind CSS**, and modern front-end practices.

The platform connects **job seekers** with **employers**, offering an accessible, responsive, and user-friendly experience.

![Landing Page](/job-board/public/assets/images/screenshots/landing.png)

![Job Details](/job-board/public/assets/images/screenshots/applied.png)

![404](/job-board/public/assets/images/screenshots/not-found.png)

## Features

- Responsive header with navigation, notifications, and user menu
- Responsive footer with branding, social links, and designer credits
- Reusable UI components: **Pill**, **Button**, **Search Bar**, **JobCard**
- Landing page with:
  - **Recently Posted Jobs**
  - **Popular Jobs**
  - **Search bar and filter UI** (non-functional for now)
  - **Carousel with arrow disabling** (fades/disables when at start or end of scroll for smoother navigation)
  - **Filter drawer** with:
    - Framer Motion animations
    - React Select searchable dropdowns
  - **Search results handling**:
    - Jobs displayed in a grid layout
    - No Jobs Found component with illustration + reset filters button
    - Reset button in filter bar
- **Job Details Page**:
  - Company logo & name
  - Share, Apply, and Save actions
  - Meta details
  - Carousel of more jobs from the same company
  - Similar jobs recommendations
  - **Application Modal**:
    - Full name, email, phone, resume upload, interests
    - Built with **react-dropzone**, **@headlessui/react**, **react-phone-number-input**
- Empty States
  - Reusable `EmptyState` component for:
    - No saved jobs
    - No applications
    - No search results
- Jobs Display
  - `JobsGrid` with consistent layout and Load More button
  - `JobsSection` with title, subtitle, and embedded job grid
  - `PageHeader` for consistent page titles and context

---

## Tech Stack

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Google Fonts](https://img.shields.io/badge/Poppins-Font-4285F4?style=for-the-badge&logo=googlefonts&logoColor=white)](https://fonts.google.com/specimen/Poppins)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![React Select](https://img.shields.io/badge/React_Select-087EA4?style=for-the-badge&logo=react&logoColor=white)](https://react-select.com/)
[![Headless UI](https://img.shields.io/badge/Headless_UI-111827?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://headlessui.com/)
[![React Dropzone](https://img.shields.io/badge/React_Dropzone-FF4081?style=for-the-badge&logo=react&logoColor=white)](https://react-dropzone.js.org/)
[![React Phone Number Input](https://img.shields.io/badge/React_Phone_Input-0A66C2?style=for-the-badge&logo=react&logoColor=white)](https://github.com/catamphetamine/react-phone-number-input)

---

## API Endpoints

### Jobs

- `GET /api/jobs` → Fetch job listings
- `GET /api/jobs/:id` → Fetch job details
- `POST /api/jobs` → Create a new job (employer only)

### Applications

- `POST /api/applications` → Submit application (resume + cover letter)
- `GET /api/applications/:userId` → Fetch user applications

### Favorites

- `POST /api/favorites/:jobId` → Add to favorites
- `DELETE /api/favorites/:jobId` → Remove from favorites
- `GET /api/favorites` → Fetch user favorites

### Auth

- `POST /api/register` → Register user
- `POST /api/login` → Login user

---

## Design Choices

- **Typography**: Poppins (Google Fonts)
- **Brand Colors**:

  - `#2563eb` – Primary(blue)
  - `#10B981` – secondary(green)
  - `#f59e0b` – Accent(amber)
  - `#f9fafb` - Light background

---

## Progress & Roadmap

### ✅ Completed

- Job listings & details pages
- Favorites system (with caching & optimistic UI)
- API integration for jobs & reviews

### 🚧 In Progress

- Employer dashboards
- Application tracking UI
- Resume/Cover letter upload (validation)
- Authentication (register/login)

### 🔜 Roadmap

- AI-driven job recommendations
- Advanced employer analytics
- Mobile app version
- Premium listings (monetization)

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit changes with semantic messages
4. Open a Pull Request

---

## License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## Contact

Made with ❤️ by **Mia Mudzingwa**

- GitHub: [Mia06-coder](https://github.com/Mia06-coder)
- LinkedIn: [mia-mudzingwa](https://www.linkedin.com/in/mia-mudzingwa)

In collaboratin with [Ian Rioba](https://www.linkedin.com/in/rioba-ian-felix)
