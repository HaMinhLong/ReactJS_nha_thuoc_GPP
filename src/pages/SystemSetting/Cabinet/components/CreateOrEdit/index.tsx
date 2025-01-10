import React, { useEffect } from "react";
import { Button, Form, Input, Modal, Spin } from "antd";

import {
  GetDetailCabinetApiResponse,
  CabinetType,
  useLazyGetDetailCabinetQuery,
  usePostCabinetMutation,
  usePutCabinetMutation,
} from "../../../../../api/cabinet";
import { useMessage } from "../../../../../context/MessageContext";
import { ErrorResponse } from "../../../../../type/global";

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

  const [getDetail, { data, isFetching }] = useLazyGetDetailCabinetQuery();
  const [createCabinet, { isLoading: isCreating }] = usePostCabinetMutation();
  const [updateCabinet, { isLoading: isUpdating }] = usePutCabinetMutation();

  useEffect(() => {
    if (editId) {
      getDetail({ id: editId });
    }
  }, [editId]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: (data as GetDetailCabinetApiResponse)?.data?.name || "",
      });
    }
  }, [data]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Gửi dữ liệu khi nhấn "Lưu"
  const handleSubmit = (values: CabinetType) => {
    const dataSubmit = {
      name: values?.name || "",
      code: values?.code || "",
    };

    if (!editId) {
      createCabinet(dataSubmit).then((res) => {
        if (res?.error) {
          messageApi.error(
            (res as ErrorResponse).error.data.error.message || ""
          );
        } else {
          messageApi.success("Tạo tủ/ngăn tủ thành công!");
          setIsModalVisible(false);
        }
      });
    } else {
      updateCabinet({ ...dataSubmit, id: editId }).then((res) => {
        if (res?.error) {
          messageApi.error(
            (res as ErrorResponse).error.data.error.message || ""
          );
        } else {
          messageApi.success("Cập nhật tủ/ngăn tủ thành công!");
          setIsModalVisible(false);
        }
      });
    }
  };

  return (
    <Modal
      title="Tạo mới tủ/ngăn tủ"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Spin spinning={isCreating || isUpdating || isFetching}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Tên tủ/ngăn tủ"
            rules={[
              { required: true, message: "Vui lòng nhập tên tủ/ngăn tủ!" },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            name="code"
            label="Mã tủ/ngăn tủ"
            rules={[{ required: true, message: "Vui lòng mã tên tủ/ngăn tủ!" }]}
          >
            <Input size="large" />
          </Form.Item>

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
