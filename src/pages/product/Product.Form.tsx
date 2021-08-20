import { useState, useEffect } from 'react';
import Spinner from 'components/Spinner';
import { GetListProducts, GetListProductSortByName, GetListProductSortedByPrice } from "services/Setting.Service";
import { ProductDocument } from 'interfaces/Product.Interface';
import Header from "components/Header";
import HeaderSort from "./Product.Header";
import ProductModalAdd from './Product.Modal.Add';
import ProductModalEdit from './Product.Modal.Edit';
import ProductModalDelete from './Product.Modal.Delete';
import { formatMoney, EnumURL } from 'utils/Common';

const ProductForm = () => {
  const [products, setProducts] = useState<ProductDocument[]>()
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleAdd, setVisibleAdd] = useState<boolean>(false);
  const [visibleEdit, setVisibleEdit] = useState<boolean>(false);
  const [visibleDelete, setVisibleDelete] = useState<boolean>(false);
  const [nameSelected, setNameSelected] = useState<string>("normal");
  const [priceSelected, setPriceSelected] = useState<string>("normal");
  const [id, setID] = useState<string>("");

  useEffect(() => {
    if (nameSelected === "normal") {
      GetListNormal();
      return;
    }

    ListSortByName();
  }, [nameSelected]);

  useEffect(() => {
    if (priceSelected === "normal") {
      GetListNormal();
      return;
    }

    ListSortByPrice();
  }, [priceSelected]);

  const GetListNormal = () => {
    GetListProducts()
      .then(res => {
        setLoading(false);
        setProducts(res.data.result);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }

  const ListSortByName = () => {
    GetListProductSortByName(nameSelected)
      .then(res => {
        setLoading(false);
        setProducts(res.data.result);
      })
      .catch(e => {
        setLoading(false);
        console.log(e);
      })
  }

  const ListSortByPrice = () => {
    GetListProductSortedByPrice(priceSelected)
      .then(res => {
        setLoading(false);
        setProducts(res.data.result);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      })
  }

  const handleClickEdit = (_id: string) => {
    setVisibleEdit(true);
    setID(_id);
  }

  const handleClickDelete = (_id: string) => {
    setVisibleDelete(true);
    setID(_id);
  }

  const handleSelectName = (value: string) => {
    setLoading(true);
    setNameSelected(value);
  }

  const handleSelectPrice = (value: string) => {
    setLoading(true);
    setPriceSelected(value);
  }

  return (
    <div className="product">
      {
        loading ? (
          <Spinner />
        ) : (
          <>
            <Header headerName="Sản phẩm" setShowAdd={setVisibleAdd} />
            <HeaderSort
              nameSelected={nameSelected}
              priceSelected={priceSelected}
              handleSelectName={handleSelectName}
              handleSelectPrice={handleSelectPrice}
            />
            {
              products && products.map(product => {
                return (
                  <div className="product__item" key={product._id}>
                    <span className="product__item__text">{product.name}</span>
                    <span className="product__item__text">
                      <img className="product__item__img" src={product.images[0] && `${EnumURL.baseUrl}${product.images[0].name}`} alt="i" />
                    </span>
                    <span className="product__item__text">{formatMoney(product.price)}</span>
                    <span className="product__item__text">{product.description}</span>
                    <span className="product__item__button">
                      <span onClick={() => handleClickEdit(product._id)}>📝</span>
                    </span>
                    <span className="product__item__button">
                      <span onClick={() => handleClickDelete(product._id)}>🗑️</span>
                    </span>
                  </div>
                )
              })
            }
            {
              visibleAdd === true && (
                <ProductModalAdd
                  visible={visibleAdd}
                  setVisible={setVisibleAdd}
                />
              )
            }
            {
              visibleEdit === true && (
                <ProductModalEdit
                  _id={id}
                  visible={visibleEdit}
                  setVisible={setVisibleEdit}
                />
              )
            }
            {
              visibleDelete === true && (
                <ProductModalDelete
                  _id={id}
                  visible={visibleDelete}
                  setVisible={setVisibleDelete}
                />
              )
            }
          </>
        )
      }
    </div>
  )
}

export default ProductForm
