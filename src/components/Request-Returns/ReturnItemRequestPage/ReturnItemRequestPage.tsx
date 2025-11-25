"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { PageHeader } from "@/src/components/PageHeader/PageHeader";
import Container from "@/src/components/Container/Container";
import { Button } from "@/src/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { Input } from "@/src/components/ui/input";
import { ReturnItem, AED, PRIMARY_COLOR } from "../ReturnRequestData";
import { cn } from "@/src/lib/utils";
import { ImagePlus, ScrollText } from "lucide-react";
import { useRouteLang } from "@/src/hooks/useLang";

const RETURN_REASONS = [
  "Defective item",
  "Wrong item received",
  "Size issue",
  "Changed my mind",
  "Other",
] as const;

const RETURN_METHODS = [
  { id: "pickup", label: "Pickup from my address" },
  { id: "dropoff", label: "Drop off at return center" },
] as const;

const POLICY_LINES = [
  "Returns within 14 days",
  "Must be unused and in original packaging",
  "Refund within 3–5 working days",
];

type ReturnRequestFormValues = {
  reason: (typeof RETURN_REASONS)[number];
  method: (typeof RETURN_METHODS)[number]["id"];
  address: string;
  notes: string;
};

type Props = {
  item: ReturnItem;
  orderId?: string;
};

