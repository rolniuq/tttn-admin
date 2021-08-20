import { useState, ChangeEvent, useEffect, Dispatch, SetStateAction } from 'react';
import { Modal, Input, Select } from "antd";
import { AddProduct, GetListCategories, UploadImage } from 'services/Setting.Service';
import { ProductDocument } from "interfaces/Product.Interface";
import { CategoryDocument } from 'interfaces/Category.Inteface';
import { AnimationModal, RefeshRoute } from 'utils/Common';
import Spinner from 'components/Spinner';
import Validate from "./Product.Validate";
import { useHistory } from "react-router-dom";

interface CategoryAdd {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const { Option } = Select;

const ProductModalAdd = ({ visible, setVisible }: CategoryAdd) => {
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
  const [categories, setCategories] = useState<CategoryDocument[]>();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<String>("");
  const [err, setErr] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [file, setFile] = useState<FileList | null>();
  const history = useHistory();

  useEffect(() => {
    GetListCategories()
      .then((res) => {
        setCategories(res.data.result);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      })
  }, []);

  const UploadImg = (id: string) => {
    UploadImage(file, id)
      .then(() => {
        AnimationModal(setVisible, setConfirmLoading);
        RefeshRoute(history, "/product");
      })
      .catch((e) => {
        console.log(e);
        AnimationModal(setVisible, setConfirmLoading);
      });
  }

  const handleOk = () => {
    if (!Validate(product)) {
      setErr("Hoàn thành đầy đủ các thông tin");
      return;
    }

    setConfirmLoading(true);
    AddProduct(product)
      .then((res) => {
        const id = res.data.result._id;
        UploadImg(id);
      })
      .catch((e) => {
        console.log(e);
        setMessage("Thêm sản phẩm thất bại");
        setVisible(false);
        setConfirmLoading(false);
      });
  };

  const handleInputText = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMessage("");
    setProduct(prev => ({ ...prev, name: e.target.value }))
  }

  const handleInputPrice = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    setProduct(prev => ({ ...prev, price: e.target.value as any }))
  }

  const handleInputFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files: any = e.target.files;
    setFile(files[0]);
  }

  const handleInputDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    setProduct(prev => ({ ...prev, description: e.target.value }))
  }

  const onChange = (value: string) => {
    setProduct(prev => ({ ...prev, category: { _id: value, name: "" } }));
  }

  return (
    <Modal
      title="Thêm sản phẩm"
      visible={visible}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={() => setVisible(false)}
    >
      {
        message ? (
          <p className="modal__status__error">{message}</p>
        ) : (
          <>
            {
              loading ? (
                <Spinner />
              ) : (
                <>
                  <p>*Tên sản phẩm</p>
                  <Input onChange={(e) => handleInputText(e)} />
                  <p>*Giá</p>
                  <Input type="number" min="1" onChange={(e) => handleInputPrice(e)} />
                  <p>*Ảnh</p>
                  <Input type="file" onChange={(e) => handleInputFile(e)} />
                  <p>*Mô tả</p>
                  <Input type="text" onChange={(e) => handleInputDescription(e)} />
                  <p>*Loại</p>
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Loại danh mục"
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={(input, option) =>
                      option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {
                      categories && categories.map(category => {
                        return (
                          <Option key={category._id}
                            value={category._id}
                          >
                            {category.name}
                          </Option>
                        )
                      })
                    }
                  </Select>
                  {err && err && <p className="release-status">{err}</p>}
                </>
              )
            }
          </>
        )
      }
    </Modal>
  );
}

export default ProductModalAdd
