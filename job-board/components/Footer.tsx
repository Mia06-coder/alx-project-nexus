import Link from "next/link";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="bg-[#111827] text-gray-300 py-8 mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left: App name */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold text-white">JobBoardX</h2>
            <p className="text-sm text-gray-400">
              Where employers meet exceptional candidates and job seekers
              discover roles that truly match their skills and aspirations.
            </p>
          </div>

          {/* Social links */}
          <nav aria-label="Social media">
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)] rounded"
                  aria-label="Visit our Twitter"
                >
                  <FaTwitterSquare className="w-6 h-6" />
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)] rounded"
                  aria-label="Visit our LinkedIn"
                >
                  <FaLinkedin className="w-6 h-6" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs gap-2">
          <p className="text-gray-400">
            © {new Date().getFullYear()} JobBoardX. All rights reserved.
          </p>

          <div className="flex space-x-2 items-center">
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <p>|</p>
            <Link href="#" className="hover:text-white">
              Terms & Conditions
            </Link>
          </div>
          <p className="text-gray-400">
            Designed and built by{" "}
            <Link
              href="https://linkedin.com/in/mia-mudzingwa"
              target="blank"
              className="text-white font-medium hover:underline hover:underline-offset-2"
            >
              Mia Mudzingwa
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
