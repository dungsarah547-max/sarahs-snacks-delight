"use client";

import Image from "next/image";
import React, { useState } from "react";
import Barcode from "react-barcode";

interface Product {
  name: string;
  price: string;
  description: string;
  image: string;
}

const products: Product[] = [
  {
    name: "Chin-Chin",
    price: "₦1,500 (Bottle) · ₦200 / ₦100 Packs",
    description: "Crunchy, golden, and freshly made for every moment.",
    image: "/images/chin-chin.jpg",
  },
  {
    name: "Zobo Drink",
    price: "₦1,500 (Big Bottle) · ₦500 (Small)",
    description: "Refreshing, natural, and perfectly sweetened.",
    image: "/images/zobo.jpg",
  },
  {
    name: "Tiger Nuts",
    price: "₦1,500 · ₦1,000 · ₦500",
    description: "Nutritious, chewy, and naturally satisfying.",
    image: "/images/tigernuts.jpg",
  },
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <main
      className={`min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-neutral-900 text-neutral-100" : "bg-[#FFF8F1] text-neutral-900"
      }`}
    >
      {/* HEADER */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-bold tracking-wide">
          Sarah’s Snacks Delight
        </h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-full text-sm font-semibold border transition hover:scale-105"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Premium Homemade Snacks, <br />
            Crafted With Love ❤️
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8">
            We deliver freshly made Nigerian snacks using quality ingredients, trusted recipes, and consistent taste — every single time.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/2347062319517"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
            >
              Order on WhatsApp
            </a>
            <span className="px-6 py-3 rounded-xl border font-medium">
              Nationwide Delivery 🌍
            </span>
          </div>
        </div>
        <Image
          src="/images/hero.jpg"
          alt="Sarah’s Snacks Delight"
          width={600}
          height={450}
          priority
          className="rounded-3xl shadow-2xl object-cover"
        />
      </section>

      {/* PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">
          Our Best Sellers
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <div
              key={product.name}
              className="bg-white dark:bg-neutral-800 rounded-3xl shadow-lg p-6 text-center hover:shadow-2xl transition"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={220}
                className="rounded-2xl mb-5 mx-auto object-cover"
              />
              <h4 className="text-xl font-bold mb-2">{product.name}</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-3">{product.description}</p>
              <p className="font-semibold text-lg mb-4">{product.price}</p>

              {/* Barcode */}
              <Barcode
                value={product.name.replace(/\s/g, "")}
                format="CODE128"
                width={1.5}
                height={50}
                displayValue={false}
                background={darkMode ? "#1f2937" : "#fff"}
                lineColor={darkMode ? "#fff" : "#000"}
              />
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-orange-500 text-white py-16 mt-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h4 className="text-3xl font-bold mb-4">
            Ready to Taste the Difference?
          </h4>
          <p className="mb-8 text-lg">
            Scan the QR or message us directly to place your order today.
          </p>
          <div className="flex justify-center">
            <Image
              src="/images/whatsapp-qr.jpg"
              alt="WhatsApp QR Code"
              width={160}
              height={160}
              className="rounded-xl bg-white p-2"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-8 text-sm text-neutral-600 dark:text-neutral-400">
        © {new Date().getFullYear()} Sarah’s Snacks Delight. All rights reserved.
      </footer>
    </main>
  );
}
