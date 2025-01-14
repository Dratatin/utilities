<script lang="ts">
    // import SoundSvg from '../svg/sound.svelte';
    import PlaySvg from '../svg/play.svelte';
    import PauseSvg from '../svg/pause.svelte';
    import RestartSvg from '../svg/restart.svelte';

    // let inputHours = $state(0);
    // let inputMinutes = $state(0);
    // let inputSeconds = $state(0);

    let hours = $state("00");
    let minutes = $state("00");
    let seconds = $state("00");
    let miliseconds = $state("00");

    let playState: "play" | "pause" | "reset" | null = $state(null);

    let interval: ReturnType<typeof setInterval> | null = null;

    function startCounter() {
        if (!interval) {
            playState = "play";
            interval = setInterval(() => {
                miliseconds = (parseInt(miliseconds) + 1).toString().padStart(2, '0');
                if (miliseconds === '100') {
                    miliseconds = '00';
                    seconds = (parseInt(seconds) + 1).toString().padStart(2, '0');
                }
                if (seconds === '60') {
                    seconds = '00';
                    minutes = (parseInt(minutes) + 1).toString().padStart(2, '0');
                }
                if (minutes === '60') {
                    minutes = '00';
                    hours = (parseInt(hours) + 1).toString().padStart(2, '0');
                }
            }, 10);
        }
    }

    function stopCounter() {
        if (interval) {
            playState = "pause";
            clearInterval(interval);
            interval = null;
        }
    }

    function restartCounter() {
        stopCounter();
        playState = "reset";
        hours = "00";
        minutes = "00";
        seconds = "00";
        miliseconds = "00";

        // inputHours = 0;
        // inputMinutes = 0;
        // inputSeconds = 0;
    }

    // function handleTimeChange(e: Event) {
    //     const target = e.target as HTMLInputElement;
    //     switch (target.name) {
    //         case "hours":
    //             hours = target.value;
    //             break;
    //         case "minutes":
    //             minutes = target.value;
    //             break;
    //         case "seconds":
    //             seconds = target.value;
    //             break;
    //         default:
    //             break;
    //     }
    // }
</script>


