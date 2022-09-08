img = "";
Status = '';
objects = [];

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO)
    video.hide();
    video.size(380, 380)
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: COCOSSD Model Has started detecting objects! Please wait a bit for the mAgIc to begin!";
    document.getElementById("start_model").innerHTML = "Scanning started...";
}

function draw()
{
    image(video, 0, 0, 380, 380);
    
    r = Math.round(random(0, 255));
    g = Math.round(random(0, 255));
    b = Math.round(random(0, 255));

    if(Status != '')
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("object_number").innerHTML = "COCOSSD can 👀 " + objects.length + " objects.";
            percent = floor(objects[i].confidence * 100)
            fill(r, g, b)
            textSize(18)
            textFont("segoe UI")
            text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+30);
            noFill();
            stroke(r, g, b)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded()
{
    console.log("Model is Loaded!");
    Status = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error)
    }
    
    console.log(results);
    objects = results;
}