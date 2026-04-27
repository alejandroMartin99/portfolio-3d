import { ChangeDetectionStrategy, Component } from '@angular/core';
import { education } from '@core/data/portfolio.data';
import { RevealDirective } from '@shared/directives/reveal.directive';

@Component({
  selector: 'app-origins',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="origins" class="origins">
      <div class="container content">
        <p class="eyebrow" appReveal>01 / Origins</p>
        <h2 appReveal>I started by trying to understand how things fly.</h2>
        <p class="lede" appReveal>
          Aerospace propulsion at Universidad Politécnica de Madrid. CFD simulations,
          orbital mechanics, structural meshes. The classical engineering toolset —
          and the moment I realised data was already running everything underneath.
        </p>

        <div class="education-grid">
          @for (e of education; track e.institution) {
            <article class="card" appReveal>
              <header>
                <h3>{{ e.degree }}</h3>
                <p class="mono institution">{{ e.institution }} · {{ e.period }}</p>
              </header>
              <ul>
                @for (h of e.highlights; track h) {
                  <li>{{ h }}</li>
                }
              </ul>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .lede { margin-top: 1.5rem; font-size: 1.125rem; color: var(--fg); }
      .education-grid {
        margin-top: 4rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(420px, 100%), 1fr));
        gap: 1.5rem;
      }
      .card {
        background: var(--bg-elev);
        border: 1px solid var(--line);
        padding: 2rem;
        border-radius: 4px;
        transition: border-color 0.3s var(--ease-out);
      }
      .card:hover { border-color: var(--accent); }
      .institution {
        margin-top: 0.5rem;
        color: var(--fg-muted);
        font-size: 0.78rem;
        letter-spacing: 0.05em;
      }
      ul {
        margin: 1.5rem 0 0;
        padding: 0;
        list-style: none;
      }
      li {
        position: relative;
        padding-left: 1rem;
        color: var(--fg-muted);
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
        line-height: 1.55;
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
    `
  ]
})
export class OriginsComponent {
  readonly education = education;
}
