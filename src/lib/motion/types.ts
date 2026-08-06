/**
 * GSAP type aliases.
 *
 * GSAP declares an ambient global `gsap` namespace. Any module that also
 * imports `gsap` as a *value* shadows that namespace, so `gsap.core.Tween`
 * stops resolving in type position. This file imports nothing, so the global
 * namespace is visible — every other module imports the aliases from here.
 */

export type GsapTween = gsap.core.Tween
export type GsapTimeline = gsap.core.Timeline
export type GsapContext = gsap.Context
export type GsapTweenTarget = gsap.TweenTarget
