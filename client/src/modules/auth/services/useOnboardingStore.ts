import api, { isAxiosErrorWithResponse } from "@/shared/lib/axios";
import { create } from "zustand";

type OnboardingState = {
  loading: boolean;
  setLoading: (val: boolean) => void;
  isError: null | boolean;
  setIsError: (val: boolean | null) => void;
  username: string;
  setUsername: (username: string) => void;
  bio: string;
  interests: string[];
  experience: "beginner" | "intermediate" | "expert";
  setBio: (bio: string) => void;
  setExperience: (experience: "beginner" | "intermediate" | "expert") => void;
  setInterests: (interest: string) => void;
  filterInterests: (interest: string) => void;
  updateProfile: (
    username: string,
    interests: string[],
    bio: string,
    experience: string
  ) => Promise<{
    msg?: string;
    data?: { field: string; message: string }[];
    type?: "error" | "success";
    arrays?: true;
  }>;
};

export const useOnbordingStore = create<OnboardingState>((set) => ({
  loading: false,
  isError: null,
  setLoading: (val: boolean) => set({ loading: val }),
  setIsError: (val: boolean | null) => set({ isError: val }),

  username: "",
  setUsername: (username: string) => set({ username }),

  bio: "",
  interests: [],
  experience: "beginner",
  setBio: (bio) => {
    set({ bio });
  },
  setExperience: (experience) => {
    set({ experience });
  },
  setInterests: (interest) => {
    set((state) => ({ interests: [...state.interests, interest] }));
  },
  filterInterests: (interest) => {
    set((state) => ({
      interests: [...state.interests.filter((i) => i !== interest)],
    }));
  },
  updateProfile: async (username, interests, bio, experience) => {
    try {
      const res = await api.put(`/profiles`, {
        username,
        userCategoryPreference: interests,
        bio,
        experience,
      });
      // console.log(res.data);
      return { msg: res.data.message, type: "success" };
    } catch (error) {
      if (isAxiosErrorWithResponse(error)) {
        // console.log(error.response?.data);

        if (error.response?.data.errors) {
          return {
            data: error.response?.data.errors,
            type: "error",
            arrays: true,
          };
        }

        if (error.request) {
          return {
            msg: "No response from server. Check your internet connection.",
            type: "error",
          };
        }
        return {
          msg: error.response?.data.message,
          type: "error",
        };
      } else if (error instanceof Error) {
        // alert(error.message);
        // console.log("Unknown error: try again later.");
        return {
          msg: "Unknown error: try again later.",
          type: "error",
        };
      }
      return { msg: "Server error. Please try again later.", type: "error" };
    }
  },
}));
