'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/database'
import Blog from '@/lib/database/models/blog.model'
import User from '@/lib/database/models/user.model'
import Category from '@/lib/database/models/category.model'
import { handleError } from '@/lib/utils'

import {
  CreateBlogParams,
  UpdateBlogParams,
  DeleteBlogParams,
  GetAllBlogsParams,
  GetBlogsByUserParams,
  GetRelatedBlogsByCategoryParams,
} from '@/types'

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: 'i' } })
}

const populateBlog = (query: any) => {
  return query
    .populate({ path: 'author', model: User, select: '_id firstName lastName' })
    .populate({ path: 'category', model: Category, select: '_id name' })
}

// CREATE
export async function createBlog({ userId, blog, path }: CreateBlogParams) {
  try {
    await connectToDatabase()

    const author = await User.findById(userId)
    if (!author) throw new Error('author not found')

    const newBlog = await Blog.create({ ...blog, category: blog.categoryId, author: userId })
    revalidatePath(path)

    return JSON.parse(JSON.stringify(newBlog))
  } catch (error) {
    handleError(error)
  }
}

// GET ONE blog BY ID
export async function getBlogById(blogId: string) {
  try {
    await connectToDatabase()

    const blog = await populateBlog(Blog.findById(blogId))

    if (!blog) throw new Error('Blog not found')

    return JSON.parse(JSON.stringify(blog))
  } catch (error) {
    handleError(error)
  }
}

// UPDATE
export async function updateBlog({ userId, blog, path }: UpdateBlogParams) {
  try {
    await connectToDatabase()

    const blogToUpdate = await Blog.findById(blog._id)
    if (!blogToUpdate || blogToUpdate.author.toHexString() !== userId) {
      throw new Error('Unauthorized or blog not found')
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      blog._id,
      { ...blog, category: blog.categoryId },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedBlog))
  } catch (error) {
    handleError(error)
  }
}

// DELETE
export async function deleteBlog({ blogId, path }: DeleteBlogParams) {
  try {
    await connectToDatabase()

    const deletedBlog = await Blog.findByIdAndDelete(blogId)
    if (deletedBlog) revalidatePath(path)
  } catch (error) {
    handleError(error)
  }
}

// GET ALL blogS
export async function getAllBlogs({ query, limit = 6, page, category }: GetAllBlogsParams) {
  try {
    await connectToDatabase()

    const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
    const categoryCondition = category ? await getCategoryByName(category) : null
    const conditions = {
      $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
    }

    const skipAmount = (Number(page) - 1) * limit
    const blogsQuery = Blog.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const blogs = await populateBlog(blogsQuery)
    const blogsCount = await Blog.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(blogs)),
      totalPages: Math.ceil(blogsCount / limit),
    }
  } catch (error) {
    handleError(error)
  }
}

// GET blogS BY author
export async function getBlogsByUser({ userId, limit = 6, page }: GetBlogsByUserParams) {
  try {
    await connectToDatabase()

    const conditions = { author: userId }
    const skipAmount = (page - 1) * limit

    const blogsQuery = Blog.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const blogs = await populateBlog(blogsQuery)
    const blogsCount = await Blog.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(blogs)), totalPages: Math.ceil(blogsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}

// GET RELATED blogS: blogS WITH SAME CATEGORY
export async function getRelatedBlogsByCategory({
  categoryId,
  blogId,
  limit = 3,
  page = 1,
}: GetRelatedBlogsByCategoryParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { $and: [{ category: categoryId }, { _id: { $ne: blogId } }] }

    const blogsQuery = Blog.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const blogs = await populateBlog(blogsQuery)
    const blogsCount = await Blog.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(blogs)), totalPages: Math.ceil(blogsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}
