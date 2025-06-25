"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    await authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        // callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onSuccess: () => {
          //redirect to the dashboard or sign in page
          alert("Authentication successful!");
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      }
    );
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <input
        placeholder="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onSubmit}>Sign Up</Button>
    </div>
  );
}
