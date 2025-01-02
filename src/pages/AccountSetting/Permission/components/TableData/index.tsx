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

  const columns = useColumnTable();

  const dataTable = data as GetListUserGroupApiResponse;

  return (
    <>
      <Content style={{ padding: "16px", background: "#fff" }}>
        <Spin spinning={isFetching}>
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
    </>
  );
};

export default TableData;
