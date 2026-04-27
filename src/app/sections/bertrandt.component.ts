import { ChangeDetectionStrategy, Component } from '@angular/core';
import { experience } from '@core/data/portfolio.data';
import { RevealDirective } from '@shared/directives/reveal.directive';

@Component({
  selector: 'app-bertrandt',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="bertrandt" class="bertrandt">
      <div class="container content">
        <p class="eyebrow" appReveal>05 / Eurofighter</p>
        <h2 appReveal>
          Now I write code that keeps fighters in the air.
        </h2>
        <p class="lede" appReveal>
          As Aerospace Data Management Engineer at Bertrandt, I lead the front-end
          development of <strong class="accent">eMIT</strong>, the maintenance interface
          used in the <strong>Eurofighter</strong> programme. Same role as before — but now
          the airframe and the codebase belong to the same engineer.
        </p>

        <article class="role-card" appReveal>
          <header>
            <h3>{{ role.role }}</h3>
            <p class="mono meta">{{ role.company }} · {{ role.client }} · {{ role.period }}</p>
            <p class="mono location">{{ role.location }}</p>
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
      .lede {
        margin-top: 1.5rem;
        font-size: 1.2rem;
        color: var(--fg);
        max-width: 60ch;
        line-height: 1.55;
      }
      .accent { color: var(--accent); font-weight: 500; }
      .role-card {
        margin-top: 4rem;
        padding: 2.5rem;
        border: 1px solid var(--accent);
        border-radius: 4px;
        background: linear-gradient(180deg, var(--accent-soft) 0%, transparent 100%);
        position: relative;
      }
      .role-card::before {
        content: '';
        position: absolute;
        top: -1px; left: -1px; right: -1px;
        height: 2px;
        background: var(--accent);
      }
      header h3 { font-size: 1.4rem; }
      .meta {
        margin-top: 0.5rem;
        color: var(--fg);
        font-size: 0.8rem;
        letter-spacing: 0.05em;
      }
      .location {
        color: var(--fg-muted);
        font-size: 0.72rem;
        letter-spacing: 0.05em;
      }
      ul {
        margin: 1.75rem 0;
        padding: 0;
        list-style: none;
      }
      li {
        position: relative;
        padding-left: 1.2rem;
        color: var(--fg-muted);
        margin-bottom: 0.6rem;
        font-size: 0.97rem;
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
      }
      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .tag {
        font-size: 0.7rem;
        padding: 0.3rem 0.7rem;
        border: 1px solid var(--line);
        border-radius: 999px;
        color: var(--fg);
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
  readonly role = experience.find((r) => r.company === 'Bertrandt Group')!;
}
