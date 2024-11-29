import { IPaginationMeta } from './interface'
import { Pagination } from './pagination'

export function createPagination<T>({
  items,
  totalItems,
  currentPage,
  limit,
}: {
  items: T[]
  totalItems: number
  currentPage: number
  limit: number
}): Pagination<T> {
  const totalPage = totalItems !== undefined ? Math.ceil(totalItems / limit) : undefined

  const meta: IPaginationMeta = {
    totalItems,
    itemCount: items.length,
    itemsPerPage: limit,
    totalPage,
    currentPage,
  }

  return new Pagination<T>(items, meta)
}
