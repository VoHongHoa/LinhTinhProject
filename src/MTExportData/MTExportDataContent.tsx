import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import {
  Button,
  Flex,
  Table,
  Form,
  Input,
  Row,
  Col,
  CollapseProps,
} from "antd";
import "./MTExportData.css";
import { generateRandomString } from "../ultil/helper";

import { Collapse } from "antd";

const { Panel } = Collapse;

const MTExportDataContent = () => {
  const [excelFile, setExcelFile] = useState<any>(null);
  const [wordTemplate, setWordTemplate] = useState<any>(null);
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState<any>([]);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [excelData, setExcelData] = useState<any>({});
  const [form] = Form.useForm();

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setSelectedRows([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: any, selectedRows: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(selectedRows);
  };

  const rowSelection = {
    selectedRowKeys,
    selectedRows,
    onChange: onSelectChange,
  };

  const handleExcelFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (
      file &&
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setExcelFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        const data = reader.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0]; // Đọc sheet đầu tiên
        const sheet: any = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet); // Chuyển sheet thành mảng JSON
        // Lấy phạm vi của sheet
        const range: any = XLSX.utils.decode_range(sheet["!ref"]);
        const maxColumns = range.e.c + 1; // Số cột tối đa

        const headerRow: any = [];
        for (let col = 0; col < maxColumns; col++) {
          const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
          const cell = sheet[cellAddress];

          // Nếu ô có giá trị hoặc key tồn tại nhưng trống
          const colName = cell ? cell.v : `Cột ${XLSX.utils.encode_col(col)}`;
          headerRow.push(colName);
        }

        setColumns(
          headerRow.map((key: any) => {
            return {
              title: key,
              dataIndex: key,
            };
          })
        );

        const dataFromExcel: any = jsonData.map((data: any, index) => {
          return {
            ...data,
            key: index + generateRandomString(10),
          };
        });

        setExcelData(dataFromExcel);

        setDataSource(dataFromExcel);
      };
      reader.readAsBinaryString(file);
    } else {
      alert("Vui lòng chọn file Excel");
    }
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    const filterData = (data: any, filters: any) =>
      data.filter((item: any) =>
        Object.keys(filters).every(
          (key) =>
            !filters[key] ||
            item[key]
              ?.toString()
              .toLowerCase()
              .includes(filters[key].toLowerCase())
        )
      );
    const resultFilter = filterData(excelData, values);
    setDataSource(resultFilter);
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleWordTemplateUpload = (e: any) => {
    const file = e.target.files[0];
    if (
      file &&
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setWordTemplate(file);
    } else {
      alert("Vui lòng chọn file Word mẫu");
    }
  };
  const onClear = () => {
    form.resetFields(); // Xóa tất cả các giá trị trong form
    setSelectedRowKeys([]);
    setSelectedRows([]);
    setDataSource(excelData);
  };

  const generateWordFile = () => {
    if (!excelFile || !wordTemplate) {
      alert("Vui lòng chọn cả file Excel và file Word mẫu");
      return;
    }
    const readerTemplate = new FileReader();
    readerTemplate.onload = (e: any) => {
      const templateData: any = e.target.result;
      const zip = new PizZip(templateData);
      const doc = new Docxtemplater(zip);
      // Điền dữ liệu vào template
      const data = selectedRows.length > 0 ? selectedRows : dataSource;
      doc.setData({ data });
      try {
        doc.render();
      } catch (error) {
        console.error("Lỗi khi tạo file Word:", error);
      }
      const output = doc.getZip().generate({ type: "blob" });
      // Tải xuống file Word
      saveAs(output, `output.docx`);
    };

    readerTemplate.readAsBinaryString(wordTemplate);
  };

  const hasSelected = selectedRowKeys.length > 0;

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Thông tin tìm kiếm",
      children: (
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Bộ phận" name="BO_PHAN">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="ID" name="ID">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Mã nhân viên" name="MA_NV">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Họ lót" name="HO_LOT">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Tên" name="TEN">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Ngày sinh" name="NGAY_SINH">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Tuổi" name="TUOI">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Giới tính" name="GIOI_TINH">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Cao" name="CAO">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Nặng" name="NANG">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="BMI" name="BMI">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Mạch" name="MACH">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Huyết áp" name="HUYET_AP">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Kết luận" name="KET_LUAN">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Loại sức khỏe" name="LOAI_SK">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Bệnh nghề nghiệp" name="BNN">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Nhà máy" name="NHA_MAY">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Nhóm" name="NHOM">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Tìm kiếm
                </Button>
                <Button
                  htmlType="button"
                  onClick={onClear}
                  style={{ marginLeft: "10px" }}
                >
                  Xóa điều kiện
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
  ];
  const onChange = (key: string | string[]) => {
    // console.log(key);
  };

  return (
    <div className="mt-export-data-container">
      <Collapse items={items} />
      <div className="file-upload-wrapper">
        <div className="upload-btn">
          <label htmlFor="file-upload-1" className="custom-file-upload">
            <i className="fas fa-upload"></i> Chọn file dữ liệu excel
          </label>
          <input
            id="file-upload-1"
            type="file"
            onChange={handleExcelFileUpload}
          />
          {excelFile && (
            <div className="file-choose">
              <span>{excelFile.name}</span>
              <div className="excel-icon">
                <i className="fas fa-file-excel"></i>
              </div>
            </div>
          )}
        </div>

        <div className="upload-btn">
          <label htmlFor="file-upload-2" className="custom-file-upload">
            <i className="fas fa-upload"></i> Chọn file word mẫu
          </label>
          <input
            id="file-upload-2"
            type="file"
            onChange={handleWordTemplateUpload}
          />
          {wordTemplate && (
            <div className="file-choose">
              <span>{wordTemplate.name}</span>
              <div className="word-icon">
                <i className="fas fa-file-word"></i>
              </div>
            </div>
          )}
        </div>
        <button className="custom-button" onClick={generateWordFile}>
          <i className="fas fa-paper-plane"></i> Tạo file Word
        </button>
      </div>

      <div className="table-data-container">
        {columns.length > 0 && (
          <Flex gap="middle" vertical>
            <Flex align="center" gap="middle">
              <Button
                type="primary"
                onClick={start}
                disabled={!hasSelected}
                loading={loading}
              >
                Bỏ lựa chọn
              </Button>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
            </Flex>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={dataSource}
              scroll={{ x: 900 }}
            />
          </Flex>
        )}
      </div>
    </div>
  );
};

export default MTExportDataContent;
