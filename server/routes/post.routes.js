import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
const router = new Router();

// import accountRoutes from './resources/account/routes';
// import cartRoutes from './resources/carts/routes';
// import checkoutRoutes from './resources/checkouts/routes';
// import collectionRoutes from './resources/collections/routes';
// import contentRoutes from './resources/contents/routes';
// import fileRoutes from './resources/files/routes';
// import orderRoutes from './resources/orders/routes';
// import productRoutes from './resources/products/routes';
// import userRoutes from './resources/users/routes';

// [`${routePrefix}/v1/account`]: accountRoutes,
//   [`${routePrefix}/v1/carts`]: cartRoutes,
//   [`${routePrefix}/v1/checkouts`]: checkoutRoutes,
//   [`${routePrefix}/v1/collections`]: collectionRoutes,
//   [`${routePrefix}/v1/contents`]: contentRoutes,
//   [`${routePrefix}/v1/files`]: fileRoutes,
//   [`${routePrefix}/v1/orders`]: orderRoutes,
//   [`${routePrefix}/v1/products`]: productRoutes,
//   [`${routePrefix}/v1/users`]: userRoutes

router.route('/account').get();

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(PostController.deletePost);

export default router;
