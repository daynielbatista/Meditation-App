const app = () => {

    const song = document.querySelector('.song');
    //Restart
    const refresh = document.querySelector('.refresh');
    //const refresh = document.querySelector('.refresh');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //Time Display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    console.log('timeSelect: ', timeSelect);
    //Get the length of the outline
    const outlineLength = outline.getTotalLength();
    //Duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Pick different sounds
    sounds.forEach(sound => {
        console.log('sound: ', sound);
        sound.addEventListener('click', function(){ 
            console.log('this: ', this);
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    // Play sound
    play.addEventListener("click", () => {
        checkPlaying(song);
    });

    
    //Option 3 
    refresh.addEventListener("click", function(){
        //song.play();
        song.currentTime = 0;
        //play.src = './svg/pause.svg'
        });

        
    //Select sound
    timeSelect.forEach(option =>{
        console.log('option: ', option);
        option.addEventListener('click', function(){
            fakeDuration = this.getAttribute("data-time");
            song.currentTime = 0;
            timeDisplay.textContent = `${Math.floor(fakeDuration /60)}:${Math.floor(fakeDuration % 60)}`;
            //timeDisplay.textContent = Math.floor(fakeDuration /60) +':'+Math.floor(fakeDuration % 60)
        });
    });


    //Create a function specific to stop and play the sounds
    const checkPlaying = song =>{
        if (song.paused){
            song.play();
            video.play();
            play.src = "./svg/pause.svg";
        }else{
            song.pause();
            video.pause();
            play.src = "./svg/play.svg";
        }
    };

    //We can animate the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        // Animate the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        // Animate the text
        if (minutes<10)   {
            timeDisplay.textContent = `${"0"+ minutes}:${seconds}`;
        } if (seconds<10) {
            timeDisplay.textContent = `${minutes}:${"0"+ seconds}`;
        } if (minutes<10 && seconds<10) { timeDisplay.textContent = `${"0"+minutes}:${"0"+seconds}`;}
        

        if(currentTime >= fakeDuration){
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg'
            video.pause();
        }
    };
    
};

app();