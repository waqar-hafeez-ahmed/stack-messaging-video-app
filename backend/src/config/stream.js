import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";

const streamClient = StreamChat.getInstance(
  ENV.STREAM_API,
  ENV.STREAM_API_SECRET
);

// Getting user from Ingest
export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser(userData);
    console.log("Stream user upserted:", { id: userData.id });
    return userData;
  } catch (error) {
    console.error("Error upserting Stream user:", error);
    throw error;
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await streamClient.deleteUser(userId);
    console.log("Stream user deleted:", userId);
  } catch (error) {
    console.error("Error deleting Stream user:", error);
  }
};

// Generate a Stream token for a user authentication.
export const generateStreamToken = async (userId) => {
  try {
    const token = await streamClient.createToken(userId);
    console.log("Stream token generated:", token);
    return token;
  } catch (error) {
    console.error("Error generating Stream token:", error);
  }
};

export const addUserToPublicChannels = async (newUserId) => {
  const publicChannels = await streamClient.queryChannels({
    discoverable: true,
  });

  for (const channel of publicChannels) {
    await channel.addMembers([newUserId]);
  }
};
