import React from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import Header from "../layout/Header";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const Login: React.FC = () => {
  const { theme } = useTheme();
  useDocumentTitle("Login");

  return (
    <React.Fragment>
      <Header home={true} />
      <div className={`${theme}-mode`}>
        <Container>
          <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
              <Card className="shadow" style={{ border: "none" }}>
                <Card.Body>
                  <div className="mb-3 mt-md-4">
                    <h2 className="fw-bold mb-5 text-uppercase" style={{ textAlign: "center" }}>
                      {process.env.REACT_APP_NAME?.split("-").join("")}
                    </h2>
                    <div className="mb-3">
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center">Email address</Form.Label>
                          <Form.Control type="email" autoComplete="off" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" autoComplete="off" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                          <p className="small">
                            <a className="text-primary" href="#!">
                              Forgot password?
                            </a>
                          </p>
                        </Form.Group>
                        <div className="d-grid">
                          <Button variant="primary" type="submit">
                            Login
                          </Button>
                        </div>
                      </Form>
                      <div className="mt-3">
                        <p className="mb-0  text-center">
                          Don&apos;t have an account?{" "}
                          <Link to="/sign up" className="text-primary fw-bold">
                            Sign Up
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
export default Login;
