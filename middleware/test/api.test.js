const assert = require('assert');
const app = require('../app');
const expect = require('expect');
const request = require('supertest');

let Cookies;

describe('Login Test', () => {

    it('POST: /login : Invalid login', (done) => {
        let invalidUser = {
            email: 'invalidtestUser@gmail.com',
            password: 'invalidtestUserPasswrod'
        };

        request(app)
            .post('/login')
            .send(invalidUser)
            .expect(403)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('POST: /login : Valid login', (done) => {
        let validUser = {
            email: 'testuser@gmail.com',
            password: 'testuser'
        };

        request(app)
            .post('/login')
            .send(validUser)
            .expect(200)
            .expect((res) => {
                Cookies = res.headers['set-cookie'].pop().split(';')[0];
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });


    it('POST: /register : Already Register', (done) => {
        let invalidUser = {
            firstName: 'test',
            lastName: 'user',
            email: 'testuser@gmail.com',
            password: 'testuser',
            publicKey: 'pkey',
            address: 'address',
        };

        request(app)
            .post('/register')
            .send(invalidUser)
            .expect(403)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('POST: /register : New Register', (done) => {
        let invalidUser = {
            firstName: 'test',
            lastName: 'user',
            email: 'testuser1@gmail.com',
            password: 'testuser',
            publicKey: 'pkey',
            address: 'address',
        };

        request(app)
            .post('/register')
            .send(invalidUser)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('POST: /checkEmailExists : Check existing email', (done) => {

        let validEmail = {
            email: 'testuser@gmail.com'
        };

        request(app)
            .post('/checkEmailExists')
            .send(validEmail)
            .expect(403)
            .end((err, res) => {
                console.log(err);
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('POST: /checkEmailExists : Check non existing email', (done) => {

        let newEmail = {
            email: 'newEmail@gmail.com'
        };

        request(app)
            .post('/checkEmailExists')
            .send(newEmail)
            .expect(200)
            .end((err, res) => {
                console.log(err);
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('GET: /fetchInboxIndress :FetchInbox Address', (done) => {
        request(app)
            .get('/fetchInboxIndress')
            .expect(200)
            .end((err, res) => {
                console.log(err);
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('GET: /getAccount : Get Valid Account', (done) => {

        let email={
            email:"testuser@gmail.com",
        }
        let req = request(app).get('/getAccount').send(email);

        req.cookies = Cookies;

        req.expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('GET: /getAccount : Get Invalid Account', (done) => {

        let email={
            email:"testinvaliduser@gmail.com",
        }
        let req = request(app).get('/getAccount').send(email);

        req.cookies = Cookies;

        req.expect(403)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });


    it('GET: /getAccount : Get Valid Account user not logged in', (done) => {

        let email = {
            email: "testuser@gmail.com",
        }

        request(app).get('/getAccount')
            .send(email)
            .expect(403)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it('GET: /logout : Logout', (done) => {

        let req = request(app).get('/logout');

        req.cookies = Cookies;

        req.expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });


});