export const handleConvertObjectToArray = (object: unknown) => {
  const arr = Object.entries(object || {});
  return arr?.map((item) => {
    return {
      key: item[0],
      value: item[1],
    };
  });
};

export const filterMenuByAuthorities = (
  menuItems: any,
  permissions: string[]
) => {
  return menuItems
    .map((item: any) => {
      // Kiểm tra nếu item có children thì đệ quy lọc children
      if (item.children) {
        item.children = filterMenuByAuthorities(item.children, permissions);
      }

      // Kiểm tra quyền của item
      const hasAuthorities =
        !item.authorities || // Không có authorities, giữ lại
        (Array.isArray(item.authorities) && // Đảm bảo authorities là mảng
          item.authorities.some((auth: string) => permissions.includes(auth))); // Kiểm tra quyền có trong permissions

      // Chỉ giữ lại item nếu có quyền hoặc có children hợp lệ
      if (hasAuthorities || (item.children && item.children.length > 0)) {
        return item;
      }

      return null; // Loại bỏ item không hợp lệ
    })
    .filter(Boolean); // Loại bỏ các giá trị null
};
