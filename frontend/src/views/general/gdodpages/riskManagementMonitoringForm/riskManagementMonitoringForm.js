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

import editpic from "assets/img/edit.png";
import deletepic from "assets/img/delete.png";
import SettingModal from "../../../../components/general/modal/SettingModal";
import { isAuthenticated } from "auth";

const RiskManagementMonitoringForm = ({ match }) => {
  const user = isAuthenticated();
  //mahzor
  const [state, setState] = useState([]);
  const [gdods, setGdods] = useState([]);
  //mahzor

  function handleChange(evt) {
    const value = evt.target.value;
    setState({ ...state, [evt.target.name]: value });
  }

  const loadDatas = () => {
    axios
      .get(
        `http://localhost:8000/api/riskManagementMonitoring/${match.params.id}`
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

    if (((state.processStage == undefined) || (state.processStage == ""))) {
      error += "חסר שדה שלב התהליך, "
      flag = false;
    }
    if (((state.riskFactor == undefined) || (state.riskFactor == ""))) {
      error += "חסר שדה גורם הסיכון, "
      flag = false;
    }
    if (((state.factorMfive == undefined) || (state.factorMfive == ""))) {
      error += "חסר שדה גורם (מתוך M5), "
      flag = false;
    }
    if (((state.initialRiskAssessment == undefined) || (state.initialRiskAssessment == ""))) {
      error += "חסר שדה הערכת סיכונים ראשונית, "
      flag = false;
    }
    if (((state.preventiveActions == undefined) || (state.preventiveActions == ""))) {
      error += "חסר שדה פעולות מניעה/אמצעי בקרה, "
      flag = false;
    }
    if (((state.secondRiskAssessment == undefined) || (state.secondRiskAssessment == ""))) {
      error += "חסר שדה הערכת סיכונים חוזרת, "
      flag = false;
    }
    if (((state.responsibility == undefined) || (state.responsibility == ""))) {
      error += "חסר שדה אחריות, "
      flag = false;
    }
    if (((state.tgb == undefined) || (state.tgb == ""))) {
      error += "חסר שדה תג''ב, "
      flag = false;
    }
    if (((state.status == undefined) || (state.status == ""))) {
      error += "חסר שדה סטטוס, "
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
    let gd = {...state};
    gd.gdod = user.user.gdod;
    if (match.params.id == "0") {
      //new mahzor
      let result = await axios.post(
        "http://localhost:8000/api/riskManagementMonitoring",
        gd
      );
      tempData = result.data;
    } else {
      // update mahzor
      let tempWithDeleteId = gd;
      delete tempWithDeleteId._id;
      let result = await axios.put(
        `http://localhost:8000/api/riskManagementMonitoring/${match.params.id}`,
        tempWithDeleteId
      );
      tempData = result.data;
    }

    // let result = await axios.post(
    //   "http://localhost:8000/api/riskManagementMonitoring",
    //   state
    // );
    // tempData = result.data;
  }

  function init() {
    if (match.params.id != "0") {
      loadDatas();
    }
    loadGdods();
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
          טופס מעקב ניהול סיכונים
        </CardTitle>
        {/*headline*/}
      </CardHeader>
      <CardBody style={{ direction: "rtl" }}>
        <Container>
          <Row>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                שלב התהליך
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="processStage"
                  value={state.processStage}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                גורם הסיכון
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="riskFactor"
                  value={state.riskFactor}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                גורם (מתוך M5) סיבות ותרחישים
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="factorMfive"
                  value={state.factorMfive}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                הערכת סיכונים ראשונית (מתוך ח,ס,ה)
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="select"
                  name="initialRiskAssessment"
                  value={state.initialRiskAssessment}
                  onChange={handleChange}
                >
                   <option value="">בחר אפשרות</option>
                  <option value="ח">ח</option>
                  <option value="ס">ס</option>
                  <option value="ה">ה</option>
                  </Input>
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                פעולות מניעה / אמצעי בקרה
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="preventiveActions"
                  value={state.preventiveActions}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                הערכת סיכונים חוזרת (מתוך ח,ס,ה)
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="select"
                  name="secondRiskAssessment"
                  value={state.secondRiskAssessment}
                  onChange={handleChange}
                >
                   <option value="">בחר אפשרות</option>
                  <option value="ח">ח</option>
                  <option value="ס">ס</option>
                  <option value="ה">ה</option>
                  </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                אחריות
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="responsibility"
                  value={state.responsibility}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                תג"ב
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="tgb"
                  value={state.tgb}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                סטטוס
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="status"
                  value={state.status}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                גדוד
              </div>
              <FormGroup className="mb-3" dir="rtl">
                <Input
                  placeholder="גדוד"
                  name="gdod"
                  type="select"
                  value={user.user.gdod}
                  onChange={handleChange}
                  disabled="disabled"
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
export default withRouter(RiskManagementMonitoringForm);
