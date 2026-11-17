"use client";

import { useState } from "react";
import { MOCK_PRODUCTS, Product } from "@/lib/mockData";
import { UserAvatar } from "@/components/UserAvatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  Star,
  ExternalLink,
  ShoppingBag,
  Sparkles,
  Check,
  Cpu,
  Layers,
  Bot,
  X,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const categories = [
    { label: "All Items", value: "All", icon: Layers },
    { label: "Software & SaaS", value: "Software & SaaS", icon: Layers },
    { label: "AI Models & Agents", value: "AI Models & Agents", icon: Bot },
    { label: "Hardware & Devices", value: "Hardware & Devices", icon: Cpu },
  ];

  const filteredProducts = MOCK_PRODUCTS.filter((prod) => {
    const matchesCategory =
      selectedCategory === "All" || prod.category === selectedCategory;
    const matchesSearch =
      prod.title.toLowerCase().includes(search.toLowerCase()) ||
      prod.description.toLowerCase().includes(search.toLowerCase()) ||
      prod.tagline.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCheckout = (prod: Product) => {
    setCheckoutProduct(prod);
    setCheckoutSuccess(false);
  };

  const handleCompletePayment = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      setCheckoutProduct(null);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[var(--card-bg)] backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">
              Clear Launch<span className="text-indigo-500 ml-0.5">🚀</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
            <Link href="/products" className="text-indigo-500 font-semibold">
              Marketplace
            </Link>
            <Link
              href="/explore-startups"
              className="text-[var(--text-secondary)] hover:text-indigo-500 transition-colors"
            >
              Startups
            </Link>
            <Link
              href="/launchpad"
              className="text-[var(--text-secondary)] hover:text-indigo-500 transition-colors"
            >
              Govt Launchpad
            </Link>
            <Link
              href="/advocates"
              className="text-[var(--text-secondary)] hover:text-indigo-500 transition-colors"
            >
              Legal Advocates
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/dashboard" className="btn-secondary text-xs px-3.5 py-1.5">
            Dashboard
          </Link>
          <Link href="/login" className="btn-primary text-xs px-3.5 py-1.5">
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-[var(--border-subtle)] bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-400 font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Global Tech & Legal Marketplace
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Software, AI Pipelines & Hardware Devices
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[var(--text-secondary)]">
            Explore verified code boilerplates, fine-tuned RAG agents, and industrial IoT dev kits built by verified founders and engineers.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                      : "bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-indigo-400/40"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools, models, hardware..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs focus:border-indigo-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="glass-card flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Product Image */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-800">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {prod.badge && (
                    <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-600 text-white shadow-md">
                      {prod.badge}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 text-xs font-bold px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white border border-white/10">
                    ${prod.price} {prod.currency}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-1.5">
                    <span className="font-semibold text-indigo-400">{prod.category}</span>
                    <span className="flex items-center gap-1 text-amber-400 font-medium">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {prod.rating} ({prod.reviewsCount})
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[var(--text-primary)] mb-1 line-clamp-1 group-hover:text-indigo-400 transition-colors">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-4">
                    {prod.tagline}
                  </p>

                  {/* Features pill preview */}
                  <div className="space-y-1.5 mb-5">
                    {prod.features.slice(0, 3).map((feat, i) => (
                      <div
                        key={i}
                        className="text-[11px] text-[var(--text-muted)] flex items-center gap-1.5"
                      >
                        <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Seller Info & Action */}
              <div className="p-5 pt-0 border-t border-[var(--border-subtle)] mt-2">
                <div className="flex items-center justify-between pt-3">
                  {/* Clickable Seller Avatar */}
                  <UserAvatar
                    userId={prod.sellerId}
                    name={prod.sellerName}
                    avatar={prod.sellerAvatar}
                    subtitle={prod.sellerRole}
                    size="sm"
                    showName={true}
                  />

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProduct(prod)}
                      className="p-2 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-elevated)] transition-colors text-xs text-[var(--text-secondary)]"
                      title="Quick Preview"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleCheckout(prod)}
                      className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="glass-panel p-12 text-center my-8">
            <ShoppingBag className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2" />
            <h3 className="text-base font-bold mb-1">No products found</h3>
            <p className="text-xs text-[var(--text-muted)]">
              Try adjusting your search criteria or switch categories.
            </p>
          </div>
        )}
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-panel max-w-xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="h-48 w-full rounded-xl overflow-hidden mb-5">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-indigo-400">
                {selectedProduct.category}
              </span>
              <span className="text-lg font-bold text-emerald-400">
                ${selectedProduct.price} {selectedProduct.currency}
              </span>
            </div>

            <h2 className="text-xl font-bold mb-2">{selectedProduct.title}</h2>
            <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
              {selectedProduct.description}
            </p>

            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
              Key Features & Deliverables
            </h4>
            <div className="space-y-2 mb-6">
              {selectedProduct.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
              <div>
                <p className="text-[11px] text-[var(--text-muted)]">Created by verified seller</p>
                <UserAvatar
                  userId={selectedProduct.sellerId}
                  name={selectedProduct.sellerName}
                  avatar={selectedProduct.sellerAvatar}
                  subtitle={selectedProduct.sellerRole}
                  size="sm"
                  showName={true}
                />
              </div>

              <button
                onClick={() => {
                  const p = selectedProduct;
                  setSelectedProduct(null);
                  handleCheckout(p);
                }}
                className="btn-primary text-xs px-5 py-2.5 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Checkout (${selectedProduct.price})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal Simulation */}
      {checkoutProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-panel max-w-md w-full p-6 relative">
            <button
              onClick={() => setCheckoutProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <X className="w-4 h-4" />
            </button>

            {checkoutSuccess ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-emerald-400 mb-1">
                  Order Completed!
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  License key & immediate repository download sent to your registered email.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-2">
                  <ShieldCheck className="w-4 h-4" /> Clear Launch Escrow Checkout
                </div>
                <h3 className="text-lg font-bold mb-1">Order Summary</h3>
                <p className="text-xs text-[var(--text-muted)] mb-5">
                  Instant license delivery with 14-day refund protection.
                </p>

                <div className="p-3.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] mb-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-xs">{checkoutProduct.title}</span>
                    <span className="font-bold text-xs">
                      ${checkoutProduct.price} {checkoutProduct.currency}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    Single commercial license • Lifetime updates • Direct seller support
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                      Billing Email
                    </label>
                    <input
                      type="email"
                      defaultValue="founder@startup.com"
                      className="w-full px-3 py-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                      Card Details (Demo Mode)
                    </label>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
                      <CreditCard className="w-4 h-4 text-indigo-400" />
                      <span>•••• •••• •••• 4242</span>
                      <span className="ml-auto text-[10px]">12/28</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCompletePayment}
                  className="btn-primary w-full text-xs py-3 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Confirm & Pay ${checkoutProduct.price}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
