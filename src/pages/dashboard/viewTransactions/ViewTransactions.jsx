import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getTransactionData } from '../../../Config/AWS'; // Import the function to get transaction data

function ViewTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const result = await getTransactionData(); // Fetch transactions from DynamoDB
      setTransactions(result); // Set the transactions state with the fetched data
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(); // Fetch transactions when the component mounts
  }, []);

  return (
    <div>
      <h1>User Transactions</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>{transaction.description} - {transaction.amount}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewTransactions;