const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLFloat,
  GraphQLID,
} = require("graphql");

const {
  getCustomerById,
  getDishById,
  getCustomerOrdersById,
  getRestaurantOrdersById,
  getOrderDetailsById,
  getAllRestaurants,
  getRestaurantById,
} = require("./queries");

const {
  login,
  signUpCustomer,
  signUpRestaurant,
  restaurantUpdateOrderStatus,
  updateCustomerProfile,
  addNewDeliveryAddressForCustomer,
  updateRestaurantProfile,
  addDishToRestaurant,
  updateDishById,
  placeOrder,
} = require("./mutations");

const User = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    _id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    isRestaurant: { type: GraphQLBoolean },
    name: { type: GraphQLString },
    nickname: { type: GraphQLString },
    picture: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    about: { type: GraphQLString },
    address: { type: new GraphQLList(Address) },
    openTime: { type: GraphQLString },
    closeTime: { type: GraphQLString },
    pickupMode: { type: GraphQLBoolean },
    deliveryMode: { type: GraphQLBoolean },
    favourites: { type: new GraphQLList(GraphQLString) },
    dishes: { type: new GraphQLList(Dish) },
  }),
});

const Address = new GraphQLObjectType({
  name: "address",
  fields: () => ({
    _id: { type: GraphQLID },
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    zipCode: { type: GraphQLInt },
  }),
});

const Dish = new GraphQLObjectType({
  name: "dish",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    mainIngrediant: { type: GraphQLString },
    image: { type: GraphQLString },
    price: { type: GraphQLFloat },
    description: { type: GraphQLString },
    category: { type: GraphQLString },
    type: { type: GraphQLString },
  }),
});

const Order = new GraphQLObjectType({
  name: "order",
  fields: () => ({
    _id: { type: GraphQLID },
    _restaurantId: { type: GraphQLID },
    _custId: { type: GraphQLID },
    _deliveryAddressId: { type: GraphQLID },
    dateTime: { type: GraphQLString },
    totalPrice: { type: GraphQLFloat },
    orderMode: { type: GraphQLString },
    orderStatus: { type: GraphQLString },
    orderNote: { type: GraphQLString },
    orderItem: { type: new GraphQLList(orderItem) },
  }),
});

const orderItem = new GraphQLObjectType({
  name: "orderItem",
  fields: () => ({
    _id: { type: GraphQLID },
    _dishId: { type: GraphQLID },
    quantity: { type: GraphQLInt },
    price: { type: GraphQLFloat },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "query",
  description: "Root Query",
  fields: () => ({
    getCustomerDetailsById: {
      type: User,
      description: "Get customer details by ID",
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        return getCustomerById(args);
      },
    },
    getDishById: {
      type: Dish,
      description: "Get dish details by ID",
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        return getDishById(args);
      },
    },

    getCustomerOrdersById: {
      type: new GraphQLList(Order),
      description: "Get all orders that belong to the customer",
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        return getCustomerOrdersById(args);
      },
    },
    getRestaurantOrdersById: {
      type: new GraphQLList(Order),
      description: "Get all orders that belong to the restaurant",
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        return getRestaurantOrdersById(args);
      },
    },
    getOrderDetailsById: {
      type: Order,
      description: "Get order details by id",
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        return getOrderDetailsById(args);
      },
    },
    getAllRestaurants: {
      type: new GraphQLList(User),
      description: "Get details of all restaurants",
      resolve: (parent, args) => {
        return getAllRestaurants();
      },
    },
    getRestaurantDetailsById: {
      type: User,
      description: "Get restaurant details by id",
      args: {
        id: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        return getRestaurantById(args);
      },
    },
  }),
});

const Token = new GraphQLObjectType({
  name: "token",
  fields: () => ({
    token: { type: GraphQLString },
  }),
});

const Message = new GraphQLObjectType({
  name: "responseMessage",
  fields: () => ({
    message: { type: GraphQLString },
  }),
});

const NewCustomerInput = new GraphQLInputObjectType({
  name: "customerInputType",
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    zipCode: { type: GraphQLString },
  }),
});

const NewRestaurantInput = new GraphQLInputObjectType({
  name: "restaurantInputType",
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    zipCode: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
  }),
});

const UpdateCustomerProfileInput = new GraphQLInputObjectType({
  name: "updateCustomerProfileInputType",
  fields: () => ({
    name: { type: GraphQLString },
    nickname: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    picture: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    about: { type: GraphQLString },
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    zipCode: { type: GraphQLString },
  }),
});

