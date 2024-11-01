import React from 'react';
import { Breadcrumb, Layout, theme } from 'antd';

const { Content } = Layout;



const Templete: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    return (
        <>
            <Content >
                <Breadcrumb style={{ margin: '4px 0' }}>
                </Breadcrumb>
                <Content
                    style={{
                        minHeight: 360,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >

                    {children}
                </Content>
            </Content>
        </>
    );
};

export default Templete;