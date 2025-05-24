"use client"

import React, { useState, useEffect, useRef } from 'react';
import { SunMedium, Flame, Battery, Star, Zap, Calculator, BarChart2, ArrowRight, Shield, Leaf, Award, TrendingUp, Users, Droplets, Lightbulb, Settings, CheckCircle, Clock, Gauge } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { OptimizedBackground } from '../shared/OptimizedBackground'
import { products, Product } from '../../data/products';
import Image from 'next/image';
import ProductImagePlaceholder from '@/components/ui/ProductImagePlaceholder';

/**
 * Custom hook for typewriter animation effect
 */
function useTypewriter(words: string[], speed = 70, pause = 1200) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), pause);
      return;
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, words, speed, pause]);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((v) => !v), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  return `${words[index].substring(0, subIndex)}${blink ? '|' : ' '}`;
}

/**
 * Helper function to get product image path
 */
const getProductImage = (category: string, subcategory?: string): string => {
  const imageMap: { [key: string]: string } = {
    'cooking-lower': '/images/products/improved-stove.jpg',
    'cooking-higher': '/images/products/electric-cooktop.jpg',
    'solar-pv': '/images/products/solar-panel-system.jpg',
    'pue': '/images/products/solar-grain-mill.jpg',
    'water-pumping': '/images/products/solar-water-pump.jpg',
    'street-lights': '/images/products/solar-street-light.jpg',
    'power-backup': '/images/products/backup-system.jpg',
    'advisory': '/images/products/consultation-service.jpg'
  };

  return imageMap[category] || '/images/products/default-product.jpg';
};

/**
 * Helper function to get category styling
 */
const getCategoryStyle = (category: string) => {
  const styleMap: { [key: string]: { bg: string; text: string; border: string; icon: React.ReactNode } } = {
    'cooking-lower': {
      bg: 'bg-gradient-to-br from-orange-500/20 to-red-500/20',
      text: 'text-orange-400',
      border: 'border-orange-400/30',
      icon: <Flame className="w-4 h-4" />
    },
    'cooking-higher': {
      bg: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
      text: 'text-purple-400',
      border: 'border-purple-400/30',
      icon: <Zap className="w-4 h-4" />
    },
    'solar-pv': {
      bg: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
      text: 'text-blue-400',
      border: 'border-blue-400/30',
      icon: <SunMedium className="w-4 h-4" />
    },
    'pue': {
      bg: 'bg-gradient-to-br from-emerald-500/20 to-green-500/20',
      text: 'text-emerald-400',
      border: 'border-emerald-400/30',
      icon: <Settings className="w-4 h-4" />
    },
    'water-pumping': {
      bg: 'bg-gradient-to-br from-cyan-500/20 to-teal-500/20',
      text: 'text-cyan-400',
      border: 'border-cyan-400/30',
      icon: <Droplets className="w-4 h-4" />
    },
    'street-lights': {
      bg: 'bg-gradient-to-br from-yellow-500/20 to-amber-500/20',
      text: 'text-yellow-400',
      border: 'border-yellow-400/30',
      icon: <Lightbulb className="w-4 h-4" />
    },
    'power-backup': {
      bg: 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20',
      text: 'text-indigo-400',
      border: 'border-indigo-400/30',
      icon: <Battery className="w-4 h-4" />
    },
    'advisory': {
      bg: 'bg-gradient-to-br from-slate-500/20 to-gray-500/20',
      text: 'text-slate-400',
      border: 'border-slate-400/30',
      icon: <Users className="w-4 h-4" />
    }
  };

  return styleMap[category] || styleMap['advisory'];
};

/**
 * Enhanced Badge Component
 */
