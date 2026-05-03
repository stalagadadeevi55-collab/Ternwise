import { useEffect, useRef } from 'react'

const vertexSource = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const fragmentSource = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

float sdEllipse(vec2 p, vec2 r) {
  vec2 q = p / r;
  return (length(q) - 1.0) * min(r.x, r.y);
}

float ring(vec2 p, float radius, float width) {
  return abs(length(p) - radius) - width;
}

float cloudBand(vec2 p, float y, float speed, float scale) {
  float x = p.x * scale + u_time * speed;
  float base = exp(-pow((p.y - y) * 4.0, 2.0));
  float puff =
    sin(x * 2.1) * 0.5 +
    sin(x * 3.7 + 1.8) * 0.28 +
    sin(x * 6.2 - 0.7) * 0.14;
  return smoothstep(0.12, 0.82, base + puff * 0.28);
}

float grassBlade(vec2 p, float x, float h, float w, float sway, float lean) {
  float y = p.y + 0.68;
  float center = x + lean * y + sin(u_time * 1.2 + x * 9.0) * sway * y;
  float shape = 1.0 - smoothstep(w, w * 2.8, abs(p.x - center));
  float height = smoothstep(h, h - 0.08, y);
  float root = smoothstep(0.0, 0.12, y);
  return shape * height * root;
}

