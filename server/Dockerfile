FROM node:22-bookworm-slim

# 构建依赖（node-pty 需要 native 编译）
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# pnpm
RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile 2>/dev/null || pnpm install

COPY src ./src

EXPOSE 3001

CMD ["node", "src/server.js"]
