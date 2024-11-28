export interface Take {
  page: number
  take: number
}

export interface Meta {
  hasNextPage: boolean
  hasPreviousPage: boolean
  itemCount: number
  page: string | number
  pageCount: number
  take: string | number
}

export interface Data {
  statusCode: number
}
