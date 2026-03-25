"use client";
import Container from "@/src/components/Container/Container";
import { PageHeader } from "@/src/components/PageHeader/PageHeader";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import Image from "next/image";
import { RETURN_STATUS_STEPS, ReturnOrder } from "../MyReturnsData";
import { AED, PRIMARY_COLOR } from "../ReturnRequestData";
import { useRouteLang } from "@/src/hooks/useLang";

type Props = {
  order: ReturnOrder;
};

export default function ReturnStatusDetailsPage({ order }: Props) {
  const { item } = order;
  const lang = useRouteLang();

  const breadcrumb = [
    { label: "Home", href: `/${lang}` },
    { label: "My-Returns", href: `/${lang}/my-returns` },
    { label: "More Details" },
  ];

  const currentIndex = RETURN_STATUS_STEPS.findIndex(
    (s) => s.id === order.status
  );

  return (
    <div className="min-h-screen py-8 sm:py-10 overflow-x-hidden">
      <PageHeader title={`Order #${order.id}`} breadcrumb={breadcrumb} />

      <section className="py-4">
        <Container>
          <div className="mx-auto flex max-w-xl flex-col gap-8">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
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

            <section className="space-y-4">
              <h2 className="text-[15px] font-semibold text-[#111827]">
                Return Status Timeline
              </h2>

              <div className="flex flex-wrap gap-4 text-[11px]">
                {RETURN_STATUS_STEPS.map((step, index) => {
                  const active = index === currentIndex;
                  const completed = index < currentIndex;
                  return (
                    <span
                      key={step.id}
                      className={cn(
                        "font-medium",
                        active && "text-[#7C3BED]",
                        !active &&
                          (completed ? "text-[#4B5563]" : "text-[#9CA3AF]")
                      )}
                    >
                      {step.label}
                    </span>
                  );
                })}
              </div>

              <div className="space-y-2">
                {RETURN_STATUS_STEPS.map((step, index) => {
                  const completed = index <= currentIndex;
                  return (
                    <div
                      key={step.id}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl bg-[#F4F4F5] px-4 py-3 text-[13px]",
                        completed && "bg-[#EEF2FF] ring-1 ring-[#7C3BED]"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-4 w-4 items-center justify-center rounded-full border",
                          completed
                            ? "border-[#7C3BED] bg-[#7C3BED]"
                            : "border-[#D4D4D8] bg-white"
                        )}
                      >
                        {completed && (
                          <span className="text-[10px] text-white">✓</span>
                        )}
                      </div>
                      <span className="text-[#111827]">{step.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-col gap-3 items-center justify-center sm:flex-row">
                <Button
                  type="button"
                  className="w-70 rounded-full cursor-pointer bg-[#EF4444] text-[13px] font-medium text-white hover:bg-[#DC2626]"
                >
                  Cancel Request
                </Button>

                <Button
                  type="button"
                  className="w-70 rounded-full bg-[#7C3BED] cursor-pointer text-[13px] font-medium text-white hover:bg-[#6d28d9]"
                >
                  Contact Support
                </Button>
              </div>
            </section>
          </div>
        </Container>
      </section>
    </div>
  );
}
