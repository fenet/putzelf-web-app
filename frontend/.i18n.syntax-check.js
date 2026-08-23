var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({
  "node_modules/react/cjs/react.development.js"(exports, module) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var ReactVersion = "18.3.1";
        var REACT_ELEMENT_TYPE = Symbol.for("react.element");
        var REACT_PORTAL_TYPE = Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = Symbol.for("react.context");
        var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = Symbol.for("react.memo");
        var REACT_LAZY_TYPE = Symbol.for("react.lazy");
        var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
        var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          if (maybeIterable === null || typeof maybeIterable !== "object") {
            return null;
          }
          var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
          if (typeof maybeIterator === "function") {
            return maybeIterator;
          }
          return null;
        }
        var ReactCurrentDispatcher = {
          /**
           * @internal
           * @type {ReactComponent}
           */
          current: null
        };
        var ReactCurrentBatchConfig = {
          transition: null
        };
        var ReactCurrentActQueue = {
          current: null,
          // Used to reproduce behavior of `batchedUpdates` in legacy mode.
          isBatchingLegacy: false,
          didScheduleLegacyUpdate: false
        };
        var ReactCurrentOwner = {
          /**
           * @internal
           * @type {ReactComponent}
           */
          current: null
        };
        var ReactDebugCurrentFrame = {};
        var currentExtraStackFrame = null;
        function setExtraStackFrame(stack) {
          {
            currentExtraStackFrame = stack;
          }
        }
        {
          ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
            {
              currentExtraStackFrame = stack;
            }
          };
          ReactDebugCurrentFrame.getCurrentStack = null;
          ReactDebugCurrentFrame.getStackAddendum = function() {
            var stack = "";
            if (currentExtraStackFrame) {
              stack += currentExtraStackFrame;
            }
            var impl = ReactDebugCurrentFrame.getCurrentStack;
            if (impl) {
              stack += impl() || "";
            }
            return stack;
          };
        }
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var ReactSharedInternals = {
          ReactCurrentDispatcher,
          ReactCurrentBatchConfig,
          ReactCurrentOwner
        };
        {
          ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
          ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
        }
        function warn2(format) {
          {
            {
              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }
              printWarning("warn", format, args);
            }
          }
        }
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        var didWarnStateUpdateForUnmountedComponent = {};
        function warnNoop(publicInstance, callerName) {
          {
            var _constructor = publicInstance.constructor;
            var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
            var warningKey = componentName + "." + callerName;
            if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
              return;
            }
            error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
            didWarnStateUpdateForUnmountedComponent[warningKey] = true;
          }
        }
        var ReactNoopUpdateQueue = {
          /**
           * Checks whether or not this composite component is mounted.
           * @param {ReactClass} publicInstance The instance we want to test.
           * @return {boolean} True if mounted, false otherwise.
           * @protected
           * @final
           */
          isMounted: function(publicInstance) {
            return false;
          },
          /**
           * Forces an update. This should only be invoked when it is known with
           * certainty that we are **not** in a DOM transaction.
           *
           * You may want to call this when you know that some deeper aspect of the
           * component's state has changed but `setState` was not called.
           *
           * This will not invoke `shouldComponentUpdate`, but it will invoke
           * `componentWillUpdate` and `componentDidUpdate`.
           *
           * @param {ReactClass} publicInstance The instance that should rerender.
           * @param {?function} callback Called after component is updated.
           * @param {?string} callerName name of the calling function in the public API.
           * @internal
           */
          enqueueForceUpdate: function(publicInstance, callback, callerName) {
            warnNoop(publicInstance, "forceUpdate");
          },
          /**
           * Replaces all of the state. Always use this or `setState` to mutate state.
           * You should treat `this.state` as immutable.
           *
           * There is no guarantee that `this.state` will be immediately updated, so
           * accessing `this.state` after calling this method may return the old value.
           *
           * @param {ReactClass} publicInstance The instance that should rerender.
           * @param {object} completeState Next state.
           * @param {?function} callback Called after component is updated.
           * @param {?string} callerName name of the calling function in the public API.
           * @internal
           */
          enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
            warnNoop(publicInstance, "replaceState");
          },
          /**
           * Sets a subset of the state. This only exists because _pendingState is
           * internal. This provides a merging strategy that is not available to deep
           * properties which is confusing. TODO: Expose pendingState or don't use it
           * during the merge.
           *
           * @param {ReactClass} publicInstance The instance that should rerender.
           * @param {object} partialState Next partial state to be merged with state.
           * @param {?function} callback Called after component is updated.
           * @param {?string} Name of the calling function in the public API.
           * @internal
           */
          enqueueSetState: function(publicInstance, partialState, callback, callerName) {
            warnNoop(publicInstance, "setState");
          }
        };
        var assign = Object.assign;
        var emptyObject = {};
        {
          Object.freeze(emptyObject);
        }
        function Component(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        Component.prototype.isReactComponent = {};
        Component.prototype.setState = function(partialState, callback) {
          if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null) {
            throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
          }
          this.updater.enqueueSetState(this, partialState, callback, "setState");
        };
        Component.prototype.forceUpdate = function(callback) {
          this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
        };
        {
          var deprecatedAPIs = {
            isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
            replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
          };
          var defineDeprecationWarning = function(methodName, info) {
            Object.defineProperty(Component.prototype, methodName, {
              get: function() {
                warn2("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
                return void 0;
              }
            });
          };
          for (var fnName in deprecatedAPIs) {
            if (deprecatedAPIs.hasOwnProperty(fnName)) {
              defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
            }
          }
        }
        function ComponentDummy() {
        }
        ComponentDummy.prototype = Component.prototype;
        function PureComponent(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
        pureComponentPrototype.constructor = PureComponent;
        assign(pureComponentPrototype, Component.prototype);
        pureComponentPrototype.isPureReactComponent = true;
        function createRef() {
          var refObject = {
            current: null
          };
          {
            Object.seal(refObject);
          }
          return refObject;
        }
        var isArrayImpl = Array.isArray;
        function isArray(a) {
          return isArrayImpl(a);
        }
        function typeName(value) {
          {
            var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
            var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            return type;
          }
        }
        function willCoercionThrow(value) {
          {
            try {
              testStringCoercion(value);
              return false;
            } catch (e2) {
              return true;
            }
          }
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          {
            if (willCoercionThrow(value)) {
              error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
              return testStringCoercion(value);
            }
          }
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var displayName = outerType.displayName;
          if (displayName) {
            return displayName;
          }
          var functionName = innerType.displayName || innerType.name || "";
          return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
        }
        function getContextName(type) {
          return type.displayName || "Context";
        }
        function getComponentNameFromType(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type === "function") {
            return type.displayName || type.name || null;
          }
          if (typeof type === "string") {
            return type;
          }
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                var context = type;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                var outerName = type.displayName || null;
                if (outerName !== null) {
                  return outerName;
                }
                return getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init2 = lazyComponent._init;
                try {
                  return getComponentNameFromType(init2(payload));
                } catch (x) {
                  return null;
                }
              }
            }
          }
          return null;
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var RESERVED_PROPS = {
          key: true,
          ref: true,
          __self: true,
          __source: true
        };
        var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
        {
          didWarnAboutStringRefs = {};
        }
        function hasValidRef(config) {
          {
            if (hasOwnProperty.call(config, "ref")) {
              var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.ref !== void 0;
        }
        function hasValidKey(config) {
          {
            if (hasOwnProperty.call(config, "key")) {
              var getter = Object.getOwnPropertyDescriptor(config, "key").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.key !== void 0;
        }
        function defineKeyPropWarningGetter(props, displayName) {
          var warnAboutAccessingKey = function() {
            {
              if (!specialPropKeyWarningShown) {
                specialPropKeyWarningShown = true;
                error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function defineRefPropWarningGetter(props, displayName) {
          var warnAboutAccessingRef = function() {
            {
              if (!specialPropRefWarningShown) {
                specialPropRefWarningShown = true;
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            }
          };
          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }
        function warnIfStringRefCannotBeAutoConverted(config) {
          {
            if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
              var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
              if (!didWarnAboutStringRefs[componentName]) {
                error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
                didWarnAboutStringRefs[componentName] = true;
              }
            }
          }
        }
        var ReactElement = function(type, key, ref, self, source, owner, props) {
          var element = {
            // This tag allows us to uniquely identify this as a React Element
            $$typeof: REACT_ELEMENT_TYPE,
            // Built-in properties that belong on the element
            type,
            key,
            ref,
            props,
            // Record the component responsible for creating this element.
            _owner: owner
          };
          {
            element._store = {};
            Object.defineProperty(element._store, "validated", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: false
            });
            Object.defineProperty(element, "_self", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: self
            });
            Object.defineProperty(element, "_source", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: source
            });
            if (Object.freeze) {
              Object.freeze(element.props);
              Object.freeze(element);
            }
          }
          return element;
        };
        function createElement5(type, config, children) {
          var propName;
          var props = {};
          var key = null;
          var ref = null;
          var self = null;
          var source = null;
          if (config != null) {
            if (hasValidRef(config)) {
              ref = config.ref;
              {
                warnIfStringRefCannotBeAutoConverted(config);
              }
            }
            if (hasValidKey(config)) {
              {
                checkKeyStringCoercion(config.key);
              }
              key = "" + config.key;
            }
            self = config.__self === void 0 ? null : config.__self;
            source = config.__source === void 0 ? null : config.__source;
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName];
              }
            }
          }
          var childrenLength = arguments.length - 2;
          if (childrenLength === 1) {
            props.children = children;
          } else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
              childArray[i] = arguments[i + 2];
            }
            {
              if (Object.freeze) {
                Object.freeze(childArray);
              }
            }
            props.children = childArray;
          }
          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps) {
              if (props[propName] === void 0) {
                props[propName] = defaultProps[propName];
              }
            }
          }
          {
            if (key || ref) {
              var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
              if (key) {
                defineKeyPropWarningGetter(props, displayName);
              }
              if (ref) {
                defineRefPropWarningGetter(props, displayName);
              }
            }
          }
          return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
        }
        function cloneAndReplaceKey(oldElement, newKey) {
          var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
          return newElement;
        }
        function cloneElement2(element, config, children) {
          if (element === null || element === void 0) {
            throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
          }
          var propName;
          var props = assign({}, element.props);
          var key = element.key;
          var ref = element.ref;
          var self = element._self;
          var source = element._source;
          var owner = element._owner;
          if (config != null) {
            if (hasValidRef(config)) {
              ref = config.ref;
              owner = ReactCurrentOwner.current;
            }
            if (hasValidKey(config)) {
              {
                checkKeyStringCoercion(config.key);
              }
              key = "" + config.key;
            }
            var defaultProps;
            if (element.type && element.type.defaultProps) {
              defaultProps = element.type.defaultProps;
            }
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                if (config[propName] === void 0 && defaultProps !== void 0) {
                  props[propName] = defaultProps[propName];
                } else {
                  props[propName] = config[propName];
                }
              }
            }
          }
          var childrenLength = arguments.length - 2;
          if (childrenLength === 1) {
            props.children = children;
          } else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
              childArray[i] = arguments[i + 2];
            }
            props.children = childArray;
          }
          return ReactElement(element.type, key, ref, self, source, owner, props);
        }
        function isValidElement2(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        var SEPARATOR = ".";
        var SUBSEPARATOR = ":";
        function escape2(key) {
          var escapeRegex = /[=:]/g;
          var escaperLookup = {
            "=": "=0",
            ":": "=2"
          };
          var escapedString = key.replace(escapeRegex, function(match) {
            return escaperLookup[match];
          });
          return "$" + escapedString;
        }
        var didWarnAboutMaps = false;
        var userProvidedKeyEscapeRegex = /\/+/g;
        function escapeUserProvidedKey(text) {
          return text.replace(userProvidedKeyEscapeRegex, "$&/");
        }
        function getElementKey(element, index) {
          if (typeof element === "object" && element !== null && element.key != null) {
            {
              checkKeyStringCoercion(element.key);
            }
            return escape2("" + element.key);
          }
          return index.toString(36);
        }
        function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
          var type = typeof children;
          if (type === "undefined" || type === "boolean") {
            children = null;
          }
          var invokeCallback = false;
          if (children === null) {
            invokeCallback = true;
          } else {
            switch (type) {
              case "string":
              case "number":
                invokeCallback = true;
                break;
              case "object":
                switch (children.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                  case REACT_PORTAL_TYPE:
                    invokeCallback = true;
                }
            }
          }
          if (invokeCallback) {
            var _child = children;
            var mappedChild = callback(_child);
            var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
            if (isArray(mappedChild)) {
              var escapedChildKey = "";
              if (childKey != null) {
                escapedChildKey = escapeUserProvidedKey(childKey) + "/";
              }
              mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
                return c;
              });
            } else if (mappedChild != null) {
              if (isValidElement2(mappedChild)) {
                {
                  if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) {
                    checkKeyStringCoercion(mappedChild.key);
                  }
                }
                mappedChild = cloneAndReplaceKey(
                  mappedChild,
                  // Keep both the (mapped) and old keys if they differ, just as
                  // traverseAllChildren used to do for objects as children
                  escapedPrefix + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
                  (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? (
                    // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                    // eslint-disable-next-line react-internal/safe-string-coercion
                    escapeUserProvidedKey("" + mappedChild.key) + "/"
                  ) : "") + childKey
                );
              }
              array.push(mappedChild);
            }
            return 1;
          }
          var child;
          var nextName;
          var subtreeCount = 0;
          var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
          if (isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              child = children[i];
              nextName = nextNamePrefix + getElementKey(child, i);
              subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
            }
          } else {
            var iteratorFn = getIteratorFn(children);
            if (typeof iteratorFn === "function") {
              var iterableChildren = children;
              {
                if (iteratorFn === iterableChildren.entries) {
                  if (!didWarnAboutMaps) {
                    warn2("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                  }
                  didWarnAboutMaps = true;
                }
              }
              var iterator = iteratorFn.call(iterableChildren);
              var step;
              var ii = 0;
              while (!(step = iterator.next()).done) {
                child = step.value;
                nextName = nextNamePrefix + getElementKey(child, ii++);
                subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
              }
            } else if (type === "object") {
              var childrenString = String(children);
              throw new Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
            }
          }
          return subtreeCount;
        }
        function mapChildren(children, func, context) {
          if (children == null) {
            return children;
          }
          var result = [];
          var count = 0;
          mapIntoArray(children, result, "", "", function(child) {
            return func.call(context, child, count++);
          });
          return result;
        }
        function countChildren(children) {
          var n = 0;
          mapChildren(children, function() {
            n++;
          });
          return n;
        }
        function forEachChildren(children, forEachFunc, forEachContext) {
          mapChildren(children, function() {
            forEachFunc.apply(this, arguments);
          }, forEachContext);
        }
        function toArray(children) {
          return mapChildren(children, function(child) {
            return child;
          }) || [];
        }
        function onlyChild(children) {
          if (!isValidElement2(children)) {
            throw new Error("React.Children.only expected to receive a single React element child.");
          }
          return children;
        }
        function createContext2(defaultValue) {
          var context = {
            $$typeof: REACT_CONTEXT_TYPE,
            // As a workaround to support multiple concurrent renderers, we categorize
            // some renderers as primary and others as secondary. We only expect
            // there to be two concurrent renderers at most: React Native (primary) and
            // Fabric (secondary); React DOM (primary) and React ART (secondary).
            // Secondary renderers store their context values on separate fields.
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            // Used to track how many concurrent renderers this context currently
            // supports within in a single renderer. Such as parallel server rendering.
            _threadCount: 0,
            // These are circular
            Provider: null,
            Consumer: null,
            // Add these to use same hidden class in VM as ServerContext
            _defaultValue: null,
            _globalName: null
          };
          context.Provider = {
            $$typeof: REACT_PROVIDER_TYPE,
            _context: context
          };
          var hasWarnedAboutUsingNestedContextConsumers = false;
          var hasWarnedAboutUsingConsumerProvider = false;
          var hasWarnedAboutDisplayNameOnConsumer = false;
          {
            var Consumer = {
              $$typeof: REACT_CONTEXT_TYPE,
              _context: context
            };
            Object.defineProperties(Consumer, {
              Provider: {
                get: function() {
                  if (!hasWarnedAboutUsingConsumerProvider) {
                    hasWarnedAboutUsingConsumerProvider = true;
                    error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
                  }
                  return context.Provider;
                },
                set: function(_Provider) {
                  context.Provider = _Provider;
                }
              },
              _currentValue: {
                get: function() {
                  return context._currentValue;
                },
                set: function(_currentValue) {
                  context._currentValue = _currentValue;
                }
              },
              _currentValue2: {
                get: function() {
                  return context._currentValue2;
                },
                set: function(_currentValue2) {
                  context._currentValue2 = _currentValue2;
                }
              },
              _threadCount: {
                get: function() {
                  return context._threadCount;
                },
                set: function(_threadCount) {
                  context._threadCount = _threadCount;
                }
              },
              Consumer: {
                get: function() {
                  if (!hasWarnedAboutUsingNestedContextConsumers) {
                    hasWarnedAboutUsingNestedContextConsumers = true;
                    error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                  }
                  return context.Consumer;
                }
              },
              displayName: {
                get: function() {
                  return context.displayName;
                },
                set: function(displayName) {
                  if (!hasWarnedAboutDisplayNameOnConsumer) {
                    warn2("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
                    hasWarnedAboutDisplayNameOnConsumer = true;
                  }
                }
              }
            });
            context.Consumer = Consumer;
          }
          {
            context._currentRenderer = null;
            context._currentRenderer2 = null;
          }
          return context;
        }
        var Uninitialized = -1;
        var Pending = 0;
        var Resolved = 1;
        var Rejected = 2;
        function lazyInitializer(payload) {
          if (payload._status === Uninitialized) {
            var ctor = payload._result;
            var thenable = ctor();
            thenable.then(function(moduleObject2) {
              if (payload._status === Pending || payload._status === Uninitialized) {
                var resolved = payload;
                resolved._status = Resolved;
                resolved._result = moduleObject2;
              }
            }, function(error2) {
              if (payload._status === Pending || payload._status === Uninitialized) {
                var rejected = payload;
                rejected._status = Rejected;
                rejected._result = error2;
              }
            });
            if (payload._status === Uninitialized) {
              var pending = payload;
              pending._status = Pending;
              pending._result = thenable;
            }
          }
          if (payload._status === Resolved) {
            var moduleObject = payload._result;
            {
              if (moduleObject === void 0) {
                error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", moduleObject);
              }
            }
            {
              if (!("default" in moduleObject)) {
                error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
              }
            }
            return moduleObject.default;
          } else {
            throw payload._result;
          }
        }
        function lazy(ctor) {
          var payload = {
            // We use these fields to store the result.
            _status: Uninitialized,
            _result: ctor
          };
          var lazyType = {
            $$typeof: REACT_LAZY_TYPE,
            _payload: payload,
            _init: lazyInitializer
          };
          {
            var defaultProps;
            var propTypes;
            Object.defineProperties(lazyType, {
              defaultProps: {
                configurable: true,
                get: function() {
                  return defaultProps;
                },
                set: function(newDefaultProps) {
                  error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                  defaultProps = newDefaultProps;
                  Object.defineProperty(lazyType, "defaultProps", {
                    enumerable: true
                  });
                }
              },
              propTypes: {
                configurable: true,
                get: function() {
                  return propTypes;
                },
                set: function(newPropTypes) {
                  error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                  propTypes = newPropTypes;
                  Object.defineProperty(lazyType, "propTypes", {
                    enumerable: true
                  });
                }
              }
            });
          }
          return lazyType;
        }
        function forwardRef(render) {
          {
            if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
              error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
            } else if (typeof render !== "function") {
              error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
            } else {
              if (render.length !== 0 && render.length !== 2) {
                error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
              }
            }
            if (render != null) {
              if (render.defaultProps != null || render.propTypes != null) {
                error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
              }
            }
          }
          var elementType = {
            $$typeof: REACT_FORWARD_REF_TYPE,
            render
          };
          {
            var ownName;
            Object.defineProperty(elementType, "displayName", {
              enumerable: false,
              configurable: true,
              get: function() {
                return ownName;
              },
              set: function(name) {
                ownName = name;
                if (!render.name && !render.displayName) {
                  render.displayName = name;
                }
              }
            });
          }
          return elementType;
        }
        var REACT_MODULE_REFERENCE;
        {
          REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
        }
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
            // types supported by any Flight configuration anywhere since
            // we don't know which Flight build this will end up being used
            // with.
            type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
              return true;
            }
          }
          return false;
        }
        function memo(type, compare) {
          {
            if (!isValidElementType(type)) {
              error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
            }
          }
          var elementType = {
            $$typeof: REACT_MEMO_TYPE,
            type,
            compare: compare === void 0 ? null : compare
          };
          {
            var ownName;
            Object.defineProperty(elementType, "displayName", {
              enumerable: false,
              configurable: true,
              get: function() {
                return ownName;
              },
              set: function(name) {
                ownName = name;
                if (!type.name && !type.displayName) {
                  type.displayName = name;
                }
              }
            });
          }
          return elementType;
        }
        function resolveDispatcher() {
          var dispatcher = ReactCurrentDispatcher.current;
          {
            if (dispatcher === null) {
              error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
            }
          }
          return dispatcher;
        }
        function useContext4(Context) {
          var dispatcher = resolveDispatcher();
          {
            if (Context._context !== void 0) {
              var realContext = Context._context;
              if (realContext.Consumer === Context) {
                error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
              } else if (realContext.Provider === Context) {
                error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
              }
            }
          }
          return dispatcher.useContext(Context);
        }
        function useState2(initialState) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useState(initialState);
        }
        function useReducer(reducer, initialArg, init2) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useReducer(reducer, initialArg, init2);
        }
        function useRef2(initialValue) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useRef(initialValue);
        }
        function useEffect2(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useEffect(create, deps);
        }
        function useInsertionEffect(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useInsertionEffect(create, deps);
        }
        function useLayoutEffect(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useLayoutEffect(create, deps);
        }
        function useCallback2(callback, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useCallback(callback, deps);
        }
        function useMemo2(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useMemo(create, deps);
        }
        function useImperativeHandle(ref, create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useImperativeHandle(ref, create, deps);
        }
        function useDebugValue(value, formatterFn) {
          {
            var dispatcher = resolveDispatcher();
            return dispatcher.useDebugValue(value, formatterFn);
          }
        }
        function useTransition() {
          var dispatcher = resolveDispatcher();
          return dispatcher.useTransition();
        }
        function useDeferredValue(value) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useDeferredValue(value);
        }
        function useId() {
          var dispatcher = resolveDispatcher();
          return dispatcher.useId();
        }
        function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
        }
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: assign({}, props, {
                  value: prevLog
                }),
                info: assign({}, props, {
                  value: prevInfo
                }),
                warn: assign({}, props, {
                  value: prevWarn
                }),
                error: assign({}, props, {
                  value: prevError
                }),
                group: assign({}, props, {
                  value: prevGroup
                }),
                groupCollapsed: assign({}, props, {
                  value: prevGroupCollapsed
                }),
                groupEnd: assign({}, props, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix;
        function describeBuiltInComponentFrame(name, source, ownerFn) {
          {
            if (prefix === void 0) {
              try {
                throw Error();
              } catch (x) {
                var match = x.stack.trim().match(/\n( *(at )?)/);
                prefix = match && match[1] || "";
              }
            }
            return "\n" + prefix + name;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame = componentFrameCache.get(fn);
            if (frame !== void 0) {
              return frame;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher$1.current;
            ReactCurrentDispatcher$1.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x) {
                  control = x;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                control = x;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
              for (; s >= 1 && c >= 0; s--, c--) {
                if (sampleLines[s] !== controlLines[c]) {
                  if (s !== 1 || c !== 1) {
                    do {
                      s--;
                      c--;
                      if (c < 0 || sampleLines[s] !== controlLines[c]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        if (fn.displayName && _frame.includes("<anonymous>")) {
                          _frame = _frame.replace("<anonymous>", fn.displayName);
                        }
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher$1.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component2) {
          var prototype = Component2.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
          if (type == null) {
            return "";
          }
          if (typeof type === "function") {
            {
              return describeNativeComponentFrame(type, shouldConstruct(type));
            }
          }
          if (typeof type === "string") {
            return describeBuiltInComponentFrame(type);
          }
          switch (type) {
            case REACT_SUSPENSE_TYPE:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init2 = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init2(payload), source, ownerFn);
                } catch (x) {
                }
              }
            }
          }
          return "";
        }
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame$1.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values, location, componentName, element) {
          {
            var has = Function.call.bind(hasOwnProperty);
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex) {
                  error$1 = ex;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        function setCurrentlyValidatingElement$1(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              setExtraStackFrame(stack);
            } else {
              setExtraStackFrame(null);
            }
          }
        }
        var propTypesMisspellWarningShown;
        {
          propTypesMisspellWarningShown = false;
        }
        function getDeclarationErrorAddendum() {
          if (ReactCurrentOwner.current) {
            var name = getComponentNameFromType(ReactCurrentOwner.current.type);
            if (name) {
              return "\n\nCheck the render method of `" + name + "`.";
            }
          }
          return "";
        }
        function getSourceInfoErrorAddendum(source) {
          if (source !== void 0) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, "");
            var lineNumber = source.lineNumber;
            return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
          }
          return "";
        }
        function getSourceInfoErrorAddendumForProps(elementProps) {
          if (elementProps !== null && elementProps !== void 0) {
            return getSourceInfoErrorAddendum(elementProps.__source);
          }
          return "";
        }
        var ownerHasKeyUseWarning = {};
        function getCurrentComponentErrorInfo(parentType) {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
            if (parentName) {
              info = "\n\nCheck the top-level render call using <" + parentName + ">.";
            }
          }
          return info;
        }
        function validateExplicitKey(element, parentType) {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
            childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
          }
          {
            setCurrentlyValidatingElement$1(element);
            error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
            setCurrentlyValidatingElement$1(null);
          }
        }
        function validateChildKeys(node, parentType) {
          if (typeof node !== "object") {
            return;
          }
          if (isArray(node)) {
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              if (isValidElement2(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement2(node)) {
            if (node._store) {
              node._store.validated = true;
            }
          } else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement2(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
        function validatePropTypes(element) {
          {
            var type = element.type;
            if (type === null || type === void 0 || typeof type === "string") {
              return;
            }
            var propTypes;
            if (typeof type === "function") {
              propTypes = type.propTypes;
            } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
            // Inner props are checked in the reconciler.
            type.$$typeof === REACT_MEMO_TYPE)) {
              propTypes = type.propTypes;
            } else {
              return;
            }
            if (propTypes) {
              var name = getComponentNameFromType(type);
              checkPropTypes(propTypes, element.props, "prop", name, element);
            } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
              propTypesMisspellWarningShown = true;
              var _name = getComponentNameFromType(type);
              error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
            }
            if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
            }
          }
        }
        function validateFragmentProps(fragment) {
          {
            var keys = Object.keys(fragment.props);
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (key !== "children" && key !== "key") {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                setCurrentlyValidatingElement$1(null);
                break;
              }
            }
            if (fragment.ref !== null) {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid attribute `ref` supplied to `React.Fragment`.");
              setCurrentlyValidatingElement$1(null);
            }
          }
        }
        function createElementWithValidation(type, props, children) {
          var validType = isValidElementType(type);
          if (!validType) {
            var info = "";
            if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
              info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
            var sourceInfo = getSourceInfoErrorAddendumForProps(props);
            if (sourceInfo) {
              info += sourceInfo;
            } else {
              info += getDeclarationErrorAddendum();
            }
            var typeString;
            if (type === null) {
              typeString = "null";
            } else if (isArray(type)) {
              typeString = "array";
            } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
              info = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type;
            }
            {
              error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
            }
          }
          var element = createElement5.apply(this, arguments);
          if (element == null) {
            return element;
          }
          if (validType) {
            for (var i = 2; i < arguments.length; i++) {
              validateChildKeys(arguments[i], type);
            }
          }
          if (type === REACT_FRAGMENT_TYPE) {
            validateFragmentProps(element);
          } else {
            validatePropTypes(element);
          }
          return element;
        }
        var didWarnAboutDeprecatedCreateFactory = false;
        function createFactoryWithValidation(type) {
          var validatedFactory = createElementWithValidation.bind(null, type);
          validatedFactory.type = type;
          {
            if (!didWarnAboutDeprecatedCreateFactory) {
              didWarnAboutDeprecatedCreateFactory = true;
              warn2("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
            }
            Object.defineProperty(validatedFactory, "type", {
              enumerable: false,
              get: function() {
                warn2("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
                Object.defineProperty(this, "type", {
                  value: type
                });
                return type;
              }
            });
          }
          return validatedFactory;
        }
        function cloneElementWithValidation(element, props, children) {
          var newElement = cloneElement2.apply(this, arguments);
          for (var i = 2; i < arguments.length; i++) {
            validateChildKeys(arguments[i], newElement.type);
          }
          validatePropTypes(newElement);
          return newElement;
        }
        function startTransition(scope, options) {
          var prevTransition = ReactCurrentBatchConfig.transition;
          ReactCurrentBatchConfig.transition = {};
          var currentTransition = ReactCurrentBatchConfig.transition;
          {
            ReactCurrentBatchConfig.transition._updatedFibers = /* @__PURE__ */ new Set();
          }
          try {
            scope();
          } finally {
            ReactCurrentBatchConfig.transition = prevTransition;
            {
              if (prevTransition === null && currentTransition._updatedFibers) {
                var updatedFibersCount = currentTransition._updatedFibers.size;
                if (updatedFibersCount > 10) {
                  warn2("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
                }
                currentTransition._updatedFibers.clear();
              }
            }
          }
        }
        var didWarnAboutMessageChannel = false;
        var enqueueTaskImpl = null;
        function enqueueTask(task) {
          if (enqueueTaskImpl === null) {
            try {
              var requireString = ("require" + Math.random()).slice(0, 7);
              var nodeRequire = module && module[requireString];
              enqueueTaskImpl = nodeRequire.call(module, "timers").setImmediate;
            } catch (_err) {
              enqueueTaskImpl = function(callback) {
                {
                  if (didWarnAboutMessageChannel === false) {
                    didWarnAboutMessageChannel = true;
                    if (typeof MessageChannel === "undefined") {
                      error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.");
                    }
                  }
                }
                var channel = new MessageChannel();
                channel.port1.onmessage = callback;
                channel.port2.postMessage(void 0);
              };
            }
          }
          return enqueueTaskImpl(task);
        }
        var actScopeDepth = 0;
        var didWarnNoAwaitAct = false;
        function act(callback) {
          {
            var prevActScopeDepth = actScopeDepth;
            actScopeDepth++;
            if (ReactCurrentActQueue.current === null) {
              ReactCurrentActQueue.current = [];
            }
            var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
            var result;
            try {
              ReactCurrentActQueue.isBatchingLegacy = true;
              result = callback();
              if (!prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
                var queue = ReactCurrentActQueue.current;
                if (queue !== null) {
                  ReactCurrentActQueue.didScheduleLegacyUpdate = false;
                  flushActQueue(queue);
                }
              }
            } catch (error2) {
              popActScope(prevActScopeDepth);
              throw error2;
            } finally {
              ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
            }
            if (result !== null && typeof result === "object" && typeof result.then === "function") {
              var thenableResult = result;
              var wasAwaited = false;
              var thenable = {
                then: function(resolve, reject) {
                  wasAwaited = true;
                  thenableResult.then(function(returnValue2) {
                    popActScope(prevActScopeDepth);
                    if (actScopeDepth === 0) {
                      recursivelyFlushAsyncActWork(returnValue2, resolve, reject);
                    } else {
                      resolve(returnValue2);
                    }
                  }, function(error2) {
                    popActScope(prevActScopeDepth);
                    reject(error2);
                  });
                }
              };
              {
                if (!didWarnNoAwaitAct && typeof Promise !== "undefined") {
                  Promise.resolve().then(function() {
                  }).then(function() {
                    if (!wasAwaited) {
                      didWarnNoAwaitAct = true;
                      error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);");
                    }
                  });
                }
              }
              return thenable;
            } else {
              var returnValue = result;
              popActScope(prevActScopeDepth);
              if (actScopeDepth === 0) {
                var _queue = ReactCurrentActQueue.current;
                if (_queue !== null) {
                  flushActQueue(_queue);
                  ReactCurrentActQueue.current = null;
                }
                var _thenable = {
                  then: function(resolve, reject) {
                    if (ReactCurrentActQueue.current === null) {
                      ReactCurrentActQueue.current = [];
                      recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                    } else {
                      resolve(returnValue);
                    }
                  }
                };
                return _thenable;
              } else {
                var _thenable2 = {
                  then: function(resolve, reject) {
                    resolve(returnValue);
                  }
                };
                return _thenable2;
              }
            }
          }
        }
        function popActScope(prevActScopeDepth) {
          {
            if (prevActScopeDepth !== actScopeDepth - 1) {
              error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
            }
            actScopeDepth = prevActScopeDepth;
          }
        }
        function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
          {
            var queue = ReactCurrentActQueue.current;
            if (queue !== null) {
              try {
                flushActQueue(queue);
                enqueueTask(function() {
                  if (queue.length === 0) {
                    ReactCurrentActQueue.current = null;
                    resolve(returnValue);
                  } else {
                    recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                  }
                });
              } catch (error2) {
                reject(error2);
              }
            } else {
              resolve(returnValue);
            }
          }
        }
        var isFlushing = false;
        function flushActQueue(queue) {
          {
            if (!isFlushing) {
              isFlushing = true;
              var i = 0;
              try {
                for (; i < queue.length; i++) {
                  var callback = queue[i];
                  do {
                    callback = callback(true);
                  } while (callback !== null);
                }
                queue.length = 0;
              } catch (error2) {
                queue = queue.slice(i + 1);
                throw error2;
              } finally {
                isFlushing = false;
              }
            }
          }
        }
        var createElement$1 = createElementWithValidation;
        var cloneElement$1 = cloneElementWithValidation;
        var createFactory = createFactoryWithValidation;
        var Children2 = {
          map: mapChildren,
          forEach: forEachChildren,
          count: countChildren,
          toArray,
          only: onlyChild
        };
        exports.Children = Children2;
        exports.Component = Component;
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.Profiler = REACT_PROFILER_TYPE;
        exports.PureComponent = PureComponent;
        exports.StrictMode = REACT_STRICT_MODE_TYPE;
        exports.Suspense = REACT_SUSPENSE_TYPE;
        exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
        exports.act = act;
        exports.cloneElement = cloneElement$1;
        exports.createContext = createContext2;
        exports.createElement = createElement$1;
        exports.createFactory = createFactory;
        exports.createRef = createRef;
        exports.forwardRef = forwardRef;
        exports.isValidElement = isValidElement2;
        exports.lazy = lazy;
        exports.memo = memo;
        exports.startTransition = startTransition;
        exports.unstable_act = act;
        exports.useCallback = useCallback2;
        exports.useContext = useContext4;
        exports.useDebugValue = useDebugValue;
        exports.useDeferredValue = useDeferredValue;
        exports.useEffect = useEffect2;
        exports.useId = useId;
        exports.useImperativeHandle = useImperativeHandle;
        exports.useInsertionEffect = useInsertionEffect;
        exports.useLayoutEffect = useLayoutEffect;
        exports.useMemo = useMemo2;
        exports.useReducer = useReducer;
        exports.useRef = useRef2;
        exports.useState = useState2;
        exports.useSyncExternalStore = useSyncExternalStore;
        exports.useTransition = useTransition;
        exports.version = ReactVersion;
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
      })();
    }
  }
});

