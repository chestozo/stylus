OUT = test.js

module_include = \
	echo '\nrequire.register("$(1)", function(module, exports, require){' >> ${OUT} ;\
	cat $(1) >> ${OUT} ;\
	echo '\n\n});// module: $(1)\n' >> ${OUT} ;\

build:
	@cat bifs.js > ${OUT}
	@echo "var stylus = (function(){" >> ${OUT}

	@cat require.js >> ${OUT}

	@$(call module_include, path.js)
	@$(call module_include, ../lib/colors.js)

	@echo "return require('stylus');" >> ${OUT}
	@echo "})();" >> ${OUT}

.PHONY: build
