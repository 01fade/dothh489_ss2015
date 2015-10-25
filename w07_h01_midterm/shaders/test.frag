#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float pattern(vec2 st, float tSize, sampler2D tDiffuse) {
	float s = sin( 1.57 ), c = cos( 1.57 );
	vec2 tex = st * tSize * sin(1.57) - vec2(0.5, 0.5);
	vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * scale;
	return ( sin( point.x ) * sin( point.y ) ) * 4.0;

}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
	float tSize = 4.;
	sampler2D tDiffuse = 0.;

	vec4 color = texture2D( tDiffuse, st );
	float average = ( color.r + color.g + color.b ) / 3.0;
	gl_FragColor = vec4( vec3( average * 10.0 - 5.0 + pattern(st, tSize, tDiffuse) ), color.a );

}