import React, { useEffect } from "react";
import { Button, Form, Input, Modal, Spin } from "antd";

import {
  GetDetailUserGroupApiResponse,
  TypeUserGroup,
  useLazyGetDetailUserGroupQuery,
  usePostUserGroupMutation,
  usePutUserGroupMutation,
} from "../../../../../api/userGroup";
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

  const [getDetail, { data, isFetching }] = useLazyGetDetailUserGroupQuery();
  const [createUserGroup, { isLoading: isCreating }] =
    usePostUserGroupMutation();
  const [updateUserGroup, { isLoading: isUpdating }] =
    usePutUserGroupMutation();

  useEffect(() => {
    if (editId) {
      getDetail({ id: editId });
    }
  }, [editId]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: (data as GetDetailUserGroupApiResponse)?.data?.name || "",
      });
    }
  }, [data]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Gửi dữ liệu khi nhấn "Lưu"
  const handleSubmit = (values: TypeUserGroup) => {
    const dataSubmit = {
      name: values?.name || "",
    };

    if (!editId) {
      createUserGroup(dataSubmit).then((res) => {
        if (res?.error) {
          messageApi.error(
            (res as ErrorResponse).error.data.error.message || ""
          );
        } else {
          messageApi.success("Tạo nhóm tài khoản thành công!");
          setIsModalVisible(false);
        }
      });
    } else {
      updateUserGroup({ body: dataSubmit, id: editId }).then((res) => {
        if (res?.error) {
          messageApi.error(
            (res as ErrorResponse).error.data.error.message || ""
          );
        } else {
          messageApi.success("Cập nhật nhóm tài khoản thành công!");
          setIsModalVisible(false);
        }
      });
    }
  };

  return (
    <Modal
      title="Tạo mới nhóm tài khoản"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Spin spinning={isCreating || isUpdating || isFetching}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Tên nhóm tài khoản"
            rules={[
              { required: true, message: "Vui lòng nhập tên nhóm tài khoản!" },
            ]}
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
