import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Navbar } from "@/shared/components/build/Navbar";
import { Button } from "@/shared/components/ui/button";
import { Brain } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  if (!isOnline)
    return (
      <div className="container flex h-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Brain className="h-10 w-10 animate-pulse text-primary" />
          <h2 className="text-xl font-medium">Loading...</h2>
          <p>You are offline. Please check your internet connection.</p>
        </div>
      </div>
    );

  return (
    <main className="font-inter">
      <Navbar />
      <Outlet />
    </main>
  );
}


export function GenericError() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFoundPage />;
    }

    return (
      <>
        <div className="grid h-screen place-content-center bg-white dark:bg-black px-4">
          <div className="text-center">
            <h1 className="text-9xl font-black text-gray-200">
              {error.status} - {error.statusText}
            </h1>
            <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {error.data?.message || "An error occurred."}
            </p>

            <Link to="/">
              <Button size={"lg"} className="mt-6">
                Go Back Home
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="grid h-screen place-content-center bg-white dark:bg-black px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">Unexpected Error</h1>
        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {(error as Error).message}
        </p>
      </div>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-100 dark:from-black dark:to-gray-900 text-center p-4">
      <h1 className="text-[10rem] font-black text-gray-300 animate-bounce">
        404
      </h1>
      <p className="text-3xl md:text-4xl font-bold text-gray-700 dark:text-white mb-4 animate-fadeIn">
        Uh-oh! You just wandered off the map.
      </p>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6 animate-fadeIn delay-75">
        We couldn't find the page you're looking for. Maybe try heading back
        home and double-checking your compass.
      </p>
      <Link to="/">
        <Button size="lg" className="animate-fadeIn delay-100">
          🚀 Take Me Home
        </Button>
      </Link>
    </div>
  );
}
