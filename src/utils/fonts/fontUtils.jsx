// src/utils/fontUtils.js

export const getFontBase64 = async (fontUrl) => {
    try {
      const response = await fetch(fontUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch font: ${response.statusText}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      let binary = '';
      uint8Array.forEach((byte) => {
        binary += String.fromCharCode(byte);
      });
      return btoa(binary);
    } catch (error) {
      console.error("Error converting font to Base64:", error);
      return null;
    }
  };
  