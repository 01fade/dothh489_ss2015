// Author _ Hang Do Thi Duc ( 22-8miles.com )
THREE.Effect3 = {
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

        "mat2 rotate2d(float _angle){",
        "    return mat2(cos(_angle),-sin(_angle),",
        "                sin(_angle),cos(_angle));",
        "}",

        "float circle (float sc, float r, float sm, vec2 st, vec2 mouse){",
        "    st -= vec2(0.5);",
        "    st = rotate2d( sin(time)*0.1 + 0.05*noise(st+time) ) * st;",
        "    st += 0.5;",
        "    vec2 toCenter = mouse-st;",
        "    float pct = length(vec2(toCenter.x * 2., toCenter.y) + 0.5*noise(st+time*0.01) ) * sc;",
        "    pct = smoothstep(r-sm, r+sm, pct);",
        "    return pct;",
        "}",

        "void main () {",
        "    vec2 offset = vec2(circle(2., 2.0 * scale, 0.9, vUv, mouse+0.05*noise(vUv+time*0.2) ));",
        "    vec3 colorB = texture2D(tDiffuse,vUv+offset).rgb * 2.;",
        "    vec3 colorA = texture2D(tDiffuse,vUv).rgb;",
        "    vec3 color = max(colorA,colorB);",
        "    color = color * (1.-circle(2., 1.0, 0.2, vUv, mouse ) * 0.7);",
        "    color *= 1.-circle(2., 1.2, 0.2, vUv, mouse ) * 0.5;",
        "    gl_FragColor = vec4(color, 1.0);",
        "}",

    ].join( "\n" )
};