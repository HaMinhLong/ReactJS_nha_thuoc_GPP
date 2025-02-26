import React, { createContext } from "react";
import { Layout, Typography } from "antd";
import { InitialType, useUrlSearchParams } from "use-url-search-params";

import PageContainer from "@/layouts/PageContainer";

import TableData from "./components/TableData";

const { Content } = Layout;

interface ProductTypeContextType {
  parameter?: InitialType;
  // eslint-disable-next-line no-unused-vars
  setParameter?: (nextQuery: InitialType) => void;
}

export const ProductTypeContext = createContext<ProductTypeContextType>({});

const ProductTypePage = () => {
  const [parameter, setParameter] = useUrlSearchParams({ page: 1, limit: 10 });
  const data = { parameter, setParameter };

  return (
    <ProductTypeContext.Provider value={data}>
      <PageContainer>
        <Layout style={{ minHeight: "100vh" }}>
          <Content style={{ padding: "16px" }}>
            <Typography.Title level={5} className="uppercase mb-4">
              Loại sản phẩm
            </Typography.Title>

            <Layout>
              <TableData />
            </Layout>
          </Content>
        </Layout>
      </PageContainer>
    </ProductTypeContext.Provider>
  );
};

export default ProductTypePage;
