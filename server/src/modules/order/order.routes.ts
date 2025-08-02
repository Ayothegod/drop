
// ## Order method

// ```
// Each seller is responsible for their own fulfillment
// Buyer sees overall progress (e.g., “2 of 3 items delivered”)

// Order {
//   id: 123,
//   buyer_id: 1,
//   total_amount: 10000,
//   status: "complete",
// }


// SellerOrder {
//   id: 123A,
//   order_id: 123,
//   seller_id: 45,
//   product_ids: [101, 102],
//   amount: 4000,
//   delivery_status: "auto-delivered" // or "pending"
// }
// ```


// ````
// # **Handle payment split & platform fees**
// ```explanation
// Then split payouts between sellers (manually or using Split Payments via Stripe/Paystack)

// Take your commission before payout (e.g., 10%)
// ````