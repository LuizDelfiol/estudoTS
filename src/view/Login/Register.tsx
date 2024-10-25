import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import axiosInstance from '../../Configs/axiosConfig'; // Importe sua instância do Axios
import { useNavigate } from 'react-router-dom';

interface RegisterFieldType {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;

}

const Register: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: RegisterFieldType) => {
        const { name, email, password, password_confirmation, role } = values;
    
        if (password !== password_confirmation) {
            notification.error({
                message: 'Erro de registro',
                description: 'As senhas não coincidem.',
            });
            return;
        }
    
        setLoading(true);
    
        try {
            await axiosInstance.post('/register', {
                name,
                email,
                password,
                password_confirmation,
                role
            });
    
            notification.success({
                message: 'Registro bem-sucedido!',
                description: 'Verifique seu e-mail para ativar sua conta.',
            });
    
            navigate('/login');
    
        } catch (error: unknown) {
            console.error('Registration failed:', error);
    
            notification.error({
                message: 'Erro de registro',
                description: 'Ocorreu um erro ao tentar registrar. Por favor, tente novamente.',
            });
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Form
                name='register'
                style={{ maxWidth: 400, background: 'white', padding: 20 }}
                onFinish={onFinish}
                autoComplete='off'
            >
                <Form.Item
                    name='name'
                    rules={[{ required: true, message: 'Por favor, preencha o campo de nome!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder='Nome' />
                </Form.Item>

                <Form.Item
                    name='role'
                    rules={[{ required: true, message: 'Por favor, preencha o campo de cargo!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder='Cargo' />
                </Form.Item>

                <Form.Item
                    name='email'
                    rules={[{ required: true, message: 'Por favor, preencha o campo de e-mail!' }]}
                >
                    <Input prefix={<MailOutlined />} placeholder='E-mail' />
                </Form.Item>

                <Form.Item
                    name='password'
                    rules={[{ required: true, message: 'Por favor, preencha o campo de senha!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder='Senha' />
                </Form.Item>

                <Form.Item
                    name='password_confirmation'
                    rules={[{ required: true, message: 'Por favor, confirme sua senha!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder='Confirme a Senha' />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit' loading={loading} style={{ width: '100%' }}>
                        Registrar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;