// node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/react/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_development();
    }
  }
});

// node_modules/void-elements/index.js
var require_void_elements = __commonJS({
  "node_modules/void-elements/index.js"(exports, module) {
    module.exports = {
      "area": true,
      "base": true,
      "br": true,
      "col": true,
      "embed": true,
      "hr": true,
      "img": true,
      "input": true,
      "link": true,
      "meta": true,
      "param": true,
      "source": true,
      "track": true,
      "wbr": true
    };
  }
});

// node_modules/i18next/dist/esm/i18next.js
var isString = (obj) => typeof obj === "string";
var defer = () => {
  let res;
  let rej;
  const promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  promise.resolve = res;
  promise.reject = rej;
  return promise;
};
var makeString = (object) => {
  if (object == null)
    return "";
  return "" + object;
};
var copy = (a, s, t2) => {
  a.forEach((m) => {
    if (s[m])
      t2[m] = s[m];
  });
};
var lastOfPathSeparatorRegExp = /###/g;
var cleanKey = (key) => key && key.indexOf("###") > -1 ? key.replace(lastOfPathSeparatorRegExp, ".") : key;
var canNotTraverseDeeper = (object) => !object || isString(object);
var getLastOfPath = (object, path, Empty) => {
  const stack = !isString(path) ? path : path.split(".");
  let stackIndex = 0;
  while (stackIndex < stack.length - 1) {
    if (canNotTraverseDeeper(object))
      return {};
    const key = cleanKey(stack[stackIndex]);
    if (!object[key] && Empty)
      object[key] = new Empty();
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      object = object[key];
    } else {
      object = {};
    }
    ++stackIndex;
  }
  if (canNotTraverseDeeper(object))
    return {};
  return {
    obj: object,
    k: cleanKey(stack[stackIndex])
  };
};
var setPath = (object, path, newValue) => {
  const {
    obj,
    k
  } = getLastOfPath(object, path, Object);
  if (obj !== void 0 || path.length === 1) {
    obj[k] = newValue;
    return;
  }
  let e2 = path[path.length - 1];
  let p = path.slice(0, path.length - 1);
  let last = getLastOfPath(object, p, Object);
  while (last.obj === void 0 && p.length) {
    e2 = `${p[p.length - 1]}.${e2}`;
    p = p.slice(0, p.length - 1);
    last = getLastOfPath(object, p, Object);
    if (last?.obj && typeof last.obj[`${last.k}.${e2}`] !== "undefined") {
      last.obj = void 0;
    }
  }
  last.obj[`${last.k}.${e2}`] = newValue;
};
var pushPath = (object, path, newValue, concat) => {
  const {
    obj,
    k
  } = getLastOfPath(object, path, Object);
  obj[k] = obj[k] || [];
  obj[k].push(newValue);
};
var getPath = (object, path) => {
  const {
    obj,
    k
  } = getLastOfPath(object, path);
  if (!obj)
    return void 0;
  if (!Object.prototype.hasOwnProperty.call(obj, k))
    return void 0;
  return obj[k];
};
var getPathWithDefaults = (data, defaultData, key) => {
  const value = getPath(data, key);
  if (value !== void 0) {
    return value;
  }
  return getPath(defaultData, key);
};
var deepExtend = (target, source, overwrite) => {
  for (const prop in source) {
    if (prop !== "__proto__" && prop !== "constructor") {
      if (prop in target) {
        if (isString(target[prop]) || target[prop] instanceof String || isString(source[prop]) || source[prop] instanceof String) {
          if (overwrite)
            target[prop] = source[prop];
        } else {
          deepExtend(target[prop], source[prop], overwrite);
        }
      } else {
        target[prop] = source[prop];
      }
    }
  }
  return target;
};
var regexEscape = (str) => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
var _entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
var escape = (data) => {
  if (isString(data)) {
    return data.replace(/[&<>"'\/]/g, (s) => _entityMap[s]);
  }
  return data;
};
var RegExpCache = class {
  constructor(capacity) {
    this.capacity = capacity;
    this.regExpMap = /* @__PURE__ */ new Map();
    this.regExpQueue = [];
  }
  getRegExp(pattern) {
    const regExpFromCache = this.regExpMap.get(pattern);
    if (regExpFromCache !== void 0) {
      return regExpFromCache;
    }
    const regExpNew = new RegExp(pattern);
    if (this.regExpQueue.length === this.capacity) {
      this.regExpMap.delete(this.regExpQueue.shift());
    }
    this.regExpMap.set(pattern, regExpNew);
    this.regExpQueue.push(pattern);
    return regExpNew;
  }
};
var chars = [" ", ",", "?", "!", ";"];
var looksLikeObjectPathRegExpCache = new RegExpCache(20);
var looksLikeObjectPath = (key, nsSeparator, keySeparator) => {
  nsSeparator = nsSeparator || "";
  keySeparator = keySeparator || "";
  const possibleChars = chars.filter((c) => nsSeparator.indexOf(c) < 0 && keySeparator.indexOf(c) < 0);
  if (possibleChars.length === 0)
    return true;
  const r = looksLikeObjectPathRegExpCache.getRegExp(`(${possibleChars.map((c) => c === "?" ? "\\?" : c).join("|")})`);
  let matched = !r.test(key);
  if (!matched) {
    const ki = key.indexOf(keySeparator);
    if (ki > 0 && !r.test(key.substring(0, ki))) {
      matched = true;
    }
  }
  return matched;
};
var deepFind = (obj, path, keySeparator = ".") => {
  if (!obj)
    return void 0;
  if (obj[path]) {
    if (!Object.prototype.hasOwnProperty.call(obj, path))
      return void 0;
    return obj[path];
  }
  const tokens = path.split(keySeparator);
  let current = obj;
  for (let i = 0; i < tokens.length; ) {
    if (!current || typeof current !== "object") {
      return void 0;
    }
    let next;
    let nextPath = "";
    for (let j = i; j < tokens.length; ++j) {
      if (j !== i) {
        nextPath += keySeparator;
      }
      nextPath += tokens[j];
      next = current[nextPath];
      if (next !== void 0) {
        if (["string", "number", "boolean"].indexOf(typeof next) > -1 && j < tokens.length - 1) {
          continue;
        }
        i += j - i + 1;
        break;
      }
    }
    current = next;
  }
  return current;
};
var getCleanedCode = (code) => code?.replace("_", "-");
var consoleLogger = {
  type: "logger",
  log(args) {
    this.output("log", args);
  },
  warn(args) {
    this.output("warn", args);
  },
  error(args) {
    this.output("error", args);
  },
  output(type, args) {
    console?.[type]?.apply?.(console, args);
  }
};
var Logger = class _Logger {
  constructor(concreteLogger, options = {}) {
    this.init(concreteLogger, options);
  }
  init(concreteLogger, options = {}) {
    this.prefix = options.prefix || "i18next:";
    this.logger = concreteLogger || consoleLogger;
    this.options = options;
    this.debug = options.debug;
  }
  log(...args) {
    return this.forward(args, "log", "", true);
  }
  warn(...args) {
    return this.forward(args, "warn", "", true);
  }
  error(...args) {
    return this.forward(args, "error", "");
  }
  deprecate(...args) {
    return this.forward(args, "warn", "WARNING DEPRECATED: ", true);
  }
  forward(args, lvl, prefix, debugOnly) {
    if (debugOnly && !this.debug)
      return null;
    if (isString(args[0]))
      args[0] = `${prefix}${this.prefix} ${args[0]}`;
    return this.logger[lvl](args);
  }
  create(moduleName) {
    return new _Logger(this.logger, {
      ...{
        prefix: `${this.prefix}:${moduleName}:`
      },
      ...this.options
    });
  }
  clone(options) {
    options = options || this.options;
    options.prefix = options.prefix || this.prefix;
    return new _Logger(this.logger, options);
  }
};
var baseLogger = new Logger();
var EventEmitter = class {
  constructor() {
    this.observers = {};
  }
  on(events, listener) {
    events.split(" ").forEach((event) => {
      if (!this.observers[event])
        this.observers[event] = /* @__PURE__ */ new Map();
      const numListeners = this.observers[event].get(listener) || 0;
      this.observers[event].set(listener, numListeners + 1);
    });
    return this;
  }
  off(event, listener) {
    if (!this.observers[event])
      return;
    if (!listener) {
      delete this.observers[event];
      return;
    }
    this.observers[event].delete(listener);
  }
  emit(event, ...args) {
    if (this.observers[event]) {
      const cloned = Array.from(this.observers[event].entries());
      cloned.forEach(([observer, numTimesAdded]) => {
        for (let i = 0; i < numTimesAdded; i++) {
          observer(...args);
        }
      });
    }
    if (this.observers["*"]) {
      const cloned = Array.from(this.observers["*"].entries());
      cloned.forEach(([observer, numTimesAdded]) => {
        for (let i = 0; i < numTimesAdded; i++) {
          observer.apply(observer, [event, ...args]);
        }
      });
    }
  }
};
var ResourceStore = class extends EventEmitter {
  constructor(data, options = {
    ns: ["translation"],
    defaultNS: "translation"
  }) {
    super();
    this.data = data || {};
    this.options = options;
    if (this.options.keySeparator === void 0) {
      this.options.keySeparator = ".";
    }
    if (this.options.ignoreJSONStructure === void 0) {
      this.options.ignoreJSONStructure = true;
    }
  }
  addNamespaces(ns) {
    if (this.options.ns.indexOf(ns) < 0) {
      this.options.ns.push(ns);
    }
  }
  removeNamespaces(ns) {
    const index = this.options.ns.indexOf(ns);
    if (index > -1) {
      this.options.ns.splice(index, 1);
    }
  }
  getResource(lng, ns, key, options = {}) {
    const keySeparator = options.keySeparator !== void 0 ? options.keySeparator : this.options.keySeparator;
    const ignoreJSONStructure = options.ignoreJSONStructure !== void 0 ? options.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let path;
    if (lng.indexOf(".") > -1) {
      path = lng.split(".");
    } else {
      path = [lng, ns];
      if (key) {
        if (Array.isArray(key)) {
          path.push(...key);
        } else if (isString(key) && keySeparator) {
          path.push(...key.split(keySeparator));
        } else {
          path.push(key);
        }
      }
    }
    const result = getPath(this.data, path);
    if (!result && !ns && !key && lng.indexOf(".") > -1) {
      lng = path[0];
      ns = path[1];
      key = path.slice(2).join(".");
    }
    if (result || !ignoreJSONStructure || !isString(key))
      return result;
    return deepFind(this.data?.[lng]?.[ns], key, keySeparator);
  }
  addResource(lng, ns, key, value, options = {
    silent: false
  }) {
    const keySeparator = options.keySeparator !== void 0 ? options.keySeparator : this.options.keySeparator;
    let path = [lng, ns];
    if (key)
      path = path.concat(keySeparator ? key.split(keySeparator) : key);
    if (lng.indexOf(".") > -1) {
      path = lng.split(".");
      value = ns;
      ns = path[1];
    }
    this.addNamespaces(ns);
    setPath(this.data, path, value);
    if (!options.silent)
      this.emit("added", lng, ns, key, value);
  }
  addResources(lng, ns, resources2, options = {
    silent: false
  }) {
    for (const m in resources2) {
      if (isString(resources2[m]) || Array.isArray(resources2[m]))
        this.addResource(lng, ns, m, resources2[m], {
          silent: true
        });
    }
    if (!options.silent)
      this.emit("added", lng, ns, resources2);
  }
  addResourceBundle(lng, ns, resources2, deep, overwrite, options = {
    silent: false,
    skipCopy: false
  }) {
    let path = [lng, ns];
    if (lng.indexOf(".") > -1) {
      path = lng.split(".");
      deep = resources2;
      resources2 = ns;
      ns = path[1];
    }
    this.addNamespaces(ns);
    let pack = getPath(this.data, path) || {};
    if (!options.skipCopy)
      resources2 = JSON.parse(JSON.stringify(resources2));
    if (deep) {
      deepExtend(pack, resources2, overwrite);
    } else {
      pack = {
        ...pack,
        ...resources2
      };
    }
    setPath(this.data, path, pack);
    if (!options.silent)
      this.emit("added", lng, ns, resources2);
  }
  removeResourceBundle(lng, ns) {
    if (this.hasResourceBundle(lng, ns)) {
      delete this.data[lng][ns];
    }
    this.removeNamespaces(ns);
    this.emit("removed", lng, ns);
  }
  hasResourceBundle(lng, ns) {
    return this.getResource(lng, ns) !== void 0;
  }
  getResourceBundle(lng, ns) {
    if (!ns)
      ns = this.options.defaultNS;
    return this.getResource(lng, ns);
  }
  getDataByLanguage(lng) {
    return this.data[lng];
  }
  hasLanguageSomeTranslations(lng) {
    const data = this.getDataByLanguage(lng);
    const n = data && Object.keys(data) || [];
    return !!n.find((v) => data[v] && Object.keys(data[v]).length > 0);
  }
  toJSON() {
    return this.data;
  }
};
var postProcessor = {
  processors: {},
  addPostProcessor(module) {
    this.processors[module.name] = module;
  },
  handle(processors, value, key, options, translator) {
    processors.forEach((processor) => {
      value = this.processors[processor]?.process(value, key, options, translator) ?? value;
    });
    return value;
  }
};
var PATH_KEY = Symbol("i18next/PATH_KEY");
function createProxy() {
  const state = [];
  const handler = /* @__PURE__ */ Object.create(null);
  let proxy;
  handler.get = (target, key) => {
    proxy?.revoke?.();
    if (key === PATH_KEY)
      return state;
    state.push(key);
    proxy = Proxy.revocable(target, handler);
    return proxy.proxy;
  };
  return Proxy.revocable(/* @__PURE__ */ Object.create(null), handler).proxy;
}
function keysFromSelector(selector, opts) {
  const {
    [PATH_KEY]: path
  } = selector(createProxy());
  return path.join(opts?.keySeparator ?? ".");
}
var checkedLoadedFor = {};
var shouldHandleAsObject = (res) => !isString(res) && typeof res !== "boolean" && typeof res !== "number";
var Translator = class _Translator extends EventEmitter {
  constructor(services, options = {}) {
    super();
    copy(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], services, this);
    this.options = options;
    if (this.options.keySeparator === void 0) {
      this.options.keySeparator = ".";
    }
    this.logger = baseLogger.create("translator");
  }
  changeLanguage(lng) {
    if (lng)
      this.language = lng;
  }
  exists(key, o = {
    interpolation: {}
  }) {
    const opt = {
      ...o
    };
    if (key == null)
      return false;
    const resolved = this.resolve(key, opt);
    return resolved?.res !== void 0;
  }
  extractFromKey(key, opt) {
    let nsSeparator = opt.nsSeparator !== void 0 ? opt.nsSeparator : this.options.nsSeparator;
    if (nsSeparator === void 0)
      nsSeparator = ":";
    const keySeparator = opt.keySeparator !== void 0 ? opt.keySeparator : this.options.keySeparator;
    let namespaces = opt.ns || this.options.defaultNS || [];
    const wouldCheckForNsInKey = nsSeparator && key.indexOf(nsSeparator) > -1;
    const seemsNaturalLanguage = !this.options.userDefinedKeySeparator && !opt.keySeparator && !this.options.userDefinedNsSeparator && !opt.nsSeparator && !looksLikeObjectPath(key, nsSeparator, keySeparator);
    if (wouldCheckForNsInKey && !seemsNaturalLanguage) {
      const m = key.match(this.interpolator.nestingRegexp);
      if (m && m.length > 0) {
        return {
          key,
          namespaces: isString(namespaces) ? [namespaces] : namespaces
        };
      }
      const parts = key.split(nsSeparator);
      if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1)
        namespaces = parts.shift();
      key = parts.join(keySeparator);
    }
    return {
      key,
      namespaces: isString(namespaces) ? [namespaces] : namespaces
    };
  }
  translate(keys, o, lastKey) {
    let opt = typeof o === "object" ? {
      ...o
    } : o;
    if (typeof opt !== "object" && this.options.overloadTranslationOptionHandler) {
      opt = this.options.overloadTranslationOptionHandler(arguments);
    }
    if (typeof opt === "object")
      opt = {
        ...opt
      };
    if (!opt)
      opt = {};
    if (keys == null)
      return "";
    if (typeof keys === "function")
      keys = keysFromSelector(keys, {
        ...this.options,
        ...opt
      });
    if (!Array.isArray(keys))
      keys = [String(keys)];
    const returnDetails = opt.returnDetails !== void 0 ? opt.returnDetails : this.options.returnDetails;
    const keySeparator = opt.keySeparator !== void 0 ? opt.keySeparator : this.options.keySeparator;
    const {
      key,
      namespaces
    } = this.extractFromKey(keys[keys.length - 1], opt);
    const namespace = namespaces[namespaces.length - 1];
    let nsSeparator = opt.nsSeparator !== void 0 ? opt.nsSeparator : this.options.nsSeparator;
    if (nsSeparator === void 0)
      nsSeparator = ":";
    const lng = opt.lng || this.language;
    const appendNamespaceToCIMode = opt.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (lng?.toLowerCase() === "cimode") {
      if (appendNamespaceToCIMode) {
        if (returnDetails) {
          return {
            res: `${namespace}${nsSeparator}${key}`,
            usedKey: key,
            exactUsedKey: key,
            usedLng: lng,
            usedNS: namespace,
            usedParams: this.getUsedParamsDetails(opt)
          };
        }
        return `${namespace}${nsSeparator}${key}`;
      }
      if (returnDetails) {
        return {
          res: key,
          usedKey: key,
          exactUsedKey: key,
          usedLng: lng,
          usedNS: namespace,
          usedParams: this.getUsedParamsDetails(opt)
        };
      }
      return key;
    }
    const resolved = this.resolve(keys, opt);
    let res = resolved?.res;
    const resUsedKey = resolved?.usedKey || key;
    const resExactUsedKey = resolved?.exactUsedKey || key;
    const noObject = ["[object Number]", "[object Function]", "[object RegExp]"];
    const joinArrays = opt.joinArrays !== void 0 ? opt.joinArrays : this.options.joinArrays;
    const handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
    const needsPluralHandling = opt.count !== void 0 && !isString(opt.count);
    const hasDefaultValue = _Translator.hasDefaultValue(opt);
    const defaultValueSuffix = needsPluralHandling ? this.pluralResolver.getSuffix(lng, opt.count, opt) : "";
    const defaultValueSuffixOrdinalFallback = opt.ordinal && needsPluralHandling ? this.pluralResolver.getSuffix(lng, opt.count, {
      ordinal: false
    }) : "";
    const needsZeroSuffixLookup = needsPluralHandling && !opt.ordinal && opt.count === 0;
    const defaultValue = needsZeroSuffixLookup && opt[`defaultValue${this.options.pluralSeparator}zero`] || opt[`defaultValue${defaultValueSuffix}`] || opt[`defaultValue${defaultValueSuffixOrdinalFallback}`] || opt.defaultValue;
    let resForObjHndl = res;
    if (handleAsObjectInI18nFormat && !res && hasDefaultValue) {
      resForObjHndl = defaultValue;
    }
    const handleAsObject = shouldHandleAsObject(resForObjHndl);
    const resType = Object.prototype.toString.apply(resForObjHndl);
    if (handleAsObjectInI18nFormat && resForObjHndl && handleAsObject && noObject.indexOf(resType) < 0 && !(isString(joinArrays) && Array.isArray(resForObjHndl))) {
      if (!opt.returnObjects && !this.options.returnObjects) {
        if (!this.options.returnedObjectHandler) {
          this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        }
        const r = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, resForObjHndl, {
          ...opt,
          ns: namespaces
        }) : `key '${key} (${this.language})' returned an object instead of string.`;
        if (returnDetails) {
          resolved.res = r;
          resolved.usedParams = this.getUsedParamsDetails(opt);
          return resolved;
        }
        return r;
      }
      if (keySeparator) {
        const resTypeIsArray = Array.isArray(resForObjHndl);
        const copy2 = resTypeIsArray ? [] : {};
        const newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;
        for (const m in resForObjHndl) {
          if (Object.prototype.hasOwnProperty.call(resForObjHndl, m)) {
            const deepKey = `${newKeyToUse}${keySeparator}${m}`;
            if (hasDefaultValue && !res) {
              copy2[m] = this.translate(deepKey, {
                ...opt,
                defaultValue: shouldHandleAsObject(defaultValue) ? defaultValue[m] : void 0,
                ...{
                  joinArrays: false,
                  ns: namespaces
                }
              });
            } else {
              copy2[m] = this.translate(deepKey, {
                ...opt,
                ...{
                  joinArrays: false,
                  ns: namespaces
                }
              });
            }
            if (copy2[m] === deepKey)
              copy2[m] = resForObjHndl[m];
          }
        }
        res = copy2;
      }
    } else if (handleAsObjectInI18nFormat && isString(joinArrays) && Array.isArray(res)) {
      res = res.join(joinArrays);
      if (res)
        res = this.extendTranslation(res, keys, opt, lastKey);
    } else {
      let usedDefault = false;
      let usedKey = false;
      if (!this.isValidLookup(res) && hasDefaultValue) {
        usedDefault = true;
        res = defaultValue;
      }
      if (!this.isValidLookup(res)) {
        usedKey = true;
        res = key;
      }
      const missingKeyNoValueFallbackToKey = opt.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey;
      const resForMissing = missingKeyNoValueFallbackToKey && usedKey ? void 0 : res;
      const updateMissing = hasDefaultValue && defaultValue !== res && this.options.updateMissing;
      if (usedKey || usedDefault || updateMissing) {
        this.logger.log(updateMissing ? "updateKey" : "missingKey", lng, namespace, key, updateMissing ? defaultValue : res);
        if (keySeparator) {
          const fk = this.resolve(key, {
            ...opt,
            keySeparator: false
          });
          if (fk && fk.res)
            this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        let lngs = [];
        const fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, opt.lng || this.language);
        if (this.options.saveMissingTo === "fallback" && fallbackLngs && fallbackLngs[0]) {
          for (let i = 0; i < fallbackLngs.length; i++) {
            lngs.push(fallbackLngs[i]);
          }
        } else if (this.options.saveMissingTo === "all") {
          lngs = this.languageUtils.toResolveHierarchy(opt.lng || this.language);
        } else {
          lngs.push(opt.lng || this.language);
        }
        const send = (l, k, specificDefaultValue) => {
          const defaultForMissing = hasDefaultValue && specificDefaultValue !== res ? specificDefaultValue : resForMissing;
          if (this.options.missingKeyHandler) {
            this.options.missingKeyHandler(l, namespace, k, defaultForMissing, updateMissing, opt);
          } else if (this.backendConnector?.saveMissing) {
            this.backendConnector.saveMissing(l, namespace, k, defaultForMissing, updateMissing, opt);
          }
          this.emit("missingKey", l, namespace, k, res);
        };
        if (this.options.saveMissing) {
          if (this.options.saveMissingPlurals && needsPluralHandling) {
            lngs.forEach((language) => {
              const suffixes = this.pluralResolver.getSuffixes(language, opt);
              if (needsZeroSuffixLookup && opt[`defaultValue${this.options.pluralSeparator}zero`] && suffixes.indexOf(`${this.options.pluralSeparator}zero`) < 0) {
                suffixes.push(`${this.options.pluralSeparator}zero`);
              }
              suffixes.forEach((suffix) => {
                send([language], key + suffix, opt[`defaultValue${suffix}`] || defaultValue);
              });
            });
          } else {
            send(lngs, key, defaultValue);
          }
        }
      }
      res = this.extendTranslation(res, keys, opt, resolved, lastKey);
      if (usedKey && res === key && this.options.appendNamespaceToMissingKey) {
        res = `${namespace}${nsSeparator}${key}`;
      }
      if ((usedKey || usedDefault) && this.options.parseMissingKeyHandler) {
        res = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${namespace}${nsSeparator}${key}` : key, usedDefault ? res : void 0, opt);
      }
    }
    if (returnDetails) {
      resolved.res = res;
      resolved.usedParams = this.getUsedParamsDetails(opt);
      return resolved;
    }
    return res;
  }
  extendTranslation(res, key, opt, resolved, lastKey) {
    if (this.i18nFormat?.parse) {
      res = this.i18nFormat.parse(res, {
        ...this.options.interpolation.defaultVariables,
        ...opt
      }, opt.lng || this.language || resolved.usedLng, resolved.usedNS, resolved.usedKey, {
        resolved
      });
    } else if (!opt.skipInterpolation) {
      if (opt.interpolation)
        this.interpolator.init({
          ...opt,
          ...{
            interpolation: {
              ...this.options.interpolation,
              ...opt.interpolation
            }
          }
        });
      const skipOnVariables = isString(res) && (opt?.interpolation?.skipOnVariables !== void 0 ? opt.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let nestBef;
      if (skipOnVariables) {
        const nb = res.match(this.interpolator.nestingRegexp);
        nestBef = nb && nb.length;
      }
      let data = opt.replace && !isString(opt.replace) ? opt.replace : opt;
      if (this.options.interpolation.defaultVariables)
        data = {
          ...this.options.interpolation.defaultVariables,
          ...data
        };
      res = this.interpolator.interpolate(res, data, opt.lng || this.language || resolved.usedLng, opt);
      if (skipOnVariables) {
        const na = res.match(this.interpolator.nestingRegexp);
        const nestAft = na && na.length;
        if (nestBef < nestAft)
          opt.nest = false;
      }
      if (!opt.lng && resolved && resolved.res)
        opt.lng = this.language || resolved.usedLng;
      if (opt.nest !== false)
        res = this.interpolator.nest(res, (...args) => {
          if (lastKey?.[0] === args[0] && !opt.context) {
            this.logger.warn(`It seems you are nesting recursively key: ${args[0]} in key: ${key[0]}`);
            return null;
          }
          return this.translate(...args, key);
        }, opt);
      if (opt.interpolation)
        this.interpolator.reset();
    }
    const postProcess = opt.postProcess || this.options.postProcess;
    const postProcessorNames = isString(postProcess) ? [postProcess] : postProcess;
    if (res != null && postProcessorNames?.length && opt.applyPostProcessor !== false) {
      res = postProcessor.handle(postProcessorNames, res, key, this.options && this.options.postProcessPassResolved ? {
        i18nResolved: {
          ...resolved,
          usedParams: this.getUsedParamsDetails(opt)
        },
        ...opt
      } : opt, this);
    }
    return res;
  }
  resolve(keys, opt = {}) {
    let found;
    let usedKey;
    let exactUsedKey;
    let usedLng;
    let usedNS;
    if (isString(keys))
      keys = [keys];
    keys.forEach((k) => {
      if (this.isValidLookup(found))
        return;
      const extracted = this.extractFromKey(k, opt);
      const key = extracted.key;
      usedKey = key;
      let namespaces = extracted.namespaces;
      if (this.options.fallbackNS)
        namespaces = namespaces.concat(this.options.fallbackNS);
      const needsPluralHandling = opt.count !== void 0 && !isString(opt.count);
      const needsZeroSuffixLookup = needsPluralHandling && !opt.ordinal && opt.count === 0;
      const needsContextHandling = opt.context !== void 0 && (isString(opt.context) || typeof opt.context === "number") && opt.context !== "";
      const codes = opt.lngs ? opt.lngs : this.languageUtils.toResolveHierarchy(opt.lng || this.language, opt.fallbackLng);
      namespaces.forEach((ns) => {
        if (this.isValidLookup(found))
          return;
        usedNS = ns;
        if (!checkedLoadedFor[`${codes[0]}-${ns}`] && this.utils?.hasLoadedNamespace && !this.utils?.hasLoadedNamespace(usedNS)) {
          checkedLoadedFor[`${codes[0]}-${ns}`] = true;
          this.logger.warn(`key "${usedKey}" for languages "${codes.join(", ")}" won't get resolved as namespace "${usedNS}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
        }
        codes.forEach((code) => {
          if (this.isValidLookup(found))
            return;
          usedLng = code;
          const finalKeys = [key];
          if (this.i18nFormat?.addLookupKeys) {
            this.i18nFormat.addLookupKeys(finalKeys, key, code, ns, opt);
          } else {
            let pluralSuffix;
            if (needsPluralHandling)
              pluralSuffix = this.pluralResolver.getSuffix(code, opt.count, opt);
            const zeroSuffix = `${this.options.pluralSeparator}zero`;
            const ordinalPrefix = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (needsPluralHandling) {
              if (opt.ordinal && pluralSuffix.indexOf(ordinalPrefix) === 0) {
                finalKeys.push(key + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
              }
              finalKeys.push(key + pluralSuffix);
              if (needsZeroSuffixLookup) {
                finalKeys.push(key + zeroSuffix);
              }
            }
            if (needsContextHandling) {
              const contextKey = `${key}${this.options.contextSeparator || "_"}${opt.context}`;
              finalKeys.push(contextKey);
              if (needsPluralHandling) {
                if (opt.ordinal && pluralSuffix.indexOf(ordinalPrefix) === 0) {
                  finalKeys.push(contextKey + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
                }
                finalKeys.push(contextKey + pluralSuffix);
                if (needsZeroSuffixLookup) {
                  finalKeys.push(contextKey + zeroSuffix);
                }
              }
            }
          }
          let possibleKey;
          while (possibleKey = finalKeys.pop()) {
            if (!this.isValidLookup(found)) {
              exactUsedKey = possibleKey;
              found = this.getResource(code, ns, possibleKey, opt);
            }
          }
        });
      });
    });
    return {
      res: found,
      usedKey,
      exactUsedKey,
      usedLng,
      usedNS
    };
  }
  isValidLookup(res) {
    return res !== void 0 && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === "");
  }
  getResource(code, ns, key, options = {}) {
    if (this.i18nFormat?.getResource)
      return this.i18nFormat.getResource(code, ns, key, options);
    return this.resourceStore.getResource(code, ns, key, options);
  }
  getUsedParamsDetails(options = {}) {
    const optionsKeys = ["defaultValue", "ordinal", "context", "replace", "lng", "lngs", "fallbackLng", "ns", "keySeparator", "nsSeparator", "returnObjects", "returnDetails", "joinArrays", "postProcess", "interpolation"];
    const useOptionsReplaceForData = options.replace && !isString(options.replace);
    let data = useOptionsReplaceForData ? options.replace : options;
    if (useOptionsReplaceForData && typeof options.count !== "undefined") {
      data.count = options.count;
    }
    if (this.options.interpolation.defaultVariables) {
      data = {
        ...this.options.interpolation.defaultVariables,
        ...data
      };
    }
    if (!useOptionsReplaceForData) {
      data = {
        ...data
      };
      for (const key of optionsKeys) {
        delete data[key];
      }
    }
    return data;
  }
  static hasDefaultValue(options) {
    const prefix = "defaultValue";
    for (const option in options) {
      if (Object.prototype.hasOwnProperty.call(options, option) && prefix === option.substring(0, prefix.length) && void 0 !== options[option]) {
        return true;
      }
    }
    return false;
  }
};
var LanguageUtil = class {
  constructor(options) {
    this.options = options;
    this.supportedLngs = this.options.supportedLngs || false;
    this.logger = baseLogger.create("languageUtils");
  }
  getScriptPartFromCode(code) {
    code = getCleanedCode(code);
    if (!code || code.indexOf("-") < 0)
      return null;
    const p = code.split("-");
    if (p.length === 2)
      return null;
    p.pop();
    if (p[p.length - 1].toLowerCase() === "x")
      return null;
    return this.formatLanguageCode(p.join("-"));
  }
  getLanguagePartFromCode(code) {
    code = getCleanedCode(code);
    if (!code || code.indexOf("-") < 0)
      return code;
    const p = code.split("-");
    return this.formatLanguageCode(p[0]);
  }
  formatLanguageCode(code) {
    if (isString(code) && code.indexOf("-") > -1) {
      let formattedCode;
      try {
        formattedCode = Intl.getCanonicalLocales(code)[0];
      } catch (e2) {
      }
      if (formattedCode && this.options.lowerCaseLng) {
        formattedCode = formattedCode.toLowerCase();
      }
      if (formattedCode)
        return formattedCode;
      if (this.options.lowerCaseLng) {
        return code.toLowerCase();
      }
      return code;
    }
    return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
  }
  isSupportedCode(code) {
    if (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) {
      code = this.getLanguagePartFromCode(code);
    }
    return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(code) > -1;
  }
  getBestMatchFromCodes(codes) {
    if (!codes)
      return null;
    let found;
    codes.forEach((code) => {
      if (found)
        return;
      const cleanedLng = this.formatLanguageCode(code);
      if (!this.options.supportedLngs || this.isSupportedCode(cleanedLng))
        found = cleanedLng;
    });
    if (!found && this.options.supportedLngs) {
      codes.forEach((code) => {
        if (found)
          return;
        const lngScOnly = this.getScriptPartFromCode(code);
        if (this.isSupportedCode(lngScOnly))
          return found = lngScOnly;
        const lngOnly = this.getLanguagePartFromCode(code);
        if (this.isSupportedCode(lngOnly))
          return found = lngOnly;
        found = this.options.supportedLngs.find((supportedLng) => {
          if (supportedLng === lngOnly)
            return supportedLng;
          if (supportedLng.indexOf("-") < 0 && lngOnly.indexOf("-") < 0)
            return;
          if (supportedLng.indexOf("-") > 0 && lngOnly.indexOf("-") < 0 && supportedLng.substring(0, supportedLng.indexOf("-")) === lngOnly)
            return supportedLng;
          if (supportedLng.indexOf(lngOnly) === 0 && lngOnly.length > 1)
            return supportedLng;
        });
      });
    }
    if (!found)
      found = this.getFallbackCodes(this.options.fallbackLng)[0];
    return found;
  }
  getFallbackCodes(fallbacks, code) {
    if (!fallbacks)
      return [];
    if (typeof fallbacks === "function")
      fallbacks = fallbacks(code);
    if (isString(fallbacks))
      fallbacks = [fallbacks];
    if (Array.isArray(fallbacks))
      return fallbacks;
    if (!code)
      return fallbacks.default || [];
    let found = fallbacks[code];
    if (!found)
      found = fallbacks[this.getScriptPartFromCode(code)];
    if (!found)
      found = fallbacks[this.formatLanguageCode(code)];
    if (!found)
      found = fallbacks[this.getLanguagePartFromCode(code)];
    if (!found)
      found = fallbacks.default;
    return found || [];
  }
  toResolveHierarchy(code, fallbackCode) {
    const fallbackCodes = this.getFallbackCodes((fallbackCode === false ? [] : fallbackCode) || this.options.fallbackLng || [], code);
    const codes = [];
    const addCode = (c) => {
      if (!c)
        return;
      if (this.isSupportedCode(c)) {
        codes.push(c);
      } else {
        this.logger.warn(`rejecting language code not found in supportedLngs: ${c}`);
      }
    };
    if (isString(code) && (code.indexOf("-") > -1 || code.indexOf("_") > -1)) {
      if (this.options.load !== "languageOnly")
        addCode(this.formatLanguageCode(code));
      if (this.options.load !== "languageOnly" && this.options.load !== "currentOnly")
        addCode(this.getScriptPartFromCode(code));
      if (this.options.load !== "currentOnly")
        addCode(this.getLanguagePartFromCode(code));
    } else if (isString(code)) {
      addCode(this.formatLanguageCode(code));
    }
    fallbackCodes.forEach((fc) => {
      if (codes.indexOf(fc) < 0)
        addCode(this.formatLanguageCode(fc));
    });
    return codes;
  }
};
var suffixesOrder = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
};
var dummyRule = {
  select: (count) => count === 1 ? "one" : "other",
  resolvedOptions: () => ({
    pluralCategories: ["one", "other"]
  })
};
var PluralResolver = class {
  constructor(languageUtils, options = {}) {
    this.languageUtils = languageUtils;
    this.options = options;
    this.logger = baseLogger.create("pluralResolver");
    this.pluralRulesCache = {};
  }
  addRule(lng, obj) {
    this.rules[lng] = obj;
  }
  clearCache() {
    this.pluralRulesCache = {};
  }
  getRule(code, options = {}) {
    const cleanedCode = getCleanedCode(code === "dev" ? "en" : code);
    const type = options.ordinal ? "ordinal" : "cardinal";
    const cacheKey = JSON.stringify({
      cleanedCode,
      type
    });
    if (cacheKey in this.pluralRulesCache) {
      return this.pluralRulesCache[cacheKey];
    }
    let rule;
    try {
      rule = new Intl.PluralRules(cleanedCode, {
        type
      });
    } catch (err) {
      if (!Intl) {
        this.logger.error("No Intl support, please use an Intl polyfill!");
        return dummyRule;
      }
      if (!code.match(/-|_/))
        return dummyRule;
      const lngPart = this.languageUtils.getLanguagePartFromCode(code);
      rule = this.getRule(lngPart, options);
    }
    this.pluralRulesCache[cacheKey] = rule;
    return rule;
  }
  needsPlural(code, options = {}) {
    let rule = this.getRule(code, options);
    if (!rule)
      rule = this.getRule("dev", options);
    return rule?.resolvedOptions().pluralCategories.length > 1;
  }
  getPluralFormsOfKey(code, key, options = {}) {
    return this.getSuffixes(code, options).map((suffix) => `${key}${suffix}`);
  }
  getSuffixes(code, options = {}) {
    let rule = this.getRule(code, options);
    if (!rule)
      rule = this.getRule("dev", options);
    if (!rule)
      return [];
    return rule.resolvedOptions().pluralCategories.sort((pluralCategory1, pluralCategory2) => suffixesOrder[pluralCategory1] - suffixesOrder[pluralCategory2]).map((pluralCategory) => `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ""}${pluralCategory}`);
  }
  getSuffix(code, count, options = {}) {
    const rule = this.getRule(code, options);
    if (rule) {
      return `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ""}${rule.select(count)}`;
    }
    this.logger.warn(`no plural rule found for: ${code}`);
    return this.getSuffix("dev", count, options);
  }
};
var deepFindWithDefaults = (data, defaultData, key, keySeparator = ".", ignoreJSONStructure = true) => {
  let path = getPathWithDefaults(data, defaultData, key);
  if (!path && ignoreJSONStructure && isString(key)) {
    path = deepFind(data, key, keySeparator);
    if (path === void 0)
      path = deepFind(defaultData, key, keySeparator);
  }
  return path;
};
var regexSafe = (val) => val.replace(/\$/g, "$$$$");
var Interpolator = class {
  constructor(options = {}) {
    this.logger = baseLogger.create("interpolator");
    this.options = options;
    this.format = options?.interpolation?.format || ((value) => value);
    this.init(options);
  }
  init(options = {}) {
    if (!options.interpolation)
      options.interpolation = {
        escapeValue: true
      };
    const {
      escape: escape$1,
      escapeValue,
      useRawValueToEscape,
      prefix,
      prefixEscaped,
      suffix,
      suffixEscaped,
      formatSeparator,
      unescapeSuffix,
      unescapePrefix,
      nestingPrefix,
      nestingPrefixEscaped,
      nestingSuffix,
      nestingSuffixEscaped,
      nestingOptionsSeparator,
      maxReplaces,
      alwaysFormat
    } = options.interpolation;
    this.escape = escape$1 !== void 0 ? escape$1 : escape;
    this.escapeValue = escapeValue !== void 0 ? escapeValue : true;
    this.useRawValueToEscape = useRawValueToEscape !== void 0 ? useRawValueToEscape : false;
    this.prefix = prefix ? regexEscape(prefix) : prefixEscaped || "{{";
    this.suffix = suffix ? regexEscape(suffix) : suffixEscaped || "}}";
    this.formatSeparator = formatSeparator || ",";
    this.unescapePrefix = unescapeSuffix ? "" : unescapePrefix || "-";
    this.unescapeSuffix = this.unescapePrefix ? "" : unescapeSuffix || "";
    this.nestingPrefix = nestingPrefix ? regexEscape(nestingPrefix) : nestingPrefixEscaped || regexEscape("$t(");
    this.nestingSuffix = nestingSuffix ? regexEscape(nestingSuffix) : nestingSuffixEscaped || regexEscape(")");
    this.nestingOptionsSeparator = nestingOptionsSeparator || ",";
    this.maxReplaces = maxReplaces || 1e3;
    this.alwaysFormat = alwaysFormat !== void 0 ? alwaysFormat : false;
    this.resetRegExp();
  }
  reset() {
    if (this.options)
      this.init(this.options);
  }
  resetRegExp() {
    const getOrResetRegExp = (existingRegExp, pattern) => {
      if (existingRegExp?.source === pattern) {
        existingRegExp.lastIndex = 0;
        return existingRegExp;
      }
      return new RegExp(pattern, "g");
    };
    this.regexp = getOrResetRegExp(this.regexp, `${this.prefix}(.+?)${this.suffix}`);
    this.regexpUnescape = getOrResetRegExp(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`);
    this.nestingRegexp = getOrResetRegExp(this.nestingRegexp, `${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`);
  }
  interpolate(str, data, lng, options) {
    let match;
    let value;
    let replaces;
    const defaultData = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
    const handleFormat = (key) => {
      if (key.indexOf(this.formatSeparator) < 0) {
        const path = deepFindWithDefaults(data, defaultData, key, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(path, void 0, lng, {
          ...options,
          ...data,
          interpolationkey: key
        }) : path;
      }
      const p = key.split(this.formatSeparator);
      const k = p.shift().trim();
      const f = p.join(this.formatSeparator).trim();
      return this.format(deepFindWithDefaults(data, defaultData, k, this.options.keySeparator, this.options.ignoreJSONStructure), f, lng, {
        ...options,
        ...data,
        interpolationkey: k
      });
    };
    this.resetRegExp();
    const missingInterpolationHandler = options?.missingInterpolationHandler || this.options.missingInterpolationHandler;
    const skipOnVariables = options?.interpolation?.skipOnVariables !== void 0 ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    const todos = [{
      regex: this.regexpUnescape,
      safeValue: (val) => regexSafe(val)
    }, {
      regex: this.regexp,
      safeValue: (val) => this.escapeValue ? regexSafe(this.escape(val)) : regexSafe(val)
    }];
    todos.forEach((todo) => {
      replaces = 0;
      while (match = todo.regex.exec(str)) {
        const matchedVar = match[1].trim();
        value = handleFormat(matchedVar);
        if (value === void 0) {
          if (typeof missingInterpolationHandler === "function") {
            const temp = missingInterpolationHandler(str, match, options);
            value = isString(temp) ? temp : "";
          } else if (options && Object.prototype.hasOwnProperty.call(options, matchedVar)) {
            value = "";
          } else if (skipOnVariables) {
            value = match[0];
            continue;
          } else {
            this.logger.warn(`missed to pass in variable ${matchedVar} for interpolating ${str}`);
            value = "";
          }
        } else if (!isString(value) && !this.useRawValueToEscape) {
          value = makeString(value);
        }
        const safeValue = todo.safeValue(value);
        str = str.replace(match[0], safeValue);
        if (skipOnVariables) {
          todo.regex.lastIndex += value.length;
          todo.regex.lastIndex -= match[0].length;
        } else {
          todo.regex.lastIndex = 0;
        }
        replaces++;
        if (replaces >= this.maxReplaces) {
          break;
        }
      }
    });
    return str;
  }
  nest(str, fc, options = {}) {
    let match;
    let value;
    let clonedOptions;
    const handleHasOptions = (key, inheritedOptions) => {
      const sep = this.nestingOptionsSeparator;
      if (key.indexOf(sep) < 0)
        return key;
      const c = key.split(new RegExp(`${sep}[ ]*{`));
      let optionsString = `{${c[1]}`;
      key = c[0];
      optionsString = this.interpolate(optionsString, clonedOptions);
      const matchedSingleQuotes = optionsString.match(/'/g);
      const matchedDoubleQuotes = optionsString.match(/"/g);
      if ((matchedSingleQuotes?.length ?? 0) % 2 === 0 && !matchedDoubleQuotes || matchedDoubleQuotes.length % 2 !== 0) {
        optionsString = optionsString.replace(/'/g, '"');
      }
      try {
        clonedOptions = JSON.parse(optionsString);
        if (inheritedOptions)
          clonedOptions = {
            ...inheritedOptions,
            ...clonedOptions
          };
      } catch (e2) {
        this.logger.warn(`failed parsing options string in nesting for key ${key}`, e2);
        return `${key}${sep}${optionsString}`;
      }
      if (clonedOptions.defaultValue && clonedOptions.defaultValue.indexOf(this.prefix) > -1)
        delete clonedOptions.defaultValue;
      return key;
    };
    while (match = this.nestingRegexp.exec(str)) {
      let formatters = [];
      clonedOptions = {
        ...options
      };
      clonedOptions = clonedOptions.replace && !isString(clonedOptions.replace) ? clonedOptions.replace : clonedOptions;
      clonedOptions.applyPostProcessor = false;
      delete clonedOptions.defaultValue;
      const keyEndIndex = /{.*}/.test(match[1]) ? match[1].lastIndexOf("}") + 1 : match[1].indexOf(this.formatSeparator);
      if (keyEndIndex !== -1) {
        formatters = match[1].slice(keyEndIndex).split(this.formatSeparator).map((elem) => elem.trim()).filter(Boolean);
        match[1] = match[1].slice(0, keyEndIndex);
      }
      value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
      if (value && match[0] === str && !isString(value))
        return value;
      if (!isString(value))
        value = makeString(value);
      if (!value) {
        this.logger.warn(`missed to resolve ${match[1]} for nesting ${str}`);
        value = "";
      }
      if (formatters.length) {
        value = formatters.reduce((v, f) => this.format(v, f, options.lng, {
          ...options,
          interpolationkey: match[1].trim()
        }), value.trim());
      }
      str = str.replace(match[0], value);
      this.regexp.lastIndex = 0;
    }
    return str;
  }
};
var parseFormatStr = (formatStr) => {
  let formatName = formatStr.toLowerCase().trim();
  const formatOptions = {};
  if (formatStr.indexOf("(") > -1) {
    const p = formatStr.split("(");
    formatName = p[0].toLowerCase().trim();
    const optStr = p[1].substring(0, p[1].length - 1);
    if (formatName === "currency" && optStr.indexOf(":") < 0) {
      if (!formatOptions.currency)
        formatOptions.currency = optStr.trim();
    } else if (formatName === "relativetime" && optStr.indexOf(":") < 0) {
      if (!formatOptions.range)
        formatOptions.range = optStr.trim();
    } else {
      const opts = optStr.split(";");
      opts.forEach((opt) => {
        if (opt) {
          const [key, ...rest] = opt.split(":");
          const val = rest.join(":").trim().replace(/^'+|'+$/g, "");
          const trimmedKey = key.trim();
          if (!formatOptions[trimmedKey])
            formatOptions[trimmedKey] = val;
          if (val === "false")
            formatOptions[trimmedKey] = false;
          if (val === "true")
            formatOptions[trimmedKey] = true;
          if (!isNaN(val))
            formatOptions[trimmedKey] = parseInt(val, 10);
        }
      });
    }
  }
  return {
    formatName,
    formatOptions
  };
};
var createCachedFormatter = (fn) => {
  const cache = {};
  return (v, l, o) => {
    let optForCache = o;
    if (o && o.interpolationkey && o.formatParams && o.formatParams[o.interpolationkey] && o[o.interpolationkey]) {
      optForCache = {
        ...optForCache,
        [o.interpolationkey]: void 0
      };
    }
    const key = l + JSON.stringify(optForCache);
    let frm = cache[key];
    if (!frm) {
      frm = fn(getCleanedCode(l), o);
      cache[key] = frm;
    }
    return frm(v);
  };
};
var createNonCachedFormatter = (fn) => (v, l, o) => fn(getCleanedCode(l), o)(v);
var Formatter = class {
  constructor(options = {}) {
    this.logger = baseLogger.create("formatter");
    this.options = options;
    this.init(options);
  }
  init(services, options = {
    interpolation: {}
  }) {
    this.formatSeparator = options.interpolation.formatSeparator || ",";
    const cf = options.cacheInBuiltFormats ? createCachedFormatter : createNonCachedFormatter;
    this.formats = {
      number: cf((lng, opt) => {
        const formatter = new Intl.NumberFormat(lng, {
          ...opt
        });
        return (val) => formatter.format(val);
      }),
      currency: cf((lng, opt) => {
        const formatter = new Intl.NumberFormat(lng, {
          ...opt,
          style: "currency"
        });
        return (val) => formatter.format(val);
      }),
      datetime: cf((lng, opt) => {
        const formatter = new Intl.DateTimeFormat(lng, {
          ...opt
        });
        return (val) => formatter.format(val);
      }),
      relativetime: cf((lng, opt) => {
        const formatter = new Intl.RelativeTimeFormat(lng, {
          ...opt
        });
        return (val) => formatter.format(val, opt.range || "day");
      }),
      list: cf((lng, opt) => {
        const formatter = new Intl.ListFormat(lng, {
          ...opt
        });
        return (val) => formatter.format(val);
      })
    };
  }
  add(name, fc) {
    this.formats[name.toLowerCase().trim()] = fc;
  }
  addCached(name, fc) {
    this.formats[name.toLowerCase().trim()] = createCachedFormatter(fc);
  }
  format(value, format, lng, options = {}) {
    const formats = format.split(this.formatSeparator);
    if (formats.length > 1 && formats[0].indexOf("(") > 1 && formats[0].indexOf(")") < 0 && formats.find((f) => f.indexOf(")") > -1)) {
      const lastIndex = formats.findIndex((f) => f.indexOf(")") > -1);
      formats[0] = [formats[0], ...formats.splice(1, lastIndex)].join(this.formatSeparator);
    }
    const result = formats.reduce((mem, f) => {
      const {
        formatName,
        formatOptions
      } = parseFormatStr(f);
      if (this.formats[formatName]) {
        let formatted = mem;
        try {
          const valOptions = options?.formatParams?.[options.interpolationkey] || {};
          const l = valOptions.locale || valOptions.lng || options.locale || options.lng || lng;
          formatted = this.formats[formatName](mem, l, {
            ...formatOptions,
            ...options,
            ...valOptions
          });
        } catch (error) {
          this.logger.warn(error);
        }
        return formatted;
      } else {
        this.logger.warn(`there was no format function for ${formatName}`);
      }
      return mem;
    }, value);
    return result;
  }
};
var removePending = (q, name) => {
  if (q.pending[name] !== void 0) {
    delete q.pending[name];
    q.pendingCount--;
  }
};
var Connector = class extends EventEmitter {
  constructor(backend, store, services, options = {}) {
    super();
    this.backend = backend;
    this.store = store;
    this.services = services;
    this.languageUtils = services.languageUtils;
    this.options = options;
    this.logger = baseLogger.create("backendConnector");
    this.waitingReads = [];
    this.maxParallelReads = options.maxParallelReads || 10;
    this.readingCalls = 0;
    this.maxRetries = options.maxRetries >= 0 ? options.maxRetries : 5;
    this.retryTimeout = options.retryTimeout >= 1 ? options.retryTimeout : 350;
    this.state = {};
    this.queue = [];
    this.backend?.init?.(services, options.backend, options);
  }
  queueLoad(languages, namespaces, options, callback) {
    const toLoad = {};
    const pending = {};
    const toLoadLanguages = {};
    const toLoadNamespaces = {};
    languages.forEach((lng) => {
      let hasAllNamespaces = true;
      namespaces.forEach((ns) => {
        const name = `${lng}|${ns}`;
        if (!options.reload && this.store.hasResourceBundle(lng, ns)) {
          this.state[name] = 2;
        } else if (this.state[name] < 0)
          ;
        else if (this.state[name] === 1) {
          if (pending[name] === void 0)
            pending[name] = true;
        } else {
          this.state[name] = 1;
          hasAllNamespaces = false;
          if (pending[name] === void 0)
            pending[name] = true;
          if (toLoad[name] === void 0)
            toLoad[name] = true;
          if (toLoadNamespaces[ns] === void 0)
            toLoadNamespaces[ns] = true;
        }
      });
      if (!hasAllNamespaces)
        toLoadLanguages[lng] = true;
    });
    if (Object.keys(toLoad).length || Object.keys(pending).length) {
      this.queue.push({
        pending,
        pendingCount: Object.keys(pending).length,
        loaded: {},
        errors: [],
        callback
      });
    }
    return {
      toLoad: Object.keys(toLoad),
      pending: Object.keys(pending),
      toLoadLanguages: Object.keys(toLoadLanguages),
      toLoadNamespaces: Object.keys(toLoadNamespaces)
    };
  }
  loaded(name, err, data) {
    const s = name.split("|");
    const lng = s[0];
    const ns = s[1];
    if (err)
      this.emit("failedLoading", lng, ns, err);
    if (!err && data) {
      this.store.addResourceBundle(lng, ns, data, void 0, void 0, {
        skipCopy: true
      });
    }
    this.state[name] = err ? -1 : 2;
    if (err && data)
      this.state[name] = 0;
    const loaded = {};
    this.queue.forEach((q) => {
      pushPath(q.loaded, [lng], ns);
      removePending(q, name);
      if (err)
        q.errors.push(err);
      if (q.pendingCount === 0 && !q.done) {
        Object.keys(q.loaded).forEach((l) => {
          if (!loaded[l])
            loaded[l] = {};
          const loadedKeys = q.loaded[l];
          if (loadedKeys.length) {
            loadedKeys.forEach((n) => {
              if (loaded[l][n] === void 0)
                loaded[l][n] = true;
            });
          }
        });
        q.done = true;
        if (q.errors.length) {
          q.callback(q.errors);
        } else {
          q.callback();
        }
      }
    });
    this.emit("loaded", loaded);
    this.queue = this.queue.filter((q) => !q.done);
  }
  read(lng, ns, fcName, tried = 0, wait = this.retryTimeout, callback) {
    if (!lng.length)
      return callback(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng,
        ns,
        fcName,
        tried,
        wait,
        callback
      });
      return;
    }
    this.readingCalls++;
    const resolver = (err, data) => {
      this.readingCalls--;
      if (this.waitingReads.length > 0) {
        const next = this.waitingReads.shift();
        this.read(next.lng, next.ns, next.fcName, next.tried, next.wait, next.callback);
      }
      if (err && data && tried < this.maxRetries) {
        setTimeout(() => {
          this.read.call(this, lng, ns, fcName, tried + 1, wait * 2, callback);
        }, wait);
        return;
      }
      callback(err, data);
    };
    const fc = this.backend[fcName].bind(this.backend);
    if (fc.length === 2) {
      try {
        const r = fc(lng, ns);
        if (r && typeof r.then === "function") {
          r.then((data) => resolver(null, data)).catch(resolver);
        } else {
          resolver(null, r);
        }
      } catch (err) {
        resolver(err);
      }
      return;
    }
    return fc(lng, ns, resolver);
  }
  prepareLoading(languages, namespaces, options = {}, callback) {
    if (!this.backend) {
      this.logger.warn("No backend was added via i18next.use. Will not load resources.");
      return callback && callback();
    }
    if (isString(languages))
      languages = this.languageUtils.toResolveHierarchy(languages);
    if (isString(namespaces))
      namespaces = [namespaces];
    const toLoad = this.queueLoad(languages, namespaces, options, callback);
    if (!toLoad.toLoad.length) {
      if (!toLoad.pending.length)
        callback();
      return null;
    }
    toLoad.toLoad.forEach((name) => {
      this.loadOne(name);
    });
  }
  load(languages, namespaces, callback) {
    this.prepareLoading(languages, namespaces, {}, callback);
  }
  reload(languages, namespaces, callback) {
    this.prepareLoading(languages, namespaces, {
      reload: true
    }, callback);
  }
  loadOne(name, prefix = "") {
    const s = name.split("|");
    const lng = s[0];
    const ns = s[1];
    this.read(lng, ns, "read", void 0, void 0, (err, data) => {
      if (err)
        this.logger.warn(`${prefix}loading namespace ${ns} for language ${lng} failed`, err);
      if (!err && data)
        this.logger.log(`${prefix}loaded namespace ${ns} for language ${lng}`, data);
      this.loaded(name, err, data);
    });
  }
  saveMissing(languages, namespace, key, fallbackValue, isUpdate, options = {}, clb = () => {
  }) {
    if (this.services?.utils?.hasLoadedNamespace && !this.services?.utils?.hasLoadedNamespace(namespace)) {
      this.logger.warn(`did not save key "${key}" as the namespace "${namespace}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
      return;
    }
    if (key === void 0 || key === null || key === "")
      return;
    if (this.backend?.create) {
      const opts = {
        ...options,
        isUpdate
      };
      const fc = this.backend.create.bind(this.backend);
      if (fc.length < 6) {
        try {
          let r;
          if (fc.length === 5) {
            r = fc(languages, namespace, key, fallbackValue, opts);
          } else {
            r = fc(languages, namespace, key, fallbackValue);
          }
          if (r && typeof r.then === "function") {
            r.then((data) => clb(null, data)).catch(clb);
          } else {
            clb(null, r);
          }
        } catch (err) {
          clb(err);
        }
      } else {
        fc(languages, namespace, key, fallbackValue, clb, opts);
      }
    }
    if (!languages || !languages[0])
      return;
    this.store.addResource(languages[0], namespace, key, fallbackValue);
  }
};
var get = () => ({
  debug: false,
  initAsync: true,
  ns: ["translation"],
  defaultNS: ["translation"],
  fallbackLng: ["dev"],
  fallbackNS: false,
  supportedLngs: false,
  nonExplicitSupportedLngs: false,
  load: "all",
  preload: false,
  simplifyPluralSuffix: true,
  keySeparator: ".",
  nsSeparator: ":",
  pluralSeparator: "_",
  contextSeparator: "_",
  partialBundledLanguages: false,
  saveMissing: false,
  updateMissing: false,
  saveMissingTo: "fallback",
  saveMissingPlurals: true,
  missingKeyHandler: false,
  missingInterpolationHandler: false,
  postProcess: false,
  postProcessPassResolved: false,
  returnNull: false,
  returnEmptyString: true,
  returnObjects: false,
  joinArrays: false,
  returnedObjectHandler: false,
  parseMissingKeyHandler: false,
  appendNamespaceToMissingKey: false,
  appendNamespaceToCIMode: false,
  overloadTranslationOptionHandler: (args) => {
    let ret = {};
    if (typeof args[1] === "object")
      ret = args[1];
    if (isString(args[1]))
      ret.defaultValue = args[1];
    if (isString(args[2]))
      ret.tDescription = args[2];
    if (typeof args[2] === "object" || typeof args[3] === "object") {
      const options = args[3] || args[2];
      Object.keys(options).forEach((key) => {
        ret[key] = options[key];
      });
    }
    return ret;
  },
  interpolation: {
    escapeValue: true,
    format: (value) => value,
    prefix: "{{",
    suffix: "}}",
    formatSeparator: ",",
    unescapePrefix: "-",
    nestingPrefix: "$t(",
    nestingSuffix: ")",
    nestingOptionsSeparator: ",",
    maxReplaces: 1e3,
    skipOnVariables: true
  },
  cacheInBuiltFormats: true
});
var transformOptions = (options) => {
  if (isString(options.ns))
    options.ns = [options.ns];
  if (isString(options.fallbackLng))
    options.fallbackLng = [options.fallbackLng];
  if (isString(options.fallbackNS))
    options.fallbackNS = [options.fallbackNS];
  if (options.supportedLngs?.indexOf?.("cimode") < 0) {
    options.supportedLngs = options.supportedLngs.concat(["cimode"]);
  }
  if (typeof options.initImmediate === "boolean")
    options.initAsync = options.initImmediate;
  return options;
};
var noop = () => {
};
var bindMemberFunctions = (inst) => {
  const mems = Object.getOwnPropertyNames(Object.getPrototypeOf(inst));
  mems.forEach((mem) => {
    if (typeof inst[mem] === "function") {
      inst[mem] = inst[mem].bind(inst);
    }
  });
};
var I18n = class _I18n extends EventEmitter {
  constructor(options = {}, callback) {
    super();
    this.options = transformOptions(options);
    this.services = {};
    this.logger = baseLogger;
    this.modules = {
      external: []
    };
    bindMemberFunctions(this);
    if (callback && !this.isInitialized && !options.isClone) {
      if (!this.options.initAsync) {
        this.init(options, callback);
        return this;
      }
      setTimeout(() => {
        this.init(options, callback);
      }, 0);
    }
  }
  init(options = {}, callback) {
    this.isInitializing = true;
    if (typeof options === "function") {
      callback = options;
      options = {};
    }
    if (options.defaultNS == null && options.ns) {
      if (isString(options.ns)) {
        options.defaultNS = options.ns;
      } else if (options.ns.indexOf("translation") < 0) {
        options.defaultNS = options.ns[0];
      }
    }
    const defOpts = get();
    this.options = {
      ...defOpts,
      ...this.options,
      ...transformOptions(options)
    };
    this.options.interpolation = {
      ...defOpts.interpolation,
      ...this.options.interpolation
    };
    if (options.keySeparator !== void 0) {
      this.options.userDefinedKeySeparator = options.keySeparator;
    }
    if (options.nsSeparator !== void 0) {
      this.options.userDefinedNsSeparator = options.nsSeparator;
    }
    const createClassOnDemand = (ClassOrObject) => {
      if (!ClassOrObject)
        return null;
      if (typeof ClassOrObject === "function")
        return new ClassOrObject();
      return ClassOrObject;
    };
    if (!this.options.isClone) {
      if (this.modules.logger) {
        baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
      } else {
        baseLogger.init(null, this.options);
      }
      let formatter;
      if (this.modules.formatter) {
        formatter = this.modules.formatter;
      } else {
        formatter = Formatter;
      }
      const lu = new LanguageUtil(this.options);
      this.store = new ResourceStore(this.options.resources, this.options);
      const s = this.services;
      s.logger = baseLogger;
      s.resourceStore = this.store;
      s.languageUtils = lu;
      s.pluralResolver = new PluralResolver(lu, {
        prepend: this.options.pluralSeparator,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      });
      const usingLegacyFormatFunction = this.options.interpolation.format && this.options.interpolation.format !== defOpts.interpolation.format;
      if (usingLegacyFormatFunction) {
        this.logger.deprecate(`init: you are still using the legacy format function, please use the new approach: https://www.i18next.com/translation-function/formatting`);
      }
      if (formatter && (!this.options.interpolation.format || this.options.interpolation.format === defOpts.interpolation.format)) {
        s.formatter = createClassOnDemand(formatter);
        if (s.formatter.init)
          s.formatter.init(s, this.options);
        this.options.interpolation.format = s.formatter.format.bind(s.formatter);
      }
      s.interpolator = new Interpolator(this.options);
      s.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      };
      s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
      s.backendConnector.on("*", (event, ...args) => {
        this.emit(event, ...args);
      });
      if (this.modules.languageDetector) {
        s.languageDetector = createClassOnDemand(this.modules.languageDetector);
        if (s.languageDetector.init)
          s.languageDetector.init(s, this.options.detection, this.options);
      }
      if (this.modules.i18nFormat) {
        s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
        if (s.i18nFormat.init)
          s.i18nFormat.init(this);
      }
      this.translator = new Translator(this.services, this.options);
      this.translator.on("*", (event, ...args) => {
        this.emit(event, ...args);
      });
      this.modules.external.forEach((m) => {
        if (m.init)
          m.init(this);
      });
    }
    this.format = this.options.interpolation.format;
    if (!callback)
      callback = noop;
    if (this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const codes = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      if (codes.length > 0 && codes[0] !== "dev")
        this.options.lng = codes[0];
    }
    if (!this.services.languageDetector && !this.options.lng) {
      this.logger.warn("init: no languageDetector is used and no lng is defined");
    }
    const storeApi = ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"];
    storeApi.forEach((fcName) => {
      this[fcName] = (...args) => this.store[fcName](...args);
    });
    const storeApiChained = ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"];
    storeApiChained.forEach((fcName) => {
      this[fcName] = (...args) => {
        this.store[fcName](...args);
        return this;
      };
    });
    const deferred = defer();
    const load = () => {
      const finish = (err, t2) => {
        this.isInitializing = false;
        if (this.isInitialized && !this.initializedStoreOnce)
          this.logger.warn("init: i18next is already initialized. You should call init just once!");
        this.isInitialized = true;
        if (!this.options.isClone)
          this.logger.log("initialized", this.options);
        this.emit("initialized", this.options);
        deferred.resolve(t2);
        callback(err, t2);
      };
      if (this.languages && !this.isInitialized)
        return finish(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, finish);
    };
    if (this.options.resources || !this.options.initAsync) {
      load();
    } else {
      setTimeout(load, 0);
    }
    return deferred;
  }
  loadResources(language, callback = noop) {
    let usedCallback = callback;
    const usedLng = isString(language) ? language : this.language;
    if (typeof language === "function")
      usedCallback = language;
    if (!this.options.resources || this.options.partialBundledLanguages) {
      if (usedLng?.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0))
        return usedCallback();
      const toLoad = [];
      const append = (lng) => {
        if (!lng)
          return;
        if (lng === "cimode")
          return;
        const lngs = this.services.languageUtils.toResolveHierarchy(lng);
        lngs.forEach((l) => {
          if (l === "cimode")
            return;
          if (toLoad.indexOf(l) < 0)
            toLoad.push(l);
        });
      };
      if (!usedLng) {
        const fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
        fallbacks.forEach((l) => append(l));
      } else {
        append(usedLng);
      }
      this.options.preload?.forEach?.((l) => append(l));
      this.services.backendConnector.load(toLoad, this.options.ns, (e2) => {
        if (!e2 && !this.resolvedLanguage && this.language)
          this.setResolvedLanguage(this.language);
        usedCallback(e2);
      });
    } else {
      usedCallback(null);
    }
  }
  reloadResources(lngs, ns, callback) {
    const deferred = defer();
    if (typeof lngs === "function") {
      callback = lngs;
      lngs = void 0;
    }
    if (typeof ns === "function") {
      callback = ns;
      ns = void 0;
    }
    if (!lngs)
      lngs = this.languages;
    if (!ns)
      ns = this.options.ns;
    if (!callback)
      callback = noop;
    this.services.backendConnector.reload(lngs, ns, (err) => {
      deferred.resolve();
      callback(err);
    });
    return deferred;
  }
  use(module) {
    if (!module)
      throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!module.type)
      throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    if (module.type === "backend") {
      this.modules.backend = module;
    }
    if (module.type === "logger" || module.log && module.warn && module.error) {
      this.modules.logger = module;
    }
    if (module.type === "languageDetector") {
      this.modules.languageDetector = module;
    }
    if (module.type === "i18nFormat") {
      this.modules.i18nFormat = module;
    }
    if (module.type === "postProcessor") {
      postProcessor.addPostProcessor(module);
    }
    if (module.type === "formatter") {
      this.modules.formatter = module;
    }
    if (module.type === "3rdParty") {
      this.modules.external.push(module);
    }
    return this;
  }
  setResolvedLanguage(l) {
    if (!l || !this.languages)
      return;
    if (["cimode", "dev"].indexOf(l) > -1)
      return;
    for (let li = 0; li < this.languages.length; li++) {
      const lngInLngs = this.languages[li];
      if (["cimode", "dev"].indexOf(lngInLngs) > -1)
        continue;
      if (this.store.hasLanguageSomeTranslations(lngInLngs)) {
        this.resolvedLanguage = lngInLngs;
        break;
      }
    }
    if (!this.resolvedLanguage && this.languages.indexOf(l) < 0 && this.store.hasLanguageSomeTranslations(l)) {
      this.resolvedLanguage = l;
      this.languages.unshift(l);
    }
  }
  changeLanguage(lng, callback) {
    this.isLanguageChangingTo = lng;
    const deferred = defer();
    this.emit("languageChanging", lng);
    const setLngProps = (l) => {
      this.language = l;
      this.languages = this.services.languageUtils.toResolveHierarchy(l);
      this.resolvedLanguage = void 0;
      this.setResolvedLanguage(l);
    };
    const done = (err, l) => {
      if (l) {
        if (this.isLanguageChangingTo === lng) {
          setLngProps(l);
          this.translator.changeLanguage(l);
          this.isLanguageChangingTo = void 0;
          this.emit("languageChanged", l);
          this.logger.log("languageChanged", l);
        }
      } else {
        this.isLanguageChangingTo = void 0;
      }
      deferred.resolve((...args) => this.t(...args));
      if (callback)
        callback(err, (...args) => this.t(...args));
    };
    const setLng = (lngs) => {
      if (!lng && !lngs && this.services.languageDetector)
        lngs = [];
      const fl = isString(lngs) ? lngs : lngs && lngs[0];
      const l = this.store.hasLanguageSomeTranslations(fl) ? fl : this.services.languageUtils.getBestMatchFromCodes(isString(lngs) ? [lngs] : lngs);
      if (l) {
        if (!this.language) {
          setLngProps(l);
        }
        if (!this.translator.language)
          this.translator.changeLanguage(l);
        this.services.languageDetector?.cacheUserLanguage?.(l);
      }
      this.loadResources(l, (err) => {
        done(err, l);
      });
    };
    if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
      setLng(this.services.languageDetector.detect());
    } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
      if (this.services.languageDetector.detect.length === 0) {
        this.services.languageDetector.detect().then(setLng);
      } else {
        this.services.languageDetector.detect(setLng);
      }
    } else {
      setLng(lng);
    }
    return deferred;
  }
  getFixedT(lng, ns, keyPrefix) {
    const fixedT = (key, opts, ...rest) => {
      let o;
      if (typeof opts !== "object") {
        o = this.options.overloadTranslationOptionHandler([key, opts].concat(rest));
      } else {
        o = {
          ...opts
        };
      }
      o.lng = o.lng || fixedT.lng;
      o.lngs = o.lngs || fixedT.lngs;
      o.ns = o.ns || fixedT.ns;
      if (o.keyPrefix !== "")
        o.keyPrefix = o.keyPrefix || keyPrefix || fixedT.keyPrefix;
      const keySeparator = this.options.keySeparator || ".";
      let resultKey;
      if (o.keyPrefix && Array.isArray(key)) {
        resultKey = key.map((k) => {
          if (typeof k === "function")
            k = keysFromSelector(k, {
              ...this.options,
              ...opts
            });
          return `${o.keyPrefix}${keySeparator}${k}`;
        });
      } else {
        if (typeof key === "function")
          key = keysFromSelector(key, {
            ...this.options,
            ...opts
          });
        resultKey = o.keyPrefix ? `${o.keyPrefix}${keySeparator}${key}` : key;
      }
      return this.t(resultKey, o);
    };
    if (isString(lng)) {
      fixedT.lng = lng;
    } else {
      fixedT.lngs = lng;
    }
    fixedT.ns = ns;
    fixedT.keyPrefix = keyPrefix;
    return fixedT;
  }
  t(...args) {
    return this.translator?.translate(...args);
  }
  exists(...args) {
    return this.translator?.exists(...args);
  }
  setDefaultNamespace(ns) {
    this.options.defaultNS = ns;
  }
  hasLoadedNamespace(ns, options = {}) {
    if (!this.isInitialized) {
      this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages);
      return false;
    }
    if (!this.languages || !this.languages.length) {
      this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages);
      return false;
    }
    const lng = options.lng || this.resolvedLanguage || this.languages[0];
    const fallbackLng = this.options ? this.options.fallbackLng : false;
    const lastLng = this.languages[this.languages.length - 1];
    if (lng.toLowerCase() === "cimode")
      return true;
    const loadNotPending = (l, n) => {
      const loadState = this.services.backendConnector.state[`${l}|${n}`];
      return loadState === -1 || loadState === 0 || loadState === 2;
    };
    if (options.precheck) {
      const preResult = options.precheck(this, loadNotPending);
      if (preResult !== void 0)
        return preResult;
    }
    if (this.hasResourceBundle(lng, ns))
      return true;
    if (!this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages)
      return true;
    if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns)))
      return true;
    return false;
  }
  loadNamespaces(ns, callback) {
    const deferred = defer();
    if (!this.options.ns) {
      if (callback)
        callback();
      return Promise.resolve();
    }
    if (isString(ns))
      ns = [ns];
    ns.forEach((n) => {
      if (this.options.ns.indexOf(n) < 0)
        this.options.ns.push(n);
    });
    this.loadResources((err) => {
      deferred.resolve();
      if (callback)
        callback(err);
    });
    return deferred;
  }
  loadLanguages(lngs, callback) {
    const deferred = defer();
    if (isString(lngs))
      lngs = [lngs];
    const preloaded = this.options.preload || [];
    const newLngs = lngs.filter((lng) => preloaded.indexOf(lng) < 0 && this.services.languageUtils.isSupportedCode(lng));
    if (!newLngs.length) {
      if (callback)
        callback();
      return Promise.resolve();
    }
    this.options.preload = preloaded.concat(newLngs);
    this.loadResources((err) => {
      deferred.resolve();
      if (callback)
        callback(err);
    });
    return deferred;
  }
  dir(lng) {
    if (!lng)
      lng = this.resolvedLanguage || (this.languages?.length > 0 ? this.languages[0] : this.language);
    if (!lng)
      return "rtl";
    try {
      const l = new Intl.Locale(lng);
      if (l && l.getTextInfo) {
        const ti = l.getTextInfo();
        if (ti && ti.direction)
          return ti.direction;
      }
    } catch (e2) {
    }
    const rtlLngs = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"];
    const languageUtils = this.services?.languageUtils || new LanguageUtil(get());
    if (lng.toLowerCase().indexOf("-latn") > 1)
      return "ltr";
    return rtlLngs.indexOf(languageUtils.getLanguagePartFromCode(lng)) > -1 || lng.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
  }
  static createInstance(options = {}, callback) {
    return new _I18n(options, callback);
  }
  cloneInstance(options = {}, callback = noop) {
    const forkResourceStore = options.forkResourceStore;
    if (forkResourceStore)
      delete options.forkResourceStore;
    const mergedOptions = {
      ...this.options,
      ...options,
      ...{
        isClone: true
      }
    };
    const clone = new _I18n(mergedOptions);
    if (options.debug !== void 0 || options.prefix !== void 0) {
      clone.logger = clone.logger.clone(options);
    }
    const membersToCopy = ["store", "services", "language"];
    membersToCopy.forEach((m) => {
      clone[m] = this[m];
    });
    clone.services = {
      ...this.services
    };
    clone.services.utils = {
      hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
    };
    if (forkResourceStore) {
      const clonedData = Object.keys(this.store.data).reduce((prev, l) => {
        prev[l] = {
          ...this.store.data[l]
        };
        prev[l] = Object.keys(prev[l]).reduce((acc, n) => {
          acc[n] = {
            ...prev[l][n]
          };
          return acc;
        }, prev[l]);
        return prev;
      }, {});
      clone.store = new ResourceStore(clonedData, mergedOptions);
      clone.services.resourceStore = clone.store;
    }
    clone.translator = new Translator(clone.services, mergedOptions);
    clone.translator.on("*", (event, ...args) => {
      clone.emit(event, ...args);
    });
    clone.init(mergedOptions, callback);
    clone.translator.options = mergedOptions;
    clone.translator.backendConnector.services.utils = {
      hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
    };
    return clone;
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage
    };
  }
};
var instance = I18n.createInstance();
instance.createInstance = I18n.createInstance;
var createInstance = instance.createInstance;
var dir = instance.dir;
var init = instance.init;
var loadResources = instance.loadResources;
var reloadResources = instance.reloadResources;
var use = instance.use;
var changeLanguage = instance.changeLanguage;
var getFixedT = instance.getFixedT;
var t = instance.t;
var exists = instance.exists;
var setDefaultNamespace = instance.setDefaultNamespace;
var hasLoadedNamespace = instance.hasLoadedNamespace;
var loadNamespaces = instance.loadNamespaces;
var loadLanguages = instance.loadLanguages;

