import { ChangeDetectionStrategy, Component } from '@angular/core';
import { sideProjects } from '@core/data/portfolio.data';
import { RevealDirective } from '@shared/directives/reveal.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="projects" class="projects">
      <div class="container content">
        <p class="eyebrow" appReveal>07 / Side Projects</p>
        <h2 appReveal>Things I built because I wanted to.</h2>
        <p class="lede" appReveal>
          Three projects outside work that tend to surface in conversations more
          than they should.
        </p>

        <div class="grid">
          @for (p of projects; track p.name; let i = $index) {
            <article class="project" appReveal>
              <span class="num mono">0{{ i + 1 }}</span>
              <header>
                <h3>{{ p.name }}</h3>
                <p class="tagline">{{ p.tagline }}</p>
              </header>
              <p class="desc">{{ p.description }}</p>
              <div class="tags">
                @for (s of p.stack; track s) {
                  <span class="tag mono">{{ s }}</span>
                }
              </div>
              <div class="links">
                @if (p.demo) {
                  <a [href]="p.demo" target="_blank" rel="noopener">
                    <span>Live</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                }
                @if (p.repo) {
                  <a [href]="p.repo" target="_blank" rel="noopener">
                    <span>Code</span>
                    <span aria-hidden="true">↗</span>
                  </a>
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
      .grid {
        margin-top: 4rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
        gap: 1.5rem;
      }
      .project {
        position: relative;
        padding: 2rem;
        border: 1px solid var(--line);
        border-radius: 4px;
        background: var(--bg-elev);
        transition: border-color 0.3s var(--ease-out), transform 0.3s var(--ease-out);
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .project:hover {
        border-color: var(--accent);
        transform: translateY(-4px);
      }
      .num {
        position: absolute;
        top: 1.25rem;
        right: 1.25rem;
        font-size: 0.7rem;
        color: var(--accent);
        letter-spacing: 0.2em;
      }
      header h3 { font-size: 1.25rem; }
      .tagline { margin-top: 0.4rem; color: var(--fg-muted); font-size: 0.92rem; }
      .desc { color: var(--fg-muted); font-size: 0.95rem; line-height: 1.55; }
      .tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
      .tag {
        font-size: 0.68rem;
        padding: 0.25rem 0.6rem;
        border: 1px solid var(--line);
        border-radius: 999px;
        color: var(--fg-muted);
        letter-spacing: 0.05em;
      }
      .links {
        margin-top: auto;
        display: flex;
        gap: 1.25rem;
        font-size: 0.85rem;
      }
      .links a {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        border-bottom: 1px solid var(--line);
        padding-bottom: 0.2rem;
      }
      .links a:hover { border-color: var(--accent); }
    `
  ]
})
export class ProjectsComponent {
  readonly projects = sideProjects;
}
