import { useState, useEffect, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Modal, Input } from "antd";
import { EditProduct, GetListCategories, GetProduct, UpdateImage } from 'services/Setting.Service';
import Spinner from 'components/Spinner';
import { ProductDocument } from 'interfaces/Product.Interface';
import { AnimationModal, EnumURL, RefeshRoute } from "utils/Common";
import { Select } from "antd";
import { CategoryDocument } from 'interfaces/Category.Inteface';
import Validate from "./Product.Validate";
import { useHistory } from "react-router-dom"; 

interface ProductEdit {
  _id: string;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const { Option } = Select;

const ProductModalEdit = ({ _id, visible, setVisible }: ProductEdit) => {
  const [modalText, setModalText] = useState<String>('');
  const [product, setProduct] = useState<ProductDocument>({
    _id: "",
    name: "",
    price: 0,
    images: [""],
    description: "",
    category: {
      _id: "",
      name: ""
    }
  });
  const [file, setFile] = useState<FileList | null>();
  const [categories, setCategories] = useState<CategoryDocument[]>();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>();
  const history = useHistory();

  useEffect(() => {
    GetProduct(_id)
      .then(res => {
        setProduct(res.data.result);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      })
  }, []);

  useEffect(() => {
    GetListCategories()
      .then(res => {
        setCategories(res.data.result)
      })
      .catch(e => {
        console.log(e)
      });
  }, [])

  const handleOk = () => {
    if (!Validate(product)) {
      setMessage("Hãy hoàn thành đầy đủ các thông tin")
      return;
    }

    setConfirmLoading(true);
    EditProduct(product)
      .then(() => {
        AnimationModal(setVisible, setConfirmLoading);
        if (file) handeUpdateImage(product._id);
        RefeshRoute(history, "/product");
      })
      .catch((e) => {
        console.log(e);
        setModalText('Cập nhật thất bại');
        AnimationModal(setVisible, setConfirmLoading);
      });
  };

  const handleInputText = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    setMessage("");
    if (type === "name") setProduct(prev => ({ ...prev, name: e.target.value }));
    if (type === "price") setProduct(prev => ({ ...prev, price: e.target.value as any }));
    if (type === "description") setProduct(prev => ({ ...prev, description: e.target.value }));
  }

  const handleChangeSelect = (value: string) => {
    setProduct(prev => ({ ...prev, category: { _id: value, name: "" } }));
  }

  const handleInputImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files: any = e.target.files;
    setFile(files[0]);
  }

  const handeUpdateImage = (id: string) => {
    UpdateImage(file, id)
      .then(() => {
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }

  return (
    <Modal
      title="Sửa danh mục"
      visible={visible}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={() => setVisible(false)}
    >
      {
        loading ? (
          <Spinner />
        ) : (
          <>
            {
              modalText ? (
                <p className="modal__status__error">{modalText}</p>
              ) : (
                <>
                  <p>*Tên sản phẩm:</p>
                  <Input value={product.name} onChange={(e) => handleInputText(e, "name")} />
                  <p>*Giá:</p>
                  <Input value={product.price} type="number" onChange={(e) => handleInputText(e, "price")} />
                  <p>*Mô tả:</p>
                  <Input value={product.description} onChange={(e) => handleInputText(e, "description")} />
                  <p>*Thể loại:</p>
                  {
                    product && categories && (
                      <Select defaultValue={product.category._id} onChange={handleChangeSelect} style={{ width: 200 }}>
                        {
                          categories.map(category => {
                            return (
                              <Option key={category._id} value={category._id}>{category.name}</Option>
                            )
                          })
                        }
                      </Select>
                    )
                  }
                  <p>*Hình ảnh:</p>
                  <div className="product__modal__edit">
                    <img className="product__modal__edit__image"
                      src={`${EnumURL.baseUrl}${product.images[0].name}`}
                      alt="i"
                    />
                    <Input type="file" onChange={handleInputImage} />
                  </div>
                  {message && <p className="release-status">{message}</p>}
                </>
              )
            }
          </>
        )
      }
    </Modal>
  );
}

export default ProductModalEdit
