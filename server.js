import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import logger from "morgan";
import db from "./db/connection.js";