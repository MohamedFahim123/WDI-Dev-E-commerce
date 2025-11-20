import { ChevronRight, MapPin } from "lucide-react";

export default function NavLocationBadge() {
  return (
    <div className="hidden md:flex items-center justify-center text-sm bg-gray-100 px-3 py-1 rounded-sm min-w-[400px]">
      <MapPin size={20} />
      <hr className="w-[1px] bg-[#7C3BED] mx-2" />
      <span className="truncate">Sheikh Zayed Road, Building 42, Dubai</span>
      <ChevronRight size={20} />
    </div>
  );
}
