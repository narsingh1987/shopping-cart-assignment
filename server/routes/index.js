module.exports = function (app) {
  require("./banner")(app);
  require("./category")(app);
  require("./product")(app);
};
