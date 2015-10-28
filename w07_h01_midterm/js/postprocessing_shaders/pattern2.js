// Author _ Hang Do Thi Duc ( 22-8miles.com )

THREE.Rectangle = {

	uniforms: {

		"time":     { type: "f", value: 10.0},
		"tDiffuse": { type: "t", value: null },
		"scale":    { type: "f", value: 200.0 },
		"pi":       { type: "f", value: 3.14159265359}

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

	fragmentShader: [

		"uniform float time;",
		"uniform float scale;",
		"uniform float pi;",
		"uniform sampler2D tDiffuse;",
		"varying vec2 vUv;",

		"vec2 truchet(vec2 st){",
		    "vec2 st_i = floor(st);",
		    "if (mod(st_i.x,2.) == 0.) {st.y = 1.-st.y;} // face 1",
		    "if (mod(st_i.y,2.) == 1. && mod(st_i.x,2.) == 1.) {st.y = 1.-st.y; st.x = 1.-st.x;} // face 2",
		    "if (mod(st_i.y,2.) == 0. && mod(st_i.x,2.) == 0.) {st.y = 1.-st.y;} // face 4",
		    "if (mod(st_i.y,2.) == 0. && mod(st_i.x,2.) == 1.) {st.x = 1.-st.x;} // face 4",
		    "return st;",
		"}",

		"mat2 rotationMatrix(float a) {",
		    "return mat2(vec2(cos(a),-sin(a)),vec2(sin(a),cos(a)));",
		"}",

		"float pattern (vec2 st) {",
		    "st *= 2.0; // scale",
		    "vec2 st_i = floor(st); // rows and columns",
		    "st = truchet(st*2.);",
		    "float t = time * 0.1;",
		    "if (mod(st_i.y, 2.) == 1. || mod(st_i.y, 2.) == 0.) {st.x += t;}",
		    "if (mod(st_i.x, 2.) == 1. || mod(st_i.x, 2.) == 0.) {st.y += t;}",
		    "vec2 st_f = fract(st); // mult 1. by number (scale)",
		    "st_f = rotationMatrix(pi*0.25)*st_f;",
		    "return sin(st_f.x * sin(st_f.x * scale) * st_f.x) * 1.5;",
		"}",

		"void main(){",
			"vec4 color = texture2D( tDiffuse, vUv );",
			"float average = ( color.r + color.g + color.b ) / 3.0;",

			"gl_FragColor = vec4(vec3( average * 1.5 + pattern(vUv) ), color.a);",
	"}"

	].join( "\n" )

};