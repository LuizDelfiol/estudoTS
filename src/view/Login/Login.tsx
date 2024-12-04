import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axiosInstance from '../../configs/axiosConfig'; 
import { useNavigate } from 'react-router-dom';

interface FieldType {
    email: string;
    password: string;
    remember: boolean;
}

const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: FieldType) => {
        const { email, password, remember } = values;

        setLoading(true);

        try {
            const response = await axiosInstance.post('/', {
                email,
                password,
            });

            const token = response.data.token;
            console.log('Login successful, token: ', token);

            if (remember) {
                localStorage.setItem('token', token);
            } else {
                sessionStorage.setItem('token', token);
            }

            notification.success({
                message: 'Login bem-sucedido!',
                description: 'Você foi autenticado com sucesso.',
            });

            navigate('/dashbord');

        } catch (error: unknown) {
            console.error('Login failed:', error);



            notification.error({
                message: 'Erro de login',
            });
        } finally {
            setLoading(false);
        }
    };


    return (
            <Form
                name='basic'
                style={{ maxWidth: 500, maxHeight: 400, background: 'white', padding: 20, justifyContent: 'center', alignSelf: 'center', borderRadius: 5, margin: 'auto' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete='off'
            >
                <Form.Item
                    name='email'
                    rules={[{ required: true, message: 'Por favor, preencha o campo de e-mail!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder='E-mail' />
                </Form.Item>

                <Form.Item
                    name='password'
                    rules={[{ required: true, message: 'Por favor, preencha o campo de senha!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder='Senha' />
                </Form.Item>

                <Form.Item name='remember' valuePropName='checked'>
                    <Checkbox>Lembrar-me</Checkbox>
                </Form.Item>

                <Form.Item name="register">
                    <Button type="link" onClick={() => navigate('/register')}>
                        Registrar
                    </Button>
                </Form.Item>


                <Form.Item>
                    <Button type='primary' htmlType='submit' loading={loading} style={{ width: '100%' }}>
                        Entrar
                    </Button>
                </Form.Item>
            </Form>
    );
};

export default Login;
