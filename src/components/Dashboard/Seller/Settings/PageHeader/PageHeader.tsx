export default function PageHeader({ title }: { title: string }) {
  return (
    <div className="mb-4 px-2 sm:px-0">
      <h1 className="text-lg sm:text-2xl font-bold text-[#111827]">{title}</h1>
    </div>
  );
}
