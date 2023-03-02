

var messagesElement = document.getElementById("messages");
var openConfigP = document.getElementById("open_config");
var closeConfigP = document.getElementById("close_config");
var configOptionDiv = document.getElementById("config_options");

var indexMyMessages = 1;
var indexChatGPTMessages = 1;
var messages = [];

function openConfig()
{
	openConfigP.style.display = "none";
	closeConfigP.style.display = "inline";
	configOptionDiv.style.display = "inline";
}

function closeConfig()
{
	openConfigP.style.display = "inline";
	closeConfigP.style.display = "none";
	configOptionDiv.style.display = "none";
}

function clearMessages()
{

}

function addRecord(audioAsblob)
{
	let audioElement = document.createElement("audio");
	audioElement.controls = true;
	let audioElementSource = audioElement.getElementsByTagName("source")[0];

	let sourceElement = document.createElement("source");
    audioElement.appendChild(sourceElement);
    audioElementSource = sourceElement;

	//read content of files (Blobs) asynchronously
    let reader = new FileReader();

    //once content has been read
    reader.onload = (e) => {
        //store the base64 URL that represents the URL of the recording audio
        let base64URL = e.target.result;

        //set the audio element's source using the base64 URL
        audioElementSource.src = base64URL;

        //set the type of the audio element based on the recorded audio's Blob type
        let BlobType = audioAsblob.type.includes(";") ? audioAsblob.type.substr(0, audioAsblob.type.indexOf(';')) : audioAsblob.type;
        audioElementSource.type = BlobType

        //call the load method as it is used to update the audio element after changing the source or other settings
        audioElement.load();
    };

    //read content and convert it to a URL (base64)
    reader.readAsDataURL(audioAsblob);

	// Make the div box in messages div
	let divElement = document.createElement("div");
	divElement.className = "container darker";
	divElement.appendChild(audioElement);
	let imgAvatar = document.createElement("img");
	imgAvatar.src = "./imgs/me.png";
	imgAvatar.className = "right";
	divElement.appendChild(imgAvatar);
	let textElement = document.createElement("p");
	textElement.id = "textElement"+indexMyMessages;
	textElement.innerHTML = "Loading using Whisper...";
	textElement.className = "right";
	textElement.style.marginTop = "15px";
	divElement.appendChild(textElement);
	messagesElement.appendChild(divElement);

	window.scroll(0, 9999999);

	// Lunch Whisper
	runWhisper(indexMyMessages, audioAsblob, _addTranscriptionUI);

	indexMyMessages ++;
}

function _addTranscriptionUI(index, text, error)
{
	let textElement = document.getElementById("textElement"+index);
	if(error != null)
		textElement.innerHTML = error;
	else
	{
		textElement.innerHTML = text;
		messages.push({"role": "user", "content": text});
		_getAnswer();
	}
}

function _getAnswer()
{
	// Make the div box in messages div for chatgpt response
	let divElement = document.createElement("div");
	divElement.className = "container";
	//divElement.appendChild(audioElement);
	let imgAvatar = document.createElement("img");
	imgAvatar.src = "./imgs/chatgpt.png";
	divElement.appendChild(imgAvatar);
	let textElement = document.createElement("p");
	textElement.id = "textElementChatGPT"+indexChatGPTMessages;
	textElement.innerHTML = "Loading ChatGPT answer...";
	divElement.appendChild(textElement);
	messagesElement.appendChild(divElement);

	window.scroll(0, 9999999);

	runChatGPT(indexChatGPTMessages, messages, _addAnswerUI);

	indexChatGPTMessages ++;
}

function _addAnswerUI(index, message, error)
{
	let textElement = document.getElementById("textElementChatGPT"+index);
	if(error != null)
		textElement.innerHTML = error;
	else
	{
		textElement.innerHTML = message.content;
		messages.push({"role": message.role, "content": message.content});
		_getAudio(index, message.content);
	}
}

function _getAudio(index, text)
{
	// TODO
}

function _addAudioUI()
{
	// TODO
}
