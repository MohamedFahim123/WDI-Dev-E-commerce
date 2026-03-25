
export default function ActionRow({
  onBack,
  submitLabel = "Continue",
  submitting = false,
}: {
  onBack?: () => void;
  submitLabel?: string;
  submitting?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="h-10 cursor-pointer rounded-md border px-4 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7C3BED] transition"
        >
          ← Back
        </button>
      ) : (
        <div />
      )}

      <button
        type="submit"
        disabled={submitting}
        className="h-11 rounded-md cursor-pointer bg-[#7C3BED] text-white px-5 font-semibold shadow-sm hover:bg-[#6d30d6] focus:outline-none focus:ring-2 focus:ring-[#7C3BED] disabled:opacity-70 transition"
      >
        {submitting ? "Submitting…" : submitLabel}
      </button>
    </div>
  );
}
