import StoreHeaderSkeleton from "@/src/components/Skeletons/StoreHeaderSkeleton/StoreHeaderSkeleton";

export default function LoadingStorePage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-6">
      <StoreHeaderSkeleton />
    </section>
  );
}
