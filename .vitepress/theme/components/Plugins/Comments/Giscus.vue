<template>
  <div ref="giscusRef" class="comment-content giscus" />
</template>

<script setup>
const { theme } = useData();
const route = useRoute();

defineProps({
  // 保持与其他评论组件一致的接口
  fill: {
    type: [Boolean, String],
    default: false,
  },
});

const giscusRef = ref(null);

const renderGiscus = () => {
  if (!giscusRef.value) return;
  const config = theme.value?.comment?.giscus || {};
  if (!config.repo || !config.repoId || !config.category || !config.categoryId) {
    console.warn("Giscus config missing, skip render.");
    return;
  }

  giscusRef.value.innerHTML = "";
  const script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.async = true;
  script.crossOrigin = "anonymous";

  const attrs = {
    "data-repo": config.repo,
    "data-repo-id": config.repoId,
    "data-category": config.category,
    "data-category-id": config.categoryId,
    "data-mapping": config.mapping || "pathname",
    "data-strict": String(config.strict ?? 0),
    "data-reactions-enabled": String(config.reactionsEnabled ?? 1),
    "data-emit-metadata": String(config.emitMetadata ?? 0),
    "data-input-position": config.inputPosition || "bottom",
    "data-theme": config.theme || "preferred_color_scheme",
    "data-lang": config.lang || "zh-CN",
  };

  Object.entries(attrs).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      script.setAttribute(key, value);
    }
  });

  giscusRef.value.appendChild(script);
};

onMounted(() => {
  renderGiscus();
});

watch(
  () => route.path,
  () => {
    renderGiscus();
  },
);
</script>
