// import { EmailLayout } from "../components/email-layout"
// import { EmailHeader } from "../components/email-header"
// import { EmailButton } from "../components/email-button"

// interface PasswordResetProps {
//   userName: string
//   resetUrl: string
//   ipAddress?: string
//   userAgent?: string
// }

// export const PasswordReset = ({
//   userName = "John Doe",
//   resetUrl = "https://marketplace.com/reset-password",
//   ipAddress = "192.168.1.1",
//   userAgent = "Chrome on Windows",
// }: PasswordResetProps) => {
//   return (
//     <EmailLayout previewText="Reset your MarketPlace password">
//       <EmailHeader />

//       <div className="px-8 py-8">
//         <h1 className="text-2xl font-bold text-gray-900 mb-4">Reset Your Password</h1>

//         <p className="text-gray-700 text-base leading-6 mb-6">Hi {userName},</p>

//         <p className="text-gray-700 text-base leading-6 mb-6">
//           We received a request to reset your password for your MarketPlace account. Click the button below to create a
//           new password.
//         </p>

//         <div className="text-center mb-8">
//           <EmailButton href={resetUrl}>Reset Password</EmailButton>
//         </div>

//         <hr className="border-gray-200 my-6" />

//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
//           <p className="text-yellow-800 text-sm font-semibold mb-2">Security Information</p>
//           <p className="text-yellow-700 text-sm">
//             Request made from: {ipAddress} ({userAgent})
//           </p>
//         </div>

//         <p className="text-gray-500 text-sm leading-5">
//           This password reset link will expire in 1 hour. If you didn't request a password reset, please ignore this
//           email or contact our support team if you have concerns.
//         </p>
//       </div>
//     </EmailLayout>
//   )
// }

// export default PasswordReset
