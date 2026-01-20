<template>
  <div v-if="lifeList.length" class="life-days s-card">
    <div v-for="(item, index) in lifeList" :key="index" class="life-item">
      <div class="life-icon">
        <i class="iconfont icon-account" />
      </div>
      <div class="life-text">
        <div class="line line-top">
          <span class="name">{{ item.name }}</span>
          <span class="status-text">
            <span class="status">{{ item.status }}</span>
            <span class="text">已经</span>
          </span>
        </div>
        <div class="line line-bottom">
          <span class="num">{{ formatNumber(item.days) }}</span>
          <span class="unit">days</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";

const { theme } = useData();

const today = ref(dayjs().startOf("day"));
const refreshToday = () => {
  today.value = dayjs().startOf("day");
};

const normalizeDate = (value) => {
  if (typeof value !== "string") return "";
  const raw = value.trim();
  if (!raw) return "";
  if (/^\d{8}$/.test(raw)) {
    return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6)}`;
  }
  return raw.replace(/\//g, "-");
};

const getAliveDays = (value) => {
  const normalized = normalizeDate(value);
  if (!normalized) return null;
  const target = dayjs(normalized).startOf("day");
  if (!target.isValid()) return null;
  return today.value.diff(target, "day");
};

const formatNumber = (value) => {
  if (typeof value !== "number" || Number.isNaN(value)) return "0";
  return String(Math.floor(value));
};

const lifeList = computed(() => {
  const raw = theme.value?.aside?.lifeDays?.data || [];
  return raw
    .map((item) => {
      const days = getAliveDays(item.date);
      if (days === null) return null;
      return {
        name: item.name || "",
        status: item.status || "Alive",
        days,
      };
    })
    .filter(Boolean);
});

let refreshTimer = null;
onMounted(() => {
  refreshToday();
  refreshTimer = setInterval(refreshToday, 60 * 60 * 1000);
});

onBeforeUnmount(() => {
  clearInterval(refreshTimer);
});
</script>

<style lang="scss" scoped>
.life-days {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-image: linear-gradient(
    140deg,
    var(--main-card-background),
    var(--main-card-second-background)
  );
  .life-item {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 10px;
  }
  .life-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: var(--main-mask-Inverse-background);
    .iconfont {
      font-size: 18px;
      opacity: 0.8;
    }
  }
  .life-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    font-size: 14px;
    white-space: nowrap;
    .line {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .line-top {
      gap: 10px;
    }
    .line-bottom {
      gap: 6px;
      align-items: baseline;
    }
    .status-text {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .name {
      font-weight: bold;
      font-size: 16px;
    }
    .status {
      padding: 2px 6px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: bold;
      color: var(--main-color);
      background-color: var(--main-color-bg);
    }
    .text {
      opacity: 0.8;
    }
    .num {
      font-size: 20px;
      font-weight: bold;
      color: var(--main-color);
    }
    .unit {
      opacity: 0.7;
      letter-spacing: 0.4px;
    }
  }
}
</style>
