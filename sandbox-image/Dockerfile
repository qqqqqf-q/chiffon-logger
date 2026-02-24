FROM debian:bookworm-slim

# 基础工具
RUN apt-get update && apt-get install -y --no-install-recommends \
    bash \
    curl \
    python3 \
    vim-tiny \
    htop \
    file \
    less \
    procps \
    && rm -rf /var/lib/apt/lists/*

# 创建低权限访客用户
RUN useradd -m -u 9999 -s /bin/bash visitor

# 复制彩蛋文件
COPY motd /etc/motd
COPY hack /usr/local/bin/hack
RUN chmod +x /usr/local/bin/hack

# 访客主目录彩蛋
RUN mkdir -p /home/visitor && \
    printf '%s\n' \
        '# 你找到了' \
        '' \
        '代码在沙里' \
        '沙在容器里' \
        '容器在 gVisor 里' \
        '清凤在屏幕外' \
        '' \
        '  — 清凤' \
    > /home/visitor/.secret && \
    chown visitor:visitor /home/visitor/.secret && \
    chmod 600 /home/visitor/.secret

# 自定义 PS1 和环境
RUN printf '%s\n' \
        'export PS1="\[\033[38;5;39m\]visitor\[\033[0m\]@\[\033[38;5;245m\]sandbox\[\033[0m\]:\[\033[38;5;220m\]\w\[\033[0m\]\$ "' \
        'export TERM=xterm-256color' \
        'export LANG=C.UTF-8' \
        'cat /etc/motd' \
    > /etc/profile.d/sandbox.sh

# 显示 motd（bashrc 里也加一次，防止非 login shell 不读 profile）
RUN echo 'source /etc/profile.d/sandbox.sh' >> /home/visitor/.bashrc

# 容器启动入口（在后台启动彩蛋进程，再 exec 交出控制权）
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

USER visitor
WORKDIR /home/visitor
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
