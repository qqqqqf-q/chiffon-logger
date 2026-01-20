<template>
  <Teleport to="body">
    <div ref="dotRef" class="site-cursor cursor-dot" aria-hidden="true"></div>
    <div ref="ringRef" class="site-cursor cursor-ring" aria-hidden="true"></div>
  </Teleport>
</template>

<script setup>
const dotRef = ref(null);
const ringRef = ref(null);

let cleanup = null;

const lerp = (current, target, speed) => current + (target - current) * speed;

onMounted(() => {
  if (typeof window === "undefined") return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const dot = dotRef.value;
  const ring = ringRef.value;
  if (!dot || !ring) return;

  let x = 0;
  let y = 0;
  let ringX = 0;
  let ringY = 0;
  let rafId = 0;
  let visible = false;

  const setVisible = (next) => {
    if (visible === next) return;
    visible = next;
    dot.classList.toggle("is-visible", next);
    ring.classList.toggle("is-visible", next);
  };

  const render = () => {
    ringX = lerp(ringX, x, 0.28);
    ringY = lerp(ringY, y, 0.28);
    dot.style.setProperty("--cursor-x", `${x}px`);
    dot.style.setProperty("--cursor-y", `${y}px`);
    ring.style.setProperty("--cursor-x", `${ringX}px`);
    ring.style.setProperty("--cursor-y", `${ringY}px`);
    rafId = requestAnimationFrame(render);
  };

  const handleMove = (event) => {
    x = event.clientX;
    y = event.clientY;
    if (!visible) {
      ringX = x;
      ringY = y;
      setVisible(true);
    }
  };

  const handleOut = (event) => {
    if (!event.relatedTarget && !event.toElement) {
      setVisible(false);
    }
  };

  const handleBlur = () => {
    setVisible(false);
  };

  const handleVisibility = () => {
    if (document.hidden) setVisible(false);
  };

  window.addEventListener("mousemove", handleMove, { passive: true });
  window.addEventListener("mouseout", handleOut);
  window.addEventListener("blur", handleBlur);
  document.addEventListener("visibilitychange", handleVisibility);

  rafId = requestAnimationFrame(render);

  cleanup = () => {
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener("mousemove", handleMove);
    window.removeEventListener("mouseout", handleOut);
    window.removeEventListener("blur", handleBlur);
    document.removeEventListener("visibilitychange", handleVisibility);
  };
});

onBeforeUnmount(() => {
  cleanup?.();
});
</script>
