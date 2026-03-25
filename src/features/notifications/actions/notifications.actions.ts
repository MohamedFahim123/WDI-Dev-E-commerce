"use server";

import {
    getNotificationsServer,
    getUnreadCountServer,
    markAllReadServer,
    markReadServer,
} from "@/src/services/notifications.service";
import type { NotificationsQuery } from "@/src/types/notification.types";

export async function notificationsListAction(q: NotificationsQuery) {
  return getNotificationsServer(q);
}

export async function notificationsUnreadCountAction() {
  return getUnreadCountServer();
}

export async function notificationsMarkReadAction(ids: number[]) {
  return markReadServer(ids);
}

export async function notificationsMarkAllReadAction() {
  return markAllReadServer();
}
