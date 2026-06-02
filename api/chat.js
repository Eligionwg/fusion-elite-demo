export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const body = { ...req.body };
    const bulletRule = 'Always reply using short bullet points. Put each bullet on its own line starting with the bullet character. Maximum 5 bullets. No paragraphs.';
    body.system = body.system ? body.system + ' ' + bulletRule : bulletRule;
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if (data.content?.[0]?.type === 'text') {
      let text = data.content[0].text;
      text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
      text = text.replace(/\n/g, '<br>');
      data.content[0].text = text;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
}
