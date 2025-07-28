import axios from 'axios';

const AIRTABLE_BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_ID = process.env.REACT_APP_AIRTABLE_TABLE_ID;
const AIRTABLE_API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;

// Check if environment variables are loaded
if (!AIRTABLE_BASE_ID || !AIRTABLE_TABLE_ID || !AIRTABLE_API_KEY) {
  console.error('Missing Airtable environment variables. Please check your .env file.');
}

const airtableAPI = axios.create({
  baseURL: `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`,
  headers: {
    'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export const submitToAirtable = async (formData) => {
  try {
    console.log('Submitting to Airtable:', {
      baseId: AIRTABLE_BASE_ID,
      tableId: AIRTABLE_TABLE_ID,
      data: formData
    });

    const response = await airtableAPI.post(`/${AIRTABLE_TABLE_ID}`, {
      "records": [
        {
          "fields": {
            'first_name': formData.first_name,
            'last_name': formData.last_name,
            'email': formData.email,
            'phone_number': formData.phone_number,
            'company_size': formData.company_size,
            'sales_challenges': formData.sales_challenges,
            'Status': 'Pending'
          }
        }
      ],
      "typecast": true
    });
    
    return {
      success: true,
      recordId: response.data.id,
      data: response.data
    };
  } catch (error) {
    console.error('Airtable submission error:', error);
    console.error('Error response:', error.response);
    console.error('Error status:', error.response?.status);
    console.error('Error data:', error.response?.data);
    
    let errorMessage = 'Failed to submit form. Please try again.';
    
    if (error.response?.status === 401) {
      errorMessage = 'Authentication failed. Please check API credentials.';
    } else if (error.response?.status === 422) {
      errorMessage = 'Invalid data format. Please check field names.';
    } else if (error.response?.data?.error) {
      if (typeof error.response.data.error === 'string') {
        errorMessage = error.response.data.error;
      } else if (error.response.data.error.message) {
        errorMessage = error.response.data.error.message;
      } else if (error.response.data.error.type) {
        errorMessage = `Error: ${error.response.data.error.type}`;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
}; 