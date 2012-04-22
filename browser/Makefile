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
	parser.js \
	stack/index.js stack/frame.js stack/scope.js \
	convert/css.js \
	token.js utils.js \
	visitor/index.js visitor/evaluator.js

# $(1) script name for comment and require call.
# $(2) real path to get file.
# $(3) (optional) file name to read some override code from.
module_include = \
	echo '\n\nrequire.register("$(1)", function(module, exports, require){\n' >> ${OUT} ;\
	cat $(2) >> ${OUT} ;\
	if [ -n "$(3)" ]; then \
		cat $(3) >> ${OUT} ;\
	fi; \
	echo '});// module: $(1)' >> ${OUT} ;\

default: build

build:
	@cat modules/bifs.js > ${OUT}
	@echo "\n\nvar stylus = (function(){\n" >> ${OUT}

	@cat modules/require.js >> ${OUT}

	@$(call module_include,util,fake/fake-util.js)
	@$(call module_include,fs,fake/fake-fs.js)
	@$(call module_include,url,fake/fake-url.js)
	@$(call module_include,debug,fake/fake-debug.js)
	@$(call module_include,events,fake/fake-EventEmitter.js)

	@$(call module_include,path.js,modules/path.js)
	
	@$(foreach f,$(STYLUS_FILES),$(call module_include,$(f),../lib/$(f)))

	@$(call module_include,visitor/compiler.js,../lib/visitor/compiler.js,override/compiler-override.js)
	@$(call module_include,stylus.js,../lib/stylus.js,override/stylus-override.js)
	@$(call module_include,renderer.js,../lib/renderer.js,override/renderer-override.js)

	@echo "\nreturn require('stylus');" >> ${OUT}
	@echo "})();" >> ${OUT}

.PHONY: build
