/**
 * Bangumi API 代理（Cloudflare Pages Function）
 * 解决 api.bgm.tv 在部分网络环境下无法直连/跨域的问题。
 *
 * 前端构建时设置 VITE_BGM_ACC_API_URL=/bgm：
 * 客户端会先直连 api.bgm.tv，失败后自动切换走本代理（已有 accel 机制）。
 */

const DEFAULT_UPSTREAM = 'https://api.bgm.tv';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequest(context) {
  const { request, params, env } = context;
  const url = new URL(request.url);

  // 预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  const upstream = (env.BGM_UPSTREAM || DEFAULT_UPSTREAM).replace(/\/+$/, '');
  const path = (params.path || []).join('/');
  const upstreamUrl = `${upstream}/${path}${url.search}`;
  console.log(`[bgm-proxy] ${request.method} ${upstreamUrl}`);

  const headers = {
    'User-Agent': 'Mozilla/5.0 (AnimeCharacterGuessr; +https://github.com/kennylimz/anime-character-guessr)',
  };
  const contentType = request.headers.get('Content-Type');
  if (contentType) headers['Content-Type'] = contentType;

  const init = { method: request.method, headers };
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = await request.arrayBuffer();
  }

  const resp = await fetch(upstreamUrl, init);
  const outHeaders = new Headers(resp.headers);
  for (const [k, v] of Object.entries(CORS_HEADERS)) {
    outHeaders.set(k, v);
  }
  return new Response(resp.body, { status: resp.status, headers: outHeaders });
}
