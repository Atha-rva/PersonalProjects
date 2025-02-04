// Matter.js module aliases
const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Events = Matter.Events,
      Body = Matter.Body;

// Create an engine
const engine = Engine.create();
const world = engine.world;

// Create a renderer
const render = Render.create({
    element: document.body,
    canvas: document.getElementById('bubbleCanvas'),
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent'
    }
});

Render.run(render);

// Create a runner
const runner = Runner.create();
Runner.run(runner, engine);

// Function to create a bubble
function createBubble(x, y, radius) {
    return Bodies.circle(x, y, radius, {
        restitution: 0.9,
        render: {
            fillStyle: `hsl(${Math.random() * 360}, 100%, 50%)`
        }
    });
}

// Create multiple bubbles
const bubbles = [];
for (let i = 0; i < 10; i++) {
    const radius = Math.random() * 30 + 20;
    const bubble = createBubble(Math.random() * window.innerWidth, Math.random() * window.innerHeight, radius);
    bubbles.push(bubble);
}

// Add bubbles to the world
Composite.add(world, bubbles);

// Handle window resize
window.addEventListener('resize', () => {
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;
});

// Function to handle collisions and reshaping
Events.on(engine, 'collisionStart', event => {
    event.pairs.forEach(pair => {
        const { bodyA, bodyB } = pair;
        Body.scale(bodyA, 1.05, 1.05);
        Body.scale(bodyB, 1.05, 1.05);
    });
});
