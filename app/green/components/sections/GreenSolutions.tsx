"use client"

import { motion, useReducedMotion } from "framer-motion"
import { SunMedium, Battery, ClipboardList, GraduationCap, Network, Leaf, ArrowRight, BarChart2, Database, Smartphone, Settings2, Twitter } from "lucide-react"
import { useState, useEffect, memo, useMemo, useRef } from "react"
import { OptimizedBackground } from '../shared/OptimizedBackground'

// Performance monitoring hook with throttling
const useBackgroundPerformance = () => {
  const [isLowPerformance, setIsLowPerformance] = useState(false)

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let rafId: number

    const checkPerformance = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime - lastTime >= 1000) {
        const fps = frameCount
        if (fps < 30) {
          setIsLowPerformance(true)
        }
        frameCount = 0
        lastTime = currentTime
      }

      if (!isLowPerformance) {
        rafId = requestAnimationFrame(checkPerformance)
      }
    }

    rafId = requestAnimationFrame(checkPerformance)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [isLowPerformance])

  return isLowPerformance
}

// Optimized background pattern component with memoization
const BackgroundPattern = memo(() => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="solutions-pattern" width="100" height="20" patternUnits="userSpaceOnUse">
        <path
          d="M0,10 C30,15 70,5 100,10"
          fill="none"
          stroke="#3DD56D"
          strokeOpacity="0.1"
          strokeWidth="1"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#solutions-pattern)" />
  </svg>
))

// Optimized background component with conditional rendering
const Background = memo(() => {
  const isLowPerformance = useBackgroundPerformance()
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="fixed inset-0 -z-10">
      {/* Base gradient - always rendered */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-slate-900" />

      {/* Pattern overlay - only show if performance is good */}
      {!isLowPerformance && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          className="absolute inset-0"
        >
          <BackgroundPattern />
        </motion.div>
      )}

      {/* Accent gradient - simplified for low performance */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isLowPerformance ? 'opacity-20' : 'opacity-40'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#3DD56D]/5 to-transparent" />
      </div>
    </div>
  )
})

// Optimized typewriter animation hook
function useTypewriter(words: string[], speed = 70, pause = 1200) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    if (subIndex === words[index].length + 1 && !deleting) {
      const timeout = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(timeout);
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
  }, [subIndex, index, deleting, words, speed, pause, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    const blinkInterval = setInterval(() => setBlink((v) => !v), 500);
    return () => clearInterval(blinkInterval);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return words[0];
  }

  return `${words[index].substring(0, subIndex)}${blink ? '|' : ' '}`;
}

// Memoized solution data
const useSolutionData = () => {
  return useMemo(() => ({
    solutions: [
    {
      icon: <SunMedium className="h-6 w-6" />,
      title: "Solar Panel Services",
      description: "Complete solar energy solutions from specification and design to installation and ongoing support.",
      link: "/solutions/solar-energy",
      bgColor: "bg-[#3DD56D]/10",
      textColor: "text-[#3DD56D]",
      borderColor: "border-[#3DD56D]/20"
    },
    {
      icon: <ClipboardList className="h-6 w-6" />,
      title: "Energy Consultancy",
      description: "Expert guidance to optimize your energy usage and transition to sustainable energy solutions.",
      link: "/solutions/energy-consultancy",
      bgColor: "bg-gradient-to-br from-slate-800 to-slate-900",
      textColor: "text-white",
      borderColor: "border-slate-700/50"
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Training Programs",
      description: "Comprehensive training in renewable energy technologies for professionals and communities.",
      link: "/solutions/training",
      bgColor: "bg-transparent",
      textColor: "text-[#0EA5E9]",
      borderColor: "border-[#0EA5E9]/30"
    },
    {
      icon: <Network className="h-6 w-6" />,
      title: "Energy Hubs Support",
      description: "Community-focused energy centers providing multiple services and infrastructure support.",
      link: "/solutions/energy-hubs",
      bgColor: "bg-transparent",
      textColor: "text-[#8B5CF6]",
      borderColor: "border-none"
    }
    ],
    integratedSolutions: [
    {
      title: "Community Solar Projects",
      description: "Combining solar installation services with energy hub support to create sustainable community energy centers.",
      tags: ["Solar Panel Services", "Energy Hubs Support"],
      icon: <SunMedium className="w-full h-full" />,
      gradient: "from-slate-800 to-slate-900",
      borderColor: "border-slate-700/50",
      hoverBorder: "hover:border-slate-600/60"
    },
    {
      title: "Commercial Energy Transition",
      description: "Comprehensive energy consultancy paired with solar solutions to help businesses reduce costs and carbon footprint.",
      tags: ["Energy Consultancy", "Solar Panel Services"],
      icon: <ClipboardList className="w-full h-full" />,
      gradient: "from-[#3DD56D]/5 to-slate-800/80",
      borderColor: "border-[#3DD56D]/20",
      hoverBorder: "hover:border-[#3DD56D]/40"
    },
    {
      title: "Workforce Development",
      description: "Training programs that prepare local technicians to support the growing network of energy hubs and solar installations.",
      tags: ["Training Programs", "Energy Hubs Support"],
      icon: <GraduationCap className="w-full h-full" />,
      gradient: "from-blue-900/10 to-slate-900",
      borderColor: "border-blue-500/20",
      hoverBorder: "hover:border-blue-500/30"
    },
    {
      title: "Sustainable Campus Initiative",
      description: "Integrated approach combining consultancy, solar implementation, and training for educational institutions.",
      tags: ["Energy Consultancy", "Solar Panel Services", "Training Programs"],
      icon: <Network className="w-full h-full" />,
      gradient: "from-purple-900/10 to-slate-900",
      borderColor: "border-purple-500/20",
      hoverBorder: "hover:border-purple-500/30"
    }
  ]
  }), []);
};

