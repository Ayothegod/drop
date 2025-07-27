// import { EmailLayout } from "../components/email-layout"
// import { EmailHeader } from "../components/email-header"
// import { EmailButton } from "../components/email-button"

// interface CartItem {
//   name: string
//   price: number
//   image?: string
// }

// interface AbandonedCartProps {
//   userName: string
//   cartItems: CartItem[]
//   cartUrl: string
//   discountCode?: string
//   discountPercent?: number
// }

// export const AbandonedCart = ({
//   userName = "John Doe",
//   cartItems = [
//     { name: "Wireless Headphones", price: 99.99 },
//     { name: "Phone Case", price: 24.99 },
//   ],
//   cartUrl = "https://marketplace.com/cart",
//   discountCode = "SAVE10",
//   discountPercent = 10,
// }: AbandonedCartProps) => {
//   const total = cartItems.reduce((sum, item) => sum + item.price, 0)

//   return (
//     <EmailLayout previewText="You left something in your cart">
//       <EmailHeader />

//       <div className="px-8 py-8">
//         <h1 className="text-2xl font-bold text-gray-900 mb-4">Don't Miss Out! 🛒</h1>

//         <p className="text-gray-700 text-base leading-6 mb-6">Hi {userName},</p>

//         <p className="text-gray-700 text-base leading-6 mb-6">
//           You left some great items in your cart. Complete your purchase now before they're gone!
//         </p>

//         <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
//           {cartItems.map((item, index) => (
//             <div
//               key={index}
//               className={`p-4 flex items-center justify-between ${index > 0 ? "border-t border-gray-200" : ""}`}
//             >
//               <div className="flex items-center">
//                 <img
//                   src={`/placeholder.svg?height=60&width=60&query=${item.name}`}
//                   alt={item.name}
//                   className="w-15 h-15 rounded-lg mr-4"
//                 />
//                 <p className="font-medium text-gray-900">{item.name}</p>
//               </div>
//               <p className="font-semibold text-gray-900">${item.price.toFixed(2)}</p>
//             </div>
//           ))}

//           <div className="bg-gray-50 p-4 border-t border-gray-200">
//             <div className="flex justify-between font-semibold">
//               <span className="text-gray-900">Total:</span>
//               <span className="text-gray-900">${total.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         {discountCode && (
//           <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
//             <p className="text-green-800 font-semibold mb-2">🎉 Special Offer Just for You!</p>
//             <p className="text-green-700 text-sm mb-3">
//               Use code <span className="font-mono font-bold">{discountCode}</span> and save {discountPercent}% on your
//               order!
//             </p>
//             <p className="text-green-600 text-xs">*Offer expires in 24 hours</p>
//           </div>
//         )}

//         <div className="text-center mb-8">
//           <EmailButton href={cartUrl}>Complete Your Purchase</EmailButton>
//         </div>

//         <p className="text-gray-500 text-sm leading-5 text-center">
//           Items in your cart are reserved for a limited time. Complete your purchase soon to avoid disappointment.
//         </p>
//       </div>
//     </EmailLayout>
//   )
// }

// export default AbandonedCart
