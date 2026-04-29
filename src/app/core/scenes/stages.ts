/**
 * 3D stages for each scroll chapter.
 *
 * Mental model: the world is laid out along the Z-axis.
 * Each chapter occupies a slice and contains its own meshes/groups.
 * The camera flies forward (negative Z) as the user scrolls.
 *
 * Each builder returns an updater that receives `localProgress` (0 → 1)
 * representing how far the user is within that chapter, plus elapsed
 * time for ambient animation.
 */
import {
  AdditiveBlending,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Color,
  ConeGeometry,
  EdgesGeometry,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  Line,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  Points,
  PointsMaterial,
  Scene,
  SphereGeometry,
  TorusGeometry,
  Vector3
} from 'three';

const ACCENT = new Color('#ff5b3a');
const FG = new Color('#f5f5f7');
const MUTED = new Color('#4b4d55');

export interface StageContext {
  scene: Scene;
  /** World-space Z offset where this stage is anchored. */
  z: number;
}

export type StageUpdater = (state: { localProgress: number; elapsed: number; delta: number }) => void;

export interface StageBuilder {
  id: string;
  /** Z offset, negative = forward into the scene. */
  z: number;
  build: (ctx: StageContext) => StageUpdater;
}

/* -------------------------------------------------------------------------- */
/*  00 · HERO — premium 3-layer starfield + dual horizon rings                 */
/*  Three particle layers create real depth/parallax. The atmosphere drifts    */
/*  seamlessly into Bio (no scene change), so the landing feels continuous.    */
/* -------------------------------------------------------------------------- */

// New Z layout (matches reordered narrative):
// hero 0 → bio -10 → projects -22 → origins -36 → bridge -48 → ineco -62
// → master -72 → bertrandt -86 → indra -100 → stack -114 → contact -128
const heroStage: StageBuilder = {
  id: 'hero',
  z: 0,
  build: ({ scene, z }) => {
    const group = new Group();
    group.position.z = z;

    // Three particle layers at increasing depth for parallax
    type LayerSpec = { count: number; size: number; opacity: number; min: number; max: number };
    const layerSpecs: LayerSpec[] = [
      { count: 80,   size: 0.10, opacity: 0.85, min: 8,  max: 18 }, // close drift (sparkles)
      { count: 420,  size: 0.06, opacity: 0.70, min: 22, max: 42 }, // mid
      { count: 1800, size: 0.04, opacity: 0.55, min: 50, max: 95 }  // distant
    ];

    const layers: Points[] = [];
    for (const spec of layerSpecs) {
      const positions = new Float32Array(spec.count * 3);
      for (let i = 0; i < spec.count; i++) {
        const r = spec.min + Math.random() * (spec.max - spec.min);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      const geom = new BufferGeometry();
      geom.setAttribute('position', new BufferAttribute(positions, 3));
      const points = new Points(
        geom,
        new PointsMaterial({
          color: 0xffffff,
          size: spec.size,
          sizeAttenuation: true,
          transparent: true,
          opacity: spec.opacity,
          blending: AdditiveBlending,
          depthWrite: false
        })
      );
      group.add(points);
      layers.push(points);
    }

    // Single accent ring — the horizon line
    const ring = new Mesh(
      new TorusGeometry(6.5, 0.005, 16, 240),
      new MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.6 })
    );
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    // ONE wireframe sphere — the "first sphere" of the journey, sits behind the ring
    const sphere = new LineSegments(
      new EdgesGeometry(new IcosahedronGeometry(3.2, 2)),
      new LineBasicMaterial({ color: FG, transparent: true, opacity: 0.32 })
    );
    sphere.position.z = -3;
    group.add(sphere);

    scene.add(group);

    return ({ localProgress, elapsed }) => {
      // Different speeds per layer = parallax depth
      layers[0]!.rotation.y = elapsed * 0.030;
      layers[0]!.rotation.x = elapsed * 0.012;
      layers[1]!.rotation.y = elapsed * 0.014;
      layers[2]!.rotation.y = elapsed * 0.005;
      layers[2]!.rotation.x = -elapsed * 0.003;

      ring.rotation.z = elapsed * 0.04;
      sphere.rotation.x = elapsed * 0.06;
      sphere.rotation.y = elapsed * 0.09;

      // Hero elements fade smoothly as we leave — no abrupt scene change
      const fade = 1 - Math.min(1, localProgress * 1.3);
      (ring.material as MeshBasicMaterial).opacity = 0.6 * fade;
      (sphere.material as LineBasicMaterial).opacity = 0.32 * fade;
    };
  }
};

