import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  search: string;
  lang: string;
  onSearchChange: (value: string) => void;
  onMyReturnsClick?: () => void;
};

export default function ReturnHeaderControls({
  search,
  lang,
  onSearchChange,
  onMyReturnsClick,
}: Props) {
  return (
    <div className="flex w-full items-center gap-3">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search..."
          className="h-10 w-full rounded-full border-0 bg-[#E5E7EB] pl-9 text-xs text-[#374151] placeholder:text-[#9CA3AF] focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      <Link href={`/${lang}/my-returns`}>
        <Button
          type="button"
          onClick={onMyReturnsClick}
          className="h-10 min-w-[110px] cursor-pointer rounded-full bg-[#7C3BED] px-6 text-[12px] font-medium text-white hover:bg-[#6d28d9]"
        >
          <Image
            width={18}
            height={18}
            src={"/assets/icons/return.svg"}
            alt="Return Icon"
          />
          My Returns
        </Button>
      </Link>
    </div>
  );
}
