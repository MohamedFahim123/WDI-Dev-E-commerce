import { useEffect, useState } from "react";
import { Review } from "../types/product.types";
import {
  fetchReviews,
  submitReview,
  NewReviewInput,
} from "../services/reviewService";

export function useReviews(productId: string | undefined) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const reviewDetails = (productId: string, cancelled: boolean): void => {
    setLoading(true);

    fetchReviews(productId)
      .then((data) => {
        if (!cancelled) setReviews(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
  };

  useEffect(() => {
    if (!productId) return;
    let cancelled = false;

    (() => {
      reviewDetails(productId, cancelled);
    })();

    return () => {
      cancelled = true;
    };
  }, [productId]);

  const addReview = async (input: NewReviewInput) => {
    const created = await submitReview(input);
    setReviews((prev) => [created, ...prev]);
  };

  return { reviews, loading, addReview };
}
