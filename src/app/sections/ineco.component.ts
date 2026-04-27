import { ChangeDetectionStrategy, Component } from '@angular/core';
import { experience } from '@core/data/portfolio.data';
import { RevealDirective } from '@shared/directives/reveal.directive';

@Component({
  selector: 'app-ineco',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="ineco" class="ineco">
      <div class="container content">
        <p class="eyebrow" appReveal>03 / Air Traffic & Data</p>
        <h2 appReveal>INECO · Two and a half years inside Spanish airspace.</h2>
        <p class="lede" appReveal>
          Four parallel projects for ENAIRE and INECO’s own R&D — all of them about
          turning aviation’s mountain of unstructured data into something operators
          could actually trust in real time.
        </p>

        <div class="role-grid">
          @for (role of inecoRoles; track role.role; let i = $index) {
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
      </div>
    </section>
  `,
  styles: [
    `
      .lede { margin-top: 1.5rem; font-size: 1.125rem; color: var(--fg); max-width: 56ch; }
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
      header h3 { font-size: 1.25rem; }
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
    `
  ]
})
export class InecoComponent {
  readonly inecoRoles = experience.filter((r) => r.company === 'INECO');
}
