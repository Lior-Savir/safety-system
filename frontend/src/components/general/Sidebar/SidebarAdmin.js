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
import teamLogo from "assets/img/team100.png"
import dropdown from "assets/img/dropdown.png"

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

       const [collapsed1, setCollapsed1] = useState(true);
  const [collapsed2, setCollapsed2] = useState(true);
  const [collapsed3, setCollapsed3] = useState(true);
  const [collapsed4, setCollapsed4] = useState(true);
  const [collapsed5, setCollapsed5] = useState(true);

     const toggleNavbar1 = () => setCollapsed1(!collapsed1);
  const toggleNavbar2 = () => setCollapsed2(!collapsed2);
  const toggleNavbar3 = () => setCollapsed3(!collapsed3);
  const toggleNavbar4 = () => setCollapsed4(!collapsed4);
  const toggleNavbar5 = () => setCollapsed5(!collapsed5);

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
                  ???? ????????
                </h4>
              </Col>
            </Row>
          </NavLink>
        </li>
        
    
 


      {/* <li> */}
        <Navbar
            style={{
              display: "block",
              cursor: "pointer",
              textAlign: "right",
              paddingRight: "22px"
              // marginRight: "-10px",
              // paddingRight: "8px",
            }}
            onClick={toggleNavbar1}
          >
            <Row style={{ direction: "rtl", textAlign: "right", paddingRight: "0px" }}>
              <Col xs={12} md={3}>
              <img src={dropdown} style={{ height: "20px", paddingRight: "0px", margin: "0px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{
                margin: "0px",
                // paddingTop: "6px",
                // paddingBottom: "6px",
                textAlign: 'right',
                paddingRight: "0px"
                }}>
                <h4>
                  ???????????? ????????????
                </h4>
              </Col>
            </Row>
            <Collapse isOpen={!collapsed1} navbar>
            <NavLink
            to="/riskManagementMonitoring"
            style={{ margin: "0px", textAlign: "right"}}
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
                {/* <img src={table} style={{ height: "20px" }}></img> */}
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4 style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                    textAlign: 'right'}}>?????????? ??????????????</h4>
              </Col>
            </Row>
              </NavLink>

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
                {/* <img src={table} style={{ height: "20px" }}></img> */}
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                    textAlign: 'right'
                  }}
                >
                  ?????????? ????????????
                </h4>
              </Col>
            </Row>
          </NavLink>
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
                {/* <img src={table} style={{ height: "20px" }}></img> */}
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                    textAlign: 'right'
                  }}
                >?????? ????????????</h4>
              </Col>
            </Row>
          </NavLink>
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
                {/* <img src={table} style={{ height: "20px" }}></img> */}
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                    textAlign: 'right'
                  }}
                >
                 ?????????? ??????"??
                </h4>
              </Col>
            </Row>
          </NavLink>
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
                {/* <img src={table} style={{ height: "20px" }}></img> */}
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                    textAlign: 'right'
                  }}
                >
                  ?????????? ??????????????
                </h4>
              </Col>
            </Row>
          </NavLink>
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
                {/* <img src={table} style={{ height: "20px" }}></img> */}
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    // paddingTop: "6px",
                    // paddingBottom: "6px",
                    textAlign: 'right'
                  }}
                >
                 ???????????? ???????????? ??????????????
                </h4>
              </Col>
            </Row>
          </NavLink>
            </Collapse>
          </Navbar>
          {/* </li> */}

          <Navbar
            style={{
              display: "block",
              cursor: "pointer",
              paddingRight: "22px"
              // marginRight: "-10px",
              // paddingRight: "8px",
            }}
            onClick={toggleNavbar2}
          >
            <Row style={{ direction: "rtl" }}>
              <Col xs={12} md={3}>
              <img src={dropdown} style={{ height: "20px", textAlign: "right", paddingRight: "0px", margin: "0px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{
                margin: "0px",
                // paddingTop: "6px",
                paddingBottom: "6px",
                textAlign: 'right',
                paddingRight: "0px"
                }}>
                <h4>
                  ???????????? ?????????????? ??"??
                </h4>
              </Col>
            </Row>
            <Collapse isOpen={!collapsed2} navbar>
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
                {/* <img src={table} style={{ height: "20px" }}></img> */}
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                    textAlign: 'right'
                  }}
                >
                  ???????????? ???????????? ???? ??????????????
                </h4>
              </Col>
            </Row>
          </NavLink>
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
                {/* <img src={table} style={{ height: "20px" }}></img> */}
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                    textAlign: 'right'
                  }}
                >
                  ?????????? ????????????
                </h4>
              </Col>
            </Row>
          </NavLink>
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
                {/* <img src={table} style={{ height: "20px" }}></img> */}
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                    textAlign: 'right'
                  }}
                >
                  ?????????? ??????????????
                </h4>
              </Col>
            </Row>
          </NavLink>
            </Collapse>
          </Navbar>
          <li>
          <Navbar
            style={{
              display: "block",
              cursor: "pointer",
              paddingRight: "22px"
              // marginRight: "-10px",
              // paddingRight: "8px",
            }}
            onClick={toggleNavbar3}
          >
            <Row style={{ direction: "rtl" }}>
              <Col xs={12} md={3}>
              <img src={dropdown} style={{ height: "20px", paddingRight: "0px", margin: "0px" }}></img>
              </Col>
              <Col xs={12} md={9} style={{
                margin: "0px",
                paddingRight: "0px",
                // paddingTop: "6px",
                paddingBottom: "6px",
                textAlign: 'right'
                }}>
                <h4>
                  ???????????? ????????????????
                </h4>
              </Col>
            </Row>
            <Collapse isOpen={!collapsed3} navbar>
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
                {/* <img src={table} style={{ height: "20px" }}></img> */}
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                    textAlign: 'right'
                  }}
                >
                  ?????????????? ????????????????
                </h4>
              </Col>
            </Row>
          </NavLink>
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
                {/* <img src={table} style={{ height: "20px" }}></img> */}
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                    textAlign: 'right'
                  }}
                >
                  ???????????? ???????????????? ?????????? ??????????????
                </h4>
              </Col>
            </Row>
          </NavLink>
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
                {/* <img src={table} style={{ height: "20px" }}></img> */}
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                    textAlign: 'right'
                  }}
                >
                  ???????????? ???????????????? ?????????????? ??????????
                </h4>
              </Col>
            </Row>
          </NavLink>
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
                {/* <img src={table} style={{ height: "20px" }}></img> */}
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                    textAlign: 'right'
                  }}
                >
                  ?????????? ???????????? ???????? ????????????
                </h4>
              </Col>
            </Row>
          </NavLink>
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
                {/* <img src={table} style={{ height: "20px" }}></img> */}
              </Col>
              <Col xs={12} md={9} style={{ paddingRight: "0px" }}>
                <h4
                  style={{
                    margin: "0px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                    textAlign: 'right'
                  }}
                >
                  ???????? ?????? ????????
                </h4>
              </Col>
            </Row>
          </NavLink>
            </Collapse>
          </Navbar>
</li>
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
                  ?????????? ???????? ??????????
                </h4>
              </Col>
            </Row>
          </NavLink>
{/* 
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
                  ??????????
                </h4>
              </Col>
            </Row>
          </NavLink>
        </li> */}
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
                  ?????????? ??????????????
                </h4>
              </Col>
            </Row>
          </NavLink>
        </li>

        </Nav>

          {/* <li>
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
                  ???????? ?????????? ??????????????
                </h4>
              </Col>
            </Row>
          </NavLink>
        </li> */}
      {/* <div
        style={{
          justifyContent: "center",
          textAlign: "center",
          bottom: 0,
          width: "100%",
        }}
      >
        <img src={teamLogo} style={{ width: "50%", marginTop: "5rem" }}></img>
        <Button
          onClick={clickSubmit}
          className="btn-defailt"
          style={{ width: "80%", bottom: "0"}}
        >
          ??????????
        </Button>
      </div> */}
    </>
  );
}

export default SidebarAdmin;
