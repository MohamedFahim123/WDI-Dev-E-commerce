import Image from "next/image";
import Link from "next/link";

export interface NotificationItemProps {
  id: string;
  title: string;
  timeLabel: string;
  iconSrc: string;
  iconAlt: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function NotificationItem({
  title,
  timeLabel,
  iconSrc,
  iconAlt,
  ctaLabel,
  ctaHref,
}: NotificationItemProps) {
  return (
    <li>
      <article className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] border border-[#E4E4E7]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFD54F] overflow-hidden">
            <Image
              src={iconSrc}
              alt={iconAlt}
              width={50}
              height={50}
              className="h-full w-full object-contain"
            />
          </div>

          <div>
            <h2 className="text-sm font-medium text-foreground">{title}</h2>
            {ctaHref && ctaLabel && (
              <h3>
                <Link
                  href={ctaHref}
                  className="mt-1 inline-block text-xs font-semibold text-[#7C3BED] hover:underline"
                >
                  {ctaLabel} &gt;
                </Link>
              </h3>
            )}
          </div>
        </div>

        <time className="ml-4 whitespace-nowrap text-xs text-muted-foreground">
          {timeLabel}
        </time>
      </article>
    </li>
  );
}
