// import { EmailLayout } from "../components/email-layout"
// import { EmailHeader } from "../components/email-header"
// import { EmailButton } from "../components/email-button"

// interface NewsletterProps {
//   userName: string
//   featuredProducts: Array<{
//     name: string
//     price: number
//     originalPrice?: number
//     url: string
//     image: string
//   }>
//   unsubscribeUrl: string
// }

// export const Newsletter = ({
//   userName = "John Doe",
//   featuredProducts = [
//     {
//       name: "Smart Watch Pro",
//       price: 199.99,
//       originalPrice: 249.99,
//       url: "https://marketplace.com/product/smart-watch",
//       image: "smart watch",
//     },
//     {
//       name: "Wireless Earbuds",
//       price: 79.99,
//       url: "https://marketplace.com/product/earbuds",
//       image: "wireless earbuds",
//     },
//   ],
//   unsubscribeUrl = "https://marketplace.com/unsubscribe",
// }: NewsletterProps) => {
//   return (
//     <EmailLayout previewText="This week's best deals and new arrivals">
//       <EmailHeader />

//       <div className="px-8 py-8">
//         <h1 className="text-2xl font-bold text-gray-900 mb-4">This Week's Best Deals 🔥</h1>

//         <p className="text-gray-700 text-base leading-6 mb-6">Hi {userName},</p>

//         <p className="text-gray-700 text-base leading-6 mb-8">
//           Don't miss out on these amazing deals and new arrivals from our top sellers. Limited time offers that you
//           won't want to miss!
//         </p>

//         <h2 className="text-lg font-semibold text-gray-900 mb-6">Featured Products</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//           {featuredProducts.map((product, index) => (
//             <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
//               <img
//                 src={`/placeholder.svg?height=200&width=300&query=${product.image}`}
//                 alt={product.name}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <p className="font-semibold text-gray-900 mb-2">{product.name}</p>
//                 <div className="flex items-center mb-3">
//                   <span className="text-lg font-bold text-blue-600">${product.price}</span>
//                   {product.originalPrice && (
//                     <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
//                   )}
//                 </div>
//                 <EmailButton href={product.url} variant="secondary">
//                   View Product
//                 </EmailButton>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="text-center mb-8">
//           <EmailButton href="https://marketplace.com/deals">View All Deals</EmailButton>
//         </div>

//         <hr className="border-gray-200 my-6" />

//         <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 mb-6">
//           <p className="text-purple-900 font-semibold text-lg mb-2">💎 Become a Premium Member</p>
//           <p className="text-purple-800 text-sm mb-4">
//             Get exclusive access to deals, free shipping, and early access to new products.
//           </p>
//           <EmailButton href="https://marketplace.com/premium" variant="secondary">
//             Learn More
//           </EmailButton>
//         </div>

//         <p className="text-gray-500 text-xs text-center">
//           You're receiving this email because you subscribed to MarketPlace newsletters.
//           <br />
//           <a href={unsubscribeUrl} className="text-blue-600 underline">
//             Unsubscribe
//           </a>{" "}
//           |
//           <a href="https://marketplace.com/preferences" className="text-blue-600 underline ml-1">
//             Update Preferences
//           </a>
//         </p>
//       </div>
//     </EmailLayout>
//   )
// }

// export default Newsletter
