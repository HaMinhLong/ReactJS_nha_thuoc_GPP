import React, { useEffect, useState } from "react";
import {
  Layout,
  Input,
  Table,
  Button,
  Dropdown,
  Menu,
  Spin,
  Space,
} from "antd";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";

import {
  GetListUserGroupApiResponse,
  useLazyGetListUserGroupQuery,
} from "../../../../../api/userGroup";
import { useColumnTable } from "./columnTable";
import CreateOrEdit from "../CreateOrEdit";
import FilterData from "../FilterData";

const { Content } = Layout;
const TableData = () => {
  const [getList, { data, isFetching }] = useLazyGetListUserGroupQuery();

  useEffect(() => {
    getList({});
  }, []);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);

  const handleCreateNew = () => {
    setIsModalVisible(true);
    setEditId(0);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "F2") {
      event.preventDefault();
      handleCreateNew();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const columns = useColumnTable({ getList, setIsModalVisible, setEditId });

  return (
    <>
      {/* <FilterData /> */}

      <Content style={{ padding: "16px", background: "#fff" }}>
        <Spin spinning={isFetching}>
          <Space
            style={{
              width: "100%",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <Input.Search
              placeholder="Tìm kiếm theo tên"
              allowClear
              style={{ width: "375px" }}
              onSearch={(e) => {
                getList({ keyword: e });
              }}
            />
            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ backgroundColor: "#0dac50" }}
                onClick={() => {
                  handleCreateNew();
                }}
              >
                Thêm mới (F2)
              </Button>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="1">Import Excel</Menu.Item>
                    <Menu.Item key="2">Export Excel</Menu.Item>
                  </Menu>
                }
              >
                <Button>
                  File <DownOutlined />
                </Button>
              </Dropdown>
            </Space>
          </Space>
          <Table
            columns={columns}
            dataSource={(data as GetListUserGroupApiResponse)?.data}
            pagination={{ pageSize: 10 }}
            locale={{ emptyText: "Không có dữ liệu" }}
            bordered
          />
        </Spin>
      </Content>

      {isModalVisible && (
        <CreateOrEdit
          editId={editId}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          getList={getList}
        />
      )}
    </>
  );
};

export default TableData;
