<?php
/**
 * Site URL Rules
 */

return [
    // API Routes
    'api/products' => 'api/products/index',
    'api/products/<id:\d+>' => 'api/products/view',
    'api/cart' => 'api/cart/index',
    'api/cart/add' => 'api/cart/add',
    'api/cart/update' => 'api/cart/update',
    'api/cart/remove' => 'api/cart/remove',
    'api/checkout' => 'api/checkout/index',
    
    // GraphQL endpoint is already handled by Craft
];
