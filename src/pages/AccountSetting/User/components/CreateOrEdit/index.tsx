import React, { useEffect } from "react";
import { Button, Form, Input, Modal, Select, Spin } from "antd";

import {
  GetDetailUserApiResponse,
  TypeUser,
  useLazyGetDetailUserQuery,
  usePostUserMutation,
  usePutUserMutation,
} from "../../../../../api/user";
import { useMessage } from "../../../../../context/MessageContext";
import { ErrorResponse } from "../../../../../type/global";
import {
  GetListUserGroupApiResponse,
  useGetListUserGroupQuery,
} from "@/api/userGroup";

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

  const { data: userGroups } = useGetListUserGroupQuery({
    selectFields: ["id", "name"],
  });

  const [getDetail, { data, isFetching }] = useLazyGetDetailUserQuery();
  const [createUserGroup, { isLoading: isCreating }] = usePostUserMutation();
  const [updateUserGroup, { isLoading: isUpdating }] = usePutUserMutation();

  useEffect(() => {
    if (editId) {
      getDetail({ id: editId });
    }
  }, [editId]);

  useEffect(() => {
    const dataDetail = data as GetDetailUserApiResponse;
    if (!!data) {
      form.setFieldsValue({
        name: dataDetail?.data?.name || "",
        username: dataDetail?.data?.username || "",
        email: dataDetail?.data?.email || "",
        phone: dataDetail?.data?.phone || "",
        status: dataDetail?.data?.status || undefined,
        userGroupId: dataDetail?.data?.userGroupId || undefined,
      });
    }
  }, [data]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Gửi dữ liệu khi nhấn "Lưu"
  const handleSubmit = (values: TypeUser) => {
    const dataSubmit = {
      name: values?.name || "",
      username: values?.username || "",
      email: values?.email || "",
      phone: values?.phone || "",
      password: values?.password || undefined,
      status: values?.status || undefined,
      userGroupId: values?.userGroupId || undefined,
    };

    if (!editId) {
      createUserGroup(dataSubmit).then((res) => {
        if (res?.error) {
          messageApi.error(
            (res as ErrorResponse).error.data.error.message || ""
          );
        } else {
          messageApi.success("Tạo tài khoản thành công!");
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
          messageApi.success("Cập nhật tài khoản thành công!");
          setIsModalVisible(false);
        }
      });
    }
  };

  return (
    <Modal
      title="Tạo mới tài khoản"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Spin spinning={isCreating || isUpdating || isFetching}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="[&_.ant-form-item]:mb-3"
        >
          <Form.Item
            name="name"
            label="Họ tên"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="username"
            label="Tên tài khoản"
            rules={[
              { required: true, message: "Vui lòng nhập tên tài khoản!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input disabled={!!editId} />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: !editId, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="userGroupId"
            label="Nhóm tài khoản"
            rules={[
              { required: true, message: "Vui lòng chọn nhóm tài khoản!" },
            ]}
          >
            <Select
              placeholder="Nhóm tài khoản"
              style={{ width: "100%", marginBottom: "8px" }}
              allowClear
              options={(userGroups as GetListUserGroupApiResponse)?.data?.map(
                (item) => ({
                  value: item?.id,
                  label: item?.name,
                })
              )}
            />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
          >
            <Select
              placeholder="Trạng thái"
              style={{ width: "100%", marginBottom: "8px" }}
              allowClear
            >
              <Option value={1}>Đang hoạt động</Option>
              <Option value={2}>Dừng hoạt động</Option>
            </Select>
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
