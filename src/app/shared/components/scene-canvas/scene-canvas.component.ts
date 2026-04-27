import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  inject
} from '@angular/core';

import { ScrollService } from '@core/services/scroll.service';
import { ThreeEngineService } from '@core/services/three-engine.service';
import { stages, Z_TOTAL, localProgressFor } from '@core/scenes/stages';

/**
 * Fixed full-viewport canvas hosting every 3D stage.
 * Camera flies forward (−Z) as the user scrolls.
 */
@Component({
  selector: 'app-scene-canvas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="canvas-host" #host aria-hidden="true"></div>`,
  styles: [
    `
      :host {
        position: fixed;
        inset: 0;
        z-index: 0;
        pointer-events: none;
      }
      .canvas-host {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
      :host canvas {
        display: block;
        width: 100% !important;
        height: 100% !important;
      }
    `
  ]
})
export class SceneCanvasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('host', { static: true }) host!: ElementRef<HTMLDivElement>;

  private readonly engine = inject(ThreeEngineService);
  private readonly scroll = inject(ScrollService);
  private dispose: Array<() => void> = [];

  ngAfterViewInit(): void {
    this.engine.mount(this.host.nativeElement);
    this.engine.setProgressSource(() => this.scroll.progress());

    // Build all stages and collect their updaters
    const updaters = stages.map((stage) =>
      stage.build({ scene: this.engine.scene, z: stage.z })
    );

    // Master updater: drive the camera + dispatch local progress to each stage
    const remove = this.engine.registerUpdater(({ progress, delta, elapsed }) => {
      // Camera flies along -Z. Slight drift on Y for a "rising" feel.
      const z = 8 - progress * Z_TOTAL;
      this.engine.camera.position.x = Math.sin(elapsed * 0.1) * 0.15;
      this.engine.camera.position.y = Math.cos(elapsed * 0.07) * 0.1;
      this.engine.camera.position.z = z;
      this.engine.camera.lookAt(0, 0, z - 5);

      // Dispatch local progress to each stage
      stages.forEach((_, i) => {
        const local = localProgressFor(i, progress);
        updaters[i]!({ localProgress: local, elapsed, delta });
      });
    });

    this.dispose.push(remove);
  }

  ngOnDestroy(): void {
    this.dispose.forEach((fn) => fn());
  }
}
