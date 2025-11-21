import { ChevronRight, MapPin } from "lucide-react";

export default function NavLocationBadge() {
  return (
    <div
      className="
        flex items-center justify-center text-sm bg-gray-100
        px-3 py-2 rounded-sm
        w-full max-w-sm mx-auto
        sm:max-w-md md:min-w-[400px]
      "
    >
      <MapPin size={18} className="flex-shrink-0 text-[#7C3BED]" />
      <hr className="w-[1px] h-5 bg-[#7C3BED] mx-2" />
      <span className="truncate text-gray-800 text-xs sm:text-sm">
        Sheikh Zayed Road, Building 42, Dubai
      </span>
      <ChevronRight size={18} className="flex-shrink-0 text-gray-500 ml-1" />
    </div>
  );
}