// node_modules/react-i18next/dist/es/Trans.js
var import_react3 = __toESM(require_react(), 1);

// node_modules/react-i18next/dist/es/TransWithoutContext.js
var import_react = __toESM(require_react(), 1);

// node_modules/html-parse-stringify/dist/html-parse-stringify.module.js
var import_void_elements = __toESM(require_void_elements());

// node_modules/react-i18next/dist/es/unescape.js
var matchHtmlEntity = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g;
var htmlEntities = {
  "&amp;": "&",
  "&#38;": "&",
  "&lt;": "<",
  "&#60;": "<",
  "&gt;": ">",
  "&#62;": ">",
  "&apos;": "'",
  "&#39;": "'",
  "&quot;": '"',
  "&#34;": '"',
  "&nbsp;": " ",
  "&#160;": " ",
  "&copy;": "\xA9",
  "&#169;": "\xA9",
  "&reg;": "\xAE",
  "&#174;": "\xAE",
  "&hellip;": "\u2026",
  "&#8230;": "\u2026",
  "&#x2F;": "/",
  "&#47;": "/"
};
var unescapeHtmlEntity = (m) => htmlEntities[m];
var unescape = (text) => text.replace(matchHtmlEntity, unescapeHtmlEntity);

// node_modules/react-i18next/dist/es/defaults.js
var defaultOptions = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: true,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: true,
  unescape
};
var setDefaults = (options = {}) => {
  defaultOptions = {
    ...defaultOptions,
    ...options
  };
};

