import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Upload, Button, Table, message, Row, Col, Select } from "antd";
import { UploadOutlined, FileExcelOutlined } from "@ant-design/icons";
import "./CompareInf.css";

const CompareInfContent = () => {
  const [data1, setData1] = useState<any[]>([]);
  const [columns1, setColumns1] = useState<any[]>([]);
  const [data2, setData2] = useState<any[]>([]);
  const [columns2, setColumns2] = useState<any[]>([]);
  const [compareKey1, setCompareKey1] = useState<string>();
  const [compareKey2, setCompareKey2] = useState<string>();
  const [diff1, setDiff1] = useState<any[]>([]);
  const [diff2, setDiff2] = useState<any[]>([]);
  const [bothData, setBothData] = useState<any[]>([]);

  const readExcel = (file: File, setColumns: any, setData: any) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

      if (jsonData.length > 0) {
        const colHeaders = (jsonData[0] as string[]).map((col: string) => ({
          title: col,
          dataIndex: col,
          key: col,
        }));

        const rowData = (jsonData.slice(1) as any[][]).map(
          (row: any[], idx: number) => {
            const rowObj: any = {};
            (jsonData[0] as string[]).forEach((col: string, colIdx: number) => {
              let cellValue = row[colIdx];

              if (
                (col.toLowerCase() === "phone" || col.toLowerCase() === "tài khoản") &&
                cellValue != null &&
                cellValue.toString().length === 9
              ) {
                const phoneStr = cellValue.toString();
                if (/^\d+$/.test(phoneStr) && phoneStr.length === 9) {
                  cellValue = "0" + phoneStr;
                }
              }
              rowObj[col] = cellValue;
            });
            rowObj.key = idx;
            return rowObj;
          }
        );

        setColumns(colHeaders);
        setData(rowData);
      } else {
        setColumns([]);
        setData([]);
        message.warning("File không có dữ liệu!");
      }
    };
    reader.readAsBinaryString(file);
    return false;
  };

  const handleCompare = () => {
    if (!compareKey1 || !compareKey2) {
      message.warning("Vui lòng chọn cột để so sánh cho cả hai file!");
      return;
    }

    const set2 = new Set(data2.map((row) => row[compareKey2]));
    const set1 = new Set(data1.map((row) => row[compareKey1]));

    const diffData1 = data1.filter((row1) => !set2.has(row1[compareKey1]));
    const diffData2 = data2.filter((row2) => !set1.has(row2[compareKey2]));

    const both = data1.filter((row1) => set2.has(row1[compareKey1]));

    setDiff1(diffData1);
    setDiff2(diffData2);
    setBothData(both);
  };

  const handleExportExcel = () => {
    if (!diff1.length && !diff2.length && !bothData.length) {
      message.warning("Chưa có dữ liệu để xuất!");
      return;
    }

    const wb = XLSX.utils.book_new();

    const sheet1 = XLSX.utils.json_to_sheet(diff1);
    XLSX.utils.book_append_sheet(wb, sheet1, "Only in File 1");

    const sheet2 = XLSX.utils.json_to_sheet(diff2);
    XLSX.utils.book_append_sheet(wb, sheet2, "Only in File 2");

    const sheet3 = XLSX.utils.json_to_sheet(bothData);
    XLSX.utils.book_append_sheet(wb, sheet3, "In Both Files");

    XLSX.writeFile(wb, "compare_result.xlsx");
  };

  return (
    <div className="compare-inf-content-container">
      <Row gutter={16}>
        <Col span={12}>
          <h3>File Excel 1</h3>
          <Upload
            beforeUpload={(file) => readExcel(file, setColumns1, setData1)}
            showUploadList={false}
            accept=".xlsx,.xls"
          >
            <Button icon={<UploadOutlined />}>Chọn file Excel 1</Button>
          </Upload>
          <Select
            style={{ width: "100%", marginTop: 8 }}
            placeholder="Chọn cột để so sánh cho file 1"
            value={compareKey1}
            onChange={setCompareKey1}
            options={columns1.map((col) => ({
              label: col.dataIndex,
              value: col.dataIndex,
            }))}
          />
          <Table
            style={{ marginTop: 16 }}
            columns={columns1}
            dataSource={data1}
            scroll={{ x: 900 }}
            bordered
            size="small"
            pagination={{ pageSize: 5 }}
          />
        </Col>
        <Col span={12}>
          <h3>File Excel 2</h3>
          <Upload
            beforeUpload={(file) => readExcel(file, setColumns2, setData2)}
            showUploadList={false}
            accept=".xlsx,.xls"
          >
            <Button icon={<UploadOutlined />}>Chọn file Excel 2</Button>
          </Upload>
          <Select
            style={{ width: "100%", marginTop: 8 }}
            placeholder="Chọn cột để so sánh cho file 2"
            value={compareKey2}
            onChange={setCompareKey2}
            options={columns2.map((col) => ({
              label: col.dataIndex,
              value: col.dataIndex,
            }))}
          />
          <Table
            style={{ marginTop: 16 }}
            columns={columns2}
            dataSource={data2}
            scroll={{ x: 900 }}
            bordered
            size="small"
            pagination={{ pageSize: 5 }}
          />
        </Col>
      </Row>

      <div style={{ margin: "24px 0" }}>
        <Button
          type="primary"
          onClick={handleCompare}
          disabled={!compareKey1 || !compareKey2}
          style={{ marginRight: 8 }}
        >
          So sánh
        </Button>
        <Button
          type="default"
          icon={<FileExcelOutlined />}
          onClick={handleExportExcel}
        >
          Xuất Excel kết quả
        </Button>
      </div>

      <Row gutter={16}>
        <Col span={8}>
          <h4>Dòng chỉ có ở File 1</h4>
          <Table
            columns={columns1}
            dataSource={diff1}
            scroll={{ x: 900 }}
            bordered
            size="small"
            pagination={{ pageSize: 5 }}
          />
        </Col>
        <Col span={8}>
          <h4>Dòng chỉ có ở File 2</h4>
          <Table
            columns={columns2}
            dataSource={diff2}
            scroll={{ x: 900 }}
            bordered
            size="small"
            pagination={{ pageSize: 5 }}
          />
        </Col>
        <Col span={8}>
          <h4>Dòng có ở cả hai file</h4>
          <Table
            columns={columns1}
            dataSource={bothData}
            scroll={{ x: 900 }}
            bordered
            size="small"
            pagination={{ pageSize: 5 }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CompareInfContent;
