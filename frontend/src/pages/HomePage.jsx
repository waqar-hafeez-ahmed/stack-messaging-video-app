import { UserButton } from "@clerk/clerk-react";
import React from "react";

const HomePage = () => {
  return (
    <div className="bg-red-400 min-h-screen flex flex-col items-center justify-center">
      <UserButton />
      HomePage
    </div>
  );
};

export default HomePage;