// Optimized animated visual component
const AnimatedVisual = memo(({ icon: Icon }: { icon: React.ElementType }) => {
  const prefersReducedMotion = useReducedMotion();
  const isLowPerformance = useBackgroundPerformance();

  if (prefersReducedMotion || isLowPerformance) {
    return (
      <div className="w-20 h-20 rounded-full bg-[#3DD56D]/40 flex items-center justify-center">
        <Icon className="w-10 h-10 text-white" />
      </div>
    );
  }

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="absolute w-64 h-64 rounded-full bg-[#3DD56D]/10 animate-pulse"></div>
      <div className="absolute w-48 h-48 rounded-full bg-[#3DD56D]/20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute w-32 h-32 rounded-full bg-[#3DD56D]/30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute w-20 h-20 rounded-full bg-[#3DD56D]/40 flex items-center justify-center">
        <Icon className="w-10 h-10 text-white" />
      </div>
    </div>
  );
});

// Add a custom hook for controlling scroll animations
function useScrollAnimation() {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when visibility changes
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return { ref, isInView }
}

// Component props type
interface GreenSolutionsProps {
  noSeam?: boolean;
}

export default function GreenSolutions({ noSeam = false }: GreenSolutionsProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const isLowPerformance = useBackgroundPerformance()
  const prefersReducedMotion = useReducedMotion()
  const { solutions, integratedSolutions } = useSolutionData()
  const { ref: heroCardRef, isInView: heroCardInView } = useScrollAnimation()

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const headline = useTypewriter([
    "Empowering Ethiopia with Sustainable Energy Solutions",
    "Innovative Green Technology for a Better Tomorrow",
    "Building a Sustainable Energy Future Together",
    "Smart Energy Solutions for Modern Ethiopia"
  ])

  return (
    <OptimizedBackground
      id="green-solutions"
      className="relative flex flex-col items-center justify-center px-4 sm:px-6 py-24"
      withGradient={true}
      noSeam={noSeam}
    >
      {/* Content with proper z-index */}
      <div className="relative z-10">
      {/* Hero Section with Loop Text Animation */}
        <div className="max-w-3xl mx-auto text-center mt-8 mb-16">
        <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium mb-6 bg-[#3DD56D]/20 text-[#3DD56D] border border-[#3DD56D]/20 shadow-lg tracking-wide">
          <span className="font-bold">GREAN WORLD</span> Solutions
        </div>
        <h1
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-[#3DD56D] to-[#2bb757] bg-clip-text text-transparent drop-shadow-lg min-h-[3.5em] flex items-center justify-center overflow-hidden line-clamp-2"
        >
          {headline}
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">Comprehensive, innovative, and sustainable energy services for communities and businesses across Ethiopia.</p>
      </div>

      {/* Main Card - Green Solutions Hero */}
        <motion.div
          ref={heroCardRef}
          initial={{ x: -100, opacity: 0 }}
          animate={heroCardInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 20, duration: 0.8 }}
          className="relative w-full max-w-7xl mx-auto rounded-xl shadow-2xl overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 mb-16 z-10"
        >
        {/* Card pattern overlay */}
        <div className="absolute inset-0 opacity-20 z-0 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="wave-pattern" width="100" height="20" patternUnits="userSpaceOnUse">
              <path d="M0,10 C30,15 70,5 100,10 L100,0 L0,0 Z" fill="#4ade80" fillOpacity="0.2"></path>
              </pattern>
            <rect width="100%" height="100%" fill="url(#wave-pattern)" />
            </svg>
        </div>
        <div className="flex flex-col h-full">
          {/* Header Row */}
          <div className="p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-600 flex items-center justify-center">
                <SunMedium className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide"><span className="font-bold">GREAN WORLD</span> Energy</h3>
                <p className="text-xs sm:text-sm text-slate-300">Clean Energy Solutions</p>
              </div>
            </div>
              <div className="bg-slate-800/80 rounded-lg px-3 py-1.5 flex items-center space-x-2 self-start sm:self-auto">
              <Twitter className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
              <p className="text-xs sm:text-sm font-medium text-white">@greansolutions</p>
            </div>
          </div>
          {/* Hero/Headline */}
          <div className="flex-grow flex flex-col lg:flex-row items-center justify-center p-4 sm:p-6 lg:p-8 gap-6 lg:gap-8">
            {/* Left: Headline and description */}
            <div className="max-w-xl text-center lg:text-left mb-6 lg:mb-0 flex-1">
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mb-3 bg-[#3DD56D] text-white">Green Solutions</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Our Green Solutions Platform Accelerates Clean Energy Adoption</h2>
              <p className="text-base sm:text-lg text-slate-300 mb-6">Modernize your community or business with our streamlined approach to sustainable energy that delivers results in weeks, not months.</p>
              {/* Stats card */}
                <div className="bg-slate-800/60 p-4 rounded-lg border border-[#3DD56D]/30 py-4 mb-4 shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
                  <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-[#3DD56D]">60%</div>
                    <div className="text-xs text-slate-300">Energy savings</div>
                  </div>
                  <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-[#3DD56D]">40%</div>
                    <div className="text-xs text-slate-300">Cost reduction</div>
                  </div>
                  <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-[#3DD56D]">3 weeks</div>
                    <div className="text-xs text-slate-300">Avg. implementation</div>
                  </div>
                </div>
              </div>
              {/* Key Solutions card */}
                <div className="bg-gradient-to-r from-[#3DD56D]/20 to-slate-900/80 p-4 sm:p-5 rounded-lg mb-4 shadow-lg border border-[#3DD56D]/30">
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-3">Key Solutions:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#3DD56D]/20 p-2 rounded-full"><SunMedium className="w-4 h-4 sm:w-5 sm:h-5 text-[#3DD56D]" /></div>
                    <span className="text-sm sm:text-base text-white">Solar energy</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#3DD56D]/20 p-2 rounded-full"><Database className="w-4 h-4 sm:w-5 sm:h-5 text-[#3DD56D]" /></div>
                    <span className="text-sm sm:text-base text-white">Energy analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#3DD56D]/20 p-2 rounded-full"><Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-[#3DD56D]" /></div>
                    <span className="text-sm sm:text-base text-white">Mobile monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#3DD56D]/20 p-2 rounded-full"><Settings2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#3DD56D]" /></div>
                    <span className="text-sm sm:text-base text-white">Automation</span>
                  </div>
                </div>
              </div>
              {/* Tags and CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 mt-4 gap-4">
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-[#3DD56D] text-[#3DD56D]">#GreenEnergy</div>
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-[#3DD56D] text-[#3DD56D]">#SustainableTech</div>
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-[#3DD56D] text-[#3DD56D]">#SmartSolutions</div>
                </div>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-gradient-to-r from-[#3DD56D] to-[#2bb757] hover:from-[#2bb757] hover:to-[#3DD56D] text-white relative overflow-hidden group">
                  <span className="relative z-10 flex items-center">
                    See Case Studies
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                  <span className="absolute left-0 bottom-0 w-0 h-1 bg-white group-hover:w-full transition-all duration-300"></span>
                </button>
              </div>
            </div>
            {/* Right: Animated Visual */}
            <div className="flex-1 flex items-center justify-center relative min-h-[250px] sm:min-h-[300px] lg:min-h-0">
                <div className="absolute inset-0 bg-gradient-to-r from-[#3DD56D]/80 to-transparent z-0"></div>
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <div className="relative w-[80%] h-[80%]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-72 h-72 rounded-full bg-[#3DD56D]/20 animate-pulse"></div>
                      <div className="absolute w-56 h-56 rounded-full bg-[#3DD56D]/30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <div className="absolute w-40 h-40 rounded-full bg-[#3DD56D]/40 animate-pulse" style={{ animationDelay: '1s' }}></div>
                      <div className="absolute w-24 h-24 rounded-full bg-[#3DD56D]/50 flex items-center justify-center">
                        <BarChart2 className="w-12 h-12 text-white" />
                      </div>
                      {/* SVG lines/dots */}
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                        <g stroke="rgba(61, 213, 109, 0.4)" fill="none" strokeWidth="1">
                          <path d="M200,100 L100,200 L200,300 L300,200 Z"></path>
                          <path d="M200,100 L300,200"></path>
                          <path d="M100,200 L300,200"></path>
                          <path d="M200,300 L200,100"></path>
                        </g>
                        <g fill="rgba(61, 213, 109, 0.8)">
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
          </div>
          {/* Bottom green glow */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-green-600 to-green-800 py-3 px-8"></div>
        </div>
      </motion.div>

        {/* Solutions Section */}
      <div className="relative pt-10 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="solutions-container">
              {/* Services Section */}
            <section className="flex flex-col items-center py-16 px-4 sm:px-6">
              <div className="w-full max-w-7xl">
                <div className="w-full min-h-[500px] sm:min-h-[600px] lg:min-h-[630px] bg-gradient-to-b from-slate-950 to-slate-900 rounded-xl shadow-lg overflow-hidden relative">
                  <div className="flex h-full flex-col">
                    <div className="flex flex-col lg:flex-row flex-grow">
                      {/* Left: Content */}
                      <div className="w-full lg:w-[55%] p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
                        <div className="space-y-4 sm:space-y-6">
                          {/* Header Row */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
                            <div className="flex items-center space-x-3 sm:space-x-4">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-600 flex items-center justify-center">
                                <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-lg sm:text-xl font-bold text-white">Grean World Energy</h3>
                                <p className="text-xs sm:text-sm text-slate-300">Sustainable Energy Solutions for Ethiopia</p>
                              </div>
                            </div>
                              <div className="bg-slate-800/80 rounded-lg px-3 py-1.5 flex items-center space-x-2 self-start sm:self-auto">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook w-3 h-3 sm:w-4 sm:h-4 text-green-400"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                              <p className="text-xs sm:text-sm font-medium text-white">Green Innovation Hub</p>
                      </div>
                    </div>
                          {/* Product Card */}
                          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-4 rounded-lg shadow-md">
                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mb-2 bg-white/20 backdrop-blur-sm text-white">Sustainable Product</span>
                            <h4 className="text-lg font-semibold mb-2">Sustainable Solutions for a Better World</h4>
                            <p className="text-sm">Our new sustainable product line uses 100% recycled materials and biodegradable packaging to minimize environmental impact while maximizing performance.</p>
                          </div>
                          {/* Features & Impact */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                              <div className="flex items-center space-x-2 mb-2">
                                <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                                <h5 className="font-semibold text-white text-sm">Eco Features</h5>
                              </div>
                              <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                                <li>10Wp-350Wp solar home systems</li>
                                <li>Lighting, phone charging, TV support</li>
                                <li>Professional installation included</li>
                                <li>Local maintenance & training</li>
                              </ul>
                            </div>
                              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                              <div className="flex items-center space-x-2 mb-2">
                                <BarChart2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                                <h5 className="font-semibold text-white text-sm">Environmental Impact</h5>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="text-center">
                                  <div className="text-lg sm:text-xl font-bold text-green-400">270k+</div>
                                  <div className="text-xs text-slate-400">Systems deployed</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg sm:text-xl font-bold text-green-400">500+</div>
                                  <div className="text-xs text-slate-400">Villages reached</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg sm:text-xl font-bold text-green-400">200+</div>
                                  <div className="text-xs text-slate-400">Women entrepreneurs</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-lg sm:text-xl font-bold text-green-400">30k tons</div>
                                  <div className="text-xs text-slate-400">CO₂ reduction</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Tags & CTA */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
                            <div className="flex flex-wrap gap-2">
                              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border border-green-500 text-green-400 bg-transparent">#Sustainable</span>
                              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border border-green-500 text-green-400 bg-transparent">#EcoFriendly</span>
                              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border border-green-500 text-green-400 bg-transparent">#ZeroWaste</span>
                            </div>
                            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs py-1.5">
                                  Learn More
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right ml-1 h-3 w-3"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* Right: Animated Visual */}
                      <div className="w-full lg:w-[45%] relative overflow-hidden min-h-[250px] lg:min-h-0">
                        <div className="absolute inset-0 bg-gradient-to-l from-green-900/80 to-transparent z-0"></div>
                        <div className="absolute inset-0 z-10 flex items-center justify-center">
                          <div className="relative w-[80%] h-[80%]">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-64 h-64 rounded-full bg-green-600/20 animate-pulse"></div>
                              <div className="absolute w-48 h-48 rounded-full bg-green-600/30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                              <div className="absolute w-32 h-32 rounded-full bg-green-600/40 animate-pulse" style={{ animationDelay: '1s' }}></div>
                              <div className="absolute w-20 h-20 rounded-full bg-green-600/50 flex items-center justify-center">
                                <Leaf className="w-10 h-10 text-white" />
                              </div>
                              {/* SVG lines/dots */}
                              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                                <g stroke="rgba(74, 222, 128, 0.4)" fill="none" strokeWidth="1">
                                  <path d="M200,200 L150,150"></path>
                                  <path d="M200,200 L250,150"></path>
                                  <path d="M200,200 L150,250"></path>
                                  <path d="M200,200 L250,250"></path>
                                  <path d="M200,200 L120,200"></path>
                                  <path d="M200,200 L280,200"></path>
                                  <path d="M200,200 L200,120"></path>
                                  <path d="M200,200 L200,280"></path>
                                </g>
                                <g fill="rgba(74, 222, 128, 0.8)">
                                  <circle cx="150" cy="150" r="4"></circle>
                                  <circle cx="250" cy="150" r="4"></circle>
                                  <circle cx="150" cy="250" r="4"></circle>
                                  <circle cx="250" cy="250" r="4"></circle>
                                  <circle cx="120" cy="200" r="4"></circle>
                                  <circle cx="280" cy="200" r="4"></circle>
                                  <circle cx="200" cy="120" r="4"></circle>
                                  <circle cx="200" cy="280" r="4"></circle>
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Bottom green glow */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-green-600 to-green-800 py-3 px-8"></div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Enhanced Integrated Solutions Section */}
              <section className="py-24 px-4 sm:px-6 relative">

                <div className="max-w-7xl mx-auto relative z-10">
                  {/* Enhanced Section Header */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="text-center mb-20"
                  >
                    <motion.div
                      className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold mb-8 bg-gradient-to-r from-[#3DD56D]/20 to-emerald-500/20 text-[#3DD56D] border border-[#3DD56D]/30 shadow-xl backdrop-blur-sm"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Network className="mr-3 h-5 w-5" />
                      <span>Complete Integrated Solutions</span>
                    </motion.div>

                    <motion.h2
                      className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <span className="bg-gradient-to-r from-white via-[#3DD56D] to-emerald-400 bg-clip-text text-transparent drop-shadow-2xl">
                        Integrated Service
                      </span>
                      <br />
                      <span className="bg-gradient-to-r from-emerald-400 via-[#3DD56D] to-white bg-clip-text text-transparent">
                        Approach
                      </span>
                    </motion.h2>

                    <motion.p
                      className="text-slate-300 text-xl leading-relaxed max-w-3xl mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      Our comprehensive services work together seamlessly to provide end-to-end energy solutions that transform communities and businesses across Ethiopia.
                    </motion.p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                  {/* Enhanced Premium Hero Card */}
                  <motion.div
                    key={integratedSolutions[0].title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="col-span-1 md:col-span-2 relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-[#3DD56D]/30 backdrop-blur-xl hover:border-[#3DD56D]/60 transition-all duration-500 hover:shadow-[#3DD56D]/20"
                    style={{ minHeight: '500px' }}
                  >
                    {/* Enhanced Background Pattern */}
                    <div className="absolute inset-0 opacity-10 z-0 pointer-events-none">
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <pattern id="premium-energy-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                          <circle cx="30" cy="30" r="20" fill="none" stroke="#3DD56D" strokeWidth="1" opacity="0.3"/>
                          <circle cx="30" cy="30" r="10" fill="#3DD56D" opacity="0.2"/>
                          <path d="M20,20 L40,40 M40,20 L20,40" stroke="#3DD56D" strokeWidth="1" opacity="0.4"/>
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#premium-energy-pattern)" />
                      </svg>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3DD56D]/5 via-transparent to-emerald-500/5 z-1" />
                    <div className="relative z-10 flex flex-col lg:flex-row h-full">
                      {/* Enhanced Content Section */}
                      <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-between">
                        <div>
                          {/* Enhanced Tags */}
                          <div className="flex flex-wrap gap-3 mb-6">
                            {integratedSolutions[0].tags.map((tag, tagIndex) => (
                              <motion.span
                                key={tagIndex}
                                className="text-sm font-semibold border-2 border-[#3DD56D] text-[#3DD56D] px-4 py-2 rounded-xl bg-[#3DD56D]/10 backdrop-blur-sm hover:bg-[#3DD56D]/20 transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </div>

                          {/* Enhanced Title */}
                          <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-white leading-tight">
                            {integratedSolutions[0].title}
                          </h3>

                          {/* Enhanced Description */}
                          <p className="text-lg text-slate-300 leading-relaxed mb-8 font-medium">
                            {integratedSolutions[0].description}
                          </p>

                          {/* Enhanced Features List */}
                          <div className="mb-8">
                            <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                              <div className="w-2 h-2 bg-[#3DD56D] rounded-full mr-3"></div>
                              Key Benefits
                            </h4>
                            <ul className="space-y-3">
                              <li className="flex items-start text-base">
                                <span className="text-[#3DD56D] mr-3 text-lg font-bold">✓</span>
                                <span className="text-slate-300 font-medium">Comprehensive energy assessment and planning</span>
                              </li>
                              <li className="flex items-start text-base">
                                <span className="text-[#3DD56D] mr-3 text-lg font-bold">✓</span>
                                <span className="text-slate-300 font-medium">Professional installation and maintenance</span>
                              </li>
                              <li className="flex items-start text-base">
                                <span className="text-[#3DD56D] mr-3 text-lg font-bold">✓</span>
                                <span className="text-slate-300 font-medium">Community training and support programs</span>
                              </li>
                            </ul>
                          </div>

                          {/* Enhanced CTA Button */}
                          <motion.button
                            className="inline-flex items-center justify-center gap-3 whitespace-nowrap text-lg font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DD56D] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-xl h-14 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#3DD56D] to-emerald-500 hover:from-emerald-500 hover:to-[#3DD56D] text-white border border-[#3DD56D]/30"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Explore Solution
                            <ArrowRight className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>
                      {/* Enhanced Animated Visual */}
                      <div className="w-full lg:w-1/2 flex items-center justify-center relative min-h-[300px] lg:min-h-0 p-8">
                        <div className="relative w-80 h-80 flex items-center justify-center">
                          {/* Enhanced Animated Rings */}
                          <motion.div
                            className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-[#3DD56D]/10 to-emerald-500/10 border border-[#3DD56D]/20"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          />
                          <motion.div
                            className="absolute w-60 h-60 rounded-full bg-gradient-to-r from-emerald-500/15 to-[#3DD56D]/15 border border-emerald-500/25"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                          />
                          <motion.div
                            className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-[#3DD56D]/20 to-emerald-500/20 border border-[#3DD56D]/30"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          />

                          {/* Central Icon */}
                          <motion.div
                            className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-[#3DD56D] to-emerald-500 flex items-center justify-center shadow-2xl border-4 border-white/20"
                            whileHover={{ scale: 1.1 }}
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <div className="text-white w-12 h-12">
                              {integratedSolutions[0].icon}
                            </div>
                          </motion.div>

                          {/* Floating Elements */}
                          <motion.div
                            className="absolute top-8 right-8 w-6 h-6 bg-[#3DD56D]/60 rounded-full"
                            animate={{ y: [0, -20, 0], opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                          />
                          <motion.div
                            className="absolute bottom-8 left-8 w-4 h-4 bg-emerald-500/60 rounded-full"
                            animate={{ y: [0, -15, 0], opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                          />
                          <motion.div
                            className="absolute top-16 left-16 w-3 h-3 bg-[#3DD56D]/80 rounded-full"
                            animate={{ y: [0, -10, 0], opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  {/* Enhanced Secondary Solution Cards */}
                  {integratedSolutions.slice(1).map((solution, index) => (
                      <motion.div
                        key={solution.title}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.8 + (index * 0.2) }}
                        whileHover={{ y: -6, scale: 1.02 }}
                        className="rounded-3xl overflow-hidden relative group bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-slate-700/50 hover:border-[#3DD56D]/60 min-h-[400px] backdrop-blur-xl shadow-2xl hover:shadow-[#3DD56D]/20 transition-all duration-500"
                      >
                        {/* Enhanced Background Pattern */}
                        <div className="absolute inset-0 opacity-5 z-0 pointer-events-none">
                          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <pattern id={`solution-pattern-${index}`} width="40" height="40" patternUnits="userSpaceOnUse">
                              <circle cx="20" cy="20" r="15" fill="none" stroke="#3DD56D" strokeWidth="1" opacity="0.3"/>
                              <circle cx="20" cy="20" r="5" fill="#3DD56D" opacity="0.2"/>
                            </pattern>
                            <rect width="100%" height="100%" fill={`url(#solution-pattern-${index})`} />
                          </svg>
                        </div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#3DD56D]/5 via-transparent to-emerald-500/5 z-1" />

                        <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col">
                          {/* Enhanced Tags */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {solution.tags.map((tag, tagIndex) => (
                              <motion.span
                                key={tagIndex}
                                className="text-xs font-semibold bg-[#3DD56D]/10 text-[#3DD56D] px-3 py-2 rounded-xl border border-[#3DD56D]/30 backdrop-blur-sm hover:bg-[#3DD56D]/20 transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </div>

                          {/* Enhanced Title */}
                          <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-white group-hover:text-[#3DD56D] transition-colors duration-300 leading-tight">
                            {solution.title}
                          </h3>

                          {/* Enhanced Description */}
                          <p className="text-base text-slate-300 leading-relaxed flex-grow mb-6 font-medium">
                            {solution.description}
                          </p>

                          {/* Enhanced Features */}
                          <div className="mb-6">
                            <ul className="space-y-2">
                              <li className="flex items-start text-sm">
                                <span className="text-[#3DD56D] mr-3 text-base font-bold">✓</span>
                                <span className="text-slate-300">Comprehensive planning and implementation</span>
                              </li>
                              <li className="flex items-start text-sm">
                                <span className="text-[#3DD56D] mr-3 text-base font-bold">✓</span>
                                <span className="text-slate-300">Professional support and maintenance</span>
                              </li>
                              <li className="flex items-start text-sm">
                                <span className="text-[#3DD56D] mr-3 text-base font-bold">✓</span>
                                <span className="text-slate-300">Long-term sustainability focus</span>
                              </li>
                            </ul>
                          </div>

                          {/* Enhanced CTA Button */}
                          <motion.button
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DD56D] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-lg h-12 px-6 py-3 rounded-xl bg-gradient-to-r from-[#3DD56D]/80 to-emerald-500/80 hover:from-[#3DD56D] hover:to-emerald-500 text-white border border-[#3DD56D]/30 mt-auto"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Learn More
                            <ArrowRight className="w-4 h-4" />
                          </motion.button>

                          {/* Enhanced Icon */}
                          <motion.div
                            className="absolute bottom-6 right-6 w-16 h-16 opacity-20 group-hover:opacity-40 transition-all duration-300 text-[#3DD56D]"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            {solution.icon}
                          </motion.div>

                          {/* Enhanced Accent Dot */}
                          <motion.div
                            className="absolute left-6 top-6 w-3 h-3 rounded-full bg-[#3DD56D] shadow-lg"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>


                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </OptimizedBackground>
  )
}