let express = require('express');
let router = express.Router();
const config = require('config');
const logger = require('../config/logger');
const {isLoggedIn} = require('../lib/isLoggedIn');
var fs = require("fs");
var request = require("request");


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'DFS using Blockchain-server'});
});

/* POST call for Registering new user. */
router.post('/register', async (req, res, next) => {
    logger.info("[POST]/register");

    var findExistingUser = () => {
        return new Promise((resolve, reject) => {

            req.db
                .collection('users')
                .find({email: req.body.email})
                .limit(1)
                .toArray(function (err, data) {
                    err
                        ? reject(err)
                        : resolve(data.length);
                });
        });
    };

    var result = await findExistingUser();

    if (result === 1) {
        res.status(403);
        res.send({msg: 'User already Registered'});
    }
    else {
        req.db.collection('users').insert({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            publicKey: req.body.publicKey,
            address: req.body.address
        });
        res.status(201);
        res.send({msg: 'User Registered Successfully'});
    }

});


/* POST call for Login user. */
router.post('/login', async (req, res, next) => {
    logger.info("[POST]/login", null, 2);

    var findUser = () => {
        return new Promise((resolve, reject) => {

            req.db
                .collection('users')
                .find({email: req.body.email})
                .limit(1)
                .toArray(function (err, data) {
                    err
                        ? reject(err)
                        : resolve(data);
                });
        });
    };

    var result = await findUser();

    if (result.length === 1 && result[0].password === req.body.password) {
        req.session.email = req.body.email;
        res.status(200);
        res.send({msg: 'User logged in Successfully'});
    }
    else {
        res.status(403);
        res.send({msg: 'Invalid credentials'});
    }
});

/* Get call for Logout */
router.get('/logout', function (req, res, next) {
    logger.info("[GET]/logout", null, 2);
    console.log(req.session.email);
    if (req.session.email) {
        // delete session object
        req.session.destroy();
        res.status(200);
        res.send({msg: 'User logged out Successfully'});
    }
    else {
        res.status(403);
        res.send({msg: 'No user is logged in'});
    }
});

/* POST call to check whether email exists or not. */
router.post('/checkUserExists', async (req, res, next) => {
    logger.info("[POST]/checkUserExists");

    var findUser = () => {
        return new Promise((resolve, reject) => {

            req.db
                .collection('users')
                .find({email: req.body.email})    //
                .limit(1)
                .toArray(function (err, data) {
                    err
                        ? reject(err)
                        : resolve(data);
                });
        });
    };


    var findUserbyPublickKey = () => {
        return new Promise((resolve, reject) => {

            req.db
                .collection('users')
                .find({publicKey: req.body.publicKey})    //
                .limit(1)
                .toArray(function (err, data) {
                    err
                        ? reject(err)
                        : resolve(data);
                });
        });
    };


    var result = await findUser();
    var resultByPublickKey  = await findUserbyPublickKey();

    if (result.length === 1 || resultByPublickKey.length === 1) {
        res.status(403);
        res.send({msg: 'Fail: Email/Public Key Exists'});
    }
    else {
        res.status(200);
        res.send({msg: 'Success: Email Not Exist'});
    }
});

//
router.get('/fetchInboxAddress', function (req, res, next) {
    logger.info("[GET]/fetchInboxAddress", null, 2);

    res.status(200);
    res.send({msg: config.deployAddress});

});

router.get('/getAccount', isLoggedIn, async function (req, res, next) {
    logger.info("[GET]/getAccount", null, 2);

    var findUser = () => {
        return new Promise((resolve, reject) => {

            req.db
                .collection('users')
                .find({email: req.body.email})
                .limit(1)
                .toArray(function (err, data) {
                    err
                        ? reject(err)
                        : resolve(data);
                });
        });
    };

    var result = await findUser();


    if (result.length === 1) {
        console.log(result);
        let responseObj = {}
        responseObj.address = result[0].address;
        responseObj.publicKey = result[0].publicKey;
        res.status(200);
        res.send({responseObj});

    }
    else {
        res.status(403);
        res.send({msg: 'Unable to Fetch Account Details'});
    }
});


router.post('/uploadFile', function (req, res, next) {
    console.log("Server trying to upload... " + req.files.file.name)

    try {


        var options = {
            method: 'POST',
            url: 'https://ipfs.infura.io:5001/api/v0/block/put',
            headers:
                {
                    'cache-control': 'no-cache',
                    'content-type': 'multipart/form-data;'
                },
            formData:
                {
                    file:
                        {
                            value: JSON.stringify(req.files.file),
                            options:
                                {
                                    filename: req.files.file.name,
                                    contentType: null
                                }
                        },
                    'Content-Type': 'multipart/form-data'
                }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log("succcess");
            console.log(body);
            res.status(200);
            res.send(body);
        });
    }
    catch (err) {
        console.log(err);
    }


});



router.get('/downloadFile', function (req, res, next) {

    console.log(req.query.hash);

    try {


        console.log(`https://ipfs.infura.io:5001/api/v0/block/get?arg=${req.query.hash}`);

        var options = {
            method: 'POST',
            url: `https://ipfs.infura.io:5001/api/v0/block/get?arg=${req.query.hash}`,
            headers:
                {
                    'cache-control': 'no-cache'
                },
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log("succcess");
            let file =Buffer.from(JSON.parse(body).data);
            res.status(200);
            res.send(file);
        });
    }
    catch (err) {
        console.log(err);
    }

});


module.exports = router;
