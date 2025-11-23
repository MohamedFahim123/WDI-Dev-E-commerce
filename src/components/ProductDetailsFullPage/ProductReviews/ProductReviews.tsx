"use client";

import { Review } from "@/src/types/product.types";
import { RatingStars } from "../RatingStars/RatingStars";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { useReviews } from "@/src/hooks/useReviews";

type Props = {
  productId: string;
  rating: number;
  reviewCount: number;
};

export function ProductReviews({ productId, rating, reviewCount }: Props) {
  const { reviews, loading, addReview } = useReviews(productId);

  const totalReviews = reviews.length || reviewCount || 0;

  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.round(r.rating) === star).length;
    const percentage =
      totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;

    return { star, count, percentage };
  });

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-zinc-900">
          Customer Reviews
        </h2>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="space-y-2">
            <div className="text-sm font-medium text-zinc-600">
              Average rating
            </div>
            <div className="mt-2 space-y-1.5">
              {distribution.map(({ star, percentage }) => (
                <div
                  key={star}
                  className="flex items-center gap-3 text-xs text-zinc-600"
                >
                  <span className="w-10 text-right">{star} star</span>
                  <div className="flex-1 h-2 overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className="h-full rounded-full bg-zinc-900"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-zinc-500">
                    {percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-bold text-zinc-900">
              {rating.toFixed(1)}
            </span>
            <div className="mt-1">
              <RatingStars value={rating} />
            </div>
            <span className="mt-1 text-xs text-zinc-500">
              {reviewCount.toLocaleString()} reviews
            </span>
          </div>
        </div>
      </div>

      <ReviewForm
        productId={productId}
        onSubmitted={async (input) => {
          await addReview(input);
        }}
      />

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-900">Comments</h3>

        {loading && <p className="text-sm text-zinc-500">Loading reviews…</p>}

        {!loading && reviews.length === 0 && (
          <p className="text-sm text-zinc-500">
            No reviews yet. Be the first to review this product!
          </p>
        )}

        {reviews.map((review: Review) => (
          <div
            key={review.id}
            className="rounded-lg border border-zinc-100 bg-white p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-zinc-900">
                  {review.userName}
                </div>
                <div className="text-xs text-zinc-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </div>
              <RatingStars value={review.rating} />
            </div>
            <p className="mt-3 text-sm text-zinc-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
