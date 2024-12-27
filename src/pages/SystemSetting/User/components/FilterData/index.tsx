import React, { useContext } from "react";
import type { CSSProperties } from "react";
import type { CollapseProps } from "antd";
import { Layout, Select } from "antd";
import CollapseCustom from "../../../../../components/AntdCustom/CollapseCustom";
import { UserContext } from "../..";
import {
  GetListUserGroupApiResponse,
  useGetListUserGroupQuery,
} from "@/api/userGroup";

const { Sider } = Layout;
const { Option } = Select;

const FilterData = () => {
  const { parameter, setParameter } = useContext(UserContext);

  const { data } = useGetListUserGroupQuery({ selectFields: ["id", "name"] });

  const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
    panelStyle
  ) => [
    {
      key: "1",
      label: "Trạng thái",
      children: (
        <Select
          placeholder="Trạng thái"
          style={{ width: "100%", marginBottom: "8px" }}
          allowClear
          onChange={(e) => {
            setParameter?.({ ...parameter, status: e });
          }}
        >
          <Option value="1">Đang hoạt động</Option>
          <Option value="2">Dừng hoạt động</Option>
        </Select>
      ),
      style: panelStyle,
    },
    {
      key: "2",
      label: "Nhóm tài khoản",
      children: (
        <Select
          placeholder="Nhóm tài khoản"
          style={{ width: "100%", marginBottom: "8px" }}
          allowClear
          onChange={(e) => {
            setParameter?.({ ...parameter, userGroupId: e });
          }}
          options={(data as GetListUserGroupApiResponse)?.data?.map((item) => ({
            value: item?.id,
            label: item?.name,
          }))}
        />
      ),
      style: panelStyle,
    },
  ];

  return (
    <Sider width={375} theme="light" className="p-4">
      <CollapseCustom getItems={getItems} />
    </Sider>
  );
};

export default FilterData;
