FROM node:22-bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm node-gyp

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile 2>/dev/null || pnpm install

# prebuild-install 在部分容器里无法检测 glibc 版本，导致路径为 linux-x64//pty.node
# 直接用 node-gyp 从源码编译，完全绕过 prebuild-install
RUN find /app/node_modules/.pnpm -name "binding.gyp" -path "*/node-pty*" \
    | head -1 | xargs -I{} dirname {} \
    | xargs -I{} sh -c 'cd {} && node-gyp rebuild'

COPY src ./src

EXPOSE 3001

CMD ["node", "src/server.js"]
