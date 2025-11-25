import ReturnItemRequestPage from "@/src/components/Request-Returns/ReturnItemRequestPage/ReturnItemRequestPage";
import { RETURN_ITEMS } from "@/src/components/Request-Returns/ReturnRequestData";
import { Metadata } from "next";

type Props = {
  params: Promise<{ lang: string; itemId: string }>;
};

export default async function ReturnItemPage({ params }: Props) {
  const { itemId } = await params;
  const item = RETURN_ITEMS.find((i) => i.id === itemId) ?? RETURN_ITEMS[0];

  return <ReturnItemRequestPage item={item} />;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { itemId } = await params;
  const item = RETURN_ITEMS.find((i) => i.id === itemId);

  if (!item) {
    return {
      title: "Return Request - Item Not Found",
      description: "The requested item for return could not be found.",
    };
  }

  return {
    title: `Return Request - ${item.name}`,
    description: `Submit a return or exchange request for ${
      item.name
    }, priced at AED ${item.price.toFixed(2)}.`,
  };
}
