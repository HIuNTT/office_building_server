export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PagerDto {
  limit?: number = 10
  page?: number = 1
  sortBy?: string
  order?: Order
}
