<template>
  <div class="about">
    <h1 class="title">关于本站</h1>
    <div class="about-content" style="grid-template-columns: 3fr 2fr">
      <!-- 介绍 -->
      <div class="about-item hello">
        <span class="text1">你好，很高兴认识你</span>
        <span class="text2 title2">我是 清凤 / kilock</span>
        <span class="text3">是两名 学生、独立开发者</span>
      </div>
      <!-- 追求 -->
      <div class="about-item pursuit">
        <span class="tip">追求</span>
        <span class="title2">活下去</span>
        <span class="title2">去做更多</span>
        <span class="title2">更优秀的作品</span>
      </div>
    </div>
    <div class="about-content" style="grid-template-columns: 2fr 3fr">
      <!-- 技能 -->
      <div class="about-item skills">
        <span class="tip">技能</span>
        <span class="title2">我们会的东西</span>
        <div class="skills-list">
          <a
            v-for="(item, index) in skillsData"
            :key="index"
            :style="{ '--color': item.color }"
            :href="item.link"
            class="skills-item"
            target="_blank"
          >
            <div class="skills-logo">
              <i :class="`iconfont icon-${item.icon}`"></i>
            </div>
            <span class="skills-name">{{ item.name }}</span>
          </a>
        </div>
      </div>
      <!-- 生涯 -->
      <div class="about-item career">
        <span class="tip">生涯</span>
        <span class="title2">
          <i>成长中...</i>
        </span>
        <div class="list">
          <span class="list-item" style="--color: #357ef5">Base：浙江·宁波</span>
          <span class="list-item" style="--color: #eb372a">研发方向：交易 / 量化 / 神经网络 / Agent / 后端开发</span>
          <span class="list-item" style="--color: #9b59b6">精神状态良好，Python 精通 | Rust & JS 爱好者</span>
        </div>
        <div class="links">
          <a
            class="link-btn magnetic-card"
            href="https://github.com/qqqqqf-q"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg class="link-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385 0.6 0.113 0.82-0.258 0.82-0.577 0-0.285-0.01-1.04-0.015-2.04-3.338 0.725-4.042-1.61-4.042-1.61-0.546-1.387-1.333-1.757-1.333-1.757-1.09-0.745 0.084-0.729 0.084-0.729 1.205 0.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495 0.998 0.108-0.776 0.418-1.305 0.762-1.605-2.665-0.3-5.466-1.332-5.466-5.93 0-1.31 0.468-2.38 1.235-3.22-0.135-0.303-0.54-1.523 0.105-3.176 0 0 1.005-0.322 3.3 1.23 0.96-0.267 1.98-0.399 3-0.405 1.02 0.006 2.04 0.138 3 0.405 2.28-1.552 3.285-1.23 3.285-1.23 0.645 1.653 0.24 2.873 0.12 3.176 0.765 0.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92 0.42 0.36 0.81 1.096 0.81 2.22 0 1.606-0.015 2.896-0.015 3.286 0 0.315 0.21 0.69 0.825 0.57 4.77-1.59 8.19-6.09 8.19-11.39 0-6.627-5.373-12-12-12z"
              />
            </svg>
            <span>GitHub</span>
          </a>
          <a
            class="link-btn magnetic-card"
            href="https://www.nodeseek.com/space/21917#/general"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg class="link-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M10.59 13.41a1.5 1.5 0 0 0 2.12 0l3.54-3.54a1.5 1.5 0 0 0-2.12-2.12l-1.41 1.41a1 1 0 1 1-1.42-1.42l1.41-1.41a3.5 3.5 0 0 1 4.95 4.95l-3.54 3.54a3.5 3.5 0 0 1-4.95 0 1 1 0 0 1 1.42-1.42zM7.41 10.59a1.5 1.5 0 0 0-2.12 0l-3.54 3.54a1.5 1.5 0 0 0 2.12 2.12l1.41-1.41a1 1 0 1 1 1.42 1.42l-1.41 1.41a3.5 3.5 0 0 1-4.95-4.95l3.54-3.54a3.5 3.5 0 0 1 4.95 0 1 1 0 0 1-1.42 1.42z"
              />
            </svg>
            <span>NodeSeek</span>
          </a>
          <a class="link-btn magnetic-card" href="https://x.com/qqqqqf5" target="_blank" rel="noopener noreferrer">
            <svg class="link-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M18.244 2.25h3.308l-7.227 8.258 8.502 11.242h-6.64l-5.206-6.798-5.945 6.798H1.728l7.73-8.844L1.25 2.25h6.808l4.704 6.217L18.244 2.25zm-1.16 17.52h1.833L7.084 4.126H5.117L17.084 19.77z"
              />
            </svg>
            <span>X</span>
          </a>
        </div>
      </div>
    </div>
    <div class="about-content" style="grid-template-columns: 3fr 2fr">
      <!-- 性格 -->
      <div class="about-item character" style="--color: #4298b4">
        <span class="tip">性格</span>
        <span class="title2">
          <a href="https://www.16personalities.com/ch/entp-%E4%BA%BA%E6%A0%BC" target="_blank">
            辩论家
          </a>
          /
          <a href="https://www.16personalities.com/ch/intp-%E4%BA%BA%E6%A0%BC" target="_blank">
            逻辑学家
          </a>
        </span>
        <span class="title2">
          <span style="color: #f1c40f">ENTP</span> / <span style="color: #9b59b6">INTP</span>
        </span>
        <span class="more">
          在
          <a href="https://www.16personalities.com/ch/" target="_blank">16personalities</a>
          了解更多关于
          <a href="https://www.16personalities.com/ch/entp-%E4%BA%BA%E6%A0%BC" target="_blank">
            辩论家
          </a>
          和
          <a href="https://www.16personalities.com/ch/intp-%E4%BA%BA%E6%A0%BC" target="_blank">
            逻辑学家
          </a>
        </span>
      </div>
      <!-- 座右铭 -->
      <div class="about-item">
        <span class="tip">座右铭</span>
        <span class="title1" style="margin-top: 20px">活在当下，</span>
        <span class="title2">及时享乐。</span>
      </div>
    </div>
    <div class="about-content" style="display: flex">
      <div
        class="about-item like image"
        style="
          background-image: url(/images/logo/nacho2.jpeg);
        "
      >
        <div class="image-content">
          <span class="tip">关注偏好</span>
          <span class="title2">量化交易、虚拟货币、科技、AI、神经网络、游戏<br/>逆向工程、猫猫！！</span>
          <div class="image-desc">
            <span class="left">手机、电脑及软硬件、网络等</span>
          </div>
        </div>
      </div>
    </div>
    <div class="about-content" style="grid-template-columns: 3fr 2fr">
      <!-- 开源项目 -->
      <div class="about-item projects">
        <span class="tip">开源项目</span>
        <span class="title2">我在做的东西</span>
        <div class="projects-list">
          <a
            v-for="(item, index) in projectsData"
            :key="index"
            :href="item.link"
            class="project-card magnetic-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="project-title">{{ item.name }}</div>
            <div class="project-desc">{{ item.desc }}</div>
            <div class="project-meta">{{ item.tags }}</div>
          </a>
        </div>
      </div>
      <div class="about-item">
        <span class="tip">状态</span>
        <span class="title2">持续迭代中</span>
        <span class="text">欢迎提 issue / PR，一起完善。</span>
      </div>
    </div>
    <div class="about-content" style="grid-template-columns: 3fr 2fr">
      <!-- 硬件 -->
      <div class="about-item hardware">
        <span class="tip">硬件</span>
        <span class="title2">主力 PC</span>
        <div class="kv-list">
          <div class="kv-item">
            <span class="kv-key">CPU</span>
            <span class="kv-value">Ryzen 5 7600X</span>
          </div>
          <div class="kv-item">
            <span class="kv-key">内存</span>
            <span class="kv-value">玖合星舞 DDR5 6800 16G ×2</span>
          </div>
          <div class="kv-item">
            <span class="kv-key">主板</span>
            <span class="kv-value">B650 AORUS ELITE AX</span>
          </div>
          <div class="kv-item">
            <span class="kv-key">显卡</span>
            <span class="kv-value">RX 6800 XT</span>
          </div>
          <div class="kv-item">
            <span class="kv-key">硬盘</span>
            <span class="kv-value">PC411 2T / TiPlus7100 1T / TiPlus5000 500G</span>
          </div>
          <div class="kv-item">
            <span class="kv-key">散热</span>
            <span class="kv-value">FW360 水冷</span>
          </div>
        </div>
      </div>
      <div class="about-item hardware">
        <span class="tip">服务器</span>
        <span class="title2">R720xd</span>
        <div class="kv-list">
          <div class="kv-item">
            <span class="kv-key">CPU</span>
            <span class="kv-value">E5-2690 v2 @ 3.00GHz ×2</span>
          </div>
          <div class="kv-item">
            <span class="kv-key">内存</span>
            <span class="kv-value">DDR3 16G ×4</span>
          </div>
          <div class="kv-item">
            <span class="kv-key">硬盘</span>
            <span class="kv-value">3T SAS ×2</span>
          </div>
        </div>
      </div>
    </div>
    <div class="about-content" style="grid-template-columns: 3fr 2fr">
      <!-- 哲学 -->
      <div class="about-item philosophy">
        <span class="tip">哲学</span>
        <span class="title2">荒谬 × 现实 × 享乐</span>
        <p class="text">承认世界没有预设意义，因此选择主动赋予意义。</p>
        <p class="text">行动上坚持现实主义：用可验证的路径、工具与系统，把欲望落地。</p>
        <p class="text">享乐不是放纵，而是把当下体验做成作品与记忆。</p>
      </div>
      <!-- 设备 -->
      <div class="about-item hardware devices">
        <span class="tip">设备</span>
        <span class="title2">日常随身</span>
        <div class="kv-list">
          <div class="kv-item">
            <span class="kv-key">清凤</span>
            <span class="kv-value">
              一加 13 / MatePad 11.5s / OPPO WATCH 4 PRO / 华为 FIT3 / 小米手环 9
            </span>
          </div>
          <div class="kv-item">
            <span class="kv-key">kilock</span>
            <span class="kv-value">一加 13 / 华为 FIT4</span>
          </div>
        </div>
      </div>
    </div>
    <div class="about-content" style="grid-template-columns: 3fr 2fr">
      <!-- 现在在做 -->
      <div class="about-item now">
        <span class="tip">现在在做</span>
        <span class="title2">进行中的事</span>
        <div class="list">
          <span class="list-item" style="--color: #357ef5">中考</span>
          <span class="list-item" style="--color: #eb372a">NanoTrans</span>
          <span class="list-item" style="--color: #2ecc71">Arkilo.dev SaaS（未上线）</span>
        </div>
      </div>
      <!-- 常用工具 -->
      <div class="about-item tools">
        <span class="tip">常用工具</span>
        <span class="title2">效率优先</span>
        <div class="tools-list">
          <span class="tool-chip">VSCode</span>
          <span class="tool-chip">PowerShell</span>
          <span class="tool-chip">GitHub</span>
          <span class="tool-chip">Gemini</span>
          <span class="tool-chip">Chrome</span>
        </div>
        <p class="text">
          Why如此朴素，因为我秉承效率和实用至上原则，反对过度客制化。
        </p>
      </div>
    </div>
    <div class="about-content" style="grid-template-columns: 2fr 3fr">
      <!-- 数据 -->
      <div
        class="about-item static image stats-card"
        style="background-image: url(/images/logo/nacho3.jpg);"
      >
        <div class="image-content">
          <span class="tip">数据</span>
          <span class="title2">访问统计</span>
          <div class="static-data">
            <div v-for="(item, key, index) in statisticsData" :key="index" class="static-item">
              <span class="static-name">{{ key }}</span>
              <span class="static-num">{{ item }}</span>
            </div>
          </div>
          <div class="image-desc opacity">
            <span class="left">
              统计信息来自 <a href="https://v6.51.la/" target="_blank">51la</a>
            </span>
          </div>
        </div>
      </div>
      <!-- 信息 --> 
      <div class="about-item child">

        <a
          class="about-item map image"
          href="https://ditu.amap.com/place/B023E0Z0HD"
          target="_blank"
          style="background-image: url(/images/logo/ningbo-map.png)"
        >
          <span class="position">我现在住在 <strong>中国，浙江省，宁波市</strong></span>
        </a>
        <div class="about-item info">
          <div class="info-item">
            <span class="info-name">生于</span>
            <span class="info-num" style="--color: #43a6c6">2009 / 2008</span>
          </div>
          <div class="info-item">
            <span class="info-name">现在职业</span>
            <span class="info-num" style="--color: #dfac46">学生</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 关于这个小破站 -->
    <div class="about-content" style="display: flex">
      <div class="about-item about-site">
        <span class="tip">关于这个小破站</span>
        <span class="title2">一个见证我们存在的小站</span>
        <p class="text">
          这里记录着我们生活的片段，虽然不广为人知，
        </p>
        <p class="text">
          但它承载了我们过去的时光，证明我们曾真实存在过。
        </p>
        <div class="about-site-footer">
          <span>由Kilock提供技术支持</span>
          <span>这只是我们的一小部分</span>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { getStatistics } from "@/api";

