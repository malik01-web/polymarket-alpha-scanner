async function upgradeUser(userId, roles) {
  const res = await fetch(
    `https://oly-scanner.netlify.app/.netlify/identity/admin/users/${userId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NETLIFY_IDENTITY_TOKEN}`
      },
      body: JSON.stringify({
        app_metadata: { roles }
      })
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Identity API: ${res.status} ${text}`);
  }
  return res.json();
}
