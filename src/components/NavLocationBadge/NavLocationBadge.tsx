import { ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";

export default function NavLocationBadge() {
  return (
    <div className="hidden md:flex items-center text-sm bg-gray-100 px-3 py-1 rounded-sm w-[400px]">
      <MapPin size={20} />
      <hr className="w-[1px] bg-[#7C3BED] mx-2" />
      <span className="truncate block w-[calc(100%-32px)]">
        Sheikh Zayed Road, Building 42, Dubai
      </span>
      <ChevronRight size={20} />
    </div>
  );
}
