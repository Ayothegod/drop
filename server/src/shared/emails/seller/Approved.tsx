// import { EmailLayout } from "../components/email-layout"
// import { EmailHeader } from "../components/email-header"
// import { EmailButton } from "../components/email-button"

// interface SellerApprovedProps {
//   userName: string
//   businessName: string
//   sellerDashboardUrl: string
//   guideUrl: string
// }

// export const SellerApproved = ({
//   userName = "John Doe",
//   businessName = "John's Electronics",
//   sellerDashboardUrl = "https://marketplace.com/seller/dashboard",
//   guideUrl = "https://marketplace.com/seller/guide",
// }: SellerApprovedProps) => {
//   return (
//     <EmailLayout previewText="Your seller application has been approved!">
//       <EmailHeader />

//       <div className="px-8 py-8">
//         <h1 className="text-2xl font-bold text-gray-900 mb-4">Congratulations! You're Now a Seller! 🎉</h1>

//         <p className="text-gray-700 text-base leading-6 mb-6">Hi {userName},</p>

//         <p className="text-gray-700 text-base leading-6 mb-6">
//           Great news! Your seller application for <strong>{businessName}</strong> has been approved. You can now start
//           listing and selling your products on MarketPlace.
//         </p>

//         <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
//           <p className="text-green-900 font-semibold text-lg mb-4">What's Next?</p>
//           <div className="space-y-3">
//             <div className="flex items-start">
//               <span className="text-green-600 mr-3">1️⃣</span>
//               <p className="text-green-800 text-sm">Set up your seller profile and store information</p>
//             </div>
//             <div className="flex items-start">
//               <span className="text-green-600 mr-3">2️⃣</span>
//               <p className="text-green-800 text-sm">Add your first products with high-quality photos</p>
//             </div>
//             <div className="flex items-start">
//               <span className="text-green-600 mr-3">3️⃣</span>
//               <p className="text-green-800 text-sm">Configure your payment and shipping settings</p>
//             </div>
//             <div className="flex items-start">
//               <span className="text-green-600 mr-3">4️⃣</span>
//               <p className="text-green-800 text-sm">Start receiving orders and growing your business</p>
//             </div>
//           </div>
//         </div>

//         <div className="text-center mb-8 space-y-4">
//           <EmailButton href={sellerDashboardUrl}>Go to Seller Dashboard</EmailButton>
//           <div>
//             <EmailButton href={guideUrl} variant="secondary">
//               Read Seller Guide
//             </EmailButton>
//           </div>
//         </div>

//         <hr className="border-gray-200 my-6" />

//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//           <p className="text-blue-800 font-semibold text-sm mb-2">💡 Pro Tips for Success</p>
//           <p className="text-blue-700 text-sm leading-5">
//             • Use high-quality product photos
//             <br />• Write detailed product descriptions
//             <br />• Respond to customer messages quickly
//             <br />• Maintain competitive pricing
//             <br />• Ship orders promptly
//           </p>
//         </div>
//       </div>
//     </EmailLayout>
//   )
// }

// export default SellerApproved
