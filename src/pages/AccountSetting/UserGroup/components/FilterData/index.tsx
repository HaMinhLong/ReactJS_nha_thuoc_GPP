import React from "react";
import type { CSSProperties } from "react";
import type { CollapseProps } from "antd";
import { Layout, Select } from "antd";
import CollapseCustom from "../../../../../components/AntdCustom/CollapseCustom";

const { Sider } = Layout;
const { Option } = Select;

const FilterData = () => {
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
        >
          <Option value="1">Đang hoạt động</Option>
          <Option value="2">Dừng hoạt động</Option>
        </Select>
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
