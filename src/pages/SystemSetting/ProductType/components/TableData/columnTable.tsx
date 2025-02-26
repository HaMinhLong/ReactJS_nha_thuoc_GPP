/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Popconfirm } from "antd";
import { ProductType, useDeleteProductTypeMutation } from "@/api/productType";
import { useMessage } from "@/context/MessageContext";

interface PropsType {
  setEditId: React.Dispatch<React.SetStateAction<number>>;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useColumnTable = ({ setEditId, setIsModalVisible }: PropsType) => {
  const messageApi = useMessage();
  const [deleteProductType] = useDeleteProductTypeMutation();

  return [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: "5%",
    },
    {
      title: "Tên loại sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Là Thuốc",
      dataIndex: "isMedicine",
      key: "isMedicine",
      render: (isMedicine: number) => {
        return isMedicine === 1 ? "Là thuốc" : "Không phải thuốc";
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: number) => {
        return status === 1 ? "Đang hoạt động" : "Dừng hoạt động";
      },
    },
    {
      title: "Action",
      render: (record: ProductType) => {
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
                deleteProductType({ id: record?.id || 0 }).then((res: any) => {
                  if (res?.data?.statusCode === 200) {
                    messageApi.success("Xoá loại sản phẩm thành công");
                  } else {
                    messageApi.error(" Xoá loại sản phẩm không thành công");
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
