// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string
  firstName: string
  lastName: string
  username: string
  email: string
  photo: string
}

export type UpdateUserParams = {
  firstName: string
  lastName: string
  username: string
  photo: string
}

// ====== BOOK PARAMS
export type CreateBookParams = {
  userId: string
  book: {
    title: string
    description: string
    imageUrl: string
    isFeature: boolean;
    isNewReleased: boolean;
    buyNowUrl?: string;
    
    
  }
  path: string
}

export type UpdateBookParams = {
  userId: string
  book: {
    _id: string
    title: string
    imageUrl: string
    description: string
    
    
  }
  path: string
}

export type GetAllBooksParams = {
  query: string
  limit: number
  page: number
}

export type DeleteBookParams = {
  bookId: string
  path: string
}

// ====== BLOG PARAMS
export type CreateBlogParams = {
  userId: string
  blog: {
    title: string
    description: string
    imageUrl: string
    categoryId: string
    isPremium: boolean
    
  }
  path: string
}

export type UpdateBlogParams = {
  userId: string
  blog: {
    _id: string
    title: string
    imageUrl: string
    description: string
    categoryId: string
    isPremium: boolean
  }
  path: string
}


export type DeleteBlogParams = {
  blogId: string
  path: string
}

export type GetAllBlogsParams = {
  query: string
  category: string
  limit: number
  page: number
}

export type GetBlogsByUserParams = {
  userId: string
  limit?: number
  page: number
}

export type GetRelatedBlogsByCategoryParams = {
  categoryId: string
  blogId: string
  limit?: number
  page: number | string
}

export type Blog = {
  _id: string
  title: string
  description: string
  
  isPremium: boolean
  imageUrl: string
  createdAt: Date
  author: {
    _id: string
    firstName: string
    lastName: string
  }
  category: {
    _id: string
    name: string
  }
}

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  categoryName: string
}

export type UpdateCategoryParams = {
  categoryId: string
  categoryName: string
}

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

export type RemoveUrlQueryParams = {
  params: string
  keysToRemove: string[]
}

export type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
