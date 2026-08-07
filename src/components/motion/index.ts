export { MotionProvider, MotionContext, MOTION_PREFERENCE_STORAGE_KEY } from './MotionProvider'
export type { MotionProviderProps, MotionContextValue } from './MotionProvider'
export { FadeIn, type FadeInProps } from './FadeIn'
export { Reveal, type RevealProps } from './Reveal'
export { Stagger, type StaggerProps } from './Stagger'
export { Parallax, type ParallaxProps } from './Parallax'
export { Emerge, type EmergeProps } from './Emerge'
export { FilmDirector } from './FilmDirector'
export { MotionDebugPanel } from './MotionDebugPanel'
/*
 * Retired by the approved direction "The Film":
 *   AtmosphereLayer  superseded — the page mounts FilmDirector directly
 *   Grain            superseded by components/film/FilmGrain (film movements only)
 *   Atmosphere       dust motes are not part of this direction
 *   Grade            a global tint wash fights the per-movement grounds
 *   SpotlightCursor  custom cursors are on the prohibited list
 */
export { useRevealOnScroll, type RevealConfig } from './useRevealOnScroll'
