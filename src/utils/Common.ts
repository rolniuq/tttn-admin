export const setTokenLocal = (token: string) => {
  sessionStorage.setItem("token", token);
};

export const getTokenLocal = () => {
  return sessionStorage.getItem("token") || null;
};

export const removeUserSession = () => {
  sessionStorage.removeItem("token");
};

export const formatMoney = (money: number) => {
  return money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ") + " đồng";
};

export const priceSize = {
  S: 0,
  M: 5000,
  L: 10000,
};

export const ConvertDate = (date: Date) => {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

export const EnumURL = {
  baseUrl: "http://localhost:2000",
  login: "/login",
  category: "/category",
  categories: "/categories",
  product: "/product",
  products: "/products",
  sort: {
    product: {
      name: "/products/sort/name",
      price: "/products/sort/price",
    },
    category: "/categories/sort",
  },
  orders: "/orders",
  orderUpdate: "/order/update",
  statistic: "/statistic/month",
  image: "image",
  profile:"/profile"
};

export const AnimationModal = (setVisible: any, setConfirmLoading: any) => {
  setVisible(false);
  setConfirmLoading(false);
};

export const ConvertStatus = (status: string) => {
  switch (status) {
    case "unconfirmed": {
      return "Chưa xác nhận";
    }
    case "waiting": {
      return "Đang chờ";
    }
    case "shipping": {
      return "Đang giao";
    }
    case "shipped": {
      return "Đã giao";
    }
    case "canceled": {
      return "Đã hủy";
    }
  }
};

export const ConvertStatusButton = (status: string) => {
  switch (status) {
    case "unconfirmed": {
      return "Xác nhận";
    }
    case "waiting": {
      return "Đang giao";
    }
    case "shipping": {
      return "Đã nhận";
    }
  }
};

export const RefeshRoute = (history: any, path: string) => {
  history.push("/");
  history.push(path);
}
