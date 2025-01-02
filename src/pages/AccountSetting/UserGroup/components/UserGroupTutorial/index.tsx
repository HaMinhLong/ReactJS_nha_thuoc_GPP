import React from "react";
import Joyride, { Step } from "react-joyride";

const UserGroupTutorial = () => {
  const steps: Step[] = [
    {
      target: ".add-new-btn", // Chọn phần tử bằng class, id, hoặc selector
      content: 'Bấm "Thêm mới" để khởi tạo nhóm tài khoản.',
      disableBeacon: true, // Không hiện bóng đèn
    },
    {
      target: ".name-filter", // Class của filter trạng thái
      content: "Bạn có thể lọc nhóm tài khoản theo tên.",
    },
  ];

  return (
    <div>
      <Joyride
        steps={steps}
        run={false} // Bắt đầu chạy hướng dẫn
        continuous={true} // Tự động chuyển sang bước tiếp theo
        showProgress={true} // Hiện số bước
        showSkipButton={true} // Nút bỏ qua
        styles={{
          options: {
            primaryColor: "#007bff", // Màu chính
            zIndex: 999, // Đặt phía trên giao diện
          },
        }}
      />
    </div>
  );
};

export default UserGroupTutorial;
