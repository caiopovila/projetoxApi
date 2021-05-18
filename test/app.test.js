const request = require("supertest");
const app = require("../built/src/app");


describe("app", () => {
   it("console log", async () => {
        await request(app.app).get("/").expect(200)
        .then(ret => {
            expect(ret.body).not.toBeNull();
            console.log(ret.body);
        });
    });
});
