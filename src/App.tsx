import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PrivateRoute from './configs/privateRoute';
import Table from './components/Table';
import Login from './view/login/Login';
import Templete from './view/Templete';
import Dashbord from './view/Dashbord';
import { Layout, Spin } from 'antd';
import Sidebar from './components/Sidebar';
import { LoadingOutlined } from '@ant-design/icons';
import FormRegister from './components/form/FormRegister';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 180 }} />}>
      <Layout style={{ minHeight: '100vh' }}>
        {location.pathname !== '/' && <Sidebar />}
        <Layout style={{ margin: '0 10px' }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashbord" element={<PrivateRoute element={<Dashbord />} />} />
            <Route path="/management-users" element={<PrivateRoute element={<Templete><Table /></Templete>} />} />
            <Route path="/register" element={<PrivateRoute element={<Templete><FormRegister /></Templete>} />} />
          </Routes>
        </Layout>
      </Layout>
    </Spin>
  );
};

export default App;