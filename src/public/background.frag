#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform vec2 resolution;
uniform float time;

/*
* @author Hazsi (kinda)
*/
mat2 m(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, -s, s, c);
}

float map(vec3 p) {
    float halfTime = time * 0.5;
    p.xz *= m(halfTime * 0.4); p.xy *= m(halfTime * 0.1);
    vec3 q = p * 2.0 + halfTime;
    return length(p + vec3(sin(halfTime * 0.7))) * log(length(p) + 1.0) + sin(q.x + sin(q.z + sin(q.y))) * 0.5 - 1.0;
}

void main() {
    vec2 a = (gl_FragCoord.xy / resolution.y - vec2(0.9, 0.5)) / 0.7; // Zoom out to 70%
    vec3 cl = vec3(0.0);
    float d = 2.5;

    for (int i = 0; i <= 5; i++) {
        vec3 p = vec3(0, 0, 4.0) + normalize(vec3(a, -1.0)) * d;
        float rz = map(p);
        float f = clamp((rz - map(p + 0.1)) * 0.5, -0.1, 1.0);
        vec3 l = vec3(0.1, 0.3, 0.4) + vec3(5.0, 2.5, 3.0) * f;
        cl = cl * l + smoothstep(2.5, 0.0, rz) * 0.6 * l;
        d += min(rz, 1.0);
    }

    // Convert the color to grayscale
    float grayscale = dot(cl, vec3(0.299, 0.587, 0.114));
    gl_FragColor = vec4(vec3(grayscale), 1.0);
}
