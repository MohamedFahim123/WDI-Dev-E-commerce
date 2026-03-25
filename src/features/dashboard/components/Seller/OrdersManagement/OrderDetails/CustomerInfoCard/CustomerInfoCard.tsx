type Shipping = {
  name: string;
  address: string;
  city?: string;
  phone?: string;
};

export default function CustomerInfoCard({ shipping }: { shipping: Shipping }) {
  return (
    <aside className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <h2 className="mb-2 text-sm font-medium text-[#111827]">Customer Info</h2>

      <dl className="text-sm text-[#374151] space-y-2">
        <div className="flex justify-between">
          <dt className="text-sm text-gray-500">Name</dt>
          <dd className="font-medium">{shipping.name}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm text-gray-500">Address</dt>
          <dd className="text-right">{shipping.address}</dd>
        </div>
        {shipping.city && (
          <div className="flex justify-between">
            <dt className="text-sm text-gray-500">City</dt>
            <dd className="text-right">{shipping.city}</dd>
          </div>
        )}
        {shipping.phone && (
          <div className="flex justify-between">
            <dt className="text-sm text-gray-500">Phone</dt>
            <dd className="text-right">{shipping.phone}</dd>
          </div>
        )}
      </dl>
    </aside>
  );
}
