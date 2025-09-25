// components/BackButton.tsx
import { useRouter } from "next/router";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back(); // works if there's a previous route in history
    } else {
      router.push("/jobs"); // fallback route
    }
  };

  return (
    <FaArrowLeftLong
      size={24}
      className="mb-10 cursor-pointer"
      onClick={handleBack}
      aria-label="Go back"
    />
  );
}
