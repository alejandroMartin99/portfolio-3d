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
        <p class="eyebrow" appReveal>09 / Toolbox</p>
        <h2 appReveal class="title">The tools that<br/><em>shaped my thinking.</em></h2>
        <p class="lede" appReveal>
          Front-end and back-end for the people who fly the planes; data and ML for
          the people who keep them on schedule.
        </p>

        <div class="groups">
          @for (g of groups; track g.label) {
            <div class="group" appReveal>
              <h3 class="group-label mono">{{ g.label }}</h3>
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
      :host { display: block; }
      em { font-style: italic; font-weight: 300; color: var(--accent); }
      .title { margin-top: 1rem; }
      .lede {
        margin-top: 1.5rem;
        font-size: 1.125rem;
        color: var(--fg);
        max-width: 56ch;
      }

      .groups {
        margin-top: 4rem;
        display: flex;
        flex-direction: column;
      }
      .group {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: 1rem 2.5rem;
        padding: 1.5rem 0;
        border-top: 1px solid var(--line);
        width: 100%;
      }
      .group:last-child { border-bottom: 1px solid var(--line); }

      .group-label {
        flex-shrink: 0;
        width: 180px;
        font-size: 0.72rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--accent);
        font-weight: 400;
      }

      .items {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem 0.6rem;
      }
      .item {
        font-size: 0.92rem;
        color: var(--fg-muted);
        padding: 0.4rem 0.85rem;
        border: 1px solid var(--line);
        border-radius: 4px;
        transition:
          color 0.3s var(--ease-out),
          border-color 0.3s var(--ease-out);
      }
      .item:hover {
        color: var(--fg);
        border-color: var(--accent);
      }

      @media (max-width: 720px) {
        .group-label { width: 100%; }
      }
    `
  ]
})
export class StackComponent {
  readonly groups = stackGroups;
}
