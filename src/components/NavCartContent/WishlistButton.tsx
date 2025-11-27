import Link from "next/link";
import { Heart } from "lucide-react";

interface Props {
  currentLang: string;
  count: number;
}

export default function WishlistButton({ currentLang, count }: Props) {
  return (
    <Link
      title="Show Wishlist Page"
      href={`/${currentLang}/wishlist`}
      className="relative w-5 sm:w-6 flex items-center justify-center"
      aria-label="Wishlist"
    >
      <Heart size={21} className="sm:h-5 sm:w-5" />
      <span className="absolute -top-1 -right-2 w-[16px] sm:w-[18px] h-[16px] sm:h-[18px] text-[8px] sm:text-[10px] bg-red-500 text-white rounded-full flex items-center justify-center">
        {count || 0}
      </span>
    </Link>
  );
}
