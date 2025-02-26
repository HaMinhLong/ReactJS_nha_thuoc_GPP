import React, { useContext } from "react";
import type { CSSProperties } from "react";
import type { CollapseProps } from "antd";
import { Layout, Select } from "antd";
import CollapseCustom from "../../../../../components/AntdCustom/CollapseCustom";
import { ProductTypeContext } from "../..";

const { Sider } = Layout;
const { Option } = Select;

const FilterData = () => {
  const { parameter, setParameter } = useContext(ProductTypeContext);

  // eslint-disable-next-line no-unused-vars
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
      label: "Sản phẩm là thuốc",
      children: (
        <Select
          placeholder="Sản phẩm là thuốc"
          style={{ width: "100%", marginBottom: "8px" }}
          allowClear
          onChange={(e) => {
            setParameter?.({ ...parameter, isMedicine: e });
          }}
        >
          <Option value="1">Là thuốc</Option>
          <Option value="2">Không phải thuốc</Option>
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
