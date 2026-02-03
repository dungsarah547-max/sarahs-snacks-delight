"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Barcode from "react-barcode"; // npm install react-barcode

interface Product {
  name: string;
  price: string;
  description: string;
  image: string;
}

const products: Product[] = [
  { name: "Chin-Chin", price: "₦1,500 / bottle, ₦200/₦100 pack", description: "Crunchy, golden.", image: "/images/chin-chin.svg" },
  { name: "Zobo", price: "₦1,500 / ₦500 per bottle", description: "Refreshing and sweet.", image: "/images/zobo.svg" },
  { name: "Tiger Nuts", price: "₦1,500 / ₦1,000 / ₦500", description: "Nutritious and chewy.", image: "/images/tigernuts.svg" },
];

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [mouseSparks, setMouseSparks] = useState<any[]>([]);

  useEffect(() => {
    setLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const newSpark = {
      x: e.clientX + Math.random() * 20 - 10,
      y: e.clientY + Math.random() * 20 - 10,
      size: Math.random() * 3 + 2,
      opacity: Math.random() * 0.6 + 0.4,
      id: Date.now() + Math.random(),
    };
    setMouseSparks(prev => [...prev, newSpark]);
    setTimeout(() => {
      setMouseSparks(prev => prev.filter(s => s.id !== newSpark.id));
    }, 800);
  };

  return (
    <main className={`${darkMode ? "bg-gray-900 text-white" : "bg-yellow-50 text-gray-900"} relative min-h-screen flex flex-col items-center font-sans p-6 transition-colors duration-500 overflow-hidden`}>

      {/* Sparkles */}
      {mouseSparks.map(spark => (
        <div
          key={spark.id}
          className="absolute bg-white rounded-full pointer-events-none animate-fadeSpark"
          style={{
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            top: spark.y,
            left: spark.x,
            opacity: spark.opacity,
            zIndex: 50,
          }}
        />
      ))}

      {/* Animated gradient backgrounds */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className={`w-[200%] h-[200%] rounded-full bg-gradient-to-tr from-pink-500 via-yellow-400 to-green-400 opacity-25 animate-bgWave ${darkMode ? "" : "opacity-10"}`} style={{ transform: `translateY(${scrollY * 0.02}px)` }}></div>
        <div className={`w-[150%] h-[150%] rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 opacity-25 animate-bgWave2 ${darkMode ? "" : "opacity-10"}`} style={{ transform: `translateY(${scrollY * -0.015}px)` }}></div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="w-full flex justify-end mb-4 relative z-10">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-full font-semibold focus:outline-none shadow-lg transition-colors duration-300 hover:scale-105"
          style={{ backgroundColor: darkMode ? "#facc15" : "#1f2937", color: darkMode ? "#000" : "#facc15" }}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Hero Section */}
      <section className="text-center mb-12 relative z-10" style={{ transform: `translateY(${scrollY * 0.05}px)` }}>
        <h1 className={`text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${darkMode ? "from-green-400 to-yellow-400" : "from-orange-500 to-yellow-600"} mb-4 drop-shadow-lg animate-fadeIn`}>
          Sarah&apos;s Snacks Delight
        </h1>
        <p className={`text-lg md:text-xl mb-6 animate-fadeIn delay-100 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Scan the QR below or click WhatsApp to order instantly
        </p>

        <div className="inline-block animate-pulse mb-2 transform transition-transform duration-500 hover:scale-110 hover:shadow-2xl">
          <Image src="/images/whatsapp-qr.svg" alt="WhatsApp QR" width={180} height={180} className="mx-auto rounded-lg shadow-2xl" />
        </div>

        <p className={`text-lg mt-2 animate-fadeIn delay-200 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Or WhatsApp:{" "}
          <a href="https://wa.me/2347062319517" className={`font-semibold hover:underline ${darkMode ? "text-green-400" : "text-green-600"}`} target="_blank" rel="noopener noreferrer">
            +234 706 231 9517
          </a>
        </p>
      </section>

      {/* Products Section */}
      <section className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 relative z-10">
        {products.map((product, idx) => (
          <div 
            key={product.name} 
            onMouseMove={handleMouseMove}
            className={`relative p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] rounded-3xl shadow-2xl bg-gradient-to-br ${darkMode ? "from-gray-800 via-gray-700 to-gray-900" : "from-white via-yellow-50 to-white"}`}
            style={{ transitionDelay: `${idx * 200}ms`, transform: `translateY(${scrollY * 0.03}px)` }}
          >
            <Image src={product.image} alt={product.name} width={280} height={280} className="object-cover mb-4 rounded-xl shadow-lg relative z-10" />
            <h2 className={`text-2xl font-bold mb-2 relative z-10 ${darkMode ? "text-green-400" : "text-orange-600"}`}>{product.name}</h2>
            <p className={`mb-2 relative z-10 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{product.description}</p>
            <p className="text-lg font-semibold relative z-10">{product.price}</p>

            {/* Barcode */}
            <div className="mt-3">
              <Barcode value={product.name.replace(/\s/g, "")} format="CODE128" width={1.5} height={50} displayValue={false} background={darkMode ? "#1f2937" : "#fff"} lineColor={darkMode ? "#fff" : "#000"} />
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className={`${darkMode ? "bg-gray-800 text-gray-200" : "bg-orange-600 text-white"} w-full text-center py-8 mt-12 transition-colors duration-500 relative z-10`}>
        <p className="text-lg md:text-xl">
          © {new Date().getFullYear()} Sarah&apos;s Snacks Delight. All rights reserved.
        </p>
      </footer>

      {/* Tailwind animations */}
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.8s ease forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }

        @keyframes pulse { 0%,100%{transform:scale(1);}50%{transform:scale(1.05);} }
        .animate-pulse { animation: pulse 2s infinite; }

        @keyframes float { 0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);} }
        .animate-float { animation: float 4s ease-in-out infinite; }

        @keyframes bgWave { 0%{transform:translateX(-20%) translateY(0%)}50%{transform:translateX(20%) translateY(5%)}100%{transform:translateX(-20%) translateY(0%)} }
        .animate-bgWave { animation: bgWave 30s ease-in-out infinite; }

        @keyframes bgWave2 { 0%{transform:translateX(0%) translateY(0%)}50%{transform:translateX(-15%) translateY(10%)}100%{transform:translateX(0%) translateY(0%)} }
        .animate-bgWave2 { animation: bgWave2 40s ease-in-out infinite; }

        @keyframes fadeSpark { 0% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(0); } }
        .animate-fadeSpark { animation: fadeSpark 0.8s forwards; }
      `}</style>
    </main>
  );
}
