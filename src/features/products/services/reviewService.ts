import { Review } from "../types/product.types";

export async function fetchReviews(productId: string): Promise<Review[]> {
  await new Promise((res) => setTimeout(res, 200));
  return [
    {
      id: "1",
      userName: "Jane Doe",
      rating: 5,
      comment: "Great sound quality and very comfortable.",
      createdAt: "2024-01-10T10:00:00.000Z",
    },
    {
      id: "2",
      userName: "John Smith",
      rating: 4,
      comment: "ANC is solid, battery life is amazing.",
      createdAt: "2024-01-05T09:00:00.000Z",
    },
  ];
}

export type NewReviewInput = {
  productId: string;
  userName: string;
  rating: number;
  comment: string;
};

export async function submitReview(input: NewReviewInput): Promise<Review> {
  await new Promise((res) => setTimeout(res, 300));
  return {
    id: Math.random().toString(36).slice(2),
    userName: input.userName,
    rating: input.rating,
    comment: input.comment,
    createdAt: new Date().toISOString(),
  };
}
