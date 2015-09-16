#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define HPI 3.14159265359/2.0

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Function by Golan Levin 
// http://www.flong.com/texts/code/shapers_poly/
/* A seat-shaped function can be created with a coupling of two 
exponential functions. This has nicer derivatives than the cubic 
function, and more continuous control in some respects, at the 
expense of greater CPU cycles. The recommended range for the control 
parameter a is from 0 to 1. Note that these equations are very similar 
to the Double-Exponential Sigmoid described below.
*/

float doubleCubicSeat (float x, float a, float b){
    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    float min_param_b = 0.0;
    float max_param_b = 1.0;
    a = min(max_param_a, max(min_param_a, a));  
    b = min(max_param_b, max(min_param_b, b)); 

    float y = 0.0;
    if (x <= a){
        y = b - b*pow(1.0-x/a, 3.0);
    } else {
        y = b + (1.0-b)*pow((x-a)/(1.0-a), 3.0);
    }
    return y;
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - 
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 mouse = u_mouse/u_resolution;

    float y = doubleCubicSeat(st.x, mouse.x, mouse.y);

    vec3 color = vec3(y);
    
    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}