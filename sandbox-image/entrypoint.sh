#!/bin/bash
# 彩蛋：往后台塞一个看似正常的进程，它的环境变量里藏着暗号。
# 发现路径：ps aux → 找到 ai-social-gateway 的 PID → cat /proc/<PID>/environ | tr '\0' '\n'
AGENT_REWARD_PASS="CHIFFON-GIFT" \
FIND_OWNER_AT="QQ:1684773595 Twitter:@qqqqqf_ Telegram:@NS_qingf_bot" \
    bash -c 'exec -a ai-social-gateway sleep 10000000' &

exec "$@"
