import type { BackendNotification } from "@/src/types/notification.types";
import type { NotificationItemProps } from "@/src/components/Notifications/NotificationItem/NotificationItem";

function toNum(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() && Number.isFinite(Number(v)))
    return Number(v);
  return null;
}

function toStr(v: unknown): string | undefined {
  return typeof v === "string" ? v : undefined;
}

function toBool(v: unknown): boolean | null {
  if (typeof v === "boolean") return v;
  if (v === 0 || v === 1) return Boolean(v);
  if (typeof v === "string") {
    if (v === "true") return true;
    if (v === "false") return false;
  }
  return null;
}

function timeAgo(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const ms = Date.now() - d.getTime();
  if (!Number.isFinite(ms)) return "";
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  return `${days}d ago`;
}

export function mapBackendToItem(
  raw: BackendNotification,
  lang: string,
): (NotificationItemProps & { _idNum: number; _isRead: boolean }) | null {
  const idNum =
    toNum(raw.id) ?? toNum(raw.notification_id) ?? toNum(raw.notificationId);
  if (idNum == null) return null;

  const title =
    toStr(raw.title) ?? toStr(raw.subject) ?? toStr(raw.name) ?? "Notification";

  const createdAt =
    toStr(raw.created_at) ?? toStr(raw.createdAt) ?? toStr(raw.date);

  const isRead =
    toBool(raw.is_read) ?? toBool(raw.isRead) ?? toBool(raw.read) ?? false;

  const ctaHref =
    toStr(raw.action_url) ?? toStr(raw.actionUrl) ?? toStr(raw.url);

  const ctaLabel =
    toStr(raw.action_label) ?? toStr(raw.actionLabel) ?? undefined;

  const iconSrc =
    toStr(raw.image_url) ??
    toStr(raw.imageUrl) ??
    toStr(raw.icon) ??
    "/assets/products/prod7.webp";

  const iconAlt = toStr(raw.icon_alt) ?? "notification";

  return {
    id: String(idNum),
    title,
    timeLabel: timeAgo(createdAt),
    iconSrc,
    iconAlt,
    ctaLabel: ctaLabel ?? (ctaHref ? "View" : undefined),
    ctaHref: ctaHref ?? `/${lang}/notifications`,
    _idNum: idNum,
    _isRead: isRead,
  };
}
export function mapBackendToUiItem(
  raw: BackendNotification,
  lang: string
): NotificationItemProps | null {
  const mapped = mapBackendToItem(raw, lang);
  if (!mapped) return null;
  const { _idNum, _isRead, ...ui } = mapped;
  return ui;
}