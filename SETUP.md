# MeowScope Setup Guide

This guide will walk you through setting up authentication and payments for MeowScope using Supabase and Stripe.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- A Stripe account (test mode works)

---

## 1. Supabase Setup

### 1.1 Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in:
   - **Project name**: meowscope (or your preferred name)
   - **Database password**: Create a secure password (save this!)
   - **Region**: Choose closest to your users
4. Click "Create new project" and wait for it to provision (~2 minutes)

### 1.2 Run Database Migrations

1. In your Supabase project dashboard, click on "SQL Editor" in the left sidebar
2. Click "New Query"
3. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
4. Paste into the SQL editor
5. Click "Run" (or press Cmd/Ctrl + Enter)
6. You should see "Success. No rows returned"

### 1.3 Get Your Supabase Credentials

1. Click on the "Settings" icon (gear) in the left sidebar
2. Click "API" under Project Settings
3. Copy the following values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)
4. Go to "Database" → "Database Settings"
5. Scroll down to "Connection string" and copy the **service_role** key

---

## 2. Stripe Setup

### 2.1 Create a Stripe Account

1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Sign up for a Stripe account
3. After logging in, **toggle "Test mode"** in the top right (you'll see a "TEST DATA" badge)

### 2.2 Create Your Product & Price

1. In Stripe Dashboard, click "Products" in the left menu
2. Click "+ Add product"
3. Fill in:
   - **Name**: MeowScope Enhanced
   - **Description**: Full access to 40 cat vocalization classifications
   - **Pricing**: Recurring
   - **Price**: $4.99 USD
   - **Billing period**: Monthly
4. Click "Save product"
5. **Copy the Price ID** (starts with `price_...`) - you'll need this!

### 2.3 Get Your Stripe API Keys

1. Click "Developers" in the top right menu
2. Click "API keys"
3. Copy:
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (starts with `sk_test_...`) - click "Reveal test key"

### 2.4 Set Up Webhooks

1. In Stripe Dashboard, click "Developers" → "Webhooks"
2. Click "+ Add endpoint"
3. For **Endpoint URL**, enter:
   ```
   https://your-app-url.vercel.app/api/webhooks
   ```
   (Replace with your actual Vercel URL - you'll get this after deployment)
4. Click "Select events"
5. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
6. Click "Add events" then "Add endpoint"
7. **Copy the Signing secret** (starts with `whsec_...`)

---

## 3. Environment Variables

### 3.1 Local Development

1. In your meowscope project folder, create a `.env.local` file:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_ENHANCED_PRICE_ID=your_enhanced_tier_price_id

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

2. Replace all the `your_...` placeholders with the actual values you copied from Supabase and Stripe

### 3.2 Vercel Deployment

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add each variable from above (one by one):
   - **Name**: Variable name (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - **Value**: Your actual value
   - **Environment**: Production, Preview, Development (select all)
4. Click "Save" for each variable
5. Redeploy your app for changes to take effect

---

## 4. Testing the Integration

### 4.1 Test Authentication

1. Run `npm run dev` locally
2. Click "Sign In" in the header
3. Create a new account with your email
4. Check your email for the confirmation link (Supabase sends it automatically)
5. Click the confirmation link
6. You should be signed in!

### 4.2 Test Stripe Checkout (Test Mode)

1. Make sure you're signed in
2. Click "Upgrade" button
3. Click "Upgrade to Enhanced"
4. You'll be redirected to Stripe Checkout
5. Use a test card:
   - **Card number**: `4242 4242 4242 4242`
   - **Expiry**: Any future date (e.g., 12/34)
   - **CVC**: Any 3 digits (e.g., 123)
   - **Name**: Your name
6. Complete the checkout
7. You'll be redirected back to MeowScope
8. Your tier should now show "Enhanced"!

### 4.3 Verify Database Updates

1. Go to Supabase Dashboard → "Table Editor"
2. Click on "profiles" table
3. Find your user - the `tier` should be "enhanced"
4. The `stripe_customer_id` and `stripe_subscription_id` should be populated

### 4.4 Test Subscription Management

1. Click "Manage Plan" button
2. You'll be redirected to Stripe Customer Portal
3. Here you can:
   - Update payment method
   - Cancel subscription
   - View invoices

---

## 5. Going Live (Production)

### 5.1 Switch Stripe to Live Mode

1. In Stripe Dashboard, toggle off "Test mode"
2. Complete Stripe account verification (provide business details)
3. Create the same product in live mode
4. Copy the **live** API keys (start with `pk_live_` and `sk_live_`)
5. Update webhook endpoint with live keys
6. Update your Vercel environment variables with live Stripe keys

### 5.2 Configure Supabase Email

1. In Supabase Dashboard → "Authentication" → "Email Templates"
2. Customize your confirmation and password reset emails
3. (Optional) Set up custom SMTP in "Settings" → "Auth" → "SMTP Settings"

---

## 6. Troubleshooting

### Issue: "Failed to create checkout session"

**Solution**: Check that your Stripe secret key is correctly set in environment variables

### Issue: "No rows returned" or "Profile not found"

**Solution**: Make sure you ran the database migration SQL and the trigger is working. Check Supabase logs.

### Issue: Webhook not working

**Solution**:
1. Verify the webhook URL in Stripe matches your deployed app
2. Check Stripe webhook logs for errors
3. Make sure `STRIPE_WEBHOOK_SECRET` environment variable is set correctly

### Issue: Email confirmation not arriving

**Solution**:
1. Check your spam folder
2. In Supabase Dashboard → "Authentication" → "Rate Limits", increase limits if needed
3. Check Supabase logs for email delivery errors

---

## 7. Security Checklist

- [ ] Never commit `.env.local` to Git (it's in `.gitignore`)
- [ ] Use environment variables for all secrets
- [ ] Keep Stripe in test mode until ready for production
- [ ] Enable Supabase RLS (Row Level Security) - already done in migration
- [ ] Set up Supabase Auth rate limiting in production
- [ ] Use strong passwords for Supabase database
- [ ] Regularly rotate API keys

---

## 8. Helpful Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

---

## Need Help?

- **Supabase Docs**: https://supabase.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **Next.js Docs**: https://nextjs.org/docs

For issues specific to MeowScope, open an issue on GitHub.
