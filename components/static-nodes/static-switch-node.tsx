"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { playButtonClickSound } from "@/utils/sound"

interface StaticSwitchNodeProps {
  position: { x: number; y: number }
  switchOn: boolean
  onSwitchChange?: (value: boolean) => void
  scale?: number
}

export default function StaticSwitchNode({
  position,
  switchOn = false,
  onSwitchChange,
  scale = 1,
}: StaticSwitchNodeProps) {
  const [pressed, setPressed] = useState(false)
  const [hovered, setHovered] = useState(false)
  const energyColor = "#00ff9d"
  const glowColor = "rgba(0, 255, 157, 0.7)"

  // Calculate responsive dimensions based on scale and screen size
  const getResponsiveDimensions = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 768) {
        // Mobile: ensure minimum touch target of 44px
        const minSize = 44;
        const calculatedSize = 128 * scale;
        const finalSize = Math.max(minSize, calculatedSize);
        return { width: finalSize, height: finalSize, touchPadding: Math.max(0, (minSize - calculatedSize) / 2) };
      }
    }
    // Desktop/Tablet: use calculated scale
    const size = 128 * scale;
    return { width: size, height: size, touchPadding: 0 };
  };

  const [dimensions, setDimensions] = useState(getResponsiveDimensions());

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getResponsiveDimensions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [scale]);

  const nodeWidth = dimensions.width
  const nodeHeight = dimensions.height

  // Toggle switch on click
  const handleToggle = () => {
    setPressed(true)
    playButtonClickSound()

    if (typeof onSwitchChange === "function") {
      onSwitchChange(!switchOn)
    }
    setTimeout(() => setPressed(false), 150)
  }

  return (
    <div
      data-node-id="switch"
      className="absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        width: `${nodeWidth}px`,
        height: `${nodeHeight}px`,
        perspective: "1000px",
      }}
    >
      <motion.div
        className="relative w-full h-full flex flex-col items-center justify-center select-none cursor-pointer"
        onClick={handleToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "transparent",
          transformStyle: "preserve-3d",
          padding: `${dimensions.touchPadding}px`,
          minWidth: "44px",
          minHeight: "44px",
        }}
        animate={{
          rotateX: pressed ? 5 : hovered ? -2 : 0,
          rotateY: pressed ? 2 : hovered ? 1 : 0,
          scale: pressed ? 0.95 : hovered ? 1.05 : 1,
          y: pressed ? 4 : hovered ? -2 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
      >
        {/* 3D Base Shadow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, transparent 70%)",
            transform: "translateZ(-20px) rotateX(90deg)",
            filter: "blur(8px)",
            zIndex: -2,
          }}
          animate={{
            opacity: pressed ? 0.8 : hovered ? 0.6 : 0.4,
            scale: pressed ? 0.9 : hovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Enhanced Drop Shadow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 60%, transparent 80%)",
            transform: "translateY(8px) translateZ(-10px)",
            filter: "blur(12px)",
            zIndex: -1,
          }}
          animate={{
            opacity: pressed ? 0.7 : hovered ? 0.5 : 0.3,
            scale: pressed ? 0.85 : hovered ? 1.15 : 1,
            y: pressed ? 12 : hovered ? 6 : 8,
          }}
          transition={{ duration: 0.3 }}
        />
        {/* Enhanced 3D breathing glow effect - always active */}
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: switchOn ? [0.3, 0.8] : [0.2, 0.5],
            scale: switchOn ? [0.9, 1.2] : [0.95, 1.1],
          }}
          transition={{
            duration: switchOn ? 3 : 4,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
          style={{
            background: switchOn
              ? `radial-gradient(circle, ${glowColor} 0%, rgba(0, 255, 157, 0.3) 40%, rgba(0, 255, 157, 0.1) 70%, transparent 90%)`
              : `radial-gradient(circle, rgba(0, 255, 157, 0.4) 0%, rgba(0, 255, 157, 0.2) 40%, rgba(0, 255, 157, 0.05) 70%, transparent 90%)`,
            filter: switchOn ? "blur(15px)" : "blur(12px)",
            transform: "translateZ(5px)",
            zIndex: 0,
          }}
        />

        {/* Enhanced energy pulse rings with 3D effect - always active */}
        <>
          {[1, 2, 3].map((i) => (
            <motion.div
              key={`pulse-${i}`}
              className="absolute inset-0 rounded-full border-2"
              style={{
                borderColor: energyColor,
                borderWidth: switchOn ? "2px" : "1px",
                transform: `translateZ(${i * 2}px)`,
                boxShadow: switchOn
                  ? `0 0 ${10 + i * 5}px ${energyColor}`
                  : `0 0 ${5 + i * 2}px ${energyColor}`,
              }}
              initial={{ opacity: 0.6, scale: 0.7 }}
              animate={{
                opacity: switchOn ? [0.6, 0.2, 0] : [0.3, 0.1, 0],
                scale: switchOn ? [0.7, 1.6] : [0.8, 1.3],
              }}
              transition={{
                duration: switchOn ? 2.5 : 3.5,
                repeat: Infinity,
                delay: i * 0.7,
                ease: "easeOut",
              }}
            />
          ))}
        </>

        {/* 3D Switch container with enhanced depth */}
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transform: "translateZ(10px)",
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateX: pressed ? 3 : 0,
            rotateY: pressed ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Switch base shadow for depth */}
          <motion.div
            className="absolute inset-0 rounded-lg"
            style={{
              background: "linear-gradient(145deg, rgba(0,0,0,0.2), rgba(0,0,0,0.1))",
              transform: "translateZ(-5px) translateY(2px)",
              filter: "blur(4px)",
              borderRadius: "12px",
            }}
            animate={{
              opacity: pressed ? 0.8 : hovered ? 0.4 : 0.2,
            }}
            transition={{ duration: 0.3 }}
          />

          <motion.img
            src="/images/light-switch.png"
            alt="Light Switch"
            className="object-contain"
            animate={{
              filter: switchOn
                ? `brightness(1.3) contrast(1.1) drop-shadow(0 0 15px rgba(0, 255, 157, 0.8)) drop-shadow(0 4px 8px rgba(0,0,0,0.3))`
                : `brightness(1.0) contrast(1.05) drop-shadow(0 0 8px rgba(0, 255, 157, 0.4)) drop-shadow(0 2px 4px rgba(0,0,0,0.2))`,
              scale: pressed ? 0.92 : hovered ? 1.02 : 1,
            }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            style={{
              width: "75%",
              height: "75%",
              zIndex: 1,
              transform: "translateZ(5px)",
            }}
          />
        </motion.div>

        {/* Enhanced Power ON message with 3D effect */}
        {switchOn && (
          <motion.div
            className="absolute right-0 bottom-1/2 transform translate-y-1/2 translate-x-full ml-2"
            initial={{ opacity: 0, x: -10, scale: 0.8 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              y: [0, -2],
            }}
            exit={{ opacity: 0, x: -10, scale: 0.8 }}
            transition={{
              duration: 0.4,
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "reverse",
              }
            }}
            style={{
              transform: "translateZ(15px)",
            }}
          >
            <motion.div
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg"
              style={{
                boxShadow: "0 4px 12px rgba(34, 197, 94, 0.4), 0 0 20px rgba(34, 197, 94, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
              animate={{
                boxShadow: [
                  "0 4px 12px rgba(34, 197, 94, 0.4), 0 0 20px rgba(34, 197, 94, 0.2)",
                  "0 6px 16px rgba(34, 197, 94, 0.6), 0 0 25px rgba(34, 197, 94, 0.3)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "reverse",
              }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-white"
                animate={{
                  scale: [1, 1.2],
                  opacity: [1, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "reverse",
                }}
              />
              <span className="font-semibold tracking-wide">ON</span>
            </motion.div>
          </motion.div>
        )}

        {/* Subtle idle floating animation */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            y: [0, -1],
            rotateZ: [0, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
        />
      </motion.div>
    </div>
  )
}
