
function runChatGPT(index, messages, funcResult)
{
	var apikey = document.getElementById("apikey_config").value;
	var lang = document.getElementById("language_config").value;

	var dataToChatGPT = {
		model: "gpt-3.5-turbo",
		messages: messages
	};

	$.ajax({
		type: "POST",
		url:  "https://api.openai.com/v1/chat/completions",
		data: JSON.stringify(dataToChatGPT),
		contentType: "application/json; charset=utf-8",
		headers: {
			'Authorization': 'Bearer '+apikey
		},
		success: function(data)
		{
			funcResult(index, data.choices[0].message, null);
		},
		error: function(data)
		{
			funcResult(index, null, "ChatGPT error: "+data.responseJSON.error.message);
		}
	});
}
