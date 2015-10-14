#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define HPI 3.14159265359/2.0

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//  Function by http://www.kynd.info/log/
//  http://www.flickr.com/photos/kynd/9546075099/
float F( float x, float k ){
    return 1.0 - pow(abs(sin(HPI * x)), k);
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 mouse = u_mouse/u_resolution;

    float y = F(st.x, mouse.x * 4.);

    vec3 color = vec3(y);

    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}