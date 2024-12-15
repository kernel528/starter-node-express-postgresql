const suppliersService = require("./suppliers.service");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("supplier_name", "supplier_email");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const VALID_PROPERTIES = [
  "supplier_name",
  "supplier_address_line_1",
  "supplier_address_line_2",
  "supplier_city",
  "supplier_state",
  "supplier_zip",
  "supplier_phone",
  "supplier_email",
  "supplier_notes",
  "supplier_type_of_goods",
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
      (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

// Module 3.10.7
async function supplierExists(req, res, next) {
  const supplier = await suppliersService.read(req.params.supplierId);
  if (supplier) {
    res.locals.supplier = supplier;
    return next();
  }
  next({ status: 404, message: `Supplier cannot be found.` });
}

// Added list function just for some validations...
function list(req, res, next) {
  suppliersService
      .list()
      .then((data) => res.json({ data }))
      .catch(next);
}
//

// Module 3.10.7
async function create(req, res) {
  const data = await suppliersService.create(req.body.data);
  res.status(201).json({ data });
}

// Module 3.10.7
async function update(req, res) {
  const updatedSupplier = {
    ...req.body.data,
    supplier_id: res.locals.supplier.supplier_id,
  };
  const data = await suppliersService.update(updatedSupplier);
  res.json({ data });
}

// Module 3.10.7
async function destroy(req, res) {
  const { supplier } = res.locals;
  await suppliersService.delete(supplier.supplier_id);
  res.sendStatus(204);
}

// Module 3.10.7
module.exports = {
  list, // Added for validations
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(supplierExists),
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(supplierExists), asyncErrorBoundary(destroy)],
};