import { Plus } from "lucide-react";
import Link from "next/link";

export default function PageHeader({
  addHref,
  title,
  subtitle,
}: {
  addHref?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-[#111827]">
            {title ? title : "Catalog"}
          </h1>
          <p className="text-xs text-[#6B7280] mt-1">
            {subtitle ? subtitle : "Manage your product listings"}
          </p>
        </div>

        {addHref && (
          <div className="hidden sm:block">
            <Link
              href={addHref}
              className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium border-[1px] border-[#7C3BED] bg-[#7C3BED] text-white hover:bg-white hover:text-[#7C3BED] transition"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </Link>
          </div>
        )}
      </div>

      {addHref && (
        <div className="mt-3 sm:hidden">
          <Link
            href={addHref}
            className="w-full inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium border-[1px] border-[#7C3BED] bg-[#7C3BED] text-white hover:bg-white hover:text-[#7C3BED] transition"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </div>
      )}
    </div>
  );
}
