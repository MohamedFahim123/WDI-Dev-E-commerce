import { MY_RETURN_ORDERS } from "@/src/features/returns/components/Request-Returns/MyReturnsData";
import MySingleReturnDetails from "@/src/features/returns/components/Request-Returns/ReturnStatusDetailsPage/MySingleReturnDetails";
import { withBlockSeller } from "@/src/hoc/roleGuards";
import { Metadata } from "next";

type Props = {
  params: Promise<{ lang: string; orderId: string }>;
};

async function MyReturnDetailsRoute({ params }: Props) {
  const { orderId } = await params;
  const order =
    MY_RETURN_ORDERS.find((o) => o.id === orderId) ?? MY_RETURN_ORDERS[0];

  return <MySingleReturnDetails order={order} />;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { orderId } = await params;
  const order = MY_RETURN_ORDERS.find((i) => i.id === orderId);

  if (!order) {
    return {
      title: "Return Request - order Not Found",
      description: "The requested returned order could not be found.",
    };
  }

  return {
    title: `Return Request - ${order.item}`,
    description: `Submit a return or exchange request for ${order.item}.`,
  };
}
export default withBlockSeller(MyReturnDetailsRoute, {
  redirectTo: (lang: string) => `/${lang}`,
});

