import { Dispatch, SetStateAction, useState } from 'react';
import { Modal } from "antd";
import { AnimationModal, RefeshRoute } from "../../utils/Common";
import { UpdateStatusOrder } from '../../services/Setting.Service';
import { useHistory } from "react-router-dom";

interface OrderModal {
  _id: string;
  status: string;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const OrderModal = ({ _id, status, show, setShow }: OrderModal) => {
  const [message, setMessage] = useState<string>("");
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const history = useHistory();

  const handleOk = () => {
    setConfirmLoading(true);
    UpdateStatusOrder(_id, status)
      .then(() => {
        AnimationModal(setShow, setConfirmLoading);
        RefeshRoute(history, "/order");
      })
      .catch((e) => {
        console.log(e);
        setMessage("Đã xảy ra lỗi");
        AnimationModal(setShow, setConfirmLoading);
      })
  };

  const handleCancel = () => {
    setShow(false);
  };

  return (
    <Modal
      title="Cập nhật thông tin đơn hàng"
      visible={show}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {
        message ? (
          <p className="release-status">{message}</p>
        ) : (
          <p>Bạn đã chắn chắn đã thực hiện đúng quy trình ?</p>
        )
      }
    </Modal>
  );
}

export default OrderModal;
