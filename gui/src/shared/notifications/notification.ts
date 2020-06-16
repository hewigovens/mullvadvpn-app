export type NotificationAction = { type: 'open-url'; url: string; withAuth?: boolean };

export type InAppNotificationIndicatorType = 'success' | 'warning' | 'error';

interface NotificationProvider {
  mayDisplay(): boolean;
}

export interface SystemNotification {
  message: string;
  critical: boolean;
  presentOnce?: { value: boolean; name: string };
  suppressInDevelopment?: boolean;
  action?: NotificationAction;
}

export interface InAppNotification {
  indicator: InAppNotificationIndicatorType;
  title: string;
  subtitle?: string;
  action?: NotificationAction;
}

export interface SystemNotificationProvider extends NotificationProvider {
  getSystemNotification(): SystemNotification | undefined;
}

export interface InAppNotificationProvider extends NotificationProvider {
  getInAppNotification(): InAppNotification | undefined;
}

export * from './accountExpired';
export * from './closeToAccountExpiry';
export * from './blockWhenDisconnected';
export * from './connected';
export * from './connecting';
export * from './disconnected';
export * from './error';
export * from './inconsistentVersion';
export * from './reconnecting';
export * from './unsupportedVersion';
export * from './updateAvailable';
