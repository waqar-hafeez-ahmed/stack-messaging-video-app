import { generateStreamToken } from "../config/stream.js";

export const getStreamToken = async (req, res) => {
  try {
    const userId = req.auth().userId; //coming from clerk middleware
    const token = await generateStreamToken(userId);
    if (!token) throw new Error("Stream token generation returned empty token");
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error getting Stream token:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
