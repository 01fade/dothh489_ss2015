#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define PI2 6.283185307

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
	return  smoothstep( pct-0.01, pct, st.y) -
        	smoothstep( pct, pct+0.01, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    st *= 2.; //zoom out of the space

    // float y = pow(st.x, 2.);
    // float y = smoothstep(0.0, .1, st.x) - abs(sin(st.x * 0.3));
    // float y = smoothstep(0.0, 1.0, st.x);
	// float y = mod(st.x, .3); // return x modulo of 0.5
	// float y = fract(st.x); // return only the fraction part of a number
	// float y = ceil(st.x);  // nearest integer that is greater than or equal to x
	// float y = floor(st.x); // nearest integer less than or equal to x
	// float y = sign(sin(u_time));  // extract the sign of x
	//float y = abs(st.x);   // return the absolute value of x
	// float y = clamp(st.x,0.0,1.0); // constrain x to lie between 0.0 and 1.0
	// float y = min(0.0,sin(u_time)) + 0.5;   // return the lesser of x and 0.0
	// float y = max(0.0,st.x);   // return the greater of x and 0.0     vec3 color = vec3(y);
	// float y = fract(sin(st.x) * 500.); //random
	// float y = floor( fract(sin(st.x) * 999.) * 3. ); //step random
	// float y = smoothstep(0., 1., fract(st.x));
	// float y = floor( fract(sin(st.x) * 999.) * 3. ) * smoothstep(0., 1., fract(st.x));

	float y = floor( fract(sin(st.x) * 999.) * 3. ) * smoothstep(0., 1., fract(st.x));
	y += floor( fract(sin(st.x-1.) * 999.) * 3. ) * smoothstep(0., 1., fract(st.x-1.)) * -1. + 1.;

	vec3 color = vec3(y);

    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(1.0,0.0,0.0);
    gl_FragColor = vec4(color,1.0);
}