const ProductBadge = ({ badge, sale }: { badge: string | null; sale: boolean }) => {
  if (!badge && !sale) return null;

  const badgeText = sale ? 'SALE' : badge;
  const badgeStyle = sale
    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse'
    : badge === 'POPULAR'
    ? 'bg-gradient-to-r from-[#3DD56D] to-emerald-500 text-white'
    : badge === 'PREMIUM'
    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
    : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';

  return (
    <div className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${badgeStyle}`}>
      {badgeText}
    </div>
  );
};

/**
 * Efficiency Progress Bar Component
 */
const EfficiencyBar = ({ efficiency }: { efficiency?: string }) => {
  if (!efficiency) return null;

  const percentage = parseInt(efficiency.match(/\d+/)?.[0] || '0');

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-400">Efficiency</span>
        <span className="text-white font-medium">{efficiency}</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-[#3DD56D] to-emerald-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
};

// Component props type
interface GreenProductsProps {
  noSeam?: boolean;
}

export default function GreenProducts({ noSeam = false }: GreenProductsProps) {
  const heroWords = [
    'Explore Our Products',
    'Clean Energy Solutions',
    'Empowering Communities',
    'Innovative Green Products',
  ];
  const headline = useTypewriter(heroWords);

  // Centralized State for Search, Filter, Sort
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState<'popularity' | 'price' | 'newest'>('popularity');
  const collectionRef = useRef<HTMLDivElement>(null);

  // Category mapping for filtering
  const categoryMapping: { [key: string]: string[] } = {
    'All': [],
    'Cooking': ['cooking-lower', 'cooking-higher'],
    'Solar PV': ['solar-pv'],
    'PUE': ['pue'],
    'Water Pumping': ['water-pumping'],
    'Street Lights': ['street-lights'],
    'Power Backup': ['power-backup'],
    'Advisory': ['advisory']
  };

  const filteredProducts = products
    .filter(p => {
      if (category === 'All') return true;
      const allowedCategories = categoryMapping[category] || [];
      return allowedCategories.includes(p.category);
    })
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      (p.tags && p.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sort === 'price') return a.price - b.price;
      if (sort === 'newest') return 0; // Placeholder, add date if available
      return b.rating - a.rating;
    });

  // --- Smooth Scroll to Collection ---
  const handleSearchOrFilter = () => {
    setTimeout(() => {
      if (collectionRef.current) {
        collectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <OptimizedBackground
      id="green-products"
      className="flex flex-col items-center py-16 px-2 min-h-[100vh]"
      withGradient={true}
      noSeam={noSeam}
    >
      {/* Hero Section with Loop Text Animation */}
      <div className="max-w-3xl mx-auto text-center mt-8 mb-16 relative z-10">
        <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium mb-6 bg-[#3DD56D]/20 text-[#3DD56D] border border-[#3DD56D]/20 shadow-lg">
          Grean World Products
        </div>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight bg-gradient-to-r from-[#3DD56D] to-[#2bb757] bg-clip-text text-transparent drop-shadow-lg flex items-center justify-center overflow-hidden"
        >
          Find Your Perfect Energy Solution
        </h1>
        <div className="flex flex-col items-center gap-2 mb-6">
          <p className="text-xl md:text-2xl text-slate-200 font-semibold animate-fade-in-up">Browse Our Collection</p>
          <span className="text-base text-slate-400 font-normal">{headline}</span>
        </div>
        <button
          onClick={() => {
            if (collectionRef.current) {
              collectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#3DD56D] to-[#2bb757] text-white font-bold shadow-lg hover:scale-105 hover:shadow-[#3DD56D]/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#3DD56D] focus:ring-offset-2 mt-2"
        >
          <ArrowRight className="h-5 w-5" /> Browse Collection
        </button>
        <style jsx>{`
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s cubic-bezier(0.4,0,0.2,1) both;
          }
        `}</style>
      </div>

      {/* Premium Solar Home System 200W Card */}
      <div className="w-full max-w-[1200px] mx-auto mb-12">
        <div className="w-full min-h-[500px] sm:min-h-[600px] lg:h-[675px] bg-gradient-to-b from-slate-950 to-slate-900 rounded-xl shadow-lg overflow-hidden relative" aria-label="Premium card featuring Solar Home System 200W" role="img">
          <div className="flex flex-col h-full relative z-10">
            <div className="flex flex-col lg:flex-row flex-grow">
              {/* Left: Animated Visual */}
              <div className="w-full lg:w-[45%] relative overflow-hidden min-h-[250px] lg:min-h-0">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-transparent z-0"></div>
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <div className="relative w-[80%] h-[80%]">
                    {/* Grid pattern background - positioned at the center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-[400px] h-[300px] rounded-xl overflow-hidden shadow-2xl z-0">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3DD56D]/30 to-[#2bb757]/30 opacity-30 blur-sm rounded-xl"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0c253a] to-[#071221] border border-slate-700/50"></div>
                        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 p-3">
                          {Array(16).fill(0).map((_, index) => (
                            <div key={index} className="bg-blue-900/70 rounded-sm relative overflow-hidden" style={{backgroundColor: 'rgba(30, 58, 138, 0.7)', opacity: 1}}></div>
                          ))}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-20"></div>
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-72 h-72 rounded-full bg-green-600/10 animate-pulse"></div>
                      <div className="absolute w-56 h-56 rounded-full bg-green-600/15 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <div className="absolute w-40 h-40 rounded-full bg-green-600/20 animate-pulse" style={{ animationDelay: '1s' }}></div>
                      <div className="absolute w-24 h-24 rounded-full bg-green-600/30 flex items-center justify-center">
                        <BarChart2 className="w-12 h-12 text-white" />
                      </div>
                      {/* SVG lines/dots */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                        <g stroke="rgba(74, 222, 128, 0.3)" fill="none" strokeWidth="1">
                          <path d="M200,100 L100,200 L200,300 L300,200 Z"></path>
                          <path d="M200,100 L300,200"></path>
                          <path d="M100,200 L300,200"></path>
                          <path d="M200,300 L200,100"></path>
                        </g>
                        <g fill="rgba(74, 222, 128, 0.6)">
                          <circle cx="200" cy="100" r="5"></circle>
                          <circle cx="100" cy="200" r="5"></circle>
                          <circle cx="200" cy="300" r="5"></circle>
                          <circle cx="300" cy="200" r="5"></circle>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right: Content */}
              <div className="w-full lg:w-[55%] p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-3 bg-[#3DD56D] text-white">Solar Energy</div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-300 leading-tight mb-4">Solar Home System 200W</h3>
                    <p className="text-base sm:text-lg text-slate-300">Our flagship solar home system with everything needed to power a small household, including lighting, phone charging, and TV capability.</p>
                  </div>
                  {/* Stats card */}
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-2">
                      <div className="text-center">
                        <div className="text-xl sm:text-2xl font-bold text-[#3DD56D]">200W</div>
                        <div className="text-xs text-slate-400">Panel Power</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl sm:text-2xl font-bold text-[#3DD56D]">2 yrs</div>
                        <div className="text-xs text-slate-400">Warranty</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl sm:text-2xl font-bold text-[#3DD56D]">ETB 16,499</div>
                        <div className="text-xs text-slate-400">Price</div>
                      </div>
                    </div>
                  </div>
                  {/* Features card */}
                  <div className="bg-slate-900 p-4 sm:p-5 rounded-lg border border-slate-800">
                    <h4 className="text-lg sm:text-xl font-semibold text-white mb-3">Key Features:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center space-x-3">
                        <div className="bg-[#2bb757]/50 p-2 rounded-full"><SunMedium className="w-4 h-4 sm:w-5 sm:h-5 text-[#3DD56D]" /></div>
                        <span className="text-sm sm:text-base text-white">200W solar panel</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="bg-[#2bb757]/50 p-2 rounded-full"><Battery className="w-4 h-4 sm:w-5 sm:h-5 text-[#3DD56D]" /></div>
                        <span className="text-sm sm:text-base text-white">Battery backup</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="bg-[#2bb757]/50 p-2 rounded-full"><Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#3DD56D]" /></div>
                        <span className="text-sm sm:text-base text-white">LED lights & charging</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="bg-[#2bb757]/50 p-2 rounded-full"><Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#3DD56D]" /></div>
                        <span className="text-sm sm:text-base text-white">2-year local support</span>
                      </div>
                    </div>
                  </div>
                  {/* Tags & CTA */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 gap-4">
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-[#3DD56D] text-[#3DD56D]">#SolarHome</div>
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-[#3DD56D] text-[#3DD56D]">#CleanEnergy</div>
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-[#3DD56D] text-[#3DD56D]">#OffGrid</div>
                    </div>
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-[#3DD56D] hover:bg-[#2bb757] text-white">See Details <ArrowRight className="ml-1 h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Mirt Stove Deluxe Card */}
      <div className="w-full max-w-[1200px] mx-auto mb-12">
        <div className="w-full min-h-[500px] sm:min-h-[600px] lg:h-[627px] bg-gradient-to-b from-slate-950 to-slate-900 rounded-xl shadow-lg overflow-hidden relative" aria-label="LinkedIn modern innovation card featuring Mirt Stove Deluxe" role="img">
          <div className="flex h-full flex-col">
            <div className="flex flex-col lg:flex-row flex-grow">
              {/* Left: Content */}
              <div className="w-full lg:w-[55%] p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div className="space-y-6 sm:space-y-8">
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-indigo-600 flex items-center justify-center">
                        <Flame className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">Mirt Stove Deluxe</h3>
                        <p className="text-sm sm:text-base text-slate-300">Efficient Injera Baking Solution</p>
                      </div>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg px-3 py-2 sm:px-4 sm:py-2 flex items-center space-x-2 self-start sm:self-auto">
                      <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                      <p className="text-xs sm:text-sm font-medium text-white">@mirtstove</p>
                    </div>
                  </div>
                  {/* Product Card */}
                  <div className="bg-gradient-to-r from-indigo-600 to-blue-800 text-white p-5 rounded-lg shadow-md">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mb-2 bg-white/20 backdrop-blur-sm text-white">Clean Cooking</span>
                    <h4 className="text-xl font-semibold mb-2">Efficient, Durable, and Eco-Friendly</h4>
                    <p className="text-base">The enhanced Mirt stove is made from durable sand and cement mortar, designed for Ethiopian households to bake injera efficiently and reduce fuel use.</p>
                  </div>
                  {/* Features & Impact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                      <div className="flex items-center space-x-3 mb-2">
                        <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                        <h5 className="font-semibold text-white text-sm sm:text-base">Key Features</h5>
                      </div>
                      <ul className="text-xs sm:text-sm text-slate-300 space-y-1 list-disc list-inside">
                        <li>Bakes up to 30 injeras per day</li>
                        <li>Reduces fuel consumption by 50%</li>
                        <li>5+ year lifespan with proper maintenance</li>
                      </ul>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                      <div className="flex items-center space-x-3 mb-2">
                        <BarChart2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                        <h5 className="font-semibold text-white text-sm sm:text-base">Environmental Impact</h5>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-center">
                          <div className="text-lg sm:text-2xl font-bold text-indigo-400">50%</div>
                          <div className="text-xs text-slate-400">Fuel savings</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg sm:text-2xl font-bold text-indigo-400">30+</div>
                          <div className="text-xs text-slate-400">Injeras/day</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg sm:text-2xl font-bold text-indigo-400">5 yrs</div>
                          <div className="text-xs text-slate-400">Lifespan</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg sm:text-2xl font-bold text-indigo-400">Eco</div>
                          <div className="text-xs text-slate-400">Local materials</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Tags & CTA */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border border-indigo-500 text-indigo-400 bg-transparent">#CleanCooking</span>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border border-indigo-500 text-indigo-400 bg-transparent">#Injera</span>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border border-indigo-500 text-indigo-400 bg-transparent">#EcoStove</span>
                    </div>
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white">View Details <ArrowRight className="ml-1 h-4 w-4" /></button>
                  </div>
                </div>
              </div>
              {/* Right: Animated Visual */}
              <div className="w-full lg:w-[45%] relative overflow-hidden min-h-[250px] lg:min-h-0">
                <div className="absolute inset-0 bg-gradient-to-l from-indigo-900/80 to-transparent z-0"></div>
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <div className="relative w-[80%] h-[80%]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-72 h-72 rounded-full bg-indigo-600/20 animate-pulse"></div>
                      <div className="absolute w-56 h-56 rounded-full bg-indigo-600/30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <div className="absolute w-40 h-40 rounded-full bg-indigo-600/40 animate-pulse" style={{ animationDelay: '1s' }}></div>
                      <div className="absolute w-24 h-24 rounded-full bg-indigo-600/50 flex items-center justify-center">
                        <Flame className="w-12 h-12 text-white" />
                      </div>
                      {/* SVG lines/dots */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                        <g stroke="rgba(129, 140, 248, 0.4)" fill="none" strokeWidth="1">
                          <path d="M200,200 L150,150"></path>
                          <path d="M200,200 L250,150"></path>
                          <path d="M200,200 L150,250"></path>
                          <path d="M200,200 L250,250"></path>
                          <path d="M200,200 L120,200"></path>
                          <path d="M200,200 L280,200"></path>
                          <path d="M200,200 L200,120"></path>
                          <path d="M200,200 L200,280"></path>
                        </g>
                        <g fill="rgba(129, 140, 248, 0.8)">
                          <circle cx="150" cy="150" r="5"></circle>
                          <circle cx="250" cy="150" r="5"></circle>
                          <circle cx="150" cy="250" r="5"></circle>
                          <circle cx="250" cy="250" r="5"></circle>
                          <circle cx="120" cy="200" r="5"></circle>
                          <circle cx="280" cy="200" r="5"></circle>
                          <circle cx="200" cy="120" r="5"></circle>
                          <circle cx="200" cy="280" r="5"></circle>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-blue-800 py-3 px-8"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Find Your Perfect Energy Solution Section */}
      <section className="py-24 px-4 sm:px-6 relative">

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold mb-8 bg-gradient-to-r from-[#3DD56D]/20 to-emerald-500/20 text-[#3DD56D] border border-[#3DD56D]/30 shadow-xl backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 h-5 w-5">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <span>Discover Your Perfect Match</span>
            </motion.div>

            {/* Enhanced Section Title */}
            <motion.h3
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-white via-[#3DD56D] to-emerald-400 bg-clip-text text-transparent drop-shadow-2xl">
                Find Your Perfect
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-[#3DD56D] to-white bg-clip-text text-transparent">
                Energy Solution
              </span>
            </motion.h3>

            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-slate-300 text-xl leading-relaxed mb-8">
                Discover products tailored to your unique needs with our intelligent filtering system, designed to match you with the perfect sustainable energy solution for your home, business, or community.
              </p>
            </motion.div>
          </motion.div>
          {/* Enhanced Controls Container */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Glassmorphism Container */}
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl p-8 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>

              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">
                  {/* Enhanced Search Bar */}
                  <div className="flex-1 max-w-2xl">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#3DD56D]/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <input
                        className="relative w-full h-16 px-6 pr-16 text-lg rounded-2xl bg-slate-900/80 border-2 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-[#3DD56D]/50 focus:ring-4 focus:ring-[#3DD56D]/20 transition-all duration-300 backdrop-blur-sm shadow-xl"
                        placeholder="Search solar systems, cooking solutions, water pumps, street lights..."
                        type="text"
                        aria-label="Search products"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') handleSearchOrFilter(); }}
                      />
                      <motion.button
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#3DD56D] to-emerald-500 hover:from-emerald-500 hover:to-[#3DD56D] text-white rounded-xl p-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#3DD56D]/25"
                        aria-label="Search"
                        onClick={handleSearchOrFilter}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                          <circle cx="11" cy="11" r="8"></circle>
                          <path d="m21 21-4.3-4.3"></path>
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                  {/* Enhanced Filter Controls */}
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-3">
                      {['All', 'Cooking', 'Solar PV', 'PUE', 'Water Pumping', 'Street Lights', 'Power Backup', 'Advisory'].map((cat, index) => {
                        const isActive = category === cat;
                        const categoryStyles = {
                          'All': 'from-slate-600 to-slate-700 text-slate-200',
                          'Cooking': 'from-orange-500 to-red-500 text-white',
                          'Solar PV': 'from-blue-500 to-cyan-500 text-white',
                          'PUE': 'from-emerald-500 to-green-500 text-white',
                          'Water Pumping': 'from-cyan-500 to-teal-500 text-white',
                          'Street Lights': 'from-yellow-500 to-amber-500 text-white',
                          'Power Backup': 'from-purple-500 to-indigo-500 text-white',
                          'Advisory': 'from-indigo-500 to-purple-500 text-white'
                        };

                        return (
                          <motion.button
                            key={cat}
                            className={`px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 border-2 backdrop-blur-sm ${
                              isActive
                                ? `bg-gradient-to-r ${categoryStyles[cat]} border-white/30 shadow-lg scale-105`
                                : 'bg-slate-800/50 text-slate-300 border-slate-600/50 hover:bg-slate-700/50 hover:border-slate-500/50 hover:text-white'
                            }`}
                            onClick={() => { setCategory(cat); handleSearchOrFilter(); }}
                            whileHover={{ scale: isActive ? 1.05 : 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            {cat}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Enhanced Sort Dropdown */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <select
                        className="h-16 px-6 pr-12 rounded-2xl border-2 border-slate-700/50 bg-slate-900/80 text-white focus:ring-4 focus:ring-[#3DD56D]/20 focus:border-[#3DD56D]/50 transition-all duration-300 backdrop-blur-sm shadow-xl appearance-none cursor-pointer text-sm font-medium"
                        value={sort}
                        onChange={e => { setSort(e.target.value as any); handleSearchOrFilter(); }}
                        aria-label="Sort products"
                      >
                        <option value="popularity">Sort by: Popularity</option>
                        <option value="price">Sort by: Price</option>
                        <option value="newest">Sort by: Newest</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Enhanced CTA Button */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="group relative inline-flex items-center gap-4 px-12 py-6 rounded-3xl bg-gradient-to-r from-[#3DD56D] to-emerald-500 text-white font-bold text-xl shadow-2xl hover:shadow-3xl hover:shadow-[#3DD56D]/30 transition-all duration-500 overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Button Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-[#3DD56D] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Button Content */}
                <div className="relative z-10 flex items-center gap-4">
                  <span className="text-xl font-bold">Get Personalized Recommendation</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500" />
              </motion.button>

              {/* Supporting Text */}
              <motion.p
                className="mt-6 text-slate-400 text-sm max-w-md mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                viewport={{ once: true }}
              >
                Our AI-powered recommendation engine will analyze your needs and suggest the perfect energy solution for your specific requirements.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* All Products Section */}
      <section ref={collectionRef} className="py-16 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium mb-4 bg-[#3DD56D]/20 text-[#3DD56D] border border-[#3DD56D]/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span>All Products</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-[#3DD56D] to-white">Browse Our Collection</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">Explore our complete range of sustainable energy solutions designed for Ethiopian communities.</p>
          </div>
          {/* Filter Bar (hidden, now controlled above) */}
          {/* Enhanced Product Grid - Optimized for 4:3 Aspect Ratio at 2X Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center text-slate-400 py-12 text-lg">No products found. Try adjusting your search or filters.</div>
            ) : (
              filteredProducts.map((product, idx) => {
                const categoryStyle = getCategoryStyle(product.category);
                const productImage = getProductImage(product.category, product.subcategory);

                return (
                  <motion.div
                    key={product.name}
                    className="group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    onClick={() => {
                      // Add click handler for product details
                      console.log('Product clicked:', product.name);
                    }}
                  >
                    {/* Enhanced Product Card - Fixed Layout with Proper Spacing */}
                    <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden hover:border-[#3DD56D]/60 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#3DD56D]/20
                                   w-full max-w-[400px] mx-auto
                                   min-h-[650px] sm:min-h-[700px] md:min-h-[750px]
                                   flex flex-col
                                   hover:bg-gradient-to-br hover:from-slate-800/95 hover:to-slate-700/95">

                      {/* Enhanced Badge */}
                      <ProductBadge badge={product.badge} sale={product.sale} />

                      {/* Enhanced Product Image Section - Fixed Height */}
                      <div className="relative h-40 overflow-hidden flex-shrink-0">
                        <div className={`absolute inset-0 ${categoryStyle.bg} opacity-20`} />

                        {/* Product image with fallback */}
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          <ProductImagePlaceholder
                            category={product.category}
                            size="md"
                            className="shadow-lg transform group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Enhanced Category indicator */}
                        <div className="absolute top-3 left-3 z-10">
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${categoryStyle.bg} ${categoryStyle.text} backdrop-blur-sm shadow-lg border border-white/10`}>
                            {categoryStyle.icon}
                            <span className="hidden sm:inline">{product.category.replace('-', ' ').toUpperCase()}</span>
                          </div>
                        </div>

                        {/* Enhanced Rating in top right */}
                        <div className="absolute top-3 right-3 z-10">
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-sm shadow-lg border border-white/10">
                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                            <span className="text-white font-semibold text-xs">{product.rating}</span>
                          </div>
                        </div>

                        {/* Enhanced Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      {/* Enhanced Content Section - Optimized Layout */}
                      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow min-h-0">
                        {/* Enhanced Header Section */}
                        <div className="mb-3 flex-shrink-0">
                          <h3 className="text-lg sm:text-xl md:text-xl font-bold text-white group-hover:text-[#3DD56D] transition-colors duration-300 leading-tight mb-2">
                            {product.name}
                          </h3>

                          {/* Compact Subcategory and Target Users */}
                          <div className="flex flex-col gap-1 mb-2">
                            {product.subcategory && (
                              <div className="flex items-center gap-2">
                                <span className="text-slate-400 text-xs font-medium">
                                  {product.subcategory}
                                </span>
                              </div>
                            )}
                            {product.targetUsers && product.targetUsers.length > 0 && (
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-500">Target:</span>
                                <span className="text-xs text-[#3DD56D] font-medium">
                                  {product.targetUsers.slice(0, 1).join(', ')}
                                </span>
                              </div>
                            )}
                          </div>

                          <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
                            {product.description}
                          </p>
                        </div>

                        {/* Compact Specifications Section */}
                        {product.specifications && (
                          <div className="mb-3 flex-shrink-0">
                            <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/30 backdrop-blur-sm">
                              <h4 className="text-xs font-semibold text-white mb-2 flex items-center">
                                <div className="w-1.5 h-1.5 bg-[#3DD56D] rounded-full mr-2"></div>
                                Specifications
                              </h4>
                              <div className="grid grid-cols-1 gap-2 text-xs">
                                {product.specifications.power && (
                                  <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Power</span>
                                    <span className="text-white font-semibold">{product.specifications.power}</span>
                                  </div>
                                )}
                                {product.specifications.capacity && (
                                  <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Capacity</span>
                                    <span className="text-white font-semibold">{product.specifications.capacity}</span>
                                  </div>
                                )}
                                {product.specifications.warranty && (
                                  <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Warranty</span>
                                    <span className="text-white font-semibold">{product.specifications.warranty}</span>
                                  </div>
                                )}
                                {product.specifications.efficiency && (
                                  <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Efficiency</span>
                                    <span className="text-white font-semibold">{product.specifications.efficiency}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                        {/* Enhanced Pricing and Footer Section */}
                        <div className="mt-auto space-y-3 flex-shrink-0">
                          {/* Compact Applications Section */}
                          {product.applications && product.applications.length > 0 && (
                            <div className="bg-slate-900/30 rounded-lg p-2 border border-slate-700/20">
                              <h5 className="text-xs font-semibold text-slate-400 mb-1">Applications</h5>
                              <div className="flex flex-wrap gap-1">
                                {product.applications.slice(0, 2).map(app => (
                                  <span key={app} className="text-xs bg-[#3DD56D]/10 text-[#3DD56D] px-1.5 py-0.5 rounded border border-[#3DD56D]/20">
                                    {app}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Compact Pricing Section */}
                          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl p-3 border border-slate-600/30 backdrop-blur-sm">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <div className="flex items-baseline gap-2 mb-1">
                                  <span className="text-lg font-bold text-white">
                                    ETB {product.price.toLocaleString()}
                                  </span>
                                  {product.oldPrice && (
                                    <span className="text-slate-400 line-through text-xs">
                                      ETB {product.oldPrice.toLocaleString()}
                                    </span>
                                  )}
                                </div>
                                {product.oldPrice && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-xs text-[#3DD56D] font-semibold">
                                      Save ETB {(product.oldPrice - product.price).toLocaleString()}
                                    </span>
                                    <span className="text-xs bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-medium">
                                      {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Rating and Top Indicator */}
                              {product.rating >= 4.5 && (
                                <div className="flex items-center gap-1 bg-yellow-400/20 text-yellow-400 px-1.5 py-0.5 rounded text-xs">
                                  <Award className="w-2.5 h-2.5" />
                                  <span className="font-semibold">Top</span>
                                </div>
                              )}
                            </div>

                            {/* Compact Tags Section */}
                            <div className="flex flex-wrap gap-1">
                              {product.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="text-xs font-medium px-1.5 py-0.5 rounded bg-[#3DD56D]/20 text-[#3DD56D] border border-[#3DD56D]/30">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
          <div className="mt-16 text-center">
            <motion.button
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-slate-800/80 to-slate-700/80 border border-slate-600/50 text-white font-semibold hover:from-[#3DD56D]/20 hover:to-emerald-500/20 hover:border-[#3DD56D]/50 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Load More Products</span>
              <div className="w-6 h-6 rounded-full bg-[#3DD56D]/20 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-[#3DD56D]" />
              </div>
            </motion.button>

            {/* Stats */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#3DD56D]" />
                <span>{filteredProducts.length} Products Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#3DD56D]" />
                <span>Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#3DD56D]" />
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Product Comparison Section */}
      <section id="comparison" className="py-24 px-4 sm:px-6 relative">

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Enhanced Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold mb-8 bg-gradient-to-r from-[#3DD56D]/20 to-emerald-500/20 text-[#3DD56D] border border-[#3DD56D]/30 shadow-xl backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Calculator className="mr-3 h-5 w-5" />
              <span>Compare & Choose the Best</span>
            </motion.div>

            <motion.h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-white via-[#3DD56D] to-emerald-400 bg-clip-text text-transparent drop-shadow-2xl">
                Product
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-[#3DD56D] to-white bg-clip-text text-transparent">
                Comparison
              </span>
            </motion.h2>

            <motion.p
              className="text-slate-300 text-xl leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Compare our most popular energy solutions side-by-side to find the perfect fit for your specific needs, budget, and sustainability goals.
            </motion.p>
          </motion.div>
          {/* Enhanced Desktop Table View */}
          <motion.div
            className="hidden lg:block overflow-x-auto rounded-3xl border border-slate-700/50 shadow-2xl bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <table className="min-w-full text-sm divide-y divide-slate-700/30">
              <thead className="bg-gradient-to-r from-slate-800/90 to-slate-700/90 text-white sticky top-0 backdrop-blur-sm">
                <tr>
                  <th scope="col" className="px-8 py-6 font-bold text-left text-base">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#3DD56D] rounded-full"></div>
                      Product
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-6 font-bold text-center text-base">Category</th>
                  <th scope="col" className="px-6 py-6 font-bold text-left text-base">Key Features</th>
                  <th scope="col" className="px-6 py-6 font-bold text-center text-base">Efficiency</th>
                  <th scope="col" className="px-6 py-6 font-bold text-center text-base">Warranty</th>
                  <th scope="col" className="px-6 py-6 font-bold text-center text-base">Price</th>
                  <th scope="col" className="px-8 py-6 font-bold text-right text-base">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/20">
                {/* Improved Wood Cookstove Row */}
                <motion.tr
                  className="hover:bg-[#3DD56D]/10 transition-all duration-300 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-amber-500/30 to-orange-500/30 shadow-lg border border-amber-400/30 backdrop-blur-sm">
                        <Flame className="h-7 w-7 text-amber-400" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg group-hover:text-[#3DD56D] transition-colors">Improved Wood Cookstove</div>
                        <div className="text-sm text-slate-400 mt-1">Rural Household Solution</div>
                        <div className="flex items-center gap-2 mt-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-semibold text-white">4.3</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <span className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-400/30 shadow-lg backdrop-blur-sm">
                      Cooking
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <ul className="space-y-2">
                      <li className="flex items-start text-sm group-hover:text-[#3DD56D] transition-colors">
                        <span className="text-[#3DD56D] mr-3 text-lg">✓</span>
                        <span className="text-slate-300 font-medium">40% more efficient than open fires</span>
                      </li>
                      <li className="flex items-start text-sm group-hover:text-[#3DD56D] transition-colors">
                        <span className="text-[#3DD56D] mr-3 text-lg">✓</span>
                        <span className="text-slate-300 font-medium">Reduces smoke emissions</span>
                      </li>
                      <li className="flex items-start text-sm group-hover:text-[#3DD56D] transition-colors">
                        <span className="text-[#3DD56D] mr-3 text-lg">✓</span>
                        <span className="text-slate-300 font-medium">Eco-friendly wood burning</span>
                      </li>
                    </ul>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-xl font-bold text-white mb-2">40%</div>
                      <div className="w-20 h-3 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-inner" style={{ width: '40%' }}></div>
                      </div>
                      <span className="text-xs text-slate-400 mt-1">vs Open Fire</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-white font-bold text-lg">2 years</span>
                      <span className="text-sm text-slate-400">Full Coverage</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-xl font-bold text-white mb-1">ETB 1,200</div>
                      <div className="text-sm text-[#3DD56D] font-semibold bg-[#3DD56D]/10 px-2 py-1 rounded-lg">Best Value</div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <motion.button
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-lg h-12 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white border border-amber-400/30"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Select Product
                    </motion.button>
                  </td>
                </motion.tr>
                {/* Household Solar System Row */}
                <motion.tr
                  className="hover:bg-[#3DD56D]/10 transition-all duration-300 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-500/30 to-cyan-500/30 shadow-lg border border-blue-400/30 backdrop-blur-sm">
                        <SunMedium className="h-7 w-7 text-blue-400" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg group-hover:text-[#3DD56D] transition-colors">Household Solar System 200W</div>
                        <div className="text-sm text-slate-400 mt-1">Complete Off-Grid Solution</div>
                        <div className="flex items-center gap-2 mt-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-semibold text-white">4.7</span>
                          <span className="text-xs bg-[#3DD56D]/20 text-[#3DD56D] px-2 py-1 rounded-lg font-semibold">POPULAR</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <span className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border border-blue-400/30 shadow-lg backdrop-blur-sm">
                      Solar PV
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <ul className="space-y-2">
                      <li className="flex items-start text-sm group-hover:text-[#3DD56D] transition-colors">
                        <span className="text-[#3DD56D] mr-3 text-lg">✓</span>
                        <span className="text-slate-300 font-medium">200W solar panel included</span>
                      </li>
                      <li className="flex items-start text-sm group-hover:text-[#3DD56D] transition-colors">
                        <span className="text-[#3DD56D] mr-3 text-lg">✓</span>
                        <span className="text-slate-300 font-medium">100Ah battery backup</span>
                      </li>
                      <li className="flex items-start text-sm group-hover:text-[#3DD56D] transition-colors">
                        <span className="text-[#3DD56D] mr-3 text-lg">✓</span>
                        <span className="text-slate-300 font-medium">Complete lighting system</span>
                      </li>
                    </ul>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-xl font-bold text-white mb-2">85%</div>
                      <div className="w-20 h-3 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-inner" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-xs text-slate-400 mt-1">Solar Efficiency</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-white font-bold text-lg">5 years</span>
                      <span className="text-sm text-slate-400">Panels + System</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-xl font-bold text-white mb-1">ETB 16,500</div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-400 line-through">ETB 19,000</span>
                        <div className="text-sm text-[#3DD56D] font-semibold bg-[#3DD56D]/10 px-2 py-1 rounded-lg">SALE</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <motion.button
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-lg h-12 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 text-white border border-blue-400/30"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Select Product
                    </motion.button>
                  </td>
                </motion.tr>
                {/* Solar Water Pump Row */}
                <motion.tr
                  className="hover:bg-[#3DD56D]/10 transition-all duration-300 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-emerald-500/30 to-teal-500/30 shadow-lg border border-emerald-400/30 backdrop-blur-sm">
                        <Zap className="h-7 w-7 text-emerald-400" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg group-hover:text-[#3DD56D] transition-colors">Solar Water Pump 500W</div>
                        <div className="text-sm text-slate-400 mt-1">Agricultural Irrigation System</div>
                        <div className="flex items-center gap-2 mt-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-semibold text-white">4.6</span>
                          <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg font-semibold">FARMING</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <span className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-400/30 shadow-lg backdrop-blur-sm">
                      PUE
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <ul className="space-y-2">
                      <li className="flex items-start text-sm group-hover:text-[#3DD56D] transition-colors">
                        <span className="text-[#3DD56D] mr-3 text-lg">✓</span>
                        <span className="text-slate-300 font-medium">2000L/hour flow rate</span>
                      </li>
                      <li className="flex items-start text-sm group-hover:text-[#3DD56D] transition-colors">
                        <span className="text-[#3DD56D] mr-3 text-lg">✓</span>
                        <span className="text-slate-300 font-medium">Solar-powered operation</span>
                      </li>
                      <li className="flex items-start text-sm group-hover:text-[#3DD56D] transition-colors">
                        <span className="text-[#3DD56D] mr-3 text-lg">✓</span>
                        <span className="text-slate-300 font-medium">Automatic controls</span>
                      </li>
                    </ul>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-xl font-bold text-white mb-2">90%</div>
                      <div className="w-20 h-3 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-inner" style={{ width: '90%' }}></div>
                      </div>
                      <span className="text-xs text-slate-400 mt-1">Pump Efficiency</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-white font-bold text-lg">3 years</span>
                      <span className="text-sm text-slate-400">Full System</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-xl font-bold text-white mb-1">ETB 28,000</div>
                      <div className="text-sm text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-1 rounded-lg">Premium</div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <motion.button
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-lg h-12 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-teal-500 hover:to-emerald-500 text-white border border-emerald-400/30"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Select Product
                    </motion.button>
                  </td>
                </motion.tr>
              </tbody>
            </table>
          </motion.div>

          {/* Enhanced Mobile Card View */}
          <motion.div
            className="lg:hidden mt-12 space-y-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Enhanced Wood Cookstove Card */}
            <motion.div
              className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden hover:border-[#3DD56D]/60 transition-all duration-300 group hover:shadow-[#3DD56D]/20"
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Enhanced Header Section */}
              <div className="p-6 pb-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-3xl flex items-center justify-center bg-gradient-to-br from-amber-500/30 to-orange-500/30 shadow-lg border border-amber-400/30 backdrop-blur-sm">
                    <Flame className="h-10 w-10 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white text-2xl mb-2 group-hover:text-[#3DD56D] transition-colors">Improved Wood Cookstove</div>
                    <div className="text-sm text-slate-400 mb-3">Rural Household Solution</div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-400/30 shadow-lg backdrop-blur-sm">
                        Cooking
                      </span>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold text-white">4.3</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Price Section */}
                <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-6 mb-6 border border-slate-600/30 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">ETB 1,200</div>
                    <div className="text-lg text-[#3DD56D] font-semibold bg-[#3DD56D]/10 px-3 py-2 rounded-xl inline-block">Best Value</div>
                  </div>
                </div>

                {/* Enhanced Action Button */}
                <motion.button
                  className="w-full inline-flex items-center justify-center gap-3 whitespace-nowrap text-lg font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-xl h-14 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white border border-amber-400/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Select Product
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Enhanced Details Section */}
              <div className="border-t border-slate-700/30 p-6 pt-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Enhanced Features */}
                  <div>
                    <h4 className="font-bold text-white text-lg mb-4 flex items-center">
                      <div className="w-3 h-3 bg-[#3DD56D] rounded-full mr-3"></div>
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start text-base"><span className="text-[#3DD56D] mr-4 text-xl font-bold">✓</span><span className="text-slate-300 font-medium">40% more efficient than open fires</span></li>
                      <li className="flex items-start text-base"><span className="text-[#3DD56D] mr-4 text-xl font-bold">✓</span><span className="text-slate-300 font-medium">Reduces smoke emissions significantly</span></li>
                      <li className="flex items-start text-base"><span className="text-[#3DD56D] mr-4 text-xl font-bold">✓</span><span className="text-slate-300 font-medium">Eco-friendly wood burning technology</span></li>
                    </ul>
                  </div>

                  {/* Enhanced Stats Row */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-2xl p-5 text-center border border-slate-600/30 backdrop-blur-sm">
                      <h5 className="font-bold text-white text-base mb-3">Efficiency</h5>
                      <div className="text-3xl font-bold text-white mb-3">40%</div>
                      <div className="w-full h-3 bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-inner" style={{ width: '40%' }}></div>
                      </div>
                      <span className="text-xs text-slate-400 mt-2 block">vs Open Fire</span>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-2xl p-5 text-center border border-slate-600/30 backdrop-blur-sm">
                      <h5 className="font-bold text-white text-base mb-3">Warranty</h5>
                      <div className="text-3xl font-bold text-white mb-2">2 years</div>
                      <div className="text-sm text-slate-400">Full Coverage</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Solar System Card */}
            <motion.div
              className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden hover:border-[#3DD56D]/60 transition-all duration-300 group hover:shadow-[#3DD56D]/20"
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Enhanced Header Section */}
              <div className="p-6 pb-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-3xl flex items-center justify-center bg-gradient-to-br from-blue-500/30 to-cyan-500/30 shadow-lg border border-blue-400/30 backdrop-blur-sm">
                    <SunMedium className="h-10 w-10 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white text-2xl mb-2 group-hover:text-[#3DD56D] transition-colors">Household Solar System 200W</div>
                    <div className="text-sm text-slate-400 mb-3">Complete Off-Grid Solution</div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border border-blue-400/30 shadow-lg backdrop-blur-sm">
                        Solar PV
                      </span>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold text-white">4.7</span>
                        <span className="text-xs bg-[#3DD56D]/20 text-[#3DD56D] px-2 py-1 rounded-lg font-semibold">POPULAR</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Price Section */}
                <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-6 mb-6 border border-slate-600/30 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">ETB 16,500</div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-lg text-slate-400 line-through">ETB 19,000</span>
                      <div className="text-lg text-[#3DD56D] font-semibold bg-[#3DD56D]/10 px-3 py-2 rounded-xl">SALE</div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Action Button */}
                <motion.button
                  className="w-full inline-flex items-center justify-center gap-3 whitespace-nowrap text-lg font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-xl h-14 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 text-white border border-blue-400/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Select Product
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Enhanced Details Section */}
              <div className="border-t border-slate-700/30 p-6 pt-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Enhanced Features */}
                  <div>
                    <h4 className="font-bold text-white text-lg mb-4 flex items-center">
                      <div className="w-3 h-3 bg-[#3DD56D] rounded-full mr-3"></div>
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start text-base"><span className="text-[#3DD56D] mr-4 text-xl font-bold">✓</span><span className="text-slate-300 font-medium">200W solar panel included</span></li>
                      <li className="flex items-start text-base"><span className="text-[#3DD56D] mr-4 text-xl font-bold">✓</span><span className="text-slate-300 font-medium">100Ah battery backup system</span></li>
                      <li className="flex items-start text-base"><span className="text-[#3DD56D] mr-4 text-xl font-bold">✓</span><span className="text-slate-300 font-medium">Complete lighting system included</span></li>
                    </ul>
                  </div>

                  {/* Enhanced Stats Row */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-2xl p-5 text-center border border-slate-600/30 backdrop-blur-sm">
                      <h5 className="font-bold text-white text-base mb-3">Efficiency</h5>
                      <div className="text-3xl font-bold text-white mb-3">85%</div>
                      <div className="w-full h-3 bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-inner" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-xs text-slate-400 mt-2 block">Solar Efficiency</span>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-2xl p-5 text-center border border-slate-600/30 backdrop-blur-sm">
                      <h5 className="font-bold text-white text-base mb-3">Warranty</h5>
                      <div className="text-3xl font-bold text-white mb-2">5 years</div>
                      <div className="text-sm text-slate-400">Panels + System</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Water Pump System Card */}
            <motion.div
              className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden hover:border-[#3DD56D]/60 transition-all duration-300 group hover:shadow-[#3DD56D]/20"
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Enhanced Header Section */}
              <div className="p-6 pb-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-3xl flex items-center justify-center bg-gradient-to-br from-emerald-500/30 to-teal-500/30 shadow-lg border border-emerald-400/30 backdrop-blur-sm">
                    <Zap className="h-10 w-10 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-white text-2xl mb-2 group-hover:text-[#3DD56D] transition-colors">Solar Water Pump 500W</div>
                    <div className="text-sm text-slate-400 mb-3">Agricultural Irrigation System</div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-400/30 shadow-lg backdrop-blur-sm">
                        PUE
                      </span>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold text-white">4.6</span>
                        <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg font-semibold">FARMING</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Price Section */}
                <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-6 mb-6 border border-slate-600/30 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">ETB 28,000</div>
                    <div className="text-lg text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-2 rounded-xl inline-block">Premium</div>
                  </div>
                </div>

                {/* Enhanced Action Button */}
                <motion.button
                  className="w-full inline-flex items-center justify-center gap-3 whitespace-nowrap text-lg font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-xl h-14 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-teal-500 hover:to-emerald-500 text-white border border-emerald-400/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Select Product
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Enhanced Details Section */}
              <div className="border-t border-slate-700/30 p-6 pt-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Enhanced Features */}
                  <div>
                    <h4 className="font-bold text-white text-lg mb-4 flex items-center">
                      <div className="w-3 h-3 bg-[#3DD56D] rounded-full mr-3"></div>
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start text-base"><span className="text-[#3DD56D] mr-4 text-xl font-bold">✓</span><span className="text-slate-300 font-medium">2000L/hour flow rate capacity</span></li>
                      <li className="flex items-start text-base"><span className="text-[#3DD56D] mr-4 text-xl font-bold">✓</span><span className="text-slate-300 font-medium">Solar-powered operation system</span></li>
                      <li className="flex items-start text-base"><span className="text-[#3DD56D] mr-4 text-xl font-bold">✓</span><span className="text-slate-300 font-medium">Automatic control system</span></li>
                    </ul>
                  </div>

                  {/* Enhanced Stats Row */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-2xl p-5 text-center border border-slate-600/30 backdrop-blur-sm">
                      <h5 className="font-bold text-white text-base mb-3">Efficiency</h5>
                      <div className="text-3xl font-bold text-white mb-3">90%</div>
                      <div className="w-full h-3 bg-slate-700/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-inner" style={{ width: '90%' }}></div>
                      </div>
                      <span className="text-xs text-slate-400 mt-2 block">Pump Efficiency</span>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-2xl p-5 text-center border border-slate-600/30 backdrop-blur-sm">
                      <h5 className="font-bold text-white text-base mb-3">Warranty</h5>
                      <div className="text-3xl font-bold text-white mb-2">3 years</div>
                      <div className="text-sm text-slate-400">Full System</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </OptimizedBackground>
  )
}