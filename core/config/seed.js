/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Product from '../api/product/product.model';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if (config.seedDB) {
    Product.find({}).remove()
      .then(() => {
        Product.create({
            images: [{
              path: 'image/path/0.jpg',
              originalName: 'img0.jpg'
            }],
            name: 'prod1',
            categories: [{code: 'cat_no_1', name: 'Category first', description: 'Category first', title: 'First'}],
            ancestors: 'prod ancestors',
            title: 'prod title',
            pageTitle: 'prod page title',
            description: 'prod description',
            originCountry: 'prod originCountry',
            type: 'prod type',
            vendor: 'prod vendor',
            price: {range: '5', min: 1, max: 8}
          },
          {
            images: [],
            name: 'prod2',
            ancestors: 'prod ancestors',
            title: 'prod title',
            pageTitle: 'prod page title',
            description: 'prod description',
            originCountry: 'prod originCountry',
            type: 'prod type',
            vendor: 'prod vendor',
            price: {range: '7', min: 1, max: 8}
          },
          (err, data) => {
            console.log('data ', data);
            console.log('err ', err);
          })
      })
      .then(() => console.log('finished populating products'))
      .catch(err => console.log('error populating products', err));

    Thing.find({}).remove()
      .then(() => {
        Thing.create({
          name: 'Development Tools',
          info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
          + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
          + 'Stylus, Sass, and Less.'
        }, {
          name: 'Server and Client integration',
          info: 'Built with a powerful and fun stack: MongoDB, Express, '
          + 'AngularJS, and Node.'
        }, {
          name: 'Smart Build System',
          info: 'Build system ignores `spec` files, allowing you to keep '
          + 'tests alongside code. Automatic injection of scripts and '
          + 'styles into your index.html'
        }, {
          name: 'Modular Structure',
          info: 'Best practice client and server structures allow for more '
          + 'code reusability and maximum scalability'
        }, {
          name: 'Optimized Build',
          info: 'Build process packs up your templates as a single JavaScript '
          + 'payload, minifies your scripts/css/images, and rewrites asset '
          + 'names for caching.'
        }, {
          name: 'Deployment Ready',
          info: 'Easily deploy your app to Heroku or Openshift with the heroku '
          + 'and openshift subgenerators'
        });
      })
      .then(() => console.log('finished populating things'))
      .catch(err => console.log('error populating things', err));

    User.find({}).remove()
      .then(() => {
        User.create({
          provider: 'local',
          name: 'Test User',
          email: 'test@example.com',
          password: 'test'
        }, {
          provider: 'local',
          role: 'admin',
          name: 'Admin',
          email: 'admin@example.com',
          password: 'admin'
        }, {
          'name': 'admin',
          'email': 'in.lermin@gmail.com',
          'role': 'admin',
          'password': 'admin',
          'provider': 'local'
        })
          .then(() => console.log('finished populating users'))
          .catch(err => console.log('error populating users', err));
      });
  }
}
