import { ChangeDetectionStrategy, Component } from '@angular/core';
import { experience } from '@core/data/portfolio.data';
import { RevealDirective } from '@shared/directives/reveal.directive';

/**
 * Indra — current role (Senior Engineer, AI + SESAR + Fabric).
 * Sits AFTER Bertrandt in chronological storytelling.
 */
@Component({
  selector: 'app-indra',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="indra" class="indra">
      <div class="container content">
        <p class="eyebrow" appReveal>08 / Indra · Present</p>
        <h2 appReveal>
          And now, <em>AI on top of everything</em> I learned.
        </h2>
        <p class="lede" appReveal>
          Senior Engineer at Indra since November 2025 — leading AI-driven
          product work: <strong class="accent">LLM integrations</strong>,
          <strong class="accent">RAG pipelines</strong>, and agentic
          workflows applied to industrial-grade systems. I also collaborate
          on <strong>SESAR</strong>, a European research programme, and on
          Microsoft <strong>Fabric</strong> integrations for unified data
          and BI platforms.
        </p>

        <article class="role-card" appReveal>
          <header>
            <h3>{{ role.role }}</h3>
            <p class="mono meta">{{ role.company }} · {{ role.period }}</p>
            <p class="mono location">{{ role.location }}</p>
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

        <div class="badges" appReveal>
          <div class="badge">
            <span class="badge-label mono">Programme</span>
            <span class="badge-value">SESAR</span>
            <span class="badge-sub">European research</span>
          </div>
          <div class="badge">
            <span class="badge-label mono">Platform</span>
            <span class="badge-value">Microsoft Fabric</span>
            <span class="badge-sub">Unified data & BI</span>
          </div>
          <div class="badge">
            <span class="badge-label mono">Focus</span>
            <span class="badge-value">LLMs · RAG · Agents</span>
            <span class="badge-sub">Production-grade AI</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      :host { display: block; }
      h2 {
        margin-top: 1.5rem;
        max-width: 22ch;
      }
      em { font-style: italic; font-weight: 300; color: var(--accent); }
      .lede {
        margin-top: 1.5rem;
        font-size: 1.15rem;
        line-height: 1.6;
        color: var(--fg);
        max-width: 60ch;
      }
      .accent { color: var(--accent); font-weight: 500; }
      strong { color: var(--fg); font-weight: 500; }

      .role-card {
        margin-top: 4rem;
        padding: 2.5rem;
        border: 1px solid var(--line);
        border-radius: 6px;
        background: var(--bg-elev);
        position: relative;
      }
      .role-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0;
        width: 80px;
        height: 1px;
        background: var(--accent);
      }
      header h3 { font-size: 1.4rem; font-weight: 500; }
      .meta {
        margin-top: 0.5rem;
        color: var(--fg);
        font-size: 0.78rem;
        letter-spacing: 0.05em;
      }
      .location {
        color: var(--fg-muted);
        font-size: 0.72rem;
        letter-spacing: 0.05em;
      }
      ul {
        margin: 1.75rem 0;
        padding: 0;
        list-style: none;
      }
      li {
        position: relative;
        padding-left: 1.2rem;
        color: var(--fg-muted);
        margin-bottom: 0.6rem;
        font-size: 0.97rem;
        line-height: 1.55;
      }
      li::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.7em;
        width: 8px;
        height: 1px;
        background: var(--accent);
      }
      .tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
      .tag {
        font-size: 0.7rem;
        padding: 0.3rem 0.7rem;
        border: 1px solid var(--line);
        border-radius: 999px;
        color: var(--fg);
        letter-spacing: 0.05em;
      }

      .badges {
        margin-top: 3rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1rem;
      }
      .badge {
        padding: 1.5rem 1.5rem;
        border: 1px solid var(--line);
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        background: rgba(255, 255, 255, 0.015);
        transition: border-color 0.3s ease;
      }
      .badge:hover { border-color: var(--accent); }
      .badge-label {
        font-size: 0.66rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--fg-muted);
      }
      .badge-value {
        font-size: 1.05rem;
        color: var(--fg);
        font-weight: 500;
      }
      .badge-sub {
        font-size: 0.82rem;
        color: var(--fg-muted);
      }
    `
  ]
})
export class IndraComponent {
  readonly role = experience.find((r) => r.company === 'Indra')!;
}
