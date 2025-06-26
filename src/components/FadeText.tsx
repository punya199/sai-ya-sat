import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'

export const FadeText = ({ children }: { children: React.ReactNode }) => {
  const [currentChildren, setCurrentChildren] = useState(children)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (children !== currentChildren) {
      // Start fade out
      setIsVisible(false)
    }
  }, [children, currentChildren])

  const handleExitComplete = useCallback(() => {
    // After fade out completes, update content and fade in
    setCurrentChildren(children)
    setIsVisible(true)
  }, [children])

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          key={String(currentChildren)} // Convert to string for stable key
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
        >
          {currentChildren}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
