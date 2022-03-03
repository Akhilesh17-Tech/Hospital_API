const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

//Assertion style
const should = chai.should();
chai.use(chaiHttp);

const authorizationToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjIxMDA4MWEwZjMwNTUwYmVjZmIxYTEiLCJwaG9uZSI6IjkzNDA4Mzc4NzEiLCJuYW1lIjoiQWtoaWwga3VzaHdhaCIsImlhdCI6MTY0NjMzMDAwNSwiZXhwIjoxNjQ2NDMwMDA1fQ.zg6bxy6ZWIEd5ipSZ3MNnSFucVfy7wWc7WKdYumTey8";

describe("Hospital-API", () => {
  //check when patient is already registered
  describe("/Post /patient/register", () => {
    it("Check for Patient Already exist with these number", (done) => {
      chai
        .request("http://localhost:3000/")
        .post("patient/register")
        .set({
          "content-type": "application/x-www-form-urlencoded",
          Authorization: authorizationToken,
        })
        .send({
          name: "Akhil kushwah", //sending patient data which is already exist
          phone: "9340837871",
        })
        .end((err, response) => {
          if (err) {
            console.log(err);
          }
          //checking for various property to validate response object
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.data.should.have.property("patient");
          response.body.data.patient.should.have.property("_id");
          response.body.should.have.property("message");
          response.body.message.should.be.eql(
            "Patient already exist with this mobile number"
          );
          done();
        });
    });
    //check when new patient is registering
    it("Check New Patient Registration", (done) => {
      chai
        .request("http://localhost:3000/")
        .post("patient/register")
        .set({
          "content-type": "application/x-www-form-urlencoded",
          Authorization: authorizationToken,
        })
        .send({
          name: "Ritika",
          phone: Date.now(),
        })
        .end((err, response) => {
          if (err) {
            console.log(err);
          }

          //checking for various property to validate response object
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.data.should.have.property("patient");
          response.body.data.patient.should.have.property("_id");
          response.body.should.have.property("message");
          response.body.message.should.be.eql(
            "Patient registered Successfully"
          );
          done();
        });
    });
    //check less then required values are passed means phone number and name is not passed with body
    it("Check when phone number and name is not passed to register patient", (done) => {
      chai
        .request("http://localhost:3000/")
        .post("patient/register")
        .set({
          "content-type": "application/x-www-form-urlencoded",
          Authorization: authorizationToken,
        })
        .send({}) //blank form input is passed for patient registration
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
