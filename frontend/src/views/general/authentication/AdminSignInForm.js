import React, { useState, useEffect } from "react";

import { signin, authenticate, isAuthenticated } from "auth/index";

import { Link, withRouter, Redirect } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  Container,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import history from "history.js";
import { toast } from "react-toastify";
import logo from "assets/img/wideLogo.png";

function Signin() {
  const [values, setValues] = useState({
    personalnumber: "",
    password: "",
    errortype: "",
    error: false,
    successmsg: false,
    loading: false,
    redirectToReferrer: false,
  });
  const { personalnumber, password, error, loading, redirectToReferrer } =
    values;
  const { user } = isAuthenticated();
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const clickSubmit = (event) => {
    //event.preventDefault()
    setValues({ ...values, loading: true, successmsg: false, error: false });
    axios
      .post(`http://localhost:8000/api/signin`, { personalnumber, password })
      .then((res) => {
        authenticate(res.data);
        setValues({
          ...values,
          loading: false,
          error: false,
          redirectToReferrer: true,
        });
      })
      .catch((error) => {
        setValues({
          ...values,
          errortype: error.error,
          loading: false,
          error: true,
        });
      });
  };

  const passport = event => {
    axios.get(`http://localhost:8000/auth/passportauth`)
      .then(response => {
        console.log(response.data);
        setValues({ ...values, personalnumber:response.data.stam._json.cn, password: response.data.stam._json.cn})
      })
      .catch(error => {
        console.log(error);
      })
  }

  const redirectUser = () => {
    if (redirectToReferrer) {
      console.log(user);
      if (user && user.validated == true) {
        if (user.role === "0") {
          history.push(`/adminDashboard`);
        }
        if (user.role === "1") {
          history.push(`/globalDashboard/${user.gdod}`);
        }
        if (user.role === "2") {
          history.push(`/globalDashboard/${user.hativa}`);
        }
        if (user.role === "3") {
          history.push(`/globalDashboard/${user.ogda}`);
        }
        if (user.role === "4") {
          history.push(`/globalDashboard/${user.pikod}`);
        }
      } else {
        toast.success("משתמש לא מאושר מערכת");
        setValues({ ...values, redirectToReferrer: false });
      }
    }
  };

  const showSuccess = () => (
    <div
      className="alert alert-info "
      style={{ textAlign: "right", display: values.successmsg ? "" : "none" }}
    >
      <h2>התחבר בהצלחה</h2>
    </div>
  );
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ textAlign: "right", display: values.error ? "" : "none" }}
    >
      <h2>שגיאה בשליחת הטופס</h2>
      <h2>{values.errortype}</h2>
    </div>
  );

  useEffect(() => {
    // clickSubmit();
    passport();
  }, [])

  useEffect(() => {
    setValues({ ...values, password: values.personalnumber });
  }, [values.personalnumber]);

  const signInForm = () => (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <img src={logo}></img>
                </div>
                <div className="text-center text-muted mb-4">
                  <small>התחברות</small>
                </div>
                <Form role="form">
                  <FormGroup className="mb-3">
                    <Input
                      onChange={handleChange("personalnumber")}
                      placeholder="מספר אישי"
                      type="string"
                      value={personalnumber}
                    />
                  </FormGroup>
                  {/* <FormGroup>
                    <Input onChange={handleChange('password')} placeholder="סיסמא" type="password" value={password} />
                  </FormGroup>*/}
                  {loading ? (
                    <></>
                  ) : (
                    <Row>
                      <Col>
                        <div className="text-center">
                          <button
                            onClick={clickSubmit}
                            className="btn btn-edit"
                          >
                            התחבר
                          </button>
                        </div>
                      </Col>
                      <Col>
                        <div className="text-center">
                          <button
                            onClick={() => {
                              history.push(`/signup`);
                            }}
                            className="btn btn-edit"
                          >
                            הרשם
                          </button>
                        </div>
                      </Col>
                    </Row>
                  )}
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );

  return (
    <div>
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col>
            {showSuccess()}
            {/* {showError()} */}
            {signInForm()}
            {redirectUser()}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default withRouter(Signin);
