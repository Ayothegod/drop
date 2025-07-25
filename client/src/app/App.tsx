import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "@/modules/root/pages/root";
import MainLayout from "@/shared/layouts/MainLayout";
import Layout, { GenericError } from "./layout";
import LoginPage from "@/modules/auth/pages/login";
import SignupPage from "@/modules/auth/pages/signup";
import OnboardingPage from "@/modules/auth/pages/onboading";
import { DashboardPage } from "@/modules/dashboard/pages";
import { lazy, Suspense } from "react";
import { ArenasLoadingPage } from "@/modules/dashboard/pages/arenas";
import ProfilePage from "@/modules/profile/pages/profile";
import ArenaPage from "@/modules/arena/pages";
import JoinArenaPage from "@/modules/arena/pages/join";
import CreateArenaPage from "@/modules/arena/pages/create";
import GamePage from "@/modules/game/pages";
import CreateGamePage from "@/modules/game/pages/create";
import GameResultsPage from "@/modules/game/pages/results";
import AuthErrorPage from "@/modules/auth/pages/error";

const Arenas = lazy(() => import("../modules/dashboard/pages/arenas"));

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
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/dashboard/arenas",
        element: (
          <Suspense fallback={<ArenasLoadingPage />}>
            <Arenas />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: `/arena/:id`,
        element: <ArenaPage />,
      },
      {
        path: `/arena/join`,
        element: <JoinArenaPage />,
      },
      {
        path: `/arena/create`,
        element: <CreateArenaPage />,
      },
      {
        path: `/arena/:id/game`,
        element: <GamePage />,
      },
      {
        path: `/game/results`,
        element: <GameResultsPage />,
      },
      {
        path: `/game/create`,
        element: <CreateGamePage />,
      },
      {
        element: <MainLayout />,
        children: [],
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
