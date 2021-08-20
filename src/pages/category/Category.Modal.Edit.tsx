import { useState, useEffect, ChangeEvent, SetStateAction, Dispatch } from 'react';
import { Modal, Input } from "antd";
import { EditCategory, GetCategory } from 'services/Setting.Service';
import { AnimationModal, RefeshRoute } from 'utils/Common';
import Spinner from 'components/Spinner';
import { useHistory } from "react-router-dom";

interface CategoryEdit {
  _id: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const CategoryModalEdit = ({ _id, show, setShow }: CategoryEdit) => {
  const [modalText, setModalText] = useState<String>('');
  const [name, setName] = useState<string>("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState<Boolean>(true);
  const history = useHistory();

  useEffect(() => {
    GetCategory(_id)
      .then(res => {
        setLoadingModal(false);
        setName(res.data.result.name);
      })
      .catch((e) => {
        setLoadingModal(false);
        console.log(e);
      })
  }, []);

  const handleOk = () => {
    setConfirmLoading(true);
    EditCategory(_id, name)
      .then(() => {
        AnimationModal(setShow, setConfirmLoading);
        RefeshRoute(history, "/category");
      })
      .catch((e) => {
        console.log(e);
        setModalText('Cập nhật thất bại');
        AnimationModal(setShow, setConfirmLoading);
      })
  };

  const handleCancel = () => {
    setShow(false);
  };

  const handleInputText = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  }

  return (
    <Modal
      title="Sửa danh mục"
      visible={show}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {
        loadingModal ? (
          <Spinner />
        ) : (
          <>
            {
              modalText ? (
                <p className="modal__status__error">{modalText}</p>
              ) : (
                <>
                  <p>*Tên:</p>
                  <Input value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputText(e)} />
                </>
              )
            }
          </>
        )
      }
    </Modal>
  );
}

export default CategoryModalEdit
