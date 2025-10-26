<?php
/**
 * Checkout API Controller
 */

namespace modules\api\controllers;

use Craft;
use craft\web\Controller;
use craft\commerce\Plugin as Commerce;
use yii\web\Response;

class CheckoutController extends Controller
{
    protected array|bool|int $allowAnonymous = ['index'];
    
    public function beforeAction($action): bool
    {
        $this->enableCsrfValidation = false;
        return parent::beforeAction($action);
    }

    /**
     * POST /api/checkout
     */
    public function actionIndex(): Response
    {
        $this->requirePostRequest();
        $this->response->format = Response::FORMAT_JSON;

        try {
            $request = Craft::$app->getRequest();
            $cart = Commerce::getInstance()->getCarts()->getCart();

            // Set customer email
            $email = $request->getBodyParam('email');
            if ($email) {
                $cart->setEmail($email);
            }

            // Set shipping address
            $shippingAddress = $request->getBodyParam('shippingAddress');
            if ($shippingAddress) {
                $address = new \craft\commerce\models\Address();
                $address->setAttributes($shippingAddress, false);
                $cart->setShippingAddress($address);
            }

            // Set billing address
            $billingAddress = $request->getBodyParam('billingAddress');
            if ($billingAddress) {
                $address = new \craft\commerce\models\Address();
                $address->setAttributes($billingAddress, false);
                $cart->setBillingAddress($address);
            }

            $gatewaysService = Commerce::getInstance()->getGateways();
            $gatewayId = $request->getBodyParam('gatewayId');
            if ($gatewayId) {
                $cart->gatewayId = (int) $gatewayId;
            } elseif (!$cart->gatewayId) {
                $defaultGatewayId = $gatewaysService->getDefaultGatewayId();
                if ($defaultGatewayId) {
                    $cart->gatewayId = $defaultGatewayId;
                }
            }

            // Persist cart changes before attempting payment
            if (!Craft::$app->getElements()->saveElement($cart)) {
                throw new \Exception('Could not save cart');
            }

            $paymentsService = Commerce::getInstance()->getPayments();
            $paymentSourceId = $request->getBodyParam('paymentSourceId');
            $paymentForm = (array) $request->getBodyParam('paymentForm', []);

            if ($paymentSourceId) {
                $result = $paymentsService->payOrderByPaymentSourceId($cart, (int) $paymentSourceId);
            } else {
                $result = $paymentsService->processPayment($cart, $paymentForm);
            }

            if ($result !== true) {
                return $this->asJson([
                    'success' => false,
                    'error' => 'Unable to process payment.',
                    'data' => [
                        'paymentForm' => $paymentForm,
                        'requiresAction' => $result,
                    ],
                ]);
            }

            if (!$cart->isCompleted) {
                Commerce::getInstance()->getOrders()->completeOrder($cart);
            }

            return $this->asJson([
                'success' => true,
                'data' => [
                    'orderId' => $cart->id,
                    'orderNumber' => $cart->number,
                    'customerEmail' => $cart->email,
                ]
            ]);
        } catch (\Throwable $e) {
            Craft::error($e->getMessage(), __METHOD__);

            return $this->asJson([
                'success' => false,
                'error' => $e->getMessage()
            ]);
        }
    }
}
