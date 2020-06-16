import { sprintf } from 'sprintf-js';
import { links } from '../../config.json';
import { messages } from '../../shared/gettext';
import { AccountExpiryFormatter } from '../account-expiry';
import {
  InAppNotification,
  InAppNotificationProvider,
  SystemNotification,
  SystemNotificationProvider,
} from './notification';

interface CloseToAccountExpiryNotificationContext {
  accountExpiry: AccountExpiryFormatter;
  tooSoon?: boolean;
}

export class CloseToAccountExpiryNotificationProvider
  implements InAppNotificationProvider, SystemNotificationProvider {
  public constructor(private context: CloseToAccountExpiryNotificationContext) {}

  public mayDisplay() {
    return (
      !this.context.accountExpiry.hasExpired() &&
      this.context.accountExpiry.willHaveExpiredInThreeDays() &&
      !this.context.tooSoon
    );
  }

  public getSystemNotification(): SystemNotification {
    const message = sprintf(
      // TRANSLATORS: The system notification displayed to the user when the account credit is close to expiry.
      // TRANSLATORS: Available placeholder:
      // TRANSLATORS: %(duration)s - remaining time, e.g. "2 days"
      messages.pgettext('notifications', 'Account credit expires in %(duration)s'),
      {
        duration: this.context.accountExpiry.remainingTime(),
      },
    );

    return {
      message,
      critical: true,
      action: { type: 'open-url', url: links.purchase, withAuth: true },
    };
  }

  public getInAppNotification(): InAppNotification {
    return {
      indicator: 'warning',
      title: messages.pgettext('in-app-notifications', 'ACCOUNT CREDIT EXPIRES SOON'),
      subtitle: this.context.accountExpiry.remainingTime(true),
      action: { type: 'open-url', url: links.purchase, withAuth: true },
    };
  }
}
