require 'stripe'
require 'sinatra'

# This is your test secret API key.
# Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
client = Stripe::StripeClient.new(ENV['STRIPE_SECRET_KEY'], stripe_version: '2026-06-24.dahlia')

set :static, true
set :port, 4242

YOUR_DOMAIN = 'http://localhost:4242'

post '/create-checkout-session' do
  content_type 'application/json'

  session = client.v1.checkout.sessions.create({

    ui_mode: 'elements',
    line_items: [{
      # Provide the exact Price ID (for example, price_1234) of the product you want to sell
      price: '{{PRICE_ID}}',
      quantity: 1,
    }],
    mode: 'payment',
    return_url: YOUR_DOMAIN + '/complete.html?session_id={CHECKOUT_SESSION_ID}',
  })

  { clientSecret: session.client_secret }.to_json
end

get '/session-status' do
  session = client.v1.checkout.sessions.retrieve(params[:session_id], {expand: ["payment_intent", "subscription"]})

  { status: session.status, payment_status: session.payment_status, payment_intent_id: session.payment_intent&.id, payment_intent_status: session.payment_intent&.status, subscription_id: session.payment_intent ? nil : session.subscription&.id, subscription_status: session.payment_intent ? nil : session.subscription&.status }.to_json
end