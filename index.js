document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('song');
    const loader = document.querySelector('.loader');
    const lyrics = document.querySelectorAll('.lyric-line');

    // Array con los tiempos en segundos para cada línea de la letra
    const lyricTimes = [
        0.98,   // [00:00.98]
        3.30,   // [00:03.30]
        6.15,   // [00:06.15]
        10.85,  // [00:10.85]
        15.75,  // [00:15.75]
        21.05,  // [00:21.05]
        23.38,  // [00:23.38]
        25.82,  // [00:25.82]
        30.52,  // [00:30.52]
        32.94,  // [00:32.94]
        35.38,  // [00:35.38]
        //39.90,
        41.73,  // [00:41.73]
        45.30,  // [00:45.30]
        49.42,  // [00:49.42]
        52.73,  // [00:52.73]
        59.18,  // [00:59.18]
        63.17,  // [01:03.17]
        68.35,  // [01:08.35]
        70.79,  // [01:10.79]
        75.34,  // [01:15.34]
        77.78,  // [01:17.78]
        80.07,  // [01:20.07]
        83.15,  // [01:23.15]
        87.63,  // [01:27.63]
        92.65,  // [01:32.65]
        97.94,  // [01:37.94]
        100.10, // [01:40.10]
        102.56, // [01:42.56]
        107.47, // [01:47.47]
        109.81, // [01:49.81]
        112.38, // [01:52.38]
        //116.90, // [01:56.90]
        137.46, // [02:17.46]
        140.71, // [02:20.71]
        145.33, // [02:25.33]
        150.21, // [02:30.21]
        155.47, // [02:35.47]
        158.00, // [02:38.00]
        160.29, // [02:40.29]
        165.19, // [02:45.19]
        167.52, // [02:47.52]
        169.83  // [02:49.83]
    ];

    // Verifica que el audio y el loader existan
    if (!audio || !loader) return;

    const hideLoader = () => {
        loader.style.display = 'none';
        document.body.classList.remove("not-loaded");
    };

    audio.addEventListener('loadeddata', hideLoader);
    audio.addEventListener('canplay', hideLoader);
    audio.addEventListener('canplaythrough', hideLoader);

    const backupTimeout = setTimeout(hideLoader, 5000);

    audio.addEventListener('error', () => {
        clearTimeout(backupTimeout);
        hideLoader();
    });

    let isPlaying = false;
    const handlePlayPause = () => {
        if (!isPlaying) {
            audio.play().catch(err => console.log("Esperando interacción..."));
            isPlaying = true;
        } else {
            audio.pause();
            isPlaying = false;
        }
    };

    document.body.addEventListener('click', handlePlayPause);
    document.body.addEventListener('touchstart', handlePlayPause);

    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        lyrics.forEach((lyric, index) => {
            if (currentTime >= lyricTimes[index] && currentTime < lyricTimes[index + 1]) {
                lyric.classList.add('active');
                if (index > 0) {
                    lyrics[index - 1].classList.remove('active');
                    lyrics[index - 1].classList.add('exit');
                }
            } else {
                lyric.classList.remove('active');
                lyric.classList.remove('exit');
            }
        });
    });
});
