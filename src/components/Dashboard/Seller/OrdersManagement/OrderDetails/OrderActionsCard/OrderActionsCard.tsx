import { ButtonHTMLAttributes } from "react";

export function PrimaryButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white bg-[#7C3BED] hover:bg-[#6d28d9] ${
        props.className ?? ""
      }`}
    />
  );
}

export function OutlineButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium border bg-white ${
        props.className ?? ""
      }`}
    />
  );
}

export default function OrderActionsCard({
  onUpdate,
  onAddTracking,
}: {
  onUpdate?: () => void;
  onAddTracking?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex gap-3">
        <OutlineButton onClick={onUpdate}>Update Status</OutlineButton>
        <PrimaryButton onClick={onAddTracking}>Add Tracking</PrimaryButton>
      </div>
    </div>
  );
}
