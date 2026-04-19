'use client';
import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import TryOnModal from '@/components/TryOnModal';

const PRODUCTS = [
  {
    id: '1',
    name: 'Elegant Evening Gown',
    price: '129.99',
    category: 'Women',
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Classic White Shirt',
    price: '89.50',
    category: 'Men',
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Black Essential Tee',
    price: '45.00',
    category: 'Men',
    badge: '',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Evening Silk Gown',
    price: '150.00',
    category: 'Women',
    badge: 'Limited',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop',
  },
];

const MARQUEE_ITEMS = ['Free Shipping Over ₹999', 'New Arrivals Every Week', 'AI Virtual Try-On', 'Premium Quality', '30-Day Returns', 'Exclusive Members Offer'];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<{ id: string; image: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Men', 'Women'];

  const handleTryOn = (id: string, image: string) => {
    setSelectedProduct({ id, image });
    setIsModalOpen(true);
  };

  const filtered = activeFilter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeFilter);

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <Navbar />

      {/* ---- Hero ---- */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
            alt="Hero"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#f5f3f0]/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="max-w-2xl">
            <p className="section-label mb-4 fade-up">AI-Powered Fashion</p>
            <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter text-[#0d0d0d] mb-6 fade-up">
              DRESS UP<br />
              <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>every</span>{' '}
              SEASON
            </h1>
            <p className="text-[#6b7280] text-lg mb-8 max-w-md fade-up-delay">
              Try on outfits instantly with our AI Virtual Try-On. No fitting room needed.
            </p>
            <div className="flex flex-wrap gap-3 fade-up-delay">
              <a href="#collection" className="btn-primary">Shop Now</a>
              <a href="#collection" className="btn-outline">Explore All</a>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-16 flex gap-12 fade-up-delay">
            {[['500+', 'Styles'], ['10K+', 'Happy Customers'], ['AI', 'Try-On Tech']].map(([val, label]) => (
              <div key={label}>
                <p className="text-2xl font-black">{val}</p>
                <p className="section-label mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Marquee Banner ---- */}
      <div className="bg-[#0d0d0d] text-white py-3 overflow-hidden">
        <div className="flex whitespace-nowrap marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="mx-8 text-xs font-semibold tracking-widest uppercase">
              {item} <span className="mx-4 opacity-40">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ---- Collection ---- */}
      <section id="collection" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-label mb-2">Our Collection</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Featured Picks</h2>
          </div>
          {/* Filter Pills */}
          <div className="flex gap-2">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase border transition-all ${
                  activeFilter === f
                    ? 'bg-[#0d0d0d] text-white border-[#0d0d0d]'
                    : 'bg-transparent text-[#0d0d0d] border-[#0d0d0d]/30 hover:border-[#0d0d0d]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div key={product.id} className="product-card group">
              <div className="relative h-80 bg-gray-100 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay with Try-On button */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <button
                    onClick={() => handleTryOn(product.id, product.image)}
                    className="w-full btn-primary justify-center py-2.5 text-xs"
                  >
                    ✦ Virtual Try-On
                  </button>
                </div>
                {product.badge && (
                  <div className="absolute top-3 left-3">
                    <span className="badge">{product.badge}</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="section-label text-[10px] mb-1">{product.category}</p>
                <h3 className="font-bold text-sm tracking-tight mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-black text-base">₹{product.price}</span>
                  <button
                    onClick={() => handleTryOn(product.id, product.image)}
                    className="text-[10px] font-bold uppercase tracking-widest border border-[#0d0d0d]/30 px-3 py-1.5 rounded-full hover:bg-[#0d0d0d] hover:text-white transition-all"
                  >
                    Try On
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- How It Works ---- */}
      <section className="bg-[#0d0d0d] text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="section-label text-white/40 mb-3">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Try Before You Buy</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Pick a Style', desc: 'Browse our curated collection and select the outfit you love.' },
              { step: '02', title: 'Upload Your Photo', desc: 'Upload a full-body photo with a plain background for best results.' },
              { step: '03', title: 'AI Does the Magic', desc: 'Our IDM-VTON AI instantly renders the garment on your body.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="border border-white/10 rounded-2xl p-8">
                <p className="text-6xl font-black text-white/10 mb-4">{step}</p>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA Banner ---- */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-[#ede9e3] rounded-3xl p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="section-label mb-3">Exclusive Members</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight max-w-md">
              Get 20% Off Your First Order
            </h2>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto min-w-[280px]">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-5 py-3.5 rounded-full bg-white border border-[#e5e1db] text-sm outline-none focus:ring-2 focus:ring-[#0d0d0d]/20 w-full"
            />
            <button className="btn-primary justify-center">Subscribe Now</button>
          </div>
        </div>
      </section>

      {/* ---- Footer ---- */}
      <footer className="border-t border-[#e5e1db] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6b7280]">
          <span className="font-black text-[#0d0d0d] text-lg tracking-tighter">VRYON</span>
          <p>© 2026 Vryon. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#0d0d0d] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#0d0d0d] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#0d0d0d] transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      <TryOnModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productImage={selectedProduct?.image || ''}
      />
    </main>
  );
}