<style>
    /* Animations des aiguilles */
    .seconds {
      animation: rotateSeconds 60s linear infinite;
      transform-origin: 100px 100px;
    }

    .minutes {
      animation: rotateMinutes 3600s linear infinite;
      transform-origin: 100px 100px;
    }

    .hours {
      animation: rotateHours 43200s linear infinite;
      transform-origin: 100px 100px;
    }

    svg .seconds, 
    svg .minutes, 
    svg .hours,
    svg.pause .seconds, 
    svg.pause .minutes, 
    svg.pause .hours {
        animation-play-state: paused;
    }

    svg.play .seconds, 
    svg.play .minutes, 
    svg.play .hours {
        animation-play-state: running;
    }

    svg.reset .seconds, 
    svg.reset .minutes, 
    svg.reset .hours {
        animation: none;
    }

    /* Clés d'animation */
    @keyframes rotateSeconds {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes rotateMinutes {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes rotateHours {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
</style>

<div class="flex flex-col items-center gap-5">
    <h2 class="text-xl">Stopwatch</h2>
    <svg width="200" height="200" class="{playState}" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Fond de l'horloge -->
        <path d="M100 195C152.467 195 195 152.467 195 100C195 47.5329 152.467 5 100 5C47.5329 5 5 47.5329 5 100C5 152.467 47.5329 195 100 195Z" fill="#F5F5F5" stroke="black" stroke-width="2"/>
        
        <!-- Marques horaires -->
        <path d="M100 10V20" stroke="black" stroke-width="2"/>
        <path d="M145 22L140 30.6603" stroke="black" stroke-width="2"/>
        <path d="M140 169L145 177.66" stroke="black" stroke-width="2"/>
        <path d="M55 22L60 30.6603" stroke="black" stroke-width="2"/>
        <path d="M60 169L55 177.66" stroke="black" stroke-width="2"/>
        <path d="M30.6603 140L22 145" stroke="black" stroke-width="2"/>
        <path d="M30.6603 60L22 55" stroke="black" stroke-width="2"/>
        <path d="M169 140L177.66 145" stroke="black" stroke-width="2"/>
        <path d="M169 60L177.66 55" stroke="black" stroke-width="2"/>
        <path d="M100 190V180" stroke="black" stroke-width="2"/>
        <path d="M10 100H20" stroke="black" stroke-width="2"/>
        <path d="M190 100H180" stroke="black" stroke-width="2"/>
        
        <!-- Aiguille des secondes (rouge) -->
        <line class="seconds" x1="100" y1="100" x2="100" y2="30" stroke="#FF0000" stroke-width="2">
        </line>
        
        <!-- Aiguille des minutes (noire, épaisse) -->
        <line class="minutes" x1="100" y1="100" x2="100" y2="40" stroke="black" stroke-width="4">
        </line>
        
        <!-- Aiguille des heures (noire, plus courte et épaisse) -->
        <line class="hours" x1="100" y1="100" x2="100" y2="60" stroke="black" stroke-width="6">
        </line>
        
        <!-- Centre de l'horloge -->
        <circle cx="100" cy="100" r="5" fill="black"/>
    </svg>             
    <div class="text-4xl">
        <span>{hours.padStart(2, '00')}</span>:<span>{minutes.padStart(2, '00')}</span>:<span>{seconds.padStart(2, '00')}</span>:<span>{miliseconds.padStart(2, '00')}</span>
    </div>
    <div class="flex flex-col gap-4 w-full">
        <!-- <form class="flex gap-2" onchange="{handleTimeChange}">
            <label class="flex flex-col gap-2">
                Heures
                <input type="number" name="hours" class="bg-primmary text-primary px-4 py-2 rounded-lg w-24" placeholder="24" defaultValue="0" bind:value={inputHours} max=24/>
            </label>
            <label class="flex flex-col gap-2">
                Minutes
                <input type="number" name="minutes" class="bg-primmary text-primary px-4 py-2 rounded-lg w-24" placeholder="60" defaultValue="0" bind:value={inputMinutes} max=60/>
            </label>
            <label class="flex flex-col gap-2">
                Secondes
                <input type="number" name="seconds" class="bg-primmary text-primary px-4 py-2 rounded-lg w-24" placeholder="60" defaultValue="0" bind:value={inputSeconds} max=60/>
            </label>
        </form> -->
        <div class="flex gap-2 justify-between">
            <!-- <button class="flex-1 flex items-center justify-center bg-primary px-4 py-2 rounded-lg hover:bg-tertiary" aria-label="Alerte">
                <span class="w-5 h-5 flex items-center justify-center text-light">
                    <SoundSvg />
                </span>
            </button> -->
            <button class="flex-1 flex items-center justify-center px-4 py-2 rounded-lg hover:bg-tertiary {playState == "play" ? "bg-tertiary" : "bg-primary"}" aria-label="Start" onclick={startCounter}>
                <span class="w-4 h-4 flex items-center justify-center text-light">
                    <PlaySvg />
                </span>
            </button>
            <button class="flex-1 flex items-center justify-center bg-primary px-4 py-2 rounded-lg hover:bg-tertiary {playState == "pause" ? "bg-tertiary" : "bg-primary"}" aria-label="Pause" onclick={stopCounter}>
                <span class="w-4 h-4 flex items-center justify-center text-light">
                    <PauseSvg />
                </span>
            </button>
            <button class="flex-1 flex items-center justify-center bg-primary px-4 py-2 rounded-lg hover:bg-tertiary" aria-label="Restart" onclick={restartCounter}>
                <span class="w-5 h-5 flex items-center justify-center text-light">
                    <RestartSvg />
                </span>
            </button>
        </div>
    </div>
</div>