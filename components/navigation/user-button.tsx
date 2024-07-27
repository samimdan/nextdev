"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export const UserButton = ({ user }: Session) => {
  return (
    <div>
      <h1>{user?.name}</h1>
      <button onClick={() => signOut()}>signOut</button>
    </div>
  );
};
