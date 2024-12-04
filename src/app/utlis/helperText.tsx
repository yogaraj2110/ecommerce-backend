"use client"
import axios from 'axios';
import Cookies from "js-cookie";
const crypto = require('crypto');

const secret_key = process.env.NEXT_PUBLIC_SECRET_KEY;
const iv = process.env.NEXT_PUBLIC_SECRET_IV
const encryption_method = process.env.NEXT_PUBLIC_ECNRYPTION_METHOD

export function encryptData(data: any) {
  const cipher = crypto.createCipheriv(encryption_method, secret_key, iv)
  return Buffer.from(
    cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
  ).toString('base64')
}

export const setAuthToken = (): void => {
  let token = Cookies.get('authToken')
  console.log("token",token);
  
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.withCredentials = true;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

