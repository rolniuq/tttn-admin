import { ProductDocument } from "interfaces/Product.Interface";

const ValidateProduct = (product: ProductDocument) => {
  if (
    !product.name ||
    !product.price ||
    !product.category ||
    !product.images
  ) {
    return false;
  }

  if (product.price < 0) {
    return false;
  }

  return true;
};

export default ValidateProduct;
