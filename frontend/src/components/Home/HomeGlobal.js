import React, { useEffect, useState, useMemo, useRef } from "react";
import Axios from "axios";
// react plugin for creating charts
// import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import certificationsManagementsIcon from "assets/img/quality-control.png";
// @material-ui/icons
// import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import CertificationIcon from "@material-ui/icons/VerifiedUser";

// import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import AccessTime from "@material-ui/icons/AccessTime";
// import Accessibility from "@material-ui/icons/Accessibility";
// import BugReport from "@material-ui/icons/BugReport";
// import Code from "@material-ui/icons/Code";
// import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
// import Tasks from "components/Tasks/Tasks.js";
// import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
// import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardTableCalcGdod from "components/Card/CardTableCalcGdod";
import CardTable from "components/Card/CardTable";
import Faq from "components/forum/faq";
// import Certifications from "views/Certifications/Certifications.js";
import Page from "react-page-loading";
import { Container } from "@material-ui/core";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { Link } from "react-router-dom";
import { Check, Eco, People } from "@material-ui/icons";
import moment from "moment";
import UserCard from "components/general/DashboardCards/UserCard/UserCard";
import { isAuthenticated } from "auth";
import CardTableCalcGlobal from "components/Card/CardTableCalcGlobal";

import safetyPic from "assets/img/shieldSafety.png"

import {
  Row,
  Col,
} from "reactstrap";

const user = isAuthenticated();

export default function Home() {
  
  const useStyles = makeStyles(dashboardStyle);


const [byrole, setByrole] = useState("");

async function init() {
  console.log(user.user.role)
    if (user.user.role == "1") {
      setByrole("bygdod");
    }
    if (user.user.role == "2") {
      setByrole("byhativa");
      console.log(byrole)
    }
    if (user.user.role == "3") {
      setByrole("byogda");
      console.log(byrole)
    }
    if (user.user.role == "4") {
      setByrole("bypikod");
      console.log(byrole)
    }
  }
  
  
  useEffect(() => {
    init();
    console.log(byrole)
}, []);



  return (
    <Page loader={"resize-spin"} color={"#A9A9A9"} size={4}>
      <div>
        <GridContainer>
          <CardTableCalcGlobal
            name={[
              "?????????? ????????????",
              "GlobalCertificationsManagementsView",
              "?????? ????! ?????? ???????????????? ???????? ????????",
              "certificationValidity",
              "certificationsManagement",
              byrole,
            ]}
          />
          <CardTableCalcGlobal
            name={[
              "?????????? ??????????????",
              "GlobalOccupationalSupervisionView",
              "?????? ????! ?????? ?????????????????? ?????? ????????",
              "nextTestDate",
              "occupationalSupervision",
              byrole,
            ]}
          />
          <CardTableCalcGlobal
            name={[
              "???????????? ???????????????? ?????????? ??????????????",
              "GlobalEquipmentAndMaterialsPeriodicInspectionsView",
              "?????? ????! ?????? ???????????????? ???????? ????????",
              "nextTestDate",
              "equipmentAndMaterialsPeriodicInspections",
              byrole,
            ]}
          />
          <CardTableCalcGlobal
            name={[
              "?????????????? ????????????????",
              "GlobalEnvironmentalMonitoringView",
              "?????? ????! ?????? ?????????????????? ?????? ????????",
              "nextMonitoringDate",
              "environmentalMonitoring",
              byrole,
            ]}
          />
        </GridContainer>
        <GridContainer>
          <CardTable name={["?????????? ???????? ??????????", "GlobalUnitIdView"]} />
          <CardTable
            name={["???????????? ???????????? ???? ??????????????", "GlobalSafetyOfficersQualificationView"]}
          />
          <CardTable name={["?????????? ????????????", "GlobalTrainingProgramView"]} />
          <CardTable
            name={[
              "???????????? ???????????????? ?????????????? ??????????",
              "GlobalMachinesAndEquipmentPeriodicInspectionsView",
            ]}
          />
          <CardTable
            name={["???????? ?????????? ??????????????", "GlobalRiskManagementMonitoringView"]}
          />
          <CardTable
            name={[
              "???????? ???????????? ???????????? ??????????????",
              "GlobalMonthlySafetyCommitteesMonitoringView",
            ]}
          />
        </GridContainer>
        <GridContainer>
          <CardTable name={["???????? ?????? ????????????", "GlobalHazardsMonitoringView"]} />
          <CardTable name={['???????? ?????????? ??????"??', "GlobalHomsManagementMonitoringView"]} />
          <CardTable
            name={[
              "???????? ???????? ?????? ????????",
              "GlobalPersonalProtectiveEquipmentMonitoringView",
            ]}
          />
          <CardTable name={["???????????? ???????????? ???????? ????????????", "GlobalGroundingTestsView"]} />
          <CardTable name={["?????????? ??????????????", "GlobalReviewsDocumentationView"]} />
          <Col>
            <img src={safetyPic} style={{height: "100px", display: "block", marginLeft: "auto", marginRight: "auto"}}></img>
          </Col>
        </GridContainer>
        <hr />
        <br />
        <Row>
          <Col> 
            <Faq
              style={{
              direction: "rtl",
              borderRadius: "15px",
              backgrooungColor: "#bde0fe",
              }}
            />
          </Col>
          <Col>
            {/* <img src={safetyPic} style={{height: "55%", display: "block", marginLeft: "auto", marginRight: "auto"}}></img> */}
          </Col>
        </Row>
      </div>
    
    </Page>
  );
}
