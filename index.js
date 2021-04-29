const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
const {User} = require('./models/User');
const config = require('./config/key');
//데이터를 aplicatoin형태로 가져오게함
app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
  useNewUrlParser: true, useUnifiedTopology: true,
  useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected....'))
.catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('Helllo World!')
})

app.post('/register',(req,res) => {  
//회원가입할때 필요한 정보들을 client에서 가져오기 데이터 베이스에 넣어주기  
  const user = new User(req.body);

  user.save((err,doc)=>{
    if(err) return res.json({success:false,err})
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/login',(req,res)=>{
  //요청된 이메일을 데이터베이스에서 있는지 찾는다
  User.findOne({email : req.body.email },(err,userInfo)=>{      
    if(!userInfo) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일이 없습니다"
      })
    }

    //요청된 이메일의 비밀번호가 맞는지 확인 
    user.comparePassword(req,body.password , (err,isMatch)=>{        
      if(!ismatch) return res.json({ loginSuccess:false,message:"비밀번호가틀렸습니다"})
    })

    //비밀번호까지 같다면 토큰을 생성
    user.generateToken((err, user)=> {

    })

  })


})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})