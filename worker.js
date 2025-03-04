addEventListener('fetch', event => {
  event.respondWith(new Response(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to My LLM Hub</title>
  <style>
    body {
      font-family: sans-serif;
      margin: 0;
      overflow: hidden; /* Prevent scrollbars for background */
      background: linear-gradient(to bottom right, #24292e, #0d1117); /* Dark, modern background gradient */
      color: #f0f6fc; /* Light text color */
      display: flex;
      flex-direction: column;
      align-items: center; /* Center content horizontally */
      justify-content: center; /* Center content vertically */
      min-height: 100vh; /* Ensure full viewport height */
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Add a subtle text shadow */
    }

    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      text-align: center; /* Center the paragraph text */
      max-width: 600px; /* Limit paragraph width for readability */
    }

    a {
      display: inline-block; /* Make the link a block element for better styling */
      padding: 1rem 2rem;
      background-color: #58a6ff; /* Blue button color */
      color: #0d1117; /* Dark text on button */
      text-decoration: none;
      border-radius: 5px;
      font-size: 1.1rem;
      transition: background-color 0.3s ease; /* Smooth transition for hover effect */
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* Add a subtle button shadow */
    }

    a:hover {
      background-color: #3d8bff; /* Darker blue on hover */
    }

    .container {
      text-align: center;
    }

    /* Interactive Background Styles */
    #background-canvas {
      position: fixed; /* Cover the entire viewport */
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1; /* Place the canvas behind the content */
      pointer-events: none; /* Allow clicks to pass through the canvas */
    }
  </style>
</head>
<body>
<canvas id="background-canvas"></canvas>
<div class="container">
  <h1>Welcome to My LLM Hub</h1>
  <p>Just farting around here as Kevin would say but check this out:</p>
  <a href="https://ollama.hamids-llms.com/">Access Ollama</a>
</div>

<script>
  const canvas = document.getElementById('background-canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const lines = [];
  const numLines = 50; // Number of lines

  // Initialize lines
  for (let i = 0; i < numLines; i++) {
    lines.push({
      x1: Math.random() * canvas.width,
      y1: Math.random() * canvas.height,
      x2: Math.random() * canvas.width,
      y2: Math.random() * canvas.height,
      vx1: (Math.random() - 0.5) * 2, // Velocity x1
      vy1: (Math.random() - 0.5) * 2, // Velocity y1
      vx2: (Math.random() - 0.5) * 2, // Velocity x2
      vy2: (Math.random() - 0.5) * 2  // Velocity y2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'; // Slightly transparent white lines
    ctx.lineWidth = 1;

    for (const line of lines) {
      // Move line endpoints
      line.x1 += line.vx1;
      line.y1 += line.vy1;
      line.x2 += line.vx2;
      line.y2 += line.vy2;

      // Bounce off edges
      if (line.x1 < 0 || line.x1 > canvas.width) line.vx1 *= -1;
      if (line.y1 < 0 || line.y1 > canvas.height) line.vy1 *= -1;
      if (line.x2 < 0 || line.x2 > canvas.width) line.vx2 *= -1;
      if (line.y2 < 0 || line.y2 > canvas.height) line.vy2 *= -1;

      ctx.beginPath();
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x2, line.y2);
      ctx.stroke();
    }

    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Reset line positions (optional - you might want to keep them)
    for (const line of lines) {
        line.x1 = Math.random() * canvas.width;
        line.y1 = Math.random() * canvas.height;
        line.x2 = Math.random() * canvas.width;
        line.y2 = Math.random() * canvas.height;
    }
  });

</script>

</body>
</html>
`, {
    headers: { 'Content-Type': 'text/html' },
  }))
})
