#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float pattern(vec2 st, vec2 tSize, float scale) {
	float s = 1., c = 0.;
	vec2 tex = st * tSize * s - vec2(0.5, 0.5);
	// point are lines
	vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * scale;
	return sin( point.x ) * sin( point.y ) * 4.0;
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
	// number points
	vec2 tSize = vec2(5., 5.);
	float scale = 50.;
	gl_FragColor = vec4( vec3( pattern(st, tSize, scale) ), 1. );

}