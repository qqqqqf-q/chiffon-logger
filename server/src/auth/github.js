const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_USER_URL = 'https://api.github.com/user';

export function buildOAuthUrl(clientId, state) {
    const params = new URLSearchParams({
        client_id: clientId,
        scope: 'read:user',
        state,
    });
    return `${GITHUB_OAUTH_URL}?${params}`;
}

export async function exchangeCode(clientId, clientSecret, code) {
    const res = await fetch(GITHUB_TOKEN_URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });

    const data = await res.json();
    if (data.error) {
        throw new Error(data.error_description || data.error);
    }
    return data.access_token;
}

export async function getGitHubUser(accessToken) {
    const res = await fetch(GITHUB_USER_URL, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'User-Agent': 'chiffon-sandbox/1.0',
        },
    });
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    return res.json();
}
