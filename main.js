var camera = document.getElementById("camera");
Webcam.attach(camera);

Webcam.set({
    width: 350,
    height: 250,
    image_format: "png",
    png_quality: 1000000
});

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id= "captured_image" src= "' + data_uri + '">';
    });
}

console.log("ml5 version" , ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ymWN_N_yM/model.json' , modelLoaded);

function modelLoaded() {
    console.log("Model loaded!!!");
}

function check() {
    var img = document.getElementById("captured_image");
    classifier.classify(img , gotResult);
}

var prediction_1 = "";
var prediction_2 = "";

/*function speak123() {
    synth = window.SpeechSynthesis;
    var speak1 = "The first prediction is " + a;
    var speak2 = "The second prediction is " + b;
    var utter = new SpeechSynthesisUtterance(speak1 + speak2);
    synth.speak(utter);*/

    function speak123() { 
        var synth = window.speechSynthesis; 
        speak_data_1 = "The first prediction is " + prediction_1; 
        speak_data_2 = "And the second prediction is " + prediction_2; 
        var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2); 
        synth.speak(utterThis); 
     }

function gotResult(error , results) {
    if(error) {
        console.error("Error🚷🚷🚷");
        console.log("Error🚷🚷🚷");
        window.alert("Error🚷🚷🚷");
    }
    
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;

        speak123();

        if (results[0].label == "Angry") {
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }

        if (results[0].label == "Sad") {
            document.getElementById("update_emoji").innerHTML = "&#128546;";
        }

        if (results[0].label == "Happy") {
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }

        if (results[1].label == "Angry") {
            document.getElementById("update_emoji2").innerHTML = "&#128548;";
        }

        if (results[1].label == "Sad") {
            document.getElementById("update_emoji2").innerHTML = "&#128546;";
        }

        if (results[1].label == "Happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        }
    }
}

