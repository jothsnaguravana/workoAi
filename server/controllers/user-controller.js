import User from "../model/User";
import bcrypt from 'bcryptjs';
import mongoose from "mongoose";

export const getAllUser = async(req, res, next) => {
    let users;
    try {
        users = await User.find();
    }
    catch (err) {
        console.log("******************"); 
        console.log(err);
        console.log("******************"); 
    }
    if(!users) {
        return res.status(404).json({message: "No users found"});
    }
    return res.status(200).json({users});
};

export const getUserById = async(req ,res , next) => {
    let uid = req.params.id; 
    try {
        const user = await User.findOne({ _id: uid })
        if(!user) {
            return res.status(404).json({message: "No users found"});
        }
        return user; 
    }
    catch (err) {
        console.log("******************"); 
        console.log(err);
        console.log("******************"); 
        return res.status(500).json({message : "ISE"});
    }
}

//for the first time
export const signup = async (req,res , next) => {
    const {name , email ,password, age ,city , zipcode} = req.body; 
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    } 
    catch(err) {
        console.log("###################"); 
        return console.log(err);
        // console.log("###################");
    }
    if(existingUser) {
        return res.status(400).json({message : "User already exists!"});
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name , email,password : hashedPassword, age ,city , zipcode
    });
    
    try {
        await user.save();
    }
    catch(err) {
       return  console.log(err);
    }
    return res.status(201).json({user})
};

export const login = async (req,res ,next) => {
    const {email , password} = req.body;
    let existingUser; 
    try {
        existingUser = await User.findOne({email});
    }
    catch(err) {
        return err;
    }
    if(!existingUser) {
        return res.status(404).json({message : "Invalid credentials"});
    }
    console.log(existingUser.password);
    const isPwdMatching = bcrypt.compareSync(password ,existingUser.password);
    if(isPwdMatching) {
        return res.status(200).json({message : "Successful login"});
    }
    return res.status(404).json({message : "Incorrect password"});
};

export const softDelete = async(req,res,next) => {
    const email1 = req.params.email; 
    try {
        const user = await User.findOneAndUpdate(
          { email: email1 },
          { $set: { isdeleted: true } },
          { new: true }
        );
    
        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }
        console.log(user);
        res.send({ message: 'User soft deleted', user });
    } catch (error) {
        res.status(500).send({ message: 'Server error', error });
    }
};

export const updateData = async(req ,res , next) => {
    const email_ = req.params.email;
    const { name,password, age ,city , zipcode } = req.body;
  
    try {
      const user = await User.findOneAndUpdate(
        { email: email_ },
        { name,password, age ,city , zipcode  },
        { new: true, runValidators: true }
      );
  
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      res.send({ message: 'User updated', user });
    } catch (error) {
      res.status(500).send({ message: 'Server error', error });
    }
}

export const updateField = async (req,res,next) => {
    const email = req.params.email;
    const updates = req.body;
  
    try {
      const user = await User.findOneAndUpdate(
        { email: email },
        { $set: updates },
        { new: true, runValidators: true }
      );
  
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      res.send({ message: 'User updated', user });
    } catch (error) {
      res.status(500).send({ message: 'Server error', error });
    }
}