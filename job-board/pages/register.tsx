// pages/register.tsx
import AuthLayout from "@/components/AuthLayout";
import Button from "@/components/Button";
import PasswordInput from "@/components/PasswordInput";
import { inputStyle, labelStyle } from "@/styles/styles";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Register() {
  const [firstname, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Register:", {
      username,
      email,
      phone,
      password,
      confirmPassword,
      role: "user",
    });

    router.push("/jobs");

    // TODO: call /api/register
  }

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold">REGISTER</h2>
        <p className="text-sm">Create your account in seconds</p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label htmlFor="firstname" className={labelStyle}>
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="firstname"
            type="text"
            pattern="^[A-Za-z]+(?: [A-Za-z]+)*$"
            placeholder="Enter first name"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputStyle}
            minLength={2}
            maxLength={150}
            required
          />
        </div>

        {/* Surname */}
        <div>
          <label htmlFor="surname" className={labelStyle}>
            Surname <span className="text-red-500">*</span>
          </label>
          <input
            id="surname"
            type="text"
            pattern="^[A-Za-z]+(?: [A-Za-z]+)*$"
            placeholder="Enter surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className={inputStyle}
            minLength={3}
            maxLength={150}
            required
          />
        </div>

        {/* Username */}
        <div>
          <label htmlFor="username" className={labelStyle}>
            Username <span className="text-red-500">*</span>
          </label>
          <input
            id="username"
            type="text"
            pattern="^[\w.@+\-]+$"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={inputStyle}
            minLength={3}
            maxLength={150}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelStyle}>
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputStyle}
            maxLength={15}
            required
          />
          <p className="mt-1 text-xs text-right text-blue-600">
            We’ll send updates here
          </p>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={labelStyle}>
            Phone <span className="text-gray-500 font-normal">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            pattern="^\+?1?\d{9,15}$"
            maxLength={15}
            placeholder="+263771234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputStyle}
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

        {/* Confirm Password */}
        <PasswordInput
          id="confirm-password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          required
        />

        {/* Hidden role */}
        <input type="hidden" value="user" name="role" />

        <Button
          type="submit"
          className="mt-10 w-full bg-blue-600 text-white hover:bg-blue-700 transition"
          aria-label={`Register to JobBoardX`}
        >
          Register
        </Button>
      </form>
    </AuthLayout>
  );
}
