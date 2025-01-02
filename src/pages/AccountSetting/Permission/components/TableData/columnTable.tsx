import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

import { TypeUserGroup } from "@/api/userGroup";

export const useColumnTable = () => {
  return [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: "5%",
    },
    {
      title: "Tên quyền",
      dataIndex: "name",
      key: "name",
      width: "70%",
    },
    {
      title: "Action",
      render: (record: TypeUserGroup) => {
        return (
          <div className="flex gap-x-2">
            <Link to={`/account-setting/permission/${record?.id}`}>
              <Button color="primary" variant="outlined">
                Phân quyền
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];
};
