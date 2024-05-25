// create worker for drawing
// that worker communicates with another worker that calculates the physics
// calculate collisions separately?
// collision force and other collisions separate
// 3 threads technically
// decouples physics and draw

// use momentum to calculate forces in collisions

const canvas = document.getElementById('canvas');
const ctx = (canvas as HTMLCanvasElement).getContext('bitmaprenderer');

async function index_main() {
    // define workers
    const drawWorker = new Worker('./draw.ts');
    const drawCanvas = new OffscreenCanvas(1, 1);
    await Promise.all([new Promise((resolve) => {
        drawWorker.postMessage(drawCanvas, [drawCanvas]);
        drawWorker.onmessage = resolve;
    })]);
    drawWorker.onmessage = () => {
        // idk yet
    };
    window.addEventListener('resize', () => {
    });
}

index_main();