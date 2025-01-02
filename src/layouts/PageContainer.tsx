import React from "react";
import { Layout } from "antd";

import HeaderPage from "./HeaderPage";

const { Content } = Layout;
interface PropsType {
  children: React.ReactNode;
}

const PageContainer = ({ children }: PropsType) => {
  return (
    <div>
      <Layout className="layout">
        <Content>
          <div className="fixed top-0 left-0 right-0 z-[1000]">
            <HeaderPage />
          </div>
          <div className="h-[100px]"></div>
          <div className="p-6 bg-[#eee]">{children}</div>
        </Content>
      </Layout>
    </div>
  );
};

export default PageContainer;
