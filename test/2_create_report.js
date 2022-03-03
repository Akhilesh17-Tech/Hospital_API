const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

//Assertion style
const should = chai.should();
chai.use(chaiHttp);

const authorizationToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjFkNzEyYTI3ZTU3YTQyMmM4YjZhZGQiLCJwaG9uZSI6IjcwNjc3NzcyNTMiLCJuYW1lIjoiRGhlZXJhaiBLdXNod2FoIiwiaWF0IjoxNTk1ODQ0NTY1LCJleHAiOjE1OTU5NDQ1NjV9.csjLNgtxiumsixGUbgL1BSbVqlRPAmZ2yfthebe0L50";

describe("Hospital-API", () => {
  describe("/Post /patient/:id/create_report", () => {
    //for checking report creation by passing all the detail such as status, doctor name and date
    it("Check for report creation by passing report status, doctor name and date", (done) => {
      chai
        .request("http://localhost:3000/")
        .post("patients/5f1d71d227e57a422c8b6ade/create_report")
        .set({
          "content-type": "application/x-www-form-urlencoded",
          Authorization: authorizationToken,
        })
        .send({
          status: "symptoms-quarantine",
          date: "03-02-2022", //sending report body
          doctor_name: "Dr Bhargav",
        })
        .end((err, response) => {
          if (err) {
            console.log(err);
          }
          //checking for various property to validate response object
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.data.should.have.property("report_code");
          response.body.should.have.property("message");
          response.body.message.should.be.eql("Report created successfully");
          done();
        });
    });
    // for checking report creation by just passing only report's status
    it("Check for report creation by passing only report status", (done) => {
      chai
        .request("http://localhost:3000/")
        .post("patient/621fdc3c5174e491a10b36a4/create_report")
        .set({
          "content-type": "application/x-www-form-urlencoded",
          Authorization: authorizationToken,
        })
        .send({
          status: "Negative", //passing only status with report body
        })
        .end((err, response) => {
          if (err) {
            console.log(err);
          }
          //checking for various property to validate response object
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.data.should.have.property("report_code");
          response.body.should.have.property("message");
          response.body.message.should.be.eql("Report created successfully");
          done();
        });
    });
    //check case for passing invalid patient id in params
    it("Check for Invalid patient ID passed while creating report", (done) => {
      chai
        .request("http://localhost:3000/")
        .post("patient/1232232/create_report") //passing wrong patient ID
        .set({
          "content-type": "application/x-www-form-urlencoded",
          Authorization: authorizationToken,
        })
        .send({
          status: "Negative", //passing only status with report body
        })
        .end((err, response) => {
          if (err) {
            console.log(err);
          }
          //checking for various property to validate response object
          response.should.have.status(402);
          response.body.should.be.a("object");
          response.body.should.have.property("success").eql(false);
          response.body.should.have.property("message");
          response.body.message.should.be.eql("Invalid Patient ID");
          done();
        });
    });
    //check case for passing invalid status
    it("Check for Invalid Status...status values should be only Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit", (done) => {
      chai
        .request("http://localhost:3000/")
        .post("patient/621fdc3c5174e491a10b36a4/create_report") //passing correct patient ID
        .set({
          "content-type": "application/x-www-form-urlencoded",
          Authorization: authorizationToken,
        })
        .send({
          status: "Admitted", //passing invalid status
        })
        .end((err, response) => {
          if (err) {
            console.log(err);
          }
          //checking for various property to validate response object
          response.should.have.status(402);
          response.body.should.be.a("object");
          response.body.should.have.property("success").eql(false);
          response.body.should.have.property("message");
          response.body.message.should.be.eql(
            "Status value is incorrect...values can be only Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit"
          );
          done();
        });
    });
    //check case when report detail are not passed for report creation
    it("Check case when report detail are not passed to create report", (done) => {
      chai
        .request("http://localhost:3000/")
        .post("patient/621fdc3c5174e491a10b36a4/create_report") //passing correct patient ID
        .set({
          "content-type": "application/x-www-form-urlencoded",
          Authorization: authorizationToken,
        })
        .send({}) //not passing any report body
        .end((err, response) => {
          if (err) {
            console.log(err);
          }
          //checking for various property to validate response object
          response.should.have.status(500);
          response.body.should.be.a("object");
          response.body.should.have.property("success").eql(false);
          response.body.should.have.property("message");
          response.body.message.should.be.eql("Internal Server Error");
          done();
        });
    });
  });
});
