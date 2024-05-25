interface Particle {
    readonly x: number,
    readonly y: number,
    readonly dx: number,
    readonly dy: number,
    readonly d2x: number,
    readonly d2y: number,
    readonly r: number,
    readonly m: number
}

async function draw_main(c) {
    const canvas: OffscreenCanvas = c;
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;

    // center of camera and 1meter:1pixel scale
    const camera = {
        x: 0,
        y: 0,
        scale: 0.01
    };
    const particles: Particle[] = [];

    function draw() {
        // canvas already cleared when width/height set
        ctx.resetTransform();
    }

    // tick containing new physics data (may not always be new data, draw/update decoupled)
    onmessage = (data) => {
        camera.x = data.data.camera.x;
        camera.y = data.data.camera.x;
        camera.scale = data.data.camera.scale;
        canvas.width = data.data.camera.width;
        canvas.height = data.data.camera.height;
        particles.length = 0;
        particles.push(...data.data.particles);
        draw();
    };

    postMessage(true);
}

onmessage = draw_main;