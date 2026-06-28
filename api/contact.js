const escape = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (name.length > 100 || email.length > 200 || message.length > 5000) {
    return res.status(400).json({ error: 'Input too long' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Air Tricks Prod <contact@airtricksprod.fr>',
        to: 'contact@airtricksprod.fr',
        reply_to: email,
        subject: `[Air Tricks Prod] Message de ${escape(name)}`,
        html: `
          <p><strong>Nom :</strong> ${escape(name)}</p>
          <p><strong>Email :</strong> ${escape(email)}</p>
          <p><strong>Message :</strong></p>
          <p>${escape(message).replace(/\n/g, '<br>')}</p>
        `,
      }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      console.error('Resend error:', response.status, body);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};
