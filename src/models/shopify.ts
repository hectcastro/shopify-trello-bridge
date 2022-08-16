export type Order = {
  customer: Customer;
  lineItems: LineItem[];
  name: string;
  totalPrice: string;
};

export type LineItem = {
  name: string;
  quantity: number;
};

export type Customer = {
  firstName: string;
  lastName: string;
};
