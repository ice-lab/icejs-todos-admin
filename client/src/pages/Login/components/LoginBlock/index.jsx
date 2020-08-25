import React, { useState } from 'react';
import { Input, Message, Form } from '@alifd/next';
import { history, useAuth } from 'ice';
import authService from '@/services/auth';

import styles from './index.module.scss';

const { Item } = Form;
const DEFAULT_DATA = {
  name: 'user',
  password: 'password'
};

const LoginBlock = (
  props = {
    dataSource: DEFAULT_DATA,
  },
) => {
  const { dataSource = DEFAULT_DATA } = props;
  const [postData, setValue] = useState(dataSource);
  const [auth, setAuth] = useAuth();

  const formChange = values => {
    setValue(values);
  };

  const handleSubmit = async (values, errors) => {
    if (errors) {
      console.log('errors', errors);
      return;
    }

    try {
      const res = await authService.login(values);

      if (res.code === 1000) {
        Message.success('登录成功');
        setAuth({
          roles: ['user']
        })
        history.push('/');
      } else {
        Message.error('登录失败');
      }
    } catch (err) {
      console.error(err);
      Message.error('请求出错');
    }

  };

  const accountForm = (
    <>
      <Item required requiredMessage="必填">
        <Input name="name" maxLength={20} placeholder="用户名" />
      </Item>
      <Item
        required
        requiredMessage="必填"
        style={{
          marginBottom: 0,
        }}
      >
        <Input.Password name="password" htmlType="password" placeholder="密码" />
      </Item>
    </>
  );

  return (
    <div className={styles.LoginBlock}>
      <div className={styles.innerBlock}>
        <a href="#">
          <img
            className={styles.logo}
            src="https://img.alicdn.com/tfs/TB1KtN6mKH2gK0jSZJnXXaT1FXa-1014-200.png"
            alt="logo"
          />
        </a>
        <div className={styles.desc}>
          <span className={styles.active}>
            账户密码登录
          </span>
        </div>

        <Form value={postData} onChange={formChange} size="large">
          { accountForm }

          <div className={styles.infoLine}>
            <Item
              style={{
                marginBottom: 30,
              }}
            />
          </div>

          <Item
            style={{
              marginBottom: 0,
            }}
          >
            <Form.Submit
              type="primary"
              onClick={handleSubmit}
              className={styles.submitBtn}
              validate
            >
              登录
            </Form.Submit>
          </Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginBlock;
