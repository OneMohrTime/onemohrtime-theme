// =============================================================================
// Utilities: Transform
// =============================================================================
// A collection of transform related functions

export function transform(el, transformValue){
    el.style.webkitTransform = transformValue;
    el.style.msTransform = transformValue;
    el.style.transform = transformValue;
}

export function getTranslate(el){
    const translate = {}
    if(!window.getComputedStyle) return;

    const style = getComputedStyle(el);
    const transform = style.transform || style.webkitTransform || style.mozTransform;

    let mat = transform.match(/^matrix3d\((.+)\)$/);
    if(mat) return parseFloat(mat[1].split(', ')[13]);
    mat = transform.match(/^matrix\((.+)\)$/);
    translate.x = mat ? parseFloat(mat[1].split(', ')[4]) : 0;
    translate.y = mat ? parseFloat(mat[1].split(', ')[5]) : 0;

    return translate;
}
