"use client"

import { useRouter } from "next/navigation"
import { useEnergySystemStore } from "@/store/energySystemStore"
import { useState, useEffect, useCallback, useRef } from "react"
import {
  Power,
  Zap,
  Home,
  ShoppingBag,
  Info,
  MessageSquare,
  ExternalLink
} from "lucide-react"

export function NavigationMenu() {
  const router = useRouter()
  const { setInverterActive, setSwitchActive } = useEnergySystemStore()
  const [activeSection, setActiveSection] = useState('green-intro')
  const [clickedSection, setClickedSection] = useState<string | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Enhanced scroll detection with better viewport calculation
  const handleScroll = useCallback(() => {
    const sectionIds = [
      'green-intro',
      'green-home',
      'green-about',
      'green-solutions',
      'green-products',
      'green-contact'
    ];

    // Find the section that's most visible in the viewport
    let currentSection = sectionIds[0];
    let maxVisibleArea = 0;

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calculate visible area of the section
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(viewportHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        // Calculate percentage of section visible
        const sectionHeight = rect.height;
        const visiblePercentage = sectionHeight > 0 ? visibleHeight / sectionHeight : 0;

        // Prioritize sections that are more than 30% visible
        // or if the section takes up significant viewport space
        const visibleArea = visibleHeight * visiblePercentage;

        // Special handling for sections near the top of viewport
        const isNearTop = rect.top <= viewportHeight * 0.3 && rect.bottom >= viewportHeight * 0.1;

        if ((visibleArea > maxVisibleArea && visiblePercentage > 0.3) ||
            (isNearTop && visibleArea > maxVisibleArea * 0.5)) {
          maxVisibleArea = visibleArea;
          currentSection = id;
        }
      }
    });

    setActiveSection(currentSection);
  }, []);

  // Throttled scroll handler for better performance
  const throttledScrollHandler = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      handleScroll();
    }, 16); // ~60fps
  }, [handleScroll]);

  useEffect(() => {
    // Initial call to set active section
    handleScroll();

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      window.removeEventListener('resize', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [throttledScrollHandler, handleScroll]);

  const handlePowerOff = () => {
    // Only turn off the switch, leave inverter state unchanged
    setSwitchActive(false)

    // Add a small delay to ensure the state is updated before redirecting
    setTimeout(() => {
      router.push('/')
    }, 100)
  }

  // Helper function to get dynamic styling based on active state
  const getMenuItemStyling = (sectionId: string) => {
    const isActive = activeSection === sectionId;
    const isClicked = clickedSection === sectionId;

    if (isActive) {
      return {
        container: "bg-[#3DD56D]/20 text-[#3DD56D] hover:bg-[#3DD56D]/30 border-2 border-[#3DD56D]/50 shadow-lg shadow-[#3DD56D]/20",
        label: "text-[#3DD56D] font-semibold",
        icon: "text-[#3DD56D]"
      };
    }

    return {
      container: "bg-slate-800/50 text-slate-400 hover:bg-slate-700/80 border-2 border-transparent",
      label: "text-white/0 group-hover:text-white/80",
      icon: "text-slate-400"
    };
  };

  const menuItems = [
    {
      icon: <Zap className="w-[18px] h-[18px]" />,
      label: "Intro",
      href: "#green-intro",
      sectionId: "green-intro"
    },
    {
      icon: <Home className="w-[18px] h-[18px]" />,
      label: "Home",
      href: "#green-home",
      sectionId: "green-home"
    },
    {
      icon: <Info className="w-[18px] h-[18px]" />,
      label: "About",
      href: "#green-about",
      sectionId: "green-about"
    },
    {
      icon: <Zap className="w-[18px] h-[18px]" />,
      label: "Solutions",
      href: "#green-solutions",
      sectionId: "green-solutions"
    },
    {
      icon: <ShoppingBag className="w-[18px] h-[18px]" />,
      label: "Products",
      href: "#green-products",
      sectionId: "green-products"
    },
    {
      icon: <MessageSquare className="w-[18px] h-[18px]" />,
      label: "Contact",
      href: "#green-contact",
      sectionId: "green-contact"
    }
  ];

  // Coming Soon nav item always at the bottom
  const comingSoonItem = {
    icon: <ExternalLink className="w-[18px] h-[18px]" />,
    label: "Coming Soon",
    href: "/green/sister",
    className: "bg-slate-800/50 text-slate-400 hover:bg-slate-700/80"
  };

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-end">
      <ul className="flex flex-col items-end gap-6">
        {menuItems.map((item, index) => {
          const styling = getMenuItemStyling(item.sectionId);
          const isActive = activeSection === item.sectionId;

          return (
            <li key={index} className="relative group">
              <a
                href={item.href}
                className="flex items-center cursor-pointer"
                onClick={(e) => {
                  if (item.href.startsWith('#')) {
                    e.preventDefault();
                    const sectionId = item.href.slice(1);
                    setClickedSection(sectionId);
                    const element = document.getElementById(sectionId);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                aria-label={`Navigate to ${item.label} section`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={`
                  ${styling.label} text-sm font-medium mr-3
                  transition-all duration-300 absolute right-full whitespace-nowrap
                  ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                `}>
                  {item.label}
                </span>
                <div className={`
                  w-10 h-10 rounded-full
                  flex items-center justify-center
                  transition-all duration-300 transform
                  ${styling.container}
                  ${isActive ? 'scale-110' : 'scale-100 hover:scale-105'}
                `}>
                  <span className={`transition-colors duration-300 ${styling.icon}`}>
                    {item.icon}
                  </span>
                </div>

                {/* Active indicator pulse effect */}
                {isActive && (
                  <div className="absolute inset-0 rounded-full border-2 border-[#3DD56D] animate-pulse" />
                )}

                {/* Clicked indicator (secondary highlight) */}
                {item.href.startsWith('#') && clickedSection === item.href.slice(1) && !isActive && (
                  <div className="absolute inset-0 rounded-full border-2 border-[#3DD56D]/60" />
                )}
              </a>
            </li>
          );
        })}
        {/* Coming Soon nav item at the bottom */}
        <li className="relative group mt-8">
          <a
            href={comingSoonItem.href}
            className="flex items-center cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-white/0 group-hover:text-white/80 text-sm font-medium mr-3 transition-all duration-300 absolute right-full whitespace-nowrap">
              {comingSoonItem.label}
            </span>
            <div className={`
              w-10 h-10 rounded-full
              flex items-center justify-center
              transition-all duration-300
              ${comingSoonItem.className}
            `}>
              {comingSoonItem.icon}
            </div>
          </a>
        </li>

        {/* Power Off Button */}
        <li className="relative group mt-4">
          <button
            onClick={handlePowerOff}
            className="flex items-center cursor-pointer"
          >
            <span className="text-white/0 group-hover:text-white/80 text-sm font-medium mr-3 transition-all duration-300 absolute right-full whitespace-nowrap">
              Power Off
            </span>
            <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300">
              <Power className="w-[18px] h-[18px]" />
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
}