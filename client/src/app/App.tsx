import AuthErrorPage from "@/modules/auth/pages/error";
import LoginPage from "@/modules/auth/pages/login";
import OnboardingPage from "@/modules/auth/pages/onboading";
import SignupPage from "@/modules/auth/pages/signup";
import Root from "@/modules/root/pages/root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout, { GenericError } from "./layout";

const router = createBrowserRouter([
  {
    path: "/auth/error",
    element: <AuthErrorPage />,
  },
  {
    element: <Layout />,
    errorElement: <GenericError />,
    children: [
      {
        path: "/",
        element: <Root />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/onboarding",
        element: <OnboardingPage />,
      },
    ],
  },
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
