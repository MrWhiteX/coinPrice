import axios from "axios";

const instance = axios.create({
  baseURL: `https://identitytoolkit.googleapis.com/v1`,
  params: {
    key: "AIzaSyA7R2nm5wVFu2owybjlbAPnC9MP_obMaTk",
  },
});

export default instance;
