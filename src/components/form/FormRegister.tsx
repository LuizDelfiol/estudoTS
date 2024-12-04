import React, { useState, useEffect } from 'react';
import { Form, Input, notification, Row, Col, Button, Typography, Skeleton, AutoComplete } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import axiosInstance from '../../configs/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface RegisterFieldType {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
}

const FormRegister: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<{ role: string }[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRole();
    }, []);

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

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Por favor, preencha o campo de nome!'),
        email: Yup.string().email('E-mail inválido').required('Por favor, preencha o campo de e-mail!'),
        password: Yup.string().required('Por favor, preencha o campo de senha!'),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), undefined], 'As senhas não coincidem.')
            .required('Por favor, confirme sua senha!'),
        role: Yup.string().required('Por favor, preencha o campo de cargo!'),
    });

    const onSubmit = async (values: RegisterFieldType) => {
        const { name, email, password, password_confirmation, role } = values;

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

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                role: '',
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ setFieldValue }) => (
                <FormikForm
                    name="register"
                    style={{ maxHeight: 500, padding: 25, alignItems: 'center', borderRadius: 50, alignContent: 'space-between' }}
                    autoComplete="off"
                >
                    <Skeleton active loading={loading}>
                        <Typography.Title level={2}>Registrar</Typography.Title>
                        <Row>
                            <Col span={8} className="gutter-row">
                                <Form.Item style={{ width: '100%', padding: 4, margin: 1 }}>
                                    <Field name="name">
                                        {({ field }: { field: any }) => (
                                            <Input {...field} prefix={<UserOutlined />} placeholder="Nome" />
                                        )}
                                    </Field>
                                    <ErrorMessage name="name" component="div" className="error-message" />
                                </Form.Item>
                            </Col>
                            <Col span={8} className="gutter-row">
                                <Form.Item style={{ width: '100%', padding: 4, margin: 1 }}>
                                    <Field name="role">
                                        {({ field }: { field: any }) => (
                                            <AutoComplete
                                                {...field}
                                                onSearch={fetchRole}
                                                onSelect={(value) => setFieldValue('role', value)}
                                                placeholder="Selecione o cargo"
                                            >
                                                {data && data.length > 0 ? (
                                                    data.map((item) => (
                                                        <AutoComplete.Option key={item.role} value={item.role}>
                                                            {item.role}
                                                        </AutoComplete.Option>
                                                    ))
                                                ) : (
                                                    <AutoComplete.Option disabled key="no-result">
                                                        Nenhum cargo encontrado
                                                    </AutoComplete.Option>
                                                )}
                                            </AutoComplete>
                                        )}
                                    </Field>
                                    <ErrorMessage name="role" component="div" className="error-message" />
                                </Form.Item>

                            </Col>
                            <Col span={8} className="gutter-row">
                                <Form.Item style={{ width: '100%', padding: 4, margin: 1 }}>
                                    <Field name="email">
                                        {({ field }: { field: any }) => (
                                            <Input {...field} prefix={<MailOutlined />} placeholder="E-mail" />
                                        )}
                                    </Field>
                                    <ErrorMessage name="email" component="div" className="error-message" />
                                </Form.Item>
                            </Col>
                            <Col span={8} className="gutter-row">
                                <Form.Item style={{ width: '100%', padding: 4, margin: 1 }}>
                                    <Field name="password">
                                        {({ field }: { field: any }) => (
                                            <Input.Password {...field} prefix={<LockOutlined />} placeholder="Senha" />
                                        )}
                                    </Field>
                                    <ErrorMessage name="password" component="div" className="error-message" />
                                </Form.Item>
                            </Col>
                            <Col span={8} className="gutter-row">
                                <Form.Item style={{ width: '100%', padding: 4, margin: 1 }}>
                                    <Field name="password_confirmation">
                                        {({ field }: { field: any }) => (
                                            <Input.Password {...field} prefix={<LockOutlined />} placeholder="Confirme a Senha" />
                                        )}
                                    </Field>
                                    <ErrorMessage name="password_confirmation" component="div" className="error-message" />
                                </Form.Item>
                            </Col>
                            <Col span={8} className="gutter-row">
                                <Form.Item style={{ width: '100%', padding: 4, margin: 1 }}>
                                    <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                                        Registrar
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Skeleton>
                </FormikForm>
            )}
        </Formik>
    );
};

export default FormRegister;