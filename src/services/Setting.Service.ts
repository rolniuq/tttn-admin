import HttpService from "./getWays/Setting.GetWay";
import { ProductDocument } from "../interfaces/Product.Interface";
import { EnumURL, getTokenLocal } from "../utils/Common";
import axios from "axios";

export const Login = async (email: string, password: string) => {
  return await HttpService.post(EnumURL.login, {
    email: email,
    password: password,
  });
};

export const GetProfile = async () => {
  return await HttpService.get(EnumURL.profile);
};


//---CATEGORY
export const AddCategory = async (name: String) => {
  return await HttpService.post(`${EnumURL.category}`, {
    name: name,
  });
};

export const GetCategory = async (_id: String) => {
  return await HttpService.get(`${EnumURL.category}/${_id}`);
};

export const GetListCategories = async () => {
  return await HttpService.get(EnumURL.categories);
};

export const GetListCategorySorted = async (type: string) => {
  return await HttpService.post(EnumURL.sort.category, {
    type: type
  });
} 

export const EditCategory = async (_id: String, name: String) => {
  return await HttpService.put(`${EnumURL.category}/${_id}`, {
    name: name,
  });
};

export const DeleteCategory = async (_id: String) => {
  return await HttpService.delete(`${EnumURL.category}/${_id}`);
};

//---PRODUCTS
export const AddProduct = async (Product: ProductDocument) => {
  return await HttpService.post(EnumURL.product, {
    name: Product.name,
    price: Product.price,
    images: Product.images,
    description: Product.description,
    category: Product.category._id,
  });
};

export const GetProduct = async (_id: string) => {
  return await HttpService.get(`${EnumURL.product}/${_id}`);
};

export const GetListProducts = async () => {
  return await HttpService.get(EnumURL.products);
};

export const GetListProductSortByName = async (type: string) => {
  return await HttpService.post(EnumURL.sort.product.name, {
    type: type
  });
}

export const GetListProductSortedByPrice = async (type: string) => {
  return await HttpService.post(EnumURL.sort.product.price, {
    type: type
  });
}

export const EditProduct = async (Product: ProductDocument) => {
  console.log(Product);
  return await HttpService.put(`${EnumURL.product}/${Product._id}`, {
    name: Product.name,
    price: Product.price,
    images: Product.images,
    description: Product.description,
    category: Product.category._id,
  });
};

export const DeleteProduct = async (_id: string) => {
  return await HttpService.delete(`${EnumURL.product}/${_id}`);
};

//---ORDER
export const GetListOrders = async () => {
  return await HttpService.get(EnumURL.orders);
};

export const GetListOrdersWithStatus = async (status: string) => {
  return await HttpService.get(`${EnumURL.orders}/${status}`);
};

export const UpdateStatusOrder = async (id: string, status: string) => {
  return await HttpService.post(`${EnumURL.orderUpdate}/${id}`, {
    status: status,
  });
};

//Statistic
export const StatisticOrderByMonth = async () => {
  return await HttpService.get(EnumURL.statistic);
}

//Image
export const UploadImage = async (file: any, id: string) => {
  const fd = new FormData();
  fd.append("image", file);
  return await axios.post(`${EnumURL.baseUrl}/${EnumURL.image}/${id}`, fd, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
};

export const UpdateImage = async (file: any, id: string) => {
  const fd = new FormData();
  fd.append("image", file);
  return await axios.put(`${EnumURL.baseUrl}/${EnumURL.image}/${id}`, fd, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + getTokenLocal(),
    },
  });
}
