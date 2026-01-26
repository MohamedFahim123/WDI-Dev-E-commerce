export type BackendApiResponse<T> = {
  success?: boolean;
  message?: string;
  data?: T;
};

export type NotificationsQuery = {
  unread_only?: boolean;
  limit?: number;
  offset?: number;
};

export type BackendNotification = Record<string, unknown>;

export type NotificationsListData = {
  notifications?: BackendNotification[];
  items?: BackendNotification[]; 
  total?: number;
  count?: number;
  limit?: number;
  offset?: number;
};

export type UnreadCountData = {
  unread_count?: number;
  count?: number;
};

export type MarkOkData = {
  ok?: boolean;
};
