import { Variants } from 'framer-motion'

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
}

export const hoverGrow: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.18 } },
}

export default {
  fadeIn,
  fadeUp,
  staggerContainer,
  hoverGrow,
}
