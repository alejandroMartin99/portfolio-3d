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

        <ul class="contact-row" appReveal aria-label="Contact">
          <li>
            <a href="https://github.com/alejandroMartin99" target="_blank" rel="noopener" aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1-.02-1.96-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.95 10.95 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.26 5.68.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z"/>
              </svg>
              <span>GitHub</span>
            </a>
          </li>
          <li>
            <a href="mailto:alexmiglesias@gmail.com" aria-label="Email">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <path d="m3 7 9 6 9-6"/>
              </svg>
              <span>Email</span>
            </a>
          </li>
          <li>
            <a href="tel:+34649619103" aria-label="Phone">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.91.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/>
              </svg>
              <span>+34 649 619 103</span>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/alejandro-mart%C3%ADn-iglesias-33381a164/" target="_blank" rel="noopener" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.65-1.85 3.39-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
          </li>
        </ul>

        <div class="scroll-hint" appReveal>
          <span class="mono">scroll</span>
          <span class="line"></span>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      :host { display: block; }
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

      .contact-row {
        margin: 2.5rem 0 0;
        padding: 0;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
      }
      .contact-row a {
        display: inline-flex;
        align-items: center;
        gap: 0.55rem;
        padding: 0.55rem 0.95rem;
        border: 1px solid var(--line);
        border-radius: 999px;
        font-size: 0.78rem;
        font-family: var(--font-mono);
        letter-spacing: 0.04em;
        color: var(--fg-muted);
        background: rgba(255, 255, 255, 0.015);
        backdrop-filter: blur(8px);
        transition:
          color 0.3s var(--ease-out),
          border-color 0.3s var(--ease-out),
          transform 0.3s var(--ease-out),
          background 0.3s var(--ease-out);
      }
      .contact-row a:hover {
        color: var(--accent);
        border-color: var(--accent);
        transform: translateY(-2px);
        background: rgba(255, 91, 58, 0.05);
      }
      .contact-row svg { flex-shrink: 0; }

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
      @media (max-width: 600px) {
        .contact-row a span { display: none; }
        .contact-row a { padding: 0.65rem; }
      }
    `
  ]
})
export class HeroComponent {
  readonly profile = profile;
}
