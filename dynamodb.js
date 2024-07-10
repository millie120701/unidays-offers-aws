const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { fromIni } = require("@aws-sdk/credential-provider-ini");

const dynamodbClient = new DynamoDBClient({
  region: "eu-west-2", 
  credentials: fromIni({
    profile: "default", // header in AWS credentials
  }),
});

async function scanDynamoDB() {
  const tableName = "Offers"; 
  // only params interested are table name as getting all data for simple page
  const params = {
    TableName: tableName,
  };

  try {
    const command = new ScanCommand(params);
    const data = await dynamodbClient.send(command);
    // items returned 
    return data.Items; 
  } catch (err) {
    console.error("Unable to scan. Error:", err);
    throw err;
  }
}

// exported to server.js for usage

module.exports = { scanDynamoDB };