/* -------------------------------------------------------------------------- */
/*  01 · ORIGINS — propulsion / CFD wireframe                                  */
/*       wireframe icosahedron split by a torus (engine ring)                  */
/* -------------------------------------------------------------------------- */

const originsStage: StageBuilder = {
  id: 'origins',
  z: -36,
  build: ({ scene, z }) => {
    const group = new Group();
    group.position.set(0, 0, z);

    // Wireframe sphere (turbulence cloud / CFD volume)
    const ico = new IcosahedronGeometry(2.2, 2);
    const wire = new LineSegments(
      new EdgesGeometry(ico),
      new LineBasicMaterial({ color: FG, transparent: true, opacity: 0.35 })
    );
    group.add(wire);

    // Engine ring — outer torus
    const torus = new Mesh(
      new TorusGeometry(2.6, 0.04, 16, 120),
      new MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.7 })
    );
    group.add(torus);

    // Streamlines — circles that swirl outward suggesting airflow
    const streamlines: Line[] = [];
    for (let i = 0; i < 12; i++) {
      const r = 2.6 + i * 0.2;
      const pts: Vector3[] = [];
      for (let a = 0; a <= 60; a++) {
        const t = (a / 60) * Math.PI * 2;
        pts.push(new Vector3(Math.cos(t) * r, Math.sin(t) * r * 0.4, Math.sin(t) * r * 0.2));
      }
      const lg = new BufferGeometry().setFromPoints(pts);
      const line = new Line(lg, new LineBasicMaterial({ color: MUTED, transparent: true, opacity: 0.18 }));
      line.rotation.y = (i * Math.PI) / 6;
      streamlines.push(line);
      group.add(line);
    }

    scene.add(group);

    return ({ localProgress, elapsed }) => {
      group.rotation.y = elapsed * 0.15;
      wire.rotation.x = elapsed * 0.1;
      torus.rotation.z = elapsed * 0.4;
      streamlines.forEach((l, i) => {
        l.rotation.x = elapsed * 0.2 + i * 0.1;
      });
      // Pulse of accent on entry
      const pulse = Math.sin(localProgress * Math.PI);
      (torus.material as MeshBasicMaterial).opacity = 0.4 + pulse * 0.4;
    };
  }
};

/* -------------------------------------------------------------------------- */
/*  02 · BRIDGE (TFG) — runway / radar arcs                                    */
/* -------------------------------------------------------------------------- */

const bridgeStage: StageBuilder = {
  id: 'bridge',
  z: -48,
  build: ({ scene, z }) => {
    const group = new Group();
    group.position.set(0, 0, z);

    // Concentric radar arcs
    const arcs: Mesh[] = [];
    for (let i = 1; i <= 4; i++) {
      const arc = new Mesh(
        new TorusGeometry(i * 0.9, 0.005, 8, 100, Math.PI),
        new MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.4 - i * 0.07 })
      );
      arc.rotation.x = Math.PI / 2;
      arc.position.y = -1.2;
      arcs.push(arc);
      group.add(arc);
    }

    // "Runway" — glowing line
    const runway = new Mesh(
      new PlaneGeometry(0.06, 6),
      new MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.9 })
    );
    runway.position.y = -1.2;
    runway.rotation.x = -Math.PI / 2;
    group.add(runway);

    // Falling data points — small cubes representing trace data
    const dataPoints: Mesh[] = [];
    for (let i = 0; i < 30; i++) {
      const cube = new Mesh(
        new BoxGeometry(0.04, 0.04, 0.04),
        new MeshBasicMaterial({ color: FG, transparent: true, opacity: 0.8 })
      );
      cube.position.set((Math.random() - 0.5) * 6, Math.random() * 4, (Math.random() - 0.5) * 4);
      dataPoints.push(cube);
      group.add(cube);
    }

    scene.add(group);

    return ({ elapsed, localProgress }) => {
      group.rotation.y = -0.3 + localProgress * 0.6;
      arcs.forEach((a, i) => {
        a.rotation.z = elapsed * (0.3 + i * 0.05);
      });
      dataPoints.forEach((p, i) => {
        p.position.y -= 0.01 + (i % 3) * 0.005;
        if (p.position.y < -1.2) p.position.y = 4;
      });
    };
  }
};

