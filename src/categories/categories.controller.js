const categoriesService = require("./categories.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


// Module 3.10.6
// function list(req, res, next) {
//   categoriesService
//       .list()
//       .then((data) => res.json({ data }))
//       .catch(next);
// }

// Module 3.10.7
async function list(req, res) {
  const data = await categoriesService.list();
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
