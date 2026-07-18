<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';
  import { app } from '$lib/stores.svelte';

  let canvas: HTMLCanvasElement;
  let renderer: THREE.WebGLRenderer;
  let animationId: number;
  let resizeHandler: () => void;
  let scene: THREE.Scene;
  let themeUnsub: (() => void) | null = null;

  // Update 3D scene background when theme changes
  $effect(() => {
    const theme = app.theme;
    if (scene) {
      const bg = theme === 'dark' ? 0x0E0E10 : 0xF5F4F0;
      scene.background = new THREE.Color(bg);
      scene.fog = new THREE.Fog(bg, 5, 14);
    }
  });

  onMount(() => {
    // ═══ Scene ═══
    scene = new THREE.Scene();
    const bgLight = 0xF5F4F0;
    const bgDark = 0x0E0E10;
    scene.background = new THREE.Color(app.theme === 'dark' ? bgDark : bgLight);
    scene.fog = new THREE.Fog(app.theme === 'dark' ? bgDark : bgLight, 5, 14);

    // Accent colors — brighter in dark mode
    const isDark = app.theme === 'dark';
    const cA = isDark ? 0xA78BFA : 0x7C3AED;
    const cB = isDark ? 0xC4B5FD : 0xA78BFA;
    const cC = isDark ? 0xDDD6FE : 0xC4B5FD;
    const cCore = isDark ? 0xC4B5FD : 0xA78BFA;

    // ═══ Camera ═══
    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6.5);

    // ═══ Renderer ═══
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // ═══ Lights ═══
    scene.add(new THREE.AmbientLight(0xffffff, isDark ? 0.5 : 0.3));

    const keyLight = new THREE.DirectionalLight(isDark ? 0xA78BFA : 0x7C3AED, isDark ? 1.5 : 1.2);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(isDark ? 0xC4B5FD : 0xA78BFA, isDark ? 0.6 : 0.4);
    fillLight.position.set(-3, -1, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(isDark ? 0xDDD6FE : 0xC4B5FD, isDark ? 0.4 : 0.25);
    rimLight.position.set(0, 2, -4);
    scene.add(rimLight);

    // ═══ GLSL Noise (Ashima simplex 3D) ═══
    const noiseGLSL = `
      vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
      vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
      vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
      float snoise(vec3 v){
        const vec2 C=vec2(1.0/6.0,1.0/3.0);
        const vec4 D=vec4(0.0,0.5,1.0,2.0);
        vec3 i=floor(v+dot(v,C.yyy));
        vec3 x0=v-i+dot(i,C.xxx);
        vec3 g=step(x0.yzx,x0.xyz);
        vec3 l=1.0-g;
        vec3 i1=min(g.xyz,l.zxy);
        vec3 i2=max(g.xyz,l.zxy);
        vec3 x1=x0-i1+C.xxx;
        vec3 x2=x0-i2+C.yyy;
        vec3 x3=x0-D.yyy;
        i=mod289(i);
        vec4 p=permute(permute(permute(
          i.z+vec4(0.0,i1.z,i2.z,1.0))
          +i.y+vec4(0.0,i1.y,i2.y,1.0))
          +i.x+vec4(0.0,i1.x,i2.x,1.0));
        float n_=0.142857142857;
        vec3 ns=n_*D.wyz-D.xzx;
        vec4 j=p-49.0*floor(p*ns.z*ns.z);
        vec4 x_=floor(j*ns.z);
        vec4 y_=floor(j-7.0*x_);
        vec4 x=x_*ns.x+ns.yyyy;
        vec4 y=y_*ns.x+ns.yyyy;
        vec4 h=1.0-abs(x)-abs(y);
        vec4 b0=vec4(x.xy,y.xy);
        vec4 b1=vec4(x.zw,y.zw);
        vec4 s0=floor(b0)*2.0+1.0;
        vec4 s1=floor(b1)*2.0+1.0;
        vec4 sh=-step(h,vec4(0.0));
        vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
        vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
        vec3 p0=vec3(a0.xy,h.x);
        vec3 p1=vec3(a0.zw,h.y);
        vec3 p2=vec3(a1.xy,h.z);
        vec3 p3=vec3(a1.zw,h.w);
        vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
        p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
        vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
        m=m*m;
        return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
      }
    `;

    // ═══ Breathing Organism (centerpiece) ═══
    const organismGeo = new THREE.IcosahedronGeometry(1.4, 5); // high-poly for smooth displacement
    const basePositions = (organismGeo.attributes.position as THREE.BufferAttribute).array as Float32Array;

    const organismMat = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uBreath: { value: 0 },
        uColorA: { value: new THREE.Color(cA) },
        uColorB: { value: new THREE.Color(cB) },
        uColorC: { value: new THREE.Color(cC) },
        uOpacity: { value: 0.7 },
      },
      vertexShader: `
        ${noiseGLSL}
        uniform float uTime;
        uniform float uBreath;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vDisplacement;

        void main() {
          vec3 pos = position;
          float n = snoise(pos * 1.2 + vec3(uTime * 0.15, uTime * 0.12, uTime * 0.18));
          float n2 = snoise(pos * 3.0 + vec3(uTime * 0.3, uTime * 0.25, uTime * 0.35)) * 0.3;
          float displacement = (n + n2) * (0.15 + uBreath * 0.35);
          pos += normal * displacement;
          vDisplacement = displacement;
          vNormal = normalize(normalMatrix * normal);
          vPosition = pos;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        ${noiseGLSL}
        uniform float uTime;
        uniform float uBreath;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform vec3 uColorC;
        uniform float uOpacity;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vDisplacement;

        void main() {
          // Fresnel — glowing edges like a cell membrane
          vec3 viewDir = normalize(-vPosition);
          float fresnel = pow(1.0 - dot(vNormal, viewDir), 2.5);

          // Color mix based on displacement + breathing
          float mixT = smoothstep(-0.1, 0.3, vDisplacement + uBreath * 0.1);
          vec3 baseColor = mix(uColorA, uColorB, mixT);

          // Bio-luminescent green pulses
          float glowPulse = snoise(vPosition * 2.0 + uTime * 0.2) * 0.5 + 0.5;
          vec3 glow = uColorC * glowPulse * (0.08 + uBreath * 0.12);

          // Combine
          vec3 color = baseColor * (0.4 + uBreath * 0.2) + glow;
          color += fresnel * mix(uColorB, uColorA, 0.5) * (0.6 + uBreath * 0.4);

          // Subtle inner light
          float inner = pow(dot(vNormal, viewDir), 1.5) * 0.15;
          color += uColorA * inner;

          float alpha = uOpacity + fresnel * 0.2;
          gl_FragColor = vec4(color, alpha);
        }
      `,
    });

    const organism = new THREE.Mesh(organismGeo, organismMat);
    scene.add(organism);

    // ═══ Inner Core — glowing heart ═══
    const coreGeo = new THREE.IcosahedronGeometry(0.35, 3);
    const coreMat = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uBreath: { value: 0 },
        uColor: { value: new THREE.Color(cCore) },
      },
      vertexShader: `
        ${noiseGLSL}
        uniform float uTime;
        uniform float uBreath;
        varying float vGlow;

        void main() {
          vec3 pos = position;
          float n = snoise(pos * 2.5 + uTime * 0.4);
          pos += normal * n * (0.04 + uBreath * 0.08);
          vGlow = n * 0.5 + 0.5;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uBreath;
        uniform vec3 uColor;
        varying float vGlow;

        void main() {
          vec3 color = uColor * (1.2 + vGlow * 0.6 + uBreath * 0.8);
          float alpha = 0.55 + uBreath * 0.25 + vGlow * 0.15;
          gl_FragColor = vec4(color, alpha);
        }
      `,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // ═══ Orbital Particle Stream ═══
    const particleCount = 350;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pSpeed = new Float32Array(particleCount);
    const pAngle = new Float32Array(particleCount);
    const pRadius = new Float32Array(particleCount);
    const pHeight = new Float32Array(particleCount);
    const pPhase = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      pAngle[i] = Math.random() * Math.PI * 2;
      pRadius[i] = 2.0 + Math.random() * 2.5;
      pHeight[i] = (Math.random() - 0.5) * 3.5;
      pSpeed[i] = 0.15 + Math.random() * 0.35;
      pPhase[i] = Math.random() * Math.PI * 2;
      pPos[i * 3] = Math.cos(pAngle[i]) * pRadius[i];
      pPos[i * 3 + 1] = pHeight[i];
      pPos[i * 3 + 2] = Math.sin(pAngle[i]) * pRadius[i];
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));

    const pMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uBreath: { value: 0 },
        uColor: { value: new THREE.Color(cA) },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uBreath;
        uniform vec3 uColor;
        varying float vAlpha;
        varying vec3 vColor;

        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = (2.0 + uBreath * 4.0) * (250.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          float dist = length(position);
          vAlpha = (1.0 - smoothstep(2.5, 5.0, dist)) * (0.3 + uBreath * 0.4);
          vColor = uColor;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        varying vec3 vColor;

        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          if (d > 0.5) discard;
          float soft = 1.0 - smoothstep(0.0, 0.5, d);
          gl_FragColor = vec4(vColor, soft * vAlpha);
        }
      `,
    });

    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ═══ Tendril Lines — neuron-like threads ═══
    const tendrilCount = 8;
    const tendrilSegs = 20;
    const tendrils: THREE.Line[] = [];

    for (let t = 0; t < tendrilCount; t++) {
      const points: Float32Array = new Float32Array(tendrilSegs * 3);
      const angle = (t / tendrilCount) * Math.PI * 2;
      const baseDir = new THREE.Vector3(
        Math.cos(angle),
        (Math.random() - 0.5) * 0.6,
        Math.sin(angle)
      ).normalize();

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(points, 3));

      const mat = new THREE.LineBasicMaterial({
        color: cA,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
      });

      const line = new THREE.Line(geo, mat);
      tendrils.push(line);
      scene.add(line);
    }

    // ═══ Background depth particles (dust/ambient) ═══
    const dustCount = 150;
    const dGeo = new THREE.BufferGeometry();
    const dPos = new Float32Array(dustCount * 3);
    const dBase = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      const r = 5 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      dBase[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      dBase[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      dBase[i * 3 + 2] = r * Math.cos(phi);
      dPos[i * 3] = dBase[i * 3];
      dPos[i * 3 + 1] = dBase[i * 3 + 1];
      dPos[i * 3 + 2] = dBase[i * 3 + 2];
    }
    dGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3));
    const dMat = new THREE.PointsMaterial({
      color: cB,
      size: 0.015,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dust = new THREE.Points(dGeo, dMat);
    scene.add(dust);

    // ═══ Resize ═══
    resizeHandler = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    window.addEventListener('resize', resizeHandler);

    // ═══ Animation Loop ═══
    let time = 0;
    function animate() {
      time += 0.01;

      // Breathing cycle — slow, rhythmic (3.5 second inhale-exhale)
      const breathCycle = Math.sin(time * 0.45);
      const breath = (breathCycle + 1) * 0.5; // 0 → 1 → 0
      const breathEased = breath * breath * (3 - 2 * breath); // smoothstep

      // Update uniforms
      (organismMat.uniforms.uTime.value as number) = time;
      (organismMat.uniforms.uBreath.value as number) = breathEased;
      (coreMat.uniforms.uTime.value as number) = time;
      (coreMat.uniforms.uBreath.value as number) = breathEased;
      (pMat.uniforms.uTime.value as number) = time;
      (pMat.uniforms.uBreath.value as number) = breathEased;

      // Organism: gentle self-rotation
      organism.rotation.y = time * 0.08;
      organism.rotation.x = Math.sin(time * 0.05) * 0.15;
      const orgScale = 1.0 + breathEased * 0.08;
      organism.scale.setScalar(orgScale);

      // Core: pulses with breath
      core.rotation.y = -time * 0.15;
      core.rotation.z = time * 0.1;
      const coreScale = 1.0 + breathEased * 0.35;
      core.scale.setScalar(coreScale);

      // Particles: orbit + breathe
      const pPositions = pGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pAngle[i] += pSpeed[i] * 0.003 * (0.5 + breathEased * 0.8);
        const r = pRadius[i] - breathEased * 0.3; // particles pulled in on inhale
        const wave = Math.sin(time * 0.5 + pPhase[i]) * 0.15;
        pPositions[i * 3] = Math.cos(pAngle[i]) * r;
        pPositions[i * 3 + 1] = pHeight[i] + wave + breathEased * 0.2;
        pPositions[i * 3 + 2] = Math.sin(pAngle[i]) * r;
      }
      pGeo.attributes.position.needsUpdate = true;

      // Tendrils: extend and retract with breath
      for (let t = 0; t < tendrils.length; t++) {
        const angle = (t / tendrils.length) * Math.PI * 2 + time * 0.02;
        const dir = new THREE.Vector3(
          Math.cos(angle),
          Math.sin(t * 1.7 + time * 0.05) * 0.5,
          Math.sin(angle)
        ).normalize();

        const pts = tendrils[t].geometry.attributes.position.array as Float32Array;
        const reach = 1.5 + breathEased * 1.8;

        for (let s = 0; s < tendrilSegs; s++) {
          const tFrac = s / (tendrilSegs - 1);
          const dist = reach * tFrac;
          const wobble = Math.sin(time * 0.8 + t * 2 + s * 0.5) * 0.08 * tFrac;
          const wobble2 = Math.cos(time * 0.6 + t * 3 + s * 0.3) * 0.06 * tFrac;
          const radial = 1.0 - tFrac * tFrac; // taper to tip

          pts[s * 3] = dir.x * dist + wobble;
          pts[s * 3 + 1] = dir.y * dist + wobble2;
          pts[s * 3 + 2] = dir.z * dist + wobble;
        }
        tendrils[t].geometry.attributes.position.needsUpdate = true;

        // Opacity pulses with breath
        (tendrils[t].material as THREE.LineBasicMaterial).opacity =
          0.05 + breathEased * 0.15;
      }

      // Dust: slow drift
      dust.rotation.y = time * 0.01;
      dust.rotation.x = time * 0.005;

      // Camera: subtle breathing-aligned sway
      camera.position.x = Math.sin(time * 0.08) * 0.2;
      camera.position.y = breathEased * 0.15 - 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    }
    animate();

    onDestroy(() => {
      window.removeEventListener('resize', resizeHandler);
      cancelAnimationFrame(animationId);
      organismGeo.dispose();
      organismMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      dGeo.dispose();
      dMat.dispose();
      tendrils.forEach((l) => {
        l.geometry.dispose();
        (l.material as THREE.Material).dispose();
      });
      renderer.dispose();
    });
  });
</script>

<div class="three-container w-full h-full">
  <canvas bind:this={canvas} class="w-full h-full block"></canvas>
</div>

<style>
  .three-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
  }
</style>