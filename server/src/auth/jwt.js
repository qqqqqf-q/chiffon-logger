import jwt from 'jsonwebtoken';

export function signSession(payload, secret) {
    return jwt.sign(payload, secret, { expiresIn: '7d' });
}

export function signWsToken(payload, secret) {
    // 短命 token，仅用于 WebSocket 握手
    return jwt.sign(payload, secret, { expiresIn: '60s' });
}

export function verify(token, secret) {
    try {
        return jwt.verify(token, secret);
    } catch {
        return null;
    }
}
