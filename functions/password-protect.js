const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const password = "EcoGrow2024"; // Set your password here
  const authHeader = event.headers.authorization;

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

  if (enteredPassword !== password) {
    return {
      statusCode: 403,
      body: "Forbidden",
    };
  }

  const filePath = path.join(__dirname, '../..', event.path === '/' ? '/index.html' : event.path);
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return {
      statusCode: 200,
      body: fileContents,
      headers: {
        'Content-Type': 'text/html',
      },
    };
  }
