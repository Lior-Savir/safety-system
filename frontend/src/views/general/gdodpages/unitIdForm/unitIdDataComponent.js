import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
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

const UnitIdDataComponent = ({ match }) => {
  //mahzor
  const [unit, setUnit] = useState({});
  //mahzor

  function handleChange(evt) {
    const value = evt.target.value;
    setUnit({ ...unit, [evt.target.name]: value });
  }

  const loadunits = () => {
    axios
      .get(`http://localhost:8000/api/unitId/${match.params.id}`)
      .then((response) => {
        let tempunits = response.data;
        setUnit(tempunits);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clickSubmit = (event) => {
    if (CheckFormData()) {
      SubmitData();
      toast.success("הטופס עודכן בהצלחה");
      history.goBack();
    } else {
      toast.error("שגיאה בטופס");
    }
  };

  function CheckFormData() {
    let flag = true;
    let error = "";

    // if (((mahzordata.name == undefined) || (mahzordata.name == "")) || ((mahzordata.startdate == undefined) || (mahzordata.startdate == "")) || ((mahzordata.enddate == undefined) || (mahzordata.enddate == ""))) {
    //   error += "פרטים כלליים שגויים"
    //   flag = false;
    // }
    return flag;
  }

  async function SubmitData() {
    let tempUnitData;
    if (match.params.id == "0") {
      //new mahzor
      let result = await axios.post("http://localhost:8000/api/unitId", unit);
      tempUnitData = result.data;
    } else {
      // update mahzor
      let tempUnitWithDeleteId = unit;
      delete tempUnitWithDeleteId._id;
      let result = await axios.put(
        `http://localhost:8000/api/unitId/${match.params.id}`,
        tempUnitWithDeleteId
      );
      tempUnitData = result.data;
    }

    // console.log("post")
    // let result = await axios.post("http://localhost:8000/api/unitId", unit);
    // tempUnitData = result.data;
  }

  function init() {
    if (match.params.id != "0") {
      loadunits();
    }
  }

  useEffect(() => {
    init();
    console.log("banana");
  }, []);

  return (
    <Card>
      <CardHeader style={{ direction: "rtl" }}>
        <CardTitle
          tag="h4"
          style={{ direction: "rtl", textAlign: "center", fontWeight: "bold" }}
        >
          טופס תעודת זהות יחידה
        </CardTitle>
      </CardHeader>
      <CardBody style={{ direction: "rtl" }}>
        <Container>
          <Row>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                שם יחידה
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="name"
                  value={unit.name}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                מיקום היחידה
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="location"
                  value={unit.location}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                מבנה היחידה
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="unitStructure"
                  value={unit.unitStructure}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                פירוט האמצעים ביחידה
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="unitMeans"
                  value={unit.unitMeans}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                עיסוק מרכזי
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="mainOccupation"
                  value={unit.mainOccupation}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                עץ מבנה יחידה
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="unitStructureTree"
                  value={unit.unitStructureTree}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                עץ מבנה מחלקת טנ"א
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="teneStructureTree"
                  value={unit.teneStructureTree}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
            {/* <Col xs={12} md={4}>
              <div style={{ textAlign: "center", paddingTop: "10px" }}>
                גדוד
              </div>
              <FormGroup dir="rtl">
                <Input
                  type="text"
                  name="gdod"
                  value={unit.gdod}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col> */}
            <Col xs={12} md={4}>
              <Button type="primary" onClick={() => clickSubmit()}>
                הוסף נתונים
              </Button>
            </Col>
          </Row>
        </Container>
      </CardBody>
    </Card>
  );
};
export default withRouter(UnitIdDataComponent);
