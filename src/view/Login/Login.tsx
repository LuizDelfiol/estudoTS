import React from 'react';
import { Form, Input, Button, Checkbox, Row, FormProps } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

interface FieldType {
    username: string;
    password: string;
    remember: boolean;
}

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success: ', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Success: ', errorInfo);
};


const Login: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Form
                name='basic'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600, background: 'white' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
            >
                <Form.Item
                    label='Login'
                    name='username'
                    rules={[{ required: true, message: 'Atenção | Por favor, Preencha todos os campos!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Senha'
                    name='password'
                    rules={[{ required: true, message: 'Atenção | Por favor, Preencha todos os campos!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
                    <Row justify='end' style={{alignItems: 'center'}}>
                        <Checkbox style={{ padding: '2px' }}>Lembrar-se</Checkbox>
                        <Button type='primary' htmlType='submit'>
                            Entrar
                        </Button>
                    </Row>

                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>

                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;