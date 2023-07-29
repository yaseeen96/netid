import html2canvas from "html2canvas";
import { cardLogo } from "../../assets";

export const saveSvgAsPng = (name, tokenId) => {
  // Raw SVG data
  const svgData = `<svg width='827' height='534' viewBox='0 0 827 534' fill='none' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>
  <path d='M0 40.0161C0 17.9158 17.9158 0 40.0161 0H786.984C809.084 0 827 17.9158 827 40.0161V493.532C827 515.633 809.084 533.548 786.984 533.548H40.0161C17.9158 533.548 0 515.633 0 493.532V40.0161Z' fill='#F84246' />
  <rect x='328.132' y='37.4653' width='35.9677' height='25.7882' fill='#F84246' />
  <rect x='350.526' y='30.6792' width='147.264' height='38.6823' fill='#F84246' />
  <rect x='417.712' y='37.4653' width='22.395' height='8.14363' rx='4.07182' fill='#F84246' />
  <text fill='black' xml:space='preserve' style='white-space: pre' font-family='Mea Culpa' font-size='80.0322' letter-spacing='0em'>
    <tspan x='172.069' y='266.752'>${name}</tspan>
  </text>
  <text fill='black' xml:space='preserve' style='white-space: pre' font-family='Knewave' font-size='34.6806' letter-spacing='0.25em'>
    <tspan x='322.797' y='450.093'>${tokenId}</tspan>
  </text>
  <!-- Image placed in a layer -->
  <image width='250' height='50' xlink:href='${cardLogo}' x='300' y='30' />
</svg>`;

  const svgElement = document.createElement("div");
  svgElement.innerHTML = svgData;
  const svgNode = svgElement.firstChild;

  // Preload the cardLogo image to ensure it's loaded before rendering the SVG to canvas
  const preloadCardLogo = new Image();
  preloadCardLogo.src = cardLogo;
  preloadCardLogo.onload = () => {
    // Once the cardLogo is loaded, proceed with rendering the SVG to PNG
    html2canvas(svgNode, { useCORS: true })
      .then((canvas) => {
        // Convert canvas to PNG image
        const imageURL = canvas.toDataURL("image/png");

        // Create a temporary link to download the PNG image
        const link = document.createElement("a");
        link.download = `${name}-${tokenId}.png`;
        link.href = imageURL;
        link.click();
      })
      .catch((error) => {
        console.error("Error converting SVG to PNG:", error);
      });
  };
};
