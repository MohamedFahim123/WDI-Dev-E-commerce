"use client";

import { cn } from "@/src/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
  MessageCircle,
  RotateCcw,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Container from "@/src/components/Container/Container";
import { PageHeader } from "@/src/components/PageHeader/PageHeader";
import { Button } from "@/src/components/ui/button";

type StorePolicy = {
  id?: string;
  icon: LucideIcon;
  label: string;
  value: string;
};

interface StoreHeaderProps {
  name: string;
  logoUrl: string;
  rating?: number;
  reviewCount?: number;
  policies?: StorePolicy[];
  lang: string;
  onContactClick?: () => void;
}

const defaultPolicies: StorePolicy[] = [
  {
    id: "shipping",
    icon: Truck,
    label: "Shipping",
    value: "Free over AED 200",
  },
  {
    id: "returns",
    icon: RotateCcw,
    label: "Returns",
    value: "14 days",
  },
  {
    id: "warranty",
    icon: ShieldCheck,
    label: "Warranty",
    value: "Available",
  },
];

export function StoreHeader({
  name,
  logoUrl,
  rating,
  reviewCount,
  lang,
  policies = defaultPolicies,
  onContactClick,
}: StoreHeaderProps) {
  return (
    <section aria-labelledby="store-heading" className="w-full" role="banner">
      <PageHeader
        title="Store"
        breadcrumb={[{ label: "Home", href: `/${lang}` }, { label: "Store" }]}
      />

      <div className="w-full bg-white">
        <Image src={"/assets/banners/store-bg.webp"} alt="Store Bg" height={100} width={1300} className="h-40 w-full object-cover" aria-hidden="true" />

        <Container>
          <div className="-mt-10 flex flex-col items-start gap-4 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm ring-4 ring-[#f3f3f3]">
                <Image
                  src={logoUrl}
                  alt={`${name} logo`}
                  width={72}
                  height={72}
                  className="h-18 w-18 rounded-full object-cover"
                  priority
                />
              </div>

              <div className="pt-12">
                <p className="text-lg font-semibold leading-tight text-foreground">
                  {name}
                </p>

                {typeof rating === "number" &&
                  typeof reviewCount === "number" && (
                    <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <Star
                        className="h-3 w-3 fill-yellow-400 text-yellow-400"
                        aria-hidden="true"
                      />
                      <span className="font-semibold">{rating.toFixed(1)}</span>
                      <span aria-hidden="true">/</span>
                      <span>5</span>
                      <span>({reviewCount.toLocaleString()} reviews)</span>
                    </div>
                  )}
              </div>
            </div>

            <Button
              type="button"
              size="sm"
              className="cursor-pointer transition-all duration-all mt-1 inline-flex items-center gap-2 rounded-full bg-[#7C3BED] px-4 text-xs font-medium text-white shadow-sm hover:bg-white hover:text-[#7C3BED] sm:mt-0"
              onClick={onContactClick}
              aria-label={`Contact seller of ${name}`}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Contact Seller</span>
            </Button>
          </div>
        </Container>

        {policies.length > 0 && (
          <div className="border-y border-[#f2f2f2] bg-white">
            <Container>
              <ul className="grid gap-4 py-3 text-xs text-muted-foreground sm:grid-cols-3">
                {policies.map((policy, index) => {
                  const Icon = policy.icon;
                  return (
                    <li
                      key={policy.id ?? index}
                      className={cn(
                        "flex items-center  gap-3",
                        index !== 0 && "sm:border-l sm:border-[#f2f2f2] sm:pl-6"
                      )}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C3BED]">
                        <Icon
                          className="h-4 w-4 text-white"
                          aria-hidden="true"
                        />
                      </span>

                      <span className="flex gap-1">
                        <span className="font-medium text-foreground">
                          {policy.label}:
                        </span>
                        <strong className="font-bold">{policy.value}</strong>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Container>
          </div>
        )}
      </div>
    </section>
  );
}

