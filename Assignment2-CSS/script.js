document.addEventListener("DOMContentLoaded", function(event) {
    b = document.getElementById('b');
    sk = document.getElementById('skLabel');
    seekBar = document.getElementById('seek-bar');
    seekBar.addEventListener('input', function() {
        let seekTo = a.duration * (seekBar.value / 100);
        // a.currentTime = seekTo;
        updateLyricsDisplay(seekTo);
    });
    setInterval(function() {
        seekBar.value = (a.currentTime / a.duration) * seekBar.max; 
        sk.textContent = convertSecondsToTimestamp(a.currentTime);
    }, 10);
});

var t = null;
const lyrics = [
    "[00:00.44]Get up on the floor",
    "[00:02.41]Dancing all night long",
    "[00:04.42]Get up on the floor",
    "[00:06.38]Dancing to the break of dawn",
    "[00:08.41]Get up on the floor",
    "[00:10.40]Dancing to the break of dawn",
    "[00:12.42]Get up on the floor",
    "[00:14.61]Dancing",
    "[00:16.43]All the time",
    "[00:17.77]My baby, your on my mind",
    "[00:19.86]And I don't know why",
    "[00:22.07]Yeah, but the feeling is fine",
    "[00:24.22]Can't you see",
    "[00:25.75]Honey you are for me, oh",
    "[00:28.51]We were meant to be, yeah",
    "[00:32.41]Dancing in the moonlight",
    "[00:36.94]Gazing at the stars so bright",
    "[00:40.49]Holding you until the sunrise",
    "[00:44.46]Sleeping until the midnight",
    "[00:48.61]Get up on the floor",
    "[00:50.51]Dancing all night long",
    "[00:52.86]Get up on the floor",
    "[00:54.62]Dancing 'til the break of dawn",
    "[00:56.56]Get up on the floor",
    "[00:58.49]Dancing 'til the break of dawn",
    "[01:00.46]Get up on the floor",
    "[01:03.13]Dancing",
    "[01:03.37]Dancing is what to do",
    "[01:06.47]Dancing's when I think of you",
    "[01:08.46]Dancing's what clears my soul",
    "[01:10.41]Dancing's what makes me whole",
    "[01:12.38]Dancing is what to do",
    "[01:14.38]Dancing's when I think of you",
    "[01:16.38]Dancing's what clears my soul",
    "[01:18.45]Dancing's what makes me whole",
    "[01:20.45]Every time when I look in your eyes",
    "[01:24.73]I smile with pride, happy that you're mine",
    "[01:28.42]Joy in love, your love is true I know",
    "[01:32.74]You are the best thing that has happened to me",
    "[01:36.44]Get up on the floor",
    "[01:38.44]Dancing all night long",
    "[01:40.45]Get up on the floor",
    "[01:42.56]Dancing 'til the break of dawn",
    "[01:44.44]Get up on the floor",
    "[01:46.33]Dancing 'til the break of dawn",
    "[01:48.43]Get up on the floor",
    "[01:51.36]Dancing",
    "[01:52.44]Dancing is what to do",
    "[01:54.39]Dancing's when I think of you",
    "[01:56.40]Dancing's what clears my soul",
    "[01:58.42]Dancing's what makes me whole",
    "[02:00.38]Dancing is what to do",
    "[02:02.41]Dancing's when I think of you",
    "[02:04.43]Dancing's what clears my soul",
    "[02:06.43]Dancing's what makes me whole",
    "[02:08.42]Get up on the floor",
    "[02:10.45]Dancing all night long",
    "[02:12.53]Get up on the floor",
    "[02:14.74]Dancing 'til the break of dawn",
    "[02:17.02]Get up on the floor",
    "[02:18.79]Dancing 'til the break of dawn",
    "[02:21.05]Get up on the floor",
    "[02:21.27]Dancing (oh)",
    "[02:24.41]Get up on the floor",
    "[02:27.08]Dancing all night long",
    "[02:29.07]Get up on the floor",
    "[02:31.31]Dancing 'til the break of dawn",
    "[02:32.84]Get up on the floor",
    "[02:35.09]Dancing 'til the break of dawn",
    "[02:36.81]Get up on the floor",
    "[02:39.34]Dancing (oh)",
    "[02:41.17]Dancing is what to do",
    "[02:42.83]Dancing's when I think of you",
    "[02:44.77]Dancing's what clears my soul",
    "[02:46.70]Dancing's what makes me whole",
    "[02:48.80]Dancing is what to do",
    "[02:50.51]Dancing's when I think of you",
    "[02:52.77]Dancing's what clears my soul",
    "[02:54.79]Dancing's what makes me whole",
    "[02:56.84]Dancing is what to do",
    "[02:58.44]Dancing's when I think of you",
    "[03:00.52]Dancing's what clears my soul",
    "[03:02.57]Dancing's what makes me whole",
    "[03:04.58]Dancing is what to do",
    "[03:06.75]Dancing's when I think of you",
    "[03:11.06]Dancing's what makes me whole",
    "[03:08.91]Dancing's what clears my soul"
];  