vec2 rotate(vec2 p, float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c) * p;
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  vec2 p = uv;
  float angle = atan(p.y, p.x);
  float irregularRadius =
    0.70 +
    sin(angle * 3.0 + 0.6) * 0.025 +
    sin(angle * 5.0 - 1.4) * 0.018 +
    sin(angle * 8.0 + u_time * 0.18) * 0.009;

  vec3 sky = vec3(0.48, 0.82, 0.98);
  vec3 aqua = vec3(0.22, 0.74, 0.78);
  vec3 sea = vec3(0.05, 0.36, 0.50);
  vec3 sun = vec3(1.0, 0.78, 0.27);
  vec3 coral = vec3(1.0, 0.44, 0.34);
  vec3 ink = vec3(0.06, 0.20, 0.28);
  vec3 white = vec3(1.0, 0.99, 0.94);

  float vignette = smoothstep(1.05, 0.08, length(p));
  vec3 color = mix(sky, aqua, vignette * 0.58);

  float glow = 1.0 - smoothstep(0.0, 0.62, length(p));
  color = mix(color, sun, glow * 0.68);

  float horizon = smoothstep(-0.05, -0.48, p.y);
  color = mix(color, coral, horizon * 0.16);

  float cloud1 = cloudBand(p + vec2(0.0, 0.03), -0.28, 0.055, 2.1);
  float cloud2 = cloudBand(p + vec2(0.42, 0.0), -0.12, -0.035, 2.6);
  float cloud3 = cloudBand(p + vec2(-0.25, 0.0), 0.10, 0.025, 3.0);
  float clouds = clamp(cloud1 * 0.62 + cloud2 * 0.44 + cloud3 * 0.28, 0.0, 1.0);
  color = mix(color, white, clouds * 0.36);
  color = mix(color, vec3(1.0, 0.68, 0.44), cloud1 * 0.16);

  float softRim = 1.0 - smoothstep(0.58, 0.72, length(p));
  color = mix(color, white, softRim * 0.04);

  vec2 bird = p + vec2(0.00, -0.02);
  vec2 leftWing = rotate(bird - vec2(-0.25, 0.07), -0.22);
  vec2 rightWing = rotate(bird - vec2(0.23, 0.08), 0.28);
  float wingA = smoothstep(0.012, 0.0, sdEllipse(leftWing, vec2(0.38, 0.055)));
  float wingB = smoothstep(0.012, 0.0, sdEllipse(rightWing, vec2(0.40, 0.052)));
  float body = smoothstep(0.012, 0.0, sdEllipse(rotate(bird + vec2(0.00, -0.03), -0.02), vec2(0.18, 0.042)));
  float head = smoothstep(0.010, 0.0, sdEllipse(bird - vec2(0.18, 0.005), vec2(0.052, 0.038)));
  float beak = smoothstep(0.010, 0.0, sdEllipse(rotate(bird - vec2(0.245, 0.0), -0.08), vec2(0.050, 0.012)));
  float tailA = smoothstep(0.010, 0.0, sdEllipse(rotate(bird + vec2(-0.21, -0.045), 0.52), vec2(0.12, 0.018)));
  float tailB = smoothstep(0.010, 0.0, sdEllipse(rotate(bird + vec2(-0.21, 0.005), -0.42), vec2(0.12, 0.018)));
  float tern = max(max(max(wingA, wingB), max(body, head)), max(beak, max(tailA, tailB)));
  float cap = smoothstep(0.006, 0.0, sdEllipse(bird - vec2(0.18, 0.026), vec2(0.046, 0.014)));
  color = mix(color, white, tern);
  color = mix(color, ink, cap);
  color = mix(color, coral, beak * 0.9);

  float grass = 0.0;
  grass += grassBlade(p, -0.58, 0.40, 0.008, 0.035, 0.10);
  grass += grassBlade(p, -0.47, 0.55, 0.007, 0.030, -0.05);
  grass += grassBlade(p, -0.36, 0.47, 0.009, 0.040, 0.08);
  grass += grassBlade(p, -0.25, 0.62, 0.007, 0.034, -0.10);
  grass += grassBlade(p, -0.12, 0.50, 0.009, 0.038, 0.03);
  grass += grassBlade(p, 0.02, 0.64, 0.007, 0.030, -0.08);
  grass += grassBlade(p, 0.16, 0.48, 0.009, 0.036, 0.11);
  grass += grassBlade(p, 0.29, 0.58, 0.008, 0.032, -0.04);
  grass += grassBlade(p, 0.42, 0.44, 0.009, 0.035, 0.07);
  grass += grassBlade(p, 0.54, 0.52, 0.007, 0.029, -0.12);
  grass = clamp(grass, 0.0, 1.0);
  float grassZone = smoothstep(-0.08, -0.55, p.y) * smoothstep(0.72, 0.40, length(p));
  color = mix(color, vec3(0.08, 0.47, 0.34), grass * grassZone * 0.82);
  color = mix(color, vec3(0.64, 0.86, 0.48), grass * grassZone * 0.32);

  float ember = smoothstep(0.02, 0.0, sdEllipse(p - vec2(0.38, -0.35), vec2(0.032, 0.032)));
  color = mix(color, coral, ember);

  float outer = smoothstep(irregularRadius + 0.05, irregularRadius - 0.06, length(p));
  float alpha = 1.0 - smoothstep(irregularRadius - 0.025, irregularRadius + 0.035, length(p));
  color = mix(color, sea, (1.0 - outer) * 0.16);

  gl_FragColor = vec4(color, alpha);
}
`

function compileShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader))
  }
  return shader
}

export function ShaderLogo({ label = 'Ternwise animated shader logo' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl', { alpha: true, antialias: true })

    if (!gl) {
      return undefined
    }

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource)
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource)
    const program = gl.createProgram()

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program))
    }

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    )

    const positionLocation = gl.getAttribLocation(program, 'a_position')
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
    const timeLocation = gl.getUniformLocation(program, 'u_time')
    let frameId

    const render = (time) => {
      const size = canvas.getBoundingClientRect()
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      const width = Math.floor(size.width * pixelRatio)
      const height = Math.floor(size.height * pixelRatio)

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }

      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)
      gl.enableVertexAttribArray(positionLocation)
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform1f(timeLocation, time * 0.001)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      frameId = requestAnimationFrame(render)
    }

    frameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frameId)
      gl.deleteBuffer(positionBuffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
    }
  }, [])

  return <canvas ref={canvasRef} className="shaderLogo" aria-label={label} role="img" />
}
