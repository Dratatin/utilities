<script lang="ts">
    import Stopwatch from '../components/stopwatch.svelte';
    
    let projectTitle = 'Utilities';
</script>

<div class="font-sans bg-dark text-light min-h-screen p-5">
    <h1 class="text-2xl mb-5">{projectTitle}</h1>
    <div class="flex">
        <div class="p-5 bg-secondary rounded-lg">
            <Stopwatch />
        </div>
    </div>
    <a href="https://www.svgrepo.com/collection/solar-bold-icons" class="underline text-light absolute bottom-10 left-10">icon librairy </a>
</div>
