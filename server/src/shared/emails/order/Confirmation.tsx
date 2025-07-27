// import { EmailLayout } from "../components/email-layout"
// import { EmailHeader } from "../components/email-header"
// import { EmailButton } from "../components/email-button"

// interface OrderItem {
//   name: string
//   quantity: number
//   price: number
//   image?: string
// }

// interface OrderConfirmationProps {
//   userName: string
//   orderNumber: string
//   orderDate: string
//   items: OrderItem[]
//   subtotal: number
//   shipping: number
//   tax: number
//   total: number
//   trackingUrl: string
//   shippingAddress: {
//     name: string
//     street: string
//     city: string
//     state: string
//     zip: string
//   }
// }

// export const OrderConfirmation = ({
//   userName = "John Doe",
//   orderNumber = "MP-2024-001234",
//   orderDate = "January 15, 2024",
//   items = [
//     { name: "Wireless Headphones", quantity: 1, price: 99.99 },
//     { name: "Phone Case", quantity: 2, price: 24.99 },
//   ],
//   subtotal = 149.97,
//   shipping = 9.99,
//   tax = 12.8,
//   total = 172.76,
//   trackingUrl = "https://marketplace.com/track",
//   shippingAddress = {
//     name: "John Doe",
//     street: "123 Main St",
//     city: "Anytown",
//     state: "CA",
//     zip: "12345",
//   },
// }: OrderConfirmationProps) => {
//   return (
//     <EmailLayout previewText={`Order confirmation for ${orderNumber}`}>
//       <EmailHeader />

//       <div className="px-8 py-8">
//         <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Confirmed! 📦</h1>

//         <p className="text-gray-700 text-base leading-6 mb-6">Hi {userName},</p>

//         <p className="text-gray-700 text-base leading-6 mb-6">
//           Thank you for your order! We've received your payment and are preparing your items for shipment.
//         </p>

//         <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="text-green-800 font-semibold">Order #{orderNumber}</p>
//               <p className="text-green-700 text-sm">Placed on {orderDate}</p>
//             </div>
//             <div className="text-right">
//               <p className="text-green-800 font-bold text-lg">${total.toFixed(2)}</p>
//             </div>
//           </div>
//         </div>

//         <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>

//         <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
//           {items.map((item, index) => (
//             <div key={index} className={`p-4 ${index > 0 ? "border-t border-gray-200" : ""}`}>
//               <div className="flex justify-between items-start">
//                 <div className="flex-1">
//                   <p className="font-medium text-gray-900">{item.name}</p>
//                   <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
//                 </div>
//                 <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
//               </div>
//             </div>
//           ))}

//           <div className="bg-gray-50 p-4 border-t border-gray-200">
//             <div className="space-y-2">
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600">Subtotal:</span>
//                 <span className="text-gray-900">${subtotal.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600">Shipping:</span>
//                 <span className="text-gray-900">${shipping.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600">Tax:</span>
//                 <span className="text-gray-900">${tax.toFixed(2)}</span>
//               </div>
//               <hr className="border-gray-300 my-2" />
//               <div className="flex justify-between font-semibold">
//                 <span className="text-gray-900">Total:</span>
//                 <span className="text-gray-900">${total.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
//         <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
//           <p className="text-gray-900 font-medium">{shippingAddress.name}</p>
//           <p className="text-gray-700">{shippingAddress.street}</p>
//           <p className="text-gray-700">
//             {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
//           </p>
//         </div>

//         <div className="text-center mb-8">
//           <EmailButton href={trackingUrl}>Track Your Order</EmailButton>
//         </div>

//         <p className="text-gray-500 text-sm leading-5">
//           You'll receive another email with tracking information once your order ships. If you have any questions,
//           please don't hesitate to contact our support team.
//         </p>
//       </div>
//     </EmailLayout>
//   )
// }

// export default OrderConfirmation
