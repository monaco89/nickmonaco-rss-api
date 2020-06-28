(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dotenv */ "dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(apollo_server_lambda__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _src_schemas__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/schemas */ "./src/schemas/index.js");
/* harmony import */ var _src_resolvers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/resolvers */ "./src/resolvers/index.js");
/* harmony import */ var _src_models_user__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./src/models/user */ "./src/models/user.js");
/* harmony import */ var _src_models_feed__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./src/models/feed */ "./src/models/feed.js");









dotenv__WEBPACK_IMPORTED_MODULE_1___default.a.config();
let originDomain = '*';

const getUser = async req => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default.a.verify(token, process.env.SECRET);
    } catch (e) {
      throw new apollo_server_lambda__WEBPACK_IMPORTED_MODULE_4__["AuthenticationError"]('Your session expired. Sign in again.');
    }
  }
};

const server = new apollo_server_lambda__WEBPACK_IMPORTED_MODULE_4__["ApolloServer"]({
  typeDefs: _src_schemas__WEBPACK_IMPORTED_MODULE_5__["default"],
  resolvers: _src_resolvers__WEBPACK_IMPORTED_MODULE_6__["default"],
  introspection: true,
  // playground: process.env.NODE_ENV === 'dev' ? true : false,
  playground: {
    endpoint: '/dev/graphql',
    settings: {
      'request.credentials': 'same-origin'
    }
  },
  context: async ({
    req,
    context
  }) => {
    context.callbackWaitsForEmptyEventLoop = false;

    if (req) {
      const me = await getUser(req);
      return { ...context,
        me,
        models: {
          userModel: _src_models_user__WEBPACK_IMPORTED_MODULE_7__["default"],
          feedModel: _src_models_feed__WEBPACK_IMPORTED_MODULE_8__["default"]
        },
        secret: process.env.SECRET
      };
    }
  }
});
let cachedDb = null;

function connectToDatabase(uri) {
  console.log('=> connect to database');

  if (cachedDb) {
    console.log('=> using cached database instance');
    return Promise.resolve(cachedDb);
  }

  const connection = mongoose__WEBPACK_IMPORTED_MODULE_3___default.a.connect(uri, {
    autoIndex: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 50,
    bufferMaxEntries: 0,
    keepAlive: 120,
    useNewUrlParser: true
  });
  mongoose__WEBPACK_IMPORTED_MODULE_3___default.a.set('useCreateIndex', true);
  return connection.then(db => {
    cachedDb = db;
    return cachedDb;
  }).catch(err => {
    console.log(err);
  });
} // connectToDatabase(process.env.PROD_MONGODB_URI).then((db) => console.log(`connected to db`));


const connection = mongoose__WEBPACK_IMPORTED_MODULE_3___default.a.connect(process.env.PROD_MONGODB_URI, {
  autoIndex: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: 50,
  bufferMaxEntries: 0,
  keepAlive: 120,
  useNewUrlParser: true
});
mongoose__WEBPACK_IMPORTED_MODULE_3___default.a.set('useCreateIndex', true);
connection.then(db => {
  cachedDb = db;
  return cachedDb;
}).catch(err => {
  console.log(err);
});
exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true
  } // cors: {
  //   origin: originDomain,
  //   credentials: true,
  //   methods: 'POST, GET, OPTIONS',
  //   allowedHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key', 'X-Amz-Security-Token', 'x-token'],
  // },
  // endpointURL: '/graphql',

});

/***/ }),

/***/ "./src/models/feed.js":
/*!****************************!*\
  !*** ./src/models/feed.js ***!
  \****************************/
/*! exports provided: FeedSchema, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeedSchema", function() { return FeedSchema; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mongoose_timestamp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mongoose-timestamp */ "mongoose-timestamp");
/* harmony import */ var mongoose_timestamp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mongoose_timestamp__WEBPACK_IMPORTED_MODULE_2__);



const FeedSchema = new mongoose__WEBPACK_IMPORTED_MODULE_1__["Schema"]({
  user: {
    type: mongoose__WEBPACK_IMPORTED_MODULE_1__["Schema"].Types.ObjectId,
    ref: 'User',
    // TODO
    required: true
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  rss: {
    type: String,
    trim: true,
    required: true
  },
  icon: {
    type: String,
    trim: true
  },
  enabled: {
    type: Boolean,
    default: true
  }
}, {
  collection: 'feeds'
});
FeedSchema.plugin(mongoose_timestamp__WEBPACK_IMPORTED_MODULE_2___default.a);
FeedSchema.index({
  createdAt: 1,
  updatedAt: 1
});
const Feed = mongoose__WEBPACK_IMPORTED_MODULE_1___default.a.model('Feed', FeedSchema);
/* harmony default export */ __webpack_exports__["default"] = (Feed);

/***/ }),

