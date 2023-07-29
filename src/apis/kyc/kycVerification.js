import axios from "axios";

export const kycGetOtp = async ({ aadhaar }) => {
  const requestBody = { aadhaar_number: aadhaar, consent: "Y" };
  const apiKey = import.meta.env.VITE_API_KEY;
  const response = await axios
    .post(
      "https://api.gridlines.io/aadhaar-api/boson/generate-otp",
      requestBody,
      {
        headers: {
          "X-API-Key": apiKey,
          "X-Auth-Type": "API-Key",
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error: ", error.message);
      }
    })
    .finally(() => {});
  return response;
};

export const kycVerifyOtp = async (txnId, otp) => {
  const requestBody = { otp: otp };
  const apiKey = import.meta.env.VITE_API_KEY;
  const response = await axios
    .post(
      "https://api.gridlines.io/aadhaar-api/boson/submit-otp",
      requestBody,
      {
        headers: {
          "X-API-Key": apiKey,
          "X-Auth-Type": "API-Key",
          "X-Transaction-ID": `${txnId}`,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error: ", error.message);
      }
    })
    .finally(() => {});
  return response;
};
