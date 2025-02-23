import Provider from "../../../models/provider";
import { IPost } from "../../../models/post.model";
import { IUser } from "../../../models/user.model";
import postRepository from "../repository";
const db = Provider.getInstance();

/**
 * @description user creates a post
 * @param body
 * @returns
 */
const createPost = async (user: IUser, body: IPost) => {
  body.user = user._id; // current user is writing the post
  const post = await postRepository.create(body);
  return post;
};

/**
 * @description admin sees all posts included deleted
 * @returns
 */
const getAllPostsForAdmin = async () => {
  const post = await postRepository.find();
  return post;
};

/**
 * @description user fetches all posts for newsfeed
 * @returns
 */
const getAllPostsForUser = async () => {
  const post = await postRepository.find({
    showDeleted: false,
    commentsCount: 3,
    limit: 10,
    skip: 0,
  });
  return post;
};

/**
 * @description gets single post
 * @param id
 * @returns
 */
const getPostById = async (id: any) => {
  const post = await postRepository.findById(id);
  return post;
};

/**
 * @description gets all comments for a specific post
 * @param id
 * @returns
 */
const getCommentsByPostId = async (id: any) => {
  const comments = await db.Comment.find({ post: id });
  return comments;
};

/**
 * @description updates a post
 * @param id
 * @param body
 * @returns
 */
const updatePostById = async (id: any, body: any) => {
  const post = await postRepository.findByIdAndUpdate(id, body);
  return post;
};

/**
 * hard or soft delete a post, hard delete comments too
 * @param id
 * @param hardDelete
 * @returns
 */
const deletePostById = async (id: any, hardDelete: boolean = false) => {
  let post;
  if (!hardDelete) {
    post = await postRepository.findByIdAndSoftDelete(id);
  } else {
    post = await postRepository.findByIdAndDelete(id);
  }
  return post;
};

export default {
  createPost,
  getAllPostsForUser,
  getAllPostsForAdmin,
  getPostById,
  getCommentsByPostId,
  updatePostById,
  deletePostById,
};
