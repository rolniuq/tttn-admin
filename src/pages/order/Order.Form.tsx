import { useState, useEffect } from 'react'
import Spinner from 'components/Spinner';
import { GetListOrders, GetListOrdersWithStatus } from 'services/Setting.Service';
import OrderHeader from './Order.Header';
import { OrderDocument } from 'interfaces/Order.Interface';
import { Button } from "antd";
import { formatMoney, ConvertStatus, ConvertStatusButton } from 'utils/Common';
import OrderModal from './Order.Modal';

const OrderForm = () => {
  const [orders, setOrders] = useState<OrderDocument[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [select, setSelect] = useState<any>("all");
  const [show, setShow] = useState<boolean>(false);
  const [id, setID] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (select === "all") {
      GetListOrders()
        .then(res => {
          setOrders(res.data.result);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
      return;
    }
    GetListOrdersWithStatus(select)
      .then(res => {
        setLoading(false);
        setOrders(res.data.result);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      })
  }, [select]);

  const handleChange = (value: string) => {
    setSelect(value);
  }

  const handleClickChangeStatus = (_id: string, status: string) => {
    setShow(true);
    setID(_id);
    if (status === "unconfirmed") {
      setStatus("waiting");
    }
    if (status === "waiting") {
      setStatus("shipping");
    }
    if (status === "shipping") {
      setStatus("shipped");
    }
  }

  return (
    <div className="order">
      {
        loading ? (
          <Spinner />
        ) : (
          <>
            <OrderHeader handleChange={handleChange} />
            {
              orders && orders.map(order => {
                return (
                  <div className="order__item" key={order._id}>
                    <span className="order__item__text">{order.infoGuest.lastName + " " + order.infoGuest.firstName}</span>
                    <span className="order__item__text">{formatMoney(order.total)}</span>
                    <span className="order__item__text">{order.infoGuest.address}</span>
                    <span className="order__item__text">{ConvertStatus(order.status)}</span>
                    <span className="order__item__button">
                      {
                        ConvertStatusButton(order.status) && (
                          <Button onClick={() => handleClickChangeStatus(order._id, order.status)}>
                            {ConvertStatusButton(order.status)}
                          </Button>
                        )
                      }
                    </span>
                  </div>
                )
              })
            }
            {
              show === true && (
                <OrderModal
                  _id={id}
                  status={status}
                  show={show}
                  setShow={setShow}
                />
              )
            }
          </>
        )
      }
    </div>
  )
}

export default OrderForm
