<?php
/**
 * Cart API Controller
 */

namespace modules\api\controllers;

use Craft;
use craft\web\Controller;
use craft\commerce\Plugin as Commerce;
use yii\web\Response;

class CartController extends Controller
{
    protected array|bool|int $allowAnonymous = ['index', 'add', 'update', 'remove'];
    
    public function beforeAction($action): bool
    {
        $this->enableCsrfValidation = false;
        return parent::beforeAction($action);
    }

    /**
     * GET /api/cart
     */
    public function actionIndex(): Response
    {
        $this->response->format = Response::FORMAT_JSON;

        try {
            $cart = Commerce::getInstance()->getCarts()->getCart();
            
            return $this->asJson([
                'success' => true,
                'data' => $this->formatCart($cart)
            ]);
        } catch (\Exception $e) {
            return $this->asJson([
                'success' => false,
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * POST /api/cart/add
     */
    public function actionAdd(): Response
    {
        $this->requirePostRequest();
        $this->response->format = Response::FORMAT_JSON;

        try {
            $request = Craft::$app->getRequest();
            $purchasableId = $request->getBodyParam('purchasableId');
            $qty = $request->getBodyParam('qty', 1);

            $cart = Commerce::getInstance()->getCarts()->getCart();
            
            $lineItem = Commerce::getInstance()->getLineItems()->createLineItem(
                $cart->id,
                $purchasableId,
                [],
                $qty
            );

            if (!Craft::$app->getElements()->saveElement($lineItem)) {
                throw new \Exception('Could not add item to cart');
            }

            return $this->asJson([
                'success' => true,
                'data' => $this->formatCart($cart)
            ]);
        } catch (\Exception $e) {
            return $this->asJson([
                'success' => false,
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * POST /api/cart/update
     */
    public function actionUpdate(): Response
    {
        $this->requirePostRequest();
        $this->response->format = Response::FORMAT_JSON;

        try {
            $request = Craft::$app->getRequest();
            $lineItemId = $request->getBodyParam('lineItemId');
            $qty = $request->getBodyParam('qty');

            $cart = Commerce::getInstance()->getCarts()->getCart();
            $lineItem = Commerce::getInstance()->getLineItems()->getLineItemById($lineItemId);

            if (!$lineItem || $lineItem->orderId !== $cart->id) {
                throw new \Exception('Line item not found');
            }

            $lineItem->qty = $qty;

            if (!Craft::$app->getElements()->saveElement($lineItem)) {
                throw new \Exception('Could not update line item');
            }

            return $this->asJson([
                'success' => true,
                'data' => $this->formatCart($cart)
            ]);
        } catch (\Exception $e) {
            return $this->asJson([
                'success' => false,
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * POST /api/cart/remove
     */
    public function actionRemove(): Response
    {
        $this->requirePostRequest();
        $this->response->format = Response::FORMAT_JSON;

        try {
            $request = Craft::$app->getRequest();
            $lineItemId = $request->getBodyParam('lineItemId');

            $cart = Commerce::getInstance()->getCarts()->getCart();
            $lineItem = Commerce::getInstance()->getLineItems()->getLineItemById($lineItemId);

            if (!$lineItem || $lineItem->orderId !== $cart->id) {
                throw new \Exception('Line item not found');
            }

            if (!Craft::$app->getElements()->deleteElement($lineItem)) {
                throw new \Exception('Could not remove line item');
            }

            return $this->asJson([
                'success' => true,
                'data' => $this->formatCart($cart)
            ]);
        } catch (\Exception $e) {
            return $this->asJson([
                'success' => false,
                'error' => $e->getMessage()
            ]);
        }
    }

    private function formatCart($cart): array
    {
        $lineItems = [];
        foreach ($cart->getLineItems() as $item) {
            $lineItems[] = [
                'id' => $item->id,
                'purchasableId' => $item->purchasableId,
                'qty' => $item->qty,
                'price' => $item->price,
                'subtotal' => $item->subtotal,
            ];
        }

        return [
            'id' => $cart->id,
            'number' => $cart->number,
            'lineItems' => $lineItems,
            'totalQty' => $cart->getTotalQty(),
            'itemSubtotal' => $cart->getItemSubtotal(),
            'total' => $cart->getTotal(),
        ];
    }
}
