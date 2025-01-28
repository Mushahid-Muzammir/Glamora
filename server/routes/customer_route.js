import express from 'express';

export const customerRoute = express.Router();

customerRoute.get("/getProducts");
customerRoute.get("/getServices");


