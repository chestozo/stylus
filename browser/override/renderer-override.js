
function Renderer(str, options) {
    options = options || {};
    options.globals = {};
    options.functions = {};
    //options.imports = [join(__dirname, 'functions')];
    options.imports = [];
    options.paths = options.paths || [];
    options.filename = options.filename || 'stylus';
    this.options = options;
    this.str = str;
}

