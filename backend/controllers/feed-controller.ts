import Post from '../models/post-model.ts';
import io from '../socket.ts';
import { ApiResourse } from '../types/controller-api-resource.d.ts';
import clearImage from '../utils/clear-image.ts';

const feedController: ApiResourse = {};

feedController.index = (req, res, next) => {
  const currentPage: number = req.query.page ?? 1;
  const perPage = 2;
  let totalItems = 0;
  Post.find()
    .countDocuments()
    .then(async (postsCounts) => {
      totalItems = postsCounts;

      const posts = await Post.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);

      res.status(200).json({
        posts,
        totalItems,
        currentPage,
        perPage,
      });
    })
    .catch(next);
};

feedController.show = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      if (post === null) {
        next(Error(`post with id=${postId} not found.`));
        return;
      }

      res.status(200).json({
        post,
      });
    })
    .catch(next);
};

feedController.store = (req, res, next) => {
  if (!req.file) {
    const error = new Error('No Image provided.');
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.file.path;

  const post = new Post({
    title,
    content,
    imageUrl,
    creator: {
      name: 'Ahmed Mahdy',
    },
  });

  post
    .save()
    .then((createdPost) => {
      io.get().emit('posts', { action: 'create', post: createdPost });
      res.status(201).json({
        message: 'Post Created Successfully',
        post: createdPost,
      });
    })
    .catch(next);
};

feedController.update = (req, res, next) => {
  const postId = req.params.postId;
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.file?.path;

  Post.findById(postId)
    .then(async (post) => {
      if (post === null) {
        next(Error(`post with id=${postId} not found.`));
      } else {
        const oldImageUrl = post.imageUrl;

        post.title = title ?? post.title;
        post.content = content ?? post.content;
        post.imageUrl = imageUrl ?? post.imageUrl;

        const updatedPost = await post.save();

        if (imageUrl !== oldImageUrl) {
          clearImage(oldImageUrl);
        }

        res.status(200).json({
          message: 'Post Updated Successfully',
          post: updatedPost,
        });
      }
    })
    .catch(next);
};

feedController.destroy = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(async (post) => {
      if (post === null) {
        next(Error(`post with id=${postId} not found.`));
        return;
      }

      clearImage(post.imageUrl);
      await post.deleteOne();

      res.status(200).json({
        message: 'Post Deleted Successfully',
      });
    })
    .catch(next);
};

export default feedController;
