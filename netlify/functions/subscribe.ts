export const handler = async (event: any) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ ok: false, message: 'Method Not Allowed' }),
    }
  }

  try {
    const { email } = JSON.parse(event.body || '{}')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email || !emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ ok: false, message: '유효하지 않은 이메일입니다.' }),
      }
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN
    const REPO_OWNER = process.env.REPO_OWNER || 'LeeSungKi'
    const REPO_NAME = process.env.REPO_NAME || 'social_it'

    if (!GITHUB_TOKEN) {
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ ok: false, message: 'Server not configured' }),
      }
    }

    /** 🔍 1. 중복 확인 */
    const checkResp = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues?labels=subscription&per_page=50`,
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
          },
        },
    )

    const issues = await checkResp.json().catch(() => [])

    const duplicated = Array.isArray(issues)
        && issues.some((issue: any) =>
            typeof issue.title === 'string' && issue.title.includes(email),
        )

    if (duplicated) {
      return {
        statusCode: 409,
        headers: corsHeaders,
        body: JSON.stringify({
          ok: false,
          code: 'DUPLICATED',
          message: '이미 구독된 이메일입니다.',
        }),
      }
    }

    /** ✨ 2. 신규 Issue 생성 */
    const resp = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues`,
        {
          method: 'POST',
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: `New Subscription: ${email}`,
            body: `📧 이메일 구독 요청\n\n이메일: ${email}\n날짜: ${new Date().toISOString()}`,
            labels: ['subscription'],
          }),
        },
    )

    const data = await resp.json()

    if (!resp.ok) {
      return {
        statusCode: resp.status,
        headers: corsHeaders,
        body: JSON.stringify({ ok: false, message: data?.message || 'Failed' }),
      }
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        ok: true,
        message: '구독이 완료되었습니다.',
        issueUrl: data.html_url,
      }),
    }
  } catch {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ ok: false, message: 'Server error' }),
    }
  }
}
