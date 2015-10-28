// Author _ Hang Do Thi Duc ( 22-8miles.com )

THREE.Pattern3b = {

    uniforms: {

        "time":     { type: "f", value: 10.0},
        "tDiffuse": { type: "t", value: null },
        "scale":    { type: "f", value: 5.0 },
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

        "// Reference to",
        "// http://thndl.com/square-shaped-shaders.html",
        "float triangle(vec2 st, float width, float size, float off, float shift){",
        "  float d = 0.0;",
        "  st *= 2.;",
        "  vec2 st_f = fract(st);",
        "  st_f = st_f * 2.-1.;",
        "  st_f.x += 0.03 * cos(time*0.8 + off) - shift;",
        "  st_f.y += 0.42 + 0.01 * sin(time*0.8 + off);",
        "  float a = atan(st_f.x,st_f.y)+pi;",
        "  float r = hpi/3.;",
        "  d = cos(floor(.5+a/r)*r-a)*length(st_f);",
        "  float t = size - width;",
        "  return 1.-(1.-smoothstep(t,t,d) + smoothstep(size,size,d));",
        "}",

        "vec2 move(vec2 st){",
        "    vec2 st_i = floor(st);",
        "    if (mod(st_i.y,2.) == 1.) {st.x += 0.5;}",
        "    return st;",
        "}",

        "float pattern(vec2 st, float pos){",
        "  float pct = 0.0;",
        "  st.y *= 9./scale;",
        "  st.x *= 16./scale;",
        "  st = move(st);",
        "  vec2 st_f = fract(st);",
        "  float o = 0.7;",
        "  if (pos != 0.0){",
        "   st_f = 1.-st_f;",
        "  }",
        "  pct += triangle(st_f*0.5, 0.01, 0.5, o * 0., pos);",
        "  pct += triangle(st_f*0.5, 0.015, 0.4, o * 1., pos);",
        "  pct += triangle(st_f*0.5, 0.02, 0.3, o * 2., pos);",
        "  pct += triangle(st_f*0.5, 0.025, 0.2, o * 3., pos);",
        "  pct += triangle(st_f*0.5, 0.03, 0.1, o * 4., pos);",
        "  pct += triangle(st_f*0.5, 0.05, 0.02, o * 5., pos);",
        "  return pct;",
        "}",

        /////////////

        "void main(){",
            "vec4 color = texture2D( tDiffuse, vUv );",
            "float average = ( color.r + color.g + color.b ) / 3.0;",

            "gl_FragColor = vec4(vec3( average * 1.2 +  (pattern(vUv, 0.0)+pattern(vUv, 1.0)+pattern(vUv, -1.0))  ), color.a);",
    "}"

    ].join( "\n" )

};