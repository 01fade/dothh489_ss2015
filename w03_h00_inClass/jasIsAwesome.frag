// Base Code by Jaskirat 
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359 

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

void main (void)
{
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec4 bkg_color = vec4(0.);

	// vec2 mouse = u_resolution/u_mouse;
	// float fade_out = 1.-mod(mouse.x, 2.);
	float fade_out = 1.-mod(u_time, 2.);

	float circle_radius= 1.-(fade_out); // 0.5
	// width of ripple
	float border = abs(sin(fade_out/3.)); // 0.01
	
	vec4 circle_color= vec4(1.0, 1.0, 1.0, fade_out);
 
	// Offset st with the center of the circle.
	st -= vec2(0.5, 0.5);
  
	float dist =  sqrt(dot(st*5., st*5.)); //size

	float plot = 1.0 + smoothstep(circle_radius, circle_radius + border, dist) 
                - smoothstep(circle_radius - border, circle_radius, dist);
 
	gl_FragColor = mix(circle_color, bkg_color, plot);
}