import AuthRepository from "./auth.repository.js";
import { ApiError } from "../../core/errors/ApiError.js";
import { comparePassword, generateAccessToken, hashPassword } from "../../shared/utils/services.js";

class AuthService {
  static async register(email: string, password: string, username: string) {
    // check if email exists
    const existingEmail = await AuthRepository.findUniqueUser({
      email,
    });

    if (existingEmail) {
      throw new ApiError(409, "This email already exists");
    }

    // check if username exists
    const existingUsername = await AuthRepository.findUniqueUser({
      username: username.toLowerCase(),
    });

    if (existingUsername) {
      throw new ApiError(409, "This username already exists");
    }

    // hash user password
    const hashedPassword = await hashPassword(password);

    const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

    const user = await AuthRepository.createUser({
      username: username.toLowerCase(),
      email,
      password: hashedPassword,
      image: profileImage,
    });

    // generate token and send to the client
    const token = generateAccessToken(user);

    return { user, token };
  }

  static async login(email: string, password: string) {

    // check if email exists
    const user = await AuthRepository.findUniqueUser({
      email,
    });

    if (!user) {
      throw new ApiError(409, "Invalid credentials");
    }

    // hash user password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new ApiError(400, "Invalid credentials")
    
    
    // generate token and send to the client
    const token = generateAccessToken(user);

    return { user, token };
  }

  // static async getUserProfile(userId: number) {
  //   return AuthRepository.findUniqueUser({ id: userId });
  // }
}

export default AuthService;
