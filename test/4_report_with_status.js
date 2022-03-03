const chai = require("chai");
const chaiHttp = require("chai-http");

//Assertion style
const should = chai.should();
chai.use(chaiHttp);

describe("Hospital-API", () => {
  describe("/GET /report/:status", () => {
    //Getting all the report with particular status
    it("Check for getting all the reports with particular status", (done) => {
      let status = "symptoms-quarantine"; //its not case sensitive
      chai
        .request("http://localhost:3000/")
        .get(`report/${status}`)
        .end((err, response) => {
          if (err) {
            console.log(err);
          }
          //checking for various property to validate response object
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("success").eql(true);
          response.body.data.should.have.property("reports");
          response.body.should.have.property("message");
          response.body.message.should.be.eql(
            `Report received with status ${status}`
          );
          done();
        });
    });
    //checking getting all report by passing invalid status
    it("Check for getting all the reports by passing Invalid Status", (done) => {
      status = "Admitted";
      chai
        .request("http://localhost:3000/")
        .get(`report/${status}`)
        .end((err, response) => {
          if (err) {
            console.log(err);
          }
          //checking for various property to validate response object
          response.should.have.status(402);
          response.body.should.have.property("success").eql(false);
          response.body.should.be.a("object");
          response.body.should.have.property("message");
          response.body.message.should.be.eql(
            "Status value is incorrect...values can be only Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit"
          );
          done();
        });
    });
    //checking getting report by passing report code
    it("Check for getting report by passing Report Code", (done) => {
      let reportCode = "1646330802639";
      chai
        .request("http://localhost:3000/")
        .get(`report/get_report/${reportCode}`)
        .end((err, response) => {
          if (err) {
            console.log(err);
          }
          //checking for various property to validate response object
          response.should.have.status(200);
          response.body.should.have.property("success").eql(true);
          response.body.should.be.a("object");
          response.body.data.should.have.property("report").be.a("object");
          response.body.should.have.property("message");
          response.body.message.should.be.eql("Report Received");
          done();
        });
    });
    //checking getting all report by passing invalid report code
    it("Check for getting report by passing invalid Report Code", (done) => {
      let reportCode = "1234567890";
      chai
        .request("http://localhost:3000/")
        .get(`report/get_report/${reportCode}`)
        .end((err, response) => {
          if (err) {
            console.log(err);
          }
          //checking for various property to validate response object
          response.should.have.status(402);
          response.body.should.have.property("success").eql(false);
          response.body.should.be.a("object");
          response.body.should.have.property("message");
          response.body.message.should.be.eql("Report not found");
          done();
        });
    });
  });
});
