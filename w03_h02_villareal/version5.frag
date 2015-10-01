#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Leo Villareal version4
// https://vimeo.com/32823553

//Inigo Quiles
float cubicPulse( float highPos, float width, float x ){
    x = abs(x - highPos);
    if( x>width ) return 0.0;
    x /= width;
    return 1.0 - pow(x, 2.) * (3.0 - 2.0*x);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 cyan = vec3(0.,1.,1.);
    vec3 blue = vec3(0.,0.,1.);
    vec3 colorA = vec3(0.);
    vec3 colorB = vec3(0., 0., 1.);

    //
    // rework! with week 4 in class code
    //

    colorA = vec3(sqrt(pow(((0.5-st.x)/.5),2.0)+pow(((st.y-0.5)/.5),2.0)));
    colorB.rg = vec2(sqrt(pow(((0.5-st.x)/2.),2.0)+pow(((st.y-0.5)/2.),2.0)));
    color.b = 1.0;

    color = mix(colorA, colorB, sin(u_time));


    gl_FragColor = vec4(color,1.0);
}