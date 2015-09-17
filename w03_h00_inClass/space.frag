#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) - 
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
	st *= 5.0;
	st.y -= PI;
	st.x -= u_time;

	vec4 V;
	V.x =
	V.y =
	V.z =
	V.w =

    float y = st.x;
    y = sin(y);

    vec3 color = vec3(y);
    
    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0.0,5.0,0.0);
    
	gl_FragColor = vec4(color/5.,1.0);
}