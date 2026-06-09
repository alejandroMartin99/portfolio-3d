import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sideProjects } from '@core/data/portfolio.data';
import { RevealDirective } from '@shared/directives/reveal.directive';

/**
 * Side projects — each one gets its own full section.
 * BankaApp gets an Apple-Store-style screenshot gallery with mobile
 * mockup frames. Styles are SCOPED to this component only.
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
                <div class="phone">
                  <img [src]="s.src" [alt]="s.caption" loading="lazy" />
                </div>
                <figcaption>
                  <span class="cap-num mono">{{ i + 1 < 10 ? '0' + (i + 1) : i + 1 }}</span>
                  <span class="cap-text">{{ s.caption }}</span>
                </figcaption>
              </figure>
            }
            @for (s of p.screens; track 'dup-' + s.src; let i = $index) {
              <figure class="shot shot-dup" aria-hidden="true">
                <div class="phone">
                  <img [src]="s.src" alt="" loading="lazy" />
                </div>
                <figcaption>
                  <span class="cap-num mono">{{ i + 1 < 10 ? '0' + (i + 1) : i + 1 }}</span>
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
        overflow: visible;
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
        overflow-y: hidden;
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
        width: clamp(110px, 9vw, 165px);
        position: relative;
        z-index: 1;
        overflow: visible;
        animation: fade-up 0.9s var(--ease-out) both;
      }
      .shot:hover {
        z-index: 10;
      }
      @keyframes fade-up {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      /* Mobile mockup — frame already baked into PNG */
      .phone {
        height: clamp(240px, 36vh, 380px);
        display: flex;
        align-items: center;
        justify-content: center;
        transform-origin: center bottom;
        transition: transform 0.45s var(--ease-out), filter 0.45s var(--ease-out);
        filter: drop-shadow(0 16px 32px rgba(0, 0, 0, 0.4));
      }
      .shot:hover .phone {
        transform: translateY(-10px) scale(1.28);
        filter: drop-shadow(0 28px 48px rgba(0, 0, 0, 0.55))
                drop-shadow(0 0 40px rgba(255, 91, 58, 0.18));
      }
      .phone img {
        display: block;
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        object-fit: contain;
      }

      figcaption {
        margin-top: 0.75rem;
        display: flex;
        align-items: baseline;
        gap: 0.5rem;
        color: var(--fg-muted);
      }
      .cap-num {
        font-size: 0.62rem;
        letter-spacing: 0.2em;
        color: var(--accent);
      }
      .cap-text {
        font-size: 0.82rem;
        color: var(--fg);
        letter-spacing: -0.005em;
        line-height: 1.3;
      }

      @media (min-width: 721px) {
        .gallery {
          width: 100vw;
          max-width: none;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          overflow: visible;
          scroll-snap-type: none;
          padding: 2.5rem var(--gutter) 2rem;
        }
        .gallery-track {
          display: grid;
          grid-template-columns: repeat(9, minmax(0, 1fr));
          grid-template-rows: repeat(2, auto);
          gap: clamp(1rem, 2vw, 2rem) clamp(0.75rem, 1.4vw, 1.75rem);
          width: 100%;
          padding: 0;
          overflow: visible;
          animation: none;
        }
        .shot-dup { display: none; }
        .shot {
          width: 100%;
          scroll-snap-align: unset;
        }
        /* Fila superior: zoom hacia abajo para no cortarse arriba */
        .gallery-track .shot:nth-child(-n+9):hover .phone {
          transform-origin: center top;
          transform: scale(1.35);
        }
        /* Fila inferior: zoom hacia arriba */
        .gallery-track .shot:nth-child(n+10):nth-child(-n+18):hover .phone {
          transform-origin: center bottom;
          transform: translateY(-8px) scale(1.35);
        }
        .phone {
          width: 100%;
          height: auto;
          aspect-ratio: 9 / 19.5;
          max-height: min(44vh, 460px);
        }
        .cap-text { font-size: clamp(0.78rem, 0.85vw, 0.9rem); }
      }

      @media (max-width: 720px) {
        .gallery {
          overflow: hidden;
          scroll-snap-type: none;
        }
        .gallery-track {
          gap: 0.9rem;
          animation: gallery-marquee 50s linear infinite;
          will-change: transform;
        }
        .gallery:active .gallery-track {
          animation-play-state: paused;
        }
        .shot { width: clamp(96px, 26vw, 130px); }
        .phone { height: clamp(200px, 30vh, 280px); }
        .cap-text { font-size: 0.75rem; }
      }

      @keyframes gallery-marquee {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }

      @media (prefers-reduced-motion: reduce) {
        .gallery-track { animation: none; }
        .gallery { overflow-x: auto; scroll-snap-type: x mandatory; }
      }
    `
  ]
})
export class ProjectsComponent {
  readonly banka = sideProjects.find((p) => p.name === 'BankaAppTracker');
  readonly others = sideProjects.filter((p) => p.name !== 'BankaAppTracker');
}
