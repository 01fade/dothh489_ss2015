// Author _ Hang Do Thi Duc ( 22-8miles.com )

THREE.Pattern3a = {

    uniforms: {

        "time":     { type: "f", value: 10.0},
        "tDiffuse": { type: "t", value: null },
        "scale":    { type: "f", value: 9.0 },
        "pi":       { type: "f", value: 3.14159265359},
        "hpi":       { type: "f", value: 3.14159265359/2.0}

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
        "uniform float hpi;",
        "uniform sampler2D tDiffuse;",
        "varying vec2 vUv;",

        ////////////

        "vec2 truchet(vec2 st){",
        "    vec2 st_i = floor(st);",
        "    if (mod(st_i.y,2.) == 1.) {",
        "        st.x = 1.-st.x ;",
        "    }",
        "    if (mod(st_i.x,2.) == 1.) {",
        "        st.y = 1.-st.y + abs(sin(time*.5));",
        "    }",
        "    if (mod(st_i.x,2.) == 0.) {",
        "        st.y += sin(time*.5 + 0.5);",
        "    }",
        "    return st;",
        "}",

        "// Reference to",
        "// http://thndl.com/square-shaped-shaders.html",
        "float pattern(vec2 st){",
        "  float d = 0.0;",
        "  st *= scale;",
        "  st = truchet(st*4.);",
        "  vec2 st_f = fract(st);",
        "  st_f = st_f * 2.-1.;",
        "  st_f.y += 0.25;",
        "  float a = atan(st_f.x,st_f.y)+pi;",
        "  float r = hpi/3.;",
        "  // Shaping function that modulate the distance",
        "  d = cos(floor(.5+a/r)*r-a)*length(st_f);",
        "  float t = 0.25 + 0.05 * abs(sin(time));",
        "  return 1.-(1.-smoothstep(t,t,d) + smoothstep(.4,.4,d));",
        "}",

        /////////////

        "void main(){",
            "vec4 color = texture2D( tDiffuse, vUv );",
            "float average = ( color.r + color.g + color.b ) / 3.0;",

            "gl_FragColor = vec4(vec3( average * 1.2 + pattern(vUv) ), color.a);",
    "}"

    ].join( "\n" )

};