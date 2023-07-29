import axios from "axios";

export const cardUpload = async (name, tokenId) => {
  const svg = `<svg width="620" height="400" viewBox="0 0 620 400" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 30C0 13.4315 13.4315 0 30 0H590C606.569 0 620 13.4315 620 30V370C620 386.569 606.569 400 590 400H30C13.4315 400 0 386.569 0 370V30Z" fill="#F84246"/>
<text fill="black" xml:space="preserve" style="white-space: pre" font-family="Mea Culpa" font-size="60" letter-spacing="0em"><tspan x="135.066" y="200">${name}</tspan></text>
<text fill="black" xml:space="preserve" style="white-space: pre" font-family="Knewave" font-size="26" letter-spacing="0.25em"><tspan x="236" y="337.192">#${tokenId}</tspan></text>
<path d="M233 44.0238V77.0238H239.5V56.5238L254 77.0238H261.5L239.5 44.0238H233Z" fill="black"/>
<path d="M261.5 44.0238H255.5V61.5238L261.5 68.5238V44.0238Z" fill="black"/>
<path d="M296.5 44.0238H272.5V77.0238H296.5V71.5238H280.5V50.5238H296.5V44.0238Z" fill="black"/>
<path d="M296.5 64.0238V58.5238H285.5V64.0238H296.5Z" fill="black"/>
<path d="M331.5 44.0238H305V50.5238H331.5V44.0238Z" fill="black"/>
<path d="M321.5 54.5238H314.5V77.0238H321.5V54.5238Z" fill="black"/>
<path d="M347.5 44.0238H340V77.0238H347.5V44.0238Z" fill="black"/>
<path d="M369.5 44.0238H358V77.0238H369.5C376 76.4999 387 76 387.5 61.5238C388.011 46.7326 375.5 43.6904 369.5 44.0238Z" fill="black"/>
<path d="M233 44.0238V77.0238H239.5V56.5238L254 77.0238H261.5L239.5 44.0238H233Z" stroke="black" stroke-width="0.4"/>
<path d="M261.5 44.0238H255.5V61.5238L261.5 68.5238V44.0238Z" stroke="black" stroke-width="0.4"/>
<path d="M296.5 44.0238H272.5V77.0238H296.5V71.5238H280.5V50.5238H296.5V44.0238Z" stroke="black" stroke-width="0.4"/>
<path d="M296.5 64.0238V58.5238H285.5V64.0238H296.5Z" stroke="black" stroke-width="0.4"/>
<path d="M331.5 44.0238H305V50.5238H331.5V44.0238Z" stroke="black" stroke-width="0.4"/>
<path d="M321.5 54.5238H314.5V77.0238H321.5V54.5238Z" stroke="black" stroke-width="0.4"/>
<path d="M347.5 44.0238H340V77.0238H347.5V44.0238Z" stroke="black" stroke-width="0.4"/>
<path d="M369.5 44.0238H358V77.0238H369.5C376 76.4999 387 76 387.5 61.5238C388.011 46.7326 375.5 43.6904 369.5 44.0238Z" stroke="black" stroke-width="0.4"/>
</svg>
`;
  const svgBlob = new Blob([svg], { type: "image/svg+xml" });

  const svgFile = new File([svgBlob], `card-${name}-${tokenId}.svg`, {
    type: "image/svg+xml",
  });
  const formData = new FormData();
  formData.append("File", svgFile);
  const baseURL = import.meta.env.VITE_BASE_URL;

  const response = await axios
    .post("/v2/nftkit/nft/ipfs/file/Upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      baseURL: baseURL,
    })
    .then((response) => {
      console.log("success");
      console.log(response);
      return response.data.value.cid;
    })
    .catch((error) => {
      console.log("error caught with response");
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
