const axios = require('axios');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Parse the form data
    const formData = JSON.parse(event.body);

    // Validate required fields
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.phone_number) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'Missing required fields' 
        })
      };
    }

    // Airtable configuration (these will be environment variables in Netlify)
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID;
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;

    if (!AIRTABLE_BASE_ID || !AIRTABLE_TABLE_ID || !AIRTABLE_API_KEY) {
      console.error('Missing Airtable environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false, 
          error: 'Server configuration error' 
        })
      };
    }

    // Submit to Airtable
    const airtableResponse = await axios.post(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`,
      {
        records: [
          {
            fields: {
              first_name: formData.first_name,
              last_name: formData.last_name,
              email: formData.email,
              phone_number: parseInt(formData.phone_number.toString().replace(/\D/g, '')),
              company_size: formData.company_size || '',
              sales_challenges: formData.sales_challenges || '',
              Status: 'Pending'
            }
          }
        ],
        typecast: true
      },
      {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        recordId: airtableResponse.data.records[0].id 
      })
    };

  } catch (error) {
    console.error('Airtable submission error:', error.response?.data || error.message);
    
    let errorMessage = 'Failed to submit form. Please try again.';
    
    if (error.response?.status === 401) {
      errorMessage = 'Authentication failed.';
    } else if (error.response?.status === 422) {
      errorMessage = 'Invalid data format.';
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: errorMessage 
      })
    };
  }
}; 