var a = new Audio('audio/dancing.mp4'), b = null, seekBar = null;
var sk = null;

function play() {
    a.play();
    b.onclick = pause;
    displayLyrics();
    // Add class to body to start disco animation
    document.body.classList.add('disco');
    // Add class to disco ball to start its animation
    document.getElementById('discoBall').classList.add('disco-active');
}

function pause() {
    clearTimeout(t);
    a.pause();
    b.onclick = play;
    // Remove class from body to stop disco animation
    document.body.classList.remove('disco');
    // Remove class from disco ball to stop its animation
    document.getElementById('discoBall').classList.remove('disco-active');

}


function updateLyricsDisplay(currentTime) {
    currentIndex = findLyricIndexByTime(currentTime);
    clearTimeout(t);
    displayLyrics(a.currentTime);
}

function findLyricIndexByTime(currentTime) {
    for (let i = 0; i < lyrics.length; i++) {
        let lyricTiming = parseLyricTiming(lyrics[i], true);
        if (lyricTiming && lyricTiming.timestamp > currentTime) {
            a.currentTime = lyricTiming.timestamp;
            return Math.max(i - 1, 0);
        }
    }
    return lyrics.length - 1;
}



const lyricsSection = document.getElementById('lyrics');
let currentIndex = 0;
let r = 0;
function displayLyrics(time = 0) {


    if (currentIndex < lyrics.length) {
        let lyricLine = lyrics[currentIndex];
        let nextLyricLine = lyrics[currentIndex + 1];
        let lyricTiming = parseLyricTiming(lyricLine);
        let nextLyricTiming = nextLyricLine ? parseLyricTiming(nextLyricLine) : null;

        let isRomantic = isRomanticLyric(lyricLine);
        let isDancing = isDancingLyric(lyricLine);
        let isSuperFastDisco = diff2.includes(lyricLine);

        if (isSuperFastDisco) {
            document.body.style.animation = 'flashyBackground 0.1s infinite alternate'; 
        } else {
            document.body.style.animation = '';
        }

        if (isRomantic) {
            lyricsSection.classList.add('romantic');
            lyricsSection.classList.remove('dancing');
            lyricsSection.style.animation = 'romanticBackground 5s ease infinite';
        } else if (isDancing) {
            lyricsSection.classList.add('dancing');
            lyricsSection.classList.remove('romantic');
        } else {
            lyricsSection.classList.remove('dancing');
            lyricsSection.classList.remove('romantic');
            lyricsSection.style.animation = ''; 
        }



        if (isRomanticLyric(lyricLine)) {
            document.body.classList.add('romantic-lyric');
        } else {
            document.body.classList.remove('romantic-lyric');
        }


            if (diff2.includes(lyricLine)) {
        document.body.classList.add('flashy');
    } else {
        document.body.classList.remove('flashy');
    }



        if (diff.includes(lyricLine)) {
            lyricsSection.innerHTML = `<img src="img/heart.jpeg" width="90" height="90"> ${lyricLine.substring(10)} <img src="img/moon.gif" width="90" height="90"> `;
        } else if (diff2.includes(lyricLine)) {

            lyricsSection.innerHTML = `<img src="img/dance5.gif"  width="120" height="120"> ${lyricLine.substring(10)} <img src="img/dance6.gif" width="120" height="120""> `;
        } else {

            lyricsSection.innerHTML = `<img src="img/Dance2.gif" width="90" height="90"> ${lyricLine.substring(10)} <img src="img/dance7.gif" width="90" height="90"> `;
        }

        let duration = (nextLyricTiming && nextLyricTiming.timestamp) ? nextLyricTiming.timestamp - lyricTiming.timestamp : 5000; 

        currentIndex++;

        r = (r + 1) % 3;
        lyricsSection.style.animation = `anim${r} ${duration / 1000}s forwards`;
        if (time) {
            time -= nextLyricTiming;
        }
        t = setTimeout(displayLyrics, duration - time);
    }
}


