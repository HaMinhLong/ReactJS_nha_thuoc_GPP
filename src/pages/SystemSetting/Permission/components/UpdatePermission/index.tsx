import React from "react";
import { Layout, Spin, Typography } from "antd";

import PageContainer from "@/layouts/PageContainer";
import UpdatePermissionForm from "./UpdatePermissionForm";

const { Content } = Layout;

const UpdatePermission = () => {
  return (
    <PageContainer>
      <Layout style={{ minHeight: "100vh" }}>
        <Content style={{ padding: "16px" }}>
          <Typography.Title level={5} className="uppercase mb-4">
            Phân quyền
          </Typography.Title>

          <Layout>
            <UpdatePermissionForm />
          </Layout>
        </Content>
      </Layout>
    </PageContainer>
  );
};

export default UpdatePermission;
