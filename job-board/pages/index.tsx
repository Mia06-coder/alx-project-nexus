// pages/index.tsx
import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";
import { useRouter } from "next/router";

export default function Landing() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 py-20 container mx-auto text-center">
      {/* Hero Header */}
      <PageHeader
        title="🚀 Welcome to JobBoardX"
        subtitle="Your gateway to endless career opportunities."
      />

      {/* Short tagline */}
      <p className="mt-4 text-gray-600 max-w-lg">
        Discover jobs tailored to your skills. Connect with top companies and
        take the next step in your career journey.
      </p>

      {/* Actions */}
      <div className="flex justify-center mt-12 gap-4">
        <Button
          type="button"
          onClick={() => router.push("/login")}
          className="px-8 py-3 border-2 border-blue-600 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Login
        </Button>
        <Button
          type="button"
          onClick={() => router.push("/register")}
          className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
        >
          Register
        </Button>
      </div>
    </div>
  );
}
