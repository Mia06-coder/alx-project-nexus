// components/Spinner.tsx
export default function Spinner() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-8">
      <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="font-black text-center mt-2">Loading...</p>
    </div>
  );
}
