import React from "react";

const Home = () => {
  return (
    <div>
      <Grid fluid>
        <Row gutter={8} className="show-grid">
          <Col xs={24} sm={12} md={6}>
            <Panel shaded>
              <Row className="show-grid">
                <Col xs={24} sm={12} md={12}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      height: 50,
                      width: 50,
                      background: "#f44336",
                      borderRadius: 50,
                    }}
                  >
                    <PeoplesIcon
                      color="white"
                      style={{ fontSize: "2em", marginTop: "10px" }}
                    />
                  </div>
                </Col>
                <Col xs={24} sm={12} md={12}>
                  <center>
                    <h5>
                      <CountUp start={10} duration={4} end={230} />
                      <br /> Users
                    </h5>
                  </center>
                </Col>
                <Image src={Users} alt="" />
              </Row>
            </Panel>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Panel shaded>
              <Row className="show-grid">
                <Col xs={24} sm={12} md={12}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      height: 50,
                      width: 50,
                      background: "#f44336",
                      borderRadius: 50,
                    }}
                  >
                    <PeopleBranchIcon
                      color="white"
                      style={{ fontSize: "2em", marginTop: "10px" }}
                    />
                  </div>
                </Col>
                <Col xs={24} sm={12} md={12}>
                  <center>
                    <h5>
                      <CountUp start={10} duration={5} end={730} />
                      <br /> Servicemen
                    </h5>
                  </center>
                </Col>
                <Image src={Servicemen} alt="" />
              </Row>
            </Panel>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Panel shaded>
              <Row className="show-grid">
                <Col xs={24} sm={12} md={12}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      height: 50,
                      width: 50,
                      background: "#f44336",
                      borderRadius: 50,
                    }}
                  >
                    <ProjectIcon
                      color="white"
                      style={{ fontSize: "2em", marginTop: "10px" }}
                    />
                  </div>
                </Col>
                <Col xs={24} sm={12} md={12}>
                  <center>
                    <h5>
                      <CountUp start={10} duration={3} end={476} />
                      <br /> Jobs
                    </h5>
                  </center>
                </Col>
                <Image src={Jobs} alt="" />
              </Row>
            </Panel>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Panel shaded>
              <Row className="show-grid">
                <Col xs={24} sm={12} md={12}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      height: 50,
                      width: 50,
                      background: "#f44336",
                      borderRadius: 50,
                    }}
                  >
                    <TaskIcon
                      color="white"
                      style={{ fontSize: "2em", marginTop: "10px" }}
                    />
                  </div>
                </Col>
                <Col xs={24} sm={12} md={12}>
                  <center>
                    <h5>
                      <CountUp start={10} duration={6} end={112} />
                      <br /> Skills
                    </h5>
                  </center>
                </Col>
                <Image src={Skills} alt="" />
              </Row>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Home;
