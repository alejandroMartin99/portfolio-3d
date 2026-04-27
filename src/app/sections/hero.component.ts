import { ChangeDetectionStrategy, Component } from '@angular/core';
import { profile } from '@core/data/portfolio.data';
import { RevealDirective } from '@shared/directives/reveal.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="hero" class="hero">
      <div class="container content">
        <p class="eyebrow" appReveal>{{ profile.location }}</p>
        <h1 appReveal>
          <span class="name">{{ profile.name }}</span>
        </h1>
        <p class="headline" appReveal>{{ profile.headline }}</p>
        <p class="oneliner" appReveal>{{ profile.oneLiner }}</p>
        <div class="scroll-hint" appReveal>
          <span class="mono">scroll</span>
          <span class="line"></span>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        min-height: 100vh;
        display: flex;
        align-items: center;
        position: relative;
      }
      .content {
        position: relative;
        z-index: 2;
        max-width: 60rem;
      }
      .name {
        display: block;
        line-height: 0.95;
      }
      .headline {
        margin-top: 1.5rem;
        font-size: clamp(1.1rem, 1.6vw, 1.4rem);
        color: var(--fg);
        max-width: none;
        font-weight: 400;
      }
      .oneliner {
        margin-top: 0.5rem;
        font-size: clamp(1rem, 1.4vw, 1.2rem);
        color: var(--fg-muted);
      }
      .scroll-hint {
        margin-top: 4rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        color: var(--fg-muted);
        font-size: 0.7rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
      }
      .scroll-hint .line {
        width: 60px;
        height: 1px;
        background: var(--fg-muted);
        position: relative;
        overflow: hidden;
      }
      .scroll-hint .line::after {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--accent);
        animation: drift 2.4s var(--ease-in-out) infinite;
      }
      @keyframes drift {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `
  ]
})
export class HeroComponent {
  readonly profile = profile;
}
