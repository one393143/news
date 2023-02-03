	  const input = document.querySelector('#input');
      const submit = document.querySelector('#submit');
      const response = document.querySelector('#response');
      const API_KEY = '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';
      const API_URL = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

      submit.addEventListener('click', () => {
        // Get the user's input
        const query = input.value;

        // Call the function to get a response from ChatGPT
        getResponseFromChatGPT(query).then((chatResponse) => {
          // Display the response
          response.value = chatResponse;
        });
      });

		async function getResponseFromChatGPT(query) {
		  // Show a message indicating that the response is being generated
		  response.value = "回答中...";

		  try {
		    // Make a request to the OpenAI API
		    const apiResponse = await fetch(API_URL, {
		      method: 'POST',
		      headers: {
		        'Content-Type': 'application/json',
		        'Authorization': `Bearer ${API_KEY}`
		      },
		      body: JSON.stringify({
		        prompt: query,
		        max_tokens: 2048
		      })
		    });

		    // Parse the JSON response
		    const json = await apiResponse.json();

		    // Return the response from ChatGPT
		    return json.choices[0].text;
		  } catch (error) {
		    // Display an error message indicating that the response could not be generated
		    response.value = "遇到錯誤：" + error;
		  }
		}