const { theme } = useData();

// 技能数据
const skillsData = [
  {
    name: "C++",
    color: "#00599C",
    icon: "code",
    link: "https://learn.microsoft.com/zh-cn/cpp/",
  },
  {
    name: "Python",
    color: "#3776AB",
    icon: "python",
    link: "https://www.python.org/",
  },
    {
    name: "HTML5",
    color: "#e34f26",
    icon: "html5",
    link: "https://developer.mozilla.org/zh-CN/docs/Web/HTML",
  },
    {
    name: "Vue",
    color: "#41b883",
    icon: "vue",
    link: "https://cn.vuejs.org/",
  },
    {
    name: "Node.js",
    color: "#026E00",
    icon: "nodejs",
    link: "https://nodejs.org/",
  },
    {
    name: "Git",
    color: "#F05032",
    icon: "git",
    link: "https://git-scm.com/",
  },
  {
    name: "Photoshop",
    color: "#31A8FF",
    icon: "photoshop",
    link: "https://www.adobe.com/cn/lead/creativecloud/business.html",
  },
  {
    name: "ChatGPT",
    color: "#4AA181",
    icon: "chatgpt",
    link: "https://chat.openai.com/",
  },
  {
    name: "Rust",
    color: "#DEA584",
    icon: "code",
    link: "https://www.rust-lang.org/",
  },
  {
    name: "JavaScript",
    color: "#F7DF1E",
    icon: "code",
    link: "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript",
  },
  {
    name: "PostgreSQL",
    color: "#336791",
    icon: "code",
    link: "https://www.postgresql.org/",
  },
  {
    name: "Docker",
    color: "#2496ED",
    icon: "code",
    link: "https://www.docker.com/",
  },
  {
    name: "Linux",
    color: "#FCC624",
    icon: "code",
    link: "https://www.kernel.org/",
  },
  {
    name: "Windows",
    color: "#0078D6",
    icon: "code",
    link: "https://www.microsoft.com/windows",
  },
  {
    name: "Cloudflare",
    color: "#F38020",
    icon: "code",
    link: "https://www.cloudflare.com/",
  },
  {
    name: "Clojure",
    color: "#5881D8",
    icon: "code",
    link: "https://clojure.org/",
  },
  {
    name: "Kubernetes",
    color: "#326CE5",
    icon: "code",
    link: "https://kubernetes.io/",
  },
  {
    name: "Terraform",
    color: "#7B42BC",
    icon: "code",
    link: "https://www.terraform.io/",
  },
  {
    name: "Prometheus",
    color: "#E6522C",
    icon: "code",
    link: "https://prometheus.io/",
  },
  {
    name: "Grafana",
    color: "#F46800",
    icon: "code",
    link: "https://grafana.com/",
  },
  {
    name: "LaTeX",
    color: "#008080",
    icon: "code",
    link: "https://www.latex-project.org/",
  },
  {
    name: "Neovim",
    color: "#57A143",
    icon: "code",
    link: "https://neovim.io/",
  },
];

