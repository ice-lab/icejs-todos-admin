import React from 'react';
import { Avatar, Overlay, Menu, Icon, Message } from '@alifd/next';
import { useAuth } from 'ice';
import authService from '@/services/auth';

import styles from './index.module.scss';

const { Item } = Menu;
const { Popup } = Overlay;

const UserProfile = ({ name, avatar }) => (
  <div className={styles.profile}>
    <div className={styles.avatar}>
      <Avatar src={avatar} alt="用户头像" />
    </div>
    <div className={styles.content}>
      <h4>{name}</h4>
    </div>
  </div>
);

const HeaderAvatar = props => {
  const { name, avatar } = props;

  const [auth, setAuth] = useAuth();

  async function logout () {
    try {
      const res = await authService.logout();
      if (res.code === 1000) {
        Message.success('登出成功');
        setAuth({
          roles: []
        })
      } else {
        Message.error('操作失败');
      }
    } catch (err) {
      Message.error('操作失败');
      console.error(err);
    }
  }

  return (
    <Popup
      trigger={
        <div className={styles.headerAvatar}>
          <Avatar size="small" src={avatar} alt="用户头像" />
          <span
            style={{
              marginLeft: 10,
            }}
          >
            { name }
          </span>
        </div>
      }
      triggerType="click"
    >
      <div className={styles.avatarPopup}>
        <UserProfile {...props} />
        <Menu className={styles.menu}>
          <Item onClick={logout}>
            <Icon size="small" type="exit" />
            退出
          </Item>
        </Menu>
      </div>
    </Popup>
  );
};

HeaderAvatar.defaultProps = {
  name: 'user',
  avatar: 'https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png',
};
export default HeaderAvatar;
