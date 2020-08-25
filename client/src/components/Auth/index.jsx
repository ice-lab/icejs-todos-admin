import React from 'react';
import { useAuth, Redirect } from 'ice';

const WrapperPage = (PageComponent) => {

  const WrappedPage = (props) => {
    const [auth] = useAuth();
    const needAuth = !auth.roles.includes('user');
    return (
      needAuth ? <Redirect to="/user/login" /> : <PageComponent {...props} />
    )
  };
  return WrappedPage;
};

export default WrapperPage;
