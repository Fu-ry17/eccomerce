import React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../../utils/TypeScript';
import Loading from './Loading';
import Toast from './Toast';

function Alert() {
  const { alert } = useSelector((state: RootStore) => state)

  return <div>
      { alert.loading && <Loading />}

      { (alert.error || alert.success) && <Toast alert={alert}/>}
  </div>;
}

export default Alert;