/***/ "./src/models/user.js":
/*!****************************!*\
  !*** ./src/models/user.js ***!
  \****************************/
/*! exports provided: UserSchema, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserSchema", function() { return UserSchema; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var mongoose_timestamp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mongoose-timestamp */ "mongoose-timestamp");
/* harmony import */ var mongoose_timestamp__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mongoose_timestamp__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcrypt */ "bcrypt");
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_3__);




const UserSchema = new mongoose__WEBPACK_IMPORTED_MODULE_1__["Schema"]({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  feeds: [{
    type: mongoose__WEBPACK_IMPORTED_MODULE_1__["Schema"].Types.ObjectId,
    ref: 'Feed'
  }]
}, {
  collection: 'users'
});
UserSchema.plugin(mongoose_timestamp__WEBPACK_IMPORTED_MODULE_2___default.a);
UserSchema.index({
  createdAt: 1,
  updatedAt: 1
});
UserSchema.pre('save', function () {
  const hashedPassword = bcrypt__WEBPACK_IMPORTED_MODULE_3___default.a.hashSync(this.password, 12);
  this.password = hashedPassword;
});
const User = mongoose__WEBPACK_IMPORTED_MODULE_1___default.a.model('User', UserSchema);
/* harmony default export */ __webpack_exports__["default"] = (User);

/***/ }),

/***/ "./src/resolvers/authorization.js":
/*!****************************************!*\
  !*** ./src/resolvers/authorization.js ***!
  \****************************************/
/*! exports provided: isAuthenticated */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAuthenticated", function() { return isAuthenticated; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apollo-server */ "apollo-server");
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(apollo_server__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql_resolvers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! graphql-resolvers */ "graphql-resolvers");
/* harmony import */ var graphql_resolvers__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_resolvers__WEBPACK_IMPORTED_MODULE_2__);



const isAuthenticated = (parent, args, {
  me
}) => me ? graphql_resolvers__WEBPACK_IMPORTED_MODULE_2__["skip"] : new apollo_server__WEBPACK_IMPORTED_MODULE_1__["ForbiddenError"]('Not authenticated as user.');

/***/ }),

/***/ "./src/resolvers/feed.js":
/*!*******************************!*\
  !*** ./src/resolvers/feed.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apollo-server */ "apollo-server");
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(apollo_server__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql_resolvers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! graphql-resolvers */ "graphql-resolvers");
/* harmony import */ var graphql_resolvers__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_resolvers__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _authorization__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./authorization */ "./src/resolvers/authorization.js");




/* harmony default export */ __webpack_exports__["default"] = ({
  Query: {
    feed: async (parent, {
      id
    }, {
      models: {
        feedModel
      },
      me
    }, info) => {
      if (!me) {
        throw new apollo_server__WEBPACK_IMPORTED_MODULE_1__["AuthenticationError"]('You are not authenticated');
      }

      const feed = await feedModel.findById({
        _id: id
      }).exec();
      return feed;
    },
    feeds: async (parent, args, {
      models: {
        feedModel
      },
      me
    }, info) => {
      if (!me) {
        throw new apollo_server__WEBPACK_IMPORTED_MODULE_1__["AuthenticationError"]('You are not logged in.');
      }

      const feeds = await feedModel.find({
        user: me.id
      }).exec();
      return feeds;
    }
  },
  Mutation: {
    createFeed: Object(graphql_resolvers__WEBPACK_IMPORTED_MODULE_2__["combineResolvers"])(_authorization__WEBPACK_IMPORTED_MODULE_3__["isAuthenticated"], async (parent, {
      name,
      rss,
      icon
    }, {
      models: {
        feedModel
      },
      me
    }, info) => {
      if (!me) {
        throw new apollo_server__WEBPACK_IMPORTED_MODULE_1__["AuthenticationError"]('You are not authenticated');
      }

      const feed = await feedModel.create({
        name,
        rss,
        icon,
        enabled: true,
        user: me.id
      });
      return feed;
    })
  },
  Feed: {
    user: async ({
      author
    }, args, {
      models: {
        userModel
      }
    }, info) => {
      const user = await userModel.findById({
        _id: author
      }).exec();
      return user;
    }
  }
});

/***/ }),

/***/ "./src/resolvers/index.js":
/*!********************************!*\
  !*** ./src/resolvers/index.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _feed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feed */ "./src/resolvers/feed.js");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user */ "./src/resolvers/user.js");



/* harmony default export */ __webpack_exports__["default"] = ([_user__WEBPACK_IMPORTED_MODULE_2__["default"], _feed__WEBPACK_IMPORTED_MODULE_1__["default"]]);

/***/ }),

