"use client";

import {
    Cake,
    Crown,
    MessageCircle,
    ShoppingBag,
    Star,
    TrendingUp,
    Users
} from "lucide-react";

const earnRules = [
  {
    id: 1,
    title: "Shop & Earn",
    description: "Earn 1 point for every AED 1 spent",
    icon: ShoppingBag,
  },
  {
    id: 2,
    title: "Write Reviews",
    description: "Earn 50 points for each review",
    icon: MessageCircle,
  },
  {
    id: 3,
    title: "Refer Friends",
    description: "Earn 200 points per referral",
    icon: Users,
  },
  {
    id: 4,
    title: "Birthday Bonus",
    description: "Earn 500 points on your birthday",
    icon: Cake,
  },
];

const rewards = [
  {
    id: 1,
    title: "AED 50 Voucher",
    description: "AED 50 off your next purchase",
    points: 500,
  },
  {
    id: 2,
    title: "Free Shipping",
    description: "Free shipping on your next order",
    points: 300,
  },
  {
    id: 3,
    title: "AED 100 Voucher",
    description: "AED 100 off your next purchase",
    points: 1000,
  },
  {
    id: 4,
    title: "Premium Gift",
    description: "Exclusive branded merchandise",
    points: 3000,
  },
];

export default function LoyaltyProgramSection() {
  const currentPoints = 2450;
  const nextTierPoints = 3000;
  const remainingPoints = nextTierPoints - currentPoints;
  const progress = Math.min(
    100,
    Math.round((currentPoints / nextTierPoints) * 100)
  );

  return (
    <section className="space-y-6">
      <h1 className="text-xl font-semibold text-gray-900">Loyalty Program</h1>

      <article className="rounded-2xl border border-[#E5E7EB] bg-[#faf5ff] px-5 py-4 shadow-sm space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
              <Crown className="h-5 w-5 text-[#8b5cf6]" />
            </div>
            <div className="space-y-1">
              <p className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                Gold Member
              </p>
              <p className="text-xs text-gray-500">
                Keep shopping to unlock more benefits
              </p>
            </div>
          </div>

          <div className="text-right space-y-1">
            <p className="text-3xl font-semibold tracking-tight text-[#8b5cf6]">
              {currentPoints}
            </p>
            <p className="text-xs font-medium text-gray-500">Total Points</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Progress to Platinum</span>
            <span>{remainingPoints} points to go</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#ede9fe]">
            <div
              className="h-full rounded-full bg-[#8b5cf6]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </article>

      <article className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 shadow-sm space-y-4">
        <header className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f5f3ff]">
            <TrendingUp className="h-4 w-4 text-[#8b5cf6]" />
          </div>
          <h2 className="text-sm font-semibold text-gray-900">
            How to Earn Points
          </h2>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {earnRules.map(({ id, title, description, icon: Icon }) => (
            <div key={id} className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f3ff] text-xs font-semibold text-[#8b5cf6]">
                {id}
              </div>
              <div className="space-y-0.5">
                <p className="flex items-center gap-1 text-sm font-medium text-gray-900">
                  {title}
                  {Icon && <Icon className="h-3.5 w-3.5 text-[#a855f7]" />}
                </p>
                <p className="text-xs text-gray-500">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </article>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-900">
          Redeem Your Points
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {rewards.map((reward) => (
            <article
              key={reward.id}
              className="flex flex-col justify-between rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {reward.title}
                  </p>
                  <p className="text-xs text-gray-500">{reward.description}</p>
                </div>
                <button
                  type="button"
                  aria-label="Save reward"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#a855f7] hover:bg-[#f5f3ff]"
                >
                  <Star className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-xs font-medium text-gray-700">
                  {reward.points.toLocaleString()} points
                </p>
                <button
                  type="button"
                  className="inline-flex h-9 items-center justify-center rounded-full bg-[#8b5cf6] px-4 text-xs font-semibold text-white hover:bg-[#7c3aed] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6]/60 focus-visible:ring-offset-2"
                >
                  Redeem Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
