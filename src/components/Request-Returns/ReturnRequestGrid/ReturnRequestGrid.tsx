import ReturnItemCard from "../ReturnItemCard/ReturnItemCard";
import { ReturnItem } from "../ReturnRequestData";

type Props = {
  items: ReturnItem[];
};

export default function ReturnRequestGrid({ items }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <ReturnItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
