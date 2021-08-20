import React from 'react';
import { Button } from "antd";

interface HeaderDocument {
  headerName: String;
  setShowAdd: any;
}

const Header = ({ headerName, setShowAdd } : HeaderDocument) => {
  const handleClickAdd = () => {
    setShowAdd(true);
  }

  return (
    <div className="header">
      <h3 className="header__title">{headerName}</h3>
      <Button className="header__button" onClick={handleClickAdd}>
        + Thêm
      </Button>
    </div>
  )
}

export default Header
