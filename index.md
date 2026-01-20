---
layout: page
title: 重定向中
head:
  - [meta, { http-equiv: "refresh", content: "0; url=/pages/about" }]
---

正在跳转到关于本站…

<script setup>
if (typeof window !== "undefined") {
  window.location.replace("/pages/about");
}
</script>
