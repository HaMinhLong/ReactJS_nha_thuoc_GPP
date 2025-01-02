import React from "react";
import { Layout, Typography } from "antd";

import PageContainer from "@/layouts/PageContainer";
import TableData from "./components/TableData";

const { Content } = Layout;

const PermissionPage = () => {
  return (
    <PageContainer>
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ padding: "16px" }}>
          <Typography.Title level={5} className="uppercase mb-4">
            Phân quyền
          </Typography.Title>

          <Layout>
            <TableData />
          </Layout>
        </Content>
      </Layout>
    </PageContainer>
  );
};

export default PermissionPage;
