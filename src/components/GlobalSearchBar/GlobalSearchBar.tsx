"use client";

import { SearchFormValues, searchSchema } from "@/src/schemas/Search.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function GlobalSearchBar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: "" },
  });

  const onSubmit = (values: SearchFormValues) => {
    console.log("Search query:", values.query);
    toast.success(`Searching for "${values.query}"`);
  };

  const onError = () => {
    const firstError = Object.values(errors)[0];
    if (firstError?.message) toast.error(firstError.message.toString());
  };

  return (
    <div className="flex-1">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="relative h-10 md:h-11"
      >
        <input
          type="text"
          {...register("query")}
          placeholder="Search for products, brands and more..."
          className="pl-16 w-full h-full py-2 bg-[#F4F4F5] rounded-3xl text-sm focus:outline-none"
        />
        <button
          type="submit"
          className="absolute left-0 top-0 h-full px-2 flex items-center justify-center"
        >
          <Search size={20} />
        </button>
      </form>
    </div>
  );
}
