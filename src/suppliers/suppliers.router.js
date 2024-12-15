const router = require("express").Router({ mergeParams: true });
const controller = require("./suppliers.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// Added .get(controller.list) to validate suppliers list updates...
router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);

router
  .route("/:supplierId")
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

module.exports = router;