// node_modules/react-i18next/dist/es/i18nInstance.js
var i18nInstance;
var setI18n = (instance2) => {
  i18nInstance = instance2;
};

// node_modules/react-i18next/dist/es/context.js
var import_react2 = __toESM(require_react(), 1);

// node_modules/react-i18next/dist/es/initReactI18next.js
var initReactI18next = {
  type: "3rdParty",
  init(instance2) {
    setDefaults(instance2.options.react);
    setI18n(instance2);
  }
};

// node_modules/react-i18next/dist/es/context.js
var I18nContext = (0, import_react2.createContext)();

// node_modules/react-i18next/dist/es/useTranslation.js
var import_react4 = __toESM(require_react(), 1);

// node_modules/react-i18next/dist/es/withTranslation.js
var import_react5 = __toESM(require_react(), 1);

// node_modules/react-i18next/dist/es/I18nextProvider.js
var import_react6 = __toESM(require_react(), 1);

// node_modules/react-i18next/dist/es/withSSR.js
var import_react8 = __toESM(require_react(), 1);

// node_modules/react-i18next/dist/es/useSSR.js
var import_react7 = __toESM(require_react(), 1);

// src/i18n.js
var resources = {
  en: {
    translation: {
      nav: {
        bookNow: "Book an Appointment Now",
        phone: "+43 676 6300167",
        email: "office@putzelf.com"
      },
      contact: {
        callNow: "Call now"
      },
      common: {
        cancel: "Cancel",
        ok: "OK"
      },
      imprint: {
        title: "Imprint",
        companyNameTitle: "Company name",
        companyNameLine1: "Sebastijan Aleksandar Kerculj",
        companyNameLine2: "PutzELF",
        founderTitle: "Founder and owner",
        founderName: "Sebastijan Aleksandar Kerculj",
        purposeTitle: "Corporate purpose",
        purposeBody: "Exceptional Cleaning Services.",
        vatTitle: "VAT number",
        vatValue: "ATU78448967",
        regNoTitle: "Company registration number",
        regNoValue: "-",
        courtTitle: "Commercial Register Court",
        courtValue: "Vienna Commercial Court, Marxergasse 1a, A-1030 Vienna",
        hqTitle: "Company headquarters",
        hqValue: "Simmeringer Hauptstra\xDFe 24, 1110 Vienna",
        contactTitle: "Contact details",
        phoneLabel: "Phone",
        phoneValue: "+43 (0)676 6300167",
        emailLabel: "Email",
        emailValue: "office@putzelf.com",
        membership: "Member of the Vienna Economic Chamber, Vienna Commercial Service Providers Section"
      },
      hero: {
        title: "Professional Cleaning at Your Fingertips",
        subtitle: "Book reliable and affordable cleaning services in just a few clicks.",
        cta: "Start an Inquiry",
        jobCta: "Looking for a Job?",
        jobModalTitle: "Join the PutzELF team",
        jobModalBody: "Please email us your contact details and application to {{email}}. We\u2019ll get back to you shortly.",
        jobModalEmailCta: "Send email",
        jobModalClose: "Close"
      },
      profile: {
        title: "Choose your favorite worker",
        subtitle: "Review our trusted professionals and pick the cleaner who fits your booking best.",
        choose: "Choose me",
        rating: "{{rating}} rating \xB7 {{reviews}} reviews",
        workers: {
          agnesC: "AGNES C.",
          slavkaS: "SLAVKA S.",
          dobrilaN: "DOBRILA N.",
          kataK: "KATA K.",
          hajkunaD: "HAJKUNA D.",
          haianeM: "HAIANE M.",
          dijanaV: "DIJANA V.",
          milicaV: "MILICA V.",
          amelia: "Amelia K.",
          markus: "Markus L.",
          selin: "Selin A.",
          leon: "Leon M.",
          maria: "Maria S.",
          yusuf: "Yusuf T.",
          sofia: "Sofia P.",
          jakob: "Jakob R.",
          noemi: "Noemi F.",
          anna: "Anna D."
        }
      },
      services: {
        standard: { title: "Standard Cleaning", desc: "Quick and efficient regular cleaning." },
        deep: { title: "Deep Cleaning", desc: "Detailed cleaning for every corner." },
        office: { title: "Office Cleaning", desc: "Professional cleaning for your office spaces." },
        reliable: "Reliable",
        reliableLine: "Our cleaners are vetted and trusted by hundreds of customers.",
        pricing: "Transparent Pricing",
        easy: "Easy Booking",
        priceLine: "Just \u20AC36/hour, no hidden costs.",
        easyLine: "Book online in less than 2 minutes and relax.",
        homeTitle: "Home Cleaning",
        homeDesc: "Fresh, spotless, and welcoming. Our team ensures your home is cleaned with care and precision so you can relax and enjoy your space.",
        homeCta: "Book Home Cleaning",
        officeTitle: "Office Cleaning",
        officeDesc: "A spotless office means a productive day for your team. We keep your workspaces clean, hygienic, and professional.",
        officeCta: "Book Office Cleaning",
        // New structured services translations (private + business)
        private: {
          maintenance: {
            title: "Maintenance Cleaning",
            description: "Regular cleaning for private households, tailored to your schedule.",
            features: ["Regular room cleaning", "Kitchen and bathroom cleaning", "Flexible time slots"],
            painTitle: "Wann eine Unterhaltsreinigung Sinn macht",
            painPoints: ["Vermehrter Schmutz zwischen Reinigungen", "Zeitmangel im Alltag", "Hygiene in K\xFCche und Bad"],
            solutionTitle: "Unsere L\xF6sung f\xFCr Privathaushalte",
            solutionPoints: ["Regelm\xE4\xDFige, planbare Eins\xE4tze", "Konkrete Checklisten pro Raum", "Flexible Terminfenster morgens oder abends"],
            processTitle: "So funktioniert es",
            process: [
              { title: "Start an Inquiry", desc: "You send your requirements via the form." },
              { title: "Discuss requirements", desc: "We clarify scope, frequency and access." },
              { title: "Cleaning starts", desc: "The team attends the scheduled slot and cleans according to the checklist." }
            ],
            faqTitle: "H\xE4ufige Fragen",
            faqs: [
              { q: "Wie oft sollte eine Unterhaltsreinigung stattfinden?", a: "Das h\xE4ngt von Ihrer Nutzung ab \u2013 f\xFCr Privathaushalte empfehlen wir 1\xD7 bis 4\xD7 pro Monat." },
              { q: "K\xF6nnen wir bestimmte Bereiche priorisieren?", a: "Ja. Bei der Anfrage geben Sie bitte an, welche R\xE4ume oder Aufgaben wichtig sind." },
              { q: "Wer bringt Reinigungsmittel mit?", a: "Auf Wunsch bringt unser Team Reinigungsmittel mit; teilen Sie dies bitte bei der Anfrage mit." },
              { q: "Kann die Reinigung anonym gebucht werden?", a: "Ja, wir erm\xF6glichen flexible Zugangsl\xF6sungen und Diskretion nach Absprache." }
            ],
            metaTitle: "Unterhaltsreinigung Wien | Regelm\xE4\xDFige Haushaltsreinigung \u2013 PutzELF",
            metaDescription: "Unterhaltsreinigung in Wien: regelm\xE4\xDFige Haushaltsreinigung nach Ihrem Zeitplan. Flexible Termine, klare Checklisten und faire Preise."
          },
          deep: {
            title: "Deep Cleaning",
            description: "Thorough cleaning for hard-to-reach areas and stubborn dirt.",
            features: ["Deep floor and surface cleaning", "Descaling and sanitary care", "Intensive kitchen cleaning"],
            painTitle: "When deep cleaning is needed",
            painPoints: ["Post-renovation dust", "Long-term dirt build-up", "Allergens and stubborn stains"],
            solutionTitle: "Our deep cleaning approach",
            solutionPoints: ["Room-by-room intensive cleaning", "Sanitary descaling", "Carpet and upholstery treatments"],
            processTitle: "How it works",
            process: [
              { title: "Request an Inquiry", desc: "Tell us the areas to focus on and any constraints." },
              { title: "Assessment", desc: "We advise on time and scope; photos or on-site check help." },
              { title: "Deep Cleaning", desc: "Our team performs a comprehensive deep clean with specialised tools." }
            ],
            faqTitle: "FAQs",
            faqs: [
              { q: "Is deep cleaning suitable after renovation?", a: "Yes \u2014 we remove dust and prepare surfaces for finishing work." },
              { q: "Do you move furniture?", a: "We can move light furniture; heavy items are handled on request." },
              { q: "Are special detergents used for kitchens?", a: "We use professional degreasers suited to kitchen surfaces." },
              { q: "Can I book a one-off deep clean?", a: "Yes \u2014 deep cleaning is available as a one-time service." }
            ],
            metaTitle: "Grundreinigung Wien | Tiefenreinigung & Sanierung \u2013 PutzELF",
            metaDescription: "Grundreinigung in Wien f\xFCr hartn\xE4ckigen Schmutz, Renovationsr\xFCckst\xE4nde und Allergien. Individuelle Angebote nach Besichtigung."
          },
          residential: {
            title: "Residential Cleaning",
            description: "Careful cleaning for apartments and family homes.",
            features: ["Dusting and vacuuming", "Surface care", "Window cleaning (optional)"],
            painTitle: "When residential cleaning helps",
            painPoints: ["Busy households", "Special occasions or move-ins", "Maintaining hygiene with children or pets"],
            solutionTitle: "How we help at home",
            solutionPoints: ["Tailored checklists", "Trusted, vetted teams", "Optional extras like windows"],
            processTitle: "Process",
            process: [
              { title: "Anfrage starten", desc: "Senden Sie Ihre W\xFCnsche \xFCber das Formular." },
              { title: "Termin & Umfang", desc: "Wir best\xE4tigen Zeit und Umfang sowie besondere W\xFCnsche." },
              { title: "Reinigung vor Ort", desc: "Das Team f\xFChrt die vereinbarten Aufgaben zuverl\xE4ssig aus." }
            ],
            faqTitle: "Fragen & Antworten",
            faqs: [
              { q: "Sind Haustiere ein Problem?", a: "Unsere Teams sind erfahren im Umgang mit Haustieren; teilen Sie Besonderheiten bitte vorher mit." },
              { q: "K\xF6nnen Reinigungsmittel gewechselt werden?", a: "Ja, geben Sie bitte an, wenn Sie eigene Produkte w\xFCnschen." },
              { q: "Wie kurzfristig kann ich buchen?", a: "Kurzfristige Termine sind m\xF6glich, abh\xE4ngig von Verf\xFCgbarkeit." },
              { q: "Gibt es ein Mindeststundenkontingent?", a: "Die Mindestbuchung betr\xE4gt 2 Stunden." }
            ],
            metaTitle: "Wohnungsreinigung Wien | Zuverl\xE4ssige Wohnungsreinigung \u2013 PutzELF",
            metaDescription: "Wohnungsreinigung in Wien: gr\xFCndlich, zuverl\xE4ssig und termintreu. Ideal f\xFCr regelm\xE4\xDFige Reinigungen oder einmalige Eins\xE4tze."
          },
          construction: {
            title: "Post-construction / Rough Cleaning",
            description: "Cleaning after construction or renovation work, removing debris and fine dust.",
            features: ["Debris and dust removal", "Fine cleaning after rough cleaning", "Safe disposal"],
            painTitle: "Why post-construction cleaning matters",
            painPoints: ["Construction dust and debris", "Safety concerns", "Preparation for handover or repainting"],
            solutionTitle: "Our post-construction service",
            solutionPoints: ["Rough debris removal", "Fine dust cleaning and surface prep", "Safe disposal of materials"],
            processTitle: "Typical steps",
            process: [
              { title: "Request", desc: "Send details and photos from site for an accurate quote." },
              { title: "Plan", desc: "We propose a staged cleaning plan and timing." },
              { title: "Execute", desc: "Team performs rough and fine cleaning until handover quality." }
            ],
            faqTitle: "Construction cleaning FAQs",
            faqs: [
              { q: "K\xF6nnen Sie Bauschutt entfernen?", a: "Wir entfernen leichten Bauschutt; f\xFCr gr\xF6\xDFere Entsorgung organisieren wir Partner." },
              { q: "Brauche ich einen Baustellenzugang?", a: "Bitte geben Sie Zugangsbedingungen und Arbeitszeiten an." },
              { q: "Gibt es Schutzmassnahmen?", a: "Wir nutzen Staubschutzelemente und schonende Verfahren zur Oberfl\xE4chepflege." },
              { q: "Wie erfolgt die Abrechnung?", a: "Nach Aufwand; f\xFCr gr\xF6ssere Objekte erstellen wir pauschale Angebote." }
            ],
            metaTitle: "Bauendreinigung Wien | Grobreinigung & Feinreinigung \u2013 PutzELF",
            metaDescription: "Bauendreinigung in Wien: sichere und gr\xFCndliche Reinigung nach Bau- oder Renovierungsarbeiten. Angebote nach Besichtigung oder Fotoanalyse."
          },
          window: {
            title: "Window & Frame Cleaning",
            description: "Cleaning of windows and frames for streak-free results.",
            features: ["Interior & exterior windows", "Frame and groove cleaning", "Optional prep for repainting frames"],
            painTitle: "Warum professionelle Fensterreinigung sinnvoll ist",
            painPoints: ["Streifen und Kalkr\xFCckst\xE4nde", "Schwierige Erreichbarkeit von Aussenfl\xE4chen", "Rahmen- und Falzverschmutzung"],
            solutionTitle: "Unsere Fensterreinigung",
            solutionPoints: ["Innen- und Au\xDFenreinigung", "Rahmen- und Falzpflege", "Optionale Politur und Vorbereitung f\xFCr Anstrich"],
            processTitle: "Ablauf",
            process: [
              { title: "Anfrage", desc: "Beschreiben Sie Fensteranzahl und Etage (Fotos helfen)." },
              { title: "Terminbest\xE4tigung", desc: "Wir schlagen einen Termin mit geeignetem Equipment vor." },
              { title: "Durchf\xFChrung", desc: "Fenster werden streifenfrei gereinigt, Rahmen und Falze werden gepflegt." }
            ],
            faqTitle: "FAQ Fensterreinigung",
            faqs: [
              { q: "Reinigen Sie auch Au\xDFenfenster in h\xF6heren Lagen?", a: "Ja, wir nutzen bei Bedarf Hebeb\xFChnen oder Sicherungsausr\xFCstung." },
              { q: "Wie viele Fenster sind im Preis enthalten?", a: "Die Kalkulation erfolgt pro Fenster; pauschale Angebote auf Anfrage." },
              { q: "Bieten Sie Fensterrahmenreinigung an?", a: "Ja, Rahmen- und Falzreinigung ist Teil des Services." },
              { q: "Welche Produkte verwenden Sie?", a: "Professionelle, umweltvertr\xE4gliche Reinigungsmittel; auf Wunsch auch \xF6kologische Optionen." }
            ],
            metaTitle: "Glasreinigung Wien | Fenster & Rahmen \u2013 PutzELF",
            metaDescription: "Glas- und Rahmenreinigung in Wien: streifenfreie Fenster, fachgerechte Rahmepflege und Hebeb\xFChneneinsatz bei Bedarf."
          },
          industrial: {
            title: "Industrial Cleaning & Machinery",
            description: "Specialized cleaning for machinery and industrial areas (no maintenance).",
            features: ["Machine surface cleaning", "Safe cleaning procedures", "Removal of production residues"],
            painTitle: "Industrial cleaning challenges",
            painPoints: ["Oil and production residues", "Safety and contamination risks", "Downtime concerns"],
            solutionTitle: "Our industrial approach",
            solutionPoints: ["Planned cleaning windows to reduce downtime", "Safety-oriented procedures", "Appropriate waste handling"],
            processTitle: "Process",
            process: [
              { title: "Inquiry & assessment", desc: "Provide details on machinery and access restrictions." },
              { title: "Schedule & safety", desc: "We plan work slots and agree on safety protocols." },
              { title: "Execution", desc: "Trained teams perform cleaning with documented handover." }
            ],
            faqTitle: "Industrial FAQs",
            faqs: [
              { q: "Arbeiten Sie in Produktionspausen?", a: "Ja. Wir koordinieren Reinigungsfenster, um Produktionsausf\xE4lle zu minimieren." },
              { q: "K\xF6nnen Sie mit Gefahrstoffen umgehen?", a: "Wir kl\xE4ren vorab Einsatzmittel; gef\xE4hrliche Stoffe erfordern spezielle Verfahren." },
              { q: "Gibt es Dokumentation?", a: "Wir dokumentieren Reinigungsschritte und geben \xDCbergabeprotokolle bei Bedarf." },
              { q: "Bieten Sie regelm\xE4\xDFige Reinigungspl\xE4ne an?", a: "Ja, abgestimmt auf Produktionszyklus und Sicherheitsanforderungen." }
            ],
            metaTitle: "Industriereinigung Wien | Maschinenreinigung \u2013 PutzELF",
            metaDescription: "Industriereinigung in Wien: sichere Reinigung von Maschinen und Produktionsbereichen mit klarem Fokus auf Betriebssicherheit und Dokumentation."
          }
        },
        business: {
          maintenance: {
            title: "Maintenance Cleaning",
            description: "Regular cleaning plans for businesses and offices.",
            features: ["Workstation cleaning", "Sanitary and kitchen care", "Flexible scheduling"],
            painTitle: "Why maintenance cleaning matters for businesses",
            painPoints: ["Visible dirt in customer areas", "Infection risks on high-touch surfaces", "Unprofessional appearance for visitors"],
            solutionTitle: "Our business cleaning solution",
            solutionPoints: ["Discreet, scheduled visits outside business hours", "Area-specific checklists", "Documented handovers and quality checks"],
            processTitle: "How we work",
            process: [
              { title: "Inquiry", desc: "Tell us about your premises, hours and requirements." },
              { title: "Custom proposal", desc: "We draft a cleaning plan fitted to your operation." },
              { title: "Regular service", desc: "Cleaning is carried out according to agreed rhythm and checklist." }
            ],
            faqTitle: "Business FAQs",
            faqs: [
              { q: "Can cleaning happen outside business hours?", a: "Yes \u2014 we schedule early morning or late evening slots to avoid disruption." },
              { q: "Do you offer service contracts?", a: "Yes, recurring contracts with clear scopes and pricing are available." },
              { q: "Can you clean confidential areas?", a: "Our teams are trained to respect confidentiality and access restrictions." },
              { q: "How is quality ensured?", a: "Checklists, spot checks and documented handovers maintain standards." }
            ],
            metaTitle: "Unterhaltsreinigung Wien | Gewerbliche Reinigung \u2013 PutzELF",
            metaDescription: "Maintenance cleaning for businesses in Vienna: flexible schedules, documented workflows and hygiene standards for offices, practices and commercial spaces."
          },
          deep: {
            title: "Deep Cleaning",
            description: "Comprehensive deep cleaning for commercial spaces.",
            features: ["Intensive floor cleaning", "Carpet and upholstery care", "Contact surface disinfection"],
            painTitle: "When deep cleaning is needed for businesses",
            painPoints: ["High footfall causing heavy soiling", "Pre-inspection or audit preparation", "Persistent stains and residues"],
            solutionTitle: "Our commercial deep cleaning",
            solutionPoints: ["Intensive treatment with industry-grade products", "Carpet and upholstery restoration", "Documented area clearance"],
            processTitle: "Process",
            process: [
              { title: "Assessment", desc: "Photos or walkthrough help estimate time and equipment." },
              { title: "Proposal & scheduling", desc: "We plan interventions that respect your operating hours." },
              { title: "Execution", desc: "Specialist teams deliver targeted deep cleaning efficiently." }
            ],
            faqTitle: "Deep cleaning FAQs",
            faqs: [
              { q: "Can you work after closing hours?", a: "Yes, we schedule to minimize disruption to business operations." },
              { q: "How are sensitive devices protected?", a: "We assess and apply surface protection and handling instructions." },
              { q: "Do you offer disinfection services?", a: "Targeted disinfection of contact points is available on request." },
              { q: "How is billing handled?", a: "By effort for small jobs or flat rates for larger, quoted projects." }
            ],
            metaTitle: "Grundreinigung Wien | Gewerbliche Tiefenreinigung \u2013 PutzELF",
            metaDescription: "Deep cleaning for commercial premises in Vienna: intensive cleaning, disinfection and carpet care for offices, hotels and hospitality venues."
          },
          staircase: {
            title: "Staircase Cleaning",
            description: "Regular upkeep and cleaning of staircases and common areas.",
            features: ["Step cleaning", "Handrail care", "Garbage room and cellar cleaning"],
            painTitle: "Why staircase cleaning matters",
            painPoints: ["Dirt accumulation in shared spaces", "Safety risks from debris", "Poor impression for visitors"],
            solutionTitle: "Our staircase service",
            solutionPoints: ["Regular intervals", "Specialist care for rails and steps", "Waste room service and odour control"],
            processTitle: "Typical steps",
            process: [
              { title: "Request", desc: "Tell us floors, staircases and special requirements." },
              { title: "Plan", desc: "We agree frequency and team size." },
              { title: "Deliver", desc: "Regular cleaning with quality checks and reporting." }
            ],
            faqTitle: "Staircase FAQs",
            faqs: [
              { q: "Can cleaning be several times a week?", a: "Yes, intervals are configurable according to needs and budget." },
              { q: "How is key access managed?", a: "We coordinate access procedures with property managers." },
              { q: "Are extras available?", a: "Window cleaning or glass surfaces can be added as extras." },
              { q: "How is invoicing done?", a: "Monthly or as agreed, with transparent itemisation." }
            ],
            metaTitle: "Treppenhausreinigung Wien | Hausverwaltung & Gewerbe \u2013 PutzELF",
            metaDescription: "Staircase cleaning in Vienna for residential and commercial buildings. Regular maintenance, handrail care and waste room services."
          },
          construction: {
            title: "Post-construction / Rough Cleaning",
            description: "Cleaning after construction work in commercial properties.",
            features: ["Rough cleaning", "Fine cleaning after construction", "Removal of construction materials"],
            painTitle: "When post-construction cleaning is required",
            painPoints: ["Construction dust and residues", "Handover deadlines", "Safety concerns for staff and clients"],
            solutionTitle: "Our post-construction offering",
            solutionPoints: ["Staged rough and fine cleaning", "Preparation for inspections", "Coordination with trades on-site"],
            processTitle: "Workflow",
            process: [
              { title: "Submit photos", desc: "Photos or drawings help us assess scope and equipment needs." },
              { title: "Plan", desc: "We schedule phases and windows that suit your timeline." },
              { title: "Execute", desc: "Rough and fine cleaning carried out to handover standards." }
            ],
            faqTitle: "Construction cleaning FAQs",
            faqs: [
              { q: "Do you remove construction debris?", a: "We handle light debris; for larger disposal we coordinate partners." },
              { q: "Is site access required?", a: "Please provide access and safety requirements when requesting a quote." },
              { q: "Can you perform intermediate cleanings?", a: "Yes, we plan multiple phases aligned with the build schedule." },
              { q: "How long does fine cleaning take?", a: "It depends on condition; we provide estimates after review." }
            ],
            metaTitle: "Bauendreinigung Wien | Gewerbliche Grob- & Feinreinigung \u2013 PutzELF",
            metaDescription: "Post-construction cleaning for commercial properties in Vienna: staged rough and fine cleaning services up to handover quality."
          },
          window: {
            title: "Window & Frame Cleaning",
            description: "Professional window and frame cleaning for facades and interiors.",
            features: ["Facade windows", "Interior and exterior cleaning", "Safety and lift work if required"],
            painTitle: "Why professional window cleaning matters",
            painPoints: ["Visibility and curb appeal", "Safety issues for large surfaces", "Limescale and environmental deposits"],
            solutionTitle: "Our window cleaning service",
            solutionPoints: ["Facade and interior cleaning", "Use of lifts and safety equipment when needed", "Frame and groove care"],
            processTitle: "Process",
            process: [
              { title: "Inquiry", desc: "Specify area, height and access constraints." },
              { title: "Planning", desc: "We propose safe and efficient methods for the job." },
              { title: "Cleaning", desc: "Professional cleaning, including frame care and lift work if required." }
            ],
            faqTitle: "Window cleaning FAQs",
            faqs: [
              { q: "Can you clean large facade windows?", a: "Yes \u2014 we plan lift or scaffolding work as required." },
              { q: "How is pricing calculated?", a: "Pricing depends on area, access and equipment; we provide quotes." },
              { q: "Do you follow safety standards?", a: "Yes, all work adheres to current safety regulations." },
              { q: "Can cleaning occur outside business hours?", a: "Yes \u2014 we coordinate to avoid disruption." }
            ],
            metaTitle: "Glasreinigung Wien | Gewerbliche Fensterreinigung \u2013 PutzELF",
            metaDescription: "Window and frame cleaning for businesses in Vienna: lift work, frame care and safe execution for commercial facades."
          },
          industrial: {
            title: "Industrial Cleaning & Machinery",
            description: "Cleaning in industrial settings aligned with safety requirements.",
            features: ["Machine cleaning", "Production line cleaning", "Safe disposal of residues"],
            painTitle: "Industrial cleaning challenges",
            painPoints: ["Contamination and residues", "Safety compliance", "Production downtime"],
            solutionTitle: "Our industrial approach",
            solutionPoints: ["Planned cleaning windows", "Safety-oriented procedures", "Documented handovers"],
            processTitle: "How we operate",
            process: [
              { title: "Inquiry & assessment", desc: "Provide machinery details and any access constraints." },
              { title: "Planning", desc: "We schedule slots to minimise downtime and agree safety measures." },
              { title: "Execution", desc: "Specialist teams perform cleaning with documented handovers." }
            ],
            faqTitle: "Industrial FAQs",
            faqs: [
              { q: "Can you operate during production breaks?", a: "Yes \u2014 we coordinate to reduce production impact." },
              { q: "Can you handle hazardous materials?", a: "We assess hazardous materials in advance and apply appropriate procedures." },
              { q: "Is documentation provided?", a: "Yes \u2014 we provide cleaning and handover documentation on request." },
              { q: "Do you offer recurring plans?", a: "Yes, tailored to production cycles and safety needs." }
            ],
            metaTitle: "Industriereinigung Wien | Maschinenreinigung \u2013 PutzELF",
            metaDescription: "Industrial cleaning in Vienna: safe machine and production-area cleaning with a focus on operational safety and documentation."
          }
        }
      },
      whatWeOffer: "What we offer",
      benefitsTitle: "Benefits",
      benefit1: "Vetted cleaning professionals",
      benefit2: "Flexible scheduling",
      benefit3: "Transparent pricing",
      cta: "Start an Inquiry",
      alt: {
        logo: "PutzELF Logo",
        homeCleaning: "Home Cleaning",
        officeCleaning: "Office Cleaning"
      },
      footer: {
        staff: {
          title: "Employees",
          links: {
            privacySheet: "Privacy Sheet",
            dutyRoster: "Duty Roster",
            masterData: "Master Data Sheet",
            leaveForm: "Leave / Comp Time"
          }
        },
        partners: {
          title: "Partners",
          links: {
            partnerApplication: "Partner Application",
            serviceContract: "Service Agreement",
            subcontract: "Subcontract"
          }
        },
        customers: {
          title: "Customers",
          links: {
            serviceContract: "Service Contract",
            cleaningStandards: "Cleaning Standards",
            priceList: "Price List",
            calculator: "Price Calculator"
          }
        },
        connect: {
          title: "Connect",
          links: {
            terms: "Terms & Conditions",
            privacy: "Privacy Policy",
            imprint: "Imprint"
          }
        }
      },
      cookies: {
        msg: "We use cookies to improve your experience. We also use Google tracking and may process lead information (contact details) to respond to inquiries. By using our site, you agree to our ",
        privacyPolicy: "Privacy Policy",
        decline: "Decline",
        accept: "Accept"
      },
      home: {
        title: "Book a cleaning",
        locationModal: {
          title: "Where would you like to book the cleaning?",
          prompt: "Select the city for your service",
          vienna: "Vienna",
          graz: "Graz",
          validation: "Please choose a location to continue."
        },
        successTitle: "Booking confirmed",
        successMessage: "Thank you \u2014 your booking is confirmed.",
        bookingId: "Booking ID: {{id}}",
        serviceLocationLabel: "Service location:",
        selectType: "Choose a cleaning type",
        types: {
          standard: "Home cleaning",
          office: "Office cleaning",
          apartmentHotel: "Apartment / Hotel"
        },
        flow: {
          inquiry: "Start an Inquiry",
          calculator: "Price Calculator"
        },
        subcategories: {
          title: "Choose subcategory",
          intensive: "Intensive",
          window: "Windows"
        },
        descriptions: {
          standard: "Regular maintenance clean for homes; surfaces, bathrooms, and floors.",
          office: "Professional office cleaning tailored to workspaces and common areas.",
          apartmentHotel: "Detailed clean for apartments and hotel rooms between stays."
        },
        calendar: {
          loading: "Loading availability\u2026",
          errorFetchDates: "Failed to fetch dates.",
          errorFetchSlots: "Failed to fetch available times."
        },
        durationLabel: "Estimated hours",
        dateLabel: "Date",
        timeLabel: "Time",
        renegotiate: "I understand the service is billed based on the actual time worked",
        durationHelp: "Minimum booking is 2 hours.",
        estimated: "Estimated price",
        rate: "Rate: \u20AC{{rate}}/hour",
        submit: "Submit",
        alerts: {
          missing: "Please fill date, time and select a cleaning type.",
          createError: "Error creating booking: {{msg}}",
          noWorker: "Please choose your cleaner before completing the booking."
        },
        selectedWorker: {
          label: "Your cleaner",
          selected: "{{name}} is ready to help.",
          change: "Choose a different cleaner",
          missing: "You haven't selected a cleaner yet.",
          choose: "Select your cleaner"
        }
      },
      calculator: {
        title: "Price Calculator",
        subtitle: "Estimate the cost of your cleaning based on duration and extras.",
        typeHeading: "Choose a cleaning type",
        subHeading: "Add premium services",
        durationLabel: "Duration (hours)",
        durationHelp: "Bookings start at 2 hours. Use the arrows to adjust.",
        estimatedTotalLabel: "Estimated total",
        estimatedTotal: "Estimated total: \u20AC{{price}}",
        hourlyRate: "Hourly rate: \u20AC{{rate}}/h",
        premiumNotice: "Premium add-ons adjust the hourly rate.",
        renegotiateLabel: "Allow renegotiation if the job needs more time",
        resetBtn: "Reset selection",
        cta: "Start Booking",
        disclaimer: "This is an estimate. Final pricing is confirmed during booking.",
        taxLabel: "Tax (20%)"
      },
      windowModal: {
        title: "How many windows would you like cleaned?"
      },
      order: {
        title: "Order",
        quoteRequestTitle: "Quote request",
        loading: "Loading booking...",
        confirmTitle: "Confirm Your Booking",
        summary: "Booking Summary",
        date: "Date",
        time: "Time",
        cleaningType: "Cleaning Type",
        duration: "Duration",
        durationUnit: "hours",
        price: "Price",
        enterDetails: "Enter your details to confirm",
        placeholders: {
          name: "Full name",
          email: "Email",
          address: "Street name & House No. & Door No.",
          phone: "Phone"
        },
        errors: {
          invalidEmail: "Please enter a valid email address.",
          invalidPhone: "Please enter a valid phone number including country code."
        },
        gdprPrefix: "I agree to the processing of my personal data in accordance with the ",
        gdprLink: "Privacy Policy (GDPR)",
        confirming: "Confirming...",
        confirmBtn: "Confirm Booking",
        confirmedTitle: "Booking confirmed \u2705",
        confirmedMsg: "A confirmation email has been sent to {{email}}.",
        bookingId: "Booking ID: {{id}}",
        errorPrefix: ""
      }
    }
  },
  de: {
    translation: {
      nav: {
        bookNow: "Jetzt Termin buchen",
        phone: "+43 676 6300167",
        email: "office@putzelf.com"
      },
      common: {
        cancel: "Abbrechen",
        ok: "OK"
      },
      imprint: {
        title: "Impressum",
        companyNameTitle: "Firmenname",
        companyNameLine1: "Sebastijan Aleksandar Kerculj",
        companyNameLine2: "PutzELF",
        founderTitle: "Gr\xFCnder und Eigent\xFCmer",
        founderName: "Sebastijan Aleksandar Kerculj",
        purposeTitle: "Unternehmensgegenstand",
        purposeBody: "Au\xDFergew\xF6hnliche Reinigungsdienste.",
        vatTitle: "USt-IdNr.",
        vatValue: "ATU78448967",
        regNoTitle: "Firmenbuchnummer",
        regNoValue: "-",
        courtTitle: "Firmenbuchgericht",
        courtValue: "Handelsgericht Wien, Marxergasse 1a, A-1030 Wien",
        hqTitle: "Firmensitz",
        hqValue: "Simmeringer Hauptstra\xDFe 24, 1110 Wien",
        contactTitle: "Kontaktdaten",
        phoneLabel: "Telefon",
        phoneValue: "+43 (0)676 6300167",
        emailLabel: "E-Mail",
        emailValue: "office@putzelf.com",
        membership: "Mitglied der Wirtschaftskammer Wien, Fachgruppe Gewerbliche Dienstleister"
      },
      profile: {
        title: "Putzfrau in Wien gesucht?",
        subtitle: "\xDCberpr\xFCfen Sie unsere vertrauensw\xFCrdigen Fachkr\xE4fte und w\xE4hlen Sie die Reinigungskraft, die am besten zu Ihrer Buchung passt.",
        choose: "W\xE4hlen Sie mich",
        rating: "{{rating}} Bewertung \xB7 {{reviews}} Bewertungen",
        workers: {
          agnesC: "AGNES C.",
          slavkaS: "SLAVKA S.",
          dobrilaN: "DOBRILA N.",
          kataK: "KATA K.",
          hajkunaD: "HAJKUNA D.",
          haianeM: "HAIANE M.",
          dijanaV: "DIJANA V.",
          milicaV: "MILICA V.",
          amelia: "Amelia K.",
          markus: "Markus L.",
          selin: "Selin A.",
          leon: "Leon M.",
          maria: "Maria S.",
          yusuf: "Yusuf T.",
          sofia: "Sofia P.",
          jakob: "Jakob R.",
          noemi: "Noemi F.",
          anna: "Anna D."
        }
      },
      hero: {
        title: "Reinigung in Wien \u2013 schnell & extra sauber",
        subtitle: "Buchen Sie Ihre Reinigungskraft in Wien in wenigen Klicks: Haushaltsreinigung, Grundreinigung, Fensterreinigung oder B\xFCroreinigung.",
        cta: "Anfrage starten",
        jobCta: "Job gesucht?",
        jobModalTitle: "Werden Sie Teil des PutzELF-Teams",
        jobModalBody: "Senden Sie uns Ihre Kontaktdaten und Bewerbung an {{email}} \u2013 wir melden uns schnell zur\xFCck.",
        jobModalEmailCta: "E-Mail senden",
        jobModalClose: "Schlie\xDFen"
      },
      contact: {
        callNow: "Rufen Sie uns an"
      },
      services: {
        standard: { title: "Standardreinigung", desc: "Schnelle und effiziente Regelreinigung." },
        deep: { title: "Grundreinigung", desc: "Gr\xFCndliche Reinigung bis in jede Ecke." },
        office: { title: "B\xFCroreinigung", desc: "Professionelle Reinigung f\xFCr Ihre B\xFCror\xE4ume." },
        reliable: "Zuverl\xE4ssig",
        reliableLine: "Unsere Reinigungskr\xE4fte sind gepr\xFCft und von Hunderten Kund:innen vertrauensw\xFCrdig.",
        pricing: "Transparente Preise",
        easy: "Einfache Buchung",
        priceLine: "Nur \u20AC36/Stunde, keine versteckten Kosten.",
        easyLine: "Online buchen in weniger als 2 Minuten und entspannen.",
        homeTitle: "Haushaltsreinigung",
        homeDesc: "Frisch, makellos und einladend. Unser Team reinigt Ihr Zuhause sorgf\xE4ltig und pr\xE4zise, damit Sie sich wohlf\xFChlen.",
        homeCta: "Buchung starten",
        officeTitle: "B\xFCroreinigung",
        officeDesc: "Ein sauberes B\xFCro bedeutet einen produktiven Tag. Wir halten Ihre Arbeitsr\xE4ume sauber, hygienisch und professionell.",
        officeCta: "Buchung starten"
      },
      // Neue strukturierte Services (privat + gewerblich)
      private: {
        maintenance: {
          title: "Unterhaltsreinigung",
          description: "Regelm\xE4\xDFige Reinigung f\xFCr Privathaushalte, abgestimmt auf Ihre Abl\xE4ufe.",
          features: ["Regelm\xE4\xDFige Raumreinigung", "Reinigung von K\xFCche und Bad", "Flexible Zeitfenster"],
          painTitle: "Wann eine Unterhaltsreinigung sinnvoll ist",
          painPoints: ["Zeitmangel im Alltag", "Sichtbarer Schmutz zwischen Reinigungen", "Hygiene in K\xFCche und Bad"],
          solutionTitle: "Unsere L\xF6sung f\xFCr Privathaushalte",
          solutionPoints: ["Regelm\xE4\xDFige, planbare Eins\xE4tze", "Detaillierte Checklisten pro Raum", "Flexible Terminfenster \u2013 morgens oder abends"],
          processTitle: "So funktioniert es",
          process: [
            { title: "Anfrage starten", desc: "Sie senden Ihre Anforderungen \xFCber das Buchungsformular." },
            { title: "Bedarf besprechen", desc: "Wir kl\xE4ren Umfang, H\xE4ufigkeit und besondere W\xFCnsche." },
            { title: "Reinigung starten", desc: "Das Team reinigt zum vereinbarten Termin nach Checkliste." }
          ],
          faqTitle: "H\xE4ufige Fragen",
          faqs: [
            { q: "Wie oft sollte eine Unterhaltsreinigung stattfinden?", a: "Je nach Nutzung empfehlen wir 1\xD7 bis 4\xD7 pro Monat; wir beraten Sie gern." },
            { q: "K\xF6nnen bestimmte Bereiche priorisiert werden?", a: "Ja. Geben Sie bei der Anfrage an, welche R\xE4ume besonders wichtig sind." },
            { q: "Wer bringt die Reinigungsmittel mit?", a: "Auf Wunsch bringt unser Team geeignete Mittel mit; eigene Produkte sind m\xF6glich." },
            { q: "Gibt es eine Mindestbuchungsdauer?", a: "Die Mindestbuchung betr\xE4gt 2 Stunden." }
          ],
          metaTitle: "Unterhaltsreinigung Wien | Regelm\xE4\xDFige Haushaltsreinigung \u2013 PutzELF",
          metaDescription: "Unterhaltsreinigung in Wien: regelm\xE4\xDFige Haushaltsreinigung nach Ihrem Zeitplan. Flexible Termine, klare Checklisten und faire Preise."
        },
        deep: {
          title: "Grundreinigung",
          description: "Tiefgehende Reinigung f\xFCr schwer zug\xE4ngliche Bereiche und hartn\xE4ckige Verschmutzungen.",
          features: ["Grundreinigung von B\xF6den und Oberfl\xE4chen", "Entkalkung und Sanit\xE4rpflege", "Intensive K\xFCchenreinigung"],
          painTitle: "Wann eine Grundreinigung n\xF6tig ist",
          painPoints: ["Starke Verschmutzungen", "Renovationsr\xFCckst\xE4nde", "Allergien und hartn\xE4ckige Flecken"],
          solutionTitle: "Unsere Vorgehensweise bei Grundreinigung",
          solutionPoints: ["Raum-f\xFCr-Raum Intensivreinigung", "Entkalkung und Sanit\xE4rpflege", "Teppich- und Polsterbehandlung"],
          processTitle: "Ablauf",
          process: [
            { title: "Anfrage", desc: "Beschreiben Sie die betroffenen Bereiche; Fotos helfen bei der Einsch\xE4tzung." },
            { title: "Einsch\xE4tzung", desc: "Wir geben Zeit- und Leistungsaufwand an; ggf. Vor-Ort-Termin m\xF6glich." },
            { title: "Durchf\xFChrung", desc: "Unser Team f\xFChrt die gr\xFCndliche Reinigung mit geeignetem Equipment aus." }
          ],
          faqTitle: "Fragen zur Grundreinigung",
          faqs: [
            { q: "Ist eine Grundreinigung nach Renovierung sinnvoll?", a: "Ja, wir entfernen Feinstaub und bereiten Oberfl\xE4chen f\xFCr weitere Arbeiten vor." },
            { q: "Wer bewegt M\xF6bel?", a: "Leichtere M\xF6bel k\xF6nnen wir bei Bedarf verr\xFCcken; schwere Objekte nur nach Absprache." },
            { q: "Werden spezielle Reinigungsmittel eingesetzt?", a: "Wir verwenden professionelle Mittel, abgestimmt auf Oberfl\xE4che und Bedarf." },
            { q: "Kann ich eine einmalige Grundreinigung buchen?", a: "Ja, Grundreinigung ist als Einzeltermin m\xF6glich." }
          ],
          metaTitle: "Grundreinigung Wien | Tiefenreinigung & Sanierung \u2013 PutzELF",
          metaDescription: "Grundreinigung in Wien f\xFCr hartn\xE4ckigen Schmutz, Renovationsr\xFCckst\xE4nde und Allergien. Individuelle Angebote nach Besichtigung."
        },
        residential: {
          title: "Wohnreinigung",
          description: "Sorgf\xE4ltige Reinigung von Wohnungen und Einfamilienh\xE4usern.",
          features: ["Staubwischen und Saugen", "Oberfl\xE4chenpflege", "Fensterreinigung (optional)"],
          painTitle: "Wann Wohnungsreinigung hilft",
          painPoints: ["Enge Zeitplanung im Alltag", "Vor/ Nach Einzug", "Besondere Sauberkeitsanforderungen"],
          solutionTitle: "So unterst\xFCtzen wir Ihr Zuhause",
          solutionPoints: ["Individuelle Checklisten", "Erfahrene und gepr\xFCfte Teams", "Optionale Extras wie Fensterreinigung"],
          processTitle: "Vorgehen",
          process: [
            { title: "Anfrage starten", desc: "Senden Sie Ihre W\xFCnsche \xFCber das Formular." },
            { title: "Termin & Umfang", desc: "Wir best\xE4tigen Zeit, Umfang und besondere W\xFCnsche." },
            { title: "Reinigung vor Ort", desc: "Das Team f\xFChrt die vereinbarten Aufgaben zuverl\xE4ssig aus." }
          ],
          faqTitle: "Fragen zur Wohnreinigung",
          faqs: [
            { q: "Sind Haustiere ein Problem?", a: "Unsere Teams sind erfahren im Umgang mit Haustieren; Besonderheiten bitte vorher mitteilen." },
            { q: "Kann ich eigene Reinigungsmittel angeben?", a: "Ja, geben Sie bitte an, wenn Sie eigene Produkte w\xFCnschen." },
            { q: "Wie kurzfristig sind Termine m\xF6glich?", a: "Kurzfristige Termine sind abh\xE4ngig von Verf\xFCgbarkeit m\xF6glich." },
            { q: "Gibt es eine Mindestbuchung?", a: "Ja, die Mindestbuchung betr\xE4gt 2 Stunden." }
          ],
          metaTitle: "Wohnungsreinigung Wien | Zuverl\xE4ssige Wohnungsreinigung \u2013 PutzELF",
          metaDescription: "Wohnungsreinigung in Wien: gr\xFCndlich, zuverl\xE4ssig und termintreu. Ideal f\xFCr regelm\xE4\xDFige Reinigungen oder einmalige Eins\xE4tze."
        },
        construction: {
          title: "Bauendreinigung / Grobreinigung",
          description: "Reinigung nach Bau- oder Renovierungsarbeiten, Entfernen von Bauschutt und Feinstaub.",
          features: ["Bauschutt- und Feinstaubentfernung", "Feinreinigung nach Grobreinigung", "Sichere Entsorgung"],
          painTitle: "Warum Bauendreinigung wichtig ist",
          painPoints: ["Bauschutt und Feinstaub", "Sicherheitsaspekte", "Vorbereitung f\xFCr \xDCbergabe oder Anstrich"],
          solutionTitle: "Unsere Bauendreinigung",
          solutionPoints: ["Grobreinigung und Schuttentfernung", "Feinreinigung und Oberfl\xE4chenvorbereitung", "Fachgerechte Entsorgung"],
          processTitle: "Ablauf",
          process: [
            { title: "Anfrage", desc: "Senden Sie Details und Fotos, damit wir den Aufwand einsch\xE4tzen k\xF6nnen." },
            { title: "Planung", desc: "Wir erstellen einen Reinigungsplan mit Etappen und Zeiten." },
            { title: "Durchf\xFChrung", desc: "Team f\xFChrt Grob- und Feinreinigung bis zur \xDCbergabequalit\xE4t durch." }
          ],
          faqTitle: "Fragen zur Bauendreinigung",
          faqs: [
            { q: "Entfernen Sie Bauschutt?", a: "Leichten Bauschutt entfernen wir; f\xFCr gr\xF6\xDFere Mengen koordinieren wir Partner." },
            { q: "Brauche ich besondere Zug\xE4nge?", a: "Bitte geben Sie Zugangsbedingungen und Arbeitszeiten bei der Anfrage an." },
            { q: "Wer sch\xFCtzt empfindliche Oberfl\xE4chen?", a: "Wir nutzen Schutzma\xDFnahmen und stellen Oberfl\xE4chenschutz nach Bedarf bereit." },
            { q: "Wie erfolgt die Abrechnung?", a: "Nach Aufwand; f\xFCr gr\xF6\xDFere Objekte erstellen wir gern ein Pauschalangebot." }
          ],
          metaTitle: "Bauendreinigung Wien | Grobreinigung & Feinreinigung \u2013 PutzELF",
          metaDescription: "Bauendreinigung in Wien: sichere und gr\xFCndliche Reinigung nach Bau- oder Renovierungsarbeiten. Angebote nach Besichtigung oder Fotoanalyse."
        },
        window: {
          title: "Glas- & Rahmenreinigung",
          description: "Reinigung von Fenstern und Rahmen f\xFCr ein streifenfreies Ergebnis.",
          features: ["Fenster innen & au\xDFen", "Rahmen- und Falzreinigung", "Optionaler Rahmenanstrich-Vorbereitung"],
          painTitle: "Warum professionelle Fensterreinigung sinnvoll ist",
          painPoints: ["Streifen und Kalkr\xFCckst\xE4nde", "Schwierige Erreichbarkeit von Au\xDFenfl\xE4chen", "Rahmen- und Falzverschmutzung"],
          solutionTitle: "Unsere Fensterreinigung",
          solutionPoints: ["Innen- und Au\xDFenreinigung", "Rahmen- und Falzpflege", "Optionale Politur und Vorbereitung f\xFCr Anstrich"],
          processTitle: "Ablauf",
          process: [
            { title: "Anfrage", desc: "Beschreiben Sie Fensteranzahl und Etage; Fotos sind hilfreich." },
            { title: "Terminbest\xE4tigung", desc: "Wir schlagen einen Termin mit passendem Equipment vor." },
            { title: "Durchf\xFChrung", desc: "Fenster werden streifenfrei gereinigt; Rahmen und Falze werden gepflegt." }
          ],
          faqTitle: "FAQ Fensterreinigung",
          faqs: [
            { q: "Reinigen Sie Au\xDFenfenster in h\xF6heren Lagen?", a: "Ja, wir setzen bei Bedarf Hebeb\xFChnen oder geeignete Sicherung ein." },
            { q: "Wie berechnet sich der Preis?", a: "Die Kalkulation erfolgt je Fenster; pauschale Angebote auf Anfrage." },
            { q: "Ist Rahmenreinigung inklusive?", a: "Ja, Reinigung von Rahmen und F\xE4lzen ist Teil unserer Leistung." },
            { q: "Welche Reinigungsmittel verwenden Sie?", a: "Wir verwenden professionelle und umweltvertr\xE4gliche Mittel; \xF6kologische Optionen m\xF6glich." }
          ],
          metaTitle: "Glasreinigung Wien | Fenster & Rahmen \u2013 PutzELF",
          metaDescription: "Glas- und Rahmenreinigung in Wien: streifenfreie Fenster, fachgerechte Rahmepflege und Hebeb\xFChneneinsatz bei Bedarf."
        },
        industrial: {
          title: "Industriereinigung & Maschinen",
          description: "Spezialisierte Reinigung f\xFCr Maschinen und industrielle Bereiche (keine Wartung).",
          features: ["Maschinenoberfl\xE4chenreinigung", "Sichere Reinigungsverfahren", "Entfernung von Produktionsr\xFCckst\xE4nden"],
          painTitle: "Herausforderungen in der Industriereinigung",
          painPoints: ["\xD6lr\xFCckst\xE4nde und Produktionsr\xFCckst\xE4nde", "Sicherheits- und Kontaminationsrisiken", "Ausfallzeiten"],
          solutionTitle: "Unser industrielles Vorgehen",
          solutionPoints: ["Geplante Reinigungsfenster zur Minimierung von Ausfallzeiten", "Sicherheitsorientierte Verfahren", "Fachgerechte Entsorgung"],
          processTitle: "Ablauf",
          process: [
            { title: "Anfrage & Einsch\xE4tzung", desc: "Teilen Sie uns Maschinenarten und Zugangsbeschr\xE4nkungen mit." },
            { title: "Planung & Sicherheit", desc: "Wir planen Eins\xE4tze und vereinbaren Sicherheitsprotokolle." },
            { title: "Durchf\xFChrung", desc: "Fachteams f\xFChren die Reinigung durch und \xFCbergeben dokumentiert." }
          ],
          faqTitle: "Industriereinigung \u2013 Fragen",
          faqs: [
            { q: "Arbeiten Sie w\xE4hrend Produktionspausen?", a: "Ja, wir koordinieren Reinigungsfenster, um Produktionsausf\xE4lle zu minimieren." },
            { q: "K\xF6nnen Sie mit Gefahrstoffen umgehen?", a: "Gef\xE4hrliche Stoffe erfordern spezielle Verfahren; wir kl\xE4ren das vorab." },
            { q: "Gibt es Dokumentation?", a: "Auf Wunsch erstellen wir \xDCbergabeprotokolle und Reinigungsdokumentationen." },
            { q: "Bieten Sie regelm\xE4\xDFige Pl\xE4ne an?", a: "Ja, abgestimmt auf Produktionszyklen und Sicherheitsanforderungen." }
          ],
          metaTitle: "Industriereinigung Wien | Maschinenreinigung \u2013 PutzELF",
          metaDescription: "Industriereinigung in Wien: sichere Reinigung von Maschinen und Produktionsbereichen mit Fokus auf Betriebssicherheit und Dokumentation."
        }
      },
      business: {
        maintenance: {
          title: "Unterhaltsreinigung (Gewerbe)",
          description: "Regelm\xE4\xDFige Reinigungspl\xE4ne f\xFCr B\xFCros, Praxen und gewerbliche Fl\xE4chen.",
          features: ["Arbeitsplatzreinigung und Hygiene", "Sanit\xE4r- und K\xFCchenpflege", "Flexible, nach Betrieb angepasste Zeitfenster"],
          painTitle: "Warum Unterhaltsreinigung f\xFCr Unternehmen wichtig ist",
          painPoints: ["Sichtbare Verschmutzung im Kunden- oder Mitarbeiterbereich", "Infektionsrisiken durch Kontaktfl\xE4chen", "Unprofessioneller Eindruck bei Kundenbesuch"],
          solutionTitle: "Unsere L\xF6sung f\xFCr Unternehmen",
          solutionPoints: ["Diskrete, planbare Eins\xE4tze au\xDFerhalb der Gesch\xE4ftszeiten", "Checklisten abgestimmt auf Betriebsbereiche", "Dokumentierte \xDCbergabe und Qualit\xE4tskontrolle"],
          processTitle: "So arbeiten wir",
          process: [
            { title: "Anfrage", desc: "Sie senden Angaben zu Fl\xE4che, Betriebszeiten und W\xFCnschen." },
            { title: "Individuelles Angebot", desc: "Wir erstellen einen auf Ihren Betrieb abgestimmten Plan." },
            { title: "Regelm\xE4\xDFiger Einsatz", desc: "Wir f\xFChren die Reinigung gem\xE4\xDF vereinbartem Rhythmus und Checkliste durch." }
          ],
          faqTitle: "H\xE4ufige Fragen (Gewerbe)",
          faqs: [
            { q: "K\xF6nnen Reinigungen ausserhalb der Gesch\xE4ftszeiten stattfinden?", a: "Ja, wir koordinieren Eins\xE4tze fr\xFChmorgens oder abends, um Ihren Betrieb nicht zu st\xF6ren." },
            { q: "Gibt es Servicevertr\xE4ge?", a: "Ja, wir bieten wiederkehrende Servicevertr\xE4ge mit klaren Leistungen und Preisen." },
            { q: "K\xF6nnen Sie vertrauliche Bereiche reinigen?", a: "Unsere Teams sind geschult und halten Betriebsgeheimnisse und Diskretion ein." },
            { q: "Wie wird die Qualit\xE4t sichergestellt?", a: "Durch Checklisten, Stichproben und auf Wunsch \xDCbergabeprotokolle." }
          ],
          metaTitle: "Unterhaltsreinigung Wien | Gewerbliche Reinigung \u2013 PutzELF",
          metaDescription: "Unterhaltsreinigung f\xFCr Unternehmen in Wien: flexible Einsatzzeiten, dokumentierte Abl\xE4ufe und hygienische Standards f\xFCr B\xFCros, Praxen und Betriebe."
        },
        deep: {
          title: "Grundreinigung (Gewerbe)",
          description: "Umfassende Grundreinigung f\xFCr Gesch\xE4ftsr\xE4ume und gewerbliche Fl\xE4chen.",
          features: ["Intensive Bodenreinigung", "Teppich- und Polsterpflege", "Desinfektion von Kontaktfl\xE4chen"],
          painTitle: "Wann eine Grundreinigung im Gewerbe n\xF6tig ist",
          painPoints: ["Anh\xE4ufung von Schmutz durch hohen Publikumsverkehr", "Vor \xDCbergaben oder Hygiene-Audits", "Hartn\xE4ckige Flecken und R\xFCckst\xE4nde"],
          solutionTitle: "Unsere Grundreinigung f\xFCr Unternehmen",
          solutionPoints: ["Intensive Reinigung mit Branchenmitteln", "Teppich- und Polsterbehandlung", "Protokollierte Fl\xE4chenfreigabe"],
          processTitle: "Ablauf",
          process: [
            { title: "Bedarfskl\xE4rung", desc: "Fotos oder Objektbegehung helfen, Zeitbedarf und Mittel zu planen." },
            { title: "Angebot & Termin", desc: "Wir planen Eins\xE4tze, die Ihren Betriebsablauf ber\xFCcksichtigen." },
            { title: "Durchf\xFChrung", desc: "Spezialteams f\xFChren die Grundreinigung effizient und sicher durch." }
          ],
          faqTitle: "Fragen zur Grundreinigung (Gewerbe)",
          faqs: [
            { q: "K\xF6nnen Sie nach Gesch\xE4ftsschluss reinigen?", a: "Ja, wir stimmen Termine so ab, dass Ihr Betrieb nicht gest\xF6rt wird." },
            { q: "Wer haftet f\xFCr empfindliche Ger\xE4te?", a: "Wir besprechen Schutzma\xDFnahmen und dokumentieren die Reinigung." },
            { q: "Sind Desinfektionsma\xDFnahmen m\xF6glich?", a: "Ja, wir bieten gezielte Desinfektionen von Kontaktfl\xE4chen an." },
            { q: "Wie wird abgerechnet?", a: "Je nach Umfang nach Aufwand oder als Pauschale bei gr\xF6\xDFeren Objekten." }
          ],
          metaTitle: "Grundreinigung Wien | Gewerbliche Tiefenreinigung \u2013 PutzELF",
          metaDescription: "Grundreinigung f\xFCr Gesch\xE4ftsr\xE4ume in Wien: intensive Reinigung, Desinfektion und Teppichpflege f\xFCr B\xFCros, Hotels und Gastronomie."
        },
        staircase: {
          title: "Treppenhausreinigung",
          description: "Regelm\xE4\xDFige Pflege und Reinigung von Treppenh\xE4usern und Gemeinschaftsbereichen.",
          features: ["Treppenstufenreinigung", "Gel\xE4nderpflege", "M\xFCllraum- und Kellerreinigung"],
          painTitle: "Warum Treppenhausreinigung wichtig ist",
          painPoints: ["Schmutzablagerungen in Gemeinschaftsfl\xE4chen", "Sicherheitsrisiken durch Verschmutzungen", "Unangenehmer Eindruck f\xFCr Besucher"],
          solutionTitle: "Unser Treppenhaus-Service",
          solutionPoints: ["Regelm\xE4\xDFige Reinigungsintervalle", "Spezielle Pflege f\xFCr Gel\xE4nder und Stufen", "Entsorgung und Geruchskontrolle"],
          processTitle: "Ablauf",
          process: [
            { title: "Angebot anfragen", desc: "Nennen Sie Anzahl Stufen, Stockwerke und Besonderheiten." },
            { title: "Planung", desc: "Wir legen Intervalle und Teamgr\xF6\xDFe fest." },
            { title: "Regelm\xE4\xDFige Reinigung", desc: "Durchf\xFChrung nach vereinbartem Rhythmus mit Qualit\xE4tskontrollen." }
          ],
          faqTitle: "Treppenhaus-FAQ",
          faqs: [
            { q: "Kann die Reinigung mehrmals pro Woche erfolgen?", a: "Ja, wir passen Intervalle an Bedarf und Budget an." },
            { q: "Wer organisiert die Schl\xFCssel\xFCbergabe?", a: "Wir stimmen Zugangsregelungen mit der Hausverwaltung ab." },
            { q: "Gibt es Zusatzleistungen?", a: "Fenster im Treppenhaus oder Glasfl\xE4chen k\xF6nnen optional gereinigt werden." },
            { q: "Wie wird die Rechnung gestellt?", a: "Monatlich oder nach Vereinbarung, mit transparenten Leistungen." }
          ],
          metaTitle: "Treppenhausreinigung Wien | Hausverwaltung & Gewerbe \u2013 PutzELF",
          metaDescription: "Treppenhausreinigung in Wien f\xFCr Wohn- und Gesch\xE4ftsgeb\xE4ude. Regelm\xE4\xDFige Pflege, Gel\xE4nderreinigung und M\xFCllraumservice."
        },
        construction: {
          title: "Bauendreinigung / Grobreinigung (Gewerbe)",
          description: "Reinigung nach Bauarbeiten in gewerblichen Objekten.",
          features: ["Grobreinigung", "Feinreinigung nach Bau", "Entfernung von Baumaterialien"],
          painTitle: "Wann Bauendreinigung n\xF6tig ist",
          painPoints: ["Baustaub und R\xFCckst\xE4nde", "\xDCbergabefristen", "Sicherheitsaspekte f\xFCr Mitarbeiter und Kunden"],
          solutionTitle: "Unsere Bauendreinigung f\xFCr Gewerbe",
          solutionPoints: ["Grob- und Feinreinigung gestaffelt", "Vorbereitung f\xFCr Abnahmen", "Koordination mit Handwerkern"],
          processTitle: "Ablauf",
          process: [
            { title: "Anfrage & Fotos", desc: "Fotos oder Skizzen helfen, Aufwand und Equipment zu planen." },
            { title: "Planung", desc: "Einsatzphasen und Zeitfenster werden mit Ihnen abgestimmt." },
            { title: "Durchf\xFChrung", desc: "Grob- und Feinreinigung bis zur Abnahmequalit\xE4t." }
          ],
          faqTitle: "Bauendreinigung \u2013 Fragen",
          faqs: [
            { q: "F\xFChren Sie auch Entsorgung durch?", a: "F\xFCr Bauschutt organisieren wir Entsorgungspartner; leichte Materialreste entfernen wir." },
            { q: "Brauche ich einen Baustellenzugang?", a: "Bitte informieren Sie uns \xFCber Zugangsbedingungen und Sicherheitsregeln." },
            { q: "K\xF6nnen Sie Zwischenreinigungen durchf\xFChren?", a: "Ja, wir stimmen Reinigungsphasen mit dem Bauablauf ab." },
            { q: "Wie lange dauert die Feinreinigung?", a: "Abh\xE4ngig vom Zustand; wir geben nach Sichtung eine realistische Zeitabsch\xE4tzung." }
          ],
          metaTitle: "Bauendreinigung Wien | Gewerbliche Grob- & Feinreinigung \u2013 PutzELF",
          metaDescription: "Bauendreinigung f\xFCr gewerbliche Objekte in Wien: staged Grob- und Feinreinigung bis zur \xDCbergabequalit\xE4t."
        },
        window: {
          title: "Glas- & Rahmenreinigung (Gewerbe)",
          description: "Professionelle Glas- und Rahmenreinigung f\xFCr Gesch\xE4ftsfassaden und Innenbereiche.",
          features: ["Fassadenfenster", "Innen- und Au\xDFenreinigung", "Sicherheits- und Hebeb\xFChnenarbeiten (falls erforderlich)"],
          painTitle: "Warum Glasreinigung im Gewerbe wichtig ist",
          painPoints: ["Sichtbarkeit und Au\xDFenwirkung", "Sicherheitsanforderungen bei gro\xDFen Fl\xE4chen", "Kalk- und Umwelteinfl\xFCsse"],
          solutionTitle: "Unser Glasreinigungsangebot",
          solutionPoints: ["Fassaden- und Innenreinigung", "Einsatz von Hebeb\xFChnen und Sicherheitsausr\xFCstung", "Rahmen- und Falzpflege"],
          processTitle: "Ablauf",
          process: [
            { title: "Anfrage", desc: "Beschreiben Sie Fl\xE4che, Etage und besondere Anforderungen." },
            { title: "Einsatzplanung", desc: "Wir schlagen sichere und effiziente Ma\xDFnahmen vor." },
            { title: "Reinigung", desc: "Fachgerechte Reinigung inklusive Rahmepflege und, falls n\xF6tig, Hebeb\xFChnenarbeiten." }
          ],
          faqTitle: "FAQ Glasreinigung Gewerbe",
          faqs: [
            { q: "K\xF6nnen Sie Fassadenfenster gro\xDFfl\xE4chig reinigen?", a: "Ja, wir planen Hebeb\xFChnen- oder Ger\xFCstarbeiten je nach Anforderung." },
            { q: "Wie erfolgt die Preisgestaltung?", a: "Nach Fl\xE4che, Zugang und ben\xF6tigtem Ger\xE4t; Pauschalen m\xF6glich." },
            { q: "Gibt es Sicherheitszertifikate?", a: "Unsere Teams arbeiten gem\xE4\xDF aktueller Sicherheitsstandards." },
            { q: "Kann die Reinigung ausserhalb der Gesch\xE4ftszeiten stattfinden?", a: "Ja, wir koordinieren Eins\xE4tze, um Ihren Betrieb nicht zu st\xF6ren." }
          ],
          metaTitle: "Glasreinigung Wien | Gewerbliche Fensterreinigung \u2013 PutzELF",
          metaDescription: "Glas- und Rahmenreinigung f\xFCr Gesch\xE4ftsfassaden in Wien: Hebeb\xFChnen-Einsatz, Rah- menpflege und sichere Durchf\xFChrung f\xFCr Unternehmen."
        },
        industrial: {
          title: "Industriereinigung & Maschinen (Gewerbe)",
          description: "Reinigung in industriellen Umgebungen, abgestimmt auf Sicherheitsanforderungen.",
          features: ["Maschinenreinigung", "Produktionslinienreinigung", "Sichere Entsorgung von R\xFCckst\xE4nden"],
          painTitle: "Spezifische Herausforderungen in der Industriereinigung",
          painPoints: ["Kontamination und R\xFCckst\xE4nde", "Sicherheitsanforderungen", "Produktionsunterbrechungen"],
          solutionTitle: "Unser Industriereinigungsansatz",
          solutionPoints: ["Geplante Reinigungsfenster", "Sicherheitsorientierte Verfahren", "Dokumentierte \xDCbergaben"],
          processTitle: "Vorgehen",
          process: [
            { title: "Anfrage & Pr\xFCfung", desc: "Nennen Sie Maschinen und Sicherheitsvorgaben." },
            { title: "Planung", desc: "Wir legen Zeitfenster und Abl\xE4ufe fest, um Ausfallzeiten zu minimieren." },
            { title: "Durchf\xFChrung", desc: "Fachteams reinigen mit dokumentierten Prozessen und \xDCbergabeprotokoll." }
          ],
          faqTitle: "Industriereinigung \u2013 FAQ",
          faqs: [
            { q: "K\xF6nnen Sie Reinigungen w\xE4hrend Produktionspausen durchf\xFChren?", a: "Ja, wir koordinieren Termine, um Produktionsausf\xE4lle gering zu halten." },
            { q: "Arbeiten Sie mit Gefahrstoffen?", a: "Einsatz mit Gefahrstoffen kl\xE4ren wir vorab; spezielle Verfahren sind m\xF6glich." },
            { q: "Gibt es eine Dokumentation der Reinigung?", a: "Ja, wir liefern auf Wunsch Reinigungsprotokolle." },
            { q: "Bieten Sie regelm\xE4\xDFige Reinigungspl\xE4ne an?", a: "Ja, individuell abgestimmt auf Produktionszyklen." }
          ],
          metaTitle: "Industriereinigung Wien | Maschinenreinigung \u2013 PutzELF",
          metaDescription: "Industriereinigung in Wien: sichere Reinigung von Maschinen und Produktionsfl\xE4chen mit Fokus auf Sicherheit und Dokumentation."
        }
      },
      whatWeOffer: "Was wir anbieten",
      benefitsTitle: "Vorteile",
      benefit1: "Gepr\xFCfte Reinigungskr\xE4fte",
      benefit2: "Flexible Terminplanung",
      benefit3: "Transparente Preise",
      cta: "Anfrage starten",
      alt: {
        logo: "PutzELF Logo",
        homeCleaning: "Haushaltsreinigung",
        officeCleaning: "B\xFCroreinigung"
      },
      footer: {
        staff: {
          title: "Mitarbeiter",
          links: {
            privacySheet: "Datenschutzblatt",
            dutyRoster: "Dienstliste",
            masterData: "Stammdatenblatt",
            leaveForm: "Urlaubsschein / Zeitausgleich"
          }
        },
        partners: {
          title: "Partner",
          links: {
            partnerApplication: "Partnerantrag",
            serviceContract: "Dienstleistungsvertrag",
            subcontract: "Subvertrag"
          }
        },
        customers: {
          title: "Kunden",
          links: {
            serviceContract: "Servicevertrag",
            cleaningStandards: "Reinigungsstandards",
            priceList: "Preisliste",
            priceCalculator: "Preiskalkulator"
          }
        },
        connect: {
          title: "Connect",
          links: {
            terms: "AGB",
            privacy: "Datenschutz",
            imprint: "Impressum"
          }
        }
      },
      cookies: {
        msg: "Wir verwenden Cookies, um Ihr Erlebnis zu verbessern. Wir nutzen auch Google-Tracking und k\xF6nnen Lead-Informationen (Kontaktdaten) verarbeiten, um auf Anfragen zu reagieren. Durch die Nutzung unserer Website stimmen Sie unserer ",
        privacyPolicy: "Datenschutzerkl\xE4rung",
        decline: "Ablehnen",
        accept: "Akzeptieren"
      },
      home: {
        title: "Reinigung buchen",
        locationModal: {
          title: "Wo m\xF6chten Sie die Reinigung buchen?",
          prompt: "W\xE4hlen Sie die Stadt f\xFCr Ihre Dienstleistung",
          vienna: "Wien",
          graz: "Graz",
          validation: "Bitte w\xE4hlen Sie einen Ort, um fortzufahren."
        },
        successTitle: "Buchung best\xE4tigt",
        successMessage: "Vielen Dank \u2013 Ihre Buchung wurde best\xE4tigt.",
        bookingId: "Buchungs-ID: {{id}}",
        serviceLocationLabel: "Servicestandort:",
        selectType: "Reinigungsart ausw\xE4hlen",
        contactTitle: "Ihre Kontaktdaten",
        types: {
          standard: "Hausreinigung",
          office: "B\xFCroreinigung",
          apartmentHotel: "Apartment / Hotel"
        },
        subcategories: {
          title: "Unterkategorie w\xE4hlen",
          intensive: "Intensiv",
          window: "Fenster"
        },
        flow: {
          inquiry: "Anfrage starten",
          calculator: "Preiskalkulator",
          calculatorPrompt: "M\xF6chten Sie zuerst einen ungef\xE4hren Preis sehen?",
          inquiryDescription: "F\xFCllen Sie das untenstehende Formular aus und wir melden uns mit einem individuellen Angebot bei Ihnen."
        },
        contact: {
          name: "Vollst\xE4ndiger Name",
          phone: "Telefonnummer",
          email: "E-Mail-Adresse",
          address: "Stra\xDFe,Hausnummer,T\xFCrnummer"
        },
        descriptions: {
          standard: "Regelm\xE4\xDFige Unterhaltsreinigung: Oberfl\xE4chen, B\xE4der, K\xFCche, B\xF6den etc",
          office: "Professionelle B\xFCroreinigung f\xFCr Arbeitspl\xE4tze, K\xFCche, Gemeinschaftsfl\xE4chen etc",
          apartmentHotel: "Gr\xFCndliche Reinigung nach Check-out und der \xF6ffentlichen Bereiche"
        },
        slots: {
          enterAddress: "Geben Sie Ihre Adresse ein, um verf\xFCgbare Tage anzuzeigen.",
          chooseDate: "W\xE4hlen Sie ein Datum, um verf\xFCgbare Zeiten anzuzeigen.",
          loading: "Verf\xFCgbare Zeiten werden geladen\u2026",
          none: "F\xFCr diesen Tag sind keine Zeiten verf\xFCgbar. Bitte w\xE4hlen Sie ein anderes Datum."
        },
        calendar: {
          loading: "Verf\xFCgbarkeit wird geladen\u2026",
          errorFetchDates: "Fehler beim Laden der verf\xFCgbaren Tage.",
          errorFetchSlots: "Fehler beim Laden der verf\xFCgbaren Zeiten."
        },
        durationLabel: "Gesch\xE4tzte Arbeitszeit",
        dateLabel: "Datum",
        timeLabel: "Uhrzeit",
        renegotiate: "Wir nehmen zur Kenntnis, dass die Dienstleistung nach tats\xE4chlicher Arbeitszeit verrechnet wird",
        durationHelp: "Mindestbuchung ist 2 Stunden.",
        estimated: "Gesch\xE4tzter Preis",
        rate: "Preis: \u20AC{{rate}}/Stunde",
        submit: "Jetzt anfragen",
        alerts: {
          missing: "Bitte Datum, Uhrzeit ausf\xFCllen und eine Reinigungsart w\xE4hlen.",
          createError: "Fehler bei der Erstellung der Buchung: {{msg}}",
          noWorker: "Bitte w\xE4hlen Sie Ihre Reinigungskraft, bevor Sie die Buchung abschlie\xDFen."
        },
        selectedWorker: {
          label: "Ihre Reinigungskraft",
          selected: "{{name}} ist bereit zu helfen.",
          change: "W\xE4hlen Sie eine andere Reinigungskraft",
          missing: "Sie haben noch keine Reinigungskraft ausgew\xE4hlt.",
          choose: "Reinigungskraft ausw\xE4hlen"
        }
      },
      calculator: {
        title: "Preisrechner",
        subtitle: "Sch\xE4tzen Sie die Kosten Ihrer Reinigung basierend auf Dauer und Extras.",
        typeHeading: "Reinigungsart w\xE4hlen",
        subHeading: "Optionale Premium-Services",
        durationLabel: "Dauer (Stunden)",
        durationHelp: "Buchungen starten bei 2 Stunden. Verwenden Sie die Pfeile zur Anpassung.",
        estimatedTotalLabel: "Gesch\xE4tzte Gesamtkosten",
        estimatedTotal: "Gesch\xE4tzte Gesamtkosten: {{price}} \u20AC",
        hourlyRate: "Stundensatz: {{rate}} \u20AC/h",
        premiumNotice: "Premium-Extras beeinflussen den Stundensatz.",
        renegotiateLabel: "Nachverhandlung erlauben, falls mehr Zeit n\xF6tig ist",
        resetBtn: "Auswahl zur\xFCcksetzen",
        cta: "Buchung starten",
        disclaimer: "Dies ist eine Sch\xE4tzung. Der finale Preis wird bei der Buchung best\xE4tigt.",
        taxLabel: "Umsatzsteuer (20%)"
      },
      windowModal: {
        title: "Wie viele Fenster m\xF6chten Sie gereinigt haben?"
      },
      order: {
        title: "Buchung",
        quoteRequestTitle: "Anfrage starten",
        loading: "Buchung wird geladen...",
        confirmTitle: "Buchung best\xE4tigen",
        summary: "Buchungs\xFCbersicht",
        date: "Datum",
        time: "Uhrzeit",
        cleaningType: "Reinigungsart",
        duration: "Dauer",
        durationUnit: "Stunden",
        price: "Preis",
        notesLabel: "Anmerkungen",
        enterDetails: "Daten eingeben und best\xE4tigen",
        placeholders: {
          name: "Vollst\xE4ndiger Name",
          email: "E-Mail",
          address: "Stra\xDFe & Hausnummer & T\xFCrnummer",
          phone: "Telefon",
          notes: "Zus\xE4tzliche Anmerkungen oder W\xFCnsche",
          bookingAddress: "Ihre Adresse"
        },
        errors: {
          invalidEmail: "Bitte geben Sie eine g\xFCltige E-Mail-Adresse ein.",
          invalidPhone: "Bitte geben Sie eine g\xFCltige Telefonnummer mit L\xE4ndervorwahl ein.",
          requiredName: "Name ist erforderlich",
          requiredAddress: "Adresse ist erforderlich",
          requiredPhone: "Telefonnummer ist erforderlich",
          requiredEmail: "E-Mail-Adresse ist erforderlich",
          requiredGdpr: "Bitte stimmen Sie der DSGVO-Einwilligung zu"
        },
        gdprPrefix: "Ich stimme der Verarbeitung meiner personenbezogenen Daten gem\xE4\xDF ",
        gdprText: "Ich stimme zu, dass meine Daten f\xFCr die Buchung verarbeitet und ich bez\xFCglich dieser Buchung kontaktiert werde.",
        gdprLink: "Datenschutzerkl\xE4rung (DSGVO)",
        confirming: "Wird best\xE4tigt...",
        confirmBtn: "Buchung anfragen",
        confirmedTitle: "Buchung best\xE4tigt \u2705",
        confirmedMsg: "Eine Best\xE4tigungs-E-Mail wurde an {{email}} gesendet.",
        bookingId: "Buchungs-ID: {{id}}",
        errorPrefix: ""
      }
    }
  }
};
instance.use(initReactI18next).init({
  resources,
  lng: "de",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});
var i18n_default = instance;
export {
  i18n_default as default
};
/*! Bundled license information:

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
