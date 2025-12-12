// Netlify Function: Create a GitHub Issue for an email subscription
// Endpoint: /.netlify/functions/subscribe
// Environment variables required:
// - GITHUB_TOKEN: GitHub Personal Access Token with repo:issues scope
// Optional env:
// - REPO_OWNER (default: LeeSungKi)
// - REPO_NAME (default: social_it)

export const handler = async (event: any) => {
  // Basic CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, message: 'Method Not Allowed' }),
    }
  }

  try {
    const { email } = JSON.parse(event.body || '{}')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email || !emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ok: false, message: 'Invalid email' }),
      }
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN
    const REPO_OWNER = process.env.REPO_OWNER || 'LeeSungKi'
    const REPO_NAME = process.env.REPO_NAME || 'social_it'

    if (!GITHUB_TOKEN) {
      return {
        statusCode: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ok: false, message: 'Server not configured: missing GITHUB_TOKEN' }),
      }
    }

    const title = `New Subscription: ${email}`
    const body = `📧 이메일 구독 요청\n\n이메일: ${email}\n날짜: ${new Date().toISOString()}`

    const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues`

    const resp = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, labels: ['subscription'] }),
    })

    const data = await resp.json().catch(() => null)

    if (!resp.ok) {
      const message = (data && (data.message || data.error)) || 'Failed to create issue'
      return {
        statusCode: resp.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ok: false, message }),
      }
    }

    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true, issueUrl: data?.html_url || null }),
    }
  } catch (err: any) {
    return {
      statusCode: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, message: 'Unexpected server error' }),
    }
  }
}
