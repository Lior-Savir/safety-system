import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

// reactstrap components
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";

import {
  BackgroundColorContext,
  backgroundColors,
} from "contexts/BackgroundColorContext";

import { ThemeContext, themes } from "contexts/ThemeContext";
import darkLogo from "assets/img/darkWideLogo.png";
import lightLogo from "assets/img/wideLogo.png";
import home from "assets/img/home3.png";
import homeGif from "assets/img/home.gif";
import table from "assets/img/table.png";
import followers from "assets/img/followers.png";
import shortlist from "assets/img/shortlist.png";
import people from "assets/img/people.png";
import editusers from "assets/img/editusers.png";
import links from "assets/img/links.png";
import setting from "assets/img/setting.png";
import forum from "assets/img/conversation.png";
import { signout } from "auth/index";
import history from "../../../history";

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

import { isAuthenticated } from "auth/index";

function SidebarAdmin() {
  const clickSubmit = (event) => {
    event.preventDefault();
    signout().then((response) => {
      history.push(`/signin`);
    });
  };

  return (
    <>
      <ThemeContext.Consumer>
        {({ changeTheme, theme }) =>
          theme == "white-content" ? (
            <Link to="/adminDashboard">
              <div className="logo">
                <img
                  src={lightLogo}
                  style={{ width: "100%", height: "100%" }}
                ></img>
              </div>
            </Link>
          ) : (
            <Link to="/adminDashboard">
              <div className="logo">
                <img
                  src={darkLogo}
                  style={{ width: "100%", height: "100%" }}
                ></img>
              </div>{" "}
            </Link>
          )
        }
      </ThemeContext.Consumer>
      <Nav style={{ textAlign: "right" }}>
        <li>
          <NavLink
            to="/adminDashboard"
            style={{ margin: "0px" }}
            activeClassName="sidebar_active_link"
          >
            <Row style={{ direction: "rtl" }}>
              <Col
                xs={12}
                md={3}
                style={{
                  paddingLeft: "0px",
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                <img src={home} style={{ height: "20px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                  }}
                >
                  דף הבית
                </h4>
              </Col>
            </Row>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/unitId"
            style={{ margin: "0px" }}
            activeClassName="sidebar_active_link"
          >
            <Row style={{ direction: "rtl" }}>
              <Col
                xs={12}
                md={3}
                style={{
                  paddingLeft: "0px",
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                <img src={table} style={{ height: "20px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                  }}
                >
                  תעודת זהות יחידה
                </h4>
              </Col>
            </Row>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/safetyOfficersQualification"
            style={{ margin: "0px" }}
            activeClassName="sidebar_active_link"
          >
            <Row style={{ direction: "rtl" }}>
              <Col
                xs={12}
                md={3}
                style={{
                  paddingLeft: "0px",
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                <img src={table} style={{ height: "20px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                  }}
                >
                  כשירות ממונים על הבטחיות
                </h4>
              </Col>
            </Row>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/certificationsManagements"
            style={{ margin: "0px" }}
            activeClassName="sidebar_active_link"
          >
            <Row style={{ direction: "rtl" }}>
              <Col
                xs={12}
                md={3}
                style={{
                  paddingLeft: "0px",
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                <img src={table} style={{ height: "20px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                  }}
                >
                  ניהול הסמכות
                </h4>
              </Col>
            </Row>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/occupationalSupervision"
            style={{ margin: "0px" }}
            activeClassName="sidebar_active_link"
          >
            <Row style={{ direction: "rtl" }}>
              <Col
                xs={12}
                md={3}
                style={{
                  paddingLeft: "0px",
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                <img src={table} style={{ height: "20px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                  }}
                >
                  פיקוח תעסוקתי
                </h4>
              </Col>
            </Row>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/trainingProgram"
            style={{ margin: "0px" }}
            activeClassName="sidebar_active_link"
          >
            <Row style={{ direction: "rtl" }}>
              <Col
                xs={12}
                md={3}
                style={{
                  paddingLeft: "0px",
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                <img src={table} style={{ height: "20px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                  }}
                >
                  תכנית הדרכות
                </h4>
              </Col>
            </Row>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/equipmentAndMaterialsPeriodicInspections"
            style={{ margin: "0px" }}
            activeClassName="sidebar_active_link"
          >
            <Row style={{ direction: "rtl" }}>
              <Col
                xs={12}
                md={3}
                style={{
                  paddingLeft: "0px",
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                <img src={table} style={{ height: "20px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                  }}
                >
                  בדיקות תקופתיות לציוד וחומרים
                </h4>
              </Col>
            </Row>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/environmentalMonitoring"
            style={{ margin: "0px" }}
            activeClassName="sidebar_active_link"
          >
            <Row style={{ direction: "rtl" }}>
              <Col
                xs={12}
                md={3}
                style={{
                  paddingLeft: "0px",
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                <img src={table} style={{ height: "20px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                  }}
                >
                  ניטורים סביבתיים
                </h4>
              </Col>
            </Row>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/machinesAndEquipmentPeriodicInspections"
            style={{ margin: "0px" }}
            activeClassName="sidebar_active_link"
          >
            <Row style={{ direction: "rtl" }}>
              <Col
                xs={12}
                md={3}
                style={{
                  paddingLeft: "0px",
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                <img src={table} style={{ height: "20px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                  }}
                >
                  בדיקות תקופתיות למכונות וציוד
                </h4>
              </Col>
            </Row>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/riskManagementMonitoring"
            style={{ margin: "0px" }}
            activeClassName="sidebar_active_link"
          >
            <Row style={{ direction: "rtl" }}>
              <Col
                xs={12}
                md={3}
                style={{
                  paddingLeft: "0px",
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                <img src={table} style={{ height: "20px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                  }}
                >
                  מעקב ניהול סיכונים
                </h4>
              </Col>
            </Row>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/monthlySafetyCommitteesMonitoring"
            style={{ margin: "0px" }}
            activeClassName="sidebar_active_link"
          >
            <Row style={{ direction: "rtl" }}>
              <Col
                xs={12}
                md={3}
                style={{
                  paddingLeft: "0px",
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                <img src={table} style={{ height: "20px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                  }}
                >
                  מעקב וועדות בטיחות חודשיות
                </h4>
              </Col>
            </Row>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/hazardsMonitoring"
            style={{ margin: "0px" }}
            activeClassName="sidebar_active_link"
          >
            <Row style={{ direction: "rtl" }}>
              <Col
                xs={12}
                md={3}
                style={{
                  paddingLeft: "0px",
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                <img src={table} style={{ height: "20px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                  }}
                >
                  מעקב סקר מפגעים
                </h4>
              </Col>
            </Row>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/homsManagementMonitoring"
            style={{ margin: "0px" }}
            activeClassName="sidebar_active_link"
          >
            <Row style={{ direction: "rtl" }}>
              <Col
                xs={12}
                md={3}
                style={{
                  paddingLeft: "0px",
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                <img src={table} style={{ height: "20px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                  }}
                >
                  מעקב ניהול חומ"ס
                </h4>
              </Col>
            </Row>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/personalProtectiveEquipmentMonitoring"
            style={{ margin: "0px" }}
            activeClassName="sidebar_active_link"
          >
            <Row style={{ direction: "rtl" }}>
              <Col
                xs={12}
                md={3}
                style={{
                  paddingLeft: "0px",
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                <img src={table} style={{ height: "20px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                  }}
                >
                  מעקב ציוד מגן אישי
                </h4>
              </Col>
            </Row>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/groundingTests"
            style={{ margin: "0px" }}
            activeClassName="sidebar_active_link"
          >
            <Row style={{ direction: "rtl" }}>
              <Col
                xs={12}
                md={3}
                style={{
                  paddingLeft: "0px",
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                <img src={table} style={{ height: "20px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                  }}
                >
                  בדיקת הארכות חשמל ומבנים
                </h4>
              </Col>
            </Row>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/reviewsDocumentation"
            style={{ margin: "0px" }}
            activeClassName="sidebar_active_link"
          >
            <Row style={{ direction: "rtl" }}>
              <Col
                xs={12}
                md={3}
                style={{
                  paddingLeft: "0px",
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                <img src={table} style={{ height: "20px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                  }}
                >
                  תיעוד ביקורות
                </h4>
              </Col>
            </Row>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/forum"
            style={{ margin: "0px" }}
            activeClassName="sidebar_active_link"
          >
            <Row style={{ direction: "rtl" }}>
              <Col
                xs={12}
                md={3}
                style={{
                  paddingLeft: "0px",
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                <img src={forum} style={{ height: "20px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                  }}
                >
                  פורום
                </h4>
              </Col>
            </Row>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/manageusers"
            style={{ margin: "0px" }}
            activeClassName="sidebar_active_link"
          >
            <Row style={{ direction: "rtl" }}>
              <Col
                xs={12}
                md={3}
                style={{
                  paddingLeft: "0px",
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                <img src={editusers} style={{ height: "20px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                  }}
                >
                  עריכת משתמשים
                </h4>
              </Col>
            </Row>
          </NavLink>
        </li>
      </Nav>
      <div
        style={{
          justifyContent: "center",
          textAlign: "center",
          bottom: 0,
          width: "100%",
        }}
      >
        <Button
          onClick={clickSubmit}
          className="btn-danger"
          style={{ width: "80%" }}
        >
          התנתק
        </Button>
      </div>
    </>
  );
}

export default SidebarAdmin;
