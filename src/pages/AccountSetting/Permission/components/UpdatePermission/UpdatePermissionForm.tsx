import React, { useEffect } from "react";
import { Spin, Form, Checkbox, Button, Popconfirm } from "antd";
import { useParams } from "react-router-dom";

import {
  GetDetailPermissionApiResponse,
  PermissionType,
  PutPermissionApiResponse,
  useLazyGetDetailPermissionQuery,
  usePutPermissionMutation,
} from "@/api/permission";
import { handleConvertObjectToArray } from "@/utils";
import { useMessage } from "@/context/MessageContext";

const UpdatePermissionForm = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const messageApi = useMessage();

  const [getDetail, { data, isFetching }] = useLazyGetDetailPermissionQuery();
  const [updatePermission, { isLoading }] = usePutPermissionMutation();

  useEffect(() => {
    if (id) {
      getDetail({ id });
    }
  }, [id]);

  const transformData = (permissions: any) => {
    const result: any = {};

    permissions.forEach(({ key, value }: { key: string; value: boolean }) => {
      const [permissionId, field] = key.split("_");
      if (!result[permissionId]) {
        result[permissionId] = { id: Number(permissionId) };
      }
      result[permissionId][field] = value;
    });

    return Object.values(result) as PermissionType[];
  };

  const handleFinish = (values: any) => {
    const arrPermissions = handleConvertObjectToArray(values);
    const submitData: PermissionType[] = transformData(arrPermissions);

    updatePermission(submitData).then((res) => {
      if (
        (res as unknown as PutPermissionApiResponse)?.data?.statusCode === 200
      ) {
        messageApi.success("Cập nhật quyền thành công!");
      } else {
        messageApi.error(
          "Xảy ra lỗi khi cập nhật quyền. Vui lòng liên hệ với quản trị viên!"
        );
      }
    });
  };

  const permissions = data as GetDetailPermissionApiResponse;

  const permissionList = [
    {
      name: "getList",
      label: "Xem danh sách",
    },
    {
      name: "getDetail",
      label: "Xem chi tiết",
    },
    {
      name: "create",
      label: "Tạo mới",
    },
    {
      name: "update",
      label: "Cập nhật",
    },
    {
      name: "remove",
      label: "Xoá",
    },
  ];

  return (
    <Spin spinning={isFetching}>
      <Form form={form} onFinish={handleFinish}>
        {permissions?.data?.map?.((permission: PermissionType) => (
          <div key={permission?.id} className="flex">
            <div className="w-[200px] flex-shrink-0 p-[12px_16px] text-[#1D2939] text-[14px] leading-[20px] font-semibold border border-solid border-[#D0D5DD]">
              {permission?.permission?.name || ""}{" "}
            </div>
            <div className=" flex-1 border border-solid border-[#D0D5DD]">
              <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                {permissionList?.map((item) => (
                  <div
                    key={item?.name}
                    className="p-[16px] text-[12px] leading-[18px] text-[#1D2939] flex gap-x-[2px] items-start"
                  >
                    <Form.Item
                      name={`${permission?.id}_${item?.name}`}
                      initialValue={
                        permission[item?.name as keyof PermissionType] || false
                      }
                      valuePropName="checked"
                    >
                      <Checkbox>{item?.label}</Checkbox>
                    </Form.Item>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <Form.Item className="flex justify-end m-[24px_90px] ">
          <Popconfirm
            title={
              <>
                <div>
                  Khi thay đổi sẽ ảnh hưởng đến một vài tính năng của hệ thống.
                </div>
                <div>Bạn có chắc chắn muốn thực hiện thao tác này?</div>
              </>
            }
            onConfirm={() => {
              form.submit();
            }}
          >
            <Button loading={isLoading} className="min-w-[160px]">
              Lưu
            </Button>
          </Popconfirm>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default UpdatePermissionForm;
