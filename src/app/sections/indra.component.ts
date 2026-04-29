import { ChangeDetectionStrategy, Component } from '@angular/core';
import { experience } from '@core/data/portfolio.data';
import { RevealDirective } from '@shared/directives/reveal.directive';

/**
 * Indra — current role (Senior Engineer, AI + SESAR + Fabric).
 * Same numbered-step pattern as INECO and Bertrandt.
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
          workflows applied to industrial-grade systems. Contributor to
          <strong>SESAR</strong> programmes and Microsoft <strong>Fabric</strong>
          integrations for unified data and BI platforms.
        </p>

        <div class="role-grid">
          @for (focus of focuses; track focus.title; let i = $index) {
            <article class="role" appReveal>
              <span class="index mono">0{{ i + 1 }}</span>
              <header>
                <h3>{{ focus.title }}</h3>
                <p class="mono meta">
                  <span>{{ focus.tag }} · </span>
                  <span>{{ role.period }}</span>
                </p>
              </header>
              <ul>
                @for (b of focus.bullets; track b) {
                  <li>{{ b }}</li>
                }
              </ul>
              <div class="tags">
                @for (s of focus.stack; track s) {
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
      :host { display: block; }
      em { font-style: italic; font-weight: 300; color: var(--accent); }
      .lede {
        margin-top: 1.5rem;
        font-size: 1.125rem;
        line-height: 1.6;
        color: var(--fg);
        max-width: 60ch;
      }
      .accent { color: var(--accent); font-weight: 500; }
      strong { color: var(--fg); font-weight: 500; }

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
      header h3 { font-size: 1.25rem; font-weight: 500; line-height: 1.35; }
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
export class IndraComponent {
  readonly role = experience.find((r) => r.company === 'Indra')!;

  /** Three focus tracks — split the bullets into thematic groups. */
  readonly focuses = [
    {
      title: 'AI products',
      tag: 'LLM · RAG · Agents',
      bullets: [
        'Leading AI-driven product work: LLM integrations, RAG pipelines, and agentic workflows for industrial-grade systems.',
        'Architecture decisions across data, ML and frontend — bridging research and production.'
      ],
      stack: ['Python', 'LLMs', 'RAG', 'Agents', 'TypeScript']
    },
    {
      title: 'SESAR programme',
      tag: 'European research',
      bullets: [
        'Contributing to SESAR — the European research programme for autonomous and intelligent ATM systems.',
        'ATM data models, trajectory prediction and decision-support tooling.'
      ],
      stack: ['Python', 'ML', 'Time-series', 'ATM']
    },
    {
      title: 'Microsoft Fabric',
      tag: 'Data platform',
      bullets: [
        'Microsoft Fabric integrations for unified data engineering, BI and AI on a single governed platform.',
        'Distributed data architectures connecting analytics, ML and operational reporting.'
      ],
      stack: ['Microsoft Fabric', 'Azure', 'Power BI', 'SQL']
    }
  ];
}
