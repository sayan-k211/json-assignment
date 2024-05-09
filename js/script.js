// For Font Awesome Icon
document.write('<script src="https://kit.fontawesome.com/c5170c6b65.js" crossorigin="anonymous"> </script>');

// Variable to keep track of the currently spoken text
let currentSpeech = null;

// Function to speak out the provided text
function speakText(text) {
    // If speech is already in progress then to cancel it
    if (window.speechSynthesis.speaking) {
        speechSynthesis.cancel();
        // If the current speech is the same as the new one then to return without speaking again
        if (currentSpeech === text) {
            currentSpeech == null;
            return;
        }
    }
    // Creating a new SpeechSynthesisUtterance object with the provided text
    const speech = new SpeechSynthesisUtterance(text);
    // Setting the current speech to the provided text
    currentSpeech = text;
    // To Speak out the text using the browser's speech synthesis
    window.speechSynthesis.speak(speech);
}

// Function to display data from a JSON file on the webpage
function DisplayData() {
    // To Fetch JSON data from 'data.json'
    fetch('js/data/data.json')
    .then(response => response.json())
    .then(
        data => {
            // To Get the container div where data will be displayed
            const displayDiv = document.getElementById('display');
            // To Iterate over each object in the JSON data
            data.forEach(
                jsonObject => {
                    // To Create a new div element to display the item's information
                    const div = document.createElement("div");
                    div.classList.add('display');
                    // To Create HTML content for the item
                    const content = `
                        <h1>${jsonObject.item}</h1>
                        <h2><strong>Object Class: </strong>${jsonObject.objectclass}</h2> <br>
                        <p><strong>Special Containment Procedures: </strong> <br> ${jsonObject.containmentinfo}</p>
                        <p><strong>Description: </strong><br>${jsonObject.description}</p>
                    `;
                    // To Create a button to read out the description
                    const speakbutton = document.createElement('button');
                    speakbutton.textContent = "Read Description";
                    // To Add event listener to the button to speak out the description when clicked
                    speakbutton.addEventListener("click", () => {
                        speakText(jsonObject.description);
                    });
                    // To Add content and button to the div
                    div.innerHTML = content;
                    div.appendChild(speakbutton);
                    // To Append the div to the container div
                    displayDiv.appendChild(div);
                }
            );
        }
    )
    // To Catch and log any errors that occur during fetching or displaying data
    .catch(error => console.error("Error fetching and displaying data: ", error))
}