export default function ReturnItemRequestPage({
  item,
  orderId = "12345",
}: Props) {
  const lang = useRouteLang();
  const { register, handleSubmit, watch, setValue } =
    useForm<ReturnRequestFormValues>({
      defaultValues: {
        reason: RETURN_REASONS[0],
        method: "pickup",
        address: "",
        notes: "",
      },
    });

  const method = watch("method");

  const onSubmit = (values: ReturnRequestFormValues) => {
    console.log("Return request submit", { orderId, item, values });
  };

  const breadcrumb = [
    { label: "Home", href: `/${lang}` },
    { label: "Request-Return", href: `/${lang}/request-return` },
    { label: item.name },
  ];

  return (
    <div className="min-h-screen py-8 sm:py-10">
      <PageHeader title={`Order #${orderId}`} breadcrumb={breadcrumb} />

      <section className="py-6">
        <Container>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto max-w-2xl space-y-8"
          >
            <div className="rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
              <div className="flex gap-3">
                <Image
                  src={item.imageSrc}
                  alt={item.name}
                  width={72}
                  height={72}
                  className="h-16 w-16 rounded-md bg-[#e5e7eb] object-cover"
                />

                <div className="flex-1">
                  <p className="line-clamp-2 text-[14px] font-semibold text-[#111827]">
                    {item.name}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                    <span className="rounded-full bg-[#F3F4F6] px-2 py-[2px] text-[#4B5563]">
                      Qty: {item.quantity}
                    </span>
                    <span className="rounded-full bg-[#F3F4F6] px-2 py-[2px] text-[#4B5563]">
                      {item.deliveredOn}
                    </span>
                  </div>
                  <p
                    className="mt-2 text-[14px] font-semibold"
                    style={{ color: PRIMARY_COLOR }}
                  >
                    {AED(item.price)}
                  </p>
                </div>
              </div>
            </div>

            <section className="space-y-3">
              <h2 className="text-[15px] font-semibold text-[#111827]">
                Reason for Return
              </h2>

              <RadioGroup
                value={watch("reason")}
                onValueChange={(val) =>
                  setValue("reason", val as ReturnRequestFormValues["reason"])
                }
                className="space-y-2"
              >
                {RETURN_REASONS.map((reason) => {
                  const selected = watch("reason") === reason;
                  return (
                    <label
                      key={reason}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-2xl bg-[#F4F4F5] px-4 py-3 text-sm transition-colors",
                        selected && "bg-[#EEF2FF] ring-1 ring-[#7C3BED]"
                      )}
                    >
                      <RadioGroupItem
                        value={reason}
                        className="h-4 w-4 border-[#7C3BED] data-[state=checked]:bg-[#7C3BED]"
                      />
                      <span className="text-[13px] text-[#111827]">
                        {reason}
                      </span>
                    </label>
                  );
                })}
              </RadioGroup>
            </section>

            <section className="space-y-3">
              <h2 className="text-[15px] font-semibold text-[#111827]">
                Upload Photos (optional)
              </h2>

              <div className="flex flex-wrap gap-3">
                <Image
                  src="/assets/products/prod6.webp"
                  alt="Preview 1"
                  width={72}
                  height={72}
                  className="h-16 w-16 rounded-md bg-[#e5e7eb] object-cover"
                />
                <Image
                  src="/assets/products/prod6.webp"
                  alt="Preview 2"
                  width={72}
                  height={72}
                  className="h-16 w-16 rounded-md bg-[#e5e7eb] object-cover"
                />

                <label className="flex h-16 w-16 cursor-pointer flex-col items-center justify-center gap-1 rounded-md bg-[#F4F4F5] text-[10px] font-medium text-[#4B5563] hover:bg-[#E5E7EB]">
                  <ImagePlus className="h-5 w-5" />
                  <span>+ Add Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                </label>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-[15px] font-semibold text-[#111827]">
                Return Method
              </h2>

              <RadioGroup
                value={method}
                onValueChange={(val) =>
                  setValue("method", val as ReturnRequestFormValues["method"])
                }
                className="space-y-2"
              >
                {RETURN_METHODS.map((m) => {
                  const selected = method === m.id;
                  return (
                    <label
                      key={m.id}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-2xl bg-[#F4F4F5] px-4 py-3 text-sm transition-colors",
                        selected && "bg-[#EEF2FF] ring-1 ring-[#7C3BED]"
                      )}
                    >
                      <RadioGroupItem
                        value={m.id}
                        className="h-4 w-4 border-[#7C3BED] data-[state=checked]:bg-[#7C3BED]"
                      />
                      <span className="text-[13px] text-[#111827]">
                        {m.label}
                      </span>
                    </label>
                  );
                })}
              </RadioGroup>

              <div className="mt-2">
                <Label
                  htmlFor="address"
                  className="mb-1 block text-[12px] text-[#6b7280]"
                >
                  Address / Center:
                </Label>
                <Input
                  id="address"
                  {...register("address")}
                  placeholder="Enter Address Here"
                  className={cn(
                    "h-11 rounded-2xl border-none bg-[#F4F4F5] text-[12px] placeholder:text-[#9CA3AF]",
                    method === "pickup" && "opacity-70"
                  )}
                />
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-[15px] font-semibold text-[#111827]">
                Seller Return Policy
              </h2>

              <div className="space-y-2">
                {POLICY_LINES.map((line) => (
                  <div
                    key={line}
                    className="rounded-2xl bg-[#F4F4F5] px-4 py-3 text-[12px] text-[#111827]"
                  >
                    {line}
                  </div>
                ))}
              </div>

              <Button
                type="button"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-[#111827] bg-white text-[12px] font-medium text-[#111827] hover:bg-[#F4F4F5]"
              >
                <ScrollText className="h-4 w-4" />
                View Full Policy
              </Button>
            </section>

            <section className="space-y-3">
              <h2 className="text-[15px] font-semibold text-[#111827]">
                Notes (optional)
              </h2>
              <Textarea
                {...register("notes")}
                placeholder="Type Here ..."
                className="min-h-[120px] rounded-2xl border-none bg-[#F4F4F5] text-[13px] placeholder:text-[#9CA3AF]"
              />

              <Button
                type="submit"
                className="mt-2 w-full rounded-full bg-[#7C3BED] text-[13px] font-medium text-white hover:bg-[#6d28d9]"
              >
                Send Request
              </Button>
            </section>
          </form>
        </Container>
      </section>
    </div>
  );
}
