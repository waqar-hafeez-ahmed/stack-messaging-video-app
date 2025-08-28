import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "stack-msg" });

const syncUser = inngest.createFunction(
  { id: "syncUser" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    // Handle the incoming event and sync user data
    await connectDB();
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`,
      image: image_url,
    };
    await User.create(newUser);
    await upsertStreamUser({
      id: newUser.clerkId.toString(),
      name: newUser.name,
      image: newUser.image,
    });
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;
    await User.deleteOne({ clerkId: id }); //Delete user from DB and CLERK
    await deleteStreamUser(id.toString()); //Delete user from stream
  }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser, deleteUserFromDB];
