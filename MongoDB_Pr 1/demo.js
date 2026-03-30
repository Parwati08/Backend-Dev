import express from 'express';
import cookieParser from 'cookie-parser';

const app=express();
app.use(cookieParser('my-super-secret-key'));

app.get('/set-cookie',(req,res)=>{
    res.cookie('name','rohan',{httpOnly:true});
    res.send('cookie has been set');

});

const authmiddleware=(req,res,next)=>{
    if(!req.cookies.name){
        res.send("Invalid user");
        return;
    }
    next();

}

app.get('/get-cookie',authmiddleware,(req,res)=>{
    // if(!req.cookies.name){
    //     return res.send("Invalid user");
    // }
    const name=req.cookies.name;
    res.send('Cookie value: '+name);
});

app.get('/profile',authmiddleware,(req,res)=>{
    // if(!req.cookies.name){
    //     return res.send("Invalid user");
    // }

    const name=req.cookies.name;
    res.send('Welcome to your profile:'+name);
});

//route for logout

app.get('/logout',authmiddleware,(req,res)=>{
    res.clearCookie('name');
    res.send('You have been logged out');
});

app.listen(3000,()=>console.log('server is running on port 3000'));