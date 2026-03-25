import { CreditCard } from "lucide-react";

export default function Header({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-full bg-[#F0F4FF] flex items-center justify-center">
        <CreditCard className="h-4 w-4 text-[#4B6EF6]" />
      </div>
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
  );
}
