import { AfterViewInit, Directive, ElementRef, OnDestroy, inject } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Fade + translate-up reveal driven by ScrollTrigger.
 * Apply to any element: <h2 appReveal>...</h2>
 */
@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective implements AfterViewInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private trigger?: ScrollTrigger;

  ngAfterViewInit(): void {
    const node = this.el.nativeElement;
    gsap.set(node, { opacity: 0, y: 32 });
    this.trigger = ScrollTrigger.create({
      trigger: node,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(node, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' });
      }
    });
  }

  ngOnDestroy(): void {
    this.trigger?.kill();
  }
}
