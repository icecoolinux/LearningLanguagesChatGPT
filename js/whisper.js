
function runWhisper(index, audioAsblob, funcResult)
{
	var apikey = document.getElementById("apikey_config").value;
	var lang = document.getElementById("language_config").value;

	var form = new FormData();
	form.append("file", audioAsblob, "audio.webm");
    form.append('model', 'whisper-1');
	form.append('language', lang);
	form.append('temperature', 0.2);

	$.ajax({
		type: "POST",
		url:  "https://api.openai.com/v1/audio/transcriptions",
		data: form,
		processData: false,
		contentType: false,
		headers: {
			'Authorization': 'Bearer '+apikey
		},
		success: function(data)
		{
			funcResult(index, data.text, null);
		},
		error: function(data)
		{
			funcResult(index, null, "Whisper error: "+data.responseJSON.error.message);
		}
	});
}
