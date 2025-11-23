import { Product } from "@/src/types/product.types";
import { toast } from "sonner";

export const handleShareThisProduct = async (
  pathname: string,
  product: Product
) => {
  if (typeof window === "undefined") return;

  const url = `${window.location.origin}${pathname}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: product.subtitle ?? product.description,
        url,
      });
      return;
    }
  } catch {}

  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      toast.success("Product link copied to clipboard");
    } else {
      window.open(url, "_blank");
    }
  } catch {
    toast.error("Could not copy link");
  }
};
