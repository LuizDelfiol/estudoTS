import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { DesktopOutlined, TeamOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useState } from 'react';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    onClick?: () => void,
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        onClick,
    } as MenuItem;
}


const Sidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const items: MenuItem[] = [
        getItem('Painel de Controle', '0', <DesktopOutlined />, undefined, () => navigate('/dashbord')),
        // getItem('Alunos', 'sub1', <TeamOutlined />, [
        //     getItem('Lista de Alunos', '1'),
        //     getItem('Adicionar Novo Aluno', '2'),
        //     getItem('Notas e Avaliações', '3'),
        //     getItem('Faltas', '4'),
        // ]),
        // getItem('Professores', 'sub2', <TeamOutlined />, [
        //     getItem('Lista de Professores', '5'),
        //     getItem('Adicionar Novo Professor', '6'),
        //     getItem('Atribuição de Disciplinas', '7'),
        //     getItem('Avaliações de Desempenho', '8'),
        // ]),
        // getItem('Disciplinas', 'sub3', <TeamOutlined />, [
        //     getItem('Lista de Disciplinas', '9'),
        //     getItem('Criar/Editar Disciplinas', '12'),
        //     getItem('Currículo', '11'),
        // ]),
        // getItem('Turmas', 'sub4', <TeamOutlined />, [
        //     getItem('Lista de Turmas', '12'),
        //     getItem('Criar/Editar Turmas', '13'),
        //     getItem('Matrícula de Alunos', '14'),
        // ]),
        // getItem('Avaliações', 'sub5', <TeamOutlined />, [
        //     getItem('Avaliações', '15'),
        //     getItem('Gerenciar Avaliações', '16'),
        //     getItem('Resultados', '17'),
        // ]),
        // getItem('Calendário Escolar', 'sub6', <TeamOutlined />, [
        //     getItem('Calendário de Aulas', '18'),
        //     getItem('Datas de Provas', '19'),
        //     getItem('Eventos', '20'),
        // ]),
        // getItem('Relatórios', 'sub7', <TeamOutlined />, [
        //     getItem('Relatórios de Desempenho', '21'),
        //     getItem('Relatórios de Faltas', '22'),
        //     getItem('Relatórios Financeiros', '23'),
        // ]),
        getItem('Configurações', 'sub8', <TeamOutlined />, [
            getItem('Gerenciar Usuários', '24', undefined, undefined, () => navigate('/management-users')),
            // getItem('Configurações de Sistema', '25'),
            // getItem('Personalização de Notificações', '26'),
        ]),
        // getItem('Ajuda', 'sub9', <TeamOutlined />, [
        //     getItem('FAQ', '27'),
        //     getItem('Suporte Técnico', '28'),
        //     getItem('Documentação', '29'),
        // ]),
    ];

    const handleCollapse = (value: boolean) => {
        setCollapsed(value);
    }

    return (
        <Sider width={265} collapsible collapsed={collapsed} onCollapse={handleCollapse}>
            <div className="demo-logo-vertical" />
            <Menu style={{ width: '100%' }} theme="dark" defaultSelectedKeys={['0']} mode="inline" items={items} />
        </Sider>
    );
};

export default Sidebar;