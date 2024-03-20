const generateSHA256HASH = async () => {
  const secret = import.meta.env.UPLOADS_SALT;
  const encoder = new TextEncoder();
  const encodedData = encoder.encode("FINDIT_IMAGES");
  const hashBuffer = await crypto.subtle.digest("SHA-256", encodedData);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .substring(0, 5);
  return hashHex;
};

export default generateSHA256HASH;
