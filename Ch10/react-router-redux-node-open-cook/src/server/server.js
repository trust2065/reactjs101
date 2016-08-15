/* Server Packages */
import Express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import config from './config';
import User from './models/user';
import Recipe from './models/recipe';
/* Client Packages */
import webpack from 'webpack';
import React from 'react';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { RouterContext, match } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import Immutable, { fromJS } from 'immutable';
/* Common Packages */
import webpackConfig from '../../webpack.config';
import routes from '../common/routes';
import configureStore from '../common/store/configureStore';
import fetchComponentData from '../common/utils/fetchComponentData';

/* config */
const app = new Express();
const port = process.env.PORT || 3000;
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable
app.set('env', 'production');
app.use('/static', Express.static(__dirname + '/public'));
app.use(cookieParser());
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false })); // only can deal with key/value
app.use(bodyParser.json());
// use morgan to log requests to the console
app.use(morgan('dev'));

// basic route handler
const handleRender = (req, res) => {
  // Query our mock API asynchronously
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps == null) {
      res.status(404).send('Not found');
    }

    fetchComponentData(req.cookies.token).then((response) => {
      // Render the component to a string
      // Combined initial state to immutable format
      // console.log(response.recipes);
      let isAuthorized = false;
      if (response[1].data.success === true) {
         isAuthorized = true;
      } else {
        isAuthorized = false;        
      }

      const initialState = fromJS({
        recipe: {
          recipes: response[0].data,
          recipeId: '',
        },
        user: {
          isAuthorized: isAuthorized,
        }
      });


      // const initialState = Immutable.Map();

      // Create a new Redux store instance
      const store = configureStore(initialState);

      const initView = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
      // console.log('\ninitView:\n', initView);
      let state = store.getState();
      // console.log( '\nstate: ', state )
      let page = renderFullPage(initView, state);
      // console.log( '\npage:\n', page );
      return res.status(200).send(page);
    })
    .catch(err => res.end(err.message));
  })
}

const renderFullPage = (html, preloadedState) => (`
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
        <!-- Optional theme -->
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootswatch/3.3.7/journal/bootstrap.min.css">
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>`
);

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

// API Route
const apiRoutes = Express.Router();
// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);
// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/login', function(req, res) {
  // find the user
  User.findOne({
    email: req.body.email
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      console.log(user);
      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        // if user is found and password is right
        // create a token
        const token = jwt.sign({ email: user.email }, app.get('superSecret'), {
          expiresIn: 60 * 60 * 24 // expires in 24 hours
        });
        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          userId: user._id
        });
      }   
    }
  });
});

apiRoutes.get('/setup', (req, res) => {
  // create a sample user
  const sampleUser = new User({ 
    username: 'mark', 
    email: 'mark@demo.com', 
    password: '123456',
    admin: true 
  });

  const sampleRecipe = new Recipe({
    name: '番茄炒蛋', 
    description: '番茄炒蛋，一道非常經典的家常菜料理，每個家庭都有不同味道的一道料理', 
    imagePath: 'https://c1.staticflickr.com/6/5011/5510599760_6668df5a8a_z.jpg',
    steps: ['放入番茄', '打個蛋', '放入少許鹽巴', '用心快炒'],
    updatedAt: new Date()
  });

  // save the sample user
  sampleUser.save((err) => {
    if (err) throw err;
    sampleRecipe.save((err) => {
      if (err) throw err;
      console.log('User saved successfully');
      res.json({ success: true });      
    })
  });
});

apiRoutes.get('/recipes', (req, res) => {
  Recipe.find({}, (err, recipes) => {
    res.status(200).json(recipes);
  })
});

// route middleware to verify a token
apiRoutes.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), (err, decoded) => {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {
    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
});
// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/authenticate', (req, res) => {
  res.json({
    success: true,
    message: 'Enjoy your token!',
  });
});
apiRoutes.post('/recipes', (req, res) => {
  const newRecipe = new Recipe({
    name: req.body.name, 
    description: req.body.description, 
    imagePath: req.body.imagePath,
    steps: ['放入番茄', '打個蛋', '放入少許鹽巴', '用心快炒'],
    updatedAt: new Date()
  });

  newRecipe.save((err) => {
    if (err) throw err;
    console.log('User saved successfully');
    res.json({ success: true });      
  })
});   

/* React Server Render */
app.use(handleRender);
app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
});
