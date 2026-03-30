import connectDb from "./db.js";
import user from "./model/userSchema.js";

connectDb();
 const createUser=async(name,email,password,role)=>{
    try{
    const newuser= await user.create({
        name:"raj",
        email:"raj@example.com",
        password:"12345678",   
        role:"user"
       


    });
    console.log("User created successfully");
}catch(error){
    console.error("Error creating user",error); 
}
};

const readUser=async()=>{
        const result= await user.find(); 
        console.log(result);
   
};

// const updateUser=async()=>{
//     // user.updateOne({name:"raj"},{$set:{name:"raj kumar"}});
//     user.findByIdAndUpdate("69bb74c085ecdfc0e587cd2c",{$set:{name:"raj kumar"}});



// };

createUser("raj", "raj@example.com", "12345678", "user");
readUser();
 //updateUser();