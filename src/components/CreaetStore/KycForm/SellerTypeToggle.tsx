export default function SellerTypeToggle({
  sellerType,
  setSellerType,
}: {
  sellerType: "individual" | "business";
  setSellerType: (v: "individual" | "business") => void;
}) {
  return (
    <div>
      <div className="text-sm font-medium mb-2">
        Select Seller Type <span className="text-red-500">*</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label
          className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer ${
            sellerType === "individual"
              ? "border-[#EDE9FE] bg-[#FBFAFF]"
              : "border-[#EDEFF1] bg-white"
          }`}
          onClick={() => setSellerType("individual")}
        >
          <input
            type="radio"
            name="sellerType"
            autoComplete="off"
            value="individual"
            className="peer sr-only"
            checked={sellerType === "individual"}
            onChange={() => setSellerType("individual")}
            aria-label="Individual seller"
          />
          <div
            className={`h-4 w-4 rounded-full border ${
              sellerType === "individual"
                ? "bg-[#7C3BED] border-[#7C3BED]"
                : "bg-white border-gray-300"
            }`}
            aria-hidden
          />
          <div>
            <div className="text-sm font-semibold">Individual</div>
            <div className="text-xs text-slate-500">For personal sellers</div>
          </div>
        </label>

        <label
          className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer ${
            sellerType === "business"
              ? "border-[#EDE9FE] bg-[#FBFAFF]"
              : "border-[#EDEFF1] bg-white"
          }`}
          onClick={() => setSellerType("business")}
        >
          <input
            autoComplete="off"
            type="radio"
            name="sellerType"
            value="business"
            className="peer sr-only"
            checked={sellerType === "business"}
            onChange={() => setSellerType("business")}
            aria-label="Business seller"
          />
          <div
            className={`h-4 w-4 rounded-full border ${
              sellerType === "business"
                ? "bg-[#7C3BED] border-[#7C3BED]"
                : "bg-white border-gray-300"
            }`}
            aria-hidden
          />
          <div>
            <div className="text-sm font-semibold">Business/Company</div>
            <div className="text-xs text-slate-500">
              For registered businesses
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
