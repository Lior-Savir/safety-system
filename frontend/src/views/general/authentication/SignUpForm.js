import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
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
import ToggleButton from "react-toggle-button";
import history from "history.js";
import { toast } from "react-toastify";
import logo from "assets/img/wideLogo.png";

export default function SignUpForm() {
  const [data, setData] = useState({
    name: "",
    lastname: "",
    personalnumber: "",
    password: "",
    role: "",
    unitid: "",
    error: false,
    successmsg: false,
    loading: false,
    redirectToReferrer: false,
  });

  // const [units, setUnits] = useState([]);
  const [gdods, setGdods] = useState([]);
  const [hativas, setHativas] = useState([]);
  const [ogdas, setOgdas] = useState([]);
  const [pikods, setPikods] = useState([]);

  // const loadUnits = () => {
  //   axios
  //     .get("http://localhost:8000/api/unit")
  //     .then((response) => {
  //       setUnits(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

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
  const loadHativas = () => {
    axios
      .get("http://localhost:8000/api/hativa")
      .then((response) => {
        setHativas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loadOgdas = () => {
    axios
      .get("http://localhost:8000/api/ogda")
      .then((response) => {
        setOgdas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loadPikods = () => {
    axios
      .get("http://localhost:8000/api/pikod")
      .then((response) => {
        setPikods(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setData({ ...data, [evt.target.name]: value });
  }

  const clickSubmit = (event) => {
    CheckSignUpForm(event);
  };

  const CheckSignUpForm = (event) => {
    event.preventDefault();
    var flag = true;
    var ErrorReason = "";
    if (data.name == "") {
      flag = false;
      ErrorReason += "???? ?????? \n";
    }
    if (data.lastname == "") {
      flag = false;
      ErrorReason += "???? ?????????? ?????? \n";
    }
    if (data.personalnumber == "") {
      flag = false;
      ErrorReason += "???? ???????? ?????? \n";
    }
    if (data.password == "") {
      flag = false;
      ErrorReason += "?????????? ???????? \n";
    }
    if (data.role == "") {
      flag = false;
      ErrorReason += "?????????? ???????? \n";
    }
    //  else {
    //   if (data.role === "0") {
    //   }
    //   if (data.role === "1") {
    //     if (data.unitid === "") {
    //       flag = false;
    //       ErrorReason += "?????????? ???????? \n";
    //     }
    //   }
    // }

    if (flag == true) {
      FixUser(event);
    } else {
      toast.error(ErrorReason);
    }
  };

  const FixUser = (event) => {
    event.preventDefault();
    if (data.role === "0") {
      delete data.unitid;
    }
    if (data.role === "1") {
    }
    if (data.role === "2") {
      delete data.unitid;
    }
    if (data.role === "3") {
      delete data.unitid;
    }
    if (data.role === "4") {
      delete data.unitid;
    }
    SignUp(event);
  };

  const SignUp = (event) => {
    event.preventDefault();
    setData({ ...data, loading: true, successmsg: false, error: false });
    const user = {
      name: data.name,
      lastname: data.lastname,
      password: data.password,
      personalnumber: data.personalnumber,
      // unitid: data.unitid,
      role: data.role,
      gdod: data.gdod,
      hativa: data.hativa,
      ogda: data.ogda,
      pikod: data.pikod,
    };
    axios
      .post(`http://localhost:8000/api/signup`, user)
      .then((res) => {
        setData({ ...data, loading: false, error: false, successmsg: true });
        toast.success(`?????????? ???????? ???????????? - ?????? ???????? ???????????? ???????? ??????????`);
        history.push(`/signin`);
        console.log(res.data);
      })
      .catch((error) => {
        setData({
          ...data,
          errortype: error.response.data.error,
          loading: false,
          error: true,
        });
      });
  };

  const redirectUser = () => {
    if (data.redirectToReferrer) {
      return <Redirect to="/signin" />;
    }
  };

  const showSuccess = () => (
    <div
      className="alert alert-info "
      style={{ textAlign: "right", display: data.successmsg ? "" : "none" }}
    >
      <h2>?????????? ?????????? ?????????? ????????????</h2>
      <Link to="/signin">????????????????</Link>
    </div>
  );
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ textAlign: "right", display: data.error ? "" : "none" }}
    >
      <h2>?????????? ???????????? ??????????</h2>
    </div>
  );
  const showLoading = () => (
    <div
      className="alert alert-success"
      style={{ textAlign: "right", display: data.loading ? "" : "none" }}
    >
      <h2>{"????????????"}</h2>
    </div>
  );

  useEffect(() => {
    // loadUnits();
    loadGdods();
    loadHativas();
    loadOgdas();
    loadPikods();
  }, []);

  useEffect(() => {
    setData({ ...data, password: data.personalnumber });
  }, [data.personalnumber]);

  const signUpForm = () => (
    <>
      <Container className="">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <img src={logo}></img>
                </div>
                <div className="text-center text-muted mb-4">
                  <small>??????????</small>
                </div>
                <Form role="form">
                  <FormGroup dir="rtl">
                    <Input
                      placeholder="???? ????????"
                      name="name"
                      type="string"
                      value={data.name}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup dir="rtl">
                    <Input
                      placeholder="???? ??????????"
                      name="lastname"
                      type="string"
                      value={data.lastname}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup className="mb-3" dir="rtl">
                    <Input
                      placeholder="???????? ????????"
                      name="personalnumber"
                      type="string"
                      value={data.personalnumber}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  {/* 
                  <FormGroup className="mb-3" dir="rtl">
                    <Input
                      placeholder="????????"
                      name="gdod"
                      type="select"
                      value={data.gdod}
                      onChange={handleChange}
                    >
                    <option value={""}>????????</option>
                            {gdods.map((gdod, index) => (
                              <option value={gdod._id}>{gdod.name}</option>
                            ))}
                    </Input> 
                  </FormGroup>
                  <FormGroup className="mb-3" dir="rtl">
                    <Input
                      placeholder="????????"
                      name="gdod"
                      type="select"
                      value={data.gdod}
                      onChange={handleChange}
                    >
                    <option value={""}>????????</option>
                            {gdods.map((gdod, index) => (
                              <option value={gdod._id}>{gdod.name}</option>
                            ))}
                    </Input> 
                  </FormGroup>

                  <FormGroup className="mb-3" dir="rtl">
                    <Input
                      placeholder="????????"
                      name="gdod"
                      type="select"
                      value={data.gdod}
                      onChange={handleChange}
                    >
                    <option value={""}>????????</option>
                            {gdods.map((gdod, index) => (
                              <option value={gdod._id}>{gdod.name}</option>
                            ))}
                    </Input> 
                  </FormGroup>

                  <FormGroup className="mb-3" dir="rtl">
                    <Input
                      placeholder="??????????"
                      name="gdod"
                      type="select"
                      value={data.gdod}
                      onChange={handleChange}
                    >
                    <option value={""}>????????</option>
                            {gdods.map((gdod, index) => (
                              <option value={gdod._id}>{gdod.name}</option>
                            ))}
                    </Input> 
                  </FormGroup> */}

                  <FormGroup dir="rtl">
                    <Input
                      type="select"
                      name="role"
                      value={data.role}
                      onChange={handleChange}
                    >
                      <option value="">??????????</option>
                      <option value="0">???????? ??????????</option>
                      <option value="1">?????????? ????????</option>
                      <option value="2">?????????? ??????????</option>
                      <option value="3">?????????? ??????????</option>
                      <option value="4">?????????? ??????????</option>
                    </Input>
                    .
                  </FormGroup>

                  {data.role === "0" ? (
                    <div>???????? ??????????</div>
                  ) : data.role === "1" ? (
                    <>
                      <div style={{ textAlign: "right", paddingTop: "10px" }}>
                        ????????
                      </div>
                      <FormGroup className="mb-3" dir="rtl">
                        <Input
                          placeholder="????????"
                          name="gdod"
                          type="select"
                          value={data.gdod}
                          onChange={handleChange}
                        >
                          <option value={""}>????????</option>
                          {gdods.map((gdod, index) => (
                            <option value={gdod._id}>{gdod.name}</option>
                          ))}
                        </Input>
                      </FormGroup>
                    </>
                  ) : data.role === "2" ? (
                    <>
                      <div style={{ textAlign: "right", paddingTop: "10px" }}>
                        ??????????
                      </div>
                      <FormGroup className="mb-3" dir="rtl">
                        <Input
                          placeholder="??????????"
                          name="hativa"
                          type="select"
                          value={data.hativa}
                          onChange={handleChange}
                        >
                          <option value={""}>??????????</option>
                          {hativas.map((hativa, index) => (
                            <option value={hativa._id}>{hativa.name}</option>
                          ))}
                        </Input>
                      </FormGroup>
                    </>
                  ) : data.role === "3" ? (
                    <>
                      <div style={{ textAlign: "right", paddingTop: "10px" }}>
                        ??????????
                      </div>
                      <FormGroup className="mb-3" dir="rtl">
                        <Input
                          placeholder="??????????"
                          name="ogda"
                          type="select"
                          value={data.ogda}
                          onChange={handleChange}
                        >
                          <option value={""}>??????????</option>
                          {ogdas.map((ogda, index) => (
                            <option value={ogda._id}>{ogda.name}</option>
                          ))}
                        </Input>
                      </FormGroup>
                    </>
                  ) : data.role === "4" ? (
                    <>
                      <div style={{ textAlign: "right", paddingTop: "10px" }}>
                        ??????????
                      </div>
                      <FormGroup className="mb-3" dir="rtl">
                        <Input
                          placeholder="??????????"
                          name="pikod"
                          type="select"
                          value={data.pikod}
                          onChange={handleChange}
                        >
                          <option value={""}>??????????</option>
                          {pikods.map((pikod, index) => (
                            <option value={pikod._id}>{pikod.name}</option>
                          ))}
                        </Input>
                      </FormGroup>
                    </>
                  ) : null}
                  <div className="text-center">
                    <button onClick={clickSubmit} className="btn btn-edit">
                      ????????
                    </button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );

  return (
    <>
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col>
            {showLoading()}
            {showSuccess()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
          </Col>
        </Row>
      </Container>
    </>
  );
}
