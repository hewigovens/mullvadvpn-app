import * as React from 'react';
import AccountExpiry from '../../shared/account-expiry';
import { messages } from '../../shared/gettext';
import {
  AccountContainer,
  AccountFooter,
  AccountOutOfTime,
  AccountRow,
  AccountRowLabel,
  AccountRowValue,
  StyledBuyCreditButton,
  StyledContainer,
  StyledRedeemVoucherButton,
} from './AccountStyles';
import AccountTokenLabel from './AccountTokenLabel';
import * as AppButton from './AppButton';
import { Layout } from './Layout';
import { ModalContainer } from './Modal';
import { BackBarItem, NavigationBar, NavigationItems } from './NavigationBar';
import SettingsHeader, { HeaderTitle } from './SettingsHeader';

import { AccountToken } from '../../shared/daemon-rpc-types';

interface IProps {
  accountToken?: AccountToken;
  accountExpiry?: string;
  expiryLocale: string;
  isOffline: boolean;
  onLogout: () => void;
  onClose: () => void;
  onBuyMore: () => Promise<void>;
}

export default class Account extends React.Component<IProps> {
  public render() {
    return (
      <ModalContainer>
        <Layout>
          <StyledContainer>
            <NavigationBar>
              <NavigationItems>
                <BackBarItem action={this.props.onClose}>
                  {
                    // TRANSLATORS: Back button in navigation bar
                    messages.pgettext('navigation-bar', 'Settings')
                  }
                </BackBarItem>
              </NavigationItems>
            </NavigationBar>

            <AccountContainer>
              <SettingsHeader>
                <HeaderTitle>{messages.pgettext('account-view', 'Account')}</HeaderTitle>
              </SettingsHeader>

              <AccountRow>
                <AccountRowLabel>
                  {messages.pgettext('account-view', 'Account number')}
                </AccountRowLabel>
                <AccountRowValue
                  as={AccountTokenLabel}
                  accountToken={this.props.accountToken || ''}
                />
              </AccountRow>

              <AccountRow>
                <AccountRowLabel>{messages.pgettext('account-view', 'Paid until')}</AccountRowLabel>
                <FormattedAccountExpiry
                  expiry={this.props.accountExpiry}
                  locale={this.props.expiryLocale}
                />
              </AccountRow>

              <AccountFooter>
                <AppButton.BlockingButton
                  disabled={this.props.isOffline}
                  onClick={this.props.onBuyMore}>
                  <StyledBuyCreditButton>
                    <AppButton.Label>{messages.gettext('Buy more credit')}</AppButton.Label>
                    <AppButton.Icon source="icon-extLink" height={16} width={16} />
                  </StyledBuyCreditButton>
                </AppButton.BlockingButton>

                <StyledRedeemVoucherButton />

                <AppButton.RedButton onClick={this.props.onLogout}>
                  {messages.pgettext('account-view', 'Log out')}
                </AppButton.RedButton>
              </AccountFooter>
            </AccountContainer>
          </StyledContainer>
        </Layout>
      </ModalContainer>
    );
  }
}

function FormattedAccountExpiry(props: { expiry?: string; locale: string }) {
  if (props.expiry) {
    const expiry = new AccountExpiry(props.expiry, props.locale);

    if (expiry.hasExpired()) {
      return (
        <AccountOutOfTime>{messages.pgettext('account-view', 'OUT OF TIME')}</AccountOutOfTime>
      );
    } else {
      return <AccountRowValue>{expiry.formattedDate()}</AccountRowValue>;
    }
  } else {
    return (
      <AccountRowValue>
        {messages.pgettext('account-view', 'Currently unavailable')}
      </AccountRowValue>
    );
  }
}
