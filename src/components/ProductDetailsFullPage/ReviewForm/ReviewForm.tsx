"use client";

import { ReviewSchema } from "@/src/validation/Review.schema";
import { NewReviewInput } from "@/src/services/reviewService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

type FormValues = {
  rating: number;
  userName: string;
  comment: string;
};

type Props = {
  productId: string;
  onSubmitted: (input: NewReviewInput) => Promise<void>;
};

export function ReviewForm({ productId, onSubmitted }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      userName: "",
      rating: 5,
      comment: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    await onSubmitted({
      productId,
      userName: values.userName,
      rating: values.rating,
      comment: values.comment,
    });

    toast.success("Thank you for your review!");
    reset({ userName: "", rating: 5, comment: "" });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 rounded-lg border border-[#ddd] bg-[#ffffff] shadow-md p-4"
      aria-label="Write a product review"
    >
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="flex-1 space-y-1.5">
          <label
            htmlFor="review-user-name"
            className="text-xs font-medium text-zinc-600"
          >
            Your name
          </label>
          <Input
            id="review-user-name"
            placeholder="John Doe"
            autoComplete="name"
            className="h-9 outline-none border-[#eee] focus-visible:ring-[0px] focus:border-[#7c3bed] transition-all duration-200"
            aria-invalid={errors.userName ? "true" : "false"}
            aria-describedby={
              errors.userName ? "review-user-name-error" : undefined
            }
            {...register("userName")}
          />
          {errors.userName && (
            <p id="review-user-name-error" className="text-xs text-rose-500">
              {errors.userName.message}
            </p>
          )}
        </div>

        <div className="w-full max-w-[120px] space-y-1.5">
          <label
            htmlFor="review-rating"
            className="text-xs font-medium text-zinc-600"
          >
            Rating
          </label>
          <select
            id="review-rating"
            autoComplete="off"
            className="h-9 w-full rounded-md border focus-visible:ring-[0px] focus:border-[#7c3bed] transition-all duration-200 outline-none border-[#eee] border-input bg-background px-3 text-sm"
            aria-invalid={errors.rating ? "true" : "false"}
            aria-describedby={errors.rating ? "review-rating-error" : undefined}
            {...register("rating", { valueAsNumber: true })}
          >
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>
                {value} / 5
              </option>
            ))}
          </select>
          {errors.rating && (
            <p id="review-rating-error" className="text-xs text-rose-500">
              {errors.rating.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="review-comment"
          className="text-xs font-medium text-zinc-600"
        >
          Your review
        </label>
        <Textarea
          id="review-comment"
          rows={3}
          placeholder="Tell us about your experience…"
          autoComplete="off"
          className="outline-none border-[#eee] focus-visible:ring-[0px] focus:border-[#7c3bed] transition-all duration-200"
          aria-invalid={errors.comment ? "true" : "false"}
          aria-describedby={errors.comment ? "review-comment-error" : undefined}
          {...register("comment")}
        />
        {errors.comment && (
          <p id="review-comment-error" className="text-xs text-rose-500">
            {errors.comment.message}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={isSubmitting}>
          {isSubmitting ? "Submitting…" : "Submit review"}
        </Button>
      </div>
    </form>
  );
}
