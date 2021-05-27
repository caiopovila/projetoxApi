const request = require("supertest");
const app = require("../built/src/app");

const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYWJlZmEzZDMzMTZjNWRkZWRjZDQ2MiIsImlhdCI6MTYyMjA1MzA1NywiZXhwIjoxNjIyMDU2NjU3fQ.Axx5xpvBA1TyZTNlsyZUgSbY-AqJHLzcRxBdGlQElMU`;

describe("app", () => {

   it("index", async () => {
        await request(app.app).get("/")
        .expect(200)
        .then(ret => {
            expect(ret.body).not.toBeNull();
            console.log(ret.body);
        });
    });
   it("Auth user", async () => {
        await request(app.app).post("/auth")
        .expect(200)
        .send({
            username: 'luiz',
            password: 'inacio'
        })
        .then((ret) => {
            console.log(ret.body);
        });
    }); 
   it("get user", async () => {
        await request(app.app).get("/user")
        .set('Authorization', 'Bearer ' + key)
        .expect(401)
        .then(ret => {
            console.log(ret.body);
        });
    });
   it("get cover", async () => {
        await request(app.app).get("/cover")
        .set('Authorization', 'Bearer ' + key)
        .expect(401)
        .then(ret => {
            console.log(ret.body);
        });
    }); 
   it("get quotation", async () => {
        await request(app.app).get("/quotation")
        .set('Authorization', 'Bearer ' + key)
        .expect(401)
        .then(ret => {
            console.log(ret.body);
        });
    });  
   it("post quotation", async () => {
        await request(app.app)
        .post("/quotation")
        .set('Authorization', 'Bearer ' + key)
        .expect(401)
        .send({
            cpf: '46876222837',
            initiate: Date.now() + 24 * 61 * 60 * 1000,
            finish: '10/07/2026',
            value: 5000,
            cover: '60ad6de3e141831f088db020'            
        })
        .then(ret => {
            console.log(ret.body);
        });
    }); 
   it("get proposal", async () => {
        await request(app.app)
        .get("/proposal")
        .set('Authorization', 'Bearer ' + key)
        .expect(401)
        .then(ret => {
            console.log(ret.body);
        });
    }); 
   it("post proposal", async () => {
        await request(app.app)
        .post("/proposal")
        .set('Authorization', 'Bearer ' + key)
        .expect(401)
        .send({
            payment: 1
        })
        .then(ret => {
            console.log(ret.body);
        });
    }); 
   it("get policy", async () => {
        await request(app.app)
        .get("/policy")
        .set('Authorization', 'Bearer ' + key)
        .expect(401)
        .then(ret => {
            console.log(ret.body);
        });
    }); 
   it("post policy", async () => {
        await request(app.app).post("/policy")
        .set('Authorization', 'Bearer ' + key)
        .expect(401)
        .then(ret => {
            console.log(ret.body);
        });
    });   

    it("logout", async () => {
        await request(app.app).get("/logout")
        .set('Authorization', 'Bearer ' + key)
        .expect(401)
        .then(ret => {
            console.log(ret.body);
        });
    });

});
