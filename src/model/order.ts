export interface Order {
  id: number;
  email: string;
  closed_at?: null;
  created_at: string;
  updated_at: string;
  number: number;
  note?: null;
  token: string;
  gateway?: null;
  test: boolean;
  total_price: string;
  subtotal_price: string;
  total_weight: number;
  total_tax: string;
  taxes_included: boolean;
  currency: string;
  financial_status: string;
  confirmed: boolean;
  total_discounts: string;
  total_line_items_price: string;
  cart_token?: null;
  buyer_accepts_marketing: boolean;
  name: string;
  referring_site?: null;
  landing_site?: null;
  cancelled_at: string;
  cancel_reason: string;
  total_price_usd?: null;
  checkout_token?: null;
  reference?: null;
  user_id?: null;
  location_id?: null;
  source_identifier?: null;
  source_url?: null;
  processed_at?: null;
  device_id?: null;
  phone?: null;
  customer_locale: string;
  app_id?: null;
  browser_ip?: null;
  landing_site_ref?: null;
  order_number: number;
  discount_applications?: DiscountApplicationsEntity[] | null;
  discount_codes?: null[] | null;
  note_attributes?: null[] | null;
  payment_gateway_names?: string[] | null;
  processing_method: string;
  checkout_id?: null;
  source_name: string;
  fulfillment_status: string;
  tax_lines?: null[] | null;
  tags: string;
  contact_email: string;
  order_status_url: string;
  presentment_currency: string;
  total_line_items_price_set: PriceSetOrTotalDiscountSetOrAmountSetOrDiscountedPriceSetOrTotalLineItemsPriceSetOrTotalDiscountsSetOrTotalShippingPriceSetOrSubtotalPriceSetOrTotalPriceSetOrTotalTaxSet;
  total_discounts_set: PriceSetOrTotalDiscountSetOrAmountSetOrDiscountedPriceSetOrTotalLineItemsPriceSetOrTotalDiscountsSetOrTotalShippingPriceSetOrSubtotalPriceSetOrTotalPriceSetOrTotalTaxSet;
  total_shipping_price_set: PriceSetOrTotalDiscountSetOrAmountSetOrDiscountedPriceSetOrTotalLineItemsPriceSetOrTotalDiscountsSetOrTotalShippingPriceSetOrSubtotalPriceSetOrTotalPriceSetOrTotalTaxSet;
  subtotal_price_set: PriceSetOrTotalDiscountSetOrAmountSetOrDiscountedPriceSetOrTotalLineItemsPriceSetOrTotalDiscountsSetOrTotalShippingPriceSetOrSubtotalPriceSetOrTotalPriceSetOrTotalTaxSet;
  total_price_set: PriceSetOrTotalDiscountSetOrAmountSetOrDiscountedPriceSetOrTotalLineItemsPriceSetOrTotalDiscountsSetOrTotalShippingPriceSetOrSubtotalPriceSetOrTotalPriceSetOrTotalTaxSet;
  total_tax_set: PriceSetOrTotalDiscountSetOrAmountSetOrDiscountedPriceSetOrTotalLineItemsPriceSetOrTotalDiscountsSetOrTotalShippingPriceSetOrSubtotalPriceSetOrTotalPriceSetOrTotalTaxSet;
  line_items?: LineItemsEntity[] | null;
  fulfillments?: null[] | null;
  refunds?: null[] | null;
  total_tip_received: string;
  original_total_duties_set?: null;
  current_total_duties_set?: null;
  admin_graphql_api_id: string;
  shipping_lines?: ShippingLinesEntity[] | null;
  billing_address: BillingAddressOrShippingAddress;
  shipping_address: BillingAddressOrShippingAddress;
  customer: Customer;
}

export interface DiscountApplicationsEntity {
  type: string;
  value: string;
  value_type: string;
  allocation_method: string;
  target_selection: string;
  target_type: string;
  description: string;
  title: string;
}

export interface PriceSetOrTotalDiscountSetOrAmountSetOrDiscountedPriceSetOrTotalLineItemsPriceSetOrTotalDiscountsSetOrTotalShippingPriceSetOrSubtotalPriceSetOrTotalPriceSetOrTotalTaxSet {
  shop_money: ShopMoneyOrPresentmentMoney;
  presentment_money: ShopMoneyOrPresentmentMoney;
}

