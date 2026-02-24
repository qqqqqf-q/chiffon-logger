FROM node:22-bookworm-slim

# node-pty 编译依赖 + Docker CLI（用于通过 DOCKER_HOST 连接 dockerproxy）
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    ca-certificates \
    curl \
    && install -m 0755 -d /etc/apt/keyrings \
    && curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc \
    && chmod a+r /etc/apt/keyrings/docker.asc \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian bookworm stable" \
       > /etc/apt/sources.list.d/docker.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends docker-ce-cli \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm node-gyp

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile 2>/dev/null || pnpm install

RUN find /app/node_modules/.pnpm -name "binding.gyp" -path "*/node-pty*" \
    | head -1 | xargs -I{} dirname {} \
    | xargs -I{} sh -c 'cd {} && node-gyp rebuild'

COPY src ./src

EXPOSE 3001

CMD ["node", "src/server.js"]
