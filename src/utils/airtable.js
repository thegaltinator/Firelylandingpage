import axios from 'axios';

const AIRTABLE_BASE_ID = 'appw0Q45l5AXlUWqi';
const AIRTABLE_TABLE_ID = 'tblxLdN8xZpOciLOt'; // Using table ID instead of name
const AIRTABLE_API_KEY = 'pat47O2QYmuWzDvNB.59dc8f255c21cd7bda92692d77764696c14d639475b2be2ba9ba97ff6f95d4a3';

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
            'first_name': formData.firstName,
            'last_name': formData.lastName,
            'email': formData.email,
            'phone_number': formData.phoneNumber,
            'company_size': formData.company,
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