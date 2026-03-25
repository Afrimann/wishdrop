"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const features = [
  {
    title: "No duplicate gifts",
    description:
      "Friends can see what is already claimed, so every gift is unique.",
  },
  {
    title: "Simple shareable link",
    description: "Send one clean link to anyone, no accounts required.",
  },
  {
    title: "Real-time gift claiming",
    description: "Instant updates keep everyone in sync as gifts get picked.",
  },
  {
    title: "Clean wishlist pages",
    description: "A polished, distraction-free layout that feels premium.",
  },
];

const steps = [
  {
    title: "Create your wishlist",
    description: "Add items in seconds and set the sizes or preferences.",
  },
  {
    title: "Share your link",
    description: "Invite friends with one URL - no awkward coordination.",
  },
  {
    title: "Friends claim gifts",
    description: "They claim what they will get, keeping it private and clear.",
  },
];

const wishlistItems = [
  { name: "Leather journal", price: "$28", claimed: false },
  { name: "Wireless earbuds", price: "$119", claimed: true },
  { name: "Coffee grinder", price: "$64", claimed: false },
  { name: "Weekend duffel", price: "$145", claimed: true },
  { name: "Ceramic pour-over", price: "$32", claimed: false },
  { name: "Book: Design Notes", price: "$22", claimed: false },
];

const previewItems = [
  { name: "Minimalist watch", price: "$210", claimed: true },
  { name: "Studio headphones", price: "$180", claimed: false },
  { name: "Soft throw blanket", price: "$72", claimed: false },
  { name: "Desk lamp", price: "$55", claimed: true },
  { name: "Art prints (set of 3)", price: "$48", claimed: false },
  { name: "Travel camera strap", price: "$39", claimed: false },
  { name: "Ceramic mug set", price: "$36", claimed: true },
  { name: "Premium notebook", price: "$18", claimed: false },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main>
        <Hero />
        <SocialProof />
        <HowItWorks />
        <Features />
        <ProductPreview />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="flex flex-col gap-6"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600"
          >
            WishDrop
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            Create your birthday wishlist. Let friends claim your gifts.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="max-w-xl text-lg leading-relaxed text-slate-600"
          >
            Share a simple link. Friends pick what to get you - no duplicates,\r?\n            no guesswork.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Link
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              href="/create"
              aria-label="Start your wishlist"
            >
              Start your wishlist
            </Link>
            <button
              className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
              type="button"
              aria-label="View demo"
            >
              View demo
            </button>
          </motion.div>
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {["A", "J", "M", "R"].map((letter) => (
                <div
                  key={letter}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white bg-slate-100 text-xs font-semibold text-slate-600"
                  aria-hidden="true"
                >
                  {letter}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500">
              2,400+ wishlists created this month
            </p>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Emma's Wishlist
              </p>
              <h3 className="text-lg font-semibold text-slate-900">
                Birthday 2026
              </h3>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              6 items
            </span>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {wishlistItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-medium text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.price}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.claimed
                      ? "bg-slate-100 text-slate-500"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {item.claimed ? "Claimed" : "Available"}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 px-4 py-5 text-center text-sm text-slate-500">
            Add another item
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="border-y border-slate-200/70 bg-slate-50/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center lg:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          Trusted by users planning smarter birthdays
        </p>
        <div className="flex flex-wrap gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-slate-900">98%</span>
            <span>claim accuracy</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-slate-900">40k+</span>
            <span>gifts coordinated</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-slate-900">4.9</span>
            <span>average rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-10">
      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          How it works
        </p>
        <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
          Three simple steps to a stress-free birthday.
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-slate-600">
          Build your list, share the link, and let friends handle the rest.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="rounded-3xl border border-slate-200 bg-white p-6"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-sm font-semibold text-blue-700">
                {index + 1}
              </span>
              <h3 className="text-lg font-semibold text-slate-900">
                {step.title}
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  return (
    <section
      id="features"
      className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-10"
    >
      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Features
        </p>
        <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
          Everything you need to plan smarter.
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-slate-600">
          Designed for clarity, speed, and a beautiful gifting experience.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              {feature.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductPreview() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-10">
      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Product preview
        </p>
        <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
          A refined wishlist experience.
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-slate-600">
          Friends see what is available, you see what is claimed - and everyone\r?\n          stays in sync.
        </p>
      </div>
      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Wishlist
            </p>
            <h3 className="text-lg font-semibold text-slate-900">
              Nora's 30th Birthday
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              Public link
            </span>
            <span className="text-sm text-slate-500">8 items</span>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {previewItems.map((item) => (
            <div
              key={item.name}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 p-4"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {item.name}
                </p>
                <p className="mt-1 text-xs text-slate-500">{item.price}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-500">Status</span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.claimed
                      ? "bg-slate-100 text-slate-500"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {item.claimed ? "Claimed" : "Available"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="bg-slate-50/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-16 text-center lg:px-10">
        <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
          Make your next birthday effortless.
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-slate-600">
          Build a wishlist that feels thoughtful, organized, and easy to share.
        </p>
        <button
          className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          type="button"
          aria-label="Create your wishlist"
        >
          Create your wishlist
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="faq" className="border-t border-slate-200">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between lg:px-10">
        <span className="text-lg font-semibold text-slate-900">WishDrop</span>
        <div className="flex flex-wrap gap-6 text-sm text-slate-500">
          <a className="transition hover:text-slate-900" href="#features">
            Features
          </a>
          <a className="transition hover:text-slate-900" href="#how-it-works">
            How it Works
          </a>
          <a className="transition hover:text-slate-900" href="#faq">
            FAQ
          </a>
          <span className="text-slate-400">(c) 2026 WishDrop</span>
        </div>
      </div>
    </footer>
  );
}
