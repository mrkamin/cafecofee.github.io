if (self.CavalryLogger) {
    CavalryLogger.start_js_script(document.currentScript);
} /*FB_PKG_DELIM*/

__d("CometVisualCompletionAttributes", ["CometVisualCompletionConstants"], (function(a, b, c, d, e, f, g) {
    "use strict";
    b = {
        CSS_IMG: (a = {}, a[d("CometVisualCompletionConstants").ATTRIBUTE_NAME] = d("CometVisualCompletionConstants").CSS_IMG, a),
        IGNORE: (b = {}, b[d("CometVisualCompletionConstants").ATTRIBUTE_NAME] = d("CometVisualCompletionConstants").IGNORE, b),
        IGNORE_DYNAMIC: (c = {}, c[d("CometVisualCompletionConstants").ATTRIBUTE_NAME] = d("CometVisualCompletionConstants").IGNORE_DYNAMIC, c),
        IGNORE_LATE_MUTATION: (e = {}, e[d("CometVisualCompletionConstants").ATTRIBUTE_NAME] = d("CometVisualCompletionConstants").IGNORE_LATE_MUTATION, e),
        LOADING_STATE: (f = {}, f[d("CometVisualCompletionConstants").ATTRIBUTE_NAME] = d("CometVisualCompletionConstants").LOADING_STATE, f),
        MEDIA_VC_IMAGE: (a = {}, a[d("CometVisualCompletionConstants").ATTRIBUTE_NAME] = d("CometVisualCompletionConstants").MEDIA_VC_IMAGE, a)
    };
    g["default"] = b
}), 98);
__d("coerceImageishSprited", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        if (!a || typeof a !== "object" || !a.sprited) return null;
        return a.sprited === 1 ? {
            type: "css",
            className: a.spriteMapCssClass + " " + a.spriteCssClass,
            identifier: a.loggingID
        } : {
            type: "cssless",
            style: {
                backgroundImage: "url('" + a.spi + "')",
                backgroundPosition: a.p,
                backgroundSize: a.sz,
                width: a.w + "px",
                height: a.h + "px",
                backgroundRepeat: "no-repeat",
                display: "inline-block"
            },
            identifier: a.loggingID
        }
    }
    f["default"] = a
}), 66);
__d("coerceImageishURL", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        if (a && typeof a === "object" && !a.sprited && typeof a.uri === "string" && a.width !== void 0 && a.height !== void 0) return a;
        else return null
    }
    f["default"] = a
}), 66);
__d("RequestStreamHandler", ["err"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = function() {
        function a(a) {
            var b = a.onData,
                c = a.onTermination,
                d = a.onLog,
                e = a.onFlowStatus;
            a = a.onRetryUpdateRequestBody;
            this.$1 = b || function(a) {};
            this.$2 = c || function(a) {};
            this.$3 = d || function(a) {};
            this.$4 = e;
            this.$5 = a
        }
        var b = a.prototype;
        b.onFlowStatus = function(a) {
            this.$4(a)
        };
        b.onData = function(a) {
            this.$1(a)
        };
        b.onTermination = function(a) {
            this.$2(c("err")(a))
        };
        b.onLog = function(a) {
            this.$3(a)
        };
        b.onRetryUpdateRequestBody = function() {
            if (this.$5 != null) return this.$5()
        };
        return a
    }();
    g["default"] = a
}), 98);
__d("TransportSelectingClient", ["BladeRunnerDeferredClient", "DGWEnvUtil", "RequestStreamHandler", "ThrottlingClient", "TransportSelectingClientCCResolver", "TransportSelectingClientUtils", "cr:1987488", "regeneratorRuntime"], (function(a, b, c, d, e, f, g) {
    a = function() {
        function a() {
            this.$1 = null, b("cr:1987488") != null && (this.$2 = new(c("ThrottlingClient"))(b("cr:1987488")))
        }
        var e = a.prototype;
        e.requestStream = function(a, e, f, g) {
            var h, i, j, k, l, m, n, o;
            return b("regeneratorRuntime").async(function(p) {
                while (1) switch (p.prev = p.next) {
                    case 0:
                        i = new(c("RequestStreamHandler"))(f);
                        j = d("TransportSelectingClientUtils").getMethodContextForCC(a.method, a.topic);
                        k = this.$2;
                        if (!(k != null && c("DGWEnvUtil").isDGWEnvCompatible() && !d("TransportSelectingClientUtils").isBlockedMethod(j))) {
                            p.next = 17;
                            break
                        }
                        p.next = 6;
                        return b("regeneratorRuntime").awrap(c("TransportSelectingClientCCResolver").getCCGroupName(j));
                    case 6:
                        l = p.sent;
                        if (!(d("TransportSelectingClientUtils").isDGWStream(l) || c("DGWEnvUtil").isDGWAsDefault() || d("TransportSelectingClientUtils").isDGWAllowedSKYTopic(l))) {
                            p.next = 17;
                            break
                        }
                        p.next = 10;
                        return b("regeneratorRuntime").awrap(c("TransportSelectingClientCCResolver").getCCDGWUpsampleMultiplier(j));
                    case 10:
                        m = p.sent;
                        p.next = 13;
                        return b("regeneratorRuntime").awrap(k.createStream(a, e, g, i, {
                            upsampleMultiplier: m
                        }));
                    case 13:
                        n = p.sent;
                        p.next = 16;
                        return b("regeneratorRuntime").awrap(n.start());
                    case 16:
                        return p.abrupt("return", n);
                    case 17:
                        p.next = 19;
                        return b("regeneratorRuntime").awrap(c("BladeRunnerDeferredClient").requestStream(a, e, d("TransportSelectingClientUtils").BRHandlerConverter(i, (h = a.method) != null ? h : "unknown"), g));
                    case 19:
                        o = p.sent;
                        return p.abrupt("return", o);
                    case 21:
                    case "end":
                        return p.stop()
                }
            }, null, this)
        };
        return a
    }();
    g["default"] = a
}), 98);
__d("TransportSelectingClientSingleton", ["TransportSelectingClient"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = new(c("TransportSelectingClient"))();
    g["default"] = a
}), 98);
__d("DGWRequestStreamDeferredClient", ["Promise", "nullthrows", "requireDeferred"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = function() {
        function a() {
            this.$1 = null
        }
        var d = a.prototype;
        d.createStream = function(a, b, d, e, f) {
            this.$2();
            return c("nullthrows")(this.$1).then(function(c) {
                return c.createStream(a, b, d, e, f)
            })
        };
        d.$2 = function() {
            this.$1 == null && (this.$1 = new(b("Promise"))(function(a) {
                c("requireDeferred")("DGWRequestStreamClient").__setRef("DGWRequestStreamDeferredClient").onReady(function(b) {
                    a(new b())
                })
            }))
        };
        return a
    }();
    d = new a();
    g["default"] = d
}), 98);
__d("MemoizationInstrumentation", ["invariant"], (function(a, b, c, d, e, f, g, h) {
    "use strict";
    var i = null;

    function a(a) {
        i == null || h(0, 2221), i = a
    }

    function b(a, b) {
        return i ? i.functionCall(a, b) : null
    }
    g.inject = a;
    g.onFunctionCall = b
}), 98);
__d("memoizeWithArgs", ["MemoizationInstrumentation"], (function(a, b, c, d, e, f, g) {
    var h = Object.prototype.hasOwnProperty;

    function a(a, b, c) {
        var e, f = c || a.name || "unknown";
        c = function() {
            e || (e = {});
            var c = d("MemoizationInstrumentation").onFunctionCall("memoizeWithArgs", f),
                g = b.apply(void 0, arguments),
                i = !0;
            h.call(e, g) || (i = !1, e[g] = a.apply(void 0, arguments));
            c && c(i);
            return e[g]
        };
        return c
    }
    g["default"] = a
}), 98);
__d("stableStringify", [], (function(a, b, c, d, e, f) {
    "use strict";

    function g(a) {
        return a !== null && Object.prototype.toString.call(a) === "[object Object]"
    }

    function h(a, b) {
        b === void 0 && (b = !1);
        var c = Array.isArray(a),
            d = g(a);
        if (c || d) {
            var e = Object.keys(a);
            if (e.length) {
                e = e.sort();
                var f = [];
                for (var i = 0; i < e.length; i++) {
                    var j = e[i],
                        k = a[j];
                    if (b && k == null && d) continue;
                    var l;
                    g(k) || Array.isArray(k) ? l = h(k, b) : l = JSON.stringify(k);
                    f.push(j + ":" + l)
                }
                if (c) return "[" + f.join(",") + "]";
                else return "{" + f.join(",") + "}"
            }
        }
        return JSON.stringify(a)
    }
    f["default"] = h
}), 66);
__d("isClickIDBlacklistSVDomainURI", ["ClickIDDomainBlacklistSVConfig"], (function(a, b, c, d, e, f) {
    "use strict";
    var g = ["http", "https"];

    function a(a) {
        return !g.includes(a.getProtocol()) ? !1 : b("ClickIDDomainBlacklistSVConfig").domains.some(function(b) {
            if (a.isSubdomainOfDomain(b)) return !0;
            if (!b.includes(".")) {
                var c = a.getDomain().split(".");
                return c.includes(b)
            }
            return !1
        })
    }
    e.exports = a
}), null);
__d("isExpressWifiDotComURI", [], (function(a, b, c, d, e, f) {
    var g = new RegExp("(^|\\.)expresswifi\\.com$", "i"),
        h = ["https"];

    function a(a) {
        if (a.isEmpty() && a.toString() !== "#") return !1;
        return !a.getDomain() && !a.getProtocol() ? !1 : h.indexOf(a.getProtocol()) !== -1 && g.test(a.getDomain())
    }
    f["default"] = a
}), 66);
__d("isFacebookSVDomainURI", ["FBDomainsSVConfig"], (function(a, b, c, d, e, f) {
    "use strict";
    var g = ["http", "https"];

    function a(a) {
        if (g.indexOf(a.getProtocol()) === -1) return !1;
        a = b("FBDomainsSVConfig").domains.get(a.getDomain());
        return a != null
    }
    e.exports = a
}), null);
__d("isFbDotComURI", [], (function(a, b, c, d, e, f) {
    var g = new RegExp("(^|\\.)fb\\.com?$", "i"),
        h = ["http", "https"];

    function a(a) {
        if (a.isEmpty() && a.toString() !== "#") return !1;
        return !a.getDomain() && !a.getProtocol() ? !1 : h.indexOf(a.getProtocol()) !== -1 && g.test(a.getDomain())
    }
    f["default"] = a
}), 66);
__d("asset", [], (function(a, b, c, d, e, f) {
    function a() {
        for (var a = arguments.length, b = new Array(a), c = 0; c < a; c++) b[c] = arguments[c];
        throw new Error("asset(" + b.join(",") + "): Unexpected asset reference")
    }
    e.exports = a
}), null);
__d("processRelaySRPayload", ["HasteResponse", "ifRequireable"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a(a, b, e, f) {
        var g = a.ddd;
        if (!g) {
            e && e();
            return
        }
        var h = function() {
            return d("HasteResponse").handle(g, {
                source: "relay_3d",
                sourceDetail: b,
                onBlocking: e,
                onLog: f
            })
        };
        c("ifRequireable")("ReactDOMComet", function(a) {
            return a.flushSync(h)
        }, h)
    }
    g["default"] = a
}), 98);
__d("DTSGParser", ["CSRFGuard", "DTSG", "DTSG_ASYNC"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = {
        updateFromAsyncResponse: function(a) {
            if (!d("CSRFGuard").exists(a)) return;
            try {
                a = d("CSRFGuard").clean(a);
                a = JSON.parse(a);
                var b = a.dtsgToken;
                a = a.dtsgAsyncGetToken;
                b && d("DTSG").setToken(b);
                a && d("DTSG_ASYNC").setToken(a)
            } catch (a) {
                return
            }
        }
    };
    b = a;
    g["default"] = b
}), 98);
__d("expectationViolation", ["ErrorNormalizeUtils", "ExecutionEnvironment", "FBLogger", "cr:840411", "emptyFunction", "sprintf"], (function(a, b, c, d, e, f, g) {
    "use strict";
    d = c("emptyFunction");

    function a(a) {
        var b;
        for (var d = arguments.length, e = new Array(d > 1 ? d - 1 : 0), f = 1; f < d; f++) e[f - 1] = arguments[f];
        (b = c("FBLogger")("expectation_violation").blameToPreviousFrame()).warn.apply(b, [a].concat(e))
    }
    a.setHandler = b;

    function b(a) {
        d = a
    }
    g["default"] = a
}), 98);
__d("BladeRunnerAllowList", [], (function(a, b, c, d, e, f) {
    function g(a) {
        return "FBGQLS:" + a.toUpperCase()
    }
    f.getGqlsMethodNameFromUseCase = g;

    function h(a) {
        a = a.split("/");
        return a.length > 2 ? g(a[1]) : null
    }
    f.getGqlsMethodNameFor = h;
    var i = ["gqls/test_actualized_subscribe/"];

    function a(a) {
        if (!a.startsWith("gqls/")) return null;
        for (var b = 0; b < i.length; b++) {
            var c = i[b];
            if (a.startsWith(c)) return null
        }
        return h(a)
    }
    f.getRequestStreamMethodIfSupported = a
}), null);
__d("StreamStateMachineConstants", [], (function(a, b, c, d, e, f) {
    "use strict";
    a = {
        GQLS_STATE_CREATED: "created",
        GQLS_STATE_ACTIVE: "active",
        GQLS_STATE_PAUSED: "paused",
        GQLS_STATE_TERMINATED: "terminated"
    };
    b = {
        GQLS_STATE_TRANSIT_ON_CREATE: "onCreated",
        GQLS_STATE_TRANSIT_ON_ACTIVE: "onActive",
        GQLS_STATE_TRANSIT_ON_PAUSE: "onPause",
        GQLS_STATE_TRANSIT_ON_RESUME: "onResume",
        GQLS_STATE_TRANSIT_ON_TERMINATE: "onTerminate"
    };
    f.states = a;
    f.events = b
}), 66);
__d("GQLSManager", ["BladeRunnerAllowList", "MQTTRequestStreamUtils", "Promise", "RequestStreamCommonRequestStreamCommonTypes", "StreamStateMachineConstants", "TransportSelectingClientSingleton", "promiseDone", "regeneratorRuntime", "requireDeferred"], (function(a, b, c, d, e, f, g) {
    var h = "request_stream",
        i = "mqtt_skywalker",
        j = babelHelpers["extends"]({}, d("StreamStateMachineConstants").events, {
            GQLS_STATE_TRANSIT_ON_REJECT: "onReject"
        });
    a = function() {
        function a() {}
        var e = a.prototype;
        e.subscribeViaRequestStreamWithMobileStyleTopicTransform = function(a, b, e) {
            e === void 0 && (e = {});
            var f = this.$2(d("BladeRunnerAllowList").getGqlsMethodNameFromUseCase(a), null, b, e);
            c("promiseDone")(f);
            return {
                getTopic: function() {
                    var a = new Error("Unimplemented getTopic called for mobile style GQLS");
                    a.stack;
                    throw a
                },
                getContext: function() {
                    var a = new Error("Unimplemented getContext called for mobile style GQLS");
                    a.stack;
                    throw a
                },
                isUnsubscribed: function() {
                    return this.$3
                },
                unsubscribe: function() {
                    this.$3 = !0;
                    return f.then(function(a) {
                        return a.unsubscribe()
                    })
                },
                $3: !1
            }
        };
        e.getSubscriptionType = function(a, b) {
            if (this.$4(a)) return h;
            return b != null && b.headers != null ? h : i
        };
        e.$4 = function(a) {
            return d("BladeRunnerAllowList").getRequestStreamMethodIfSupported(a) != null
        };
        e.$2 = function(a, e, f, g) {
            var h, i, k, l, m, n, o, p;
            return b("regeneratorRuntime").async(function(q) {
                while (1) switch (q.prev = q.next) {
                    case 0:
                        q.next = 2;
                        return b("regeneratorRuntime").awrap(this.$5());
                    case 2:
                        h = q.sent;
                        i = h.patchContext(g.context);
                        k = {};
                        g.headers != null && (k = babelHelpers["extends"]({}, k, g.headers));
                        k = babelHelpers["extends"]({}, k, {
                            method: a
                        });
                        e != null && (k.topic = e);
                        l = function(a) {
                            var b = JSON.parse(a);
                            if (Object.prototype.hasOwnProperty.call(b, "payload") && Object.prototype.hasOwnProperty.call(b, "topic")) {
                                var c = e != null ? e : b.topic;
                                f({
                                    topic: c,
                                    payload: b.payload
                                })
                            } else f(a)
                        };
                        m = function(a) {};
                        n = function(a) {
                            switch (a) {
                                case d("RequestStreamCommonRequestStreamCommonTypes").FlowStatus.Accepted:
                                    g.gqlsLifecycleHandler && g.gqlsLifecycleHandler(j.GQLS_STATE_TRANSIT_ON_CREATE);
                                    break;
                                case d("RequestStreamCommonRequestStreamCommonTypes").FlowStatus.Started:
                                    g.gqlsLifecycleHandler && g.gqlsLifecycleHandler(j.GQLS_STATE_TRANSIT_ON_ACTIVE);
                                    break;
                                case d("RequestStreamCommonRequestStreamCommonTypes").FlowStatus.Stopped:
                                    g.gqlsLifecycleHandler && g.gqlsLifecycleHandler(j.GQLS_STATE_TRANSIT_ON_PAUSE);
                                    break
                            }
                        };
                        o = {
                            onData: l,
                            onTermination: function(a) {
                                var b;
                                a.message === d("MQTTRequestStreamUtils").TERMINATION_REASON_CLOSED && (b = j.GQLS_STATE_TRANSIT_ON_TERMINATE);
                                a.message === d("MQTTRequestStreamUtils").TERMINATION_REASON_REJECTED && (b = j.GQLS_STATE_TRANSIT_ON_REJECT);
                                g.gqlsLifecycleHandler && b != null && g.gqlsLifecycleHandler(b)
                            },
                            onLog: m,
                            onFlowStatus: n
                        };
                        q.next = 14;
                        return b("regeneratorRuntime").awrap(c("TransportSelectingClientSingleton").requestStream(k, JSON.stringify(i), o, g.instrumentationData));
                    case 14:
                        p = q.sent;
                        g.onSubscribe && g.onSubscribe({
                            data: {},
                            error: null
                        });
                        return q.abrupt("return", {
                            unsubscribe: function() {
                                return b("regeneratorRuntime").async(function(a) {
                                    while (1) switch (a.prev = a.next) {
                                        case 0:
                                            g.onUnsubscribeEager && g.onUnsubscribeEager(), p.cancel(), g.onUnsubscribe && g.onUnsubscribe({
                                                data: {},
                                                error: null
                                            });
                                        case 3:
                                        case "end":
                                            return a.stop()
                                    }
                                }, null, this)
                            }
                        });
                    case 17:
                    case "end":
                        return q.stop()
                }
            }, null, this)
        };
        e.$5 = function() {
            var a, d;
            return b("regeneratorRuntime").async(function(e) {
                while (1) switch (e.prev = e.next) {
                    case 0:
                        if (!(this.$1 != null)) {
                            e.next = 2;
                            break
                        }
                        return e.abrupt("return", this.$1);
                    case 2:
                        a = new(b("Promise"))(function(a) {
                            c("requireDeferred")("SkywalkerUtils").__setRef("GQLSManager").onReady(function(b) {
                                a(b)
                            })
                        });
                        e.next = 5;
                        return b("regeneratorRuntime").awrap(a);
                    case 5:
                        d = e.sent;
                        this.$1 = d;
                        return e.abrupt("return", d);
                    case 8:
                    case "end":
                        return e.stop()
                }
            }, null, this)
        };
        return a
    }();
    e = new a();
    g["default"] = e
}), 98);
__d("JSScheduler", ["SchedulerFb-Internals_DO_NOT_USE"], (function(a, b, c, d, e, f) {
    "use strict";
    var g = {
            unstable_Immediate: (c = b("SchedulerFb-Internals_DO_NOT_USE")).unstable_ImmediatePriority,
            unstable_UserBlocking: c.unstable_UserBlockingPriority,
            unstable_Normal: c.unstable_NormalPriority,
            unstable_Low: c.unstable_LowPriority,
            unstable_Idle: c.unstable_IdlePriority
        },
        h = !1,
        i = c.unstable_scheduleCallback,
        j = c.unstable_cancelCallback;
    a.__fbNativeSetTimeout || a.setTimeout;
    a.__fbNativeClearTimeout || a.clearTimeout;
    var k = {
        priorities: g,
        shouldYield: b("SchedulerFb-Internals_DO_NOT_USE").unstable_shouldYield,
        getCurrentPriorityLevel: b("SchedulerFb-Internals_DO_NOT_USE").unstable_getCurrentPriorityLevel,
        runWithPriority: b("SchedulerFb-Internals_DO_NOT_USE").unstable_runWithPriority,
        runWithPriority_DO_NOT_USE: b("SchedulerFb-Internals_DO_NOT_USE").unstable_runWithPriority,
        defer: function(a) {
            var b = k.getCurrentPriorityLevel();
            return i(b, a)
        },
        getCallbackScheduler: function() {
            var a = k.getCurrentPriorityLevel();
            return function(b) {
                return i(a, b)
            }
        },
        getUserBlockingRunAtCurrentPriCallbackScheduler_DO_NOT_USE: function() {
            var a = k.getCurrentPriorityLevel();
            return function(c) {
                return i(g.unstable_UserBlocking, function() {
                    b("SchedulerFb-Internals_DO_NOT_USE").unstable_runWithPriority(a, c)
                })
            }
        },
        deferUserBlockingRunAtCurrentPri_DO_NOT_USE: function(a) {
            var c = k.getCurrentPriorityLevel();
            return i(g.unstable_UserBlocking, function() {
                b("SchedulerFb-Internals_DO_NOT_USE").unstable_runWithPriority(c, a)
            })
        },
        scheduleImmediatePriCallback: function(a) {
            return i(g.unstable_Immediate, a)
        },
        scheduleUserBlockingPriCallback: function(a) {
            return i(g.unstable_UserBlocking, a)
        },
        scheduleNormalPriCallback: function(a) {
            return i(g.unstable_Normal, a)
        },
        scheduleLoggingPriCallback: function(a) {
            return i(g.unstable_Low, a)
        },
        scheduleSpeculativeCallback: function(a) {
            return i(g.unstable_Idle, a)
        },
        cancelCallback: function(a) {
            j(a)
        },
        scheduleDelayedCallback_DO_NOT_USE: function(a, b, c) {
            a = i(a, c, {
                delay: b
            });
            return a
        },
        cancelDelayedCallback_DO_NOT_USE: function(a) {
            a = a;
            return j(a)
        },
        startEventProfiling: function() {
            var a;
            a = (a = b("SchedulerFb-Internals_DO_NOT_USE").unstable_Profiling) == null ? void 0 : a.startLoggingProfilingEvents;
            typeof a == "function" && a()
        },
        stopEventProfiling: function() {
            var a;
            a = (a = b("SchedulerFb-Internals_DO_NOT_USE").unstable_Profiling) == null ? void 0 : a.stopLoggingProfilingEvents;
            return typeof a == "function" ? a() : null
        },
        makeSchedulerGlobalEntry: function(c, d) {
            c === void 0 && (c = null), d === void 0 && (d = !1), c !== null && c !== void 0 && b("SchedulerFb-Internals_DO_NOT_USE").unstable_forceFrameRate(c), d && k.startEventProfiling(), a.ScheduleJSWork = function(a) {
                return function() {
                    for (var b = arguments.length, c = new Array(b), d = 0; d < b; d++) c[d] = arguments[d];
                    h ? a.apply(void 0, c) : k.deferUserBlockingRunAtCurrentPri_DO_NOT_USE(function() {
                        h = !0;
                        try {
                            a.apply(void 0, c)
                        } finally {
                            h = !1
                        }
                    })
                }
            }
        }
    };
    e.exports = k
}), null);
__d("RelayFBGCScheduler", ["JSScheduler"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a(a) {
        d("JSScheduler").scheduleLoggingPriCallback(a)
    }
    g["default"] = a
}), 98);
__d("BizKitNotificationsThinClientConnectionHandler", ["relay-runtime", "unrecoverableViolation", "warning"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = "bizkit_notifications_thin_client",
        i = "id",
        j = function(a) {
            return a == null ? void 0 : (a = a.getLinkedRecord("notif")) == null ? void 0 : a.getValue(i)
        },
        k = "__connection_next_edge_index";

    function a(a, b) {
        var e, f = a.get(b.dataID);
        if (!f) return;
        var g = d("relay-runtime").ConnectionInterface.get(),
            h = g.EDGES,
            i = g.END_CURSOR,
            j = g.HAS_NEXT_PAGE,
            p = g.HAS_PREV_PAGE,
            q = g.PAGE_INFO,
            r = g.PAGE_INFO_TYPE;
        g = g.START_CURSOR;
        var s = f.getLinkedRecord(b.fieldKey),
            t = s && s.getLinkedRecord(q);
        if (!s) {
            f.setValue(null, b.handleKey);
            return
        }
        var u = d("relay-runtime").generateClientID(f.getDataID(), b.handleKey),
            v = f.getLinkedRecord(b.handleKey);
        e = (e = v) != null ? e : a.get(u);
        var w = e && e.getLinkedRecord(q);
        if (!e) {
            var x = a.create(u, s.getType());
            x.setValue(0, k);
            x.copyFieldsFrom(s);
            u = s.getLinkedRecords(h);
            if (u) {
                var y = d("relay-runtime").ConnectionInterface.get(),
                    z = y.NODE;
                u = u.reduce(function(b, c) {
                    if (!c) return b;
                    var d = c.getLinkedRecord(z);
                    d = d == null ? void 0 : d.getType();
                    return d === "NotifPageCachedNotificationRow" ? b : b.concat(l(a, x, c))
                }, []);
                x.setLinkedRecords(u, h)
            }
            f.setLinkedRecord(x, b.handleKey);
            w = a.create(d("relay-runtime").generateClientID(x.getDataID(), q), r);
            w.setValue(!1, j);
            w.setValue(!1, p);
            w.setValue(null, i);
            w.setValue(null, g);
            t && w.copyFieldsFrom(t);
            x.setLinkedRecord(w, q)
        } else {
            v == null && f.setLinkedRecord(e, b.handleKey);
            var A = e;
            y = s.getLinkedRecords(h);
            y && (y = y.map(function(b) {
                return l(a, A, b)
            }));
            u = A.getLinkedRecords(h);
            r = A.getLinkedRecord(q);
            A.copyFieldsFrom(s);
            u && A.setLinkedRecords(u, h);
            r && A.setLinkedRecord(r, q);
            v = [];
            f = b.args;
            if (u && y)
                if (f.after != null)
                    if (w && f.after === w.getValue(i)) {
                        e = new Set();
                        m(u, v, e);
                        m(y, v, e)
                    } else {
                        c("warning")(!1, "Relay: Unexpected after cursor `%s`, edges must be fetched from the end of the list (`%s`).", f.after, w && w.getValue(i));
                        return
                    }
            else if (f.before != null)
                if (w && f.before === w.getValue(g)) {
                    s = new Set();
                    m(y, v, s);
                    m(u, v, s)
                } else {
                    c("warning")(!1, "Relay: Unexpected before cursor `%s`, edges must be fetched from the beginning of the list (`%s`).", f.before, w && w.getValue(g));
                    return
                }
            else {
                r = n(u);
                q = new Set();
                o(y, v, r, q)
            } else y ? v = y : v = u;
            v != null && v !== u && A.setLinkedRecords(v, h);
            if (w && t)
                if (f.after == null && f.before == null) w.copyFieldsFrom(t);
                else if (f.before != null || f.after == null && f.last) {
                w.setValue(!!t.getValue(p), p);
                b = t.getValue(g);
                typeof b === "string" && w.setValue(b, g)
            } else if (f.after != null || f.before == null && f.first) {
                w.setValue(!!t.getValue(j), j);
                e = t.getValue(i);
                typeof e === "string" && w.setValue(e, i)
            }
        }
    }

    function b(a, b, c) {
        b = d("relay-runtime").getRelayHandleKey(h, b, null);
        return a.getLinkedRecord(b, c)
    }

    function l(a, b, e) {
        if (e == null) return e;
        var f = d("relay-runtime").ConnectionInterface.get();
        f = f.EDGES;
        var g = b.getValue(k);
        if (!(typeof g === "number")) throw c("unrecoverableViolation")("CometNotificationsThinClientConnectionHandler: Expected edgeIndex to be a number", "Notifications");
        f = d("relay-runtime").generateClientID(b.getDataID(), f, g);
        a = a.create(f, e.getType());
        a.copyFieldsFrom(e);
        b.setValue(g + 1, k);
        return a
    }

    function m(a, b, c) {
        var e = d("relay-runtime").ConnectionInterface.get();
        e = e.NODE;
        for (var f = 0; f < a.length; f++) {
            var g = a[f];
            if (!g) continue;
            var h = g.getLinkedRecord(e);
            h = h && h.getDataID();
            if (h != null) {
                if (c.has(h)) continue;
                c.add(h)
            }
            b.push(g)
        }
    }

    function n(a) {
        var b = {},
            c = d("relay-runtime").ConnectionInterface.get();
        c = c.NODE;
        for (var e = 0; e < a.length; e++) {
            var f = a[e];
            if (!f) continue;
            f = f.getLinkedRecord(c);
            var g = f && f.getType();
            if (g === "NotifPageNotificationRow") {
                g = j(f);
                typeof g === "string" && (b[g] = f)
            }
        }
        return b
    }

    function o(a, b, c, e) {
        var f = d("relay-runtime").ConnectionInterface.get();
        f = f.NODE;
        for (var g = 0; g < a.length; g++) {
            var h = a[g];
            if (!h) continue;
            var i = h.getLinkedRecord(f),
                k = i && i.getDataID();
            if (k != null) {
                if (e.has(k)) continue;
                e.add(k)
            }
            k = i == null ? void 0 : i.getType();
            var l = j(i);
            if (i && k === "NotifPageCachedNotificationRow") {
                if (typeof l === "string") {
                    k = c[l];
                    k && (k.copyFieldsFrom(i), h.setLinkedRecord(k, f), b.push(h))
                }
            } else b.push(h)
        }
    }
    g.update = a;
    g.getConnection = b;
    g.buildConnectionEdge = l
}), 98);
__d("RelayFBConnectionHandler_UNSTABLE", ["invariant", "relay-runtime/mutations/RelayRecordProxy", "relay-runtime/mutations/RelayRecordSourceProxy", "relay-runtime/mutations/RelayRecordSourceSelectorProxy", "relay-runtime/util/getRelayHandleKey"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = "connection";

    function a(a, c, d, e) {
        e === void 0 && (e = h);
        var f = [],
            i = b("relay-runtime/util/getRelayHandleKey")(e, d, null);
        a instanceof b("relay-runtime/mutations/RelayRecordSourceSelectorProxy") && (a = a.__recordSource);
        c instanceof b("relay-runtime/mutations/RelayRecordProxy") && a instanceof b("relay-runtime/mutations/RelayRecordSourceProxy") || g(0, 14424);
        e = a.__mutator.unstable_getRawRecordWithChanges(c.getDataID());
        if (e == null) return e;
        Object.keys(e).forEach(function(a) {
            if (a !== i && a.indexOf(i + "(") !== 0) return;
            a = c.getLinkedRecord(a);
            a != null && f.push(a)
        });
        return f
    }
    e.exports = {
        unstable_getAllConnectionsWithKey: a
    }
}), null);
__d("UFI2CommentsConnectionHandler", ["ODS", "RelayFBConnectionHandler_UNSTABLE", "gkx", "relay-runtime", "warning"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = "ufi2_comments",
        i = "__connection_next_edge_index",
        j = "ufi2_connection_generation";

    function a(a, b) {
        var e, f = a.get(b.dataID);
        if (!f) return;
        var g = d("relay-runtime").ConnectionInterface.get(),
            h = g.EDGES,
            l = g.END_CURSOR,
            m = g.HAS_NEXT_PAGE,
            n = g.HAS_PREV_PAGE,
            o = g.PAGE_INFO,
            p = g.PAGE_INFO_TYPE;
        g = g.START_CURSOR;
        var q = f.getLinkedRecord(b.fieldKey),
            r = q && q.getLinkedRecord(o);
        if (!q) {
            f.setValue(null, b.handleKey);
            return
        }
        var s = d("relay-runtime").generateClientID(f.getDataID(), b.handleKey),
            t = f.getLinkedRecord(b.handleKey);
        e = (e = t) != null ? e : a.get(s);
        var u = e && e.getLinkedRecord(o);
        if (!e) {
            var v = a.create(s, q.getType());
            v.setValue(0, j);
            v.setValue(0, i);
            v.copyFieldsFrom(q);
            s = q.getLinkedRecords(h);
            s && (s = s.map(function(b) {
                return d("relay-runtime").ConnectionHandler.buildConnectionEdge(a, v, b)
            }), v.setLinkedRecords(s, h));
            f.setLinkedRecord(v, b.handleKey);
            u = a.create(d("relay-runtime").generateClientID(v.getDataID(), o), p);
            u.setValue(!1, m);
            u.setValue(!1, n);
            u.setValue(null, l);
            u.setValue(null, g);
            r && u.copyFieldsFrom(r);
            v.setLinkedRecord(u, o)
        } else {
            t == null && f.setLinkedRecord(e, b.handleKey);
            var w = e;
            s = q.getLinkedRecords(h);
            s && (s = s.map(function(b) {
                return d("relay-runtime").ConnectionHandler.buildConnectionEdge(a, w, b)
            }));
            p = w.getLinkedRecords(h);
            t = w.getLinkedRecord(o);
            w.copyFieldsFrom(q);
            p && w.setLinkedRecords(p, h);
            t && w.setLinkedRecord(t, o);
            f = [];
            e = b.args;
            if (u != null && e.after == null && e.before == null) {
                q = u.getValue(g);
                t = u.getValue(l);
                o = u.getValue(m);
                b = u.getValue(n);
                d("ODS").bumpFraction(2507, "ufi_connection_generation_incremented", c("gkx")("708253") ? "comet" : "blue", 0, 1);
                if (q != null || t != null || o !== !0 && b !== !0) {
                    d("ODS").bumpFraction(2507, "ufi_connection_generation_incremented", c("gkx")("708253") ? "comet" : "blue", 1, 0);
                    t = (q = Number(w.getValue(j))) != null ? q : 0;
                    w.setValue(t + 1, j)
                }
            }
            if (p && s)
                if (e.after != null)
                    if (u && e.after === u.getValue(l)) {
                        o = new Set();
                        k(p, f, o);
                        k(s, f, o)
                    } else {
                        c("warning")(!1, "Relay: Unexpected after cursor `%s`, edges must be fetched from the end of the list (`%s`).", e.after, u && u.getValue(l));
                        return
                    }
            else if (e.before != null)
                if (u && e.before === u.getValue(g)) {
                    b = new Set();
                    k(s, f, b);
                    k(p, f, b)
                } else {
                    c("warning")(!1, "Relay: Unexpected before cursor `%s`, edges must be fetched from the beginning of the list (`%s`).", e.before, u && u.getValue(g));
                    return
                }
            else f = s;
            else s ? f = s : f = p;
            f != null && f !== p && w.setLinkedRecords(f, h);
            if (u && r)
                if (e.after == null && e.before == null) u.copyFieldsFrom(r);
                else if (e.before != null || e.after == null && e.last) {
                u.setValue(!!r.getValue(n), n);
                q = r.getValue(g);
                typeof q === "string" && u.setValue(q, g)
            } else if (e.after != null || e.before == null && e.first) {
                u.setValue(!!r.getValue(m), m);
                t = r.getValue(l);
                typeof t === "string" && u.setValue(t, l)
            }
        }
    }

    function b(a, b, c) {
        b = d("relay-runtime").getRelayHandleKey(h, b, null);
        return a.getLinkedRecord(b, c)
    }

    function e(a, b, c) {
        return d("RelayFBConnectionHandler_UNSTABLE").unstable_getAllConnectionsWithKey(a, b, c, h)
    }

    function k(a, b, c) {
        var e = d("relay-runtime").ConnectionInterface.get();
        e = e.NODE;
        for (var f = 0; f < a.length; f++) {
            var g = a[f];
            if (!g) continue;
            var h = g.getLinkedRecord(e);
            h = h && h.getDataID();
            if (h != null) {
                if (c.has(h)) continue;
                c.add(h)
            }
            b.push(g)
        }
    }
    g.update = a;
    g.getConnection = b;
    g.unstable_getAllConnectionsWithKey = e
}), 98);
__d("RelayFBHandlerProvider", ["BizKitNotificationsThinClientConnectionHandler", "UFI2CommentsConnectionHandler", "relay-runtime"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a(a) {
        switch (a) {
            case "connection":
                return d("relay-runtime").ConnectionHandler;
            case "ufi2_comments":
                return d("UFI2CommentsConnectionHandler");
            case "bizkit_notifications_thin_client":
                return d("BizKitNotificationsThinClientConnectionHandler");
            case "deleteRecord":
                return d("relay-runtime").MutationHandlers.DeleteRecordHandler;
            case "deleteEdge":
                return d("relay-runtime").MutationHandlers.DeleteEdgeHandler;
            case "appendEdge":
                return d("relay-runtime").MutationHandlers.AppendEdgeHandler;
            case "prependEdge":
                return d("relay-runtime").MutationHandlers.PrependEdgeHandler;
            case "appendNode":
                return d("relay-runtime").MutationHandlers.AppendNodeHandler;
            case "prependNode":
                return d("relay-runtime").MutationHandlers.PrependNodeHandler
        }
        throw new Error("RelayFBHandlerProvider: No handler defined for `" + a + "`.")
    }
    g["default"] = a
}), 98);
__d("RelayFBModuleLoader", ["invariant", "replaceTransportMarkers"], (function(a, b, c, d, e, f, g, h) {
    "use strict";
    var i = new Map();

    function a(a) {
        a = k(a);
        return a.getModuleIfRequired()
    }

    function b(a) {
        a = k(a);
        return j(a)
    }

    function d(b) {
        b = k(b);
        var a = b.getModuleIfRequired();
        if (a == null) throw j(b);
        return a
    }

    function j(a) {
        var b = a.getModuleId(),
            c = i.get(b);
        c == null && (c = a.load()["finally"](function() {
            i["delete"](b)
        }), i.set(b, c));
        c.displayName = "3DModule(" + b + ")";
        return c
    }

    function k(a) {
        (a == null || typeof a !== "object") && h(0, 17188, a);
        if (typeof a.getModuleId === "function" && typeof a.getModuleIfRequired === "function" && typeof a.load === "function") return a;
        var b = {
            module: babelHelpers["extends"]({}, a)
        };
        c("replaceTransportMarkers")({
            relativeTo: null
        }, b, "module");
        b = b.module;
        b != null && typeof b === "object" && typeof b.getModuleId === "function" && typeof b.getModuleIfRequired === "function" && typeof b.preload === "function" && typeof b.load === "function" || h(0, 17189, JSON.stringify(a));
        return b
    }
    g.get = a;
    g.load = b;
    g.read = d;
    g.getModuleReference = k
}), 98);
__d("RelayFBOperationLoader", ["Promise", "RelayFBModuleLoader"], (function(a, b, c, d, e, f, g) {
    "use strict";
    a = {
        get: function(a) {
            return a == null || typeof a !== "object" ? null : d("RelayFBModuleLoader").get(a)
        },
        load: function(a) {
            return a == null || typeof a !== "object" ? b("Promise").resolve(null) : d("RelayFBModuleLoader").load(a)
        }
    };
    c = a;
    g["default"] = c
}), 98);
__d("RelayRequiredFieldLogger", ["FBLogger", "err", "fb-error"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = "relay-required",
        i = "relay-resolver";

    function j(a) {
        return a.kind + "-" + a.fieldPath + "-" + a.owner
    }

    function a() {
        var a = new Set();
        return function(b) {
            var d = j(b),
                e = a.has(d);
            e || a.add(d);
            switch (b.kind) {
                case "missing_field.log":
                    e || c("FBLogger")(h).blameToPreviousFrame().mustfix('Encountered a missing `@required` field with action "LOG" at "%s" in "%s"', b.fieldPath, b.owner);
                    break;
                case "missing_field.throw":
                    d = ['Encountered a missing `@required` field with action "THROW" at "%s" in "%s"', b.fieldPath, b.owner];
                    var f = c("err").apply(void 0, d);
                    f.taalOpcodes = f.taalOpcodes || [];
                    f.taalOpcodes.push(c("fb-error").TAALOpcode.PREVIOUS_FRAME);
                    if (!e) {
                        var g;
                        (g = c("FBLogger")(h).blameToPreviousFrame()).mustfix.apply(g, d)
                    }
                    throw f;
                case "relay_resolver.error":
                    e || c("FBLogger")(i).catching(b.error).blameToPreviousFrame().mustfix('A Relay Resolver errored at "%s" in "%s"', b.fieldPath, b.owner);
                    break;
                default:
                    b.kind
            }
        }
    }
    g.create = a
}), 98);
__d("processRelayPrefetchURIsPayload", ["ExecutionEnvironment"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a(a) {
        if (!d("ExecutionEnvironment").canUseDOM) return;
        a.forEach(function(a) {
            a = a.uri;
            if (typeof a === "string") {
                var b = new Image();
                b.src = a
            }
        })
    }
    g["default"] = a
}), 98);
__d("withLive", ["invariant"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a(a, b) {
        var c = a.metadata;
        c = c.live;
        if (c != null && typeof c === "object") {
            c = h(a);
            a = i(a);
            c == null || a == null || g(0, 45, c, a);
            c != null || a != null || g(0, 46);
            if (c != null) {
                var d = b.poll;
                d == null || d === c || g(0, 47, d, c);
                return babelHelpers["extends"]({}, b, {
                    poll: c
                })
            }
            if (a != null) {
                d = b.liveConfigId;
                d == null || d === a || g(0, 48, d, a);
                return babelHelpers["extends"]({}, b, {
                    liveConfigId: a
                })
            }
        }
        return b
    }

    function h(a) {
        a = a.metadata;
        a = a.live;
        if (a != null && typeof a === "object") {
            a.polling_interval == null || typeof a.polling_interval === "number" || g(0, 49);
            return a.polling_interval
        }
        return null
    }

    function i(a) {
        a = a.metadata;
        a = a.live;
        if (a != null && typeof a === "object") {
            a.config_id == null || typeof a.config_id === "string" || g(0, 50);
            return a.config_id
        }
        return null
    }
    e.exports = a
}), null);
__d("withLiveClientPolling", ["invariant", "LiveQueryWebClientPollingSwitchList"], (function(a, b, c, d, e, f, g, h) {
    "use strict";
    var i = "switch_all_use_cases_careful_to_use";

    function a(a, b) {
        var c = a.metadata;
        c = c.live;
        if (c != null && typeof c === "object") {
            c = j(a);
            if (c != null) {
                a = b.liveConfigId;
                a == null || a === c || h(0, 48, a, c);
                a = d("LiveQueryWebClientPollingSwitchList").liveQueryWebClientPollingSwitchList;
                if (a != null) {
                    if (typeof a[c] === "number") return babelHelpers["extends"]({}, b, {
                        poll: a[c]
                    });
                    if (typeof a[i] === "number" && a[i] > 5e3) return babelHelpers["extends"]({}, b, {
                        poll: a[i]
                    })
                }
            }
        }
        return b
    }

    function j(a) {
        a = a.metadata;
        a = a.live;
        if (a != null && typeof a === "object") {
            a.config_id == null || typeof a.config_id === "string" || h(0, 50);
            return a.config_id
        }
        return null
    }
    g["default"] = a
}), 98);
__d("createRelayFBNetwork", ["DTSG", "Promise", "cr:1110430", "gkx", "isPromise", "killswitch", "processRelayPrefetchURIsPayload", "processRelaySRPayload", "relay-runtime", "withLive", "withLiveClientPolling"], (function(a, b, c, d, e, f, g) {
    "use strict";
    b("cr:1110430");
    var h = c("killswitch")("RELAY_BLOCK_NETWORK_ON_3D_STATIC_RESOURCES") === !1 && !c("gkx")("708253");

    function i(a, b, e, f, g, h) {
        a = a.extensions;
        if (!a || a.__resources_processed) {
            e && e();
            return
        }
        a.__resources_processed = !0;
        if (a.__sr_unprocessed) throw d("relay-runtime").RelayError.create("GraphQLError", "Fatal Error: Found unprocessed static resource payload");
        var i = a.prefetch_uris_v2;
        a.prefetch_uris = null, a.prefetch_uris_v2 = null;
        i != null && Array.isArray(i) && c("processRelayPrefetchURIsPayload")(i);
        i = a.all_video_dash_prefetch_representations;
        a.prefetch_dash_segments = null, a.all_video_dash_prefetch_representations = null, a.video_dash_prefetch_representations = null;
        i != null && Array.isArray(i) && h != null && h(i);
        h = a.sr_payload;
        a.sr_payload = null;
        h != null && typeof h === "object" ? c("processRelaySRPayload")(h, b, e, function(a) {
            g && g({
                srPayloadStats: a
            })
        }) : e && e();
        i = a.dtsg_token;
        i && typeof i === "string" && d("DTSG").setToken(i);
        h = a.prefetch_comet_routing;
        a.prefetch_comet_routing = null;
        if (f != null && (h != null && typeof h === "object")) {
            b = h.data;
            e = h.uris;
            (b != null || e != null) && f(e, b)
        }
    }

    function j(a, c, d, e, f) {
        var g;
        g = (g = a.extensions) == null ? void 0 : g.sr_payload;
        if (g != null && typeof g === "object") return new(b("Promise"))(function(b) {
            i(a, c, function() {
                b(a)
            }, d, e, f)
        });
        i(a, c, null, d, e, f);
        return a
    }

    function k(a, b) {
        return d("relay-runtime").Observable.create(function(c) {
            var e = !1,
                f, g, h = [];

            function i(a) {
                if (g) h.push(a);
                else try {
                    d("relay-runtime").Observable.from(b(a)).subscribe({
                        start: function(a) {
                            g = a
                        },
                        next: c.next,
                        error: c.error,
                        complete: function() {
                            g = void 0, h.length !== 0 ? i(h.shift()) : e && c.complete()
                        }
                    })
                } catch (a) {
                    c.error(a)
                }
            }
            a.subscribe({
                start: function(a) {
                    f = a
                },
                next: i,
                error: c.error,
                complete: function() {
                    e = !0, g || c.complete()
                }
            });
            return function() {
                g && (g.unsubscribe(), g = void 0), f.unsubscribe(), h.length = 0
            }
        })
    }

    function a(a, e, f, g) {
        var l = d("relay-runtime").Network.create(a, e);
        return {
            execute: function(a, d, e, m, n) {
                e = c("withLiveClientPolling")(a, c("withLive")(a, e));
                return h ? k(l.execute(a, d, e, m, n), function(d) {
                    if (Array.isArray(d)) {
                        var e = [],
                            h = !1;
                        d.forEach(function(b) {
                            b = j(b, a.name, f, n, g);
                            h = h || c("isPromise")(b);
                            e.push(b)
                        });
                        return h ? b("Promise").all(e) : e
                    }
                    return j(d, a.name, f, n, g)
                }) : l.execute(a, d, e, m, n)["do"]({
                    next: function(b) {
                        Array.isArray(b) ? b.forEach(function(b) {
                            i(b, a.name, null, f, n, g)
                        }) : i(b, a.name, null, f, n, g)
                    }
                })
            }
        }
    }
    g["default"] = a
}), 98);
__d("createChunkedResponseParser", ["invariant"], (function(a, b, c, d, e, f, g, h) {
    "use strict";
    var i = "\r\n",
        j = 2;

    function a(a, b) {
        var c = 0,
            d = function(d, e, f) {
                b && (d = b(d), d == null || typeof d === "string" || h(0, 4071));
                if (d) {
                    var g = d.length;
                    while (c < g) {
                        var k = d.indexOf(i, c);
                        if (k < 0)
                            if (f) k = g;
                            else break;
                        k = d.slice(c, k);
                        c += k.length + j;
                        a(k, e, f && c >= g)
                    }
                } else f && a("", e, !0)
            };
        d.parseStreaming = !0;
        return d
    }
    g["default"] = a
}), 98);
__d("createRelayChunkedResponseParser", ["invariant"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = "\r\n",
        i = 2;

    function a(a, b) {
        var c = 0,
            d = function(d, e, f) {
                d = d;
                b && (d = b(d), d == null || typeof d === "string" || g(0, 42548));
                if (d != null) {
                    var j = d.length,
                        k = [];
                    while (c < j) {
                        var l = d.indexOf(h, c);
                        if (l < 0)
                            if (f) l = j;
                            else break;
                        l = d.slice(c, l);
                        c += l.length + i;
                        k.push({
                            responseText: l,
                            responseHeaders: e,
                            isComplete: f && c >= j
                        })
                    }
                    k.length > 0 && a(k)
                } else f && a([{
                    responseText: "",
                    responseHeaders: e,
                    isComplete: !0
                }])
            };
        d.parseStreaming = !0;
        return d
    }
    e.exports = a
}), null);
__d("getRelayAPIRequestHandler", ["cr:696703"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a(a) {
        var c = a;
        if (b("cr:696703")) {
            var d = b("cr:696703").getUserBlockingRunAtCurrentPriCallbackScheduler_DO_NOT_USE();
            c = function() {
                for (var b = arguments.length, c = new Array(b), e = 0; e < b; e++) c[e] = arguments[e];
                d(function() {
                    return a.apply(void 0, c)
                })
            };
            c.parseStreaming = a.parseStreaming
        }
        return c
    }
    g["default"] = a
}), 98);
__d("RelayAPIRequest", ["invariant", "NetworkStatus", "URI", "XHRHttpError", "XHRRequest", "createChunkedResponseParser", "createRelayChunkedResponseParser", "forEachObject", "getRelayAPIRequestHandler", "getSameOriginTransport", "warning"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h;

    function i(a) {
        return a === b("XHRHttpError").HTTP_TRANSPORT_ERROR || a === b("XHRHttpError").HTTP_SERVER_ERROR
    }
    a = function() {
        function a(a, c, d) {
            this.$1 = !1, this.setURI(a), this.setMethod("POST"), this.setTransportBuilder(b("getSameOriginTransport")), this.$16 = c, this.$17 = d
        }
        var c = a.prototype;
        c.setURI = function(a) {
            this.$1 && g(0, 2124);
            this.$2 = new(h || (h = b("URI")))(a);
            return this
        };
        c.setMethod = function(a) {
            this.$1 && g(0, 2125);
            this.$3 = a;
            return this
        };
        c.setData = function(a) {
            this.$1 && g(0, 2126);
            this.$4 = a;
            return this
        };
        c.setDataSerializer = function(a) {
            this.$5 = a;
            return this
        };
        c.setRawData = function(a) {
            this.$1 && g(0, 2127);
            this.$6 = a;
            return this
        };
        c.setTrackingName = function(a) {
            this.$9 = a;
            return this
        };
        c.setPerformanceLogger = function(a) {
            this.$18 = a;
            return this
        };
        c.setRequestHeaders = function(a) {
            this.$1 && g(0, 2128);
            this.$7 = a;
            return this
        };
        c.setTransportBuilder = function(a) {
            var b = this;
            this.$1 && g(0, 2129);
            var c = a;
            this.$10 = function() {
                var a = c();
                a.setTrackingName && a.setTrackingName(b.$9);
                a.setPerformanceLogger && b.$18 && a.setPerformanceLogger(b.$18);
                return a
            };
            return this
        };
        c.setResponseFilter = function(a) {
            this.$1 && g(0, 2130);
            this.$11 = a;
            return this
        };
        c.setResponseChunkHandler = function(a) {
            this.$1 && g(0, 2131);
            this.$12 == null || g(0, 42544);
            this.$13 = a;
            return this
        };
        c.setResponseBatchChunkHandler = function(a) {
            this.$1 && g(0, 2131);
            this.$13 == null || g(0, 42545);
            this.$12 = a;
            return this
        };
        c.setErrorHandler = function(a) {
            this.$1 && g(0, 2132);
            this.$14 = a;
            return this
        };
        c.setTimeoutHandler = function(a) {
            this.$1 && g(0, 2133);
            this.$15 = a;
            return this
        };
        c.setSkipRetry = function(a) {
            this.$8 = a;
            return this
        };
        c.send = function() {
            var a = this;
            this.$1 && g(0, 2134);
            this.$1 = !0;
            if (!this.$2 || !this.$2.toString()) {
                this.$14 && this.$14({
                    errorCode: "HTTP_CLIENT_ERROR",
                    errorType: "HTTP",
                    errorMsg: "No uri provided - make sure RelayAPIConfig is properly setup."
                });
                return {
                    abort: function() {}
                }
            }
            var c, d = 0,
                e = 0,
                f, h = function() {
                    return !a.$8 && d <= a.$16.length
                },
                j = function() {
                    var b = a.$16[d - 1];
                    b = e + b;
                    var f = setTimeout(function() {
                        c = k()
                    }, b - Date.now());
                    c = {
                        abort: function() {
                            clearTimeout(f)
                        }
                    }
                },
                k = function() {
                    d++;
                    e = Date.now();
                    var g;
                    a.$12 ? (g = b("createRelayChunkedResponseParser")(a.$12, a.$11), g = b("getRelayAPIRequestHandler")(g)) : a.$13 && (g = b("createChunkedResponseParser")(a.$13, a.$11), g = b("getRelayAPIRequestHandler")(g));
                    var k = a.$14,
                        l = function(a) {
                            h() && i(a.errorCode) ? (b("warning")(!1, "RelayAPIRequest: Transient HTTP error, retrying. %s %s %s", a.errorType || "", a.errorCode || "", a.errorMsg || ""), !b("NetworkStatus").isOnline() ? (f = b("NetworkStatus").onChange(function(a) {
                                a = a.online;
                                a && (j(), f.remove())
                            }), c = {
                                abort: function() {
                                    f.remove()
                                }
                            }) : j()) : k && k(a)
                        },
                        m = a.$15,
                        n = function() {
                            h() ? (b("warning")(!1, "RelayAPIRequest: HTTP timeout, retrying."), j()) : m && m()
                        },
                        o = new(b("XHRRequest"))(a.$2).setMethod(a.$3).setData(a.$4).setTransportBuilder(a.$10).setErrorHandler(l).setResponseHandler(g).setTimeout(a.$17).setTimeoutHandler(n);
                    a.$6 != null && o.setRawData(a.$6);
                    a.$5 != null && o.setDataSerializer(a.$5);
                    a.$7 && b("forEachObject")(a.$7, function(a, b) {
                        o.setRequestHeader(b, a)
                    });
                    o.send();
                    return o
                };
            c = k();
            return {
                abort: function() {
                    c && c.abort()
                }
            }
        };
        return a
    }();
    e.exports = a
}), null);
__d("RelayDiskCacheConfig", [], (function(a, b, c, d, e, f) {
    function a(a) {
        return null
    }
    f.getDiskCacheConfig = a
}), 66);
__d("RelayFBJsonParser", ["cr:267"], (function(a, b, c, d, e, f, g) {
    a = {
        parse: function(a) {
            return b("cr:267") && h() ? b("cr:267")({
                constructorAction: "preserve",
                protoAction: "preserve"
            }).parse(a) : JSON.parse(a)
        }
    };

    function h() {
        return typeof JSON.parse === "function" && JSON.parse.toString() !== "function parse() { [native code] }"
    }
    c = a;
    g["default"] = c
}), 98);
__d("RelayRuntime", ["relay-runtime"], (function(a, b, c, d, e, f) {
    "use strict";
    e.exports = b("relay-runtime")
}), null);
__d("RelayGraphQLRequestUtils", ["CSRFGuard", "RelayFBJsonParser", "RelayRuntime", "XHRHttpError"], (function(a, b, c, d, e, f) {
    "use strict";
    var g = b("RelayRuntime").RelayError;
    a = {
        createErrorFromPayload: function(a) {
            if (typeof a === "object")
                if (a.code || a.description) {
                    var b, c;
                    b = (b = a.debug_info) != null ? b : "";
                    c = (c = a.exception) == null ? void 0 : c.message;
                    c != null && (b = c + "\n\n" + b);
                    c = g.create("GraphQLError", "GraphQL server responded with error %s: %s\n%s", a.code, a.description, b)
                } else c = g.create("GraphQLError", "GraphQL server responded with error: %s", JSON.stringify(a));
            else c = g.create("GraphQLError", "GraphQL server responded with an error: %s", a);
            b = c;
            b.source = a;
            typeof a === "object" && (b.code = a.code, b.description = a.description, b.summary = a.summary, b.debug_info = a.debug_info);
            return b
        },
        createErrorFromXHR: function(a, c) {
            var d;
            a.errorCode === b("XHRHttpError").HTTP_TRANSPORT_ERROR ? d = g.createWarning("NetworkTransportError", c) : a.errorCode === b("XHRHttpError").HTTP_CLIENT_ERROR && a.errorMsg && a.errorMsg.match(/OAuthException/) ? d = g.create("NetworkOAuthError", c) : d = g.create("NetworkRequestError", c);
            d.source = a;
            return d
        },
        getRelayAPIConfigHeaders: function(a, b, c) {
            a = babelHelpers["extends"]({}, a);
            b && (a["Content-Encoding"] = b);
            c && (a["User-Agent"] = c);
            return a
        },
        parsePayload: function(a) {
            if (b("CSRFGuard").exists(a)) {
                var c = h(b("CSRFGuard").clean(a));
                if (Object.prototype.hasOwnProperty.call(c, "data") || !Object.prototype.hasOwnProperty.call(c, "error")) return c;
                var d = g.createWarning("GraphQLXControllerError", "GraphQL server responded with error %s: %s\n%s", c.error, c.errorSummary, c.errorDescription);
                d = d;
                d.source = c;
                d.code = c.error;
                d.description = c.errorDescription;
                d.summary = c.errorSummary;
                throw d
            }
            return h(a)
        }
    };

    function h(a) {
        try {
            return b("RelayFBJsonParser").parse(a)
        } catch (b) {
            throw g.create("JSONParseError", "Response contained invalid JSON.\nReason: %s\n%s", b.message, a)
        }
    }
    e.exports = a
}), null);
__d("RelayAsyncStreamPool", ["invariant"], (function(a, b, c, d, e, f, g, h) {
    "use strict";
    var i = 0,
        j = 1,
        k = 2;
    a = function() {
        function a() {
            this.$1 = 0, this.$2 = new Map()
        }
        var b = a.prototype;
        b.forceComplete = function(a) {
            a = this.$3(a);
            if (a.status !== i) return;
            var b = a.observers;
            a.status = k;
            a.events.push({
                kind: "complete",
                sequenceNumber: a.events.length
            });
            a.observers = new Map();
            b.forEach(function(a) {
                return a.complete()
            })
        };
        b.forceError = function(a, b) {
            a = this.$3(a);
            if (a.status !== i) return;
            var c = a.observers;
            a.status = k;
            a.events.push({
                kind: "error",
                error: b,
                sequenceNumber: a.events.length
            });
            a.observers = new Map();
            c.forEach(function(a) {
                return a.error(b)
            })
        };
        b.complete = function(a, b) {
            Number.isInteger(b) && b >= 0 || h(0, 14878, b);
            var c = this.$3(a);
            if (c.status !== i) return;
            var d = c.events.length;
            if (b === d) {
                var e = c.observers;
                c.status = k;
                c.events.push({
                    kind: "complete",
                    sequenceNumber: b
                });
                c.observers = new Map();
                e.forEach(function(a) {
                    return a.complete()
                })
            } else b > d && !Object.prototype.hasOwnProperty.call(c.pendingEvents, b) || h(0, 14879, b, a), c.status = j, c.pendingEvents[b] = {
                kind: "complete",
                sequenceNumber: b
            }
        };
        b.error = function(a, b, c) {
            Number.isInteger(c) && c >= 0 || h(0, 14878, c);
            var d = this.$3(a);
            if (d.status !== i) return;
            var e = d.events.length;
            if (c === e) {
                var f = d.observers;
                d.status = k;
                d.events.push({
                    kind: "error",
                    error: b,
                    sequenceNumber: c
                });
                d.observers = new Map();
                f.forEach(function(a) {
                    return a.error(b)
                })
            } else c > e && !Object.prototype.hasOwnProperty.call(d.pendingEvents, c) || h(0, 14879, c, a), d.status = j, d.pendingEvents[c] = {
                kind: "error",
                error: b,
                sequenceNumber: c
            }
        };
        b.next = function(a, b, c) {
            Number.isInteger(c) && c >= 0 || h(0, 14878, c);
            var d = this.$3(a);
            if (d.status === k) return;
            var e = d.events.length;
            if (c === e) {
                var f = d.observers;
                d.events.push({
                    kind: "next",
                    data: b,
                    sequenceNumber: c
                });
                f.forEach(function(a) {
                    return a.next(b)
                });
                var g = d.pendingEvents,
                    i = function(b) {
                        var c = g[b];
                        if (c == null) return "break";
                        d.events.push(c);
                        switch (c.kind) {
                            case "complete":
                                d.status = k;
                                d.observers = new Map();
                                f.forEach(function(a) {
                                    return a.complete()
                                });
                                return {
                                    v: void 0
                                };
                            case "error":
                                d.status = k;
                                d.observers = new Map();
                                f.forEach(function(a) {
                                    return a.error(c.error)
                                });
                                return {
                                    v: void 0
                                };
                            case "next":
                                f.forEach(function(a) {
                                    return a.next(c.data)
                                });
                                break;
                            default:
                                c.kind, h(0, 14593, c.kind, a)
                        }
                    };
                _loop: for (var j = e + 1; j < g.length; j++) {
                    var l = i(j);
                    switch (l) {
                        case "break":
                            break _loop;
                        default:
                            if (typeof l === "object") return l.v
                    }
                }
            } else c > e && !Object.prototype.hasOwnProperty.call(d.pendingEvents, c) || h(0, 14879, c, a), d.pendingEvents[c] = {
                kind: "next",
                data: b,
                sequenceNumber: c
            }
        };
        b.clear = function(a) {
            this.$2["delete"](a)
        };
        b.has = function(a) {
            return this.$2.has(a)
        };
        b.subscribe = function(a, b) {
            var c = this.$3(a),
                d = this.$1++,
                e = c.events;
            e.length !== 0 && e.forEach(function(c) {
                switch (c.kind) {
                    case "complete":
                        b.complete();
                        break;
                    case "error":
                        b.error(c.error);
                        break;
                    case "next":
                        b.next(c.data);
                        break;
                    default:
                        c.kind, h(0, 14593, c.kind, a)
                }
            });
            var f = c.observers;
            f.set(d, b);
            e = {
                unsubscribe: function() {
                    f["delete"](d)
                }
            };
            b.start(e);
            return e
        };
        b.$3 = function(a) {
            var b = this.$2.get(a);
            b == null && (b = {
                status: i,
                events: [],
                observers: new Map(),
                pendingEvents: []
            }, this.$2.set(a, b));
            return b
        };
        return a
    }();
    g["default"] = a
}), 98);
__d("stableStringifyPrefetchedRelayVariablesWithActor", ["gkx", "stableStringify"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a(a, b) {
        if (c("gkx")("3329")) return c("stableStringify")(babelHelpers["extends"]({}, b, {
            $actorID: String(a)
        }), !0);
        a = ["$actorID:" + a];
        var d = Object.keys(b).sort();
        for (var e = 0; e < d.length; e++) {
            var f = d[e],
                g = b[f];
            g != null && a.push(f + ": " + c("stableStringify")(g))
        }
        return "{" + a.join(",") + "}"
    }
    g["default"] = a
}), 98);
__d("RelayPrefetchedStreamCache", ["ExecutionEnvironment", "FBLogger", "RelayAsyncStreamPool", "clearImmediate", "setImmediateAcrossTransitions", "stableStringifyPrefetchedRelayVariablesWithActor"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = new(c("RelayAsyncStreamPool"))(),
        i = {},
        j = {},
        k = {};

    function l(a, b) {
        return Object.prototype.hasOwnProperty.call(k, a) ? k[a][b] : null
    }

    function m(a, b, c) {
        Object.prototype.hasOwnProperty.call(k, a) ? k[a][b] = c : (k[a] = {}, k[a][b] = c)
    }

    function n(a, b) {
        if (Object.prototype.hasOwnProperty.call(i, a)) {
            if (Object.prototype.hasOwnProperty.call(i[a], b)) {
                var c = i[a][b].id;
                c != null && h.clear(c);
                delete i[a][b]
            }
            Object.keys(i[a]).length === 0 && delete i[a]
        }
        Object.prototype.hasOwnProperty.call(j, a) && (delete j[a][b], Object.keys(j[a]).length === 0 && delete j[a]);
        Object.prototype.hasOwnProperty.call(k, a) && (delete k[a][b], Object.keys(k[a]).length === 0 && delete k[a])
    }

    function o(a, b) {
        var d = l(a, b);
        d && (c("clearImmediate")(d), n(a, b))
    }

    function p(a, b) {
        l(a, b) || m(a, b, c("setImmediateAcrossTransitions")(function() {
            n(a, b)
        }))
    }

    function q(a, b) {
        return (b = (a = i[a]) == null ? void 0 : (a = a[b]) == null ? void 0 : a.id) != null ? b : null
    }

    function r(a, b, c, d, e) {
        Object.prototype.hasOwnProperty.call(i, a) || (i[a] = {}), Object.prototype.hasOwnProperty.call(j, a) || (j[a] = {}), j[a][b] = !1, i[a][b] = {
            id: c,
            variables: e,
            actorID: d
        }
    }

    function a(a, b, d) {
        a = c("stableStringifyPrefetchedRelayVariablesWithActor")(a, d);
        p(b, a)
    }

    function b(a, b, e, f, g, k) {
        k === void 0 && (k = !1);
        var l = c("stableStringifyPrefetchedRelayVariablesWithActor")(a, e),
            m = q(b, l);
        if (m != null) {
            k || (j[b][l] = !0);
            return h.subscribe(m, f)
        }
        if (i[b] && Object.values(j[b]).filter(function(a) {
                return !a
            }).length > 0) {
            k = Object.keys(i[b]);
            m = i[b][k[0]];
            m = t(m, a, e);
            c("FBLogger")("RelayQueryPreloader").addMetadata("RELAY_PRELOADER", "QUERY_ID", b).addMetadata("RELAY_PRELOADER", "QUERY_NAME", (a = g) != null ? a : "unknown").addMetadata("RELAY_PRELOADER", "MISMATCH", m).addToCategoryKey((e = g) != null ? e : b).warn("RelayPrefetchedStreamCache.subscribe(): Could not find preloader for query with actor ID and variables: `%s`\n\nbut had data for that query with actorID/variables:\n `%s`\n", l, k.join("||"))
        }
        if (!d("ExecutionEnvironment").canUseDOM) {
            c("FBLogger")("RelayQueryPreloader").addMetadata("RELAY_PRELOADER", "QUERY_ID", b).addMetadata("RELAY_PRELOADER", "QUERY_NAME", (a = g) != null ? a : "unknown").addToCategoryKey((m = g) != null ? m : b).mustfix("RelayPrefetchedStreamCache:.get: Missing relay query preloader for query: %s with actorID and variables %s. Make sure your relay preloaders are configured. https://fburl.com/comet_preloading", g != null ? g : b, l)
        }
        e = !1;
        k = {
            unsubscribe: function() {
                e = !0
            }
        };
        f.start(k);
        e || f.complete();
        return k
    }

    function e(a, b) {
        var d = null,
            e = 0,
            f = null;
        if (b != null) {
            var g;
            d = b.result;
            e = (g = b.sequence_number) != null ? g : 0;
            f = b.complete;
            typeof f !== "boolean" && c("FBLogger")("RelayQueryPreloader").mustfix("RelayPrefetchedStreamCache:.next: Expected GraphQL preloader `complete` field to be a boolean, got `%s` for preloader `%s`.", String(f), a)
        }
        d != null && h.next(a, d, e);
        g = d == null || f !== !1;
        g && h.complete(a, e + 1)
    }

    function f(a, b, c) {
        c === void 0 && (c = 0), c === 0 ? h.forceError(a, b) : h.error(a, b, c)
    }

    function s(a, b, d, e) {
        var f = c("stableStringifyPrefetchedRelayVariablesWithActor")(e, d);
        o(b, f);
        var g = q(b, f);
        g != null && (c("FBLogger")("RelayQueryPreloader").addMetadata("RELAY_PRELOADER", "QUERY_ID", b).warn("RelayPrefetchedStreamCache::registerPreloader(): You must not register more than one preloader for the query with ID `%s` and actorID/variables `%s`. This could result in stale data.", b, c("stableStringifyPrefetchedRelayVariablesWithActor")(e, d)), h.forceComplete(g), n(b, f));
        r(b, f, a, e, d)
    }

    function t(a, b, c) {
        if (a == null) return "";
        var d = a.actorID;
        a = a.variables;
        var e = [];
        d != b && e.push("actorID");
        d = Object.keys(a);
        for (var b = 0; b < d.length; b++) {
            var f = d[b],
                g = a[f] != null ? a[f].toString() : "",
                h = c[f] != null ? c[f].toString() : "";
            g != h && e.push(f)
        }
        g = Object.keys(c);
        for (var h = 0; h < g.length; h++) {
            f = g[h];
            b = a[f];
            b == null && c[f] != null && e.push(f)
        }
        return e.toString()
    }
    g.clear = a;
    g.subscribe = b;
    g.next = e;
    g.error = f;
    g.registerPreloader = s
}), 98);
__d("RelayPrefetchedResponseProvider", ["RelayGraphQLRequestUtils", "RelayPrefetchedStreamCache", "RelayRuntime"], (function(a, b, c, d, e, f) {
    "use strict";
    var g = b("RelayRuntime").Observable;
    a = {
        get: function(a, c, d, e, f) {
            return g.create(function(f) {
                var g = function(a) {
                        if (!a) {
                            f.complete();
                            return
                        }
                        if (a.errors)
                            for (var c = a.errors, d = Array.isArray(c), e = 0, c = d ? c : c[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                                var g;
                                if (d) {
                                    if (e >= c.length) break;
                                    g = c[e++]
                                } else {
                                    e = c.next();
                                    if (e.done) break;
                                    g = e.value
                                }
                                g = g;
                                if (g.severity === "CRITICAL") {
                                    f.error(b("RelayGraphQLRequestUtils").createErrorFromPayload(g));
                                    return
                                }
                            }
                        f.next(a)
                    },
                    h = b("RelayPrefetchedStreamCache").subscribe(a, c, d, {
                        complete: f.complete,
                        error: function(a) {
                            return f.complete()
                        },
                        next: g,
                        start: function() {}
                    }, e);
                return function() {
                    h != null && (h.unsubscribe(), h = null), b("RelayPrefetchedStreamCache").clear(a, c, d)
                }
            })
        }
    };
    e.exports = a
}), null);
__d("RelayWWWInitialRolloutResolver", ["gkx"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = [{
            gk: function() {
                return !0
            },
            config_ids: new Set(["relay_live_query_demo_intern_task"])
        }, {
            gk: function() {
                return c("gkx")("1369861")
            },
            config_ids: new Set(["relay_queue_manager", "relay_queue_manager_root_calls", "relay_queue_manager_sidebar_searches_sets"])
        }, {
            gk: function() {
                return c("gkx")("1414060")
            },
            config_ids: new Set(["relay_work_galahad_meeting_calendar", "relay_work_galahad_admin_bookmarks"])
        }, {
            gk: function() {
                return c("gkx")("1443173")
            },
            config_ids: new Set(["streamer_dashboard_comments", "streamer_dashboard_moderation"])
        }, {
            gk: function() {
                return c("gkx")("1414691")
            },
            config_ids: new Set(["www_wp_cc_preview_uri"])
        }, {
            gk: function() {
                return c("gkx")("1477298")
            },
            config_ids: new Set(["relay_sevmanager_comment_panel", "relay_sevmanager_incident_report_panel", "relay_sevmanager_summary_panel", "relay_sevmanager_escalation_panel"])
        }, {
            gk: function() {
                return c("gkx")("1443174")
            },
            config_ids: new Set(["rtc_web_vcl_update_query", "sandcastle_job_root", "www_lwi_banner", "m_relay_dtp_activity", "GHOSTBUSTER_CONFIG"])
        }, {
            gk: function() {
                return c("gkx")("1443175")
            },
            config_ids: new Set(["sev_recovery_metric_panel", "relay_ops_center_blockers", "relay_daiquery_query_version", "lead_gen_goldilocks_stage_count", "relay_launch_manager_attachments", "relay_opscenter_issue_details", "relay_dtp_activity", "relay_global_support_activity_code_selector_query", "smart_office_stargates_page", "relay_opscenter_powersearch_issues", "relay_recruiting_requisitions", "canvas_document_root_container", "relay_consent_order", "db_portal_aosc_running_jobs_notification", "relay_dataops_configerator", "db_portal_olm_notification", "relay_opscenter_issue_groups", "svc_deployment_jobs_chart_sidebar_task_states", "relay_graphql_record_server_poll"])
        }, {
            gk: function() {
                return c("gkx")("1865464")
            },
            config_ids: new Set(["comet_lwi_payment_method_section", "comet_video_viewer_tagged_products", "comet_live_together", "comet_billing_blue_on_comet_util", "comet_billing_account_info_collection_util", "gemini_calendar_connection_loading", "comet_billing_required_wizard_name", "comet_coplay_discovery_rooms_query", "gemini_garden_badge_unread_count", "comet_live_event_manager_list", "comet_live_event_root_query", "gemini_garden_chats_badge_unread_count", "comet_live_event_video_indicator"])
        }],
        i = new Set(["relay_snoop_case_details_live_container"]);

    function a(a) {
        if (i.has(a)) return !1;
        for (var b = 0; b < h.length; b++) {
            var d = h[b];
            if (d.config_ids != null && d.config_ids.has(a)) return d.gk()
        }
        return c("gkx")("1443176")
    }
    g.enableWWWInitial = a
}), 98);
__d("getAnalyticsTags", ["relay-runtime", "requireWeak"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a() {
        var a = [];
        c("requireWeak")("QPLUserFlow", function(b) {
            b = b.getActiveFlowIDs();
            b.length > 0 && a.push("qpl_active_flow_ids=" + b.sort().join(","))
        });
        return d("relay-runtime").Observable.from(a)
    }
    g["default"] = a
}), 98);
__d("createRelayFBNetworkFetch", ["invariant", "DTSGParser", "RelayAPIConfig", "RelayAPIRequest", "RelayDiskCacheConfig", "RelayGraphQLRequestUtils", "RelayPrefetchedResponseProvider", "RelayRuntime", "RelayWWWInitialRolloutResolver", "getAnalyticsTags", "getAsyncParams", "getCrossOriginTransport", "getSameOriginTransport", "nullthrows"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = b("RelayDiskCacheConfig").getDiskCacheConfig,
        i = (d = b("RelayRuntime")).Observable,
        j = d.RelayError,
        k = d.RelayFeatureFlags,
        l = d.RelayProfiler;

    function m(a) {
        return a.operationKind === "mutation"
    }

    function n(a) {
        return a.operationKind === "query"
    }

    function o(b, c) {
        a.FormData != null || g(0, 19002);
        var d = new FormData();
        for (var e in b) Object.prototype.hasOwnProperty.call(b, e) && d.append(e, b[e]);
        for (var e in c) Object.prototype.hasOwnProperty.call(c, e) && d.append(e, c[e]);
        return d
    }

    function p(a) {
        a = a.cacheID ? a.cacheID : a.id;
        a != null || g(0, 22754);
        return a
    }

    function q(a) {
        a = a == null ? void 0 : a.performanceLogger;
        if (a != null && typeof a === "object" && typeof a.startTimespan === "function") {
            a = a;
            return a
        }
    }

    function c(a) {
        var c = a.graphURI,
            d = a.transportBuilder,
            e = a.getAdditionalData,
            f = a.getAdditionalHeaders,
            g = a.queryResponseCache,
            i = a.liveQueryFetchWithWWWInitialFn,
            j = a.liveQueryFetchFn,
            l = a.wrapObservableFn,
            m = a.accessToken,
            n = a.actorID,
            o = a.customHeaders,
            p = a.fetchTimeout,
            z = a.getAnalyticsTags,
            A = z === void 0 ? b("getAnalyticsTags") : z,
            B = a.retryDelays,
            C = a.userAgent,
            D = a.xhrEncoding,
            E = a.useXController,
            F = a.tokenProxy,
            G = a.batchResponseChunks;
        return function(a, z, H, I, J) {
            var K, L, M, N, O, P, Q;
            K = (K = c) != null ? K : b("RelayAPIConfig").graphURI;
            var R = g;
            L = (L = n) != null ? L : b("RelayAPIConfig").actorID;
            M = (M = m) != null ? M : b("RelayAPIConfig").accessToken;
            N = (N = E) != null ? N : b("RelayAPIConfig").useXController;
            O = typeof((O = H.metadata) == null ? void 0 : O.privacyContext) === "string" ? H.metadata.privacyContext : null;
            k.ENABLE_FRIENDLY_QUERY_NAME_GQL_URL && K.addQueryData({
                __query: a.name
            });
            P = (P = d) != null ? P : N ? b("getSameOriginTransport") : b("RelayAPIConfig").withCredentials ? b("getCrossOriginTransport").withCredentials : b("getCrossOriginTransport");
            N = e ? e() : N ? {
                av: L
            } : {
                access_token: M
            };
            Q = f ? f() : b("RelayGraphQLRequestUtils").getRelayAPIConfigHeaders((Q = o) != null ? Q : b("RelayAPIConfig").customHeaders, (Q = D) != null ? Q : b("RelayAPIConfig").xhrEncoding, (Q = C) != null ? Q : b("RelayAPIConfig").userAgent);
            O != null && (Q.privacy_context = O);
            O = {
                queryName: a.name,
                usedCache: !1,
                usedDiskCache: !1,
                usedPrefetcher: !1,
                serverTimestamp: null,
                transactionId: H.transactionId
            };
            var S = q(H == null ? void 0 : H.metadata);
            Q = y(K, P, Q, a, z, I, N, A, (K = B) != null ? K : b("RelayAPIConfig").retryDelays, (P = p) != null ? P : b("RelayAPIConfig").fetchTimeout, F, S, G);
            I = h(H);
            I && (Q = I.cache.withDiskCacheSave(Q, a, z, L, I));
            R && (Q = x(Q, a, z, R));
            N = u(a, z, L, O, R, J, I, S);
            K = t(a, z, O, R, H, L, J, S);
            I && (K = I.cache.withDiskCacheSave(K, a, z, L, I));
            P = v(a, z, L, M, H, j, i);
            S = N.concat(K).concat(P);
            if (R) {
                I = w(a, z, O, H, R, J);
                S = S.ifEmpty(I)
            }
            N = r(S, Q, H);
            k.ENABLE_DO_NOT_WRAP_LIVE_QUERY && (N = l != null ? l(N) : N);
            H.liveConfigId != null && b("RelayWWWInitialRolloutResolver").enableWWWInitial(H.liveConfigId) && i != null && (N = i(a, z, {
                actor_id: L,
                access_token: M,
                config_id: H.liveConfigId
            }, N));
            k.ENABLE_DO_NOT_WRAP_LIVE_QUERY || (N = l != null ? l(N) : N);
            return s(O, N)
        }
    }

    function r(a, b, c) {
        var d;
        d = (d = c.metadata) == null ? void 0 : d.freshTTLSeconds;
        d = typeof d === "number" ? d : null;
        c = (c = c.metadata) == null ? void 0 : c.cacheTTLSeconds;
        c = typeof c === "number" ? c : null;
        if (d == null && c == null) return a.ifEmpty(b);
        var e = (c = c) != null ? c : Infinity,
            f = (c = d) != null ? c : e;
        f > e;
        return i.create(function(c) {
            var d = !0,
                g = a.subscribe({
                    next: function(a) {
                        a = Array.isArray(a) ? a : [a];
                        for (var a = a, b = Array.isArray(a), g = 0, a = b ? a : a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                            var h, i;
                            if (b) {
                                if (g >= a.length) break;
                                i = a[g++]
                            } else {
                                g = a.next();
                                if (g.done) break;
                                i = g.value
                            }
                            i = i;
                            h = typeof((h = i.extensions) == null ? void 0 : h.cacheTimestamp) === "number" ? (h = i.extensions) == null ? void 0 : h.cacheTimestamp : null;
                            h = h == null ? 0 : (Date.now() - h) / 1e3;
                            var j = h <= e;
                            h = h <= f && j;
                            h && (d = !1);
                            j && c.next(i)
                        }
                    },
                    error: c.error,
                    complete: function() {
                        d ? g = b.subscribe(c) : c.complete()
                    }
                });
            return function() {
                g.unsubscribe()
            }
        })
    }

    function s(a, b) {
        var c;
        return b["do"]({
            start: function() {
                c = l.profile("fetchRelayQuery", a)
            },
            next: function(b) {
                var d;
                if (!Array.isArray(b) && ((d = b.extensions) == null ? void 0 : d.server_metadata) != null && ((d = b.extensions.server_metadata) == null ? void 0 : d.request_start_time_ms) != null && ((d = b.extensions.server_metadata) == null ? void 0 : d.time_at_flush_ms) != null) {
                    d = b.extensions.server_metadata;
                    b = d.request_start_time_ms;
                    d = d.time_at_flush_ms;
                    a.serverTimestamp = {
                        startTime: Number(b),
                        endTime: Number(d)
                    }
                }
                c.stop()
            },
            error: function(a) {
                c.stop(a)
            }
        })
    }

    function t(a, c, d, e, f, h, j, k) {
        if (!n(a)) return i.create(function(a) {
            return a.complete()
        });
        var l = p(a);
        f = f != null && f.metadata != null && f.metadata.prefetchedResponseProvider || void 0;
        f != null && (typeof f.get === "function" || g(0, 2666), f = f);
        f = (f = f) != null ? f : b("RelayPrefetchedResponseProvider");
        f = f.get(h, l, c, a.name, k);
        return f.map(function(a) {
            j != null && j({
                prefetched: !0
            });
            d.usedPrefetcher = !0;
            e && e.set(l, c, a);
            return a
        })
    }

    function u(a, b, c, d, e, f, g, h) {
        if (g == null) return i.create(function(a) {
            return a.complete()
        });
        c = g.cache.getResponse(a, b, c, g, h);
        return c.map(function(c) {
            f != null && f({
                cachedOnDisk: !0
            });
            d.usedDiskCache = !0;
            e && e.set(p(a), b, c);
            return c
        })
    }

    function v(a, c, d, e, f, h, j) {
        if (f.liveConfigId != null && (!b("RelayWWWInitialRolloutResolver").enableWWWInitial(f.liveConfigId) || j == null)) {
            h != null || g(0, 37288, f.liveConfigId);
            return h(a, c, {
                actor_id: d,
                access_token: e,
                config_id: f.liveConfigId
            })
        }
        return i.create(function(a) {
            return a.complete()
        })
    }

    function w(a, b, c, d, e, f) {
        return i.create(function(g) {
            if (n(a) && !d.force) {
                var h = e.get(p(a), b);
                h && (f != null && f({
                    cached: !0
                }), c.usedCache = !0, g.next(h))
            }
            g.complete()
        })
    }

    function x(a, b, c, d) {
        return a["do"]({
            next: function(a) {
                m(b) ? d.clear() : d.set(p(b), c, a)
            }
        })
    }

    function y(a, c, d, e, f, g, h, k, l, n, p, q, r) {
        p === void 0 && (p = !1);
        r === void 0 && (r = !1);
        return i.create(function(s) {
            (!m(e) || k == null) && (k = function() {
                return i.from(null)
            }), k().subscribe({
                next: function(i) {
                    var k = new(b("RelayAPIRequest"))(a, l, n).setMethod("POST").setSkipRetry(m(e)).setTrackingName("RelayFBNetwork_" + e.name).setTransportBuilder(c).setErrorHandler(function(a) {
                        var c;
                        s.error(b("RelayGraphQLRequestUtils").createErrorFromXHR(a, "Network request encountered error " + (((c = a.errorType) != null ? c : "") + " ") + (((c = a.errorCode) != null ? c : "") + ": " + ((c = a.errorMsg) != null ? c : ""))))
                    }).setTimeoutHandler(function() {
                        s.error(j.createWarning("NetworkTimeoutError", "Network request timed out. %s(%s)", e.name, e.id || ""))
                    });
                    q && k.setPerformanceLogger(q);
                    r ? k.setResponseBatchChunkHandler(function(a) {
                        var c = [],
                            d;
                        for (var a = a, f = Array.isArray(a), g = 0, a = f ? a : a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                            var h;
                            if (f) {
                                if (g >= a.length) break;
                                h = a[g++]
                            } else {
                                g = a.next();
                                if (g.done) break;
                                h = g.value
                            }
                            h = h;
                            var i = h.responseText;
                            h = h.isComplete;
                            d = d || h;
                            h = void 0;
                            try {
                                b("DTSGParser").updateFromAsyncResponse(i), h = b("RelayGraphQLRequestUtils").parsePayload(i)
                            } catch (a) {
                                c.length > 0 && s.next(c);
                                return s.error(a)
                            }
                            if (h == null) {
                                c.length > 0 && s.next(c);
                                return s.error(j.createWarning("EmptyResponseError", "Parsed network response is empty. %s(%s)", e.name, e.id || ""))
                            }
                            if (h.errors)
                                for (var i = h.errors, k = Array.isArray(i), l = 0, i = k ? i : i[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                                    var m;
                                    if (k) {
                                        if (l >= i.length) break;
                                        m = i[l++]
                                    } else {
                                        l = i.next();
                                        if (l.done) break;
                                        m = l.value
                                    }
                                    m = m;
                                    if (m.severity === "CRITICAL") {
                                        c.length > 0 && s.next(c);
                                        return s.error(b("RelayGraphQLRequestUtils").createErrorFromPayload(m))
                                    }
                                }
                            Array.isArray(h) ? c.push.apply(c, h) : c.push(h)
                        }
                        c.length > 0 && s.next(c);
                        d && s.complete()
                    }) : k.setResponseChunkHandler(function(a, c, d) {
                        var f;
                        try {
                            b("DTSGParser").updateFromAsyncResponse(a), f = b("RelayGraphQLRequestUtils").parsePayload(a)
                        } catch (a) {
                            return s.error(a)
                        }
                        if (!f) return s.error(j.createWarning("EmptyResponseError", "Parsed network response is empty. %s(%s)", e.name, e.id || ""));
                        if (f.errors)
                            for (var c = f.errors, a = Array.isArray(c), g = 0, c = a ? c : c[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
                                var h;
                                if (a) {
                                    if (g >= c.length) break;
                                    h = c[g++]
                                } else {
                                    g = c.next();
                                    if (g.done) break;
                                    h = g.value
                                }
                                h = h;
                                if (h.severity === "CRITICAL") return s.error(b("RelayGraphQLRequestUtils").createErrorFromPayload(h))
                            }
                        s.next(f);
                        d && s.complete()
                    });
                    var t = babelHelpers["extends"]({}, h, b("getAsyncParams")("POST"), {
                        fb_api_caller_class: "RelayModern",
                        fb_api_req_friendly_name: e.name,
                        variables: JSON.stringify(f),
                        server_timestamps: !0
                    });
                    p && delete t.__csr;
                    e.id ? t.doc_id = e.id : t.doc = b("nullthrows")(e.text, "RelayFBNetwork: A query should have either an id or text, found neither.");
                    i != null && i.length > 0 && (t.fb_api_analytics_tags = JSON.stringify(i));
                    g != null ? k.setRawData(o(g, t)) : k.setData(t).setRequestHeaders(babelHelpers["extends"]({
                        "Content-Type": "application/x-www-form-urlencoded",
                        "X-FB-Friendly-Name": e.name
                    }, d));
                    return k.send().abort
                }
            })
        })
    }
    e.exports = c
}), null);
__d("RelayRTIGraphQLSubscriber", ["invariant", "CurrentUser", "GQLSManager", "Promise", "RTISubscriptionManagerConfig", "Random", "RelayRTIUtils", "RelayRuntime", "StreamStateMachineConstants", "gkx"], (function(a, b, c, d, e, f, g, h) {
    "use strict";
    var i = "no_logging",
        j = "custom_logging",
        k = "workplace_logging",
        l = "gqls_workplace_logging_relay",
        m = "default_logging",
        n = "gqls_default_logging_relay",
        o = 1e3,
        p = 100,
        q = 100;
    new Set();

    function a(a, b, c, d, e, f) {
        return r(a, b, c, e, f)["do"]({
            next: function() {
                d && d.clear()
            }
        })
    }

    function r(a, b, e, f, g) {
        var l, n = (l = b.metadata) == null ? void 0 : l.subscriptionName;
        typeof n === "string" || h(0, 13280, b.name);
        l = "gqls/" + n + "/";
        var r = c("GQLSManager").getSubscriptionType(l);
        l = e.input["%options"];
        l = (l == null ? void 0 : l.client_logged_context) == null ? i : j;
        l === i && (c("gkx")("1383502") && c("Random").coinflip(p) && (l = k));
        l === i && ((c("gkx")("1388683") || c("gkx")("1382775") && c("Random").coinflip(o)) && (l = m));
        n === "work_availability_status_fanout_subscribe" && l === i && (c("gkx")("1809663") && c("Random").coinflip(q) && (l = m));
        var s = w(l, e);
        d("RelayRTIUtils").maybeLaunchGraphQLSubscriptionsFleetBeacon(n);
        return x(a, b, e, l, f, g)["do"]({
            start: function() {
                d("RelayRTIUtils").logSubscriptionEvent("client_subscribe", n, e, s, r, b.id)
            },
            next: function() {
                d("RelayRTIUtils").logSubscriptionEvent("receivepayload", n, e, s, r, b.id)
            },
            unsubscribe: function() {
                d("RelayRTIUtils").logSubscriptionEvent("client_unsubscribe", n, e, s, r, b.id)
            }
        })
    }

    function s(a, b, c, e) {
        if (a != null) {
            b = d("RelayRTIUtils").computeRoutingHint(a, c.input);
            b != null && (e.routing_hint = b)
        }
        b = d("RelayRTIUtils").experimentPegasusResumptionGroup(a);
        b !== "" && (e.resumption_group_name = b);
        c.input.client_subscription_id != null && (e.requestId = c.input.client_subscription_id)
    }

    function t(a, b) {
        return a == null ? null : {
            requestId: b,
            forceLogContext: a
        }
    }

    function u(a, e, f, g, h) {
        g === void 0 && (g = null);
        return d("RelayRuntime").Observable.create(function(i) {
            var j = a.id;
            if (typeof j != "string") {
                var k = new Error("Found illegal docID in subscribeWithMobileStyleTopicTransform");
                k.stack;
                throw k
            }
            k = {
                doc_id: j
            };
            ((j = c("RTISubscriptionManagerConfig").is_intern) != null ? j : !1) && (k.www_tier = "intern");
            g != null && g != c("CurrentUser").getID() && (k.page_id = g);
            j = a.metadata.subscriptionName;
            if (typeof j != "string") {
                var l = new Error("Found null useCase in subscribeWithMobileStyleTopicTransform");
                l.stack;
                throw l
            }
            s(j, a.name, e, k);
            l = (l = e["%options"]) != null ? l : {};
            l.useOSSResponseFormat = !0;
            f != null && (l.client_logged_context = f);
            l.client_has_ods_usecase_counters = !0;
            l = babelHelpers["extends"]({
                context: babelHelpers["extends"]({}, e, {
                    "%options": l
                }),
                gqlsLifecycleHandler: function(a) {
                    a === d("StreamStateMachineConstants").events.GQLS_STATE_TRANSIT_ON_ACTIVE && h && h();
                    return new(b("Promise"))(function(a) {
                        return a()
                    })
                }
            }, k ? {
                headers: k
            } : {});
            k = t(f, e.input.client_subscription_id);
            k != null && (l = babelHelpers["extends"]({}, l, {
                instrumentationData: k
            }));
            var m = c("GQLSManager").subscribeViaRequestStreamWithMobileStyleTopicTransform(j, function(a) {
                try {
                    a = y(a);
                    i.next(a)
                } catch (a) {
                    i.error(a)
                }
            }, l);
            return function() {
                return m && m.unsubscribe()
            }
        })
    }

    function v(a) {
        var b = a.input;
        a = babelHelpers.objectWithoutPropertiesLoose(a, ["input"]);
        b["%options"];
        b = babelHelpers.objectWithoutPropertiesLoose(b, ["%options"]);
        return babelHelpers["extends"]({}, a, {
            input: b
        })
    }

    function w(a, b) {
        var c = null;
        a == k ? c = l : a == m ? c = n : a == j && (c = b.input["%options"].client_logged_context);
        return c
    }

    function x(a, b, c, d, e, f) {
        a = v(c);
        d = w(d, c);
        return u(b, a, d, e, f)
    }

    function y(a) {
        if (typeof a === "string") return JSON.parse(a);
        else if (typeof a === "object" && (a == null ? void 0 : a.hasOwnProperty("payload")) && typeof(a == null ? void 0 : a.payload) === "string" && (a == null ? void 0 : a.hasOwnProperty("topic")) && typeof(a == null ? void 0 : a.topic) === "string") return JSON.parse(a.payload);
        else {
            a = new Error("Relay client received an invalid GQLS payload");
            a.stack;
            throw a
        }
    }
    g.subscribeWithURIWithLoggingWithCacheInvalidation = a;
    g.subscribeWithMobileStyleTopicTransform = u
}), 98);
__d("RelayFBSubscribeFunction", ["GQLSHeartbeatConfig", "RelayAPIConfig", "RelayRTIGraphQLSubscriber", "RelayRuntime"], (function(a, b, c, d, e, f) {
    "use strict";
    var g = b("GQLSHeartbeatConfig").heartbeat_interval,
        h = b("RelayRTIGraphQLSubscriber").subscribeWithURIWithLoggingWithCacheInvalidation;
    b("RelayRuntime").Observable;

    function a(a, c, d, e, f) {
        if (b("RelayAPIConfig").subscriptionTopicURI == null) throw new Error("RelayFBSubscribeFunction: `RelayAPIConfig.subscriptionTopicURI` should not be null on www");
        c["%options"] && c["%options"].heartbeat && (c["%options"].heartbeat = {
            interval: g
        });
        return h(b("RelayAPIConfig").subscriptionTopicURI, a, c, d, e, f)
    }
    e.exports = a
}), null);
__d("createRelayFBSubscribeFunction", ["RelayFBSubscribeFunction"], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        var c = a.queryResponseCache,
            d = a.actorID;
        return function(a, e, f) {
            f = f == null ? void 0 : f.onSubscribe;
            return b("RelayFBSubscribeFunction")(a, e, c, d, f)
        }
    }
    e.exports = a
}), null);
__d("getRelayFBMissingFieldHandlers", ["relay-runtime"], (function(a, b, c, d, e, f) {
    "use strict";
    var g = b("relay-runtime").ROOT_TYPE;

    function a() {
        return [{
            kind: "linked",
            handle: function(a, b, c) {
                if (b != null && b.__typename === g && a.name === "node" && Object.prototype.hasOwnProperty.call(c, "id")) return c.id
            }
        }, {
            kind: "linked",
            handle: function(a, b, c, d) {
                if (b != null && b.__typename === g && a.name.startsWith("fetch__") && Object.prototype.hasOwnProperty.call(c, "id")) {
                    b = c.id;
                    c = d.get(b);
                    if (c != null && c.getType() === a.name.substr(7)) return b
                }
            }
        }, {
            kind: "pluralLinked",
            handle: function(a, b, c) {
                if (b != null && b.__typename === g && a.name === "nodes" && Object.prototype.hasOwnProperty.call(c, "ids")) return c.ids
            }
        }]
    }
    e.exports = a
}), null);
__d("relayFBGetDataID", ["relay-runtime"], (function(a, b, c, d, e, f) {
    "use strict";
    var g = b("relay-runtime").VIEWER_ID,
        h = b("relay-runtime").VIEWER_TYPE;

    function a(a, b) {
        if (b === h) return g;
        return b === "MessagingParticipant" || b === "BlockedUser" || b === "SRTUser" ? a.id == null ? null : b + ":" + a.id : a.id
    }
    e.exports = a
}), null);
__d("react-relay/assertFragmentMap", ["invariant"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a(a, b) {
        b && typeof b === "object" || g(0, 5879, a, b);
        for (var c in b)
            if (Object.prototype.hasOwnProperty.call(b, c)) {
                var d = b[c];
                d && (typeof d === "object" || typeof d === "function") || g(0, 5880, a, c, d)
            }
    }
    e.exports = a
}), null);