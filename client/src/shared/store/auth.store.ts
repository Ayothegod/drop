// import { create } from "zustand";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const BASEURL = "http://localhost:5000/api/v1";

// type User = {
//   createdAt: Date;
//   updatedAt: Date;
//   username: string;
//   email: string;
//   emailVerified: null | boolean;
//   id: string;
//   image: string;
//   password: string;
// };

// interface AuthStore {
//   user: null | User;
//   token: string | null;
//   isLoading: boolean;

//   register: (
//     username: string,
//     email: string,
//     password: string
//   ) => Promise<
//     | { success: boolean; error?: undefined }
//     | { success: boolean; error: string }
//   >;
//   login: (
//     email: string,
//     password: string
//   ) => Promise<
//     | { success: boolean; error?: undefined }
//     | { success: boolean; error: string }
//   >;
//   checkAuth: () => Promise<void>;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthStore>((set) => ({
//   user: null,
//   token: null,
//   isLoading: false,

//   register: async (username, email, password) => {
//     set({ isLoading: true });

//     // Validate input
//     try {
//       const response = await fetch(
//         `${BASEURL}/auth/register`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ username, email, password }),
//         }
//       );

//       // NOTE: Check if all response (success and error) -> has .ok, so we can use it for the error instead of the data.data.errorrs below

//       // if (!response.ok) {
//       //   throw new Error("Somethings went wrong.");
//       // }

//       const data = await response.json();
//       // console.log(data);

//       if (data.data.errors) {
//         // Handle validation errors from the client instead of the server

//         // console.log(data.data.errors);
//         throw new Error(data.message || "Somethings went wrong.");
//       }

//       await AsyncStorage.setItem("user", JSON.stringify(data.data.user));
//       await AsyncStorage.setItem("token", data.data.token);

//       set({ user: data.data.user, token: data.data.token, isLoading: false });

//       console.log(data.data.user, data, data.token);
//       return { success: true };
//     } catch (error) {
//       console.error("Error during registration:", error);
//       set({ isLoading: false });

//       console.log("Error: ", error);
//       return { success: false, error: "Error" };
//     }
//   },

//   login: async (email, password) => {
//     set({ isLoading: true });

//     // Validate input
//     try {
//       const response = await fetch(
//         `${BASEURL}/auth/login`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({  email, password }),
//         }
//       );

//       // NOTE: Check if all response (success and error) -> has .ok, so we can use it for the error instead of the data.data.errorrs below

//       // if (!response.ok) {
//       //   throw new Error("Somethings went wrong.");
//       // }

//       const data = await response.json();
//       // console.log(data);

//       if (data.data.errors) {
//         // Handle validation errors from the client instead of the server

//         // console.log(data.data.errors);
//         throw new Error(data.message || "Somethings went wrong.");
//       }

//       await AsyncStorage.setItem("user", JSON.stringify(data.data.user));
//       await AsyncStorage.setItem("token", data.data.token);

//       set({ user: data.data.user, token: data.data.token, isLoading: false });

//       console.log(data.data.user, data, data.token);
//       return { success: true };
//     } catch (error) {
//       console.error("Error during Login:", error);
//       set({ isLoading: false });

//       console.log("Error: ", error);
//       return { success: false, error: "Error" };
//     }
//   },

//   checkAuth: async () => {
//     try {
//       const userJson = await AsyncStorage.getItem("user");
//       const token = await AsyncStorage.getItem("token");

//       const user = userJson ? JSON.parse(userJson) : null;

//       if (user && token) {
//         set({ user, token });
//       } else {
//         set({ user: null, token: null });
//       }
//     } catch (error) {
//       console.error("Error during authentication check:", error);
//     }
//   },

//   logout: () => {
//     try {
//       AsyncStorage.removeItem("user");
//       AsyncStorage.removeItem("token");

//       set({ user: null, token: null });
//     } catch (error) {
//       console.error("Error during logout:", error);
//       // Handle error if needed
//     }
//   },
// }));
