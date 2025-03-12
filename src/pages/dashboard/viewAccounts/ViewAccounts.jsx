import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getUserData } from '../../../Config/AWS'; // Import the function to get user data

function ViewAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAccounts = async () => {
    try {
      const result = await getUserData(); // Fetch user accounts from DynamoDB
      setAccounts(result); // Set the accounts state with the fetched data
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts(); // Fetch accounts when the component mounts
  }, []);

  return (
    <div>
      <h1>User Accounts</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {accounts.map((account) => (
            <li key={account.id}>{account.email} - {account.accountType}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewAccounts;