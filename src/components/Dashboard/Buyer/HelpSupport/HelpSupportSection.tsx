"use client";

import {
  MessageCircle,
  Phone,
  Mail,
  FileText,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: "How do I track my order?",
    answer:
      "You can track your order from the ‘Orders’ section in your account. Once shipped, you’ll see a tracking number and link.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 14 days of delivery as long as items are unused, in original packaging, and with all tags attached.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping usually takes 2–5 business days depending on your location. Express options may be available at checkout.",
  },
  {
    question: "Can I change my order after placing it?",
    answer:
      "If your order hasn’t been processed yet, you can modify or cancel it from the ‘Orders’ page. Otherwise, please contact support.",
  },
  {
    question: "Do you offer Cash on Delivery?",
    answer:
      "Cash on Delivery is available in selected regions. You’ll see the option at checkout if it’s supported for your address.",
  },
];

export default function HelpSupportSection() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (question: string) => {
    setOpenFaq((prev) => (prev === question ? null : question));
  };

  return (
    <section className="space-y-6">
      <h1 className="text-lg font-semibold text-gray-900">
        Help &amp; Support
      </h1>

      <section className="grid gap-4 md:grid-cols-3">
        <SupportChannelCard
          icon={MessageCircle}
          title="Live Chat"
          description="Chat with our support team"
          buttonLabel="Start Chat"
        />
        <SupportChannelCard
          icon={Phone}
          title="Phone Support"
          description="+971 4 123 4567"
          buttonLabel="Call Now"
        />
        <SupportChannelCard
          icon={Mail}
          title="Email Support"
          description="support@shop.com"
          buttonLabel="Send Email"
        />
      </section>

      <QuickLinksCard />

      <article className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 shadow-sm">
        <header className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f5f3ff]">
            <HelpCircle className="h-4 w-4 text-[#8b5cf6]" />
          </div>
          <h2 className="text-sm font-semibold text-gray-900">
            Frequently Asked Questions
          </h2>
        </header>

        <div className="divide-y divide-[#E5E7EB]">
          {faqItems.map((item) => {
            const isOpen = openFaq === item.question;
            return (
              <button
                key={item.question}
                type="button"
                onClick={() => toggleFaq(item.question)}
                className="flex w-full flex-col items-stretch py-3 text-left"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-900">{item.question}</span>
                  <ChevronDown
                    className={clsx(
                      "h-4 w-4 text-gray-400 transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </div>
                {isOpen && (
                  <p className="mt-2 text-xs text-gray-500">{item.answer}</p>
                )}
              </button>
            );
          })}
        </div>
      </article>
    </section>
  );
}

type SupportChannelCardProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  buttonLabel: string;
};

function SupportChannelCard({
  icon: Icon,
  title,
  description,
  buttonLabel,
}: SupportChannelCardProps) {
  return (
    <article className="flex flex-col items-center rounded-2xl border border-[#E5E7EB] bg-white px-4 py-5 text-center shadow-sm">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f3ff]">
        <Icon className="h-5 w-5 text-[#8b5cf6]" />
      </div>
      <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      <p className="mt-1 text-xs text-gray-500">{description}</p>
      <button
        type="button"
        className="mt-4 inline-flex h-8 items-center justify-center rounded-full bg-[#F3F4F6] px-4 text-xs font-medium text-gray-900 hover:bg-[#E5E7EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6]/60 focus-visible:ring-offset-2"
      >
        {buttonLabel}
      </button>
    </article>
  );
}

function QuickLinksCard() {
  const links = [
    "Return & Refund Policy",
    "Shipping Information",
    "Terms & Conditions",
    "Privacy Policy",
  ];

  return (
    <article className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-gray-900">Quick Links</h2>
      <div className="grid gap-x-10 gap-y-2 md:grid-cols-2">
        {links.map((label) => (
          <button
            key={label}
            type="button"
            className="flex items-center gap-2 text-xs text-gray-700 hover:text-[#7C3BED]"
          >
            <FileText className="h-4 w-4 text-gray-400" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </article>
  );
}
