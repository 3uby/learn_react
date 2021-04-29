const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: { type:String, maxlength:50 },
    email: { type:String, trim:true, unique: 1 },
    password: { type: String, minglength: 5 },
    lastname: { type:String, maxlength: 50 },
    role : { type:Number, default: 0 },
    image: String,
    token : { type: String, },
    tokenExp :{ type: Number }
})

//bcyrpt
//비밀번호를 암호화 시킨다 .
userSchema.pre('save',function(next){
    var user = this;
    //salt 생성
    //password 만 바꿀때 암호화한다.
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if(err) return next(err)
                user.password = hash;
                next();
            });
        });
    }else {
        next();
    }
    //use salt 비밀번호 암호화
})

userSchema.methods.comparePassword = function(plainPassword,cb){
    //plainpassword = 123456 = > check 후 비교 암호화된 비밀번호  %$^$#^#$^#$%
    bcrypt.compare(plainPassword, this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    //jsonwebtoken을 이용해서 토큰생성
    var token = jwt.sign(user._id.toHexString(), 'secret')

    // user._id + 'secreToken' = token
    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null, user)
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User}