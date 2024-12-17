const productsService = require("./products.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function productExists(req, res, next) {
    const product = await productsService.read(req.params.productId);
    if (product) {
        res.locals.product = product;
        return next();
    }
    next({ status: 404, message: `Product cannot be found.` });
}

function read(req, res) {
    const { product: data } = res.locals;
    res.json({ data });
}

// Module 3.10.7
async function list(req, res) {
    const data = await productsService.list();
    res.json({ data });
}

// Module 3.10.8
async function listOutOfStockCount(req, res) {
    res.json({ data: await productsService.listOutOfStockCount() });
}

// Module 3.10.8
async function listPriceSummary(req, res) {
    res.json({ data: await productsService.listPriceSummary() });
}

// Module 3.10.8
async function listTotalWeightByProduct(req, res) {
    res.json({ data: await productsService.listTotalWeightByProduct() });
}

module.exports = {
    read: [asyncErrorBoundary(productExists), read],
    list: asyncErrorBoundary(list),
    listOutOfStockCount: asyncErrorBoundary(listOutOfStockCount),
    listPriceSummary: asyncErrorBoundary(listPriceSummary),
    listTotalWeightByProduct: asyncErrorBoundary(listTotalWeightByProduct),
};