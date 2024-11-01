import React, { useState } from 'react';
import { Form, Input, notification, Select, Row, Col, Button, Typography, Skeleton } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import axiosInstance from '../../configs/axiosConfig';
import { useNavigate } from 'react-router-dom';

interface RegisterFieldType {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
}

const FormRegister: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<RegisterFieldType[]>([]);
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
                role,
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

    const fetchRole = async () => {
        try {
            const response = await axiosInstance.get('users/roles');
            setData(response.data);
        } catch (error: unknown) {
            console.error('Failed to fetch roles:', error);

            notification.error({
                message: 'Erro ao buscar cargos',
                description: 'Ocorreu um erro ao tentar buscar os cargos. Por favor, tente novamente.',
            });
        }
    };

    return (
        <Form
            name="register"
            style={{ maxHeight: 500, padding: 25, alignItems: 'center', borderRadius: 50, alignContent: 'space-between' }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Skeleton active loading={loading}>
                <Typography.Title level={2}>Registrar</Typography.Title>
                <Row>
                    <Col span={8} className="gutter-row">
                        <Form.Item
                            name="name"
                            style={{ width: '100%', padding: 4, margin: 1 }}
                            rules={[{ required: true, message: 'Por favor, preencha o campo de nome!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Nome" />
                        </Form.Item>
                    </Col>
                    <Col span={8} className="gutter-row">
                        <Form.Item
                            name="role"
                            style={{ width: '100%', padding: 4, margin: 1 }}
                            rules={[{ required: true, message: 'Por favor, preencha o campo de cargo!' }]}
                        >
                            <Select onFocus={fetchRole} placeholder="Selecione o cargo">
                                {data?.map((item) => (
                                    <Select.Option key={item.role} value={item.role}>
                                        {item.role}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8} className="gutter-row">
                        <Form.Item
                            name="email"
                            style={{ width: '100%', padding: 4, margin: 1 }}
                            rules={[{ required: true, message: 'Por favor, preencha o campo de e-mail!' }]}
                        >
                            <Input prefix={<MailOutlined />} placeholder="E-mail" />
                        </Form.Item>
                    </Col>
                    <Col span={8} className="gutter-row">
                        <Form.Item
                            name="password"
                            style={{ width: '100%', padding: 4, margin: 1 }}
                            rules={[{ required: true, message: 'Por favor, preencha o campo de senha!' }]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Senha" />
                        </Form.Item>
                    </Col>
                    <Col span={8} className="gutter-row">
                        <Form.Item
                            name="password_confirmation"
                            style={{ width: '100%', padding: 4, margin: 1 }}
                            rules={[{ required: true, message: 'Por favor, confirme sua senha!' }]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Confirme a Senha" />
                        </Form.Item>
                    </Col>
                    <Col span={8} className="gutter-row">
                        <Form.Item style={{ width: '100%', padding: 4, margin: 1 }} >
                            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                                Registrar
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Skeleton>
        </Form >
    );
};

export default FormRegister;