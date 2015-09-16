#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//  Function from Iñigo Quiles 
//  www.iquilezles.org/www/articles/functions/functions.htm
float cubicPulse( float highPos, float width, float x ){
    // e.g. 0.4__0.2__0.0__0.2__0.4
    x = abs(x - highPos);
    // make flat before and after highPos value
    if( x>width ) return 0.0;
    x /= width;
    // reverse Quadratfunction * smooth edges
    return 1.0 - pow(x, 2.) * (3.0 - 2.0*x);
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - 
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    float y = cubicPulse(0.5, 0.1, st.x);

    vec3 color = vec3(y);
    
    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}