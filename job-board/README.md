# Job Board Platform

An interactive job board platform built with **Next.js**, **Tailwind CSS**, and modern front-end practices.

The platform connects **job seekers** with **employers**, offering an accessible, responsive, and user-friendly experience.

![Landing Page](/job-board/public/assets/images/screenshots/landing.png)

---

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

---

## Tech Stack

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Google Fonts](https://img.shields.io/badge/Poppins-Font-4285F4?style=for-the-badge&logo=googlefonts&logoColor=white)](https://fonts.google.com/specimen/Poppins)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

---

## Setup & Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mia06-coder/job-board.git
   cd job-board
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Design Choices

- **Typography**: Poppins (Google Fonts)
- **Brand Colors**:

  - `#2563eb` – Primary(blue)
  - `#10B981` – secondary(green)
  - `#f59e0b` – Accent(amber)
  - `#f9fafb` - Light background

---

## Project Structure

```bash
.
├── pages/          # Next.js pages
├── components/     # Reusable UI components
├── styles/         # Global & Tailwind styles
├── public/         # Static assets
└── README.md       # Project documentation
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit changes with semantic messages
4. Open a Pull Request

---

## License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.
