import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '@shared/directives/reveal.directive';

@Component({
  selector: 'app-bridge',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="bridge" class="bridge">
      <div class="container content">
        <p class="eyebrow" appReveal>02 / The Bridge</p>
        <h2 appReveal>And then I wrote a thesis about an airport.</h2>
        <p class="lede" appReveal>
          My final-year project asked a simple question: <em>can big-data techniques
          actually optimise arrivals at a busy airport?</em> I picked Barcelona-El Prat,
          parsed the radar traces, modelled the patterns — and graduated with a 10/10.
        </p>
        <p class="lede" appReveal>
          That was the bridge. Same problem space. Different tool. From there, the
          rest of my career was inevitable.
        </p>

        <blockquote class="pull" appReveal>
          <span class="qmark">“</span>
          The aircraft hadn’t changed. The way we managed them had.
        </blockquote>
      </div>
    </section>
  `,
  styles: [
    `
      .lede { margin-top: 1.5rem; font-size: 1.125rem; color: var(--fg); max-width: 50ch; }
      .pull {
        margin: 4rem 0 0;
        padding: 2rem 0 0;
        border-top: 1px solid var(--line);
        font-size: clamp(1.4rem, 2.4vw, 2rem);
        font-weight: 300;
        line-height: 1.3;
        max-width: 28ch;
        color: var(--fg);
        position: relative;
      }
      .qmark {
        font-family: var(--font-mono);
        color: var(--accent);
        font-size: 2em;
        line-height: 0.5;
        margin-right: 0.25em;
        vertical-align: -0.2em;
      }
      em { color: var(--accent); font-style: normal; font-weight: 500; }
    `
  ]
})
export class BridgeComponent {}