const projectsData = [
  {
    name: "Qing-Digital-Self",
    desc: "用 C2C 聊天记录微调大模型，尽可能还原你的表达风格与聊天方式。",
    tags: "LLM · 微调 · 数字分身",
    link: "https://github.com/qqqqqf-q/Qing-Digital-Self",
  },
  {
    name: "NanoTrans",
    desc: "跨平台极致轻量输入翻译助手，锁定光标位置即时翻译与原地回填。",
    tags: "Windows · macOS · 翻译",
    link: "https://github.com/qqqqqf-q/NanoTrans",
  },
  {
    name: "Arbitrage_Rust",
    desc: "基于 Rust 的自动三角套利程序，TelegramBot 控制，10.0µs 单次循环(7600x)。",
    tags: "Rust · 量化 · 套利",
    link: "https://github.com/qqqqqf-q/Arbitrage_Rust",
  },
];

// 站点统计数据
const statisticsData = ref(null);

// 获取站点统计数据
const getStatisticsData = async () => {
  const result = await getStatistics(theme.value.tongji["51la"]);
  statisticsData.value = result;
};

onMounted(() => {
  getStatisticsData();
});
</script>

<style lang="scss" scoped>
.about {
  .title {
    font-size: 2.4rem;
    text-align: center;
    border: none;
  }
  .about-content {
    display: grid;
    grid-template-columns: auto auto;
    gap: 20px;
    margin-bottom: 20px;
      .about-item {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
      padding: 1.2rem 2rem;
        border-radius: 12px;
        background-color: var(--main-card-background);
        border: 1px solid var(--main-card-border);
        box-shadow: 0 8px 12px -4px var(--main-border-shadow);
        overflow: hidden;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
        &:not(.child):hover {
          border-color: var(--main-color);
          box-shadow:
            0 8px 12px -4px var(--main-border-shadow),
            0 0 0 1px var(--main-color),
            0 0 20px -10px var(--main-color);
        }
        .tip {
          font-size: 14px;
          opacity: 0.8;
          margin-bottom: 12px;
        }
      .title1 {
        font-size: 36px;
        font-weight: bold;
        opacity: 0.6;
      }
      .title2 {
        font-size: 36px;
        font-weight: bold;
        margin-right: 4rem;
      }
      .text {
        font-size: 18px;
        margin: 0.6rem 0;
      }
      &.child {
        background-color: transparent;
        border: none;
        box-shadow: none;
        padding: 0;
        gap: 20px;
        .about-item {
          height: 100%;
        }
      }
      &.hello {
        position: relative;
        display: flex;
        justify-content: center;
        padding: 2rem;
        color: #2C3E50; /* 字体保持清晰 */
        background-color: #5BCEFA; /* 底色兜底统一蓝色调 */
        overflow: hidden;
        font-weight: 600;
        background-image: linear-gradient(
          120deg,
          #5BCEFA 0%,
          #5BCEFA 15%,
          rgba(245, 169, 184, 0.9) 28%,
          rgba(245, 169, 184, 0.7) 38%,
          rgba(255, 255, 255, 0.85) 48%,
          rgba(255, 255, 255, 0.6) 52%,
          rgba(245, 169, 184, 0.7) 62%,
          rgba(245, 169, 184, 0.9) 72%,
          #5BCEFA 85%,
          #5BCEFA 100%
        );
        background-size: 250% 250%; /* 扩大以便流动有空间 */
        animation: smoothFlow 30s linear infinite alternate;

        .title2 {
          position: relative;
          line-height: 1.2;
          font-size: 2.2rem;
          z-index: 2; /* 确保在模糊层之上 */
        }

        backface-visibility: hidden;
        transform: translateZ(0);
      }

      @keyframes smoothFlow {
        from {
          background-position: 0% 0%;
        }
        to {
          background-position: 100% 100%;
        }
      }

      &.pursuit {
        .title2 {
          line-height: 1.2;
          &:nth-child(2) {
            display: inline-block;
            background-size: 100% 100%;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-repeat: no-repeat;
            background-image: linear-gradient(45deg, #fa7671 50%, #f45f7f);
          }
          &:nth-child(4) {
            display: inline-block;
            background-size: 100% 100%;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-repeat: no-repeat;
            background-image: linear-gradient(45deg, #4CAF50 50%, #8BC34A);
          }
        }
      }
      &.character {
        min-height: 220px;
        cursor: pointer;
        .more {
          margin-top: auto;
          font-size: 14px;
          color: var(--main-color-gray);
          a {
            color: var(--main-color-gray);
            &:hover {
              color: var(--color);
            }
          }
        }
        .male {
          position: absolute;
          top: 20px;
          right: -10px;
          height: 140%;
          width: auto;
          transition: transform 0.5s;
          transform-origin: top center;
          @media (max-width: 768px) {
            height: 80%;
          }
        }
        &:hover {
          .male {
            transform: scale(1.2);
          }
        }
      }
      &.skills {
        .skills-list {
          margin-top: 12px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          .skills-item {
            display: flex;
            align-items: center;
            margin-right: 10px;
            margin-top: 10px;
            padding: 6px 10px 6px 6px;
            border-radius: 40px;
            background-color: var(--main-site-background);
            border: 1px solid var(--main-card-border);
            box-shadow: 0 8px 12px -4px var(--main-border-shadow);
            transition: background-color 0.3s;
            cursor: pointer;
            .skills-logo {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 24px;
              height: 24px;
              margin-right: 8px;
              border-radius: 50%;
              background-color: var(--color);
              .iconfont {
                color: #fff;
                font-size: 12px;
              }
            }
            .skills-name {
              font-weight: bold;
              transition: color 0.3s;
              font-size: 12px;
            }
            &:hover {
              background-color: var(--main-card-background);
            }
          }
        }
      }
      &.about-site {
        .about-site-footer {
          margin-top: auto;
          padding-top: 10px;
          border-top: 1px dashed var(--main-card-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          font-size: 12px;
          color: var(--main-color-gray);
        }
        @media (max-width: 768px) {
          .about-site-footer {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      }
      &.now {
        .list {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          .list-item {
            display: flex;
            align-items: center;
            color: var(--main-font-second-color);
            &::before {
              content: "";
              display: block;
              width: 10px;
              height: 10px;
              background-color: var(--color);
              border-radius: 50%;
              margin-right: 8px;
            }
          }
        }
      }
      &.tools {
        .tools-list {
          margin-top: 12px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tool-chip {
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          color: var(--main-font-color);
          background-color: var(--main-site-background);
          border: 1px solid var(--main-card-border);
        }
        .text {
          margin-top: 10px;
          font-size: 13px;
          color: var(--main-font-second-color);
        }
      }
      &.projects {
        .projects-list {
          margin-top: 12px;
          display: grid;
          gap: 12px;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          .project-card {
            display: flex;
            flex-direction: column;
            gap: 6px;
            padding: 12px;
            border-radius: 12px;
            background-color: var(--main-site-background);
            border: 1px solid var(--main-card-border);
            box-shadow: 0 8px 12px -4px var(--main-border-shadow);
            transition: transform 0.2s, background-color 0.2s, border-color 0.2s;
            .project-title {
              font-size: 16px;
              font-weight: bold;
            }
            .project-desc {
              font-size: 13px;
              color: var(--main-font-second-color);
            }
            .project-meta {
              font-size: 12px;
              color: var(--main-color-gray);
            }
            &:hover {
              transform: translateY(-2px);
              border-color: var(--main-color);
              background-color: var(--main-card-background);
            }
          }
        }
      }
      &.career {
        .title2 {
          letter-spacing: 0.2rem;
          font-size: 40px;
        }
        .list {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          .list-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 12px;
            color: var(--main-font-second-color);
            &::before {
              content: "";
              display: block;
              width: 16px;
              height: 16px;
              background-color: var(--color);
              border-radius: 50%;
              margin-right: 8px;
            }
          }
        }
        .links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 12px;
          .link-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 10px 14px;
            min-width: 120px;
            border-radius: 12px;
            font-size: 15px;
            font-weight: 600;
            color: var(--main-font-color);
            background-color: var(--main-site-background);
            border: 1px solid var(--main-card-border);
            box-shadow: 0 8px 12px -4px var(--main-border-shadow);
            transition: transform 0.2s, color 0.2s, border-color 0.2s, background-color 0.2s;
            &:hover {
              transform: translateY(-1px);
              color: var(--main-color);
              border-color: var(--main-color);
              background-color: var(--main-card-background);
            }
          }
          .link-icon {
            width: 18px;
            height: 18px;
            fill: currentColor;
            opacity: 0.9;
          }
        }
        .career-img {
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 100%;
          @media (max-width: 768px) {
            position: static;
          }
        }
      }
      &.hardware {
        .kv-list {
          margin-top: 12px;
          display: grid;
          gap: 10px;
        }
        .kv-item {
          display: grid;
          grid-template-columns: minmax(56px, 90px) 1fr;
          gap: 10px;
          align-items: start;
          @media (max-width: 768px) {
            grid-template-columns: 1fr;
            gap: 4px;
          }
        }
        .kv-key {
          font-weight: 600;
          color: var(--main-font-color);
          opacity: 0.9;
        }
        .kv-value {
          color: var(--main-font-second-color);
          line-height: 1.45;
        }
      }
      &.philosophy {
        .text {
          font-size: 16px;
          color: var(--main-font-second-color);
        }
      }
      &.game {
        min-height: 300px;
        @media (max-width: 768px) {
          min-height: 240px;
        }
      }
      &.like {
        min-height: 400px;
        @media (max-width: 768px) {
          min-height: 300px;
        }
      }
      &.image {
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        .image-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          z-index: 2;
          color: #2C3E50;
          .image-desc {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-top: auto;
            &.opacity {
              font-size: 14px;
              color: #eee;
              opacity: 0.8;
              a {
                color: #eee;
                &:hover {
                  color: var(--main-color);
                }
              }
            }
          }
        }
        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          box-shadow: inset 0 -70px 204px 10px var(--color);
          z-index: 0;
        }
      }
      &.static {
        .static-data {
          display: grid;
          gap: 12px;
          grid-template-columns: 1fr 1fr;
          margin: 20px 0;
          .static-item {
            display: flex;
            flex-direction: column;
            .static-name {
              font-size: 15px;
              opacity: 0.8;
            }
            .static-num {
              font-size: 34px;
              font-weight: bold;
            }
          }
        }
      }
      &.stats-card {
        &::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.35);
          z-index: 1;
          pointer-events: none;
        }
        .image-content {
          color: #f5f7fa;
        }
        .tip {
          color: rgba(245, 247, 250, 0.9);
        }
        .title2 {
          color: #ffffff;
        }
        .static-name {
          color: rgba(245, 247, 250, 0.85);
        }
        .static-num {
          color: #ffffff;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
        }
        .image-desc {
          color: rgba(245, 247, 250, 0.8);
        }
        .image-desc a {
          color: rgba(245, 247, 250, 0.9);
        }
        .image-desc a:hover {
          color: #ffffff;
        }
      }
      &.map {
        min-height: 170px;
        background-size: 100%;
        transition: background 1.5s ease-in-out;
        cursor: pointer;
        @media (max-width: 768px) {
          background-size: cover;
          pointer-events: none;
        }
        .position {
          display: block;
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          padding: 20px 30px;
          color: #fff;
          background-color: #636352;
          font-size: 20px;
          transition: bottom 1s;
        }
        &:hover {
          background-size: 120%;
          background-position-x: 0;
          background-position-y: 36%;
          .position {
            bottom: -80px;
          }
        }
      }
      &.info {
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        .info-item {
          display: flex;
          flex-direction: column;
          margin-right: 32px;
          .info-name {
            font-size: 14px;
            margin-bottom: 8px;
            color: var(--main-font-second-color);
          }
          .info-num {
            font-size: 34px;
            font-weight: bold;
            color: var(--color);
          }
        }
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
