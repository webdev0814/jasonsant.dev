(() => {
  const hero = document.querySelector(".hero");
  const canvas = document.getElementById("gravity-canvas");

  if (!hero || !canvas) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(pointer: fine)");

  if (prefersReducedMotion.matches || !finePointer.matches) {
    return;
  }

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) {
    return;
  }

  const state = {
    width: 0,
    height: 0,
    dpr: 1,
    pointer: {
      x: 0,
      y: 0,
      active: false,
    },
    target: {
      x: 0,
      y: 0,
      active: false,
    },
    particles: [],
  };

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const lerp = (from, to, amount) => from + (to - from) * amount;

  function setHeroVars(x, y) {
    const fxX = ((x / state.width) - 0.5) * 22;
    const fxY = ((y / state.height) - 0.5) * 18;
    const mediaX = fxX * 0.7;
    const mediaY = fxY * 0.7;

    hero.style.setProperty("--pointer-x", `${(x / state.width) * 100}%`);
    hero.style.setProperty("--pointer-y", `${(y / state.height) * 100}%`);
    hero.style.setProperty("--hero-fx-x", `${fxX.toFixed(2)}px`);
    hero.style.setProperty("--hero-fx-y", `${fxY.toFixed(2)}px`);
    hero.style.setProperty("--hero-media-x", `${mediaX.toFixed(2)}px`);
    hero.style.setProperty("--hero-media-y", `${mediaY.toFixed(2)}px`);
  }

  function resize() {
    const rect = hero.getBoundingClientRect();
    state.width = Math.max(1, rect.width);
    state.height = Math.max(1, rect.height);
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(state.width * state.dpr);
    canvas.height = Math.round(state.height * state.dpr);
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

    if (!state.particles.length) {
      const count = clamp(Math.round((state.width * state.height) / 22000), 38, 84);
      for (let index = 0; index < count; index += 1) {
        const anchorX = Math.random() * state.width;
        const anchorY = Math.random() * state.height;
        state.particles.push({
          anchorX,
          anchorY,
          x: anchorX + (Math.random() - 0.5) * 24,
          y: anchorY + (Math.random() - 0.5) * 24,
          vx: 0,
          vy: 0,
          radius: 1.8 + Math.random() * 3.8,
          orbit: 8 + Math.random() * 22,
          phase: Math.random() * Math.PI * 2,
          spring: 0.003 + Math.random() * 0.005,
          drag: 0.94 + Math.random() * 0.03,
          hue: index % 3 === 0 ? 176 : index % 3 === 1 ? 38 : 194,
          alpha: 0.18 + Math.random() * 0.18,
        });
      }
    }
  }

  function updatePointer(event) {
    const rect = hero.getBoundingClientRect();
    const x = clamp(event.clientX - rect.left, 0, state.width);
    const y = clamp(event.clientY - rect.top, 0, state.height);

    state.target.x = x;
    state.target.y = y;
    state.target.active = true;
  }

  function leavePointer() {
    state.target.active = false;
  }

  function drawBackground(pointerX, pointerY) {
    ctx.fillStyle = "rgba(16, 23, 25, 0.06)";
    ctx.fillRect(0, 0, state.width, state.height);
  }

  function drawParticles(pointerX, pointerY) {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";

    for (const particle of state.particles) {
      const dx = particle.x - pointerX;
      const dy = particle.y - pointerY;
      const distance = Math.hypot(dx, dy) || 1;
      const proximity = clamp(1 - distance / (Math.min(state.width, state.height) * 0.34), 0, 1);
      const size = particle.radius + proximity * 2.6;
      const opacity = particle.alpha + proximity * 0.26;

      const glow = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, size * 6.4);
      glow.addColorStop(0, `hsla(${particle.hue}, 100%, 82%, ${opacity})`);
      glow.addColorStop(0.35, `hsla(${particle.hue}, 100%, 68%, ${opacity * 0.42})`);
      glow.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, size * 6.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `hsla(${particle.hue}, 100%, 88%, ${0.42 + proximity * 0.22})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 0; i < state.particles.length; i += 1) {
      const current = state.particles[i];
      let links = 0;

      for (let j = i + 1; j < state.particles.length && links < 2; j += 1) {
        const next = state.particles[j];
        const dx = next.x - current.x;
        const dy = next.y - current.y;
        const distance = Math.hypot(dx, dy);

        if (distance > 180) {
          continue;
        }

        const alpha = (1 - distance / 180) * 0.1;
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(current.x, current.y);
        ctx.lineTo(next.x, next.y);
        ctx.stroke();
        links += 1;
      }
    }

    ctx.restore();
  }

  function frame(time) {
    if (state.target.active) {
      state.pointer.x = lerp(state.pointer.x, state.target.x, 0.14);
      state.pointer.y = lerp(state.pointer.y, state.target.y, 0.14);
    } else {
      state.pointer.x = lerp(state.pointer.x, state.width * 0.56, 0.04);
      state.pointer.y = lerp(state.pointer.y, state.height * 0.42, 0.04);
    }

    setHeroVars(state.pointer.x, state.pointer.y);

    ctx.clearRect(0, 0, state.width, state.height);
    drawBackground(state.pointer.x, state.pointer.y);

    const centerX = state.pointer.x;
    const centerY = state.pointer.y;
    const repulseRadius = Math.min(state.width, state.height) * 0.32;
    const maxSpeed = 1.4;

    for (const particle of state.particles) {
      const orbitAngle = time * 0.0007 + particle.phase;
      const orbitX = particle.anchorX + Math.sin(orbitAngle) * particle.orbit;
      const orbitY = particle.anchorY + Math.cos(orbitAngle * 1.1) * particle.orbit * 0.72;
      const toPointerX = particle.x - centerX;
      const toPointerY = particle.y - centerY;
      const distance = Math.hypot(toPointerX, toPointerY) || 1;
      const pull = clamp(1 - distance / repulseRadius, 0, 1);
      const swirlX = -toPointerY / distance;
      const swirlY = toPointerX / distance;

      particle.vx += (orbitX - particle.x) * particle.spring;
      particle.vy += (orbitY - particle.y) * particle.spring;
      particle.vx += (toPointerX / distance) * pull * 1.1;
      particle.vy += (toPointerY / distance) * pull * 1.1;
      particle.vx += swirlX * pull * 0.22;
      particle.vy += swirlY * pull * 0.22;
      particle.vx += Math.sin(orbitAngle * 0.9) * 0.003;
      particle.vy += Math.cos(orbitAngle * 0.8) * 0.003;
      particle.vx *= particle.drag;
      particle.vy *= particle.drag;

      const speed = Math.hypot(particle.vx, particle.vy);
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        particle.vx *= scale;
        particle.vy *= scale;
      }

      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 16) {
        particle.x = 16;
        particle.vx *= -0.35;
      } else if (particle.x > state.width - 16) {
        particle.x = state.width - 16;
        particle.vx *= -0.35;
      }

      if (particle.y < 16) {
        particle.y = 16;
        particle.vy *= -0.35;
      } else if (particle.y > state.height - 16) {
        particle.y = state.height - 16;
        particle.vy *= -0.35;
      }
    }

    drawParticles(state.pointer.x, state.pointer.y);
    requestAnimationFrame(frame);
  }

  resize();
  setHeroVars(state.width * 0.56, state.height * 0.42);
  state.pointer.x = state.width * 0.56;
  state.pointer.y = state.height * 0.42;
  state.target.x = state.pointer.x;
  state.target.y = state.pointer.y;

  hero.addEventListener("pointermove", updatePointer);
  hero.addEventListener("pointerleave", leavePointer);
  hero.addEventListener("pointercancel", leavePointer);
  window.addEventListener("resize", resize);
  prefersReducedMotion.addEventListener?.("change", () => {
    if (prefersReducedMotion.matches) {
      window.location.reload();
    }
  });

  requestAnimationFrame(frame);
})();
