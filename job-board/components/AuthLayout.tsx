import Link from "next/link";
import { useRouter } from "next/router";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isLogin = router.pathname === "/login";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        {/* Toggle */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link
              href="/login"
              className={`pb-1 ${
                isLogin
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={`pb-1 ${
                !isLogin
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
            >
              Register
            </Link>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
