import { DestroyRef, Injectable, NgZone, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth-scroll engine bridged with GSAP ScrollTrigger.
 * Exposes a normalized progress signal (0 → 1) for the page.
 *
 * Usage:
 *   constructor(private scroll: ScrollService) {
 *     scroll.init();
 *   }
 */
@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly zone = inject(NgZone);
  private lenis: Lenis | null = null;
  private rafId = 0;

  /** 0 → 1 scroll progress for the entire page. */
  readonly progress = signal(0);
  /** Current scroll velocity (px/frame), useful for camera shake/wind effects. */
  readonly velocity = signal(0);

  init(): void {
    if (typeof window === 'undefined') return;
    if (this.lenis) return;

    this.zone.runOutsideAngular(() => {
      this.lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false
      });

      this.lenis.on('scroll', (e: { progress: number; velocity: number }) => {
        this.progress.set(e.progress);
        this.velocity.set(e.velocity);
        ScrollTrigger.update();
      });

      const raf = (time: number) => {
        this.lenis?.raf(time);
        this.rafId = requestAnimationFrame(raf);
      };
      this.rafId = requestAnimationFrame(raf);

      // Make GSAP ScrollTrigger use Lenis as the scroller
      gsap.ticker.lagSmoothing(0);
    });
  }

  scrollTo(target: string | number, options?: { offset?: number; duration?: number }): void {
    this.lenis?.scrollTo(target, {
      offset: options?.offset ?? 0,
      duration: options?.duration ?? 1.4
    });
  }

  destroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.lenis?.destroy();
    this.lenis = null;
    ScrollTrigger.killAll();
  }
}
