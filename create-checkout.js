// netlify/functions/create-checkout.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email, userId } = JSON.parse(event.body);

    if (!email || !userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing email or userId' })
      };
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,

      line_items: [{
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      }],

      // What to show on the checkout page
      custom_text: {
        submit: {
          message: 'Unlock all AI signals, whale tracking, and edge scoring.'
        }
      },

      success_url: `${process.env.URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${process.env.URL}/pricing.html`,

      // Pass Netlify user ID so webhook can upgrade them
      metadata: {
        netlifyUserId: userId,
        userEmail: email
      },

      subscription_data: {
        metadata: {
          netlifyUserId: userId
        }
      }
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url })
    };

  } catch (err) {
    console.error('Stripe error:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
