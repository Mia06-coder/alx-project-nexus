// pages/login.tsx
import { useState } from "react";
import { labelStyle, inputStyle } from "@/styles/styles";
import PasswordInput from "@/components/PasswordInput";
import Button from "@/components/Button";
import AuthLayout from "@/components/AuthLayout";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Login:", { username, password });

    router.push("/jobs");

    // TODO: call /api/login
  }

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">LOGIN</h2>
        <p className="text-sm">Welcome back, please sign in</p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Username */}
        <div>
          <label htmlFor="username" className={labelStyle}>
            Username <span className="text-red-500">*</span>
          </label>
          <input
            id="username"
            type="text"
            placeholder="yourusername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={inputStyle}
            required
          />
        </div>

        {/* Password */}
        <PasswordInput
          id="password"
          label="Password"
          value={password}
          onChange={setPassword}
          required
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded text-blue-600" />
            Remember me
          </label>
          <Link href="#" className="text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="mt-10 w-full bg-blue-600 text-white hover:bg-blue-700 transition"
          aria-label={`Login to JobBoardX`}
        >
          Login
        </Button>
      </form>
    </AuthLayout>
  );
}
