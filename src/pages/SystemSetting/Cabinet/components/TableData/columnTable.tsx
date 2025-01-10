/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Popconfirm } from "antd";
import { CabinetType, useDeleteCabinetMutation } from "@/api/cabinet";
import { useMessage } from "@/context/MessageContext";

interface PropsType {
  setEditId: React.Dispatch<React.SetStateAction<number>>;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useColumnTable = ({ setEditId, setIsModalVisible }: PropsType) => {
  const messageApi = useMessage();
  const [deleteCabinet] = useDeleteCabinetMutation();

  return [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: "5%",
    },
    {
      title: "Tên tủ/ngăn tủ",
      dataIndex: "name",
      key: "name",
      width: "70%",
    },
    {
      title: "Mã tủ/ngăn tủ",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Action",
      render: (record: CabinetType) => {
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
                deleteCabinet({ id: record?.id || 0 }).then((res: any) => {
                  if (res?.data?.statusCode === 200) {
                    messageApi.success("Xoá tủ/ngăn tủ thành công");
                  } else {
                    messageApi.error(" Xoá tủ/ngăn tủ không thành công");
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
