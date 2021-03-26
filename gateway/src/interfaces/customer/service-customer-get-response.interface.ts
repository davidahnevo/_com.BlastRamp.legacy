import { ICustomer } from './customer.interface';

export interface IServiceCustomerGetResponse {
  status: number;
  message: string;
  customer: ICustomer[] | null;
  errors: { [key: string]: any };
}