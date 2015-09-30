#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;

    vec4 color = vec4(0.);
	color.x += 0.5;
	color.y += 0.;
	color.z += 0.;
	color.w += 0.;

	color.r += 0.;
	color.g += 0.;
	color.b += 0.;
	color.a += 0.;

	color.s += 0.;
	color.t += 0.;
	color.p += 0.;
	color.q += 0.;

	color[0] += 0.;
	color[1] += 0.;
	color[2] += 0.;
	color[3] += 0.;

	gl_FragColor = color;
	gl_FragColor.a = 1.0;
}