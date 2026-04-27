import { ChangeDetectionStrategy, Component } from '@angular/core';
import { contact, profile } from '@core/data/portfolio.data';
import { RevealDirective } from '@shared/directives/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="contact">
      <div class="container content">
        <p class="eyebrow" appReveal>08 / Contact</p>
        <h2 appReveal>Talk to me about flying things.</h2>
        <p class="lede" appReveal>
          Open to collaborations on aerospace data, interactive front-ends, or any
          project that sits at the intersection of the two.
        </p>

        <ul class="links">
          @for (link of links; track link.href) {
            <li appReveal>
              <a [href]="link.href" target="_blank" rel="noopener">
                <span class="label mono">{{ link.label }}</span>
                <span class="value">{{ display(link) }}</span>
                <span class="arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          }
        </ul>

        <footer class="foot">
          <p class="mono">© {{ year }} {{ profile.name }} · Built with Angular + Three.js</p>
        </footer>
      </div>
    </section>
  `,
  styles: [
    `
      .lede { margin-top: 1.5rem; font-size: 1.125rem; color: var(--fg); max-width: 56ch; }
      .links {
        margin: 4rem 0 0;
        padding: 0;
        list-style: none;
        border-top: 1px solid var(--line);
      }
      .links li { border-bottom: 1px solid var(--line); }
      .links a {
        display: grid;
        grid-template-columns: 90px 1fr auto;
        align-items: center;
        gap: 1.5rem;
        padding: 1.5rem 0;
        transition: padding 0.3s var(--ease-out), color 0.3s var(--ease-out);
      }
      .links a:hover {
        padding-left: 1rem;
        color: var(--accent);
      }
      .label {
        font-size: 0.72rem;
        letter-spacing: 0.2em;
        color: var(--fg-muted);
        text-transform: uppercase;
      }
      .value { font-size: 1.1rem; }
      .arrow {
        font-size: 1.2rem;
        opacity: 0;
        transform: translateX(-8px);
        transition: opacity 0.3s var(--ease-out), transform 0.3s var(--ease-out);
      }
      .links a:hover .arrow { opacity: 1; transform: translateX(0); }
      .foot { margin-top: 6rem; color: var(--fg-dim); font-size: 0.7rem; }
    `
  ]
})
export class ContactComponent {
  readonly links = contact;
  readonly profile = profile;
  readonly year = new Date().getFullYear();

  display(link: { type: string; href: string; label: string }): string {
    if (link.type === 'email') return link.href.replace('mailto:', '');
    if (link.type === 'linkedin') return 'in/alejandro-martín-iglesias';
    if (link.type === 'github') return 'github.com/alejandroMartin99';
    return link.href.replace(/^https?:\/\//, '');
  }
}
