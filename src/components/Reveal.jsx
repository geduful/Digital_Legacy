import { motion } from 'framer-motion'

// Transform + opacity only — blur filters are deliberately avoided so
// reveals stay cheap on mobile GPUs.
const variants = {
  hidden: (direction) => ({
    opacity: 0,
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    x: direction === 'left' ? 32 : direction === 'right' ? -32 : 0,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  once = true,
}) {
  return (
    <motion.div
      className={className}
      variants={variants}
      custom={direction}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-70px' }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
