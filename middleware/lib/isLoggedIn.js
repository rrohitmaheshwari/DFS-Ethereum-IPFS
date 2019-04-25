function isLoggedIn(req, res, next){
    if(!req.session.email){
        res.status(403);
        res.send({msg: 'User is not logged in!'});
    }
    else
    {
        next();
    }
}
module.exports={isLoggedIn}