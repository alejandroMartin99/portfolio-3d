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
