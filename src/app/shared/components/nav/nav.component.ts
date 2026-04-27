import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '@core/services/scroll.service';
import { chapters } from '@core/data/portfolio.data';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="nav" aria-label="Sections">
      <ul>
        @for (c of chapters; track c.id; let i = $index) {
          <li>
            <button
              type="button"
              [class.active]="activeIndex() === i"
              (click)="goTo(c.id)"
              [attr.aria-label]="'Go to ' + c.label"
            >
              <span class="dot"></span>
              <span class="label mono">{{ c.label }}</span>
            </button>
          </li>
        }
      </ul>
    </nav>
  `,
  styles: [
    `
      :host {
        position: fixed;
        right: clamp(1rem, 3vw, 2.5rem);
        top: 50%;
        transform: translateY(-50%);
        z-index: 50;
        pointer-events: auto;
      }
      .nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      button {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.75rem;
        font-size: 0.7rem;
        color: var(--fg-muted);
        opacity: 0.6;
        transition: opacity 0.3s var(--ease-out), color 0.3s var(--ease-out);
      }
      button:hover { opacity: 1; color: var(--fg); }
      .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: currentColor;
        transition: transform 0.3s var(--ease-out), background 0.3s var(--ease-out);
      }
      .label {
        opacity: 0;
        transform: translateX(8px);
        transition: opacity 0.3s var(--ease-out), transform 0.3s var(--ease-out);
        white-space: nowrap;
      }
      button:hover .label,
      button.active .label {
        opacity: 1;
        transform: translateX(0);
      }
      button.active {
        opacity: 1;
        color: var(--accent);
      }
      button.active .dot {
        transform: scale(1.6);
        background: var(--accent);
      }
      @media (max-width: 720px) { :host { display: none; } }
    `
  ]
})
export class NavComponent {
  readonly chapters = chapters;
  private readonly scroll = inject(ScrollService);

  /** Approx active index based on global progress. */
  readonly activeIndex = computed(() => {
    const p = this.scroll.progress();
    return Math.min(this.chapters.length - 1, Math.floor(p * this.chapters.length));
  });

  goTo(id: string): void {
    this.scroll.scrollTo('#' + id, { offset: 0, duration: 1.6 });
  }
}
