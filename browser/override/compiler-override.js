
Compiler.prototype.visitRoot = function(block){
    this.buf = '';
    for (var i = 0, len = block.nodes.length; i < len; ++i) {
        var node = block.nodes[i];
        if (this.linenos || this.firebug) {
            this.debugInfo(node);
        }

//        var ret = this.visit(node);
//        if (ret) this.buf += ret + '\n';

        switch (node.nodeName) {
            case 'null':
            case 'expression':
            case 'function':
            case 'jsliteral':
            case 'unit':
                continue;
            default:
                var ret = this.visit(node);
                if (ret) this.buf += ret + '\n';
        }
    }
    return this.buf;
};
