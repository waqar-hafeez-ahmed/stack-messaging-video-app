import { StreamChat } from "stream-chat";
import { ENV } from "./src/config/env.js";

async function testStreamConnection() {
  console.log("Testing Stream API connection...");
  console.log("API Key:", ENV.STREAM_API);

  try {
    const streamClient = StreamChat.getInstance(
      ENV.STREAM_API,
      ENV.STREAM_API_SECRET
    );

    // Test connection by making a simple API call
    const response = await streamClient.queryUsers({});
    console.log("✅ Stream connection successful!");
    console.log("Total users in Stream:", response.users.length);

    // Test creating a test user
    const testUser = {
      id: "test-user-" + Date.now(),
      name: "Test User",
      role: "user",
    };

    const upsertResult = await streamClient.upsertUser(testUser);
    console.log("✅ Test user created successfully:", upsertResult);

    // Test generating a token
    const token = await streamClient.createToken(testUser.id);
    console.log("✅ Token generation successful:", token);

    return true;
  } catch (error) {
    console.error("❌ Stream connection failed:", {
      error: error.message,
      code: error.code,
      status: error.status,
      response: error.response?.data,
    });
    return false;
  }
}

// Run the test
testStreamConnection()
  .then((success) => {
    if (success) {
      console.log("🎉 All Stream tests passed!");
    } else {
      console.log(
        "💥 Stream tests failed. Check your API keys and Stream dashboard configuration."
      );
    }
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error("Unexpected error:", error);
    process.exit(1);
  });
