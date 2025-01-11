import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "/",
});

export const axiosPrivate = axios.create({
  baseURL: "/",
});
