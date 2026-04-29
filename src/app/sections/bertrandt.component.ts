import { ChangeDetectionStrategy, Component } from '@angular/core';
import { experience } from '@core/data/portfolio.data';
import { RevealDirective } from '@shared/directives/reveal.directive';

/**
 * Bertrandt — split into Eurofighter + A400M, displayed as numbered steps
 * (same visual pattern as INECO).
 */
@Component({
  selector: 'app-bertrandt',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="bertrandt" class="bertrandt">
      <div class="container content">
        <p class="eyebrow" appReveal>07 / Bertrandt — Airbus</p>
        <h2 appReveal>
          Code that keeps fighters<br/>
          <em>and transports</em> in the air.
        </h2>
        <p class="lede" appReveal>
          Two and a half years at Bertrandt for Airbus. Two parallel programmes:
          the <strong class="accent">Eurofighter</strong> maintenance interface
          and the <strong class="accent">A400M</strong> retrofit tracking system.
        </p>

        <div class="aircraft" appReveal aria-hidden="true">
          <figure class="craft-wrap">
            <svg class="craft" viewBox="0 0 320 120" fill="none"
                 stroke="currentColor" stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 60 Q35 56 60 58 L240 56 Q280 58 305 60 Q280 62 240 64 L60 62 Q35 64 10 60 Z"/>
              <path d="M250 56 Q260 50 270 56 Q260 62 250 60 Z"/>
              <path d="M205 56 L185 38 L175 38 L195 56"/>
              <path d="M205 64 L185 82 L175 82 L195 64"/>
              <path d="M120 56 L60 16 L40 16 L100 56"/>
              <path d="M120 64 L60 104 L40 104 L100 64"/>
              <path d="M40 56 L18 30 L8 30 L30 56"/>
              <path d="M40 64 L18 90 L8 90 L30 64"/>
              <line x1="10" y1="60" x2="305" y2="60" stroke-dasharray="2 4" opacity="0.4"/>
            </svg>
            <figcaption class="craft-label mono">Eurofighter Typhoon</figcaption>
          </figure>

          <figure class="craft-wrap">
            <svg class="craft" viewBox="0 0 320 160" fill="none"
                 stroke="currentColor" stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 80 Q35 76 60 78 L260 76 Q295 78 312 80 Q295 82 260 84 L60 82 Q35 84 10 80 Z"/>
              <path d="M285 76 Q298 70 310 78 Q298 84 285 80 Z"/>
              <path d="M150 78 L60 26 L40 26 L130 78"/>
              <path d="M150 82 L60 134 L40 134 L130 82"/>
              <ellipse cx="60"  cy="36" rx="18" ry="3.5"/>
              <ellipse cx="100" cy="34" rx="18" ry="3.5"/>
              <ellipse cx="60"  cy="124" rx="18" ry="3.5"/>
              <ellipse cx="100" cy="126" rx="18" ry="3.5"/>
              <path d="M28 78 L8 48 L4 48 L24 78"/>
              <path d="M28 82 L8 112 L4 112 L24 82"/>
              <path d="M16 80 L0 60 L0 100 Z"/>
              <line x1="10" y1="80" x2="312" y2="80" stroke-dasharray="2 4" opacity="0.4"/>
            </svg>
            <figcaption class="craft-label mono">Airbus A400M</figcaption>
          </figure>
        </div>

        <div class="role-grid">
          @for (role of bertrandtRoles; track role.role; let i = $index) {
            <article class="role" appReveal>
              <span class="index mono">0{{ i + 1 }}</span>
              <header>
                <h3>{{ role.role }}</h3>
                <p class="mono meta">
                  @if (role.client) {<span>{{ role.client }} · </span>}
                  <span>{{ role.period }}</span>
                </p>
              </header>
              <ul>
                @for (b of role.bullets; track b) {
                  <li>{{ b }}</li>
                }
              </ul>
              <div class="tags">
                @for (s of role.stack; track s) {
                  <span class="tag mono">{{ s }}</span>
                }
              </div>
            </article>
          }
        </div>

        <div class="hero-quote" appReveal>
          <p>
            <span class="qmark">“</span>
            Modern aircraft are kept flying by the software that surrounds them.
            I’ve been on both sides of that equation.
          </p>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      :host { display: block; }
      em { font-style: italic; font-weight: 300; color: var(--accent); }
      .lede {
        margin-top: 1.5rem;
        font-size: 1.125rem;
        color: var(--fg);
        max-width: 60ch;
      }
      .accent { color: var(--accent); font-weight: 500; }

      /* ----- Aircraft wireframe block ----- */
      .aircraft {
        margin: 3rem 0 0;
        padding: 2.5rem 1.5rem;
        border: 1px solid var(--line);
        border-radius: 6px;
        background:
          linear-gradient(180deg, rgba(255, 91, 58, 0.04) 0%, transparent 70%),
          var(--bg-elev);
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        align-items: center;
      }
      .craft-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        margin: 0;
      }
      .craft {
        width: 100%;
        height: auto;
        max-width: 360px;
        color: var(--fg);
        opacity: 0.8;
        filter: drop-shadow(0 0 12px rgba(255, 91, 58, 0.08));
        transition: opacity 0.4s var(--ease-out), color 0.4s var(--ease-out), filter 0.4s var(--ease-out);
      }
      .craft-wrap:hover .craft {
        opacity: 1;
        color: var(--accent);
        filter: drop-shadow(0 0 16px rgba(255, 91, 58, 0.25));
      }
      .craft-label {
        font-size: 0.66rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--fg-muted);
        margin: 0;
      }
      @media (max-width: 720px) {
        .aircraft { grid-template-columns: 1fr; padding: 1.75rem 1rem; }
      }

      .role-grid {
        margin-top: 4rem;
        display: flex;
        flex-direction: column;
        gap: 3rem;
      }
      .role {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1.5rem 2.5rem;
        align-items: start;
        padding-bottom: 3rem;
        border-bottom: 1px solid var(--line);
      }
      .role:last-child { border-bottom: none; }
      .index {
        font-size: 0.7rem;
        color: var(--accent);
        letter-spacing: 0.2em;
        padding-top: 0.4rem;
      }
      header h3 { font-size: 1.25rem; font-weight: 500; line-height: 1.35; }
      .meta {
        margin-top: 0.4rem;
        color: var(--fg-muted);
        font-size: 0.78rem;
        letter-spacing: 0.05em;
      }
      ul {
        grid-column: 2;
        margin: 1rem 0 1.5rem;
        padding: 0;
        list-style: none;
      }
      li {
        position: relative;
        padding-left: 1rem;
        color: var(--fg-muted);
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
        line-height: 1.6;
      }
      li::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.7em;
        width: 6px;
        height: 1px;
        background: var(--accent);
      }
      .tags {
        grid-column: 2;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .tag {
        font-size: 0.7rem;
        padding: 0.3rem 0.7rem;
        border: 1px solid var(--line);
        border-radius: 999px;
        color: var(--fg-muted);
        letter-spacing: 0.05em;
      }
      @media (max-width: 720px) {
        .role { grid-template-columns: 1fr; gap: 0.5rem; }
        ul, .tags { grid-column: 1; }
      }

      .hero-quote {
        margin-top: 5rem;
        padding-top: 3rem;
        border-top: 1px solid var(--line);
      }
      .hero-quote p {
        font-size: clamp(1.4rem, 2.4vw, 2rem);
        font-weight: 300;
        line-height: 1.4;
        max-width: 36ch;
        color: var(--fg);
      }
      .qmark {
        font-family: var(--font-mono);
        color: var(--accent);
        font-size: 2em;
        line-height: 0.5;
        margin-right: 0.25em;
        vertical-align: -0.2em;
      }
    `
  ]
})
export class BertrandtComponent {
  readonly bertrandtRoles = experience.filter((r) => r.company === 'Bertrandt Group');
}
