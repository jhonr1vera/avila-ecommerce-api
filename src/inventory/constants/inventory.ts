export const InventoryConstants = {
    Success : {
        deletedProduct: "Product deleted successfully",
    },
    Error : {
        notFoundError: "No products found",
        notFoundErrorById: "Product by id not found",
        internalServerError: "There was an error while fetching products",
        internalServerErrorById: "There was an error while fetching product by id",
        internalServerErrorAdd: "There was an error while adding product",
        internalServerErrorUpdate: "There was an error while updating product",
        internalServerErrorDelete: "There was an error while deleting product",
        InsufficientStockError: "There is not stock for this product",
        UpdatingStockError: "There was an error updating this product stock",
        BadRequestError: "No product id provided in request"
    }
}