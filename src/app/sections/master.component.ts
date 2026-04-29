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
        <p class="eyebrow" appReveal>06 / Master’s</p>
        <h2 appReveal>I closed the engineering loop while INECO was running.</h2>
        <p class="lede" appReveal>
          A <em>habilitante</em> master’s degree at Universidad Europea, completed in
          parallel with full-time data engineering at INECO. The certification
          that lets me sign off as an aeronautical engineer in Spain
          (<span class="mono">Order CIN/312/2009</span>) — earned without slowing
          down on the day job.
        </p>

        <div class="card" appReveal>
          <div class="card-head">
            <p class="mono period">{{ master.period }}</p>
            <p class="mono institution">{{ master.institution }}</p>
          </div>

          <h3 class="card-title">{{ master.degree }}</h3>

          <ul class="bullets">
            <li>
              <span class="bullet-label mono">Average grade</span>
              <span class="bullet-text"><strong>8.5 / 10</strong></span>
            </li>
            <li>
              <span class="bullet-label mono">Certifies</span>
              <span class="bullet-text">
                Legal authority to sign aeronautical engineering work in Spain
                — required for any project subject to airworthiness regulation.
              </span>
            </li>
            <li>
              <span class="bullet-label mono">Focus</span>
              <span class="bullet-text">
                Aircraft structures · Avionics &amp; flight control · Advanced
                propulsion · Airworthiness &amp; certification · Air-transport
                operations.
              </span>
            </li>
            <li>
              <span class="bullet-label mono">Context</span>
              <span class="bullet-text">
                Completed in parallel with my full-time engineering role at
                INECO — turning theory into ENAIRE projects in the same week.
              </span>
            </li>
          </ul>

          <div class="thesis" appReveal>
            <p class="mono thesis-label">Final dissertation</p>
            <p class="thesis-text">
              AI applied to ATM operations — studying how artificial
              intelligence can support the decisions of air-traffic
              controllers in real time, with a focus on workload management
              and trajectory advisory tooling.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      :host { display: block; }
      em {
        font-style: italic;
        font-weight: 300;
        color: var(--accent);
      }
      .lede {
        margin-top: 1.5rem;
        font-size: 1.125rem;
        color: var(--fg);
        max-width: 56ch;
      }
      .lede .mono {
        font-size: 0.78rem;
        color: var(--fg-muted);
        background: rgba(255, 255, 255, 0.04);
        padding: 0.1rem 0.45rem;
        border-radius: 4px;
        margin: 0 0.1em;
      }
      .card {
        margin-top: 4rem;
        max-width: 56rem;
        padding: 2.75rem 2.75rem;
        border: 1px solid var(--line);
        border-radius: 6px;
        background: var(--bg-elev);
        position: relative;
      }
      .card::before {
        content: '';
        position: absolute;
        top: 0; left: 0;
        width: 60px;
        height: 1px;
        background: var(--accent);
      }
      .card-head {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 0.5rem 2rem;
        font-size: 0.72rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }
      .period { color: var(--accent); }
      .institution { color: var(--fg-muted); }
      .card-title {
        margin-top: 1.25rem;
        font-size: clamp(1.25rem, 2vw, 1.6rem);
        font-weight: 500;
        line-height: 1.3;
        color: var(--fg);
        max-width: 36ch;
      }

      .bullets {
        margin: 2.5rem 0 0;
        padding: 2rem 0 0;
        border-top: 1px solid var(--line);
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      .bullets li {
        display: grid;
        grid-template-columns: 130px 1fr;
        gap: 1rem 2rem;
        align-items: baseline;
      }
      .bullet-label {
        font-size: 0.66rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--fg-muted);
        padding-top: 0.2em;
      }
      .bullet-text {
        color: var(--fg-muted);
        font-size: 0.97rem;
        line-height: 1.55;
      }
      .bullet-text :global(strong),
      .bullet-text strong { color: var(--fg); font-weight: 500; }

      .thesis {
        margin-top: 2rem;
        padding-top: 1.75rem;
        border-top: 1px dashed var(--line);
      }
      .thesis-label {
        font-size: 0.66rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--accent);
      }
      .thesis-text {
        margin-top: 0.6rem;
        font-size: 0.95rem;
        line-height: 1.6;
        color: var(--fg-muted);
        font-style: italic;
      }

      @media (max-width: 720px) {
        .bullets li { grid-template-columns: 1fr; gap: 0.4rem; }
        .card { padding: 2rem 1.5rem; }
      }
    `
  ]
})
export class MasterComponent {
  readonly master = education[1]!;
}
