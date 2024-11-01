import React from 'react';
import { Breadcrumb, Layout, Spin, theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { LoadingOutlined } from '@ant-design/icons';


const { Header, Content } = Layout;

interface User {
    name: string;
}

interface TempleteProps {
    user?: User;
    children?: React.ReactNode;
}

const Dashbord: React.FC<TempleteProps> = ({ user }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <>
            <Header style={{ padding: 0, background: colorBgContainer }} />
            <Content >
                <Breadcrumb style={{ margin: '5px 0' }}>
                </Breadcrumb>
                <Content
                    style={{
                        padding: 24,
                        minHeight: 200,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {user ? (
                        <Content>
                            <h2>Bem-vindo, {user.name}!</h2>
                        </Content>
                    ) : (
                        <Content style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ margin: 8, }}>Carregando...</p>
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 20 }} />} />
                        </Content>
                    )}
                </Content>
            </Content>
            <Breadcrumb style={{ margin: '7px 0' }}>
            </Breadcrumb>
            <Footer
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
            </Footer>
        </>
    );
};

export default Dashbord;