import React, { useEffect } from "react";
import { Carousel, Grid, Row, Col, Panel, Rate, Avatar } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { filterRatings } from "../dataStore/actions/reviewAction";
import { formatDate, formatTime } from "../utils/dates";

const Reviews = () => {
  const reviewSelector = useSelector((state) => state.ratingState);
  const { ratings } = reviewSelector;
  const dispatch = useDispatch();
  console.log(ratings);

  useEffect(() => {
    filterRatings(dispatch);
  }, [dispatch]);
  return (
    <div style={{ paddingTop: "20px" }}>
      <center>
        <h3 style={{ color: "#fdaa8f" }}>Customer Reviews</h3>
        <p style={{ fontSize: "20px" }}>
          Avg rating for all reviews: <b>5.0/5.0</b>
        </p>
      </center>
      <Grid fluid>
        <Carousel
          autoplay
          className="custom-slider"
          style={{
            marginLeft: "-5px",
            marginRight: "-5px",
            minHeight: "250px",
          }}
        >
          <Row>
            {ratings.ratings &&
              ratings.ratings.slice(0, 1).map((rating) => (
                <div
                  key={rating.id}
                  style={{ marginLeft: "20px", marginTop: "50px" }}
                >
                  <Col xs={24}>
                    <center>
                      <Panel
                        style={{ background: "whitesmoke", margin: "20px" }}
                      >
                        <h4>Order#: {rating.order_number}</h4>
                        <br />
                        <span style={{ fontSize: "20px" }}>
                          Customer Feedback:{" "}
                          <Rate readOnly value={rating.value} />
                        </span>
                        {"     "}
                        <div style={{ padding: "20px" }}>
                          <p style={{ fontSize: "20px" }}>
                            {rating.description}
                          </p>
                          <p
                            style={{
                              color: "#17c671",
                              fontWeight: 700,
                              fontSize: "18px",
                            }}
                          >
                            Completed: {formatTime(rating.created_at)}
                          </p>
                        </div>
                      </Panel>
                    </center>
                  </Col>
                </div>
              ))}
          </Row>
          <Row>
            {ratings.ratings &&
              ratings.ratings.slice(1, 2).map((rating) => (
                <div
                  key={rating.id}
                  style={{ marginLeft: "20px", marginTop: "50px" }}
                >
                  <Col xs={24}>
                    <center>
                      <Panel
                        style={{ background: "whitesmoke", margin: "20px" }}
                      >
                        <h4>Order#: {rating.order_number}</h4>
                        <br />
                        <span style={{ fontSize: "20px" }}>
                          Customer Feedback:{" "}
                          <Rate readOnly value={rating.value} />
                        </span>
                        {"     "}
                        <div style={{ padding: "20px" }}>
                          <p style={{ fontSize: "20px" }}>
                            {rating.description}
                          </p>
                          <p
                            style={{
                              color: "#17c671",
                              fontWeight: 700,
                              fontSize: "18px",
                            }}
                          >
                            Completed: {formatTime(rating.created_at)}
                          </p>
                        </div>
                      </Panel>
                    </center>
                  </Col>
                </div>
              ))}
          </Row>
          <Row>
            {ratings.ratings &&
              ratings.ratings.slice(3, 4).map((rating) => (
                <div
                  key={rating.id}
                  style={{ marginLeft: "40px", marginTop: "50px" }}
                >
                  <Col xs={24}>
                    <center>
                      <Panel
                        style={{ background: "whitesmoke", margin: "20px" }}
                      >
                        <h4>Order#: {rating.order_number}</h4>
                        <br />
                        <span style={{ fontSize: "20px" }}>
                          Customer Feedback:{" "}
                          <Rate readOnly value={rating.value} />
                        </span>
                        {"     "}
                        <div style={{ padding: "20px" }}>
                          <p style={{ fontSize: "20px" }}>
                            {rating.description}
                          </p>
                          <p
                            style={{
                              color: "#17c671",
                              fontWeight: 700,
                              fontSize: "18px",
                            }}
                          >
                            Completed: {formatTime(rating.created_at)}
                          </p>
                        </div>
                      </Panel>
                    </center>
                  </Col>
                </div>
              ))}
          </Row>
          <Row>
            {ratings.ratings &&
              ratings.ratings.slice(4, 5).map((rating) => (
                <div
                  key={rating.id}
                  style={{ marginLeft: "50px", marginTop: "50px" }}
                >
                  <Col xs={24}>
                    <center>
                      <Panel
                        style={{ background: "whitesmoke", margin: "20px" }}
                      >
                        <h4>Order#: {rating.order_number}</h4>
                        <br />
                        <span style={{ fontSize: "20px" }}>
                          Customer Feedback:{" "}
                          <Rate readOnly value={rating.value} />
                        </span>
                        {"     "}
                        <div style={{ padding: "20px" }}>
                          <p style={{ fontSize: "20px" }}>
                            {rating.description}
                          </p>
                          <p
                            style={{
                              color: "#17c671",
                              fontWeight: 700,
                              fontSize: "18px",
                            }}
                          >
                            Completed: {formatTime(rating.created_at)}
                          </p>
                        </div>
                      </Panel>
                    </center>
                  </Col>
                </div>
              ))}
          </Row>
          <Row>
            {ratings.ratings &&
              ratings.ratings.slice(5, 6).map((rating) => (
                <div
                  key={rating.id}
                  style={{ marginLeft: "60px", marginTop: "50px" }}
                >
                  <Col xs={24}>
                    <center>
                      <Panel
                        style={{ background: "whitesmoke", margin: "20px" }}
                      >
                        <h4>Order#: {rating.order_number}</h4>
                        <br />
                        <span style={{ fontSize: "20px" }}>
                          Customer Feedback:{" "}
                          <Rate readOnly value={rating.value} />
                        </span>
                        {"     "}
                        <div style={{ padding: "20px" }}>
                          <p style={{ fontSize: "20px" }}>
                            {rating.description}
                          </p>
                          <p
                            style={{
                              color: "#17c671",
                              fontWeight: 700,
                              fontSize: "18px",
                            }}
                          >
                            Completed: {formatTime(rating.created_at)}
                          </p>
                        </div>
                      </Panel>
                    </center>
                  </Col>
                </div>
              ))}
          </Row>
        </Carousel>
      </Grid>
    </div>
  );
};

export default Reviews;
