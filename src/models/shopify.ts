export interface Order {
  customer: Customer;
  line_items?: LineItemsEntity[] | null;
  name: string;
  total_price: string;
}

export interface LineItemsEntity {
  name: string;
  quantity: number;
}

export interface Customer {
  first_name: string;
  last_name: string;
}
