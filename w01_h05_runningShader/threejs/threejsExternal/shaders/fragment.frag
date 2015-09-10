uniform vec2 u_resolution;
uniform float u_time;

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	gl_FragColor=vec4(abs(sin(u_time + st.x)),abs(sin(u_time + st.y)),0.0,1.0);
}