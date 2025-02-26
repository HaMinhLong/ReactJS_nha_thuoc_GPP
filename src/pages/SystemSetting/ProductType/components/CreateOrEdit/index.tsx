import React, { useEffect } from "react";
import { Button, Switch, Form, Input, Modal, Select, Spin } from "antd";

import {
  GetDetailProductTypeApiResponse,
  ProductType,
  useLazyGetDetailProductTypeQuery,
  usePostProductTypeMutation,
  usePutProductTypeMutation,
} from "../../../../../api/productType";
import { useMessage } from "../../../../../context/MessageContext";
import { ErrorResponse } from "../../../../../type/global";

const { Option } = Select;

interface PropsType {
  editId: number;
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateOrEdit = ({
  editId,
  isModalVisible,
  setIsModalVisible,
}: PropsType) => {
  const [form] = Form.useForm();
  const messageApi = useMessage();

  const [getDetail, { data, isFetching }] = useLazyGetDetailProductTypeQuery();
  const [createProductType, { isLoading: isCreating }] =
    usePostProductTypeMutation();
  const [updateProductType, { isLoading: isUpdating }] =
    usePutProductTypeMutation();

  useEffect(() => {
    if (editId) {
      getDetail({ id: editId });
    }
  }, [editId]);

  useEffect(() => {
    const dataDetail = data as GetDetailProductTypeApiResponse;
    if (data) {
      form.setFieldsValue({
        name: dataDetail?.data?.name || "",
        isMedicine: dataDetail?.data?.isMedicine === 1,
        status: dataDetail?.data?.status || 1,
      });
    }
  }, [data]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Gửi dữ liệu khi nhấn "Lưu"
  const handleSubmit = (values: ProductType) => {
    const dataSubmit = {
      name: values?.name || "",
      isMedicine: values?.isMedicine || 0,
      status: values?.status || 1,
    };

    if (!editId) {
      createProductType(dataSubmit).then((res) => {
        if (res?.error) {
          messageApi.error(
            (res as ErrorResponse).error.data.error.message || ""
          );
        } else {
          messageApi.success("Tạo loại sản phẩm thành công!");
          setIsModalVisible(false);
        }
      });
    } else {
      updateProductType({ ...dataSubmit, id: editId }).then((res) => {
        if (res?.error) {
          messageApi.error(
            (res as ErrorResponse).error.data.error.message || ""
          );
        } else {
          messageApi.success("Cập nhật loại sản phẩm thành công!");
          setIsModalVisible(false);
        }
      });
    }
  };

  return (
    <Modal
      title="Tạo mới loại sản phẩm"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Spin spinning={isCreating || isUpdating || isFetching}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Tên loại sản phẩm"
            rules={[
              { required: true, message: "Vui lòng nhập tên loại sản phẩm!" },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item name="isMedicine" label="Sản phẩm là thuốc">
            <Switch />
          </Form.Item>

          {
            // Chỉ hiển thị khi cập nhật
            editId ? (
              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn trạng thái loại sản phẩm!",
                  },
                ]}
              >
                <Select>
                  <Option value={1}>Đang hoạt động</Option>
                  <Option value={2}>Dừng hoạt động</Option>
                </Select>
              </Form.Item>
            ) : null
          }

          <Form.Item className="flex justify-end">
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default CreateOrEdit;
