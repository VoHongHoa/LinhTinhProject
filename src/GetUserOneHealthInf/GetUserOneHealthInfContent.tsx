import { Form, Input, Button, Table, message, Spin } from "antd";
import { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./GetUserOneHealthInf.css"; // Assuming you have a CSS file for styles
export default function GetUserOneHealthInfContent(): JSX.Element {
  const columns = [
    { title: "STT", dataIndex: "key", key: "key" },
    { title: "Tài khoản", dataIndex: "taiKhoan", key: "taiKhoan" },
    { title: "Họ tên", dataIndex: "hoTen", key: "hoTen" },
    { title: "Ngày sinh", dataIndex: "ngaySinh", key: "ngaySinh" },
    { title: "Ngày nhập", dataIndex: "ngayNhap", key: "ngayNhap" },
    { title: "Khoa phòng", dataIndex: "khoaPhong", key: "khoaPhong" },
  ];

  const [dataSource, setDataSource] = useState<any>([]);
  const [loading, setLoading] = useState(false); // Thêm state loading

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await axios.get(values.input1, {
        headers: { Authorization: `Bearer ${values.input2}` },
      });
      setDataSource(processDataSource(response.data.data.content));
    } catch (error: any) {
      message.error("Lỗi khi gọi API!");
      setDataSource([]);
    } finally {
      setLoading(false);
    }
  };

  const processDataSource = (data: any) => {
    return data.map((item: any, index: any) => ({
      key: index + 1,
      taiKhoan: item.taiKhoan,
      hoTen: item.hoSoCaNhan?.hoTen,
      ngaySinh: item.hoSoCaNhan?.ngaySinh,
      ngayNhap: item.ngayNhap,
      khoaPhong: item.hoSoCaNhan?.donvi?.ten,
    }));
  };

  // Hàm xuất Excel
  const exportToExcel = () => {
    if (!dataSource.length) {
      message.warning("Không có dữ liệu để xuất!");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(dataSource);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "danh_sach.xlsx");
  };

  return (
    <div className="get-inf-container">
      <Spin spinning={loading} tip="Đang tải dữ liệu...">
        <h2>Lấy thông tin người dùng One Health</h2>
        <Form
          layout="vertical"
          style={{ minWidth: 300 }}
          onFinish={handleFinish}
        >
          <Form.Item
            label="Đường dẫn lấy dữ liệu"
            name="input1"
            rules={[{ required: true, message: "Nhập đường dẫn giúp!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Token"
            name="input2"
            rules={[{ required: true, message: "Lấy token đi!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lấy dữ liệu đi
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={exportToExcel}
              disabled={!dataSource.length}
            >
              Xuất Excel
            </Button>
          </Form.Item>
        </Form>

        <Table columns={columns} dataSource={dataSource} scroll={{ x: 900 }} />
      </Spin>
    </div>
  );
}