function convertSecondsToTimestamp(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    let formattedSeconds = remainingSeconds.toFixed(2).padStart(5, '0');
    return `[${minutes.toString().padStart(2, '0')}:${formattedSeconds}]`;
}

const diff = [
    "[00:16.43]All the time",
    "[00:17.77]My baby, your on my mind",
    "[00:19.86]And I don't know why",
    "[00:22.07]Yeah, but the feeling is fine",
    "[00:24.22]Can't you see",
    "[00:25.75]Honey you are for me, oh",
    "[00:28.51]We were meant to be, yeah",
    "[00:32.41]Dancing in the moonlight",
    "[00:36.94]Gazing at the stars so bright",
    "[00:40.49]Holding you until the sunrise",
    "[00:44.46]Sleeping until the midnight",
    "[01:20.45]Every time when I look in your eyes",
    "[01:24.73]I smile with pride, happy that you're mine",
    "[01:28.42]Joy in love, your love is true I know",
    "[01:32.74]You are the best thing that has happened to me"
];

const diff2 = [
    "[01:03.37]Dancing is what to do",
    "[01:06.47]Dancing's when I think of you",
    "[01:08.46]Dancing's what clears my soul",
    "[01:10.41]Dancing's what makes me whole",
    "[01:12.38]Dancing is what to do",
    "[01:14.38]Dancing's when I think of you",
    "[01:16.38]Dancing's what clears my soul",
    "[01:18.45]Dancing's what makes me whole",
    "[01:52.44]Dancing is what to do",
    "[01:54.39]Dancing's when I think of you",
    "[01:56.40]Dancing's what clears my soul",
    "[01:58.42]Dancing's what makes me whole",
    "[02:00.38]Dancing is what to do",
    "[02:02.41]Dancing's when I think of you",
    "[02:04.43]Dancing's what clears my soul",
    "[02:06.43]Dancing's what makes me whole",
    "[02:39.34]Dancing (oh)",
    "[02:41.17]Dancing is what to do",
    "[02:42.83]Dancing's when I think of you",
    "[02:44.77]Dancing's what clears my soul",
    "[02:46.70]Dancing's what makes me whole",
    "[02:48.80]Dancing is what to do",
    "[02:50.51]Dancing's when I think of you",
    "[02:52.77]Dancing's what clears my soul",
    "[02:54.79]Dancing's what makes me whole",
    "[02:56.84]Dancing is what to do",
    "[02:58.44]Dancing's when I think of you",
    "[03:00.52]Dancing's what clears my soul",
    "[03:02.57]Dancing's what makes me whole",
    "[03:04.58]Dancing is what to do",
    "[03:06.75]Dancing's when I think of you",
    "[03:11.06]Dancing's what makes me whole",
    "[03:08.91]Dancing's what clears my soul"
];

function isRomanticLyric(lyricLine) {
    return diff.includes(lyricLine);
}

function isDancingLyric(lyricLine) {
    return diff2.includes(lyricLine);
}

function parseLyricTiming(lyricLine, secs = false) {
    let timestamp = lyricLine.match(/\[(\d+:\d+\.\d+)\]/);
    if (timestamp) {
        let timeParts = timestamp[1].split(':');
        let minutes = parseInt(timeParts[0], 10);
        let seconds = parseFloat(timeParts[1]);
        if (secs) return {
            timestamp: minutes * 60 + seconds
        };
        else return {
            timestamp: minutes * 60 * 1000 + seconds * 1000
        };
    }
    return null;
}
