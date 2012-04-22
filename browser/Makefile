OUT = stylus.browser.js
STYLUS_FILES = \
	units.js colors.js errors.js \
	functions/index.js functions/image.js functions/url.js \
	lexer.js \
	nodes/arguments.js nodes/binop.js nodes/block.js nodes/boolean.js nodes/call.js \
	nodes/charset.js nodes/comment.js nodes/each.js nodes/expression.js nodes/fontface.js \
	nodes/function.js nodes/group.js nodes/hsla.js nodes/ident.js nodes/if.js nodes/import.js \
	nodes/index.js nodes/jsliteral.js nodes/keyframes.js nodes/literal.js nodes/media.js \
	nodes/node.js nodes/null.js nodes/page.js nodes/params.js nodes/property.js nodes/return.js \
	nodes/rgba.js nodes/root.js nodes/selector.js nodes/string.js nodes/ternary.js nodes/unaryop.js nodes/unit.js \
	parser.js renderer.js \
	stack/index.js stack/frame.js stack/scope.js \
	convert/css.js \
	stylus.js token.js utils.js \
	visitor/index.js visitor/compiler.js visitor/evaluator.js

# $(1) script name for comment and require call
# $(2) real path to get file
module_include = \
	echo '\n\nrequire.register("$(1)", function(module, exports, require){\n' >> ${OUT} ;\
	cat $(2) >> ${OUT} ;\
	echo '});// module: $(1)' >> ${OUT} ;\

build:
	@cat bifs.js > ${OUT}
	@echo "\n\nvar stylus = (function(){\n" >> ${OUT}

	@cat require.js >> ${OUT}

	@$(call module_include,util,fake-util.js)
	@$(call module_include,fs,fake-fs.js)
	@$(call module_include,url,fake-url.js)
	@$(call module_include,debug,fake-debug.js)
	@$(call module_include,events,fake-EventEmitter.js)

	@$(call module_include,path.js,path.js)
	
	@$(foreach f,$(STYLUS_FILES),$(call module_include,$(f),../lib/$(f)))

	@echo "\nreturn require('stylus');" >> ${OUT}
	@echo "})();" >> ${OUT}

.PHONY: build
