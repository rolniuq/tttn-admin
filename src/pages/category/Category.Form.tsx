import { useState, useEffect } from 'react';
import { GetListCategories, GetListCategorySorted } from "../../services/Setting.Service";
import { CategoryDocument } from '../../interfaces/Category.Inteface';
import CategoryModalEdit from './Category.Modal.Edit';
import CategoryModalDelete from './Category.Modal.Delete';
import CategoryModalAdd from './Category.Modal.Add';
import Spinner from '../../components/Spinner';
import Header from '../../components/Header';
import HeaderSort from "./Category.Header";

const CategoryForm = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<CategoryDocument[]>();
  const [id, setID] = useState<string>("");
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [nameSelected, setNameSelected] = useState<string>("normal");

  useEffect(() => {
    if (nameSelected === "normal") {
      GetListCategories()
        .then(res => {
          setCategories(res.data.result);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
      return;
    }

    GetListCategorySorted(nameSelected)
      .then(res => {
        setLoading(false);
        setCategories(res.data.result);
      })
      .catch(e => {
        setLoading(false);
        console.log(e);
      });
  }, [nameSelected, categories]);

  const handleClickEdit = (_id: string): any => {
    setID(_id);
    setShowEdit(true);
  }

  const handleClickDelete = (_id: string): any => {
    setID(_id);
    setShowDelete(true);
  }

  const handleSelectName = (value: string) => {
    setLoading(true);
    setNameSelected(value);
  }

  return (
    <div className="category">
      {
        loading ? (
          <Spinner />
        ) : (
          <>
            <Header headerName="Danh mục" setShowAdd={setShowAdd} />
            <HeaderSort
              nameSelected={nameSelected}
              handleSelectName={handleSelectName}
            />
            {
              categories && categories.map(category => {
                return (
                  <div className="category__item" key={category._id}>
                    <span className="category__item__text">{category.name}</span>
                    <span className="category__item__text">{(category.createdBy)}</span>
                    <span className="category__item__text">{(category.updatedBy)}</span>
                    <span className="category__item__button">
                      <span onClick={() => handleClickEdit(category._id)}>📝</span>
                    </span>
                    <span className="category__item__button">
                      <span onClick={() => handleClickDelete(category._id)}>🗑️</span>
                    </span>
                  </div>
                )
              })
            }
            {
              showAdd === true && (
                <CategoryModalAdd show={showAdd} setShow={setShowAdd} />
              )
            }
            {
              (showEdit === true && id) && (
                <CategoryModalEdit _id={id} show={showEdit} setShow={setShowEdit} />
              )
            }
            {
              (showDelete === true && id) && (
                <CategoryModalDelete _id={id} show={showDelete} setShow={setShowDelete} />
              )
            }
          </>
        )
      }
    </div>
  )
}

export default CategoryForm