/***/ "./src/resolvers/user.js":
/*!*******************************!*\
  !*** ./src/resolvers/user.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcrypt */ "bcrypt");
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! apollo-server */ "apollo-server");
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(apollo_server__WEBPACK_IMPORTED_MODULE_3__);




/* harmony default export */ __webpack_exports__["default"] = ({
  Query: {
    user: async (parent, {
      id
    }, {
      models: {
        userModel
      },
      me
    }, info) => {
      // ? Reason for being authenticated first
      if (!me) {
        throw new apollo_server__WEBPACK_IMPORTED_MODULE_3__["AuthenticationError"]('You are not authenticated');
      }

      const user = await userModel.findById({
        _id: id
      }).exec();
      return user;
    }
  },
  Mutation: {
    createUser: async (parent, {
      name,
      email,
      password
    }, {
      models: {
        userModel
      },
      secret
    }, info) => {
      const user = await userModel.create({
        name,
        email,
        password
      });
      const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default.a.sign({
        id: user.id
      }, secret, {
        expiresIn: 24 * 10 * 50
      });
      return {
        token
      };
    },
    login: async (parent, {
      email,
      password
    }, {
      models: {
        userModel
      },
      secret
    }, info) => {
      const user = await userModel.findOne({
        email
      }).exec();

      if (!user) {
        throw new apollo_server__WEBPACK_IMPORTED_MODULE_3__["AuthenticationError"]('Invalid credentials');
      }

      const matchPasswords = bcrypt__WEBPACK_IMPORTED_MODULE_1___default.a.compareSync(password, user.password);

      if (!matchPasswords) {
        throw new apollo_server__WEBPACK_IMPORTED_MODULE_3__["AuthenticationError"]('Invalid credentials');
      }

      const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default.a.sign({
        id: user.id
      }, secret, {
        expiresIn: 24 * 10 * 50
      });
      return {
        token
      };
    }
  },
  User: {
    feeds: async ({
      id
    }, args, {
      models: {
        feedModel
      }
    }, info) => {
      const feeds = await feedModel.find({
        user: id
      }).exec();
      return feeds;
    }
  }
});

/***/ }),

/***/ "./src/schemas/feed.js":
/*!*****************************!*\
  !*** ./src/schemas/feed.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apollo-server */ "apollo-server");
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(apollo_server__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = (apollo_server__WEBPACK_IMPORTED_MODULE_1__["gql"]`
  type Feed {
    id: ID!
    name: String
    rss: String
    icon: String
    enabled: Boolean
    user: User!
  }

  input CreateFeedInput {
    name: String!
    rss: String!
    icon: String!
  }

  extend type Query {
    feeds: [Feed!]
    feed(id: ID!): Feed!
  }

  extend type Mutation {
    createFeed(input: CreateFeedInput!): Feed!
  }
`);

/***/ }),

/***/ "./src/schemas/index.js":
/*!******************************!*\
  !*** ./src/schemas/index.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user */ "./src/schemas/user.js");
/* harmony import */ var _feed__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./feed */ "./src/schemas/feed.js");
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! apollo-server */ "apollo-server");
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(apollo_server__WEBPACK_IMPORTED_MODULE_3__);




const linkSchema = apollo_server__WEBPACK_IMPORTED_MODULE_3__["gql"]`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;
/* harmony default export */ __webpack_exports__["default"] = ([linkSchema, _user__WEBPACK_IMPORTED_MODULE_1__["default"], _feed__WEBPACK_IMPORTED_MODULE_2__["default"]]);

/***/ }),

/***/ "./src/schemas/user.js":
/*!*****************************!*\
  !*** ./src/schemas/user.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apollo-server */ "apollo-server");
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(apollo_server__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = (apollo_server__WEBPACK_IMPORTED_MODULE_1__["gql"]`
  type User {
    id: ID!
    name: String!
    email: String!
    feeds: [Feed!]
  }

  type Token {
    token: String!
  }

  extend type Query {
    user(id: ID!): User!
  }

  extend type Mutation {
    createUser(name: String!, email: String!, password: String!): Token!
    login(email: String!, password: String!): Token!
  }
`);

/***/ }),

/***/ "apollo-server":
/*!********************************!*\
  !*** external "apollo-server" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server");

/***/ }),

/***/ "apollo-server-lambda":
/*!***************************************!*\
  !*** external "apollo-server-lambda" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server-lambda");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "graphql-resolvers":
/*!************************************!*\
  !*** external "graphql-resolvers" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-resolvers");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "mongoose-timestamp":
/*!*************************************!*\
  !*** external "mongoose-timestamp" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose-timestamp");

/***/ }),

/***/ "source-map-support/register":
/*!**********************************************!*\
  !*** external "source-map-support/register" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("source-map-support/register");

/***/ })

/******/ })));
//# sourceMappingURL=index.js.map