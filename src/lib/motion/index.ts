export { gsap, ScrollTrigger, useGSAP, registerGsap, isGsapRegistered, killScrollTriggers } from './gsap'
export {
  detectCapability,
  isLowCapabilityDevice,
  meetsParallaxBreakpoint,
  meetsPinningBreakpoint,
  prefersReducedMotion,
  prefersSaveData,
  FULL_MOTION,
  NO_MOTION,
  type MotionCapability,
} from './capability'
export {
  applyFinalState,
  curtainUp,
  fadeRise,
  resolveStagger,
  slideReveal,
  spotIn,
  staggerFadeRise,
  type AnimationTarget,
  type RevealOptions,
} from './animations'
