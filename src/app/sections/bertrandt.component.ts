import { ChangeDetectionStrategy, Component } from '@angular/core';
import { experience } from '@core/data/portfolio.data';
import { RevealDirective } from '@shared/directives/reveal.directive';

/**
 * Bertrandt — split into two programmes: Eurofighter (lead frontend) and A400M.
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
          Two and a half years at Bertrandt for Airbus. Two parallel
          programmes: the <strong class="accent">Eurofighter</strong> maintenance
          interface, and the <strong class="accent">A400M</strong> retrofit
          tracking system. Same codebase mindset — different airframes.
        </p>

        <div class="programmes">
          <article class="prog featured" appReveal>
            <header>
              <p class="badge mono">Programme · Eurofighter</p>
              <h3>{{ eurofighter.role }}</h3>
              <p class="meta mono">{{ eurofighter.client }} · {{ eurofighter.period }}</p>
            </header>
            <ul>
              @for (b of eurofighter.bullets; track b) {
                <li>{{ b }}</li>
              }
            </ul>
            <div class="tags">
              @for (s of eurofighter.stack; track s) {
                <span class="tag mono">{{ s }}</span>
              }
            </div>
          </article>

          <article class="prog" appReveal>
            <header>
              <p class="badge mono">Programme · A400M</p>
              <h3>{{ a400m.role }}</h3>
              <p class="meta mono">{{ a400m.client }} · {{ a400m.period }}</p>
            </header>
            <ul>
              @for (b of a400m.bullets; track b) {
                <li>{{ b }}</li>
              }
            </ul>
            <div class="tags">
              @for (s of a400m.stack; track s) {
                <span class="tag mono">{{ s }}</span>
              }
            </div>
          </article>
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
      h2 { max-width: 22ch; margin-top: 0.5rem; }
      em { font-style: italic; font-weight: 300; color: var(--accent); }
      .lede {
        margin-top: 1.5rem;
        font-size: 1.2rem;
        color: var(--fg);
        max-width: 60ch;
        line-height: 1.55;
      }
      .accent { color: var(--accent); font-weight: 500; }
      strong { color: var(--fg); font-weight: 500; }

      .programmes {
        margin-top: 4rem;
        display: grid;
        grid-template-columns: 1.15fr 1fr;
        gap: 1.5rem;
      }
      @media (max-width: 980px) {
        .programmes { grid-template-columns: 1fr; }
      }

      .prog {
        padding: 2.25rem 2.25rem;
        border: 1px solid var(--line);
        border-radius: 4px;
        background: var(--bg-elev);
        position: relative;
        transition: border-color 0.3s ease;
      }
      .prog:hover { border-color: rgba(255, 91, 58, 0.4); }

      .prog.featured {
        border-color: var(--accent);
        background: linear-gradient(180deg, var(--accent-soft) 0%, transparent 100%);
      }
      .prog.featured::before {
        content: '';
        position: absolute;
        top: -1px; left: -1px; right: -1px;
        height: 2px;
        background: var(--accent);
      }

      .badge {
        font-size: 0.66rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--accent);
      }
      header h3 {
        margin-top: 0.75rem;
        font-size: 1.25rem;
        font-weight: 500;
        line-height: 1.3;
      }
      .meta {
        margin-top: 0.5rem;
        color: var(--fg-muted);
        font-size: 0.74rem;
        letter-spacing: 0.05em;
      }

      ul {
        margin: 1.5rem 0;
        padding: 0;
        list-style: none;
      }
      li {
        position: relative;
        padding-left: 1.1rem;
        color: var(--fg-muted);
        margin-bottom: 0.5rem;
        font-size: 0.93rem;
        line-height: 1.55;
      }
      li::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.7em;
        width: 8px;
        height: 1px;
        background: var(--accent);
        opacity: 0.7;
      }

      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        padding-top: 1rem;
        border-top: 1px solid var(--line);
      }
      .tag {
        font-size: 0.66rem;
        padding: 0.25rem 0.6rem;
        border: 1px solid var(--line);
        border-radius: 999px;
        color: var(--fg-muted);
        letter-spacing: 0.05em;
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
  readonly eurofighter = experience.find((r) =>
    r.company === 'Bertrandt Group' && r.client?.includes('Eurofighter')
  )!;
  readonly a400m = experience.find((r) =>
    r.company === 'Bertrandt Group' && r.client?.includes('A400M')
  )!;
}
