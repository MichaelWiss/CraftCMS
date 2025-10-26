<?php
/**
 * API Module for custom JSON endpoints
 */

namespace modules\api;

use Craft;
use craft\helpers\App;
use yii\base\Module as BaseModule;
use yii\web\Response;

class Module extends BaseModule
{
    public function init()
    {
        parent::init();
        
        // Set the controllerNamespace based on whether this is a console or web request
        if (Craft::$app->getRequest()->getIsConsoleRequest()) {
            $this->controllerNamespace = 'modules\\api\\console\\controllers';
        } else {
            $this->controllerNamespace = 'modules\\api\\controllers';
        }

        // Add CORS headers for frontend
        $this->addCorsHeaders();
    }

    private function addCorsHeaders()
    {
        $request = Craft::$app->getRequest();
        if ($request->getIsConsoleRequest()) {
            return;
        }

        $response = Craft::$app->getResponse();
        $frontendUrl = App::env('FRONTEND_URL') ?: 'http://localhost:3000';

        $headers = $response->getHeaders();
        $headers->set('Access-Control-Allow-Origin', $frontendUrl);
        $headers->set('Vary', 'Origin');
        $headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        $headers->set('Access-Control-Allow-Credentials', 'true');
        $headers->set('Access-Control-Max-Age', '86400');

        if ($request->getMethod() === 'OPTIONS') {
            $response->setStatusCode(Response::HTTP_NO_CONTENT);
            $response->format = Response::FORMAT_RAW;
            Craft::$app->end();
        }
    }
}
