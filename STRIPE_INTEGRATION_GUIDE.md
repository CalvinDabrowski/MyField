# MyFieldLink Stripe Integration Guide

This document outlines the complete Stripe payment processing integration for the MyFieldLink platform, including subscription management and background check purchases.

## Overview

The MyFieldLink platform now supports:

- **Contractor Subscriptions**: Basic (Free) and Elite ($29/month)
- **Client Subscriptions**: Standard (Free) and Premium ($199/month)
- **Add-on Services**: Background Check ($10 per contractor)
- **Subscription Management**: Cancel, modify, and view billing history
- **Webhook Processing**: Real-time subscription event handling

## Architecture

### Components

1. **Stripe Configuration** (`src/lib/stripe.ts`)
   - Stripe client initialization
   - Price IDs and plan configuration
   - Utility functions for formatting and types

2. **Checkout Integration** (`src/components/stripe/CheckoutButton.tsx`)
   - Reusable checkout button component
   - Handles both subscription and one-time payments
   - Loading states and error handling

3. **Subscription Management** (`src/components/subscription/SubscriptionManager.tsx`)
   - View current subscription status
   - Access to customer portal
   - Subscription cancellation
   - Billing history display

4. **Background Check Purchase** (`src/components/BackgroundCheckPurchase.tsx`)
   - One-time payment for background verification
   - Purchase flow with success/failure handling
   - Integration with hiring dashboard

### API Routes

1. **Checkout Session** (`src/app/api/stripe/checkout/route.ts`)
   - Creates Stripe checkout sessions
   - Supports both subscription and payment modes
   - Configurable success/cancel URLs

2. **Customer Portal** (`src/app/api/stripe/customer-portal/route.ts`)
   - Generates customer portal links
   - Self-service billing management
   - Payment method updates

3. **Subscription Cancellation** (`src/app/api/stripe/cancel-subscription/route.ts`)
   - Cancel subscriptions immediately or at period end
   - Returns updated subscription status

4. **Webhook Handler** (`src/app/api/stripe/webhook/route.ts`)
   - Processes Stripe webhook events
   - Subscription lifecycle management
   - Payment success/failure handling

### Pages

1. **Subscription Management** (`src/app/dashboard/subscription/page.tsx`)
   - Complete subscription dashboard
   - Success/cancel message handling
   - Upgrade options for free users

2. **Hiring Dashboard** (`src/app/dashboard/hiring/page.tsx`)
   - Background check integration
   - Contractor management
   - Purchase flow demonstration

## Setup Instructions

### 1. Environment Configuration

Create or update `.env.local`:

```bash
# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Next.js
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 2. Stripe Dashboard Setup

#### Products and Prices

Create the following products in your Stripe dashboard:

1. **Contractor Elite**
   - Name: "Contractor Elite"
   - Description: "Elite subscription plan for contractors"
   - Type: Service
   - Price: $29.00/month (recurring)

2. **Client Premium**
   - Name: "Client Premium"  
   - Description: "Premium subscription plan for clients"
   - Type: Service
   - Price: $199.00/month (recurring)

3. **Background Check**
   - Name: "Background Check"
   - Description: "Comprehensive background verification service"
   - Type: Service
   - Price: $10.00 (one-time)

#### Update Price IDs

After creating products, update `src/lib/stripe.ts` with the actual price IDs:

```typescript
export const STRIPE_PRICES = {
  CONTRACTOR_ELITE_MONTHLY: 'price_your_contractor_elite_price_id',
  CLIENT_PREMIUM_MONTHLY: 'price_your_client_premium_price_id',
  BACKGROUND_CHECK: 'price_your_background_check_price_id',
} as const;
```

#### Webhook Configuration

1. Create a webhook endpoint in Stripe dashboard
2. URL: `https://your-domain.com/api/stripe/webhook`
3. Events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

### 3. Customer Portal Configuration

1. Go to Settings > Customer Portal in Stripe dashboard
2. Configure allowed features:
   - View and download invoices
   - Update payment methods
   - Cancel subscriptions
   - View subscription details

## Usage

### Subscription Plans Component

