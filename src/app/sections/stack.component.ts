import { ChangeDetectionStrategy, Component } from '@angular/core';
import { stackGroups } from '@core/data/portfolio.data';
import { RevealDirective } from '@shared/directives/reveal.directive';

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="stack" class="stack">
      <div class="container content">
        <p class="eyebrow" appReveal>06 / Stack</p>
        <h2 appReveal>The toolbox today.</h2>
        <p class="lede" appReveal>
          Front-end and back-end for the people who fly the planes; data and ML for
          the people who keep them on schedule.
        </p>

        <div class="groups">
          @for (g of groups; track g.label) {
            <div class="group" appReveal>
              <h3 class="mono group-label">{{ g.label }}</h3>
              <div class="items">
                @for (item of g.items; track item) {
                  <span class="item">{{ item }}</span>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .lede { margin-top: 1.5rem; font-size: 1.125rem; color: var(--fg); max-width: 56ch; }
      .groups {
        margin-top: 4rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 2.5rem 3rem;
      }
      .group-label {
        font-size: 0.72rem;
        letter-spacing: 0.2em;
        color: var(--accent);
        text-transform: uppercase;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid var(--line);
      }
      .items {
        margin-top: 1.25rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem 0.75rem;
      }
      .item {
        font-size: 0.92rem;
        color: var(--fg-muted);
        padding: 0.4rem 0.85rem;
        border: 1px solid var(--line);
        border-radius: 4px;
        transition: color 0.3s var(--ease-out), border-color 0.3s var(--ease-out);
      }
      .item:hover {
        color: var(--fg);
        border-color: var(--accent);
      }
    `
  ]
})
export class StackComponent {
  readonly groups = stackGroups;
}
