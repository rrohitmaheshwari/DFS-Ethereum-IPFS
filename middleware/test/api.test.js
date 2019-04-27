const assert = require('assert');
const app = require('../app');
const expect = require('expect');
const request = require('supertest');

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

    // it('POST: /register : New Register', (done) => {
    //     let invalidUser = {
    //         firstName: 'test',
    //         lastName: 'user',
    //         email: 'testuser1@gmail.com',
    //         password: 'testuser',
    //         publicKey: 'pkey',
    //         address: 'address',
    //     };
    //
    //     request(app)
    //         .post('/register')
    //         .send(invalidUser)
    //         .expect(200)
    //         .end((err, res) => {
    //             if (err) {
    //                 return done(err);
    //             }
    //             done();
    //         });
    // });

});