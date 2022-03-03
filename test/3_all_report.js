const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

//Assertion style
const should = chai.should();
chai.use(chaiHttp);

describe("Hospital-API", () => {
  describe("/GET /patient/:id/all_reports", () => {
    //Getting all the report with patient ID
    it("Check for getting all the reports with patient ID", (done) => {
      chai
        .request("http://localhost:3000/")
        .get("patient/621fdc3c5174e491a10b36a4/all_reports")
        .end((err, response) => {
          if (err) {
            console.log(err);
          }
          //checking for various property to validate response object
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.data.should.have.property("patient");
          response.body.data.should.have.property("reports");
          response.body.should.have.property("message");
          response.body.message.should.be.eql("All reports Received");
          done();
        });
    });
    //check case when invalid patient ID is passed for getting report
    it("Check for Invalid patient ID passed for getting all reports", (done) => {
      chai
        .request("http://localhost:3000/")
        .get("patients/1232232/all_reports") //passing wrong patient ID
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
  });
});
