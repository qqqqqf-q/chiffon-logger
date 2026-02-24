export function nowIso() {
    return new Date().toISOString();
}

export function durationMs(startedAt, endedAt) {
    return Math.max(0, new Date(endedAt).getTime() - new Date(startedAt).getTime());
}

export function limitBytes(data, maxBytes) {
    const buf = Buffer.isBuffer(data) ? data : Buffer.from(data ?? '', 'utf-8');
    const totalBytes = buf.byteLength;
    const truncated = totalBytes > maxBytes;
    const sliced = truncated ? buf.subarray(0, maxBytes) : buf;
    return {
        text: sliced.toString('utf-8'),
        bytes: totalBytes,
        truncated,
    };
}
