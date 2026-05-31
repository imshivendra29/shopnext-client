import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      {/* Main Footer */}
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
            Shop<span className="text-amber-500">Next</span>
          </h2>

          <p className="mt-5 leading-7 text-zinc-500">
            Modern scalable ecommerce platform focused on premium UI,
            performance, and production-ready architecture.
          </p>

          {/* Social Icons */}
          <div className="mt-6 flex items-center gap-4">
            <button className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 transition hover:bg-zinc-100">
              <FaFacebookF size={16} />
            </button>

            <button className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 transition hover:bg-zinc-100">
              <FaInstagram size={16} />
            </button>

            <button className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 transition hover:bg-zinc-100">
              <FaTwitter size={16} />
            </button>

            <button className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 transition hover:bg-zinc-100">
              <FaGithub size={16} />
            </button>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900">
            Company
          </h3>

          <div className="mt-5 flex flex-col gap-3 text-zinc-500">
            <Link href="/">About Us</Link>
            <Link href="/">Careers</Link>
            <Link href="/">Blog</Link>
            <Link href="/">Contact</Link>
          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900">
            Support
          </h3>

          <div className="mt-5 flex flex-col gap-3 text-zinc-500">
            <Link href="/">Help Center</Link>
            <Link href="/">Shipping</Link>
            <Link href="/">Returns</Link>
            <Link href="/">Privacy Policy</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900">
            Contact
          </h3>

          <div className="mt-5 space-y-3 text-zinc-500">
            <p>imshivendra29@gmail.com</p>

            <p>+91 8303729968</p>

            <p>Noida, In</p>
          </div>

          {/* CTA */}
          <button className="mt-6 rounded-2xl bg-[#0B1220] px-6 py-3 text-sm font-medium text-white transition hover:bg-black">
            Contact Us
          </button>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-zinc-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-zinc-500 md:flex-row">
          <p>© 2026 ShopNext. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/">Terms</Link>

            <Link href="/">Privacy</Link>

            <Link href="/">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}