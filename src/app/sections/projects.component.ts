import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sideProjects } from '@core/data/portfolio.data';
import { RevealDirective } from '@shared/directives/reveal.directive';

/**
 * Side projects — each one gets its own full section.
 * BankaApp gets an Apple-Store-style screenshot gallery with browser
 * window framing. Styles are SCOPED to this component only.
 */
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="projects" class="projects">
      <div class="container intro">
        <p class="eyebrow" appReveal>02 / Selected Work</p>
        <h2 appReveal>
          Things I design, build and scale<br/>
          <em>at the intersection of data and engineering.</em>
        </h2>
        <p class="lede" appReveal>
          Not side projects — applied experiments. Each one starts from a real problem 
          and evolves into a production-grade solution, combining data, software 
          engineering and product thinking.
        </p>
      </div>

      <!-- Featured: Banka — Apple-Store-style gallery ----------------- -->
      @if (banka; as p) {
      <article class="project featured">
        <div class="container">
          <header class="proj-header">
            <p class="proj-num mono" appReveal>01 — Featured</p>
            <h3 class="proj-title" appReveal>{{ p.name }}.</h3>
            <p class="proj-tagline" appReveal>{{ p.tagline }}</p>
            <p class="proj-story" appReveal>{{ p.story }}</p>

            <div class="proj-meta" appReveal>
              <div class="proj-tags">
                @for (s of p.stack; track s) {
                  <span class="tag mono">{{ s }}</span>
                }
              </div>
              <div class="proj-links">
                @if (p.demo) {
                  <a [href]="p.demo" target="_blank" rel="noopener" class="cta primary">
                    <span>Live</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                }
                @if (p.repo) {
                  <a [href]="p.repo" target="_blank" rel="noopener" class="cta">
                    <span>Source</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                }
              </div>
            </div>
          </header>
        </div>

        <!-- App-Store-like horizontal screenshot gallery -->
        <div class="gallery" appReveal>
          <div class="gallery-track">
            @for (s of p.screens; track s.src; let i = $index) {
              <figure class="shot" [style.animationDelay.ms]="i * 100">
                <div class="browser">
                  <div class="browser-bar">
                    <span class="dot dot-a"></span>
                    <span class="dot dot-b"></span>
                    <span class="dot dot-c"></span>
                    <span class="url mono">banka-app-tracker.vercel.app</span>
                  </div>
                  <img [src]="s.src" [alt]="s.caption" loading="lazy" />
                </div>
                <figcaption>
                  <span class="cap-num mono">0{{ i + 1 }}</span>
                  <span class="cap-text">{{ s.caption }}</span>
                </figcaption>
              </figure>
            }
          </div>
        </div>
      </article>
      }

      <!-- Other projects: full sections, no app-store treatment -->
      @for (p of others; track p.name; let i = $index) {
        <article class="project simple">
          <div class="container">
            <header class="proj-header">
              <p class="proj-num mono" appReveal>0{{ i + 2 }} — Side</p>
              <h3 class="proj-title" appReveal>{{ p.name }}.</h3>
              <p class="proj-tagline" appReveal>{{ p.tagline }}</p>
              <p class="proj-desc" appReveal>{{ p.description }}</p>

              <div class="proj-meta" appReveal>
                <div class="proj-tags">
                  @for (s of p.stack; track s) {
                    <span class="tag mono">{{ s }}</span>
                  }
                </div>
                <div class="proj-links">
                  @if (p.demo) {
                    <a [href]="p.demo" target="_blank" rel="noopener" class="cta primary">
                      <span>Live</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  }
                  @if (p.repo) {
                    <a [href]="p.repo" target="_blank" rel="noopener" class="cta">
                      <span>Source</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  }
                </div>
              </div>
            </header>
          </div>
        </article>
      }
    </section>
  `,
  styles: [
    `
      :host { display: block; }
      .projects { position: relative; }
      .intro { padding-bottom: 4rem; }
      .intro h2 {
        margin-top: 1.25rem;
        max-width: 24ch;
        line-height: 1.05;
      }
      .intro em { font-style: italic; font-weight: 300; color: var(--accent); }
      .lede {
        margin-top: 1.25rem;
        font-size: 1.05rem;
        color: var(--fg-muted);
        max-width: 56ch;
      }

      /* ----- A project section ----- */
      .project {
        position: relative;
        padding: 3.5rem 0 4rem;
        border-top: 1px solid var(--line);
      }
      .project.featured {
        padding-bottom: 5rem;
      }
      .proj-header { max-width: 100%; }
      .proj-num {
        font-size: 0.7rem;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--accent);
      }
      .proj-title {
        margin-top: 1rem;
        font-size: clamp(2.4rem, 5vw, 4rem);
        font-weight: 300;
        letter-spacing: -0.03em;
        line-height: 1;
        color: var(--fg);
      }
      .proj-tagline {
        margin-top: 1rem;
        font-size: clamp(1.05rem, 1.6vw, 1.3rem);
        color: var(--fg);
        font-weight: 400;
        max-width: 48ch;
      }
      .proj-story,
      .proj-desc {
        margin-top: 1.25rem;
        max-width: 56ch;
        line-height: 1.65;
        color: var(--fg-muted);
        font-size: 1rem;
      }
      .proj-meta {
        margin-top: 2.5rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1.5rem 2rem;
      }
      .proj-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
      }
      .tag {
        font-size: 0.68rem;
        padding: 0.3rem 0.7rem;
        border: 1px solid var(--line);
        border-radius: 999px;
        color: var(--fg-muted);
        letter-spacing: 0.06em;
      }
      .proj-links {
        display: flex;
        gap: 0.75rem;
      }
      .cta {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        border-radius: 999px;
        font-size: 0.85rem;
        font-weight: 500;
        border: 1px solid var(--line);
        color: var(--fg);
        transition: all 0.3s ease;
      }
      .cta:hover {
        border-color: var(--accent);
        color: var(--accent);
      }
      .cta.primary {
        background: var(--accent);
        color: var(--bg);
        border-color: var(--accent);
      }
      .cta.primary:hover {
        background: transparent;
        color: var(--accent);
      }

      /* ----- Apple-Store-style gallery (BankaApp) ----- */
      .gallery {
        margin-top: 3rem;
        position: relative;
        overflow-x: auto;
        overflow-y: visible;
        padding: 0.5rem 0 1.5rem;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
      }
      .gallery::-webkit-scrollbar { display: none; }
      .gallery-track {
        display: flex;
        gap: 1.75rem;
        padding: 0 var(--gutter);
        width: max-content;
      }
      .shot {
        margin: 0;
        scroll-snap-align: center;
        flex-shrink: 0;
        width: clamp(180px, 18vw, 260px);
        animation: fade-up 0.9s var(--ease-out) both;
      }
      @keyframes fade-up {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      /* "Browser" frame around each screenshot */
      .browser {
        background: #1a1c24;
        border-radius: 12px;
        overflow: hidden;
        box-shadow:
          0 0 0 1px rgba(255, 255, 255, 0.04),
          0 30px 60px -20px rgba(0, 0, 0, 0.55),
          0 0 80px -20px rgba(255, 91, 58, 0.15);
        transition: transform 0.6s var(--ease-out), box-shadow 0.6s var(--ease-out);
      }
      .shot:hover .browser {
        transform: translateY(-6px) scale(1.01);
        box-shadow:
          0 0 0 1px rgba(255, 255, 255, 0.08),
          0 40px 70px -20px rgba(0, 0, 0, 0.65),
          0 0 100px -10px rgba(255, 91, 58, 0.25);
      }
      .browser-bar {
        display: flex;
        align-items: center;
        gap: 0.3rem;
        padding: 0.45rem 0.65rem;
        background: linear-gradient(180deg, #21232c 0%, #1a1c24 100%);
        border-bottom: 1px solid rgba(255, 255, 255, 0.04);
      }
      .dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .dot-a { background: #ff5f57; }
      .dot-b { background: #febc2e; }
      .dot-c { background: #28c840; }
      .url {
        margin-left: 0.5rem;
        font-size: 0.56rem;
        color: var(--fg-muted);
        opacity: 0.7;
        letter-spacing: 0.02em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .browser img {
        display: block;
        width: 100%;
        height: auto;
        background: #fff;
      }

      figcaption {
        margin-top: 1.1rem;
        display: flex;
        align-items: baseline;
        gap: 0.75rem;
        color: var(--fg-muted);
      }
      .cap-num {
        font-size: 0.7rem;
        letter-spacing: 0.2em;
        color: var(--accent);
      }
      .cap-text {
        font-size: 0.95rem;
        color: var(--fg);
        letter-spacing: -0.005em;
      }

      @media (max-width: 720px) {
        .shot { width: 50vw; }
        .gallery-track { gap: 0.8rem; }
      }
    `
  ]
})
export class ProjectsComponent {
  readonly banka = sideProjects.find((p) => p.name === 'BankaAppTracker');
  readonly others = sideProjects.filter((p) => p.name !== 'BankaAppTracker');
}
