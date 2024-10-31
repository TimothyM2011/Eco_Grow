const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const password = "EcoGrow2024"; // Set your password here
  const authHeader = event.headers.authorization;

  console.log("Authorization Header:", authHeader); // Debugging line

  if (!authHeader) {
    return {
      statusCode: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Protected Area"',
      },
      body: "Unauthorized",
    };
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
  const [username, enteredPassword] = credentials.split(":");

  console.log("Entered Password:", enteredPassword); // Debugging line

  if (enteredPassword !== password) {
    return {
      statusCode: 403,
      body: "Forbidden",
    };
  }

  const publicPath = path.join(__dirname, '../..', 'public'); // Adjust this if your files are in a different location
  const filePath = path.join(publicPath, event.path === '/' ? 'index.html' : event.path);

  console.log("File Path:", filePath); // Debugging line

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return {
      st

