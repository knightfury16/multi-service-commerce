// App.js
import { useState, useEffect, SyntheticEvent } from 'react';
import axios from 'axios';
import './App.css'

type index = {
  id: number,
  value: number
}

type indexToValueMap = {
  [key : number] : string
}

function App() {
  const [inputValue, setInputValue] = useState('');
  const [submittedIndexes, setSubmittedIndexes] = useState<index[]>([]);
  const [calculatedValues, setCalculatedValues] = useState<indexToValueMap>([]);

  // Function to fetch submitted indexes from the backend
  const fetchSubmittedIndexes = async () => {
    try {
      const response = await axios.get('api/getValues');
      console.log("Resposne for index value",response.data.result)
      setSubmittedIndexes(response.data?.result);
    } catch (error) {
      console.error('Error fetching submitted indexes:', error);
    }
  };

  // Function to fetch calculated values from the backend
  const fetchCalculatedValues = async () => {
    try {
      const response = await axios.get('api/getValues/redis');
      console.log("Response for redis values ", response.data.values);
      setCalculatedValues(response.data?.values);
    } catch (error) {
      console.error('Error fetching calculated values:', error);
    }
  };

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchSubmittedIndexes();
    fetchCalculatedValues();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e:SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.post('api/setValue', { value: inputValue });
      // After submitting, fetch updated data
      fetchSubmittedIndexes();
      fetchCalculatedValues();
      setInputValue('');
    } catch (error) {
      console.error('Error submitting value:', error);
    }
  };

  return (
    <>
    <div>
      <h1>Fibonacci Calculator</h1>
      <div className='card'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a number"
        />
        <button type="submit">Calculate</button>
      </form>


      </div>
      
      <h2>Previously Submitted Indexes</h2>
      <ul>
        {submittedIndexes.map((index) => (
          <li key={index.id}>{index.value}</li>
        ))}
      </ul>

      <h2>Calculated Values</h2>
      <ul>
      {Object.entries(calculatedValues).map(([index, value]) => (
        <li key={index}>
          Index: {index}, Value: {value}
        </li>
      ))}
    </ul>
    </div>
    </>
    
  );
}

export default App;
