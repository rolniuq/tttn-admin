import { Select } from "antd";

interface ProductHeaderDocument {
  nameSelected: string;
  priceSelected: string;
  handleSelectName(value: string): void;
  handleSelectPrice(value: string): void;
}

const { Option } = Select;

const ProductHeader = ({ nameSelected, priceSelected, handleSelectName, handleSelectPrice }: ProductHeaderDocument) => {
  return (
    <div className="product__header">
      <h3 className="product__header__title">Sắp xếp</h3>
      <div>
        Theo tên: <Select defaultValue={nameSelected} style={{ width: 150 }} onChange={handleSelectName}>
          <Option value="normal">Mặc định</Option>
          <Option value="increment">A - Z</Option>
          <Option value="decrement">Z - A</Option>
        </Select>
      </div>
      <div>
        Theo giá: <Select defaultValue={priceSelected} style={{ width: 150 }} onChange={handleSelectPrice}>
          <Option value="normal">Mặc định</Option>
          <Option value="increment">Tăng dần</Option>
          <Option value="decrement">Giảm dần</Option>
        </Select>
      </div>
    </div>
  )
}

export default ProductHeader
