import express from 'express';
import { getAllUser, getUserById, login, signup, softDelete, updateData, updateField } from '../controllers/user-controller';

const router = express.Router(); 

router.get("/" ,getAllUser);
router.get("/:id" , getUserById);
router.post("/signup" , signup);
router.post("/login" , login);
router.delete("/delete/:email" ,softDelete);
router.put("/put/:email" ,updateData); 
router.patch("/patch/:email" , updateField);

export default router;