/* -------------------------------------------------------------------------- */
/*  03 · INECO — data sphere with orbiting points                              */
/* -------------------------------------------------------------------------- */

const inecoStage: StageBuilder = {
  id: 'ineco',
  z: -62,
  build: ({ scene, z }) => {
    const group = new Group();
    group.position.set(0, 0, z);

    // Wireframe sphere (data globe)
    const sphere = new LineSegments(
      new EdgesGeometry(new SphereGeometry(1.8, 16, 12)),
      new LineBasicMaterial({ color: FG, transparent: true, opacity: 0.25 })
    );
    group.add(sphere);

    // Orbiting nodes
    const orbits = new Group();
    const nodeMat = new MeshStandardMaterial({ color: ACCENT, emissive: ACCENT, emissiveIntensity: 0.7 });
    const nodes: { mesh: Mesh; radius: number; speed: number; tilt: number; phase: number }[] = [];
    for (let i = 0; i < 14; i++) {
      const node = new Mesh(new SphereGeometry(0.05, 12, 12), nodeMat);
      const radius = 1.9 + Math.random() * 1.2;
      const tilt = Math.random() * Math.PI;
      const speed = 0.3 + Math.random() * 0.5;
      const phase = Math.random() * Math.PI * 2;
      orbits.add(node);
      nodes.push({ mesh: node, radius, speed, tilt, phase });
    }
    group.add(orbits);

    scene.add(group);

    return ({ elapsed, localProgress }) => {
      group.rotation.y = elapsed * 0.2 + localProgress * 0.5;
      sphere.rotation.y = -elapsed * 0.1;
      nodes.forEach((n) => {
        const t = elapsed * n.speed + n.phase;
        n.mesh.position.set(
          Math.cos(t) * n.radius,
          Math.sin(t * 0.7) * n.radius * 0.4,
          Math.sin(t) * n.radius * Math.cos(n.tilt)
        );
      });
    };
  }
};

/* -------------------------------------------------------------------------- */
/*  04 · MASTER — minimal: a single rotating ring                              */
/* -------------------------------------------------------------------------- */

const masterStage: StageBuilder = {
  id: 'master',
  z: -72,
  build: ({ scene, z }) => {
    const group = new Group();
    group.position.set(0, 0, z);

    const ring = new Mesh(
      new TorusGeometry(1.6, 0.01, 16, 160),
      new MeshBasicMaterial({ color: FG, transparent: true, opacity: 0.4 })
    );
    group.add(ring);

    const innerRing = new Mesh(
      new TorusGeometry(0.8, 0.005, 12, 100),
      new MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.7 })
    );
    group.add(innerRing);

    scene.add(group);

    return ({ elapsed }) => {
      ring.rotation.x = elapsed * 0.3;
      ring.rotation.y = elapsed * 0.2;
      innerRing.rotation.x = -elapsed * 0.5;
      innerRing.rotation.z = elapsed * 0.4;
    };
  }
};

/* -------------------------------------------------------------------------- */
/*  05 · BERTRANDT / EUROFIGHTER — the climax                                  */
/*       Stylized fighter wireframe assembled from primitives                  */
/* -------------------------------------------------------------------------- */

