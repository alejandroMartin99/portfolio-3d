import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bio } from '@core/data/portfolio.data';
import { RevealDirective } from '@shared/directives/reveal.directive';

/**
 * Bio — short narrative right after the hero.
 */
@Component({
  selector: 'app-bio',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="bio" class="bio">
      <div class="container content">
        <p class="eyebrow" appReveal>01 / {{ bio.eyebrow }}</p>
        <h2 class="title" appReveal>
          Senior Engineer at the intersection of
          <em>aerospace, data and AI.</em>
        </h2>

        <div class="body">
          @for (p of bio.paragraphs; track p) {
            <p class="para" appReveal [innerHTML]="p"></p>
          }
        </div>

        <ul class="highlights" appReveal>
          @for (h of bio.highlights; track h.label) {
            <li class="hl">
              <span class="hl-label mono">{{ h.label }}</span>
              <span class="hl-value">{{ h.value }}</span>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: [
    `
      :host { display: block; }
      .bio { position: relative; }
      .title {
        margin-top: 1.5rem;
        font-size: clamp(2rem, 4.2vw, 3.4rem);
        font-weight: 300;
        letter-spacing: -0.025em;
        line-height: 1.08;
        max-width: 26ch;
        color: var(--fg);
      }
      .title em {
        font-style: italic;
        font-weight: 300;
        color: var(--accent);
        display: inline;
      }

      .body {
        margin-top: 3rem;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 2rem 3rem;
      }
      .para {
        font-size: 1rem;
        line-height: 1.7;
        color: var(--fg-muted);
        max-width: none;
      }
      .para :global(strong),
      .para strong {
        color: var(--fg);
        font-weight: 500;
      }
      @media (max-width: 1024px) {
        .body { grid-template-columns: 1fr 1fr; }
      }
      @media (max-width: 720px) {
        .body { grid-template-columns: 1fr; gap: 1.25rem; }
      }

      .highlights {
        margin: 4rem 0 0;
        padding: 2.5rem 0 0;
        border-top: 1px solid var(--line);
        list-style: none;
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 2rem;
      }
      @media (max-width: 980px) {
        .highlights { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
      @media (max-width: 520px) {
        .highlights { grid-template-columns: 1fr; gap: 1.25rem; }
      }
      .hl {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .hl-label {
        font-size: 0.66rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--fg-muted);
      }
      .hl-value {
        font-size: clamp(0.98rem, 1.4vw, 1.15rem);
        color: var(--fg);
        line-height: 1.4;
        letter-spacing: -0.005em;
      }
    `
  ]
})
export class BioComponent {
  readonly bio = bio;
}
