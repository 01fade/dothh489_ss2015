// Author _ Hang Do Thi Duc ( 22-8miles.com )

THREE.Vignette = {

	uniforms: {

		"time":     { type: "f", value: 1.57},
		"tDiffuse": { type: "t", value: null },
		"tSize":    { type: "v2", value: new THREE.Vector2( 256, 256 ) },
		"center":   { type: "v2", value: new THREE.Vector2( 0.5, 0.5 ) },
		"angle":    { type: "f", value: 1.57 },
		"scale":    { type: "f", value: 4.0 }

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
		"uniform vec2 center;",
		"uniform float angle;",
		"uniform float scale;",
		"uniform vec2 tSize;",

		"uniform sampler2D tDiffuse;",

		"varying vec2 vUv;",

		"void main(){",
			"vec2 st = vec2(vUv.x, vUv.x);",
			"vec4 color = texture2D( tDiffuse, vUv );",
			"float average = ( color.r + color.g + color.b ) / 3.0;",

		    "float pct = 0.0;",
		    "vec2 toCenter = vec2(0.5)-st;",
		    "pct = length(toCenter) * 1.5;",
			"gl_FragColor = vec4( vec3( average * (1.-pct) ), color.a );",
	"}"

	].join( "\n" )

};