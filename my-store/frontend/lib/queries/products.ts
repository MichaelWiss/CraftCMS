/**
 * GraphQL Queries for Craft CMS
 */

import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts {
    entries(section: "products") {
      id
      title
      slug
      url
      ... on products_Product_Entry {
        productDescription
        productPrice
        productImage {
          url
          title
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: [String]) {
    entry(section: "products", slug: $slug) {
      id
      title
      slug
      url
      ... on products_Product_Entry {
        productDescription
        productPrice
        productImage {
          url
          title
          width
          height
        }
        productGallery {
          url
          title
        }
      }
    }
  }
`;

export const GET_PRODUCT_VARIANTS = gql`
  query GetProductVariants($productId: [QueryArgument]) {
    variants(relatedToEntries: { id: $productId }) {
      id
      sku
      price
      stock
      isDefault
    }
  }
`;
