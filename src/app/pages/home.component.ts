import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';

import { ScrollService } from '@core/services/scroll.service';
import { SceneCanvasComponent } from '@shared/components/scene-canvas/scene-canvas.component';
import { NavComponent } from '@shared/components/nav/nav.component';

import { HeroComponent } from '@sections/hero.component';
import { OriginsComponent } from '@sections/origins.component';
import { BridgeComponent } from '@sections/bridge.component';
import { InecoComponent } from '@sections/ineco.component';
import { MasterComponent } from '@sections/master.component';
import { BertrandtComponent } from '@sections/bertrandt.component';
import { StackComponent } from '@sections/stack.component';
import { ProjectsComponent } from '@sections/projects.component';
import { ContactComponent } from '@sections/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SceneCanvasComponent,
    NavComponent,
    HeroComponent,
    OriginsComponent,
    BridgeComponent,
    InecoComponent,
    MasterComponent,
    BertrandtComponent,
    StackComponent,
    ProjectsComponent,
    ContactComponent
  ],
  template: `
    <app-scene-canvas />
    <app-nav />

    <main class="page">
      <app-hero />
      <app-origins />
      <app-bridge />
      <app-ineco />
      <app-master />
      <app-bertrandt />
      <app-stack />
      <app-projects />
      <app-contact />
    </main>
  `,
  styles: [
    `
      :host { display: block; }
      .page {
        position: relative;
        z-index: 1;
        /* sections sit on top of the fixed 3D canvas */
      }
      app-scene-canvas { z-index: 0; }
    `
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly scroll = inject(ScrollService);

  ngOnInit(): void {
    this.scroll.init();
  }

  ngOnDestroy(): void {
    this.scroll.destroy();
  }
}
