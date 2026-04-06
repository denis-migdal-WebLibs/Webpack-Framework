export default function(src) {
    //console.warn(typeof src, src);
    //return {ok: "ok"};

    console.warn(src);
    const c = eval(src + '; exports.default;');
    console.warn("====>", c);

    return src;
}