The updated `SubscriptionPlans` component automatically integrates with Stripe:

```jsx
import SubscriptionPlans from '@/components/SubscriptionPlans';

function PricingPage() {
  return <SubscriptionPlans />;
}
```

### Background Check Purchase

```jsx
import BackgroundCheckPurchase from '@/components/BackgroundCheckPurchase';

function HiringPage() {
  return (
    <BackgroundCheckPurchase
      contractorId="contractor_123"
      contractorName="John Smith"
      onPurchaseComplete={(checkId) => {
        console.log('Background check purchased:', checkId);
      }}
    />
  );
}
```

### Subscription Management

```jsx
import SubscriptionManager from '@/components/subscription/SubscriptionManager';

function SubscriptionPage() {
  const [subscription, setSubscription] = useState(null);
  
  return (
    <SubscriptionManager
      subscription={subscription}
      onCancelSubscription={() => {
        // Handle cancellation
      }}
    />
  );
}
```

## Payment Flow

### Subscription Purchase

1. User clicks "Start Elite Trial" or "Start Premium Trial"
2. `CheckoutButton` creates checkout session via API
3. User redirected to Stripe Checkout
4. After payment, user redirected to success URL
5. Webhook processes `checkout.session.completed` event
6. User's subscription status updated in database

### Background Check Purchase

1. Client clicks "Order Background Check" for contractor
2. `BackgroundCheckPurchase` component displays purchase form
3. User clicks "Purchase Background Check"
4. Redirected to Stripe Checkout for one-time payment
5. After payment, redirected back to hiring dashboard
6. Background check marked as ordered

### Subscription Management

1. User accesses subscription page
2. Can view current plan and billing info
3. "Manage Billing" opens Stripe Customer Portal
4. Can update payment methods, download invoices
5. Can cancel subscription (with confirmation)

## Database Integration

The current implementation includes TODO comments for database integration. You'll need to implement:

1. **User subscription status tracking**
2. **Background check order records**
3. **Payment history logging**
4. **Webhook event processing**

Example database schema additions:

```sql
-- User subscriptions
ALTER TABLE users ADD COLUMN stripe_customer_id VARCHAR(255);
ALTER TABLE users ADD COLUMN subscription_status VARCHAR(50);
ALTER TABLE users ADD COLUMN subscription_plan VARCHAR(50);
ALTER TABLE users ADD COLUMN subscription_current_period_end TIMESTAMP;

-- Background checks
CREATE TABLE background_checks (
  id UUID PRIMARY KEY,
  contractor_id UUID REFERENCES users(id),
  client_id UUID REFERENCES users(id),
  stripe_payment_intent_id VARCHAR(255),
  status VARCHAR(50),
  ordered_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);
```

## Testing

### Test Cards

Use Stripe's test cards for development:

- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Requires 3D Secure: `4000 0025 0000 3155`

### Webhook Testing

Use Stripe CLI for local webhook testing:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Security Considerations

1. **Environment Variables**: Never commit real API keys
2. **Webhook Signatures**: Always verify webhook signatures
3. **HTTPS**: Use HTTPS in production
4. **Error Handling**: Don't expose sensitive error details
5. **Rate Limiting**: Implement rate limiting on API endpoints

## Deployment

1. Update environment variables in production
2. Configure webhook URL in Stripe dashboard
3. Test payment flows in production environment
4. Monitor webhook delivery and error rates

## Support

For issues or questions:

1. Check Stripe documentation: https://stripe.com/docs
2. Review webhook logs in Stripe dashboard
3. Check Next.js build logs for errors
4. Test with Stripe CLI for local development

## Limitations

Current implementation limitations:

1. No database persistence (TODOs marked in code)
2. Mock subscription data in subscription manager
3. No user authentication integration
4. No email notifications
5. No admin dashboard for managing subscriptions

## Next Steps

To complete the integration:

1. Implement database models and persistence
2. Add user authentication checks
3. Set up email notifications for subscription events
4. Create admin dashboard for subscription management
5. Add comprehensive error handling and logging
6. Implement retry logic for failed webhook processing
7. Add analytics and reporting features