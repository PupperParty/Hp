hedwig = "Hedwig.mp3";
pp = "PP.mp3";
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";
scoreleftWrist = 0;
song_status = "";

function preload() {
    hedwig = loadSound("Hedwig.mp3");
    pp = loadSound("PP.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video, 0, 0, 600, 500);
    
    fill("#08FF08");
    stroke("#08FF08");
   song_status = pp.isPlaying();
   
   if(scoreLeftWrist > 0.2) {
    circle(leftWristX, leftWristY, 20);
    hedwig.stop();
    if(song_status = false) {
        song_status = pp.isPlaying();
        document.getElementById("played_song").innerHTML = "Song playing : Peter Pan Theme";
       }
   }
   
}
function play(){
    song.play();
}
function modelLoaded(){
    console.log('Posenet is Initialized');
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

    }
}
