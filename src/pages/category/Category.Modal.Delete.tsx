import { Dispatch, SetStateAction, useState } from 'react';
import { DeleteCategory } from 'services/Setting.Service';
import { AnimationModal, RefeshRoute } from 'utils/Common';
import { Modal } from "antd";
import { useHistory } from "react-router-dom";

interface CategoryDelete {
  _id: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const CategoryModalDelete = ({ _id, show, setShow }: CategoryDelete) => {
  const [modalText, setModalText] = useState<String>('');
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const history = useHistory();
  
  const handleOk = () => {
    setConfirmLoading(true);
    DeleteCategory(_id)
      .then(() => {
        AnimationModal(setShow, setConfirmLoading);
        RefeshRoute(history, "/category");
      })
      .catch((e) => {
        console.log(e);
        setModalText("Đã xảy ra lỗi!");
        AnimationModal(setShow, setConfirmLoading);
      })
  }

  const handleCancel = () => {
    setShow(false);
  }

  return (
    <Modal
      title="Xóa danh mục"
      visible={show}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {
        modalText ? (
          <p className="modal__status__error">{modalText}</p>
        ) : (
          <p>Bạn có chắc chắn muốn xóa ?</p>
        )
      }
    </Modal>
  )
}

export default CategoryModalDelete
