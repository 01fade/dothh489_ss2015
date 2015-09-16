#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//  Function from Iñigo Quiles 
//  www.iquilezles.org/www/articles/functions/functions.htm

// A natural attenuation is an exponential of a linearly decaying quantity: exp(-x). 
// A gaussian, is an exponential of a quadratically decaying quantity: exp(-x²). 
// You can go on increasing powers (n), and get a sharper and sharper smoothstep(), until you get a step() in the limit.

float expStep( float x, float k, float n ){
    return exp( -k * pow(x,n) );
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - 
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    float y = expStep(st.x,100.,8.0);

    vec3 color = vec3(y);
    
    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}