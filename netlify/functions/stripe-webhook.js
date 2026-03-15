const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body, sig, process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    const userId = session.metadata?.netlifyUserId;
    if (userId) {
      await fetch(`${process.env.URL}/.netlify/identity/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NETLIFY_IDENTITY_TOKEN}`
        },
        body: JSON.stringify({ app_metadata: { roles: ['pro'] } })
      });
    }
  }

  if (stripeEvent.type === 'customer.subscription.deleted') {
    const sub = stripeEvent.data.object;
    const userId = sub.metadata?.netlifyUserId;
    if (userId) {
      await fetch(`${process.env.URL}/.netlify/identity/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NETLIFY_IDENTITY_TOKEN}`
        },
        body: JSON.stringify({ app_metadata: { roles: [] } })
      });
    }
  }

  return { statusCode: 200, body: 'ok' };
};
