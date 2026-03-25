"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { label: "Home", href: "/" },
  { label: "My wishlists", href: "/wishlists" },
  { label: "Create", href: "/create" },
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const activeHref = useMemo(() => {
    if (!pathname) return "/";
    if (pathname === "/") return "/";
    return navItems.find((item) => item.href === pathname)?.href ?? "";
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            WD
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              WishDrop
            </span>
            <span className="text-base font-semibold text-slate-900 transition group-hover:text-blue-700">
              Birthday wishlists
            </span>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-slate-900 ${
                activeHref === item.href ? "text-slate-900" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <SignedOut>
            <SignInButton mode="modal">
              <button
                type="button"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
              >
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button
                type="button"
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Sign up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              href="/create"
              aria-label="Create wishlist"
            >
              Create wishlist
            </Link>
            <UserButton />
          </SignedIn>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-slate-300 md:hidden"
          aria-label="Open menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(true)}
        >
          <span className="relative block h-4 w-5">
            <span className="absolute left-0 top-0 h-0.5 w-full rounded bg-current" />
            <span className="absolute left-0 top-1.5 h-0.5 w-full rounded bg-current" />
            <span className="absolute left-0 top-3 h-0.5 w-full rounded bg-current" />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 260 }}
              className="fixed right-0 top-0 z-60 h-full w-80 max-w-[90vw] border-l border-slate-200 bg-white p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Menu
                </span>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
                  aria-label="Close menu"
                  onClick={() => setIsOpen(false)}
                >
                  ×
                </button>
              </div>

              <div className="mt-8 flex flex-col gap-5 text-base font-semibold text-slate-900">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index }}
                  >
                    <Link
                      href={item.href}
                      className="block transition hover:text-blue-700"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-3">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button
                      type="button"
                      className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                    >
                      Sign in
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button
                      type="button"
                      className="w-full rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                    >
                      Sign up
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Link
                    className="w-full rounded-full bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                    href="/create"
                  >
                    Create wishlist
                  </Link>
                  <div className="flex items-center justify-between rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600">
                    Account
                    <UserButton />
                  </div>
                </SignedIn>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
