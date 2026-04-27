import { ChangeDetectionStrategy, Component } from '@angular/core';
import { education } from '@core/data/portfolio.data';
import { RevealDirective } from '@shared/directives/reveal.directive';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="master" class="master">
      <div class="container content">
        <p class="eyebrow" appReveal>04 / Master’s</p>
        <h2 appReveal>I closed the engineering loop while INECO was running.</h2>
        <p class="lede" appReveal>
          A habilitante master’s degree at Universidad Europea, completed in parallel
          with full-time work. The certification that lets me sign off as an
          aeronautical engineer in Spain — earned without slowing down on the day job.
        </p>

        <div class="card" appReveal>
          <p class="mono period">{{ master.period }}</p>
          <h3>{{ master.degree }}</h3>
          <p class="institution">{{ master.institution }}</p>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .lede { margin-top: 1.5rem; font-size: 1.125rem; color: var(--fg); max-width: 56ch; }
      .card {
        margin-top: 4rem;
        max-width: 32rem;
        padding: 2.5rem;
        border: 1px solid var(--line);
        border-radius: 4px;
        background: var(--bg-elev);
      }
      .period {
        font-size: 0.72rem;
        color: var(--accent);
        letter-spacing: 0.2em;
        text-transform: uppercase;
      }
      h3 { margin-top: 1rem; font-size: 1.4rem; }
      .institution { margin-top: 0.5rem; color: var(--fg-muted); }
    `
  ]
})
export class MasterComponent {
  readonly master = education[1]!;
}
