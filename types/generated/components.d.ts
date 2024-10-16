import type { Schema, Attribute } from '@strapi/strapi';

export interface PricesPrice extends Schema.Component {
  collectionName: 'components_prices_prices';
  info: {
    displayName: 'price';
    description: '';
  };
  attributes: {
    june: Attribute.BigInteger;
    july: Attribute.BigInteger;
    august: Attribute.BigInteger;
    september: Attribute.BigInteger;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'prices.price': PricesPrice;
    }
  }
}
