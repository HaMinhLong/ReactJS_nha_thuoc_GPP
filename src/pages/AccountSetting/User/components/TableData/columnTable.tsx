/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Popconfirm } from "antd";
import {
  TypeUserGroup,
  useDeleteUserGroupMutation,
} from "../../../../../api/userGroup";
import { useMessage } from "../../../../../context/MessageContext";
import { TypeUser } from "../../../../../api/user";

interface PropsType {
  getList: any;
  setEditId: React.Dispatch<React.SetStateAction<number>>;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useColumnTable = ({
  getList,
  setEditId,
  setIsModalVisible,
}: PropsType) => {
  const messageApi = useMessage();
  const [deleteUserGroup] = useDeleteUserGroupMutation();

  return [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: 50,
      fixed: "left",
    },
    {
      title: "Tên tài khoản",
      dataIndex: "name",
      key: "name",
      width: 200,
      fixed: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: 150,
    },
    {
      title: "Nhóm tài khoản",
      dataIndex: "userGroup",
      key: "userGroup",
      width: 200,
      render: (userGroup: TypeUser) => {
        return <div>{userGroup?.name || ""}</div>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status: number) => {
        return <div>{status === 1 ? "Đang hoạt động" : "Dừng hoạt động"}</div>;
      },
    },
    {
      title: "Action",
      render: (record: TypeUserGroup) => {
        return (
          <div className="flex gap-x-2">
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                setIsModalVisible(true);
                setEditId(record?.id || 0);
              }}
            >
              Sửa
            </Button>

            <Popconfirm
              title="Xác nhận xoá"
              description="Bạn có chắc chắn muốn xoá bản ghi này không?"
              okText="Xoá"
              cancelText="Huỷ"
              onConfirm={() => {
                deleteUserGroup({ id: record?.id || 0 }).then((res: any) => {
                  if (res?.data?.statusCode === 200) {
                    messageApi.success("Xoá tài khoản thành công");
                    getList();
                  } else {
                    messageApi.error(" Xoá tài khoản không thành công");
                  }
                });
              }}
            >
              <Button color="danger" variant="link">
                Xoá
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
};
