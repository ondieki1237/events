"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Flame } from "lucide-react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const calculateTimeLeft = () => {
      // Set deadline to end of November
      const deadline = new Date("2024-11-30T23:59:59").getTime()
      const now = new Date().getTime()
      const difference = deadline - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return null
  }

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <motion.div
      className="flex flex-col items-center"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-br from-[#0096d9] to-blue-700 text-white font-bold rounded-lg p-2 sm:p-3 min-w-12 sm:min-w-16 flex items-center justify-center shadow-lg border-2 border-cyan-300"
      >
        <span className="text-xl sm:text-2xl md:text-3xl">{String(value).padStart(2, "0")}</span>
      </motion.div>
      <span className="text-xs sm:text-sm font-semibold text-gray-600 mt-2 uppercase">{label}</span>
    </motion.div>
  )

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-8 sm:py-12 px-4 md:px-8 lg:px-12 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-blue-600/20 to-cyan-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-blue-600/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          {/* Title */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}>
              <Flame className="text-red-500 w-6 h-6 sm:w-8 sm:h-8" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white text-center">
              Black November <span className="text-cyan-400">Deadline</span>
            </h2>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}>
              <Flame className="text-red-500 w-6 h-6 sm:w-8 sm:h-8" />
            </motion.div>
          </motion.div>

          {/* Countdown */}
          <div className="flex gap-3 sm:gap-4 md:gap-6 flex-wrap justify-center">
            <TimeUnit value={timeLeft.days} label="Days" />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
              className="text-2xl sm:text-4xl font-black text-[#0096d9] mt-6"
            >
              :
            </motion.div>
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
              className="text-2xl sm:text-4xl font-black text-[#0096d9] mt-6"
            >
              :
            </motion.div>
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
              className="text-2xl sm:text-4xl font-black text-[#0096d9] mt-6"
            >
              :
            </motion.div>
            <TimeUnit value={timeLeft.seconds} label="Seconds" />
          </div>

          {/* Interactive message */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-base sm:text-lg text-gray-200 max-w-2xl leading-relaxed px-2"
          >
            Don't miss out! Exclusive Black November deals ending soon. Shop now and get up to{" "}
            <span className="font-bold text-cyan-400">30% off</span> on selected medical equipment.
          </motion.p>
        </div>
      </div>
    </motion.section>
  )
}
