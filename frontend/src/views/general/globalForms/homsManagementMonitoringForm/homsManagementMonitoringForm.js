import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";

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

import editpic from "assets/img/edit.png";
import deletepic from "assets/img/delete.png";
import SettingModal from "../../../../components/general/modal/SettingModal";

import { isAuthenticated } from "auth";

const HomsManagementMonitoringForm = ({ match }) => {
  const [state, setState] = useState({});
  const [gdods, setGdods] = useState([]);

  const user = isAuthenticated();

  async function init() {
    if (match.params.id != "0") {
      loadDatas();
    }
    let user1 = await isAuthenticated();
    console.log(user1);
    if (user1.user.role == "0") {
      loadGdods();
    } else if (user1.user.role == "2") {
      getGdodsByHativa();
    } else if (user1.user.role == "3") {
      getGdodsByOgda();
    } else if (user1.user.role == "4") {
      getGdodsByPikod();
    }
  }

  const getGdods = async () => {
    try {
      await axios
        .get(`http://localhost:8000/api/homsManagementMonitoring`)
        .then((response) => {
          let tempData = [];
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].gdod == user.user.gdod) {
              tempData.push(response.data[i]);
            }
          }
          setState(tempData);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch {}
  };

  const getGdodsByHativa = async () => {
    let tempgdodbyhativa;
    await axios
      .post(`http://localhost:8000/api/gdod/gdodsbyhativaid`, {
        hativa: user.user.hativa,
      })
      .then((response) => {
        tempgdodbyhativa = response.data;
        setGdods(tempgdodbyhativa, () => console.log(gdods));
        console.log(gdods);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getGdodsByOgda = async () => {
    let tempgdodsbyogda = [];
    console.log(user.user.ogda);
    await axios
      .post(`http://localhost:8000/api/hativa/hativasbyogdaid`, {
        ogda: user.user.ogda,
      })
      .then(async (response1) => {
        for (let i = 0; i < response1.data.length; i++) {
          await axios
            .post(`http://localhost:8000/api/gdod/gdodsbyhativaid`, {
              hativa: response1.data[i]._id,
            })
            .then((response2) => {
              for (let j = 0; j < response2.data.length; j++) {
                tempgdodsbyogda.push(response2.data[j]);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
        console.log(tempgdodsbyogda);
        setGdods(tempgdodsbyogda);
        console.log(gdods);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getGdodsByPikod = async () => {
    let tempgdodsbypikod = [];

    await axios
      .post(`http://localhost:8000/api/ogda/ogdasbypikodid`, {
        pikod: user.user.pikod,
      })
      .then(async (response1) => {
        for (let i = 0; i < response1.data.length; i++) {
          await axios
            .post(`http://localhost:8000/api/hativa/hativasbyogdaid`, {
              ogda: response1.data[i]._id,
            })
            .then(async (response2) => {
              for (let j = 0; j < response2.data.length; j++) {
                await axios
                  .post(`http://localhost:8000/api/gdod/gdodsbyhativaid`, {
                    hativa: response2.data[j]._id,
                  })
                  .then(async (response3) => {
                    for (let k = 0; k < response3.data.length; k++) {
                      tempgdodsbypikod.push(response3.data[k]);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
        setGdods(tempgdodsbypikod);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setState({ ...state, [evt.target.name]: value });
  }

  const loadDatas = () => {
    axios
      .get(
        `http://localhost:8000/api/homsManagementMonitoring/${match.params.id}`
      )
      .then((response) => {
        let tempdatas = response.data;
        setState(tempdatas);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadGdods = () => {
    axios
      .get("http://localhost:8000/api/gdod")
      .then((response) => {
        setGdods(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clickSubmit = async (event) => {
    CheckFormData();
  };

  const CheckFormData = () => {
    let flag = true;
    let error = "";

    if (((state.materialName == undefined) || (state.materialName == ""))) {
      error += "חסר שדה שם החומר, "
      flag = false;
    }
    if (((state.sheetId == undefined) || (state.sheetId == ""))) {
      error += "חסר שדה מספר גיליון, "
      flag = false;
    }
    if (((state.materialDepartments == undefined) || (state.materialDepartments == ""))) {
      error += "חסר שדה מחלקות בהן נמצא החומר, "
      flag = false;
    }
    if (((state.comments == undefined) || (state.comments == ""))) {
      error += "חסר שדה הערות, "
      flag = false;
    }
    if (((state.gdod == undefined) || (state.gdod == ""))) {
      error += "חסר שדה גדוד, "
      flag = false;
    }
  
    if (flag == true) {
      SubmitData();
      toast.success("הטופס עודכן בהצלחה");
      history.goBack()
    }
    else {
      toast.error(error)
    }
  }

  async function SubmitData() {
    let tempData;
    if (match.params.id == "0") {
      //new mahzor
      let result = await axios.post(
        "http://localhost:8000/api/homsManagementMonitoring",
        state
      );
      tempData = result.data;
    } else {
      // update mahzor
      let tempWithDeleteId = state;
      delete tempWithDeleteId._id;
      let result = await axios.put(
        `http://localhost:8000/api/homsManagementMonitoring/${match.params.id}`,
        tempWithDeleteId
      );
      tempData = result.data;
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <Card>
      <CardHeader style={{ direction: "rtl" }}>
        <CardTitle
          tag="h3"
          style={{ direction: "rtl", textAlign: "center", fontWeight: "bold" }}
        >
          טופס מעקב ניהול חומ"ס
        </CardTitle>
        {/*headline*/}
      </CardHeader>
      <CardBody style={{ direction: "rtl" }}>
        <Container>
          <Row>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                שם החומר
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="materialName"
                  value={state.materialName}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                מספר גיליון
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="number"
                  name="sheetId"
                  value={state.sheetId}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                מחלקות בהן נמצא החומר
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="materialDepartments"
                  value={state.materialDepartments}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                הערות
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="comments"
                  value={state.comments}
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
                  value={state.gdod}
                  onChange={handleChange}
                >
                  <option value={""}>גדוד</option>
                  {gdods.map((gdod, index) => (
                    <option value={gdod._id}>{gdod.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <hr style={{ borderTop: "1px solid darkGray" }} />
          <Row>
            <Col xs={12} md={4}></Col>
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
export default withRouter(HomsManagementMonitoringForm);
