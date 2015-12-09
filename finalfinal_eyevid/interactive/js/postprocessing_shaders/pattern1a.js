// Author _ Hang Do Thi Duc ( 22-8miles.com )
THREE.Pattern1a = {
    uniforms: {
        "time":     { type: "f", value: 0.0},
        "mouse":     { type: "v2", value: null},
        "tDiffuse": { type: "t", value: null },
        "scale":    { type: "f", value: 0.0 },
        "pi":       { type: "f", value: 3.14159265359},
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
        "uniform vec2 mouse;",
        "uniform float scale;",
        "uniform float pi;",
        "uniform sampler2D tDiffuse;",
        "varying vec2 vUv;",

        "vec2 random(vec2 st){",
        "    st = vec2( dot(st,vec2(127.1,311.7)),",
        "              dot(st,vec2(269.5,183.3)) );",
        "    return -1.0 + 2.0*fract(sin(st)*43758.5453123);",
        "}",

        "float noise(vec2 st) {",
        "    vec2 i = floor(st);",
        "    vec2 f = fract(st);",

        "    vec2 u = f*f*(3.0-2.0*f);",
        "    return mix( mix( dot( random(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),",
        "                     dot( random(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),",
        "                mix( dot( random(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),",
        "                     dot( random(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);",
        "}",

        "vec3 clr(vec2 st, float size, float rays, float smoothstart, float smoothend, float strength, float speed, vec2 mouse) {",
        "    vec3 color = vec3(0.);",
        "    st -= mouse;",
        "    float r = length(st);",
        "    float a = atan(st.y,st.x);",
        "    a += noise(vec2(time*0.01));",
        "    float pct = size + noise(vec2(sin(a)*rays,cos(a))) * (.2*(sin(a+time*speed)*strength));",
        "    color += smoothstep(pct, pct+smoothstart,r)-smoothstep(pct, pct+smoothend,r);",
        "    return color;",
        "}",

        "void main () {",

        "    vec2 offset = vec2(clr(vUv, 0.2, 100., 0.2, 0.5, 0.2, 2., mouse));",
        "    vec3 colorA = texture2D(tDiffuse,vUv).rgb;",
        "    vec3 colorB = texture2D(tDiffuse,vUv+offset).rgb;",

        "    vec3 color = mix(colorA, colorB, 0.8);",

        "    gl_FragColor = vec4(color, 1.0);",
        "}",

    ].join( "\n" )
};