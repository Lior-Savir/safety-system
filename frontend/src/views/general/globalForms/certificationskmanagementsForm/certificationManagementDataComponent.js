import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";

import { singleFileUpload } from "../../../../data/api";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Container,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Alert,
  Spinner,
  Label,
  Col,
} from "reactstrap";
import axios from "axios";
import history from "history.js";
import { produce } from "immer";
import { generate } from "shortid";
import { toast } from "react-toastify";

// import editpic from "assets/img/edit.png";
// import deletepic from "assets/img/delete.png";
// import SettingModal from "../../../../components/general/modal/SettingModal";
import { isAuthenticated } from "auth";

const CertificationManagementDataComponent = ({match}) => {
  //mahzor
  const [data, setData] = useState({});
  const [details, setDetails] = useState({});
  const [document, setDocument] = useState({});
  const [gdods, setGdods] = useState([]);

  const user = isAuthenticated();

  async function init() { 
    let user1 = await isAuthenticated();
    if (match.params.id != "0") {
      loadDatas();
    }
    console.log(user1)
      if (user1.user.role == "0") {
        getGdods();
      }else
      if (user1.user.role == "2") {
        getGdodsByHativa();
      }else 
      if (user1.user.role == "3") {
        getGdodsByOgda();
      }else 
      if (user1.user.role == "4") {
        getGdodsByPikod();
      }
  }

  const loadDatas = () => {
    axios
      .get(
        `http://localhost:8000/api/certificationsManagement/${match.params.id}`
      )
      .then((response) => {
        let tempdatas = response.data;
        setData(tempdatas);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getGdods = async () => {
    axios
    .get("http://localhost:8000/api/gdod")
    .then((response) => {
      setGdods(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const getGdodsByHativa = async () => {
    let tempgdodbyhativa;
    await axios.post(`http://localhost:8000/api/gdod/gdodsbyhativaid`, { hativa: user.user.hativa })
      .then((response) => {
        tempgdodbyhativa = response.data;
        setGdods(tempgdodbyhativa, () => console.log(gdods))
        console.log(gdods)
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const getGdodsByOgda = async () => {
    let tempgdodsbyogda = [];
    console.log(user.user.ogda)
    await axios.post(`http://localhost:8000/api/hativa/hativasbyogdaid`, { ogda: user.user.ogda })
      .then(async (response1) => {
        for (let i = 0; i < response1.data.length; i++) {
          await axios.post(`http://localhost:8000/api/gdod/gdodsbyhativaid`, { hativa: response1.data[i]._id })
            .then((response2) => {
              for (let j = 0; j < response2.data.length; j++) {
                tempgdodsbyogda.push(response2.data[j])               
              }
            })
            .catch((error) => {
              console.log(error);
            });
          }
          console.log(tempgdodsbyogda)
          setGdods(tempgdodsbyogda);
          console.log(gdods)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getGdodsByPikod = async () => {
    let tempgdodsbypikod = [];

    await axios.post(`http://localhost:8000/api/ogda/ogdasbypikodid`, { pikod: user.user.pikod })
      .then(async (response1) => {
        for (let i = 0; i < response1.data.length; i++) {
          await axios.post(`http://localhost:8000/api/hativa/hativasbyogdaid`, { ogda: response1.data[i]._id })
            .then(async (response2) => {
              for (let j = 0; j < response2.data.length; j++) {
                await axios.post(`http://localhost:8000/api/gdod/gdodsbyhativaid`, { hativa: response2.data[j]._id })
                  .then(async (response3) => {
                    for (let k = 0; k < response3.data.length; k++) {
                      tempgdodsbypikod.push(response3.data[k])
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  })
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
        setGdods(tempgdodsbypikod)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleChange(evt) {
    const value = evt.target.value;
    if(evt.target.name != "personalNumber") {
      setData({ ...data, [evt.target.name]: value });
    }
    else {
      pullDetails(evt.target.value)
    }
  }

  async function pullDetails(pn) {
    if (pn != '') {
      let response = await axios.get(`http://localhost:8000/api/occupationalSupervision/byPn/${pn}`)
      if (response.data.length > 0) {
        setData(response.data[0])
      }
      else {
        setData({...data, personalNumber: pn})
      }
    } else {
      setData({...data, personalNumber: pn}) }
  }

  const clickPull = (event) => {
    let tempPn = data.personalNumber
    console.log(tempPn)
    axios
      .get(
        `http://localhost:8000/api/occupationalSupervision/byPn/${tempPn}`
      )
      .then((response) => {
        let tempdatas = response.data[0];
        if (tempdatas != null)
        {
          setDetails(tempdatas);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log('error');
        console.log(data.personalNumber);
      });
  };

  const clickSubmit = async (event) => {
    CheckFormData();
  };

  const CheckFormData = () => {
    let flag = true;
    let error = "";

    if (((data.personalNumber == undefined) || (data.personalNumber == ""))) {
      error += "חסר שדה מספר אישי, "
      flag = false;
    }
    if (((data.id == undefined) || (data.id == ""))) {
      error += "חסר שדה תעודת זהות, "
      flag = false;
    }
    if (((data.fullName == undefined) || (data.fullName == ""))) {
      error += "חסר שדה שם, "
      flag = false;
    }
    if (((data.rank == undefined) || (data.rank == ""))) {
      error += "חסר שדה דרגה, "
      flag = false;
    }
    if (((data.profession == undefined) || (data.profession == ""))) {
      error += "חסר שדה מקצוע, "
      flag = false;
    }
    if (((data.certification == undefined) || (data.certification == ""))) {
      error += "חסר שדה הסמכה, "
      flag = false;
    }
    if (((data.certificationValidity == undefined) || (data.certificationValidity == ""))) {
      error += "חסר שדה תוקף הסמכה, "
      flag = false;
    }
    if (((data.gdod == undefined) || (data.gdod == ""))) {
      error += "חסר שדה גדוד , "
      flag = false;
    }
    // if ((document.documentUpload == undefined)) {
    //   error += "חסר שדה העלאת מסמכים , "
    //   flag = false;
    // }

    if (flag == true) {
      SubmitData();
      toast.success("הטופס עודכן בהצלחה");
      history.goBack();
    }
    else {
      toast.error(error)
    }
  }

  const UploadFile = async (id) => {
    const formData = new FormData();
    const collec = "certificationsManagement";
    formData.append("file", singleFile);
    await singleFileUpload(formData, collec, id);
    console.log(singleFile);
  };

  async function SubmitData() {
    let tempWithDeleteId = data;
    delete tempWithDeleteId._id;
    let tempData;
    // let tempData2;
    if (match.params.id == "0") {
      let result = await axios.post(
        "http://localhost:8000/api/certificationsManagement",
        data
      );
      // let result2 = await axios.post(
      //   "http://localhost:8000/api/certificationsManagement",
      //   document
      // );
      tempData = result.data;
      // tempData2 = result2.data;
    } else {
      let tempWithDeleteId = data;
      delete tempWithDeleteId._id;
      let result = await axios.put(
        `http://localhost:8000/api/certificationsManagement/${match.params.id}`,
        tempWithDeleteId
      );
      tempData = result.data;
    }
    if(singleFile!=="")
    await UploadFile(tempData._id);

  }

  useEffect(() => {
    init();
    
  }, []);

  const [singleFile, setSingleFile] = useState("");
  const SingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
  };

  return (
    <Card>
      <CardHeader style={{ direction: "rtl" }}>
        <CardTitle
          tag="h3"
          style={{ direction: "rtl", textAlign: "center", fontWeight: "bold" }}
        >
          טופס ניהול הסמכות
        </CardTitle> 
      </CardHeader>
      <CardBody style={{ direction: "rtl" }}>
        <Container>
          <Row>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                מספר אישי
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="personalNumber"
                  value={data.personalNumber}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
 <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                תעודת זהות
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="number"
                  name="id"
                  value={data.id}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                שם מלא
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="fullName"
                  value={data.fullName}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>          
            </Row>
            <Row>
          
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                דרגה
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="rank"
                  value={data.rank}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col> 
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                מקצוע
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="profession"
                  value={data.profession}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                הסמכה
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="certification"
                  value={data.certification}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col> 
          </Row>
          <Row>
  
           
                 <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                תוקף הסמכה
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="date"
                  name="certificationValidity"
                  value={data.certificationValidity}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
      
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                גדוד
              </div>
              <FormGroup className="mb-3" dir="rtl">
                <Input
                  placeholder="גדוד"
                  name="gdod"
                  type="select"
                  value={data.gdod}
                  onChange={handleChange}
                  // disabled="disabled"
                >
                  <option value={""}>גדוד</option>
                  {gdods.map((gdod, index) => (
                    <option value={gdod._id} key={index}>{gdod.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col> 
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                צירוף מסמך
              </div>
              <Input
                type="file"
                name="documentUpload"
                // value={document.documentUpload}
                onChange={(e) => SingleFileChange(e)}
              ></Input>
            </Col>
            </Row>
          <hr style={{ borderTop: "1px solid darkGray" }} />
          <Row>
            <Col xs={12} md={4}>
            </Col>
            <Col xs={12} md={4}>
              <Button
                type="primary"
                className="btn btn-info"
                style={{ width: "100%" }}
                onClick={() => clickSubmit()}
              >
                הוסף נתונים
              </Button>
            </Col>
            <Col xs={12} md={4}></Col>
          </Row>
        </Container>
      </CardBody>
    </Card>
  );
};
export default withRouter(CertificationManagementDataComponent);
 