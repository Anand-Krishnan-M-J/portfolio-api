import chai from "chai";
import chaiHttp from "chai-http"
import {server} from "../app"

chai.should();
chai.use(chaiHttp);

const defaultSignupSuccessUser = {
    username: `harry${Date.now()}`,
    age:18,
    email: `harry${Date.now()}@gmail.com`,
    password: "12345"
};
const defaultSignupUnsuccessUser = {
    username: `hadsfsd`,
    email: "sdfsdf",
    password: "12345"
};
const defaultLoginSuccessUser = {
    username: "fkh3x",
    password: "12345"
};
const defaultLoginUnSuccessUser = {
    username: "Chasity_fggMarks",
    password: "Chasity_Marks!@#"
};

let token = "";
describe("User API", () => {
    describe("GET /users", () => {
        it("It should return status 200 on successful signup", done => {
            chai.request(server)
                .post("/users/signup")
                .send(defaultSignupSuccessUser)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });
        it("It should not return status 200 on unsuccessful signup", done => {
            console.log(defaultSignupSuccessUser)
            chai.request(server)
                .post("/users/signup")
                .send(defaultSignupUnsuccessUser)
                .end((err, response) => {
                    response.should.not.have.status(200);
                    response.body.should.be.a("object");
                    done();
                    console.log(err)
                });
        });
        it("It should return token on successful login", done => {
            chai.request(server)
                .post("/users/login")
                .send(defaultLoginSuccessUser)
                .end((err, response) => {
                    token = response.body.data.token;
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });
        it("It should not return token on unsuccessful login", done => {
            chai.request(server)
                .post("/users/login")
                .send(defaultLoginUnSuccessUser)
                .end((err, response) => {
                    response.should.not.have.status(200);
                    done();
                });
        });
        it("It should return profile on sending correct token", done => {
            chai.request(server)
                .get("/users/profile")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    done();
                });
        });
        it("It should not return profile on sending incorrect token", done => {
            chai.request(server)
                .get("/users/profile")
                .set({ Authorization: `Bearer ${"fsd4df44f4s"}` })
                .end((err, response) => {
                    response.should.not.have.status(200);
                    done();
                });
        });
    });
});