const bertrandtStage: StageBuilder = {
  id: 'bertrandt',
  z: -86,
  build: ({ scene, z }) => {
    const group = new Group();
    group.position.set(0, 0, z);

    const wireMat = new LineBasicMaterial({ color: FG, transparent: true, opacity: 0.55 });
    const accentMat = new LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.9 });

    // Fuselage — elongated cone
    const fuselage = new LineSegments(
      new EdgesGeometry(new ConeGeometry(0.35, 4, 12)),
      wireMat
    );
    fuselage.rotation.z = Math.PI / 2;
    group.add(fuselage);

    // Cockpit — small icosahedron near nose
    const cockpit = new LineSegments(
      new EdgesGeometry(new IcosahedronGeometry(0.25, 0)),
      accentMat
    );
    cockpit.position.x = 1.2;
    group.add(cockpit);

    // Main wings — diamond plane edges
    const wingShape = new BufferGeometry();
    const wingPoints = [
      // Triangle right wing
      new Vector3(0, 0, 0), new Vector3(-0.6, 0, 1.8), new Vector3(-0.6, 0, 1.8), new Vector3(-1.2, 0, 0),
      new Vector3(-1.2, 0, 0), new Vector3(0, 0, 0),
      // Mirror left wing
      new Vector3(0, 0, 0), new Vector3(-0.6, 0, -1.8), new Vector3(-0.6, 0, -1.8), new Vector3(-1.2, 0, 0)
    ];
    wingShape.setFromPoints(wingPoints);
    const wings = new LineSegments(wingShape, wireMat);
    group.add(wings);

    // Twin tail fins (delta cuts)
    const tailGeo = new BufferGeometry();
    tailGeo.setFromPoints([
      new Vector3(-1.5, 0, 0), new Vector3(-1.9, 0.7, 0.3),
      new Vector3(-1.9, 0.7, 0.3), new Vector3(-2, 0, 0.3),
      new Vector3(-1.5, 0, 0), new Vector3(-1.9, 0.7, -0.3),
      new Vector3(-1.9, 0.7, -0.3), new Vector3(-2, 0, -0.3)
    ]);
    const tails = new LineSegments(tailGeo, wireMat);
    group.add(tails);

    // Engine glow — two small spheres at exhaust
    const glowMat = new MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.9 });
    const glowL = new Mesh(new SphereGeometry(0.08, 16, 16), glowMat);
    glowL.position.set(-2, 0, 0.18);
    group.add(glowL);
    const glowR = glowL.clone();
    glowR.position.z = -0.18;
    group.add(glowR);

    // Code-stream particles — drifting backwards from the engines
    const streamCount = 600;
    const streamPos = new Float32Array(streamCount * 3);
    for (let i = 0; i < streamCount; i++) {
      streamPos[i * 3 + 0] = -2 - Math.random() * 8;
      streamPos[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
      streamPos[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
    }
    const streamGeo = new BufferGeometry();
    streamGeo.setAttribute('position', new BufferAttribute(streamPos, 3));
    const stream = new Points(
      streamGeo,
      new PointsMaterial({
        color: ACCENT,
        size: 0.04,
        transparent: true,
        opacity: 0.7,
        blending: AdditiveBlending,
        depthWrite: false
      })
    );
    group.add(stream);

    // Subtle grid floor below the jet
    const grid = new LineSegments(
      buildGrid(20, 20),
      new LineBasicMaterial({ color: MUTED, transparent: true, opacity: 0.18 })
    );
    grid.position.y = -1.6;
    group.add(grid);

    scene.add(group);

    return ({ localProgress, elapsed }) => {
      // Slow yaw oscillation
      group.rotation.y = -0.5 + Math.sin(elapsed * 0.2) * 0.06 + localProgress * 0.4;
      group.rotation.z = Math.sin(elapsed * 0.1) * 0.04;
      cockpit.rotation.y = elapsed * 0.5;

      // Engine glow pulse
      const pulse = 0.6 + Math.sin(elapsed * 4) * 0.2;
      glowMat.opacity = pulse;

      // Animate code stream backwards then loop
      const posAttr = streamGeo.getAttribute('position') as BufferAttribute;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < streamCount; i++) {
        arr[i * 3 + 0] -= 0.04 + (i % 4) * 0.005;
        if ((arr[i * 3 + 0] ?? 0) < -10) arr[i * 3 + 0] = -2;
      }
      posAttr.needsUpdate = true;
    };
  }
};

/* -------------------------------------------------------------------------- */
/*  06 · STACK — constellation of tech labels (visual nodes only here)         */
/* -------------------------------------------------------------------------- */

