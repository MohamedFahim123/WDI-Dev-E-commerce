import SKUCardRow, { SKU } from "../SKUCardRow/SKUCardRow";

export default function CatalogCards({ items }: { items: SKU[] }) {
  return (
    <div className="space-y-3 sm:hidden mt-2">
      {items.map((s) => (
        <SKUCardRow key={s.id} s={s} />
      ))}
    </div>
  );
}
