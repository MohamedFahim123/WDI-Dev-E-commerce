
import Link from "next/link";

export default function NotFound() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4">Oops! Page not found.</p>
      <Link
        href={"/"}
        className="mt-4 px-6 py-2 bg-[#7C3BED] border-[#7C3BED] border-1 hover:text-[#7C3BED] transition-all duration-300 text-white rounded hover:bg-white"
      >
        Go Home
      </Link>
    </div>
  );
}
