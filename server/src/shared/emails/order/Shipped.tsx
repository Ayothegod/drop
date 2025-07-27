// import { EmailLayout } from "../components/email-layout"
// import { EmailHeader } from "../components/email-header"
// import { EmailButton } from "../components/email-button"

// interface OrderShippedProps {
//   userName: string
//   orderNumber: string
//   trackingNumber: string
//   carrier: string
//   estimatedDelivery: string
//   trackingUrl: string
// }

// export const OrderShipped = ({
//   userName = "John Doe",
//   orderNumber = "MP-2024-001234",
//   trackingNumber = "1Z999AA1234567890",
//   carrier = "UPS",
//   estimatedDelivery = "January 18, 2024",
//   trackingUrl = "https://marketplace.com/track",
// }: OrderShippedProps) => {
//   return (
//     <EmailLayout previewText={`Your order ${orderNumber} has shipped!`}>
//       <EmailHeader />

//       <div className="px-8 py-8">
//         <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Order Has Shipped! 🚚</h1>

//         <p className="text-gray-700 text-base leading-6 mb-6">Hi {userName},</p>

//         <p className="text-gray-700 text-base leading-6 mb-6">
//           Great news! Your order has been shipped and is on its way to you.
//         </p>

//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <p className="text-blue-900 font-semibold text-sm mb-1">Order Number</p>
//               <p className="text-blue-800">{orderNumber}</p>
//             </div>
//             <div>
//               <p className="text-blue-900 font-semibold text-sm mb-1">Tracking Number</p>
//               <p className="text-blue-800 font-mono">{trackingNumber}</p>
//             </div>
//             <div>
//               <p className="text-blue-900 font-semibold text-sm mb-1">Carrier</p>
//               <p className="text-blue-800">{carrier}</p>
//             </div>
//             <div>
//               <p className="text-blue-900 font-semibold text-sm mb-1">Estimated Delivery</p>
//               <p className="text-blue-800">{estimatedDelivery}</p>
//             </div>
//           </div>
//         </div>

//         <div className="text-center mb-8">
//           <EmailButton href={trackingUrl}>Track Your Package</EmailButton>
//         </div>

//         <hr className="border-gray-200 my-6" />

//         <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
//           <p className="text-gray-800 font-semibold text-sm mb-2">Delivery Instructions</p>
//           <p className="text-gray-700 text-sm leading-5">
//             Please ensure someone is available to receive your package. If you're not home, the carrier may leave a
//             delivery notice with instructions for pickup or redelivery.
//           </p>
//         </div>
//       </div>
//     </EmailLayout>
//   )
// }

// export default OrderShipped
