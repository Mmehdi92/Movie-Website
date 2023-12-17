"use client";
import { useSession } from "next-auth/react";

export default function User() {
  const { data: session } = useSession();
  console.log(session);
  if (!session) {
    return (
      <div className="h-screen">You are not authenticated. Please log in.</div>
    );
  }

  if (!session.user) {
    return (
      <div className="h-screen">No user information found in the session.</div>
    );
  }

  const userId = session.user.first_name;

  return (
    <div>
      <p>User ID: {userId}</p>

      {JSON.stringify(session)}
    </div>
  );
}
