import { useState, useEffect } from "react";
import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { getTokenLocal } from "utils/Common";
import { GetProfile } from "../services/Setting.Service";

const MyAvatar = () => {
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const tokenLocal: any = getTokenLocal();
    setToken(tokenLocal);
  }, []);

  useEffect(() => {
    if (token) {
      GetProfile()
        .then(res => setUser(res.data.result))
        .catch(e => console.log(e));
    }
  }, [token]);

  return (
    <div className="logo">
      <Avatar size={64} icon={<UserOutlined />} />
      <p className="info__login">
        {user ? user.lastName + " " + user.firstName : "LOADING"}
      </p>
    </div>
  )
}

export default MyAvatar