const stackStage: StageBuilder = {
  id: 'stack',
  z: -114,
  build: ({ scene, z }) => {
    const group = new Group();
    group.position.set(0, 0, z);

    const nodes: { mesh: Mesh; base: Vector3; speed: number; phase: number }[] = [];
    const nodeMat = new MeshBasicMaterial({ color: FG, transparent: true, opacity: 0.7 });
    const accentNodeMat = new MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.9 });

    for (let i = 0; i < 36; i++) {
      const isAccent = i % 6 === 0;
      const node = new Mesh(new SphereGeometry(isAccent ? 0.07 : 0.04, 12, 12), isAccent ? accentNodeMat : nodeMat);
      const r = 1.5 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const base = new Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
      node.position.copy(base);
      group.add(node);
      nodes.push({ mesh: node, base, speed: 0.5 + Math.random(), phase: Math.random() * Math.PI * 2 });
    }

    // Connecting lines between near neighbors
    const lineMat = new LineBasicMaterial({ color: MUTED, transparent: true, opacity: 0.2 });
    const linePts: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = nodes[i]!.base.distanceTo(nodes[j]!.base);
        if (d < 1.6) {
          linePts.push(
            nodes[i]!.base.x, nodes[i]!.base.y, nodes[i]!.base.z,
            nodes[j]!.base.x, nodes[j]!.base.y, nodes[j]!.base.z
          );
        }
      }
    }
    const lineGeo = new BufferGeometry();
    lineGeo.setAttribute('position', new Float32BufferAttribute(linePts, 3));
    const lines = new LineSegments(lineGeo, lineMat);
    group.add(lines);

    scene.add(group);

    return ({ elapsed }) => {
      group.rotation.y = elapsed * 0.1;
      group.rotation.x = Math.sin(elapsed * 0.05) * 0.2;
      nodes.forEach((n) => {
        const t = elapsed * n.speed + n.phase;
        n.mesh.position.x = n.base.x + Math.sin(t) * 0.05;
        n.mesh.position.y = n.base.y + Math.cos(t * 0.7) * 0.05;
      });
    };
  }
};

/* -------------------------------------------------------------------------- */
/*  07 · PROJECTS — minimal ambient. The HTML screenshots are the visual.      */
/*  No floating glyphs (they bled into the hero view). Just sparse drift.      */
/* -------------------------------------------------------------------------- */

const projectsStage: StageBuilder = {
  id: 'projects',
  z: -22,
  build: ({ scene, z }) => {
    const group = new Group();
    group.position.set(0, 0, z);

    const count = 180;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const geom = new BufferGeometry();
    geom.setAttribute('position', new BufferAttribute(positions, 3));
    const dust = new Points(
      geom,
      new PointsMaterial({
        color: 0xffffff,
        size: 0.05,
        transparent: true,
        opacity: 0.35,
        blending: AdditiveBlending,
        depthWrite: false
      })
    );
    group.add(dust);

    scene.add(group);

    return ({ elapsed }) => {
      dust.rotation.y = elapsed * 0.02;
    };
  }
};

/* -------------------------------------------------------------------------- */
/*  08 · CONTACT — fading constellation                                        */
/* -------------------------------------------------------------------------- */

const contactStage: StageBuilder = {
  id: 'contact',
  z: -128,
  build: ({ scene, z }) => {
    const group = new Group();
    group.position.set(0, 0, z);

    const dotCount = 80;
    const positions = new Float32Array(dotCount * 3);
    for (let i = 0; i < dotCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(positions, 3));
    const points = new Points(
      geo,
      new PointsMaterial({
        color: 0xffffff,
        size: 0.08,
        transparent: true,
        opacity: 0.8,
        blending: AdditiveBlending,
        depthWrite: false
      })
    );
    group.add(points);

    scene.add(group);

    return ({ elapsed }) => {
      points.rotation.y = elapsed * 0.05;
    };
  }
};

/* -------------------------------------------------------------------------- */
/*  Helper: build a flat grid from line segments                               */
/* -------------------------------------------------------------------------- */

function buildGrid(size: number, divisions: number): BufferGeometry {
  const step = size / divisions;
  const half = size / 2;
  const points: number[] = [];
  for (let i = 0; i <= divisions; i++) {
    const v = -half + i * step;
    points.push(-half, 0, v, half, 0, v);
    points.push(v, 0, -half, v, 0, half);
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(points, 3));
  return g;
}

