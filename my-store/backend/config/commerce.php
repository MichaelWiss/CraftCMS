<?php
/**
 * Commerce Configuration
 */

use craft\helpers\App;

return [
    '*' => [
        'autoSetNewCartAddresses' => true,
        'autoSetCartShippingMethodOption' => true,
        'autoSetPaymentSource' => true,
        'purgeInactiveCarts' => true,
        'purgeInactiveCartsDuration' => 'P3M', // 3 months
        'gatewayPostRedirectTemplate' => '',
        'useBillingAddressForTax' => false,
        'validateBusinessTaxIdAsVatId' => false,
        'pdfAllowRemoteImages' => false,
        'requireShippingAddressAtCheckout' => true,
        'requireBillingAddressAtCheckout' => true,
        'requireShippingMethodSelectionAtCheckout' => true,
    ],
];
