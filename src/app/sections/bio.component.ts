import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bio } from '@core/data/portfolio.data';
import { RevealDirective } from '@shared/directives/reveal.directive';

/**
 * Bio — short narrative right after the hero.
 * Frames who Alejandro is now, his AI focus and current senior role.
 */
@Component({
  selector: 'app-bio',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="bio" class="bio">
      <div class="container content">
        <p class="eyebrow" appReveal>{{ bio.eyebrow }}</p>
        <h2 class="title" appReveal>{{ bio.title }}</h2>

        <div class="body">
          @for (p of bio.paragraphs; track p) {
            <p class="para" appReveal [innerHTML]="p"></p>
          }
        </div>

        <ul class="highlights">
          @for (h of bio.highlights; track h.label) {
            <li class="hl" appReveal>
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
      .bio {
        position: relative;
        padding: clamp(6rem, 12vh, 9rem) 0;
      }
      .content { max-width: 1080px; }
      .eyebrow {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--accent);
      }
      .title {
        margin-top: 1.25rem;
        font-size: clamp(2rem, 4.2vw, 3.4rem);
        font-weight: 300;
        letter-spacing: -0.025em;
        line-height: 1.08;
        max-width: 26ch;
        color: var(--fg);
      }
      .body {
        margin-top: 3rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem 3rem;
        max-width: 100%;
      }
      .para {
        font-size: 1.02rem;
        line-height: 1.7;
        color: var(--fg-muted);
        max-width: 52ch;
      }
      .para :global(strong),
      .para strong {
        color: var(--fg);
        font-weight: 500;
      }
      @media (max-width: 900px) {
        .body { grid-template-columns: 1fr; gap: 1.5rem; }
      }
      .highlights {
        margin: 4rem 0 0;
        padding: 2.5rem 0 0;
        border-top: 1px solid var(--line);
        list-style: none;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
      }
      .hl {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .hl-label {
        font-size: 0.7rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--fg-muted);
      }
      .hl-value {
        font-size: clamp(1.05rem, 1.6vw, 1.25rem);
        color: var(--fg);
        line-height: 1.35;
        letter-spacing: -0.01em;
      }
    `
  ]
})
export class BioComponent {
  readonly bio = bio;
}
