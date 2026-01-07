import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ENV } from "../lib/env.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    // extract the token from http-only cookies
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.log("Not authorized, no token");
      return next(new Error("Not authorized, invalid token"));
    }

    // verify the token
    const decode = jwt.verify(token, ENV.JWT_SECRET);
    if (!decode) {
      console.log("Not authorized, invalid token");
      return next(new Error("Not authorized, invalid token"));
    }

    // find the user fromdb
    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      console.log("User not found");
      return next(new Error("User not found"));
    }

    // attach user info to socket
    socket.user = user;
    socket.userId = user._id.toString();

    console.log(
      `=====================================================================\nSocket authenticated for user: ${user.fullName} (${user._id})`
    );

    next();
  } catch (error) {
    console.log("Error in socketAuthMiddleware middleware", error);
    next(new Error("Internal Server Error"));
  }
};
