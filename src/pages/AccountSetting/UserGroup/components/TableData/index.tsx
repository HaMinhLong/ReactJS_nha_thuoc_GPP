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
  Pagination,
} from "antd";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { useUrlSearchParams } from "use-url-search-params";

import {
  GetListUserGroupApiResponse,
  useLazyGetListUserGroupQuery,
} from "../../../../../api/userGroup";
import { useColumnTable } from "./columnTable";
import CreateOrEdit from "../CreateOrEdit";

const { Content } = Layout;

const TableData = () => {
  const [parameter, setParameter] = useUrlSearchParams({ page: 1, limit: 10 });
  const [getList, { data, isFetching }] = useLazyGetListUserGroupQuery();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);

  useEffect(() => {
    getList({
      page: Number(parameter.page),
      limit: Number(parameter.limit),
    });
  }, []);

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

  const onPaginationChange = (page: number, pageSize: number) => {
    setParameter({ ...parameter, page: page, limit: pageSize });
    getList({ page: page, limit: pageSize });
  };

  const columns = useColumnTable({ setIsModalVisible, setEditId });

  const dataTable = data as GetListUserGroupApiResponse;

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
              className="name-filter"
              placeholder="Tìm kiếm theo tên"
              allowClear
              style={{ width: "375px" }}
              onSearch={(e) => {
                setParameter({ ...parameter, keyword: e });
                getList({ keyword: e });
              }}
            />
            <Space>
              <Button
                className="add-new-btn"
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
            dataSource={dataTable?.data}
            locale={{ emptyText: "Không có dữ liệu" }}
            bordered
            pagination={false}
            scroll={{ x: "max-content" }}
          />
          <div className="flex justify-end mt-3">
            <Pagination
              showSizeChanger
              onChange={onPaginationChange}
              defaultCurrent={1}
              total={dataTable?.pagination?.total}
              size="small"
              pageSize={Number(parameter.limit || 10)}
            />
          </div>
        </Spin>
      </Content>

      {isModalVisible && (
        <CreateOrEdit
          editId={editId}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      )}
    </>
  );
};

export default TableData;
