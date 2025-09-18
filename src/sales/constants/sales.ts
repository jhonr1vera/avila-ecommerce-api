export const SalesConstants = {
  Success: {
    deletedSale: "Sale deleted successfully",
    updateSaleStatus: "Sale status updated successfully"
  },
  Error: {
    InternalServerErrorById: "There was an error while fetching the sale by id",
    InternalServerError: "There was an error while fetching the sales",
    InternalServerErrorAdd: "There was an error while adding the sale",
    InternalServerErrorDelete: "There was an error while deleting the sale",
    InternalServerErrorUpdateStatus: "There was an error while updating status sale",
    InternalServerErrorSaleItem: "There was an error fetching a sale item",
    NotFoundError: "No sales data found",
    NotFoundErrorById: "No sale found with the provided id",
    NotFoundErrorBySaleItemId: "No sale item found with the provided id",
    BadRequestErrorSale: "No sale id was provided in request",
    BadRequestErrorUser: "No user id was provided in request",
    ForbiddenErrorOwnerOnly: "You do not have access to this resource. Need to be a owner",
    ForbiddenErrorUserOnly: "This action can only be performed by an user account",
  },
  ConsoleLog: {
    ErrorDeletingSaleItem: "There was an error deleting the following sale item"
  }
};
