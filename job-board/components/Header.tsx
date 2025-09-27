// components/Header.tsx
import { NAV_LINKS } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu with Esc key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setAvatarOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  // Focus trap for drawer
  useEffect(() => {
    if (menuOpen && menuRef.current) {
      const focusable =
        menuRef.current.querySelectorAll<HTMLElement>("a, button");
      focusable[0]?.focus();
    }
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Left: Hamburger + Name */}
        <div className="flex items-center space-x-4">
          {/* Hamburger (mobile only) */}
          <button
            className="md:hidden  cursor-pointer"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Image
              src="/assets/icons/menu.svg"
              width={28}
              height={28}
              alt="Hamburger menu"
              className="text-gray-700"
            />
          </button>

          <Link href="/jobs">
            <h1 className="text-xl font-bold cursor-pointer">JobBoardX</h1>
          </Link>
        </div>

        {/* Center (Desktop Links) */}
        <nav
          className="hidden md:flex space-x-6 font-medium text-gray-700"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((nav_link) => (
            <Link
              key={nav_link.link}
              href={nav_link.url}
              className="hover:text-[var(--primary)]"
            >
              {nav_link.link}
            </Link>
          ))}
        </nav>

        {/* Right: Icons */}
        <div className="flex items-center space-x-4">
          {/* Notification */}
          <button
            aria-label="Notifications"
            className="relative cursor-pointer"
          >
            <Image
              src="/assets/icons/notifications-outline.svg"
              width={24}
              height={24}
              alt="Notifications bell"
            />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </button>

          {/* Avatar */}
          <div className="relative">
            <button
              aria-haspopup="true"
              aria-expanded={avatarOpen}
              aria-controls="avatar-menu"
              onClick={() => setAvatarOpen(!avatarOpen)}
              className="w-9 h-9 rounded-full flex items-center justify-center  cursor-pointer"
            >
              <Image
                src="/assets/icons/user-circle.svg"
                width={32}
                height={32}
                alt="Profile avatar/photo"
              />{" "}
              <span className="sr-only">Open user menu</span>
            </button>

            {/* Avatar dropdown */}
            {avatarOpen && (
              <div
                id="avatar-menu"
                role="menu"
                aria-label="User menu"
                className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2"
              >
                <Link
                  href="#"
                  role="menuitem"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile & Settings
                </Link>
                <Link
                  href="/"
                  role="menuitem"
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                  <Image
                    src="/assets/icons/log-out-alt.svg"
                    width={16}
                    height={16}
                    alt="Logout"
                    className="text-gray-700"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide-in Drawer Menu */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      />

      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className={`fixed top-0 left-0 h-full w-70 bg-white shadow-lg transform transition-transform duration-600 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4 py-5 ">
          <span className="text-xl font-bold">JobBoardX</span>
          <button aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            {" "}
            <Image
              src="/assets/icons/close-outline.svg"
              width={24}
              height={24}
              alt="Close X"
            />
          </button>
        </div>

        {/* Drawer Links */}
        <nav
          className="flex flex-col space-y-6 px-4 py-4 font-medium text-gray-700"
          aria-label="Mobile Navigation"
        >
          {NAV_LINKS.map((nav_link) => (
            <Link
              key={nav_link.link}
              href={nav_link.url}
              className="hover:text-[var(--primary)]"
              onClick={() => setMenuOpen(false)}
            >
              {nav_link.link}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
