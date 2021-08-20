import { Select } from "antd";

interface CategoryHeaderDocument {
  nameSelected: string;
  handleSelectName(value: string): void;
}

const { Option } = Select;

const CategoryHeader = ({ nameSelected, handleSelectName }: CategoryHeaderDocument) => {
  return (
    <div className="category__header">
      <h3 className="category__header__title">Sắp xếp</h3>
      <div>
        Theo tên: <Select defaultValue={ nameSelected } style={{ width: 150 }} onChange={handleSelectName}>
        <Option value="normal">Mặc định</Option>
          <Option value="increment">A - Z</Option>
          <Option value="decrement">Z - A</Option>
        </Select>
      </div>
    </div>
  )
}

export default CategoryHeader
