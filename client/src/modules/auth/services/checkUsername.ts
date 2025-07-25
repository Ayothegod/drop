/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { debounce } from "lodash";
import api, { isAxiosErrorWithResponse } from "@/shared/lib/axios";

const checkUsernameAvailability = async (
  username: string,
  onSuccess?: (data: any) => void,
  onError?: (message: string) => void
) => {
  try {
    const res = await api.post(`/profiles`, {
      username,
      userCategoryPreference: [],
    });
    // console.log(res.data);
    onSuccess?.(`${res.data.message}`);
  } catch (error) {
    if (isAxiosErrorWithResponse(error)) {
      // console.log(error.response?.data);

      if (error.request) {
        onError?.(`No response from server. Check your internet connection.`);
      }
      onError?.(`${error.response?.data.message}`);
    } else if (error instanceof Error) {
      // alert(error.message);
      console.log("Unknown error: try again later.");
    }
  }
};


export const useUsernameChecker = () => {
  const debouncedCheck = useCallback(
    debounce(
      (
        username: string,
        onSuccess?: (data: any) => void,
        onError?: (msg: string) => void
      ) => {
        checkUsernameAvailability(username, onSuccess, onError);
      },
      3000
    ),
    []
  );

  const checkUsername = (
    username: string,
    onSuccess?: (data: any) => void,
    onError?: (msg: string) => void
  ) => {
    debouncedCheck(username, onSuccess, onError);
  };

  return { checkUsername };
};

// debounced.cancel()
// Cancels any pending execution of the debounced function.
// Useful if you want to stop it entirely before the delay finishes.
// const debouncedFn = debounce(() => console.log('Run'), 3000);
// debouncedFn();
// debouncedFn.cancel(); // cancels the pending call

// ✅ debounced.flush()
// Immediately executes the pending function (if one is waiting).
// Skips the remaining delay.
// const debouncedFn = debounce(() => console.log('Run'), 3000);
// debouncedFn();
// debouncedFn.flush(); // executes immediately
