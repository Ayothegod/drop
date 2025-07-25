import clientEnv from "@/shared/lib/clientEnv";
import { useQueryState } from "nuqs";
import { Link } from "react-router-dom";

export default function AuthErrorPage() {
  // create an auth error page with its contents
  // Also, get the action type from url to be able to redirect to a particular page

  const [page] = useQueryState("action");
  console.log(page);

  return (
    <div>
      <div>This auth action was unable to complete</div>

      <p>Please try again later</p>

      <Link
        to={`${
          page == "signin"
            ? clientEnv.VITE_CLIENT_URL + "/signin"
            : clientEnv.VITE_CLIENT_URL + "/signup"
        }`}
      >
        We will redirect you to the{" "}
        <span className="underline underline-offset-2">
          {page == "signin" ? "Signin" : "Signup"} page
        </span>
      </Link>
    </div>
  );
}
