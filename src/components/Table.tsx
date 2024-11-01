import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import axiosInstance from '../../src/configs/axiosConfig';
import { Button, Spin } from "antd";
import { convertDate } from "../utils/dataConverter";
import { LoadingOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { useNavigate } from "react-router";

interface DataRow {
  user: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

const Table: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const navigate = useNavigate();

  const handleEdit = (row: DataRow) => {
    console.log('Edit:', row);
  };

  const handleDelete = async (row: DataRow) => {
    try {
      await axiosInstance.delete(`http://localhost:8000/users/${row.user}`, {
        withCredentials: true,
      });
      setData(prevData => prevData.filter(item => item.user !== row.user));
      console.log('Deleted:', row);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  const columns: TableColumn<DataRow>[] = [
    {
      name: 'Usuário',
      selector: row => row.user,
      sortable: true,
      width: '100px',
    },
    {
      name: 'Nome',
      selector: row => row.name,
      sortable: true,
      width: '200px',
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
      width: '200px',
    },
    {
      name: 'Função',
      selector: row => row.role,
      sortable: true,
      width: '200px',
    },
    {
      name: 'Criado em',
      selector: row => convertDate(row.created_at),
      sortable: true,
      width: '100px',
    },
    {
      name: 'Ações',
      cell: row => (
        <div>
          <Button style={{ margin: '7px' }} color="primary" variant="solid" onClick={() => handleEdit(row)}>
            Editar
          </Button>
          <Button color="danger" variant="solid" onClick={() => handleDelete(row)}>
            Deletar
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('users/index');
        console.log('response:', response.data);
        const userData = response.data.data;
        if (Array.isArray(userData)) {
          const transformedData = userData.map(item => ({
            user: item.id.toString(),
            name: item.name,
            email: item.email,
            role: item.role,
            created_at: item.created_at,
          }));
          setData(transformedData);
        } else {
          console.error('Unexpected data format:', userData);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Content style={{ minHeight: '100%' }}>
      {/* {data.length === 0 ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} />} />
        </div>
      ) : ( */}
        <>
          <DataTable
            dense
            columns={columns}
            data={data}
            pagination
            highlightOnHover
            striped
            selectableRowsHighlight
            actions={<Button color="primary" variant="solid" onClick={() => navigate('/register')}>Novo Usuário</Button>}
          />
        </>
      {/* )} */}
    </Content>
  );
};

export default Table;