const UpdateRestaurantProfileInput = new GraphQLInputObjectType({
  name: "updateRestaurantProfileInputType",
  fields: () => ({
    name: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    about: { type: GraphQLString },
    picture: { type: GraphQLString },
    openingTime: { type: GraphQLString },
    closingTime: { type: GraphQLString },
    pickUpMode: { type: GraphQLString },
    deliveryMode: { type: GraphQLString },
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    zipCode: { type: GraphQLString },
  }),
});

const DeliveryAddressInputType = new GraphQLObjectType({
  name: "deliveryAddressInputType",
  fields: () => ({
    _id: { type: GraphQLID },
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },
    zipCode: { type: GraphQLString },
  }),
});

const DishInputType = new GraphQLObjectType({
  name: "dishIputType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    mainIngrediant: { tye: GraphQLString },
    image: { type: GraphQLString },
    price: { type: GraphQLFloat },
    description: { type: GraphQLString },
    category: { type: GraphQLString },
    type: { type: GraphQLString },
  }),
});

const OrderInputType = new GraphQLInputObjectType({
  name: "orderInputType",
  fields: () => ({
    _id: { type: GraphQLID },
    _restaurantId: { type: GraphQLID },
    _custId: { type: GraphQLID },
    _deliveryAddressId: { type: GraphQLID },
    dateTime: { type: GraphQLString },
    totalPrice: { type: GraphQLInt },
    orderMode: { type: GraphQLString },
    orderStatus: { type: GraphQLString },
    orderItems: { type: new GraphQLList(OrderItemInputType) },
    orderNote: { type: GraphQLString },
  }),
});

const OrderItemInputType = new GraphQLInputObjectType({
  name: "orderItemInputType",
  fields: () => ({
    _dishId: { type: GraphQLID },
    quantity: { type: GraphQLString },
    price: { type: GraphQLFloat },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "mutation",
  description: "Root Mutation",
  fields: () => ({
    login: {
      type: Token,
      description: "login",
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        return login(args);
      },
    },
    signUpCustomer: {
      type: Message,
      description: "Customer sign Up",
      args: {
        customerData: { type: NewCustomerInput },
      },
      resolve: (parent, args) => {
        return signUpCustomer(args.customerData);
      },
    },
    signUpRestaurant: {
      type: Message,
      description: "Restaurant sign Up",
      args: {
        restaurantData: { type: NewRestaurantInput },
      },
      resolve: (parent, args) => {
        return signUpRestaurant(args.restaurantData);
      },
    },
    updateCustomerProfile: {
      type: Message,
      description: "Update Cutomer profile",
      args: {
        customerData: { type: UpdateCustomerProfileInput },
      },
      resolve: (parent, args) => {
        return updateCustomerProfile(args);
      },
    },
    updateRestaurantProfile: {
      type: Message,
      description: "Update Restaurant profile",
      args: {
        restaurantData: { type: UpdateRestaurantProfileInput },
      },
      resolve: (parent, args) => {
        return updateRestaurantProfile(args);
      },
    },
    addNewDeliveryAddressForCustomer: {
      type: Message,
      description: "Add new customer delivery address",
      args: {
        deliveryAddress: { type: DeliveryAddressInputType },
      },
      resolve: (parent, args) => {
        return addNewDeliveryAddressForCustomer(args);
      },
    },
    restaurantUpdateOrderStatus: {
      type: Message,
      description: "Restaurant Update order status",
      args: {
        id: { type: GraphQLID },
        orderStatus: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        return restaurantUpdateOrderStatus(args);
      },
    },
    addDishToRestaurant: {
      type: Message,
      description: "Add a dish to Restaurant menu by restaurant Id",
      args: {
        dishData: { type: DishInputType },
      },
      resolve: (parent, args) => {
        return addDishToRestaurant(args.dishData);
      },
    },
    updateDishById: {
      type: Message,
      description: "Update dish details by Dish Id",
      args: {
        dishData: { type: DishInputType },
      },
      resolve: (parent, args) => {
        return updateDishById(args);
      },
    },
    placeOrder: {
      type: Message,
      description: "Place a new Order",
      args: {
        orderDetails: { type: OrderInputType },
      },
      resolve: (parent, args) => {
        return placeOrder(args.orderDetails);
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

module.exports = schema;
