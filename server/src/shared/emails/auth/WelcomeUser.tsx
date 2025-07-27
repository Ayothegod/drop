// import { EmailLayout } from "../components/email-layout"
// import { EmailHeader } from "../components/email-header"
// import { EmailButton } from "../components/email-button"

// interface WelcomeEmailProps {
//   userName: string
//   dashboardUrl: string
// }

// export const WelcomeEmail = ({
//   userName = "John Doe",
//   dashboardUrl = "https://marketplace.com/dashboard",
// }: WelcomeEmailProps) => {
//   return (
//     <EmailLayout previewText="Welcome to MarketPlace - Your journey starts here!">
//       <EmailHeader />

//       <div className="px-8 py-8">
//         <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to MarketPlace! 🎉</h1>

//         <p className="text-gray-700 text-base leading-6 mb-6">Hi {userName},</p>

//         <p className="text-gray-700 text-base leading-6 mb-6">
//           Welcome to MarketPlace, where buying and selling is made simple and secure. We're excited to have you join our
//           community of thousands of buyers and sellers.
//         </p>

//         <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
//           <p className="text-blue-900 font-semibold text-lg mb-4">What you can do on MarketPlace:</p>
//           <div className="space-y-3">
//             <div className="flex items-start">
//               <span className="text-blue-600 mr-3">🛍️</span>
//               <p className="text-blue-800 text-sm">Browse thousands of products from verified sellers</p>
//             </div>
//             <div className="flex items-start">
//               <span className="text-blue-600 mr-3">💰</span>
//               <p className="text-blue-800 text-sm">Start selling your own products with zero listing fees</p>
//             </div>
//             <div className="flex items-start">
//               <span className="text-blue-600 mr-3">🔒</span>
//               <p className="text-blue-800 text-sm">Enjoy secure payments and buyer protection</p>
//             </div>
//             <div className="flex items-start">
//               <span className="text-blue-600 mr-3">📱</span>
//               <p className="text-blue-800 text-sm">Track orders and manage your account easily</p>
//             </div>
//           </div>
//         </div>

//         <div className="text-center mb-8">
//           <EmailButton href={dashboardUrl}>Explore MarketPlace</EmailButton>
//         </div>

//         <hr className="border-gray-200 my-6" />

//         <p className="text-gray-600 text-sm leading-5 mb-4">
//           Need help getting started? Our support team is here to help:
//         </p>

//         <div className="flex flex-col sm:flex-row gap-4">
//           <EmailButton href="https://marketplace.com/help" variant="secondary">
//             Help Center
//           </EmailButton>
//           <EmailButton href="mailto:support@marketplace.com" variant="secondary">
//             Contact Support
//           </EmailButton>
//         </div>
//       </div>
//     </EmailLayout>
//   )
// }

// export default WelcomeEmail
