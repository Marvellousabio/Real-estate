import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const animation = setTimeout(() => {
      let start = 0
      const end = value
      const increment = end / (duration * 60) // 60fps

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.ceil(start))
        }
      }, 1000/60) // 60 frames per second

      return () => clearInterval(timer)
    }, 500) // Small delay before starting

    return () => clearTimeout(animation)
  }, [value, duration])

  return (
    <motion.span 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {count.toLocaleString()}
    </motion.span>
  )
}

export default AnimatedCounter