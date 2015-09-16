#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
	// draw a line
    // try return smoothstep(0.2,0.5,x) - smoothstep(0.5,0.8,x);
    // http://patriciogonzalezvivo.com/2015/thebookofshaders/function.html
    // 0.01 is width of line
	return  smoothstep( pct-0.01, pct, st.y) - 
        	smoothstep( pct, pct+0.01, st.y);
}

void main() {
	//normalize
    vec2 st = gl_FragCoord.xy/u_resolution;
    //function for curve and transition
    // float y = pow(st.x,5.0);
    float y = fract(sin(st.x * PI * 2.));
    //init color, gradient color represents function 
    vec3 color = vec3(y);

	//draw colored graph
    float pct = plot(st,y);
    //white graph
    //QUESTION
    color = (1.0-pct)*color+pct;
    // color = (1.0-pct)*color+pct*vec3(1.0,0.0,0.0);
	//draw everything
    gl_FragColor = vec4(color,1.0);
}