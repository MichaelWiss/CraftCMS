<?php
/**
 * General Configuration
 */

use craft\helpers\App;

return [
    '*' => [
        'defaultWeekStartDay' => 1,
        'omitScriptNameInUrls' => true,
        'cpTrigger' => 'admin',
        'securityKey' => App::env('SECURITY_KEY'),
        'useEmailAsUsername' => true,
        'enableCsrfProtection' => true,
        'enableGraphQlCaching' => false,
        'allowAdminChanges' => App::env('ALLOW_ADMIN_CHANGES') ?? true,
        'disallowRobots' => App::env('ENVIRONMENT') !== 'production',
        'allowedGraphqlOrigins' => array_filter([
            App::env('FRONTEND_URL'),
        ]),
    ],
    'dev' => [
        'devMode' => true,
        'enableTemplateCaching' => false,
    ],
    'production' => [
        'devMode' => false,
        'enableTemplateCaching' => true,
    ],
];
