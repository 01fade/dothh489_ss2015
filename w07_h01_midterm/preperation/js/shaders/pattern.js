// Author _ Hang Do Thi Duc ( 22-8miles.com )

THREE.Pattern = {

	uniforms: {

		"time":     { type: "f", value: 0.0},
		"tDiffuse": { type: "t", value: null },
		"scale":    { type: "f", value: 200.0 }

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
		"uniform sampler2D tDiffuse;",
		"varying vec2 vUv;",

		"float stripes(vec2 st) {",
		    "return smoothstep(st.y * 0.1, st.y,st.x);",
		"}",

		"mat2 rotationMatrix(float a) {",
		    "return mat2(vec2(cos(a),-sin(a)),vec2(sin(a),cos(a)));",
		"}",

		"float pattern(vec2 st, float number){",
		    "float d = distance(st,vec2(.5));",
		    "d = pow(sin(d*3.14*5.-time), 10.);",
		    "st *= number;",
		    "vec2 st_i = floor(st);",
		    "if (mod(st_i.y,2.) == 1.) {st.x += .5;}",
		    "vec2 st_f = fract(st);",
		    "st_f -= .5;",
		    "st_f = rotationMatrix(d*3.14)*st_f;",
		    "st_f += .5;",
		    "float pct = stripes(st_f);",
		    "return pct;",
		"}",

		"void main(){",
			"vec4 color = texture2D( tDiffuse, vUv );",
			"float average = ( color.r + color.g + color.b ) / 3.0;",

			"gl_FragColor = vec4(vec3( average * 1. - .5 + pattern(vUv, scale) ), color.a);",
	"}"

	].join( "\n" )

};