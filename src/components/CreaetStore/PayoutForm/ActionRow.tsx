export default function ActionRow({
  onBack,
  submitting,
}: {
  onBack: () => void;
  submitting?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={onBack}
        type="button"
        className="h-10 rounded-md border px-4 bg-white text-sm"
      >
        ← Back
      </button>

      <button
        type="submit"
        disabled={submitting}
        className="h-11 rounded-md bg-[#7C3BED] text-white px-5 font-semibold shadow-sm hover:bg-[#6d30d6] disabled:opacity-70 flex items-center gap-2"
      >
        {submitting ? "Submitting…" : "Submit for Review"}
      </button>
    </div>
  );
}
