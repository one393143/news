const AP = 'sk-FVLY9ZnovgWpGJ'
const I_ = 'CHpQT8T3BlbkFJYsO'
const input = document.querySelector('#input');
const submit = document.querySelector('#submit');
const response = document.querySelector('#response');
const KEY = 'Mu0j4KHBa3Y0ryZ2J';
const API_KEY = AP + I_ + KEY;
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
	response.value = "回答中...";
	try {
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
		const json = await apiResponse.json();
		return json.choices[0].text;
	} catch (error) {
		response.value = "遇到錯誤：" + error;
	}
}
