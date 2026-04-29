import { Injectable, NgZone, inject, signal } from '@angular/core';
import {
  AmbientLight,
  Clock,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Color,
  Fog
} from 'three';

/**
 * Shared Three.js engine.
 * One scene, one camera, one renderer for the whole page.
 * Each section adds its own objects (a "stage") and registers an
 * update callback that runs every frame, receiving scroll progress.
 */
export type StageUpdater = (state: {
  /** Global page scroll progress, 0 → 1. */
  progress: number;
  /** Time delta in seconds. */
  delta: number;
  /** Total elapsed time in seconds. */
  elapsed: number;
}) => void;

@Injectable({ providedIn: 'root' })
export class ThreeEngineService {
  private readonly zone = inject(NgZone);

  readonly scene = new Scene();
  readonly camera = new PerspectiveCamera(50, 1, 0.1, 200);
  renderer: WebGLRenderer | null = null;
  private clock = new Clock();
  private rafId = 0;
  private updaters = new Set<StageUpdater>();
  private host: HTMLElement | null = null;

  readonly ready = signal(false);

  mount(host: HTMLElement): void {
    if (typeof window === 'undefined') return;
    if (this.renderer) return;

    this.host = host;
    this.zone.runOutsideAngular(() => {
      this.renderer = new WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setClearColor(0x000000, 0);
      host.appendChild(this.renderer.domElement);

      // Scene atmosphere
      this.scene.background = null;
      // Tight fog so far stages don't bleed into the current view.
      // Each stage feels like its own atmosphere, not a peep-hole into the next.
      this.scene.fog = new Fog(new Color(0x0a0b0f), 18, 48);

      // Lighting — minimal, directional + soft ambient
      const key = new DirectionalLight(0xffffff, 1.2);
      key.position.set(5, 8, 6);
      this.scene.add(key);

      const fill = new DirectionalLight(0xff5b3a, 0.4);
      fill.position.set(-6, -4, -2);
      this.scene.add(fill);

      this.scene.add(new AmbientLight(0xffffff, 0.18));

      // Initial sizing + camera
      this.resize();
      this.camera.position.set(0, 0, 8);

      window.addEventListener('resize', this.resize, { passive: true });

      const tick = () => {
        const delta = this.clock.getDelta();
        const elapsed = this.clock.elapsedTime;
        const progress = this.scrollProgress();
        for (const updater of this.updaters) updater({ progress, delta, elapsed });
        this.renderer?.render(this.scene, this.camera);
        this.rafId = requestAnimationFrame(tick);
      };
      this.rafId = requestAnimationFrame(tick);
      this.ready.set(true);
    });
  }

  /** Called externally by the home page to share scroll progress. */
  scrollProgress: () => number = () => 0;

  setProgressSource(getter: () => number): void {
    this.scrollProgress = getter;
  }

  registerUpdater(updater: StageUpdater): () => void {
    this.updaters.add(updater);
    return () => this.updaters.delete(updater);
  }

  private resize = (): void => {
    if (!this.renderer || !this.host) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  };

  destroy(): void {
    cancelAnimationFrame(this.rafId);
    window.removeEventListener('resize', this.resize);
    this.renderer?.dispose();
    this.renderer?.domElement.parentElement?.removeChild(this.renderer.domElement);
    this.renderer = null;
    this.updaters.clear();
    this.ready.set(false);
  }
}
