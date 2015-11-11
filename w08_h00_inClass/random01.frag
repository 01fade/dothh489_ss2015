#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (float x) {
    return fract(sin(x)*10e5);
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= 10.;
    vec2 st_i = floor(st);
    float time = floor(u_time);
    vec3 color = vec3(random(st_i.x + time));
	gl_FragColor = vec4(color,1.0);
}