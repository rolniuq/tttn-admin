import { Select } from "antd";

interface OrderHeaderDocument {
  handleChange(value: string) : void;
}

const { Option } = Select;

const OrderHeader = ({ handleChange } : OrderHeaderDocument) => {
  const handleSelect = (value: string) => {
    handleChange(value);
  }

  return (
    <div className="order__header">
      <h3 className="order__header__title">Đơn hàng</h3>
      <Select defaultValue="all" style={{ width: 150 }} onChange={handleSelect}>
        <Option value="all">Tất cả</Option>
        <Option value="unconfirmed">Chưa xác nhận</Option>
        <Option value="waiting">Đang chờ</Option>
        <Option value="shipping">Đang giao</Option>
        <Option value="shipped">Đã giao</Option>
        <Option value="cancled">Đã hủy</Option>
      </Select>
    </div>
  )
}

export default OrderHeader
