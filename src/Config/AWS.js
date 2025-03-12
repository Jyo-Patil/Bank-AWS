import AWS from 'aws-sdk';

// Configure AWS Cognito
const cognito = new AWS.CognitoIdentityServiceProvider({
  region: 'us-east-1', // Your AWS region
});

// Configure DynamoDB
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Function to sign up a new user
export const signUpUser = async (email, password) => {
  const params = {
    ClientId: '5ejeveq6sdco2etlgmhbpnjqsl', // Your Cognito App Client ID
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
    ],
  };

  return await cognito.signUp(params).promise();
};

// Function to log in a user
export const loginUser = async (email, password) => {
  const params = {
    AuthFlow: 'CUSTOM_AUTH',
    ClientId: '5ejeveq6sdco2etlgmhbpnjqsl', // Your Cognito App Client ID
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  return await cognito.adminInitiateAuth(params).promise();
};

// Function to initiate password recovery
export const forgotPassword = async (email) => {
  const params = {
    ClientId: '5ejeveq6sdco2etlgmhbpnjqsl', // Your Cognito App Client ID
    Username: email,
  };

  return await cognito.forgotPassword(params).promise();
};

// Function to save user data to DynamoDB
export const saveUserData = async (userData) => {
  const params = {
    TableName: 'bank_data', // Your DynamoDB table name
    Item: userData,
  };

  return await dynamoDB.put(params).promise();
};
// Function to get transaction data from DynamoDB
export const getTransactionData = async () => {
  const params = {
    TableName: 'transaction_bank', // Your DynamoDB table name for transactions
  };

  const data = await dynamoDB.scan(params).promise(); // Fetch all items in the table
  return data.Items; // Return the fetched items
};
// Function to get user data from DynamoDB
export const getUserData = async () => {
  const params = {
    TableName: 'bank_data', // Your DynamoDB table name
  };

  const data = await dynamoDB.scan(params).promise(); // Fetch all items in the table
  return data.Items; // Return the fetched items
};