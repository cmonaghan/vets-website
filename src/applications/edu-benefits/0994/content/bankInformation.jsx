import React from 'react';
import AdditionalInfo from '@department-of-veterans-affairs/formation-react/AdditionalInfo';

export const bankInfoTitle = <h4>Bank Information</h4>;

export const bankInfoDescription =
  'This is the bank account information we have on file for you and will use to pay you.';
export const bankInfoNote = (
  <p>
    <strong>Note: </strong>
    Changes you make to the information on this page will update your bank
    account information for all benefits you receive from VA, including
    Compensation, Pension and Education.
  </p>
);

const gaBankInfoHelpText = () => {
  window.dataLayer.push({
    event: 'form-help-text-clicked',
    'help-text-label': 'What if I don’t have a bank account?',
  });
};

export const bankInfoHelpText = (
  <AdditionalInfo
    triggerText="What if I don’t have a bank account?"
    onClick={gaBankInfoHelpText}
  >
    The Department of Treasury requires all federal benefit payments be made by
    electronic funds transfer (EFT), also called direct deposit. If you do not
    have a bank account, you must receive your payment through Direct Express
    Debit MasterCard. To request a Direct Express Debit MasterCard, apply at{' '}
    <a href="www.usdirectexpress.com">Direct Express</a> or call 1-800-333-1795.
    If you elect not to enroll, you must contact representatives handling waiver
    requests for the Department of Treasury at 1-888-224-2950. They will
    encourage your participation in EFT and address any questions or concerns
    you may have.
  </AdditionalInfo>
);
