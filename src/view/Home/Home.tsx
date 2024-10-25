import React, { useEffect, useState } from 'react';
import {
    DesktopOutlined,
    TeamOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import axiosInstance from '../../Configs/axiosConfig';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

interface User {
    id: number;
    email: string;
    name: string;
}

const items: MenuItem[] = [
    getItem('Painel de Controle', '0', <DesktopOutlined />),
    getItem('Alunos', 'sub1', <TeamOutlined />, [
            getItem('Lista de Alunos', '1'),
            getItem('Adicionar Novo Aluno', '2'),
            getItem('Notas e Avaliações', '3'),
            getItem('Faltas', '4'),
        ]),
    getItem('Professores', 'sub2', <TeamOutlined />, [
        getItem('Lista de Professores', '5'),
        getItem('Adicionar Novo Professor', '6'),
        getItem('Atribuição de Disciplinas', '7'),
        getItem('Avaliações de Desempenho', '8'),
    ]),
    getItem('Disciplinas', 'sub3', <TeamOutlined />, [
        getItem('Lista de Disciplinas', '9'),
        getItem('Criar/Editar Disciplinas', '12'),
        getItem('Currículo', '11'),
    ]),
    getItem('Turmas', 'sub4', <TeamOutlined />, [
        getItem('Lista de Turmas', '12'),
        getItem('Criar/Editar Turmas', '13'),
        getItem('Matrícula de Alunos', '14'),
    ]),
    getItem('Avaliações', 'sub5', <TeamOutlined />, [
        getItem('Avaliações', '15'),
        getItem('Gerenciar Avaliações', '16'),
        getItem('Resultados', '17'),
    ]),
    getItem('Calendário Escolar', 'sub6', <TeamOutlined />, [
        getItem('Calendário de Aulas', '18'),
        getItem('Datas de Provas', '19'),
        getItem('Eventos', '20'),
    ]),
    getItem('Relatórios', 'sub7', <TeamOutlined />, [
        getItem('Relatórios de Desempenho', '21'),
        getItem('Relatórios de Faltas', '22'),
        getItem('Relatórios Financeiros', '23'),
    ]),
    getItem('Configurações', 'sub8', <TeamOutlined />, [
        getItem('Gerenciar Usuários', '24'),
        getItem('Configurações de Sistema', '25'),
        getItem('Personalização de Notificações', '26'),
    ]),
    getItem('Ajuda', 'sub9', <TeamOutlined />, [
        getItem('FAQ', '27'),
        getItem('Suporte Técnico', '28'),
        getItem('Documentação', '29'),
    ]),

];



const Home: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('/user');
                setUser(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={250} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu style={{ width: '100%' }} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {user ? (
                            <div>
                                <h2>Bem-vindo, {user.name}!</h2>
                            </div>
                        ) : (
                            <p>Carregando...</p>
                        )}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Home;
