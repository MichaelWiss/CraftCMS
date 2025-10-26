<?php
/**
 * Craft CMS Bootstrap
 */

// Set path constants
define('CRAFT_BASE_PATH', dirname(__DIR__));
define('CRAFT_VENDOR_PATH', CRAFT_BASE_PATH . '/vendor');

// Load Composer's autoloader
require_once CRAFT_VENDOR_PATH . '/autoload.php';

// Load the .env file
if (file_exists(CRAFT_BASE_PATH . '/.env')) {
    (Dotenv\Dotenv::createUnsafeImmutable(CRAFT_BASE_PATH))->load();
}

// Set the environment
define('CRAFT_ENVIRONMENT', getenv('ENVIRONMENT') ?: 'production');
