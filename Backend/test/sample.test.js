import request from "supertest";
import { expect } from "chai";
import dotenv from "dotenv";
dotenv.config();

import app from '../server.js'
import message from '../models/messageModel.js'
import crypto from 'crypto'
const algorithm = "aes-256-cbc";

// describe('Sample Test', () => {
//     it('should test that true === true', () => {
//       expect(true).toBe(true)
//     })
//   })
//db()
before(function (done) {
  this.timeout(3000);
  setTimeout(done, 2000);
});

describe("POST Login", () => {
  it("user should login with valid credentials", (done) => {

    request(app)
      .post("/api/users/login")
      .send(
        {
          email: "manager@gmail.com",
          password: "12345"
        }
      )
      .expect(200)
      .then((res) => {

        done();
      })
      .catch((err) => done(err));
  });

  it("user should login with valid credentials", (done) => {
    request(app)
      .post("/api/users/login")
      .send(
        {
          email: "manager@gmail.com",
          password: "1234"
        }
      )
      .expect(401)
      .then((res) => {

        done();
      })
      .catch((err) => done(err));
  });
})

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmQ0M2QwMmQ1OGUyNGUzMjEwNzYwYyIsImlhdCI6MTY2ODQ1MDI2MCwiZXhwIjoxNjcxMDQyMjYwfQ.-_V8Rd6kSoKi0L89IvWOjlUfiLXDJwHUGpS1yBUWfu0';

describe("POST Message", () => {
  it("Authorized user should be able to post message", (done) => {
    const initVector = crypto.randomBytes(16);
    const Securitykey = crypto.randomBytes(32);

    const meassge = "Madoule work"

    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    let encryptedData = cipher.update(meassge, "utf-8", "hex");

    encryptedData += cipher.final("hex");
    request(app)
      .post("/api/msg/message")
      .send(
        {
          message: encryptedData
        }
      )
      .set('Authorization', `Bearer ${TOKEN}`)
      .expect(201)
      .then((res) => {

        done();
      })
      .catch((err) => done(err));
  });
})

const TOKEN1 = '';
describe("POST Message by manager", () => {
  const initVector = crypto.randomBytes(16);
  const Securitykey = crypto.randomBytes(32);

  const meassge = "Madoule work"

  const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
  let encryptedData = cipher.update(meassge, "utf-8", "hex");

  encryptedData += cipher.final("hex");

  it("Authorized manager should be able to post message", (done) => {

    request(app)
      .post("/api/msg/message")
      .send(
        {
          message: encryptedData
        }
      )
      .set('Authorization', `Bearer ${TOKEN}`)
      .expect(201)
      .then((res) => {

        done();
      })
      .catch((err) => done(err));
  });
  it("unauthorized user should not be able to post message", (done) => {
    request(app)
      .post("/api/msg/message")
      .send(
        {
          message: encryptedData
        }
      )
      .set('Authorization', `Bearer ${TOKEN1}`)
      .expect(401)
      .then((res) => {

        done();
      })
      .catch((err) => done(err));
  });
})
const TOKENMANAGER = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmQ0M2QwMmQ1OGUyNGUzMjEwNzYwYyIsImlhdCI6MTY2ODQ1NjQ3MywiZXhwIjoxNjcxMDQ4NDczfQ.GZxITwbo0fBz4XRekQeFBKz79TCJlNK18X06zShuFok"
const TOKENUSER = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzI5ZjYxYmFjMmE3NmNmNTRmYWM3NCIsImlhdCI6MTY2ODQ1NjI4OSwiZXhwIjoxNjcxMDQ4Mjg5fQ.W6S8B3dI3RCN-gUzaxgd1BH4m4I7NLBTS11HvJio9os"
describe("POST File Upload by Manger", () => {
  it("Authorized Manager should be able to post file upload", (done) => {
    request(app)
      .post("/api/uploadfile/file")
      .send(
        {
          file: "/uploads/file-1668050423630.pdf"
        }
      )
      .set('Authorization', `Bearer ${TOKENMANAGER}`)
      .expect(201)
      .then((res) => {

        done();
      })
      .catch((err) => done(err));
  });
  it("Unauthorized person should not be able to post file upload", (done) => {
    request(app)
      .post("/api/uploadfile/file")
      .send(
        {
          file: "/uploads/file-1668050423630.pdf"
        }
      )
      .set('Authorization', `Bearer ${TOKENUSER}`)
      .expect(401)
      .then((res) => {

        done();
      })
      .catch((err) => done(err));
  });
})

describe("Check Encryption ", () => {
  const initVector = crypto.randomBytes(16);
    const Securitykey = crypto.randomBytes(32);

    const meassge = "Madoule work"
  it("Strinh should be encypted and decrpted", () => {

    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    let encryptedData = cipher.update(meassge, "utf-8", "hex");

    encryptedData += cipher.final("hex");

    const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);

    let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

    decryptedData += decipher.final("utf8");

    console.log("Decrypted message: " + decryptedData);
  });
  
})

