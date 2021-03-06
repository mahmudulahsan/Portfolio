


// typewriter

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
    };
    
    TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
    
    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
    
    var that = this;
    var delta = 200 - Math.random() * 100;
    
    if (this.isDeleting) { delta /= 2; }
    
    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }
    
    setTimeout(function() {
    that.tick();
    }, delta);
    };
    
    window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
    };




    //Syntax highlighter//


    /*sytax highlighter*/

/*!
 * SyntaxHighlighter
 * https://github.com/syntaxhighlighter/syntaxhighlighter
 * 
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * https://alexgorbatchev.com/SyntaxHighlighter/donate.html
 * 
 * @version
 * 4.0.1 (Sat, 11 Jun 2016 18:50:48 GMT)
 * 
 * @copyright
 * Copyright (C) 2004-2016 Alex Gorbatchev.
 * 
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
(function(modules) {
	var installedModules = {}

	function __webpack_require__(moduleId) {
		if (installedModules[moduleId]) return installedModules[moduleId].exports
		var module = installedModules[moduleId] = {
			exports: {},
			id: moduleId,
			loaded: false
		}
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
		module.loaded = true
		return module.exports
	}
	__webpack_require__.m = modules
	__webpack_require__.c = installedModules
	__webpack_require__.p = ""
	return __webpack_require__(0)
})([function(module, exports, __webpack_require__) {
	"use strict"
	Object.defineProperty(exports, "__esModule", {
		value: true
	})
	var _core = __webpack_require__(1)
	Object.keys(_core).forEach(function(key) {
		if (key === "default") return
		Object.defineProperty(exports, key, {
			enumerable: true,
			get: function get() {
				return _core[key]
			}
		})
	})
	var _domready = __webpack_require__(30)
	var _domready2 = _interopRequireDefault(_domready)
	var _core2 = _interopRequireDefault(_core)
	var _dasherize = __webpack_require__(31)
	var dasherize = _interopRequireWildcard(_dasherize)

	function _interopRequireWildcard(obj) {
		if (obj && obj.__esModule) {
			return obj
		} else {
			var newObj = {}
			if (obj != null) {
				for (var key in obj) {
					if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]
				}
			}
			newObj.default = obj
			return newObj
		}
	}

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			"default": obj
		}
	}
	if (false) {
		require("./compatibility_layer_v3")
	}(0, _domready2.default)(function() {
		return _core2.default.highlight(dasherize.object(window.syntaxhighlighterConfig || {}))
	})
}, function(module, exports, __webpack_require__) {
	"use strict"
	Object.defineProperty(exports, "__esModule", {
		value: true
	})
	var optsParser = __webpack_require__(2),
		match = __webpack_require__(5),
		Renderer = __webpack_require__(9).default,
		utils = __webpack_require__(10),
		transformers = __webpack_require__(11),
		dom = __webpack_require__(17),
		config = __webpack_require__(18),
		defaults = __webpack_require__(19),
		HtmlScript = __webpack_require__(20)
	var sh = {
		Match: match.Match,
		Highlighter: __webpack_require__(22),
		config: __webpack_require__(18),
		regexLib: __webpack_require__(3).commonRegExp,
		vars: {
			discoveredBrushes: null,
			highlighters: {}
		},
		brushes: {},
		findElements: function findElements(globalParams, element) {
			var elements = element ? [element] : utils.toArray(document.getElementsByTagName(sh.config.tagName)),
				conf = sh.config,
				result = []
			elements = elements.concat(dom.getSyntaxHighlighterScriptTags())
			if (elements.length === 0) return result
			for (var i = 0, l = elements.length; i < l; i++) {
				var item = {
					target: elements[i],
					params: optsParser.defaults(optsParser.parse(elements[i].className), globalParams)
				}
				if (item.params["brush"] == null) continue
				result.push(item)
			}
			return result
		},
		highlight: function highlight(globalParams, element) {
			var elements = sh.findElements(globalParams, element),
				propertyName = "innerHTML",
				brush = null,
				renderer, conf = sh.config
			if (elements.length === 0) return
			for (var i = 0, l = elements.length; i < l; i++) {
				var element = elements[i],
					target = element.target,
					params = element.params,
					brushName = params.brush,
					brush, matches, code
				if (brushName == null) continue
				brush = findBrush(brushName)
				if (!brush) continue
				params = optsParser.defaults(params || {}, defaults)
				params = optsParser.defaults(params, config)
				if (params["html-script"] == true || defaults["html-script"] == true) {
					brush = new HtmlScript(findBrush("xml"), brush)
					brushName = "htmlscript"
				} else {
					brush = new brush
				}
				code = target[propertyName]
				if (conf.useScriptTags) code = stripCData(code)
				if ((target.title || "") != "") params.title = target.title
				params["brush"] = brushName
				code = transformers(code, params)
				matches = match.applyRegexList(code, brush.regexList, params)
				renderer = new Renderer(code, matches, params)
				element = dom.create("div")
				element.innerHTML = renderer.getHtml()
				if (params.quickCode) dom.attachEvent(dom.findElement(element, ".code"), "dblclick", dom.quickCodeHandler)
				if ((target.id || "") != "") element.id = target.id
				target.parentNode.replaceChild(element, target)
			}
		}
	}

	function alert(str) {
		window.alert("SyntaxHighlighter\n\n" + str)
	}

	function findBrush(alias, showAlert) {
		var brushes = sh.vars.discoveredBrushes,
			result = null
		if (brushes == null) {
			brushes = {}
			for (var brushName in sh.brushes) {
				var brush = sh.brushes[brushName],
					aliases = brush.aliases
				if (aliases == null) {
					continue
				}
				brush.className = brush.className || brush.aliases[0]
				brush.brushName = brush.className || brushName.toLowerCase()
				for (var i = 0, l = aliases.length; i < l; i++) {
					brushes[aliases[i]] = brushName
				}
			}
			sh.vars.discoveredBrushes = brushes
		}
		result = sh.brushes[brushes[alias]]
		if (result == null && showAlert) alert(sh.config.strings.noBrush + alias)
		return result
	}

	function stripCData(original) {
		var left = "<![CDATA[",
			right = "]]>",
			copy = utils.trim(original),
			changed = false,
			leftLength = left.length,
			rightLength = right.length
		if (copy.indexOf(left) == 0) {
			copy = copy.substring(leftLength)
			changed = true
		}
		var copyLength = copy.length
		if (copy.indexOf(right) == copyLength - rightLength) {
			copy = copy.substring(0, copyLength - rightLength)
			changed = true
		}
		return changed ? copy : original
	}
	var brushCounter = 0
	exports.default = sh
	var registerBrush = exports.registerBrush = function registerBrush(brush) {
		return sh.brushes["brush" + brushCounter++] = brush.default || brush
	}
	var clearRegisteredBrushes = exports.clearRegisteredBrushes = function clearRegisteredBrushes() {
		sh.brushes = {}
		brushCounter = 0
	}
	registerBrush(__webpack_require__(22))
	registerBrush(__webpack_require__(23))
	registerBrush(__webpack_require__(24))
	registerBrush(__webpack_require__(25))
	registerBrush(__webpack_require__(26))
	registerBrush(__webpack_require__(27))
	registerBrush(__webpack_require__(28))
	registerBrush(__webpack_require__(29))
}, function(module, exports, __webpack_require__) {
	"use strict"
	var XRegExp = __webpack_require__(3).XRegExp
	var BOOLEANS = {
		"true": true,
		"false": false
	}

	function camelize(key) {
		return key.replace(/-(\w+)/g, function(match, word) {
			return word.charAt(0).toUpperCase() + word.substr(1)
		})
	}

	function process(value) {
		var result = BOOLEANS[value]
		return result == null ? value : result
	}
	module.exports = {
		defaults: function defaults(target, source) {
			for (var key in source || {}) {
				if (!target.hasOwnProperty(key)) target[key] = target[camelize(key)] = source[key]
			}
			return target
		},
		parse: function parse(str) {
			var match, key, result = {},
				arrayRegex = XRegExp("^\\[(?<values>(.*?))\\]$"),
				pos = 0,
				regex = XRegExp("(?<name>[\\w-]+)" + "\\s*:\\s*" + "(?<value>" + "[\\w%#-]+|" + "\\[.*?\\]|" + '".*?"|' + "'.*?'" + ")\\s*;?", "g")
			while ((match = XRegExp.exec(str, regex, pos)) != null) {
				var value = match.value.replace(/^['"]|['"]$/g, "")
				if (value != null && arrayRegex.test(value)) {
					var m = XRegExp.exec(value, arrayRegex)
					value = m.values.length > 0 ? m.values.split(/\s*,\s*/) : []
				}
				value = process(value)
				result[match.name] = result[camelize(match.name)] = value
				pos = match.index + match[0].length
			}
			return result
		}
	}
}, function(module, exports, __webpack_require__) {
	"use strict"
	Object.defineProperty(exports, "__esModule", {
		value: true
	})
	exports.commonRegExp = exports.XRegExp = undefined
	var _xregexp = __webpack_require__(4)
	var _xregexp2 = _interopRequireDefault(_xregexp)

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			"default": obj
		}
	}
	exports.XRegExp = _xregexp2.default
	var commonRegExp = exports.commonRegExp = {
		multiLineCComments: (0, _xregexp2.default)("/\\*.*?\\*/", "gs"),
		singleLineCComments: /\/\/.*$/gm,
		singleLinePerlComments: /#.*$/gm,
		doubleQuotedString: /"([^\\"\n]|\\.)*"/g,
		singleQuotedString: /'([^\\'\n]|\\.)*'/g,
		multiLineDoubleQuotedString: (0, _xregexp2.default)('"([^\\\\"]|\\\\.)*"', "gs"),
		multiLineSingleQuotedString: (0, _xregexp2.default)("'([^\\\\']|\\\\.)*'", "gs"),
		xmlComments: (0, _xregexp2.default)("(&lt;|<)!--.*?--(&gt;|>)", "gs"),
		url: /\w+:\/\/[\w-.\/?%&=:@;#]*/g,
		phpScriptTags: {
			left: /(&lt;|<)\?(?:=|php)?/g,
			right: /\?(&gt;|>)/g,
			eof: true
		},
		aspScriptTags: {
			left: /(&lt;|<)%=?/g,
			right: /%(&gt;|>)/g
		},
		scriptScriptTags: {
			left: /(&lt;|<)\s*script.*?(&gt;|>)/gi,
			right: /(&lt;|<)\/\s*script\s*(&gt;|>)/gi
		}
	}
}, function(module, exports) {
	"use strict"
	var REGEX_DATA = "xregexp"
	var features = {
		astral: false,
		natives: false
	}
	var nativ = {
		exec: RegExp.prototype.exec,
		test: RegExp.prototype.test,
		match: String.prototype.match,
		replace: String.prototype.replace,
		split: String.prototype.split
	}
	var fixed = {}
	var regexCache = {}
	var patternCache = {}
	var tokens = []
	var defaultScope = "default"
	var classScope = "class"
	var nativeTokens = {
		"default": /\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u(?:[\dA-Fa-f]{4}|{[\dA-Fa-f]+})|c[A-Za-z]|[\s\S])|\(\?[:=!]|[?*+]\?|{\d+(?:,\d*)?}\??|[\s\S]/,
		"class": /\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u(?:[\dA-Fa-f]{4}|{[\dA-Fa-f]+})|c[A-Za-z]|[\s\S])|[\s\S]/
	}
	var replacementToken = /\$(?:{([\w$]+)}|(\d\d?|[\s\S]))/g
	var correctExecNpcg = nativ.exec.call(/()??/, "")[1] === undefined
	var hasNativeU = function() {
		var isSupported = true
		try {
			new RegExp("", "u")
		} catch (exception) {
			isSupported = false
		}
		return isSupported
	}()
	var hasNativeY = function() {
		var isSupported = true
		try {
			new RegExp("", "y")
		} catch (exception) {
			isSupported = false
		}
		return isSupported
	}()
	var hasFlagsProp = /a/.flags !== undefined
	var registeredFlags = {
		g: true,
		i: true,
		m: true,
		u: hasNativeU,
		y: hasNativeY
	}
	var toString = {}.toString

	function augment(regex, captureNames, xSource, xFlags, isInternalOnly) {
		var p
		regex[REGEX_DATA] = {
			captureNames: captureNames
		}
		if (isInternalOnly) {
			return regex
		}
		if (regex.__proto__) {
			regex.__proto__ = XRegExp.prototype
		} else {
			for (p in XRegExp.prototype) {
				regex[p] = XRegExp.prototype[p]
			}
		}
		regex[REGEX_DATA].source = xSource
		regex[REGEX_DATA].flags = xFlags ? xFlags.split("").sort().join("") : xFlags
		return regex
	}

	function clipDuplicates(str) {
		return nativ.replace.call(str, /([\s\S])(?=[\s\S]*\1)/g, "")
	}

	function copyRegex(regex, options) {
		if (!XRegExp.isRegExp(regex)) {
			throw new TypeError("Type RegExp expected")
		}
		var xData = regex[REGEX_DATA] || {},
			flags = getNativeFlags(regex),
			flagsToAdd = "",
			flagsToRemove = "",
			xregexpSource = null,
			xregexpFlags = null
		options = options || {}
		if (options.removeG) {
			flagsToRemove += "g"
		}
		if (options.removeY) {
			flagsToRemove += "y"
		}
		if (flagsToRemove) {
			flags = nativ.replace.call(flags, new RegExp("[" + flagsToRemove + "]+", "g"), "")
		}
		if (options.addG) {
			flagsToAdd += "g"
		}
		if (options.addY) {
			flagsToAdd += "y"
		}
		if (flagsToAdd) {
			flags = clipDuplicates(flags + flagsToAdd)
		}
		if (!options.isInternalOnly) {
			if (xData.source !== undefined) {
				xregexpSource = xData.source
			}
			if (xData.flags != null) {
				xregexpFlags = flagsToAdd ? clipDuplicates(xData.flags + flagsToAdd) : xData.flags
			}
		}
		regex = augment(new RegExp(regex.source, flags), hasNamedCapture(regex) ? xData.captureNames.slice(0) : null, xregexpSource, xregexpFlags, options.isInternalOnly)
		return regex
	}

	function dec(hex) {
		return parseInt(hex, 16)
	}

	function getNativeFlags(regex) {
		return hasFlagsProp ? regex.flags : nativ.exec.call(/\/([a-z]*)$/i, RegExp.prototype.toString.call(regex))[1]
	}

	function hasNamedCapture(regex) {
		return !!(regex[REGEX_DATA] && regex[REGEX_DATA].captureNames)
	}

	function hex(dec) {
		return parseInt(dec, 10).toString(16)
	}

	function indexOf(array, value) {
		var len = array.length,
			i
		for (i = 0; i < len; ++i) {
			if (array[i] === value) {
				return i
			}
		}
		return -1
	}

	function isType(value, type) {
		return toString.call(value) === "[object " + type + "]"
	}

	function isQuantifierNext(pattern, pos, flags) {
		return nativ.test.call(flags.indexOf("x") > -1 ? /^(?:\s+|#.*|\(\?#[^)]*\))*(?:[?*+]|{\d+(?:,\d*)?})/ : /^(?:\(\?#[^)]*\))*(?:[?*+]|{\d+(?:,\d*)?})/, pattern.slice(pos))
	}

	function pad4(str) {
		while (str.length < 4) {
			str = "0" + str
		}
		return str
	}

	function prepareFlags(pattern, flags) {
		var i
		if (clipDuplicates(flags) !== flags) {
			throw new SyntaxError("Invalid duplicate regex flag " + flags)
		}
		pattern = nativ.replace.call(pattern, /^\(\?([\w$]+)\)/, function($0, $1) {
			if (nativ.test.call(/[gy]/, $1)) {
				throw new SyntaxError("Cannot use flag g or y in mode modifier " + $0)
			}
			flags = clipDuplicates(flags + $1)
			return ""
		})
		for (i = 0; i < flags.length; ++i) {
			if (!registeredFlags[flags.charAt(i)]) {
				throw new SyntaxError("Unknown regex flag " + flags.charAt(i))
			}
		}
		return {
			pattern: pattern,
			flags: flags
		}
	}

	function prepareOptions(value) {
		var options = {}
		if (isType(value, "String")) {
			XRegExp.forEach(value, /[^\s,]+/, function(match) {
				options[match] = true
			})
			return options
		}
		return value
	}

	function registerFlag(flag) {
		if (!/^[\w$]$/.test(flag)) {
			throw new Error("Flag must be a single character A-Za-z0-9_$")
		}
		registeredFlags[flag] = true
	}

	function runTokens(pattern, flags, pos, scope, context) {
		var i = tokens.length,
			leadChar = pattern.charAt(pos),
			result = null,
			match, t
		while (i--) {
			t = tokens[i]
			if (t.leadChar && t.leadChar !== leadChar || t.scope !== scope && t.scope !== "all" || t.flag && flags.indexOf(t.flag) === -1) {
				continue
			}
			match = XRegExp.exec(pattern, t.regex, pos, "sticky")
			if (match) {
				result = {
					matchLength: match[0].length,
					output: t.handler.call(context, match, scope, flags),
					reparse: t.reparse
				}
				break
			}
		}
		return result
	}

	function setAstral(on) {
		features.astral = on
	}

	function setNatives(on) {
		RegExp.prototype.exec = (on ? fixed : nativ).exec
		RegExp.prototype.test = (on ? fixed : nativ).test
		String.prototype.match = (on ? fixed : nativ).match
		String.prototype.replace = (on ? fixed : nativ).replace
		String.prototype.split = (on ? fixed : nativ).split
		features.natives = on
	}

	function toObject(value) {
		if (value == null) {
			throw new TypeError("Cannot convert null or undefined to object")
		}
		return value
	}

	function XRegExp(pattern, flags) {
		var context = {
				hasNamedCapture: false,
				captureNames: []
			},
			scope = defaultScope,
			output = "",
			pos = 0,
			result, token, generated, appliedPattern, appliedFlags
		if (XRegExp.isRegExp(pattern)) {
			if (flags !== undefined) {
				throw new TypeError("Cannot supply flags when copying a RegExp")
			}
			return copyRegex(pattern)
		}
		pattern = pattern === undefined ? "" : String(pattern)
		flags = flags === undefined ? "" : String(flags)
		if (XRegExp.isInstalled("astral") && flags.indexOf("A") === -1) {
			flags += "A"
		}
		if (!patternCache[pattern]) {
			patternCache[pattern] = {}
		}
		if (!patternCache[pattern][flags]) {
			result = prepareFlags(pattern, flags)
			appliedPattern = result.pattern
			appliedFlags = result.flags
			while (pos < appliedPattern.length) {
				do {
					result = runTokens(appliedPattern, appliedFlags, pos, scope, context)
					if (result && result.reparse) {
						appliedPattern = appliedPattern.slice(0, pos) + result.output + appliedPattern.slice(pos + result.matchLength)
					}
				} while (result && result.reparse)
				if (result) {
					output += result.output
					pos += result.matchLength || 1
				} else {
					token = XRegExp.exec(appliedPattern, nativeTokens[scope], pos, "sticky")[0]
					output += token
					pos += token.length
					if (token === "[" && scope === defaultScope) {
						scope = classScope
					} else if (token === "]" && scope === classScope) {
						scope = defaultScope
					}
				}
			}
			patternCache[pattern][flags] = {
				pattern: nativ.replace.call(output, /\(\?:\)(?:[*+?]|\{\d+(?:,\d*)?})?\??(?=\(\?:\))|^\(\?:\)(?:[*+?]|\{\d+(?:,\d*)?})?\??|\(\?:\)(?:[*+?]|\{\d+(?:,\d*)?})?\??$/g, ""),
				flags: nativ.replace.call(appliedFlags, /[^gimuy]+/g, ""),
				captures: context.hasNamedCapture ? context.captureNames : null
			}
		}
		generated = patternCache[pattern][flags]
		return augment(new RegExp(generated.pattern, generated.flags), generated.captures, pattern, flags)
	}
	XRegExp.prototype = new RegExp
	XRegExp.version = "3.1.0-dev"
	XRegExp.addToken = function(regex, handler, options) {
		options = options || {}
		var optionalFlags = options.optionalFlags,
			i
		if (options.flag) {
			registerFlag(options.flag)
		}
		if (optionalFlags) {
			optionalFlags = nativ.split.call(optionalFlags, "")
			for (i = 0; i < optionalFlags.length; ++i) {
				registerFlag(optionalFlags[i])
			}
		}
		tokens.push({
			regex: copyRegex(regex, {
				addG: true,
				addY: hasNativeY,
				isInternalOnly: true
			}),
			handler: handler,
			scope: options.scope || defaultScope,
			flag: options.flag,
			reparse: options.reparse,
			leadChar: options.leadChar
		})
		XRegExp.cache.flush("patterns")
	}
	XRegExp.cache = function(pattern, flags) {
		if (!regexCache[pattern]) {
			regexCache[pattern] = {}
		}
		return regexCache[pattern][flags] || (regexCache[pattern][flags] = XRegExp(pattern, flags))
	}
	XRegExp.cache.flush = function(cacheName) {
		if (cacheName === "patterns") {
			patternCache = {}
		} else {
			regexCache = {}
		}
	}
	XRegExp.escape = function(str) {
		return nativ.replace.call(toObject(str), /[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
	}
	XRegExp.exec = function(str, regex, pos, sticky) {
		var cacheKey = "g",
			addY = false,
			match, r2
		addY = hasNativeY && !!(sticky || regex.sticky && sticky !== false)
		if (addY) {
			cacheKey += "y"
		}
		regex[REGEX_DATA] = regex[REGEX_DATA] || {}
		r2 = regex[REGEX_DATA][cacheKey] || (regex[REGEX_DATA][cacheKey] = copyRegex(regex, {
			addG: true,
			addY: addY,
			removeY: sticky === false,
			isInternalOnly: true
		}))
		r2.lastIndex = pos = pos || 0
		match = fixed.exec.call(r2, str)
		if (sticky && match && match.index !== pos) {
			match = null
		}
		if (regex.global) {
			regex.lastIndex = match ? r2.lastIndex : 0
		}
		return match
	}
	XRegExp.forEach = function(str, regex, callback) {
		var pos = 0,
			i = -1,
			match
		while (match = XRegExp.exec(str, regex, pos)) {
			callback(match, ++i, str, regex)
			pos = match.index + (match[0].length || 1)
		}
	}
	XRegExp.globalize = function(regex) {
		return copyRegex(regex, {
			addG: true
		})
	}
	XRegExp.install = function(options) {
		options = prepareOptions(options)
		if (!features.astral && options.astral) {
			setAstral(true)
		}
		if (!features.natives && options.natives) {
			setNatives(true)
		}
	}
	XRegExp.isInstalled = function(feature) {
		return !!features[feature]
	}
	XRegExp.isRegExp = function(value) {
		return toString.call(value) === "[object RegExp]"
	}
	XRegExp.match = function(str, regex, scope) {
		var global = regex.global && scope !== "one" || scope === "all",
			cacheKey = (global ? "g" : "") + (regex.sticky ? "y" : "") || "noGY",
			result, r2
		regex[REGEX_DATA] = regex[REGEX_DATA] || {}
		r2 = regex[REGEX_DATA][cacheKey] || (regex[REGEX_DATA][cacheKey] = copyRegex(regex, {
			addG: !!global,
			addY: !!regex.sticky,
			removeG: scope === "one",
			isInternalOnly: true
		}))
		result = nativ.match.call(toObject(str), r2)
		if (regex.global) {
			regex.lastIndex = scope === "one" && result ? result.index + result[0].length : 0
		}
		return global ? result || [] : result && result[0]
	}
	XRegExp.matchChain = function(str, chain) {
		return function recurseChain(values, level) {
			var item = chain[level].regex ? chain[level] : {
					regex: chain[level]
				},
				matches = [],
				addMatch = function addMatch(match) {
					if (item.backref) {
						if (!(match.hasOwnProperty(item.backref) || +item.backref < match.length)) {
							throw new ReferenceError("Backreference to undefined group: " + item.backref)
						}
						matches.push(match[item.backref] || "")
					} else {
						matches.push(match[0])
					}
				},
				i
			for (i = 0; i < values.length; ++i) {
				XRegExp.forEach(values[i], item.regex, addMatch)
			}
			return level === chain.length - 1 || !matches.length ? matches : recurseChain(matches, level + 1)
		}([str], 0)
	}
	XRegExp.replace = function(str, search, replacement, scope) {
		var isRegex = XRegExp.isRegExp(search),
			global = search.global && scope !== "one" || scope === "all",
			cacheKey = (global ? "g" : "") + (search.sticky ? "y" : "") || "noGY",
			s2 = search,
			result
		if (isRegex) {
			search[REGEX_DATA] = search[REGEX_DATA] || {}
			s2 = search[REGEX_DATA][cacheKey] || (search[REGEX_DATA][cacheKey] = copyRegex(search, {
				addG: !!global,
				addY: !!search.sticky,
				removeG: scope === "one",
				isInternalOnly: true
			}))
		} else if (global) {
			s2 = new RegExp(XRegExp.escape(String(search)), "g")
		}
		result = fixed.replace.call(toObject(str), s2, replacement)
		if (isRegex && search.global) {
			search.lastIndex = 0
		}
		return result
	}
	XRegExp.replaceEach = function(str, replacements) {
		var i, r
		for (i = 0; i < replacements.length; ++i) {
			r = replacements[i]
			str = XRegExp.replace(str, r[0], r[1], r[2])
		}
		return str
	}
	XRegExp.split = function(str, separator, limit) {
		return fixed.split.call(toObject(str), separator, limit)
	}
	XRegExp.test = function(str, regex, pos, sticky) {
		return !!XRegExp.exec(str, regex, pos, sticky)
	}
	XRegExp.uninstall = function(options) {
		options = prepareOptions(options)
		if (features.astral && options.astral) {
			setAstral(false)
		}
		if (features.natives && options.natives) {
			setNatives(false)
		}
	}
	XRegExp.union = function(patterns, flags) {
		var parts = /(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*]/g,
			output = [],
			numCaptures = 0,
			numPriorCaptures, captureNames, pattern, rewrite = function rewrite(match, paren, backref) {
				var name = captureNames[numCaptures - numPriorCaptures]
				if (paren) {
					++numCaptures
					if (name) {
						return "(?<" + name + ">"
					}
				} else if (backref) {
					return "\\" + (+backref + numPriorCaptures)
				}
				return match
			},
			i
		if (!(isType(patterns, "Array") && patterns.length)) {
			throw new TypeError("Must provide a nonempty array of patterns to merge")
		}
		for (i = 0; i < patterns.length; ++i) {
			pattern = patterns[i]
			if (XRegExp.isRegExp(pattern)) {
				numPriorCaptures = numCaptures
				captureNames = pattern[REGEX_DATA] && pattern[REGEX_DATA].captureNames || []
				output.push(nativ.replace.call(XRegExp(pattern.source).source, parts, rewrite))
			} else {
				output.push(XRegExp.escape(pattern))
			}
		}
		return XRegExp(output.join("|"), flags)
	}
	fixed.exec = function(str) {
		var origLastIndex = this.lastIndex,
			match = nativ.exec.apply(this, arguments),
			name, r2, i
		if (match) {
			if (!correctExecNpcg && match.length > 1 && indexOf(match, "") > -1) {
				r2 = copyRegex(this, {
					removeG: true,
					isInternalOnly: true
				})
				nativ.replace.call(String(str).slice(match.index), r2, function() {
					var len = arguments.length,
						i
					for (i = 1; i < len - 2; ++i) {
						if (arguments[i] === undefined) {
							match[i] = undefined
						}
					}
				})
			}
			if (this[REGEX_DATA] && this[REGEX_DATA].captureNames) {
				for (i = 1; i < match.length; ++i) {
					name = this[REGEX_DATA].captureNames[i - 1]
					if (name) {
						match[name] = match[i]
					}
				}
			}
			if (this.global && !match[0].length && this.lastIndex > match.index) {
				this.lastIndex = match.index
			}
		}
		if (!this.global) {
			this.lastIndex = origLastIndex
		}
		return match
	}
	fixed.test = function(str) {
		return !!fixed.exec.call(this, str)
	}
	fixed.match = function(regex) {
		var result
		if (!XRegExp.isRegExp(regex)) {
			regex = new RegExp(regex)
		} else if (regex.global) {
			result = nativ.match.apply(this, arguments)
			regex.lastIndex = 0
			return result
		}
		return fixed.exec.call(regex, toObject(this))
	}
	fixed.replace = function(search, replacement) {
		var isRegex = XRegExp.isRegExp(search),
			origLastIndex, captureNames, result
		if (isRegex) {
			if (search[REGEX_DATA]) {
				captureNames = search[REGEX_DATA].captureNames
			}
			origLastIndex = search.lastIndex
		} else {
			search += ""
		}
		if (isType(replacement, "Function")) {
			result = nativ.replace.call(String(this), search, function() {
				var args = arguments,
					i
				if (captureNames) {
					args[0] = new String(args[0])
					for (i = 0; i < captureNames.length; ++i) {
						if (captureNames[i]) {
							args[0][captureNames[i]] = args[i + 1]
						}
					}
				}
				if (isRegex && search.global) {
					search.lastIndex = args[args.length - 2] + args[0].length
				}
				return replacement.apply(undefined, args)
			})
		} else {
			result = nativ.replace.call(this == null ? this : String(this), search, function() {
				var args = arguments
				return nativ.replace.call(String(replacement), replacementToken, function($0, $1, $2) {
					var n
					if ($1) {
						n = +$1
						if (n <= args.length - 3) {
							return args[n] || ""
						}
						n = captureNames ? indexOf(captureNames, $1) : -1
						if (n < 0) {
							throw new SyntaxError("Backreference to undefined group " + $0)
						}
						return args[n + 1] || ""
					}
					if ($2 === "$") {
						return "$"
					}
					if ($2 === "&" || +$2 === 0) {
						return args[0]
					}
					if ($2 === "`") {
						return args[args.length - 1].slice(0, args[args.length - 2])
					}
					if ($2 === "'") {
						return args[args.length - 1].slice(args[args.length - 2] + args[0].length)
					}
					$2 = +$2
					if (!isNaN($2)) {
						if ($2 > args.length - 3) {
							throw new SyntaxError("Backreference to undefined group " + $0)
						}
						return args[$2] || ""
					}
					throw new SyntaxError("Invalid token " + $0)
				})
			})
		}
		if (isRegex) {
			if (search.global) {
				search.lastIndex = 0
			} else {
				search.lastIndex = origLastIndex
			}
		}
		return result
	}
	fixed.split = function(separator, limit) {
		if (!XRegExp.isRegExp(separator)) {
			return nativ.split.apply(this, arguments)
		}
		var str = String(this),
			output = [],
			origLastIndex = separator.lastIndex,
			lastLastIndex = 0,
			lastLength
		limit = (limit === undefined ? -1 : limit) >>> 0
		XRegExp.forEach(str, separator, function(match) {
			if (match.index + match[0].length > lastLastIndex) {
				output.push(str.slice(lastLastIndex, match.index))
				if (match.length > 1 && match.index < str.length) {
					Array.prototype.push.apply(output, match.slice(1))
				}
				lastLength = match[0].length
				lastLastIndex = match.index + lastLength
			}
		})
		if (lastLastIndex === str.length) {
			if (!nativ.test.call(separator, "") || lastLength) {
				output.push("")
			}
		} else {
			output.push(str.slice(lastLastIndex))
		}
		separator.lastIndex = origLastIndex
		return output.length > limit ? output.slice(0, limit) : output
	}
	XRegExp.addToken(/\\([ABCE-RTUVXYZaeg-mopqyz]|c(?![A-Za-z])|u(?![\dA-Fa-f]{4}|{[\dA-Fa-f]+})|x(?![\dA-Fa-f]{2}))/, function(match, scope) {
		if (match[1] === "B" && scope === defaultScope) {
			return match[0]
		}
		throw new SyntaxError("Invalid escape " + match[0])
	}, {
		scope: "all",
		leadChar: "\\"
	})
	XRegExp.addToken(/\\u{([\dA-Fa-f]+)}/, function(match, scope, flags) {
		var code = dec(match[1])
		if (code > 1114111) {
			throw new SyntaxError("Invalid Unicode code point " + match[0])
		}
		if (code <= 65535) {
			return "\\u" + pad4(hex(code))
		}
		if (hasNativeU && flags.indexOf("u") > -1) {
			return match[0]
		}
		throw new SyntaxError("Cannot use Unicode code point above \\u{FFFF} without flag u")
	}, {
		scope: "all",
		leadChar: "\\"
	})
	XRegExp.addToken(/\[(\^?)]/, function(match) {
		return match[1] ? "[\\s\\S]" : "\\b\\B"
	}, {
		leadChar: "["
	})
	XRegExp.addToken(/\(\?#[^)]*\)/, function(match, scope, flags) {
		return isQuantifierNext(match.input, match.index + match[0].length, flags) ? "" : "(?:)"
	}, {
		leadChar: "("
	})
	XRegExp.addToken(/\s+|#.*/, function(match, scope, flags) {
		return isQuantifierNext(match.input, match.index + match[0].length, flags) ? "" : "(?:)"
	}, {
		flag: "x"
	})
	XRegExp.addToken(/\./, function() {
		return "[\\s\\S]"
	}, {
		flag: "s",
		leadChar: "."
	})
	XRegExp.addToken(/\\k<([\w$]+)>/, function(match) {
		var index = isNaN(match[1]) ? indexOf(this.captureNames, match[1]) + 1 : +match[1],
			endIndex = match.index + match[0].length
		if (!index || index > this.captureNames.length) {
			throw new SyntaxError("Backreference to undefined group " + match[0])
		}
		return "\\" + index + (endIndex === match.input.length || isNaN(match.input.charAt(endIndex)) ? "" : "(?:)")
	}, {
		leadChar: "\\"
	})
	XRegExp.addToken(/\\(\d+)/, function(match, scope) {
		if (!(scope === defaultScope && /^[1-9]/.test(match[1]) && +match[1] <= this.captureNames.length) && match[1] !== "0") {
			throw new SyntaxError("Cannot use octal escape or backreference to undefined group " + match[0])
		}
		return match[0]
	}, {
		scope: "all",
		leadChar: "\\"
	})
	XRegExp.addToken(/\(\?P?<([\w$]+)>/, function(match) {
		if (!isNaN(match[1])) {
			throw new SyntaxError("Cannot use integer as capture name " + match[0])
		}
		if (match[1] === "length" || match[1] === "__proto__") {
			throw new SyntaxError("Cannot use reserved word as capture name " + match[0])
		}
		if (indexOf(this.captureNames, match[1]) > -1) {
			throw new SyntaxError("Cannot use same name for multiple groups " + match[0])
		}
		this.captureNames.push(match[1])
		this.hasNamedCapture = true
		return "("
	}, {
		leadChar: "("
	})
	XRegExp.addToken(/\((?!\?)/, function(match, scope, flags) {
		if (flags.indexOf("n") > -1) {
			return "(?:"
		}
		this.captureNames.push(null)
		return "("
	}, {
		optionalFlags: "n",
		leadChar: "("
	})
	module.exports = XRegExp
}, function(module, exports, __webpack_require__) {
	"use strict"
	Object.defineProperty(exports, "__esModule", {
		value: true
	})
	var _match = __webpack_require__(6)
	Object.keys(_match).forEach(function(key) {
		if (key === "default") return
		Object.defineProperty(exports, key, {
			enumerable: true,
			get: function get() {
				return _match[key]
			}
		})
	})
	var _applyRegexList = __webpack_require__(7)
	Object.keys(_applyRegexList).forEach(function(key) {
		if (key === "default") return
		Object.defineProperty(exports, key, {
			enumerable: true,
			get: function get() {
				return _applyRegexList[key]
			}
		})
	})
}, function(module, exports) {
	"use strict"
	Object.defineProperty(exports, "__esModule", {
		value: true
	})
	var _createClass = function() {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i]
				descriptor.enumerable = descriptor.enumerable || false
				descriptor.configurable = true
				if ("value" in descriptor) descriptor.writable = true
				Object.defineProperty(target, descriptor.key, descriptor)
			}
		}
		return function(Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps)
			if (staticProps) defineProperties(Constructor, staticProps)
			return Constructor
		}
	}()

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function")
		}
	}
	var Match = exports.Match = function() {
		function Match(value, index, css) {
			_classCallCheck(this, Match)
			this.value = value
			this.index = index
			this.length = value.length
			this.css = css
			this.brushName = null
		}
		_createClass(Match, [{
			key: "toString",
			value: function toString() {
				return this.value
			}
		}])
		return Match
	}()
}, function(module, exports, __webpack_require__) {
	"use strict"
	Object.defineProperty(exports, "__esModule", {
		value: true
	})
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
		return typeof obj
	} : function(obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj
	}
	exports.applyRegexList = applyRegexList
	var _matches = __webpack_require__(8)

	function applyRegexList(code, regexList) {
		var result = []
		regexList = regexList || []
		for (var i = 0, l = regexList.length; i < l; i++) {
			if (_typeof(regexList[i]) === "object") result = result.concat((0, _matches.find)(code, regexList[i]))
		}
		result = (0, _matches.sort)(result)
		result = (0, _matches.removeNested)(result)
		result = (0, _matches.compact)(result)
		return result
	}
}, function(module, exports, __webpack_require__) {
	"use strict"
	Object.defineProperty(exports, "__esModule", {
		value: true
	})
	exports.find = find
	exports.sort = sort
	exports.compact = compact
	exports.removeNested = removeNested
	var _match = __webpack_require__(6)
	var _syntaxhighlighterRegex = __webpack_require__(3)

	function find(code, regexInfo) {
		function defaultAdd(match, regexInfo) {
			return match[0]
		}
		var index = 0,
			match = null,
			matches = [],
			process = regexInfo.func ? regexInfo.func : defaultAdd,
			pos = 0
		while (match = _syntaxhighlighterRegex.XRegExp.exec(code, regexInfo.regex, pos)) {
			var resultMatch = process(match, regexInfo)
			if (typeof resultMatch === "string") resultMatch = [new _match.Match(resultMatch, match.index, regexInfo.css)]
			matches = matches.concat(resultMatch)
			pos = match.index + match[0].length
		}
		return matches
	}

	function sort(matches) {
		function sortMatchesCallback(m1, m2) {
			if (m1.index < m2.index) return -1
			else if (m1.index > m2.index) return 1
			else {
				if (m1.length < m2.length) return -1
				else if (m1.length > m2.length) return 1
			}
			return 0
		}
		return matches.sort(sortMatchesCallback)
	}

	function compact(matches) {
		var result = [],
			i, l
		for (i = 0, l = matches.length; i < l; i++) {
			if (matches[i]) result.push(matches[i])
		}
		return result
	}

	function removeNested(matches) {
		for (var i = 0, l = matches.length; i < l; i++) {
			if (matches[i] === null) continue
			var itemI = matches[i],
				itemIEndPos = itemI.index + itemI.length
			for (var j = i + 1, l = matches.length; j < l && matches[i] !== null; j++) {
				var itemJ = matches[j]
				if (itemJ === null) continue
				else if (itemJ.index > itemIEndPos) break
				else if (itemJ.index == itemI.index && itemJ.length > itemI.length) matches[i] = null
				else if (itemJ.index >= itemI.index && itemJ.index < itemIEndPos) matches[j] = null
			}
		}
		return matches
	}
}, function(module, exports) {
	"use strict"
	Object.defineProperty(exports, "__esModule", {
		value: true
	})
	exports.default = Renderer

	function padNumber(number, length) {
		var result = number.toString()
		while (result.length < length) {
			result = "0" + result
		}
		return result
	}

	function getLines(str) {
		return str.split(/\r?\n/)
	}

	function getLinesToHighlight(opts) {
		var results = {},
			linesToHighlight, l, i
		linesToHighlight = opts.highlight || []
		if (typeof linesToHighlight.push !== "function") linesToHighlight = [linesToHighlight]
		for (i = 0, l = linesToHighlight.length; i < l; i++) {
			results[linesToHighlight[i]] = true
		}
		return results
	}

	function Renderer(code, matches, opts) {
		var _this = this
		_this.opts = opts
		_this.code = code
		_this.matches = matches
		_this.lines = getLines(code)
		_this.linesToHighlight = getLinesToHighlight(opts)
	}
	Renderer.prototype = {
		wrapLinesWithCode: function wrapLinesWithCode(str, css) {
			if (str == null || str.length == 0 || str == "\n" || css == null) return str
			var _this = this,
				results = [],
				lines, line, spaces, i, l
			str = str.replace(/</g, "&lt;")
			str = str.replace(/ {2,}/g, function(m) {
				spaces = ""
				for (i = 0, l = m.length; i < l - 1; i++) {
					spaces += _this.opts.space
				}
				return spaces + " "
			})
			lines = getLines(str)
			for (i = 0, l = lines.length; i < l; i++) {
				line = lines[i]
				spaces = ""
				if (line.length > 0) {
					line = line.replace(/^(&nbsp;| )+/, function(s) {
						spaces = s
						return ""
					})
					line = line.length === 0 ? spaces : spaces + '<code class="' + css + '">' + line + "</code>"
				}
				results.push(line)
			}
			return results.join("\n")
		},
		processUrls: function processUrls(code) {
			var gt = /(.*)((&gt;|&lt;).*)/,
				url = /\w+:\/\/[\w-.\/?%&=:@;#]*/g
			return code.replace(url, function(m) {
				var suffix = "",
					match = null
				if (match = gt.exec(m)) {
					m = match[1]
					suffix = match[2]
				}
				return '<a href="' + m + '">' + m + "</a>" + suffix
			})
		},
		figureOutLineNumbers: function figureOutLineNumbers(code) {
			var lineNumbers = [],
				lines = this.lines,
				firstLine = parseInt(this.opts.firstLine || 1),
				i, l
			for (i = 0, l = lines.length; i < l; i++) {
				lineNumbers.push(i + firstLine)
			}
			return lineNumbers
		},
		wrapLine: function wrapLine(lineIndex, lineNumber, lineHtml) {
			var classes = ["line", "number" + lineNumber, "index" + lineIndex, "alt" + (lineNumber % 2 == 0 ? 1 : 2).toString()]
			if (this.linesToHighlight[lineNumber]) classes.push("highlighted")
			if (lineNumber == 0) classes.push("break")
			return '<div class="' + classes.join(" ") + '">' + lineHtml + "</div>"
		},
		renderLineNumbers: function renderLineNumbers(code, lineNumbers) {
			var _this = this,
				opts = _this.opts,
				html = "",
				count = _this.lines.length,
				firstLine = parseInt(opts.firstLine || 1),
				pad = opts.padLineNumbers,
				lineNumber, i
			if (pad == true) pad = (firstLine + count - 1).toString().length
			else if (isNaN(pad) == true) pad = 0
			for (i = 0; i < count; i++) {
				lineNumber = lineNumbers ? lineNumbers[i] : firstLine + i
				code = lineNumber == 0 ? opts.space : padNumber(lineNumber, pad)
				html += _this.wrapLine(i, lineNumber, code)
			}
			return html
		},
		getCodeLinesHtml: function getCodeLinesHtml(html, lineNumbers) {
			var _this = this,
				opts = _this.opts,
				lines = getLines(html),
				padLength = opts.padLineNumbers,
				firstLine = parseInt(opts.firstLine || 1),
				brushName = opts.brush,
				html = ""
			for (var i = 0, l = lines.length; i < l; i++) {
				var line = lines[i],
					indent = /^(&nbsp;|\s)+/.exec(line),
					spaces = null,
					lineNumber = lineNumbers ? lineNumbers[i] : firstLine + i
				if (indent != null) {
					spaces = indent[0].toString()
					line = line.substr(spaces.length)
					spaces = spaces.replace(" ", opts.space)
				}
				if (line.length == 0) line = opts.space
				html += _this.wrapLine(i, lineNumber, (spaces != null ? '<code class="' + brushName + ' spaces">' + spaces + "</code>" : "") + line)
			}
			return html
		},
		getTitleHtml: function getTitleHtml(title) {
			return title ? "<caption>" + title + "</caption>" : ""
		},
		getMatchesHtml: function getMatchesHtml(code, matches) {
			function getBrushNameCss(match) {
				var result = match ? match.brushName || brushName : brushName
				return result ? result + " " : ""
			}
			var _this = this,
				pos = 0,
				result = "",
				brushName = _this.opts.brush || "",
				match, matchBrushName, i, l
			for (i = 0, l = matches.length; i < l; i++) {
				match = matches[i]
				if (match === null || match.length === 0) continue
				matchBrushName = getBrushNameCss(match)
				result += _this.wrapLinesWithCode(code.substr(pos, match.index - pos), matchBrushName + "plain") + _this.wrapLinesWithCode(match.value, matchBrushName + match.css)
				pos = match.index + match.length + (match.offset || 0)
			}
			result += _this.wrapLinesWithCode(code.substr(pos), getBrushNameCss() + "plain")
			return result
		},
		getHtml: function getHtml() {
			var _this = this,
				opts = _this.opts,
				code = _this.code,
				matches = _this.matches,
				classes = ["syntaxhighlighter"],
				lineNumbers, gutter, html
			if (opts.collapse === true) classes.push("collapsed")
			gutter = opts.gutter !== false
			if (!gutter) classes.push("nogutter")
			classes.push(opts.className)
			classes.push(opts.brush)
			if (gutter) lineNumbers = _this.figureOutLineNumbers(code)
			html = _this.getMatchesHtml(code, matches)
			html = _this.getCodeLinesHtml(html, lineNumbers)
			if (opts.autoLinks) html = _this.processUrls(html)
			html = '\n      <div class="' + classes.join(" ") + '">\n        <table border="0" cellpadding="0" cellspacing="0">\n          ' + _this.getTitleHtml(opts.title) + "\n          <tbody>\n            <tr>\n              " + (gutter ? '<td class="gutter">' + _this.renderLineNumbers(code) + "</td>" : "") + '\n              <td class="code">\n                <div class="container">' + html + "</div>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    "
			return html
		}
	}
}, function(module, exports) {
	"use strict"

	function splitLines(block) {
		return block.split(/\r?\n/)
	}

	function eachLine(str, callback) {
		var lines = splitLines(str)
		for (var i = 0, l = lines.length; i < l; i++) {
			lines[i] = callback(lines[i], i)
		}
		return lines.join("\n")
	}

	function guid(prefix) {
		return (prefix || "") + Math.round(Math.random() * 1e6).toString()
	}

	function merge(obj1, obj2) {
		var result = {},
			name
		for (name in obj1) {
			result[name] = obj1[name]
		}
		for (name in obj2) {
			result[name] = obj2[name]
		}
		return result
	}

	function trim(str) {
		return str.replace(/^\s+|\s+$/g, "")
	}

	function toArray(source) {
		return Array.prototype.slice.apply(source)
	}

	function toBoolean(value) {
		var result = {
			"true": true,
			"false": false
		}[value]
		return result == null ? value : result
	}
	module.exports = {
		splitLines: splitLines,
		eachLine: eachLine,
		guid: guid,
		merge: merge,
		trim: trim,
		toArray: toArray,
		toBoolean: toBoolean
	}
}, function(module, exports, __webpack_require__) {
	"use strict"
	var trim = __webpack_require__(12),
		bloggerMode = __webpack_require__(13),
		stripBrs = __webpack_require__(14),
		unindenter = __webpack_require__(15),
		retabber = __webpack_require__(16)
	module.exports = function(code, opts) {
		code = trim(code, opts)
		code = bloggerMode(code, opts)
		code = stripBrs(code, opts)
		code = unindenter.unindent(code, opts)
		var tabSize = opts["tab-size"]
		code = opts["smart-tabs"] === true ? retabber.smart(code, tabSize) : retabber.regular(code, tabSize)
		return code
	}
}, function(module, exports) {
	"use strict"
	module.exports = function(code, opts) {
		return code.replace(/^[ ]*[\n]+|[\n]*[ ]*$/g, "").replace(/\r/g, " ")
	}
}, function(module, exports) {
	"use strict"
	module.exports = function(code, opts) {
		var br = /<br\s*\/?>|&lt;br\s*\/?&gt;/gi
		if (opts["bloggerMode"] === true) code = code.replace(br, "\n")
		return code
	}
}, function(module, exports) {
	"use strict"
	module.exports = function(code, opts) {
		var br = /<br\s*\/?>|&lt;br\s*\/?&gt;/gi
		if (opts["stripBrs"] === true) code = code.replace(br, "")
		return code
	}
}, function(module, exports) {
	"use strict"

	function isEmpty(str) {
		return /^\s*$/.test(str)
	}
	module.exports = {
		unindent: function unindent(code) {
			var lines = code.split(/\r?\n/),
				regex = /^\s*/,
				min = 1e3,
				line, matches, i, l
			for (i = 0, l = lines.length; i < l && min > 0; i++) {
				line = lines[i]
				if (isEmpty(line)) continue
				matches = regex.exec(line)
				if (matches == null) return code
				min = Math.min(matches[0].length, min)
			}
			if (min > 0)
				for (i = 0, l = lines.length; i < l; i++) {
					if (!isEmpty(lines[i])) lines[i] = lines[i].substr(min)
				}
			return lines.join("\n")
		}
	}
}, function(module, exports) {
	"use strict"
	var spaces = ""
	for (var i = 0; i < 50; i++) {
		spaces += "                    "
	}

	function insertSpaces(line, pos, count) {
		return line.substr(0, pos) + spaces.substr(0, count) + line.substr(pos + 1, line.length)
	}
	module.exports = {
		smart: function smart(code, tabSize) {
			var lines = code.split(/\r?\n/),
				tab = "	",
				line, pos, i, l
			for (i = 0, l = lines.length; i < l; i++) {
				line = lines[i]
				if (line.indexOf(tab) === -1) continue
				pos = 0
				while ((pos = line.indexOf(tab)) !== -1) {
					line = insertSpaces(line, pos, tabSize - pos % tabSize)
				}
				lines[i] = line
			}
			return lines.join("\n")
		},
		regular: function regular(code, tabSize) {
			return code.replace(/\t/g, spaces.substr(0, tabSize))
		}
	}
}, function(module, exports) {
	"use strict"

	function getSyntaxHighlighterScriptTags() {
		var tags = document.getElementsByTagName("script"),
			result = []
		for (var i = 0; i < tags.length; i++) {
			if (tags[i].type == "text/syntaxhighlighter" || tags[i].type == "syntaxhighlighter") result.push(tags[i])
		}
		return result
	}

	function hasClass(target, className) {
		return target.className.indexOf(className) != -1
	}

	function addClass(target, className) {
		if (!hasClass(target, className)) target.className += " " + className
	}

	function removeClass(target, className) {
		target.className = target.className.replace(className, "")
	}

	function attachEvent(obj, type, func, scope) {
		function handler(e) {
			e = e || window.event
			if (!e.target) {
				e.target = e.srcElement
				e.preventDefault = function() {
					this.returnValue = false
				}
			}
			func.call(scope || window, e)
		}
		if (obj.attachEvent) {
			obj.attachEvent("on" + type, handler)
		} else {
			obj.addEventListener(type, handler, false)
		}
	}

	function findElement(target, search, reverse) {
		if (target == null) return null
		var nodes = reverse != true ? target.childNodes : [target.parentNode],
			propertyToFind = {
				"#": "id",
				".": "className"
			}[search.substr(0, 1)] || "nodeName",
			expectedValue, found
		expectedValue = propertyToFind != "nodeName" ? search.substr(1) : search.toUpperCase()
		if ((target[propertyToFind] || "").indexOf(expectedValue) != -1) return target
		for (var i = 0, l = nodes.length; nodes && i < l && found == null; i++) {
			found = findElement(nodes[i], search, reverse)
		}
		return found
	}

	function findParentElement(target, className) {
		return findElement(target, className, true)
	}

	function popup(url, name, width, height, options) {
		var x = (screen.width - width) / 2,
			y = (screen.height - height) / 2
		options += ", left=" + x + ", top=" + y + ", width=" + width + ", height=" + height
		options = options.replace(/^,/, "")
		var win = window.open(url, name, options)
		win.focus()
		return win
	}

	function getElementsByTagName(name) {
		return document.getElementsByTagName(name)
	}

	function findElementsToHighlight(opts) {
		var elements = getElementsByTagName(opts["tagName"]),
			scripts, i
		if (opts["useScriptTags"]) {
			scripts = getElementsByTagName("script")
			for (i = 0; i < scripts.length; i++) {
				if (scripts[i].type.match(/^(text\/)?syntaxhighlighter$/)) elements.push(scripts[i])
			}
		}
		return elements
	}

	function create(name) {
		return document.createElement(name)
	}

	function quickCodeHandler(e) {
		var target = e.target,
			highlighterDiv = findParentElement(target, ".syntaxhighlighter"),
			container = findParentElement(target, ".container"),
			textarea = document.createElement("textarea"),
			highlighter
		if (!container || !highlighterDiv || findElement(container, "textarea")) return
		addClass(highlighterDiv, "source")
		var lines = container.childNodes,
			code = []
		for (var i = 0, l = lines.length; i < l; i++) {
			code.push(lines[i].innerText || lines[i].textContent)
		}
		code = code.join("\r")
		code = code.replace(/\u00a0/g, " ")
		textarea.readOnly = true
		textarea.appendChild(document.createTextNode(code))
		container.appendChild(textarea)
		textarea.focus()
		textarea.select()
		attachEvent(textarea, "blur", function(e) {
			textarea.parentNode.removeChild(textarea)
			removeClass(highlighterDiv, "source")
		})
	}
	module.exports = {
		quickCodeHandler: quickCodeHandler,
		create: create,
		popup: popup,
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		attachEvent: attachEvent,
		findElement: findElement,
		findParentElement: findParentElement,
		getSyntaxHighlighterScriptTags: getSyntaxHighlighterScriptTags,
		findElementsToHighlight: findElementsToHighlight
	}
}, function(module, exports) {
	"use strict"
	module.exports = {
		space: "&nbsp;",
		useScriptTags: true,
		bloggerMode: false,
		stripBrs: false,
		tagName: "pre"
	}
}, function(module, exports) {
	"use strict"
	module.exports = {
		"class-name": "",
		"first-line": 1,
		"pad-line-numbers": false,
		highlight: null,
		title: null,
		"smart-tabs": true,
		"tab-size": 4,
		gutter: true,
		"quick-code": true,
		collapse: false,
		"auto-links": true,
		unindent: true,
		"html-script": false
	}
}, function(module, exports, __webpack_require__) {
	(function(process) {
		"use strict"
		var applyRegexList = __webpack_require__(5).applyRegexList

		function HtmlScript(BrushXML, brushClass) {
			var scriptBrush, xmlBrush = new BrushXML
			if (brushClass == null) return
			scriptBrush = new brushClass
			if (scriptBrush.htmlScript == null) throw new Error("Brush wasn't configured for html-script option: " + brushClass.brushName)
			xmlBrush.regexList.push({
				regex: scriptBrush.htmlScript.code,
				func: process
			})
			this.regexList = xmlBrush.regexList

			function offsetMatches(matches, offset) {
				for (var j = 0, l = matches.length; j < l; j++) {
					matches[j].index += offset
				}
			}

			function process(match, info) {
				var code = match.code,
					results = [],
					regexList = scriptBrush.regexList,
					offset = match.index + match.left.length,
					htmlScript = scriptBrush.htmlScript,
					matches

				function add(matches) {
					results = results.concat(matches)
				}
				matches = applyRegexList(code, regexList)
				offsetMatches(matches, offset)
				add(matches)
				if (htmlScript.left != null && match.left != null) {
					matches = applyRegexList(match.left, [htmlScript.left])
					offsetMatches(matches, match.index)
					add(matches)
				}
				if (htmlScript.right != null && match.right != null) {
					matches = applyRegexList(match.right, [htmlScript.right])
					offsetMatches(matches, match.index + match[0].lastIndexOf(match.right))
					add(matches)
				}
				for (var j = 0, l = results.length; j < l; j++) {
					results[j].brushName = brushClass.brushName
				}
				return results
			}
		}
		module.exports = HtmlScript
	}).call(exports, __webpack_require__(21))
}, function(module, exports) {
	"use strict"
	var process = module.exports = {}
	var cachedSetTimeout = setTimeout
	var cachedClearTimeout = clearTimeout
	var queue = []
	var draining = false
	var currentQueue
	var queueIndex = -1

	function cleanUpNextTick() {
		if (!draining || !currentQueue) {
			return
		}
		draining = false
		if (currentQueue.length) {
			queue = currentQueue.concat(queue)
		} else {
			queueIndex = -1
		}
		if (queue.length) {
			drainQueue()
		}
	}

	function drainQueue() {
		if (draining) {
			return
		}
		var timeout = cachedSetTimeout(cleanUpNextTick)
		draining = true
		var len = queue.length
		while (len) {
			currentQueue = queue
			queue = []
			while (++queueIndex < len) {
				if (currentQueue) {
					currentQueue[queueIndex].run()
				}
			}
			queueIndex = -1
			len = queue.length
		}
		currentQueue = null
		draining = false
		cachedClearTimeout(timeout)
	}
	process.nextTick = function(fun) {
		var args = new Array(arguments.length - 1)
		if (arguments.length > 1) {
			for (var i = 1; i < arguments.length; i++) {
				args[i - 1] = arguments[i]
			}
		}
		queue.push(new Item(fun, args))
		if (queue.length === 1 && !draining) {
			cachedSetTimeout(drainQueue, 0)
		}
	}

	function Item(fun, array) {
		this.fun = fun
		this.array = array
	}
	Item.prototype.run = function() {
		this.fun.apply(null, this.array)
	}
	process.title = "browser"
	process.browser = true
	process.env = {}
	process.argv = []
	process.version = ""
	process.versions = {}

	function noop() {}
	process.on = noop
	process.addListener = noop
	process.once = noop
	process.off = noop
	process.removeListener = noop
	process.removeAllListeners = noop
	process.emit = noop
	process.binding = function(name) {
		throw new Error("process.binding is not supported")
	}
	process.cwd = function() {
		return "/"
	}
	process.chdir = function(dir) {
		throw new Error("process.chdir is not supported")
	}
	process.umask = function() {
		return 0
	}
}, function(module, exports, __webpack_require__) {
	"use strict"
	var _createClass = function() {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i]
				descriptor.enumerable = descriptor.enumerable || false
				descriptor.configurable = true
				if ("value" in descriptor) descriptor.writable = true
				Object.defineProperty(target, descriptor.key, descriptor)
			}
		}
		return function(Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps)
			if (staticProps) defineProperties(Constructor, staticProps)
			return Constructor
		}
	}()
	var _syntaxhighlighterHtmlRenderer = __webpack_require__(9)
	var _syntaxhighlighterHtmlRenderer2 = _interopRequireDefault(_syntaxhighlighterHtmlRenderer)
	var _syntaxhighlighterRegex = __webpack_require__(3)
	var _syntaxhighlighterMatch = __webpack_require__(5)

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			"default": obj
		}
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function")
		}
	}
	module.exports = function() {
		function BrushBase() {
			_classCallCheck(this, BrushBase)
		}
		_createClass(BrushBase, [{
			key: "getKeywords",
			value: function getKeywords(str) {
				var results = str.replace(/^\s+|\s+$/g, "").replace(/\s+/g, "|")
				return "\\b(?:" + results + ")\\b"
			}
		}, {
			key: "forHtmlScript",
			value: function forHtmlScript(regexGroup) {
				var regex = {
					end: regexGroup.right.source
				}
				if (regexGroup.eof) {
					regex.end = "(?:(?:" + regex.end + ")|$)"
				}
				this.htmlScript = {
					left: {
						regex: regexGroup.left,
						css: "script"
					},
					right: {
						regex: regexGroup.right,
						css: "script"
					},
					code: (0, _syntaxhighlighterRegex.XRegExp)("(?<left>" + regexGroup.left.source + ")" + "(?<code>.*?)" + "(?<right>" + regex.end + ")", "sgi")
				}
			}
		}, {
			key: "getHtml",
			value: function getHtml(code) {
				var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1]
				var matches = (0, _syntaxhighlighterMatch.applyRegexList)(code, this.regexList)
				var renderer = new _syntaxhighlighterHtmlRenderer2.default(code, matches, params)
				return renderer.getHtml()
			}
		}])
		return BrushBase
	}()
}, function(module, exports, __webpack_require__) {
	"use strict"
	var BrushBase = __webpack_require__(22)
	var regexLib = __webpack_require__(3).commonRegExp
	var XRegExp = __webpack_require__(3).XRegExp
	var Match = __webpack_require__(5).Match

	function Brush() {
		function hereDocProcess(match, regexInfo) {
			var result = []
			if (match.here_doc != null) result.push(new Match(match.here_doc, match.index + match[0].indexOf(match.here_doc), "string"))
			if (match.full_tag != null) result.push(new Match(match.full_tag, match.index, "preprocessor"))
			if (match.end_tag != null) result.push(new Match(match.end_tag, match.index + match[0].lastIndexOf(match.end_tag), "preprocessor"))
			return result
		}
		var keywords = "if fi then elif else for do done until while break continue case esac function return in eq ne ge le"
		var commands = "alias apropos awk basename base64 bash bc bg builtin bunzip2 bzcat bzip2 bzip2recover cal cat cd cfdisk chgrp chmod chown chroot" + "cksum clear cmp comm command cp cron crontab crypt csplit cut date dc dd ddrescue declare df " + "diff diff3 dig dir dircolors dirname dirs du echo egrep eject enable env ethtool eval " + "exec exit expand export expr false fdformat fdisk fg fgrep file find fmt fold format " + "free fsck ftp gawk gcc gdb getconf getopts grep groups gunzip gzcat gzip hash head history hostname id ifconfig " + "import install join kill less let ln local locate logname logout look lpc lpr lprint " + "lprintd lprintq lprm ls lsof make man mkdir mkfifo mkisofs mknod more mount mtools " + "mv nasm nc ndisasm netstat nice nl nohup nslookup objdump od open op passwd paste pathchk ping popd pr printcap " + "printenv printf ps pushd pwd quota quotacheck quotactl ram rcp read readonly renice " + "remsync rm rmdir rsync screen scp sdiff sed select seq set sftp shift shopt shutdown " + "sleep sort source split ssh strace strings su sudo sum symlink sync tail tar tee test time " + "times touch top traceroute trap tr true tsort tty type ulimit umask umount unalias " + "uname unexpand uniq units unset unshar useradd usermod users uuencode uudecode v vdir " + "vi watch wc whereis which who whoami Wget xargs xxd yes chsh zcat"
		this.regexList = [{
			regex: /^#!.*$/gm,
			css: "preprocessor bold"
		}, {
			regex: /\/[\w-\/]+/gm,
			css: "plain"
		}, {
			regex: regexLib.singleLinePerlComments,
			css: "comments"
		}, {
			regex: regexLib.doubleQuotedString,
			css: "string"
		}, {
			regex: regexLib.singleQuotedString,
			css: "string"
		}, {
			regex: new RegExp(this.getKeywords(keywords), "gm"),
			css: "keyword"
		}, {
			regex: new RegExp(this.getKeywords(commands), "gm"),
			css: "functions"
		}, {
			regex: new XRegExp("(?<full_tag>(&lt;|<){2}(?<tag>\\w+)) .*$(?<here_doc>[\\s\\S]*)(?<end_tag>^\\k<tag>$)", "gm"),
			func: hereDocProcess
		}]
	}
	Brush.prototype = new BrushBase
	Brush.aliases = ["bash", "shell", "sh"]
	module.exports = Brush
}, function(module, exports, __webpack_require__) {
	"use strict"
	var BrushBase = __webpack_require__(22)
	var regexLib = __webpack_require__(3).commonRegExp

	function Brush() {
		function getKeywordsCSS(str) {
			return "\\b([a-z_]|)" + str.replace(/ /g, "(?=:)\\b|\\b([a-z_\\*]|\\*|)") + "(?=:)\\b"
		}

		function getValuesCSS(str) {
			return "\\b" + str.replace(/ /g, "(?!-)(?!:)\\b|\\b()") + ":\\b"
		}
		var keywords = "ascent azimuth background-attachment background-color background-image background-position " + "background-repeat background baseline bbox border-collapse border-color border-spacing border-style border-top " + "border-right border-bottom border-left border-top-color border-right-color border-bottom-color border-left-color " + "border-top-style border-right-style border-bottom-style border-left-style border-top-width border-right-width " + "border-bottom-width border-left-width border-width border bottom cap-height caption-side centerline clear clip color " + "content counter-increment counter-reset cue-after cue-before cue cursor definition-src descent direction display " + "elevation empty-cells float font-size-adjust font-family font-size font-stretch font-style font-variant font-weight font " + "height left letter-spacing line-height list-style-image list-style-position list-style-type list-style margin-top " + "margin-right margin-bottom margin-left margin marker-offset marks mathline max-height max-width min-height min-width orphans " + "outline-color outline-style outline-width outline overflow padding-top padding-right padding-bottom padding-left padding page " + "page-break-after page-break-before page-break-inside pause pause-after pause-before pitch pitch-range play-during position " + "quotes right richness size slope src speak-header speak-numeral speak-punctuation speak speech-rate stemh stemv stress " + "table-layout text-align top text-decoration text-indent text-shadow text-transform unicode-bidi unicode-range units-per-em " + "vertical-align visibility voice-family volume white-space widows width widths word-spacing x-height z-index"
		var values = "above absolute all always aqua armenian attr aural auto avoid baseline behind below bidi-override black blink block blue bold bolder " + "both bottom braille capitalize caption center center-left center-right circle close-quote code collapse compact condensed " + "continuous counter counters crop cross crosshair cursive dashed decimal decimal-leading-zero default digits disc dotted double " + "embed embossed e-resize expanded extra-condensed extra-expanded fantasy far-left far-right fast faster fixed format fuchsia " + "gray green groove handheld hebrew help hidden hide high higher icon inline-table inline inset inside invert italic " + "justify landscape large larger left-side left leftwards level lighter lime line-through list-item local loud lower-alpha " + "lowercase lower-greek lower-latin lower-roman lower low ltr marker maroon medium message-box middle mix move narrower " + "navy ne-resize no-close-quote none no-open-quote no-repeat normal nowrap n-resize nw-resize oblique olive once open-quote outset " + "outside overline pointer portrait pre print projection purple red relative repeat repeat-x repeat-y rgb ridge right right-side " + "rightwards rtl run-in screen scroll semi-condensed semi-expanded separate se-resize show silent silver slower slow " + "small small-caps small-caption smaller soft solid speech spell-out square s-resize static status-bar sub super sw-resize " + "table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group teal " + "text-bottom text-top thick thin top transparent tty tv ultra-condensed ultra-expanded underline upper-alpha uppercase upper-latin " + "upper-roman url visible wait white wider w-resize x-fast x-high x-large x-loud x-low x-slow x-small x-soft xx-large xx-small yellow"
		var fonts = "[mM]onospace [tT]ahoma [vV]erdana [aA]rial [hH]elvetica [sS]ans-serif [sS]erif [cC]ourier mono sans serif"
		this.regexList = [{
			regex: regexLib.multiLineCComments,
			css: "comments"
		}, {
			regex: regexLib.doubleQuotedString,
			css: "string"
		}, {
			regex: regexLib.singleQuotedString,
			css: "string"
		}, {
			regex: /\#[a-fA-F0-9]{3,6}/g,
			css: "value"
		}, {
			regex: /(-?\d+)(\.\d+)?(px|em|pt|\:|\%|)/g,
			css: "value"
		}, {
			regex: /!important/g,
			css: "color3"
		}, {
			regex: new RegExp(getKeywordsCSS(keywords), "gm"),
			css: "keyword"
		}, {
			regex: new RegExp(getValuesCSS(values), "g"),
			css: "value"
		}, {
			regex: new RegExp(this.getKeywords(fonts), "g"),
			css: "color1"
		}]
		this.forHtmlScript({
			left: /(&lt;|<)\s*style.*?(&gt;|>)/gi,
			right: /(&lt;|<)\/\s*style\s*(&gt;|>)/gi
		})
	}
	Brush.prototype = new BrushBase
	Brush.aliases = ["css"]
	module.exports = Brush
}, function(module, exports, __webpack_require__) {
	"use strict"
	var BrushBase = __webpack_require__(22)
	var regexLib = __webpack_require__(3).commonRegExp

	function Brush() {
		var keywords = "break case catch class continue " + "default delete do else enum export extends false  " + "for from as function if implements import in instanceof " + "interface let new null package private protected " + "static return super switch " + "this throw true try typeof var while with yield"
		this.regexList = [{
			regex: regexLib.multiLineDoubleQuotedString,
			css: "string"
		}, {
			regex: regexLib.multiLineSingleQuotedString,
			css: "string"
		}, {
			regex: regexLib.singleLineCComments,
			css: "comments"
		}, {
			regex: regexLib.multiLineCComments,
			css: "comments"
		}, {
			regex: /\s*#.*/gm,
			css: "preprocessor"
		}, {
			regex: new RegExp(this.getKeywords(keywords), "gm"),
			css: "keyword"
		}]
		this.forHtmlScript(regexLib.scriptScriptTags)
	}
	Brush.prototype = new BrushBase
	Brush.aliases = ["js", "jscript", "javascript", "json"]
	module.exports = Brush
}, function(module, exports, __webpack_require__) {
	"use strict"
	Object.defineProperty(exports, "__esModule", {
		value: true
	})
	var _createClass = function() {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i]
				descriptor.enumerable = descriptor.enumerable || false
				descriptor.configurable = true
				if ("value" in descriptor) descriptor.writable = true
				Object.defineProperty(target, descriptor.key, descriptor)
			}
		}
		return function(Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps)
			if (staticProps) defineProperties(Constructor, staticProps)
			return Constructor
		}
	}()
	var _brushBase = __webpack_require__(22)
	var _brushBase2 = _interopRequireDefault(_brushBase)
	var _syntaxhighlighterRegex = __webpack_require__(3)

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			"default": obj
		}
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function")
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
		}
		return call && (typeof call === "object" || typeof call === "function") ? call : self
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass)
		}
		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		})
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass
	}
	var functions = "abs acos acosh addcslashes addslashes " + "array_change_key_case array_chunk array_combine array_count_values array_diff " + "array_diff_assoc array_diff_key array_diff_uassoc array_diff_ukey array_fill " + "array_filter array_flip array_intersect array_intersect_assoc array_intersect_key " + "array_intersect_uassoc array_intersect_ukey array_key_exists array_keys array_map " + "array_merge array_merge_recursive array_multisort array_pad array_pop array_product " + "array_push array_rand array_reduce array_reverse array_search array_shift " + "array_slice array_splice array_sum array_udiff array_udiff_assoc " + "array_udiff_uassoc array_uintersect array_uintersect_assoc " + "array_uintersect_uassoc array_unique array_unshift array_values array_walk " + "array_walk_recursive atan atan2 atanh base64_decode base64_encode base_convert " + "basename bcadd bccomp bcdiv bcmod bcmul bindec bindtextdomain bzclose bzcompress " + "bzdecompress bzerrno bzerror bzerrstr bzflush bzopen bzread bzwrite ceil chdir " + "checkdate checkdnsrr chgrp chmod chop chown chr chroot chunk_split class_exists " + "closedir closelog copy cos cosh count count_chars date decbin dechex decoct " + "deg2rad delete ebcdic2ascii echo empty end ereg ereg_replace eregi eregi_replace error_log " + "error_reporting escapeshellarg escapeshellcmd eval exec exit exp explode extension_loaded " + "feof fflush fgetc fgetcsv fgets fgetss file_exists file_get_contents file_put_contents " + "fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype " + "floatval flock floor flush fmod fnmatch fopen fpassthru fprintf fputcsv fputs fread fscanf " + "fseek fsockopen fstat ftell ftok getallheaders getcwd getdate getenv gethostbyaddr gethostbyname " + "gethostbynamel getimagesize getlastmod getmxrr getmygid getmyinode getmypid getmyuid getopt " + "getprotobyname getprotobynumber getrandmax getrusage getservbyname getservbyport gettext " + "gettimeofday gettype glob gmdate gmmktime ini_alter ini_get ini_get_all ini_restore ini_set " + "interface_exists intval ip2long is_a is_array is_bool is_callable is_dir is_double " + "is_executable is_file is_finite is_float is_infinite is_int is_integer is_link is_long " + "is_nan is_null is_numeric is_object is_readable is_real is_resource is_scalar is_soap_fault " + "is_string is_subclass_of is_uploaded_file is_writable is_writeable mkdir mktime nl2br " + "parse_ini_file parse_str parse_url passthru pathinfo print readlink realpath rewind rewinddir rmdir " + "round str_ireplace str_pad str_repeat str_replace str_rot13 str_shuffle str_split " + "str_word_count strcasecmp strchr strcmp strcoll strcspn strftime strip_tags stripcslashes " + "stripos stripslashes stristr strlen strnatcasecmp strnatcmp strncasecmp strncmp strpbrk " + "strpos strptime strrchr strrev strripos strrpos strspn strstr strtok strtolower strtotime " + "strtoupper strtr strval substr substr_compare"
	var keywords = "abstract and array as break case catch cfunction class clone const continue declare default die do " + "else elseif enddeclare endfor endforeach endif endswitch endwhile extends final finally for foreach " + "function global goto if implements include include_once interface instanceof insteadof namespace new " + "old_function or private protected public return require require_once static switch " + "trait throw try use const while xor yield "
	var constants = "__FILE__ __LINE__ __METHOD__ __FUNCTION__ __CLASS__"
	var Brush = function(_BrushBase) {
		_inherits(Brush, _BrushBase)
		_createClass(Brush, null, [{
			key: "aliases",
			get: function get() {
				return ["php"]
			}
		}])

		function Brush() {
			_classCallCheck(this, Brush)
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Brush).call(this))
			_this.regexList = [{
				regex: _syntaxhighlighterRegex.commonRegExp.singleLineCComments,
				css: "comments"
			}, {
				regex: _syntaxhighlighterRegex.commonRegExp.multiLineCComments,
				css: "comments"
			}, {
				regex: _syntaxhighlighterRegex.commonRegExp.doubleQuotedString,
				css: "string"
			}, {
				regex: _syntaxhighlighterRegex.commonRegExp.singleQuotedString,
				css: "string"
			}, {
				regex: /\$\w+/g,
				css: "variable"
			}, {
				regex: new RegExp(_this.getKeywords(functions), "gmi"),
				css: "functions"
			}, {
				regex: new RegExp(_this.getKeywords(constants), "gmi"),
				css: "constants"
			}, {
				regex: new RegExp(_this.getKeywords(keywords), "gm"),
				css: "keyword"
			}]
			_this.forHtmlScript(_syntaxhighlighterRegex.commonRegExp.phpScriptTags)
			return _this
		}
		return Brush
	}(_brushBase2.default)
	exports.default = Brush
}, function(module, exports, __webpack_require__) {
	"use strict"
	var BrushBase = __webpack_require__(22)
	var regexLib = __webpack_require__(3).commonRegExp

	function Brush() {
		this.regexList = []
	}
	Brush.prototype = new BrushBase
	Brush.aliases = ["text", "plain"]
	module.exports = Brush
}, function(module, exports, __webpack_require__) {
	"use strict"
	var BrushBase = __webpack_require__(22)
	var regexLib = __webpack_require__(3).commonRegExp

	function Brush() {
		function getKeywordsCSS(str) {
			return "\\b([a-z_]|)" + str.replace(/ /g, "(?=:)\\b|\\b([a-z_\\*]|\\*|)") + "(?=:)\\b"
		}

		function getValuesCSS(str) {
			return "\\b" + str.replace(/ /g, "(?!-)(?!:)\\b|\\b()") + ":\\b"
		}

		function getKeywordsPrependedBy(keywords, by) {
			return "(?:" + keywords.replace(/^\s+|\s+$/g, "").replace(/\s+/g, "|" + by + "\\b").replace(/^/, by + "\\b") + ")\\b"
		}
		var keywords = "ascent azimuth background-attachment background-color background-image background-position " + "background-repeat background baseline bbox border-collapse border-color border-spacing border-style border-top " + "border-right border-bottom border-left border-top-color border-right-color border-bottom-color border-left-color " + "border-top-style border-right-style border-bottom-style border-left-style border-top-width border-right-width " + "border-bottom-width border-left-width border-width border bottom cap-height caption-side centerline clear clip color " + "content counter-increment counter-reset cue-after cue-before cue cursor definition-src descent direction display " + "elevation empty-cells float font-size-adjust font-family font-size font-stretch font-style font-variant font-weight font " + "height left letter-spacing line-height list-style-image list-style-position list-style-type list-style margin-top " + "margin-right margin-bottom margin-left margin marker-offset marks mathline max-height max-width min-height min-width orphans " + "outline-color outline-style outline-width outline overflow padding-top padding-right padding-bottom padding-left padding page " + "page-break-after page-break-before page-break-inside pause pause-after pause-before pitch pitch-range play-during position " + "quotes right richness size slope src speak-header speak-numeral speak-punctuation speak speech-rate stemh stemv stress " + "table-layout text-align top text-decoration text-indent text-shadow text-transform unicode-bidi unicode-range units-per-em " + "vertical-align visibility voice-family volume white-space widows width widths word-spacing x-height z-index zoom"
		var values = "above absolute all always aqua armenian attr aural auto avoid baseline behind below bidi-override black blink block blue bold bolder " + "both bottom braille capitalize caption center center-left center-right circle close-quote code collapse compact condensed " + "continuous counter counters crop cross crosshair cursive dashed decimal decimal-leading-zero digits disc dotted double " + "embed embossed e-resize expanded extra-condensed extra-expanded fantasy far-left far-right fast faster fixed format fuchsia " + "gray green groove handheld hebrew help hidden hide high higher icon inline-table inline inset inside invert italic " + "justify landscape large larger left-side left leftwards level lighter lime line-through list-item local loud lower-alpha " + "lowercase lower-greek lower-latin lower-roman lower low ltr marker maroon medium message-box middle mix move narrower " + "navy ne-resize no-close-quote none no-open-quote no-repeat normal nowrap n-resize nw-resize oblique olive once open-quote outset " + "outside overline pointer portrait pre print projection purple red relative repeat repeat-x repeat-y rgb ridge right right-side " + "rightwards rtl run-in screen scroll semi-condensed semi-expanded separate se-resize show silent silver slower slow " + "small small-caps small-caption smaller soft solid speech spell-out square s-resize static status-bar sub super sw-resize " + "table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group teal " + "text-bottom text-top thick thin top transparent tty tv ultra-condensed ultra-expanded underline upper-alpha uppercase upper-latin " + "upper-roman url visible wait white wider w-resize x-fast x-high x-large x-loud x-low x-slow x-small x-soft xx-large xx-small yellow"
		var fonts = "[mM]onospace [tT]ahoma [vV]erdana [aA]rial [hH]elvetica [sS]ans-serif [sS]erif [cC]ourier mono sans serif"
		var statements = "important default"
		var preprocessor = "import extend debug warn if else for while mixin function include content media"
		var r = regexLib
		this.regexList = [{
			regex: r.multiLineCComments,
			css: "comments"
		}, {
			regex: r.singleLineCComments,
			css: "comments"
		}, {
			regex: r.doubleQuotedString,
			css: "string"
		}, {
			regex: r.singleQuotedString,
			css: "string"
		}, {
			regex: /\#[a-fA-F0-9]{3,6}/g,
			css: "value"
		}, {
			regex: /\b(-?\d+)(\.\d+)?(px|em|rem|pt|\:|\%|)\b/g,
			css: "value"
		}, {
			regex: /\$[\w-]+/g,
			css: "variable"
		}, {
			regex: new RegExp(getKeywordsPrependedBy(statements, "!"), "g"),
			css: "color3"
		}, {
			regex: new RegExp(getKeywordsPrependedBy(preprocessor, "@"), "g"),
			css: "preprocessor"
		}, {
			regex: new RegExp(getKeywordsCSS(keywords), "gm"),
			css: "keyword"
		}, {
			regex: new RegExp(getValuesCSS(values), "g"),
			css: "value"
		}, {
			regex: new RegExp(this.getKeywords(fonts), "g"),
			css: "color1"
		}]
	}
	Brush.prototype = new BrushBase
	Brush.aliases = ["sass", "scss"]
	module.exports = Brush
}, function(module, exports, __webpack_require__) {
	"use strict"
	var BrushBase = __webpack_require__(22)
	var regexLib = __webpack_require__(3).commonRegExp
	var XRegExp = __webpack_require__(3).XRegExp
	var Match = __webpack_require__(5).Match

	function Brush() {
		function process(match, regexInfo) {
			var code = match[0],
				tag = XRegExp.exec(code, XRegExp("(&lt;|<)[\\s\\/\\?!]*(?<name>[:\\w-\\.]+)", "xg")),
				result = []
			if (match.attributes != null) {
				var attributes, pos = 0,
					regex = XRegExp("(?<name> [\\w:.-]+)" + "\\s*=\\s*" + "(?<value> \".*?\"|'.*?'|\\w+)", "xg")
				while ((attributes = XRegExp.exec(code, regex, pos)) != null) {
					result.push(new Match(attributes.name, match.index + attributes.index, "color1"))
					result.push(new Match(attributes.value, match.index + attributes.index + attributes[0].indexOf(attributes.value), "string"))
					pos = attributes.index + attributes[0].length
				}
			}
			if (tag != null) result.push(new Match(tag.name, match.index + tag[0].indexOf(tag.name), "keyword"))
			return result
		}
		this.regexList = [{
			regex: XRegExp("(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)", "gm"),
			css: "color2"
		}, {
			regex: regexLib.xmlComments,
			css: "comments"
		}, {
			regex: XRegExp("(&lt;|<)[\\s\\/\\?!]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)", "sg"),
			func: process
		}]
	}
	Brush.prototype = new BrushBase
	Brush.aliases = ["xml", "xhtml", "xslt", "html", "plist"]
	module.exports = Brush
}, function(module, exports, __webpack_require__) {
	"use strict"
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
		return typeof obj
	} : function(obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj
	}
	! function(name, definition) {
		if (true) module.exports = definition()
		else if (typeof define == "function" && _typeof(define.amd) == "object") define(definition)
		else this[name] = definition()
	}("domready", function() {
		var fns = [],
			_listener, doc = document,
			hack = doc.documentElement.doScroll,
			domContentLoaded = "DOMContentLoaded",
			loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)
		if (!loaded) doc.addEventListener(domContentLoaded, _listener = function listener() {
			doc.removeEventListener(domContentLoaded, _listener)
			loaded = 1
			while (_listener = fns.shift()) {
				_listener()
			}
		})
		return function(fn) {
			loaded ? setTimeout(fn, 0) : fns.push(fn)
		}
	})
}, function(module, exports) {
	"use strict"
	Object.defineProperty(exports, "__esModule", {
		value: true
	})
	var string = exports.string = function string(value) {
		return value.replace(/^([A-Z])/g, function(_, character) {
			return character.toLowerCase()
		}).replace(/([A-Z])/g, function(_, character) {
			return "-" + character.toLowerCase()
		})
	}
	var object = exports.object = function object(value) {
		var result = {}
		Object.keys(value).forEach(function(key) {
			return result[string(key)] = value[key]
		})
		return result
	}
}]);





/*time start*/

function showTime(){
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59
  var session = "AM";
  
  if(h == 0){
      h = 12;
  }
  
  if(h > 12){
      h = h - 12;
      session = "PM";
  }
  
  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;
  
  var time = h + ":" + m + ":" + s + " " + session;
  document.getElementById("MyClockDisplay").innerText = time;
  document.getElementById("MyClockDisplay").textContent = time;
  
  setTimeout(showTime, 1000);
  
}

showTime();


/*time start*/