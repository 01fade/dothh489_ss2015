#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718
#define pink vec3(1.00,0.18,0.37)

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat3 matrix = mat3(vec3(1.,0.,0.),
                   vec3(0.,1.,0.),
                   vec3(0.,0.,1.));

mat3 scaleMatrix(vec2 f) {
    return mat3(vec3(f.x,0.0,0.0),
                vec3(0.0,f.y,0.0),
                vec3(0.0,0.0,1.0));
}

void scale(in vec2 f) {
    matrix = scaleMatrix(f) * matrix;
}

mat3 translationMatrix(vec2 f) {
    return mat3(vec3(1.0,0.0,0.0),
                vec3(0.0,1.0,0.0),
                vec3(f.x,f.y,1.0));
}

void translate(vec2 f) {
    matrix = translationMatrix(f) * matrix;
}

mat3 rotationMatrix(float a) {
    return mat3(vec3(cos(a),-sin(a),0.0),
                vec3(sin(a),cos(a),0.0),
                vec3(0.0,0.0,1.0));
}

void rotate(float a) {
    matrix = rotationMatrix(a) * matrix;
}

float F( float n, float k, float shift){
    return 1.0 - pow(sin(PI * u_time * n), k) + shift;
}

// http://thndl.com/square-shaped-shaders.html
vec3 shape(float size, float x, float y, float n, float b, float e, vec2 st){
	st = st * size;
	st.x += x;
	st.y += y;
	float d = 0.0;
	float a = atan(st.x,st.y)+PI;
	float r = TWO_PI/n;
	d = cos(floor(.5+a/r)*r-a)*length(st);
	vec3 color = vec3(1.0-smoothstep(b,e+0.05,d)) - vec3(1.0-smoothstep(b-0.01,e-0.01,d));
	return color;
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 color = vec3(0.0);
	vec3 pos0 = vec3(st,1.0);
	vec3 pos = vec3(st,1.0);
	float one = fract(cos(st.x) * 100.);
	float two = fract(sin(st.y) * 500.);
	float three = fract(cos(st.x) * 800.);
	float four = fract(sin(st.y) * 300.);

	translate(vec2(-.5));
	scale(vec2(4.5 + 1.0 * F(.05, 4., 0.8)));
	rotate(F(.1, 10., 0.5));
	pos = matrix * pos0;
	//size, x, y, n, beg, end, st
	color += shape(0.4, 0.7, 0.7 * one, 6.0, 0.65, 0.7, pos.xy);
	color += shape(0.4, -0.3, 0.7 * two, 6.0, 0.65, 0.7, pos.xy);
	rotate(-1.4*F(.1, 8., 0.8));
	scale(vec2(.1 + .6 * F(.05, 2., 0.2)));
	pos = matrix * pos0;
	color += shape(0.4, 0.7, -0.4 * three, 6.0, 0.65, 0.7, pos.xy);
	color += shape(0.2, 0.0, 0.3 * three, 9.0, 0.65, 0.7, pos.xy);

	gl_FragColor = vec4(color,1.0);
}