/* -------------------------------------------------------------------------- */
/*  01b · BIO — atmospheric drift only. NO new scene.                          */
/*  This is a continuation of the hero's space — just sparse drifting points   */
/*  at close-mid distance so the camera passing through still feels alive.     */
/* -------------------------------------------------------------------------- */

const bioStage: StageBuilder = {
  id: 'bio',
  z: -10,
  build: ({ scene, z }) => {
    const group = new Group();
    group.position.set(0, 0, z);

    // Sparse close drift — extends the hero atmosphere
    const count = 220;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.6;
    }
    const geom = new BufferGeometry();
    geom.setAttribute('position', new BufferAttribute(positions, 3));
    const dust = new Points(
      geom,
      new PointsMaterial({
        color: 0xffffff,
        size: 0.07,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.5,
        blending: AdditiveBlending,
        depthWrite: false
      })
    );
    group.add(dust);

    scene.add(group);

    return ({ elapsed }) => {
      dust.rotation.y = elapsed * 0.018;
      dust.rotation.x = elapsed * 0.008;
    };
  }
};

/* -------------------------------------------------------------------------- */
/*  08b · INDRA — minimal AI signal: 1 accent point + faint connecting lines   */
/*  Restraint: just a tiny constellation, hinting at networks without          */
/*  occupying the camera's view. The HTML carries the meaning.                 */
/* -------------------------------------------------------------------------- */

const indraStage: StageBuilder = {
  id: 'indra',
  z: -100,
  build: ({ scene, z }) => {
    const group = new Group();
    group.position.set(0, 0, z);

    // A single accent core
    const core = new Mesh(
      new SphereGeometry(0.08, 16, 16),
      new MeshStandardMaterial({
        color: ACCENT,
        emissive: ACCENT,
        emissiveIntensity: 0.9
      })
    );
    group.add(core);

    // Six small white satellites at varying radii
    const satellites: { mesh: Mesh; base: Vector3; speed: number; phase: number }[] = [];
    const linePts: number[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 1.6 + (i % 2) * 0.4;
      const base = new Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle * 0.5) * 0.8,
        Math.sin(angle) * radius
      );
      const sat = new Mesh(
        new SphereGeometry(0.035, 10, 10),
        new MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 })
      );
      sat.position.copy(base);
      group.add(sat);
      satellites.push({ mesh: sat, base, speed: 0.18 + Math.random() * 0.1, phase: Math.random() * Math.PI * 2 });
      // Line from core to each satellite
      linePts.push(0, 0, 0, base.x, base.y, base.z);
    }

    const lineGeo = new BufferGeometry();
    lineGeo.setAttribute('position', new Float32BufferAttribute(linePts, 3));
    const lines = new LineSegments(
      lineGeo,
      new LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.18 })
    );
    group.add(lines);

    scene.add(group);

    return ({ elapsed }) => {
      group.rotation.y = elapsed * 0.08;
      // Soft pulse on core
      const pulse = 1 + Math.sin(elapsed * 1.6) * 0.12;
      core.scale.setScalar(pulse);
      // Satellites drift slightly around their base
      satellites.forEach((s) => {
        const t = elapsed * s.speed + s.phase;
        s.mesh.position.set(
          s.base.x + Math.sin(t) * 0.05,
          s.base.y + Math.cos(t) * 0.04,
          s.base.z
        );
      });
    };
  }
};

/* -------------------------------------------------------------------------- */
/*  Public registry — order matches the narrative                              */
/* -------------------------------------------------------------------------- */

export const stages: StageBuilder[] = [
  heroStage,
  bioStage,
  projectsStage,
  originsStage,
  bridgeStage,
  inecoStage,
  masterStage,
  bertrandtStage,
  indraStage,
  stackStage,
  contactStage
];

/** Total Z range traveled by the camera through all stages. */
export const Z_TOTAL = Math.abs(stages[stages.length - 1]!.z) + 8;

/**
 * For a given global progress, compute the local progress for each stage
 * (0 if before, 1 if after, 0→1 within its own slice).
 */
export function localProgressFor(stageIndex: number, globalProgress: number): number {
  const slice = 1 / stages.length;
  const start = stageIndex * slice;
  const end = start + slice;
  if (globalProgress < start) return 0;
  if (globalProgress > end) return 1;
  return (globalProgress - start) / slice;
}
