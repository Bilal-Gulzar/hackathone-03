export type products = {
  productName: string;
  description: string;
  category: string;
  image: { _type: string; asset: { _ref: string } };
  _rev:string;
  _type: string;
  price:number;
  status: string;
  qty:number;
  color:string;
  colors: string[];
  _id: string;
  inventory: string;
  _createdAt: string;
};

export type content = {
  data: {
    productName: string;
    category: string;
    image: string;
    price: number;
    _id: string;
  }[];
};  
type Items = {
  productName: string;
  id: string;
  image: { _type: string; asset: { _ref: string } };
  category: string;
  color: string;
  price: number;
  quantity: number;
};

export type order = {
 customerEmail:string,
  customerName:string,
  orderItems:Items[]
  status: string;
  paid: string;
  phone:string;
  postalCode:string;
  country:string;
  shippingAddress:string;
  totalAmount:number;
  _id: string;
  _createdAt: string;
};


export interface MyImage {
  _type: string;
  asset:{
    _ref:string;
  }
}