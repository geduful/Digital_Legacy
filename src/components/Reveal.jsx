import { motion } from 'framer-motion'

const variants = {
  hidden: (direction) => ({
    opacity: 0,
    y: direction === 'up' ? 44 : direction === 'down' ? -44 : 0,
    x: direction === 'left' ? 36 : direction === 'right' ? -36 : 0,
    filter: 'blur(8px)',
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
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
