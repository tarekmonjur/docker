import mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        const result = await newContact.save();
        res.json(result);
    } catch (err) {
        throw err;
    }
};

export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.json(contacts);
    } catch (err) {
        res.send(err);
    }
};

export const getContactWithID = async (req, res) => {
    try {
        const result = await Contact.findById(req.params.contactId);
        return res.json(result);
    } catch (err) {
        return res.send(err);
    }
}

export const updateContact = async (req, res) => {
    try {
        const result = await Contact.findOneAndUpdate({ _id: req.params.contactId}, req.body, { new: true });
        res.json(result);
    } catch (err) {
        throw err;
    }
}

export const deleteContact = async (req, res) => {
    try {
        await Contact.remove({ _id: req.params.contactId })
        res.json({ message: 'Successfully deleted contact'});
    } catch (err) {
        res.send(err);
    } 
}