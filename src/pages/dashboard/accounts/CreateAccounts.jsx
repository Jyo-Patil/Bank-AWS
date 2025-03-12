import React, { useState } from 'react';
import { signUpUser, saveUserData } from '../../../Config/AWS';
import { toast } from 'react-toastify';

function CreateAccounts() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Sign up the user with AWS Cognito
      await signUpUser(email, password);
      toast.success('User created successfully!');

      // Save user data to DynamoDB
      const userData = {
        email: email,
        // Add other user attributes as needed
      };
      await saveUserData(userData);
      toast.success('User data saved to DynamoDB!');

    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit" disabled={isLoading}>{isLoading ? 'Creating...' : 'Create Account'}</button>
    </form>
  );
}

export default CreateAccounts;