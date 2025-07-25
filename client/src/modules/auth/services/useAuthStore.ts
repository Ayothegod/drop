import { authClient } from "@/shared/lib/auth-client";
import clientEnv from "@/shared/lib/clientEnv";

export const githubSignup = async () => {
  await authClient.signIn.social({
    provider: "github",
    callbackURL: `${clientEnv.VITE_CLIENT_URL}/dashboard`,
    errorCallbackURL: `${clientEnv.VITE_CLIENT_URL}/auth/error`,
    newUserCallbackURL: `${clientEnv.VITE_CLIENT_URL}/onboarding`,
    disableRedirect: false,
  });
};

export const googleSignup = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: `${clientEnv.VITE_CLIENT_URL}/dashboard`,
    errorCallbackURL: `${clientEnv.VITE_CLIENT_URL}/auth/error?action=signup`,
    newUserCallbackURL: `${clientEnv.VITE_CLIENT_URL}/onboarding`,
    disableRedirect: false,
  });
};

