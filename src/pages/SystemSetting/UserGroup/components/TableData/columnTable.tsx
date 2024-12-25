import React from "react";
import { Button, message, Popconfirm } from "antd";
import {
  TypeUserGroup,
  useDeleteUserGroupMutation,
} from "../../../../../api/userGroup";
import { useMessage } from "../../../../../context/MessageContext";

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
      width: "5%",
    },
    {
      title: "Tên nhóm tài khoản",
      dataIndex: "name",
      key: "name",
      width: "70%",
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
                    messageApi.success("Xoá nhóm tài khoản thành công");
                    getList();
                  } else {
                    messageApi.error(" Xoá nhóm tài khoản không thành công");
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
