"use client";

import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900/80 sticky top-0 z-50 select-none">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <img
            src="https://static.vecteezy.com/system/resources/previews/016/012/682/non_2x/eraser-creative-icon-design-free-vector.jpg"
            alt="PixErase Logo"
            width={30}
            height={30}
            className="rounded-full border border-zinc-800"
          />
          <span className="font-bold text-lg tracking-tight select-none">
            <span className="text-teal-500">Pix</span>
            <span className="text-zinc-300">Erase</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav aria-label="Global" className="hidden md:flex items-center gap-6 text-sm font-semibold text-zinc-400">
          <a href="#features" className="hover:text-zinc-200 transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-zinc-200 transition-colors">
            How It Works
          </a>
          <a href="#showcase" className="hover:text-zinc-200 transition-colors">
            Showcase
          </a>
        </nav>

        {/* Register Button Only */}
        <div className="flex items-center shrink-0">
          <RegisterLink>
            <span className="block rounded-lg bg-violet-600 hover:bg-violet-500 active:bg-violet-700 px-5 py-2 text-sm font-bold text-white transition-all duration-200 shadow-md shadow-violet-950/20 cursor-pointer">
              Register
            </span>
          </RegisterLink>
        </div>
      </div>
    </header>
  );
};

export default Header;