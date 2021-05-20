const request = require("supertest");
const app = require("../built/src/app");


describe("app", () => {
   it("index", async () => {
        await request(app.app).get("/").expect(200)
        .then(ret => {
            expect(ret.body).not.toBeNull();
            console.log(ret.body);
        });
    });
   it("Auth user", async () => {
        await request(app.app).post("/auth")
        .expect(200)
        .send({
            username: 'marta',
            password: 'suplice'
        })
        .then(ret => {
            console.log(ret.body);
        });
    });   
});
