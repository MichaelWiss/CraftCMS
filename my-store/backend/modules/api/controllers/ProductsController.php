<?php
/**
 * Products API Controller
 */

namespace modules\api\controllers;

use Craft;
use craft\web\Controller;
use craft\elements\Entry;
use yii\web\Response;

class ProductsController extends Controller
{
    protected array|bool|int $allowAnonymous = ['index', 'view', 'view-by-slug'];
    
    public function beforeAction($action): bool
    {
        // Disable CSRF validation for API requests
        $this->enableCsrfValidation = false;
        return parent::beforeAction($action);
    }

    /**
     * GET /api/products
     */
    public function actionIndex(): Response
    {
        $this->response->format = Response::FORMAT_JSON;

        try {
            $products = Entry::find()
                ->section('products')
                ->with(['productImage'])
                ->limit(null)
                ->all();

            $data = array_map(function($product) {
                return $this->formatProduct($product);
            }, $products);

            return $this->asJson([
                'success' => true,
                'data' => $data
            ]);
        } catch (\Exception $e) {
            return $this->asJson([
                'success' => false,
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * GET /api/products/<id>
     */
    public function actionView(int $id): Response
    {
        $this->response->format = Response::FORMAT_JSON;

        try {
            $product = Entry::find()
                ->section('products')
                ->with(['productImage'])
                ->id($id)
                ->one();

            if (!$product) {
                $this->response->setStatusCode(404);
                return $this->asJson([
                    'success' => false,
                    'error' => 'Product not found'
                ]);
            }

            return $this->asJson([
                'success' => true,
                'data' => $this->formatProduct($product)
            ]);
        } catch (\Exception $e) {
            return $this->asJson([
                'success' => false,
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * GET /api/products/slug/<slug>
     */
    public function actionViewBySlug(string $slug): Response
    {
        $this->response->format = Response::FORMAT_JSON;

        try {
            $product = Entry::find()
                ->section('products')
                ->with(['productImage'])
                ->slug($slug)
                ->one();

            if (!$product) {
                $this->response->setStatusCode(404);
                return $this->asJson([
                    'success' => false,
                    'error' => 'Product not found'
                ]);
            }

            return $this->asJson([
                'success' => true,
                'data' => $this->formatProduct($product)
            ]);
        } catch (\Exception $e) {
            return $this->asJson([
                'success' => false,
                'error' => $e->getMessage()
            ]);
        }
    }

    private function formatProduct($product): array
    {
        $imageAsset = null;
        $imageField = $product->getFieldValue('productImage');
        if ($imageField instanceof \craft\elements\db\AssetQuery) {
            $imageAsset = $imageField->one();
        }

        $price = $product->getFieldValue('price');
        $descriptionField = $product->getFieldValue('description');
        $shortDescription = $descriptionField ?? $product->getFieldValue('shortDescription');

        $data = [
            'id' => $product->id,
            'title' => $product->title,
            'slug' => $product->slug,
            'url' => $product->url,
            'price' => $price !== null ? (float) $price : null,
            'description' => $this->getPlainText($shortDescription),
        ];

        if ($imageAsset) {
            $data['image'] = [
                'id' => $imageAsset->id,
                'title' => $imageAsset->title,
                'url' => $imageAsset->getUrl(),
                'width' => $imageAsset->width,
                'height' => $imageAsset->height,
            ];
        } else {
            $data['image'] = null;
        }

        return $data;
    }

    private function getPlainText($field): ?string
    {
        if ($field === null) {
            return null;
        }

        if (is_string($field)) {
            return $field;
        }

        if ($field instanceof \Twig\Markup) {
            return (string) $field;
        }

        if (is_object($field) && method_exists($field, '__toString')) {
            return (string) $field;
        }

        return null;
    }
}
