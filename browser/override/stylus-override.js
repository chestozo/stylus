
function render(str, options) {
    str = bifs + str;
    return new Renderer(str, options);
}
