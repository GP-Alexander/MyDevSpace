import { Router } from "express";
import { createContact, getContacts, getContactById, updateContact, deleteContact } from "../controllers/contact.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { ValidateSchema } from "../middlewares/validator.middleware.js";
import { createContactSchema, updateContactSchema } from "../schemas/contact.schema.js";

// Función auxiliar optimizada
const useRoute = (schema, controller) => {
    return [auth, schema ? ValidateSchema(schema) : (req, res, next) => next(), controller];
};

const router = Router();
router.route("/contacts")
    .get(...useRoute(null, getContacts))      
    .post(...useRoute(createContactSchema, createContact));  

router.route("/contacts/:id")
    .get(...useRoute(null, getContactById))  
    .put(...useRoute(updateContactSchema, updateContact))  
    .delete(...useRoute(null, deleteContact)); 

export default router;