export interface ShopMoneyOrPresentmentMoney {
  amount: string;
  currency_code: string;
}

export interface LineItemsEntity {
  id: number;
  variant_id: number;
  title: string;
  quantity: number;
  sku: string;
  variant_title?: null;
  vendor?: null;
  fulfillment_service: string;
  product_id: number;
  requires_shipping: boolean;
  taxable: boolean;
  gift_card: boolean;
  name: string;
  variant_inventory_management: string;
  properties?: null[] | null;
  product_exists: boolean;
  fulfillable_quantity: number;
  grams: number;
  price: string;
  total_discount: string;
  fulfillment_status?: null;
  price_set: PriceSetOrTotalDiscountSetOrAmountSetOrDiscountedPriceSetOrTotalLineItemsPriceSetOrTotalDiscountsSetOrTotalShippingPriceSetOrSubtotalPriceSetOrTotalPriceSetOrTotalTaxSet;
  total_discount_set: PriceSetOrTotalDiscountSetOrAmountSetOrDiscountedPriceSetOrTotalLineItemsPriceSetOrTotalDiscountsSetOrTotalShippingPriceSetOrSubtotalPriceSetOrTotalPriceSetOrTotalTaxSet;
  discount_allocations?: (DiscountAllocationsEntity | null)[] | null;
  duties?: null[] | null;
  admin_graphql_api_id: string;
  tax_lines?: null[] | null;
}

export interface DiscountAllocationsEntity {
  amount: string;
  discount_application_index: number;
  amount_set: PriceSetOrTotalDiscountSetOrAmountSetOrDiscountedPriceSetOrTotalLineItemsPriceSetOrTotalDiscountsSetOrTotalShippingPriceSetOrSubtotalPriceSetOrTotalPriceSetOrTotalTaxSet;
}

export interface ShippingLinesEntity {
  id: number;
  title: string;
  price: string;
  code?: null;
  source: string;
  phone?: null;
  requested_fulfillment_service_id?: null;
  delivery_category?: null;
  carrier_identifier?: null;
  discounted_price: string;
  price_set: PriceSetOrTotalDiscountSetOrAmountSetOrDiscountedPriceSetOrTotalLineItemsPriceSetOrTotalDiscountsSetOrTotalShippingPriceSetOrSubtotalPriceSetOrTotalPriceSetOrTotalTaxSet;
  discounted_price_set: PriceSetOrTotalDiscountSetOrAmountSetOrDiscountedPriceSetOrTotalLineItemsPriceSetOrTotalDiscountsSetOrTotalShippingPriceSetOrSubtotalPriceSetOrTotalPriceSetOrTotalTaxSet;
  discount_allocations?: null[] | null;
  tax_lines?: null[] | null;
}

export interface BillingAddressOrShippingAddress {
  first_name: string;
  address1: string;
  phone: string;
  city: string;
  zip: string;
  province: string;
  country: string;
  last_name: string;
  address2?: null;
  company: string;
  latitude?: null;
  longitude?: null;
  name: string;
  country_code: string;
  province_code: string;
}

export interface Customer {
  id: number;
  email: string;
  accepts_marketing: boolean;
  created_at?: null;
  updated_at?: null;
  first_name: string;
  last_name: string;
  orders_count: number;
  state: string;
  total_spent: string;
  last_order_id?: null;
  note?: null;
  verified_email: boolean;
  multipass_identifier?: null;
  tax_exempt: boolean;
  phone?: null;
  tags: string;
  last_order_name?: null;
  currency: string;
  accepts_marketing_updated_at?: null;
  marketing_opt_in_level?: null;
  admin_graphql_api_id: string;
  default_address: DefaultAddress;
}

export interface DefaultAddress {
  id: number;
  customer_id: number;
  first_name?: null;
  last_name?: null;
  company?: null;
  address1: string;
  address2?: null;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone: string;
  name: string;
  province_code: string;
  country_code: string;
  country_name: string;
  default: boolean;
}
