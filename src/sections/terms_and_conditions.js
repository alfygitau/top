import React from "react";
import { FiCheckCircle, FiPhoneCall, FiEdit } from "react-icons/fi";
import { FaListUl } from "react-icons/fa";
import { ImFileText2, ImFilePdf } from "react-icons/im";
import { BiRevision } from "react-icons/bi";
import { GoMail } from "react-icons/go";
import { Panel, Grid, Row, Col, List, Button } from "rsuite";
import Calculator from "./calculator";
import router from "next/router";
import Link from "next/link";

const TermsAndConditions = () => {
  return (
    <div style={{ paddingTop: "80px" }}>
      <Grid>
        <Row>
          <Col xs={24} sm={16} md={16}>
            <Panel>
              <center>
                <h3>Terms of Service</h3>
              </center>
              <p style={{ fontSize: "15px", lineHeight: 2.5 }}>
                By placing an order with us, you agree that you have read and
                ready to abide by the following Terms and Conditions of this
                website - TopRatedProfessors.com In case you are not willing to
                abide by any of the listed terms and conditions, kindly do not
                consider using our services.
                <h5>Brief Definitions</h5>
                “Us”, “We”, “Our site,” “Company”, “This site”, “website” refers
                TopRatedProfessors.com. “You,” “customer,” “consumer,” “your”
                refers to anyone who willingly uses our services at any given
                time by either placing an order, bidding on an order, giving any
                information regarding an order or making payment for an order
                “Order” refers to the electronic instructions given by the
                customer regarding what they want to be done and when they want
                it done. This must be done online through our site. “Products”
                refers to the final original papers or essays written by our
                writers, strictly following the instructions given by the
                customers and delivered to the consumers on time.
                <h5>The services we deliver at TopRatedProfessors.com</h5>
                At TopRatedProfessors.com, we give an opportunity to our
                consumers to place orders, communicate to each other, work on
                orders, deliver the products and finally do payment transfer for
                the products already delivered to them.e Before a consumer can
                use any of our services, they must first create an account with
                us before proceeding. We always make the identity of our
                consumers anonymous at all times and as such, sharing any
                personal information that might uniquely identify you as a
                consumer is highly prohibited. TopRatedProfessors.com reserves
                the right to close any access to your account whenever there is
                enough reason to do so especially if you use abusive language to
                other consumers, share your personal information and contacts to
                other consumers, spam or break the Terms and Conditions of this
                website in any other way not stated above. We only offer
                services to our consumers for their own personal and
                non-commercial use. As such, we strictly prohibit any purchase
                of our products for commercial use. We own the authorship rights
                of all products delivered by our freelance consumers. We
                recommend that you check for quality of your product delivered
                to you by our freelance writers since payments are
                non-refundable after accepting the product. Our services are
                only meant to help you learn how to go about your tasks as a
                consumer and therefore should not be regarded as your own work
                at any given time. We do not condone academic cheating, and as
                such, you cannot submit our products for grading as it is not
                your original work. We do not give any warranty or guarantee to
                consumers concerning our products, and as such, it is your duty
                as the consumer to check for the quality of your work. Kindly
                make sure you take note of these Terms and Conditions before
                proceeding to place an order with us.
                <h5>Provision for Refund</h5>
                The customer should read through the product before releasing
                100% of the funds to the writer. By releasing 100% of the funds,
                the customer agrees that he/she had read through the entire
                product and is satisfied with it. As such, he/she agrees that he
                will not require any further revision on the same order. In case
                one might need a revision on such order, he/ she will have to
                place a new order and make payment for the same. Funds released
                after delivery of our products are not warranted or guaranteed
                in any way and are completely non-refundable. The customer
                should take the time to read through the product and decide
                whether he/ she needs any form of revision before releasing the
                funds to the writer as no refund can be made after that. After
                100% release of funds, there can be no further communication
                made to the writer concerning the order. In case the customer
                does not release 100% of the funds after downloading the final
                paper, the funds will be automatically released to the writer 72
                hours after the deadline and the order will be considered as
                complete, and therefore the writer will not take any further
                revisions on the same order. At our own discretion, we might
                decide to refund the customer especially when they have enough
                reason to claim a refund. We have a money back guarantee policy
                that you can read on our FAQ page.
                <h5>Copyright</h5>
                Our freelance writers write all products from scratch and
                therefore is 100% original. As such, TopRatedProfessors.com
                reserves all the copyright regarding the products. The consumers
                of our products are prohibited from using them for commercial
                use. The consumers are under no circumstance allowed to share,
                alter, transfer, publish, or distribute products from this
                company without any written and signed consent from our company.
                The consumer agrees always to defend and protect the copyright
                of the products from this company and will not hold the company
                responsible for any use without authority. Anyone found using
                the products from this company without written and signed
                consent will be sued or charged under civil or criminal penal
                code. As stated earlier, TopRatedProfessors.com does not condone
                academic cheating in any way. As such, all products and contents
                delivered to our customers are for their own personal use.
                Sharing of the products and contents from our site is highly
                prohibited. The writers and the customers are prohibited from
                disclosing the contents they deliver or receive to any other
                party. We regard all materials and contents shared between our
                customers and freelance writers as private and confidential, and
                we reserve the right to close the account of anyone found guilty
                of violating the privacy and confidentiality policy. Kindly read
                more about the privacy and confidentiality policy on its page.
                Our freelance writers SHOULD and MUST at all times respect the
                intellectual property rights of others. As such, they MUST write
                their papers from scratch and maintain 100% uniqueness at all
                times. If as a consumer you notice that the product delivered to
                you was plagiarized, kindly contact the customer support team
                immediately and they will take the necessary action against such
                a writer. Any attempt by our writers to submit a plagiarized
                paper will result in ruthless actions against them.
                TopRatedProfessors.com is committed to delivering 100% unique
                work to its customers, and as a freelance writer, you must be
                ready to do the same. The company has the exclusive right to
                heavily fine and cancel any contract with anyone who tried to
                deliver plagiarized work to our customers. Any consumer who
                tries to use the content delivered to them for any commercial
                use will also see their cooperation with our company
                automatically disqualified. We will not condone such behavior
                and therefore will not offer such customers our services. At
                TopRatedProfessors.com, we do not condone academic cheating and
                dishonesty in any way. As such, we do not allow our customers to
                include their names in our products and later submit it to their
                lecturers or any other interested parties for grading. Such
                action is academic cheating as the consumer will have
                plagiarized our work. Our products and contents can only be used
                as a guide to do your own research and not as your final work.
                <h5>Links on TopRatedProfessors.com</h5>
                This site might have links to other external websites. However,
                we would like to notify our customers and consumers that
                TopRatedProfessors.com does not control those sites and
                therefore does not have any control over its content. We cannot
                guarantee the consumers visiting those sites that they abide by
                our Terms and Conditions. Any consumer visiting those sites must
                do so at their own risk as it is required on your order form. We
                reserve the right to change the Terms and Conditions stated
                above at any given time if the need arises. As such, we
                recommend that you read the Terms and Conditions often as using
                our services binds you to them at all times. Try us today, and
                we promise quality work. Get the maximum value for your money
                with{" "}
                <Link href="/">
                  <a>TopRatedProfessors.com</a>
                </Link>
              </p>
            </Panel>
          </Col>
          <Col xs={24} sm={8} md={8}>
            <Calculator />
            <div style={{ marginTop: "40px" }}>
              <Panel shaded>
                <center>
                  <h3>GET THESE FOR FREE</h3>
                </center>
                <List>
                  <List.Item style={{ fontSize: "18px" }}>
                    <FiCheckCircle
                      style={{ fontSize: "25px", color: "#fdaa8f" }}
                    />{" "}
                    Free Turnitin Plagiarism report
                  </List.Item>
                  <List.Item style={{ fontSize: "18px" }}>
                    <FaListUl style={{ fontSize: "25px", color: "#fdaa8f" }} />{" "}
                    Free work in progress drafts
                  </List.Item>
                  <List.Item style={{ fontSize: "18px" }}>
                    <BiRevision
                      style={{ fontSize: "25px", color: "#fdaa8f" }}
                    />{" "}
                    Free revisions for all orders
                  </List.Item>
                  <List.Item style={{ fontSize: "18px" }}>
                    <GoMail style={{ fontSize: "25px", color: "#fdaa8f" }} />{" "}
                    Free text/email updates
                  </List.Item>
                  <List.Item style={{ fontSize: "18px" }}>
                    <FiPhoneCall
                      style={{ fontSize: "25px", color: "#fdaa8f" }}
                    />{" "}
                    Free 24/7 VIP customer support
                  </List.Item>
                  <List.Item style={{ fontSize: "18px" }}>
                    <ImFileText2
                      style={{ fontSize: "25px", color: "#fdaa8f" }}
                    />{" "}
                    Free 1 page summary.
                  </List.Item>
                  <List.Item style={{ fontSize: "18px" }}>
                    <ImFilePdf style={{ fontSize: "25px", color: "#fdaa8f" }} />{" "}
                    Free cover page
                  </List.Item>
                  <List.Item style={{ fontSize: "18px" }}>
                    <FiEdit style={{ fontSize: "25px", color: "#fdaa8f" }} />{" "}
                    Free formatting for your work
                  </List.Item>
                </List>
              </Panel>
            </div>
            <div style={{ paddingTop: "50px" }}>
              <Button
                onClick={() =>
                  router.push("/dashboard/create_order", scroll(0, 0))
                }
                style={{
                  color: "white",
                  width: "100%",
                  backgroundColor: "#17c671",
                }}
              >
                Order Now
              </Button>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default TermsAndConditions;
