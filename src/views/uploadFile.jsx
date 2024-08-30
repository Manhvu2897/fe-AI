import React, { useState, useEffect, useRef } from "react";
import LoadingPixel from "./loadingPixel";
import Toast from "./toast";
import axios from "axios";
import { Modal, Button, Spin, Select, Tooltip } from "antd";
import { SmileOutlined, CloudUploadOutlined } from "@ant-design/icons";
import logo from "../logo-msb-png.png";
import Switch2 from "./toggle";
import JSONPretty from "react-json-pretty";

const UploadFile = () => {
  const [loading, setLoading] = useState(false);
  const fileInput = useRef(null);
  const [toast, setToast] = useState(null);
  const [background, setBackground] = useState("#4aa52e");
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState("CCCD_FRONT");
  const handleUpload = () => {
    fileInput.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    // Check file size (5MB = 5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      setLoading(true);
      setToast("Please select a file <= 5MB");
      setBackground("#BF3A01");
      event.target.value = null;
      setTimeout(() => {
        setLoading(false);
        setToast(null);
      }, 3000);
      return;
    }
    if (!selected) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("document_type", selected);
    event.target.value = null;
    setLoading(true);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_AI}/api/v1/api_document_file/upload-file`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((res) => {
        setToast("Upload successful");
        setBackground("#4aa52e");
        setLoading(false);
        getAllData();
        setTimeout(() => {
          setToast(null);
        }, 3000);
      })
      .catch((error) => {
        setLoading(false);
        setToast("Server error");
        setBackground("#BF3A01");
        setTimeout(() => {
          setToast(null);
        }, 3000);
      });
  };

  const getAllData = () => {
    setLoading(true);
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_AI}/api/v1/api_document_file/get_all_document?page_size=1000000`,
    })
      .then((res) => {
        setLoading(false);
        setData(res.data.data);
      })
      .catch((error) => {
        setLoading(false);
        setToast("Server error");
        setBackground("#BF3A01");
        setTimeout(() => {
          setToast(null);
        }, 3000);
      });
  };

  const info = (response) => {
    const data = JSON.stringify(response.payload_result);
    Modal.info({
      title: <div>Image Information</div>,
      content: (
        <div style={{ overflow: "auto", maxHeight: "50vh" }}>
          <JSONPretty id="json-pretty" data={data}></JSONPretty>
        </div>
      ),
      onOk() {},
      width: "fit-content",
    });
  };

  useEffect(() => {
    getAllData();
  }, []);

  const getInfoItem = (id) => {
    setLoading(true);
    axios({
      method: "GET",
      url:
        `${process.env.REACT_APP_API_AI}/api/v1/api_document_file/detail/` + id,
    })
      .then((res) => {
        setLoading(false);
        if (res.data.data.aggregate_type !== "RESULT") {
          setToast("Documents in process");
          setBackground("#F5CE00");
          setTimeout(() => {
            setToast(null);
          }, 3000);
          return;
        }
        info(res.data.data);
      })
      .catch((error) => {
        setLoading(false);
        setToast("Error server");
        setBackground("#BF3A01");
        setTimeout(() => {
          setToast(null);
        }, 3000);
      });
  };
  const onChange = (checked) => {
    setChecked(checked);
  };
  const handleChange = (value) => {
    setSelected(value);
  };
  return (
    <>
      <div>
        <div className="header-left ">
          {checked ? (
            <img src={logo} style={{ width: "185px" }} />
          ) : (
            <div className="d-flex font_pixel">
              <div className="header-ai">MSB</div>
              <div>
                <div className="header-2">AI</div>
                <div
                  className="header-2"
                  style={{ fontSize: "21px", color: "#F54A00" }}
                >
                  Lab
                </div>
              </div>
            </div>
          )}
          <Switch2 checked={onChange} value={checked} />
        </div>
      </div>
      <div className="imageUpload">
        <div className={checked ? "" : "customer-slect"}>
          <Select
            value={selected}
            style={{
              width: !checked ? "250px" : "200px",
            }}
            onChange={handleChange}
            options={[
              {
                value: "CCCD_FRONT",
                label: "CCCD Front",
              },
              {
                value: "CCCD_BACK",
                label: "CCCD Back",
              },
              {
                value: "CCCD_OLD_FRONT",
                label: "CCCD Old Front",
              },
              {
                value: "CCCD_OLD_BACK",
                label: "CCCD Old Back",
              },
              { value: "PASSPORT", label: "Passport" },
            ]}
          />
        </div>
        <div className={checked ? "roboto_regular" : "font_pixel"}>
          Upload Image
        </div>
        {checked ? (
          <Button
            type="primary"
            icon={<CloudUploadOutlined />}
            size="large"
            onClick={handleUpload}
          >
            Upload
          </Button>
        ) : (
          <div className="eightbit-btn" onClick={handleUpload}>
            Upload
          </div>
        )}
        <input
          type="file"
          ref={fileInput}
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept=".img,.png,.jpg,.jpeg"
        />
      </div>
      {loading && (
        <div className="loading-component">
          {checked ? <Spin size="large" /> : <LoadingPixel />}
        </div>
      )}
      {toast && background && (
        <Toast
          icon={<SmileOutlined style={{ fontSize: "24px" }} />}
          title={toast}
          checked={checked}
          background={background}
        />
      )}
      <div className={checked ? "border-pixel__normal" : "border-pixel"}>
        {data?.map((item, index) => (
          <div key={index}>
            <div
              className={`${
                checked ? "roboto_regular" : "font_pixel"
              } pixel m-3`}
            >
              <Tooltip title={item.file_name}>
                <div className="text--">{item.file_name}</div>
              </Tooltip>
              <div
                className="button__pixel"
                onClick={() => getInfoItem(item._id)}
              >
                Detail
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
};

export default UploadFile;
