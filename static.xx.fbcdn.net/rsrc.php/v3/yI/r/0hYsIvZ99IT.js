if (self.CavalryLogger) {
    CavalryLogger.start_js_script(document.currentScript);
} /*FB_PKG_DELIM*/

__d("ChannelConstants", [], (function(a, b, c, d, e, f) {
    var g = "channel/";
    a = {
        CHANNEL_MANUAL_RECONNECT_DEFER_MSEC: 2e3,
        MUTE_WARNING_TIME_MSEC: 25e3,
        WARNING_COUNTDOWN_THRESHOLD_MSEC: 15e3,
        ON_SHUTDOWN: g + "shutdown",
        ON_INVALID_HISTORY: g + "invalid_history",
        ON_CONFIG: g + "config",
        ON_ENTER_STATE: g + "enter_state",
        ON_EXIT_STATE: g + "exit_state",
        ATTEMPT_RECONNECT: g + "attempt_reconnect",
        RTI_SESSION: g + "new_rti_address",
        CONSOLE_LOG: g + "message:console_log",
        GET_RTI_SESSION_REQUEST: g + "rti_session_request",
        SKYWALKER: g + "skywalker",
        CHANNEL_ESTABLISHED: g + "established",
        OK: "ok",
        ERROR: "error",
        ERROR_MAX: "error_max",
        ERROR_MISSING: "error_missing",
        ERROR_MSG_TYPE: "error_msg_type",
        ERROR_SHUTDOWN: "error_shutdown",
        ERROR_STALE: "error_stale",
        SYS_OWNER: "sys_owner",
        SYS_NONOWNER: "sys_nonowner",
        SYS_ONLINE: "sys_online",
        SYS_OFFLINE: "sys_offline",
        SYS_TIMETRAVEL: "sys_timetravel",
        HINT_AUTH: "shutdown auth",
        HINT_CONN: "shutdown conn",
        HINT_DISABLED: "shutdown disabled",
        HINT_INVALID_STATE: "shutdown invalid state",
        HINT_MAINT: "shutdown maint",
        HINT_UNSUPPORTED: "shutdown unsupported",
        reason_Unknown: 0,
        reason_AsyncError: 1,
        reason_TooLong: 2,
        reason_Refresh: 3,
        reason_RefreshDelay: 4,
        reason_UIRestart: 5,
        reason_NeedSeq: 6,
        reason_PrevFailed: 7,
        reason_IFrameLoadGiveUp: 8,
        reason_IFrameLoadRetry: 9,
        reason_IFrameLoadRetryWorked: 10,
        reason_PageTransitionRetry: 11,
        reason_IFrameLoadMaxSubdomain: 12,
        reason_NoChannelInfo: 13,
        reason_NoChannelHost: 14,
        CAPABILITY_VOIP_INTEROP: 8,
        CAPABILITY_ACTIVE_ON_DESKTOP_APP: 16384,
        CAPABILITY_PLAYING_INSTANT_GAME: 2097152,
        FANTAIL_SERVICE: "WebchatClient",
        SUBSCRIBE: "subscribe",
        UNSUBSCRIBE: "unsubscribe",
        FAKE_DFF: "fake_dff",
        THROTTLED: g + "throttled",
        JUMPSTART: g + "jumpstart",
        ENTITY_PRESENCE_ACTIVE_PING: "entity_presence/active_ping",
        ENTITY_PRESENCE_SKIPPED_PING: "entity_presence/skipped_ping",
        SUBSCRIPTION_STATE: {
            SUBSCRIBE: "s",
            MUTATE_CONTEXT: "m",
            UNSUBSCRIBE: "u"
        },
        DEFAULT_MAX_SUBSCRIPTIONS: 300,
        DEFAULT_EVICTION_BATCH_SIZE: 20,
        DEFAULT_MAX_SUBSCRIPTION_FLUSH_BATCH_SIZE: 300,
        DEFAULT_MAX_CONSECUTIVE_FLUSH_FAILURES: 3,
        getArbiterType: function(a) {
            return g + "message:" + a
        },
        getRTISkywalkerArbiterType: function(a, b) {
            return g + "skywalker:" + a + ":" + b
        }
    };
    e.exports = a
}), null);
__d("PresenceConfig", ["PresenceConfigInitialData"], (function(a, b, c, d, e, f, g) {
    var h = babelHelpers["extends"]({}, c("PresenceConfigInitialData"));

    function a(a, b) {
        return a in h ? h[a] : b
    }
    g.get = a
}), 98);
__d("PageHooks", ["Arbiter", "ErrorUtils", "InitialJSLoader", "PageEvents"], (function(a, b, c, d, e, f) {
    var g;
    f = {
        DOMREADY_HOOK: "domreadyhooks",
        ONLOAD_HOOK: "onloadhooks"
    };

    function h() {
        var c = a.CavalryLogger;
        !window.domready && c && c.getInstance().setTimeStamp("t_prehooks");
        k(l.DOMREADY_HOOK);
        !window.domready && c && c.getInstance().setTimeStamp("t_hooks");
        window.domready = !0;
        b("Arbiter").inform("uipage_onload", !0, "state")
    }

    function i() {
        k(l.ONLOAD_HOOK), window.loaded = !0
    }

    function j(a, c) {
        return (g || (g = b("ErrorUtils"))).applyWithGuard(a, null, null, function(a) {
            a.event_type = c, a.category = "runhook"
        }, "PageHooks:" + c)
    }

    function k(a) {
        var b = a == "onbeforeleavehooks" || a == "onbeforeunloadhooks";
        do {
            var c = window[a];
            if (!c) break;
            b || (window[a] = null);
            for (var d = 0; d < c.length; d++) {
                var e = j(c[d], a);
                if (b && e) return e
            }
        } while (!b && window[a])
    }

    function c() {
        window.domready || (window.domready = !0, k("onloadhooks")), window.loaded || (window.loaded = !0, k("onafterloadhooks"))
    }

    function d() {
        var a, c;
        (a = b("Arbiter")).registerCallback(h, [(c = b("PageEvents")).BIGPIPE_DOMREADY, b("InitialJSLoader").INITIAL_JS_READY]);
        a.registerCallback(i, [c.BIGPIPE_DOMREADY, c.BIGPIPE_ONLOAD, b("InitialJSLoader").INITIAL_JS_READY]);
        a.subscribe(c.NATIVE_ONBEFOREUNLOAD, function(a, b) {
            b.warn = k("onbeforeleavehooks") || k("onbeforeunloadhooks"), b.warn || (window.domready = !1, window.loaded = !1)
        }, "new");
        a.subscribe(c.NATIVE_ONUNLOAD, function(a, b) {
            k("onunloadhooks"), k("onafterunloadhooks")
        }, "new")
    }
    var l = babelHelpers["extends"]({
        _domreadyHook: h,
        _onloadHook: i,
        runHook: j,
        runHooks: k,
        keepWindowSetAsLoaded: c
    }, f);
    d();
    a.PageHooks = e.exports = l
}), null);
__d("legacy:onload-action", ["PageHooks"], (function(a, b, c, d, e, f) {
    a._domreadyHook = (c = b("PageHooks"))._domreadyHook;
    a._onloadHook = c._onloadHook;
    a.runHook = c.runHook;
    a.runHooks = c.runHooks;
    a.keep_window_set_as_loaded = c.keepWindowSetAsLoaded
}), 3);
__d("Base64", [], (function(a, b, c, d, e, f) {
    var g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    function h(a) {
        a = a.charCodeAt(0) << 16 | a.charCodeAt(1) << 8 | a.charCodeAt(2);
        return String.fromCharCode(g.charCodeAt(a >>> 18), g.charCodeAt(a >>> 12 & 63), g.charCodeAt(a >>> 6 & 63), g.charCodeAt(a & 63))
    }
    var i = ">___?456789:;<=_______\0\x01\x02\x03\x04\x05\x06\x07\b\t\n\v\f\r\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19______\x1a\x1b\x1c\x1d\x1e\x1f !\"#$%&'()*+,-./0123";

    function j(a) {
        a = i.charCodeAt(a.charCodeAt(0) - 43) << 18 | i.charCodeAt(a.charCodeAt(1) - 43) << 12 | i.charCodeAt(a.charCodeAt(2) - 43) << 6 | i.charCodeAt(a.charCodeAt(3) - 43);
        return String.fromCharCode(a >>> 16, a >>> 8 & 255, a & 255)
    }
    var k = {
        encode: function(a) {
            a = unescape(encodeURI(a));
            var b = (a.length + 2) % 3;
            a = (a + "\0\0".slice(b)).replace(/[\s\S]{3}/g, h);
            return a.slice(0, a.length + b - 2) + "==".slice(b)
        },
        decode: function(a) {
            a = a.replace(/[^A-Za-z0-9+\/]/g, "");
            var b = a.length + 3 & 3;
            a = (a + "AAA".slice(b)).replace(/..../g, j);
            a = a.slice(0, a.length + b - 3);
            try {
                return decodeURIComponent(escape(a))
            } catch (a) {
                throw new Error("Not valid UTF-8")
            }
        },
        encodeObject: function(a) {
            return k.encode(JSON.stringify(a))
        },
        decodeObject: function(a) {
            return JSON.parse(k.decode(a))
        },
        encodeNums: function(a) {
            return String.fromCharCode.apply(String, a.map(function(a) {
                return g.charCodeAt((a | -(a > 63 ? 1 : 0)) & -(a > 0 ? 1 : 0) & 63)
            }))
        }
    };
    a = k;
    f["default"] = a
}), 66);
__d("XLynxAsyncCallbackControllerRouteBuilder", ["jsRouteBuilder"], (function(a, b, c, d, e, f, g) {
    a = c("jsRouteBuilder")("/si/linkclick/ajax_callback/", Object.freeze({}), void 0);
    b = a;
    g["default"] = b
}), 98);
__d("FBLynxLogging", ["AsyncRequest", "ODS", "XLynxAsyncCallbackControllerRouteBuilder"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a(a) {
        var b = c("XLynxAsyncCallbackControllerRouteBuilder").buildURL({});
        new(c("AsyncRequest"))(b).setData({
            lynx_uri: a
        }).setErrorHandler(function(a) {
            a = a.getError();
            d("ODS").bumpEntityKey(3861, "linkshim", "click_log.post.fail." + a)
        }).setTransportErrorHandler(function(a) {
            a = a.getError();
            d("ODS").bumpEntityKey(3861, "linkshim", "click_log.post.transport_fail." + a)
        }).send()
    }
    g.log = a
}), 98);
__d("FBLynxBase", ["$", "FBLynxLogging", "LinkshimHandlerConfig", "URI", "isLinkshimURI"], (function(a, b, c, d, e, f) {
    "use strict";
    var g;

    function h(a) {
        if (!b("isLinkshimURI")(a)) return null;
        a = a.getQueryData().u;
        return !a ? null : a
    }
    var i = {
        logAsyncClick: function(a) {
            i.swapLinkWithUnshimmedLink(a);
            a = a.getAttribute("data-lynx-uri");
            if (!a) return;
            b("FBLynxLogging").log(a)
        },
        originReferrerPolicyClick: function(a) {
            var c = b("$")("meta_referrer");
            c.content = b("LinkshimHandlerConfig").switched_meta_referrer_policy;
            i.logAsyncClick(a);
            setTimeout(function() {
                c.content = b("LinkshimHandlerConfig").default_meta_referrer_policy
            }, 100)
        },
        swapLinkWithUnshimmedLink: function(a) {
            var c = a.href,
                d = h(new(g || (g = b("URI")))(c));
            if (!d) return;
            a.setAttribute("data-lynx-uri", c);
            a.href = d
        },
        revertSwapIfLynxURIPresent: function(a) {
            var b = a.getAttribute("data-lynx-uri");
            if (!b) return;
            a.removeAttribute("data-lynx-uri");
            a.href = b
        }
    };
    e.exports = i
}), null);
__d("FBLynx", ["Base64", "Event", "FBLynxBase", "LinkshimHandlerConfig", "Parent", "URI"], (function(a, b, c, d, e, f) {
    "use strict";
    var g, h = (g || (g = b("URI"))).goURIOnWindow,
        i = {
            alreadySetup: !1,
            setupDelegation: function(a) {
                a === void 0 && (a = !1);
                if (!document.documentElement) return;
                if (document.body == null) {
                    if (a) return;
                    window.setTimeout(function() {
                        i.setupDelegation(!0)
                    }, 100);
                    return
                }
                if (i.alreadySetup) return;
                i.alreadySetup = !0;
                var c = function(a) {
                    var c = i.getMaybeLynxLink(a.target);
                    if (!c) return;
                    var d = c[0];
                    c = c[1];
                    var e = c,
                        f = new(g || (g = b("URI")))(c.href),
                        j;
                    if (b("LinkshimHandlerConfig").ghl_param_link_shim && d !== "hover" && (c.dataset && c.dataset.attributes)) {
                        j = b("Base64").decodeObject(c.dataset.attributes);
                        if (j && j.open_link) {
                            var k;
                            for (k in j) k !== "open_link" && f.addQueryData(k, j[k]);
                            k = c.cloneNode(!0);
                            k.href = f.toString();
                            e = k
                        }
                    }
                    switch (d) {
                        case "async":
                        case "asynclazy":
                            b("FBLynxBase").logAsyncClick(e);
                            break;
                        case "origin":
                            b("FBLynxBase").originReferrerPolicyClick(e);
                            break;
                        case "hover":
                            i.hoverClick(e);
                            break
                    }
                    b("LinkshimHandlerConfig").ghl_param_link_shim && d !== "hover" && j && j.open_link && (a.preventDefault(), h(f, window.open("", e.target), !0))
                };
                b("Event").listen(document.body, "click", c);
                b("LinkshimHandlerConfig").middle_click_requires_event && b("Event").listen(document.body, "mouseup", function(a) {
                    a.button == 1 && c(a)
                });
                b("Event").listen(document.body, "mouseover", function(a) {
                    a = i.getMaybeLynxLink(a.target);
                    if (!a) return;
                    var b = a[0];
                    a = a[1];
                    switch (b) {
                        case "async":
                        case "asynclazy":
                        case "origin":
                        case "hover":
                            i.mouseover(a);
                            break
                    }
                });
                b("Event").listen(document.body, "contextmenu", function(a) {
                    a = i.getMaybeLynxLink(a.target);
                    if (!a) return;
                    var b = a[0];
                    a = a[1];
                    switch (b) {
                        case "async":
                        case "hover":
                        case "origin":
                            i.contextmenu(a);
                            break;
                        case "asynclazy":
                            break
                    }
                })
            },
            getMaybeLynxLink: function(a) {
                a = b("Parent").byAttribute(a, "data-lynx-mode");
                if (a instanceof HTMLAnchorElement) {
                    var c = a.getAttribute("data-lynx-mode");
                    switch (c) {
                        case "async":
                        case "asynclazy":
                        case "hover":
                        case "origin":
                            return [c, a];
                        default:
                            return null
                    }
                }
                return null
            },
            hoverClick: function(a) {
                b("FBLynxBase").revertSwapIfLynxURIPresent(a)
            },
            mouseover: function(a) {
                b("FBLynxBase").swapLinkWithUnshimmedLink(a)
            },
            contextmenu: function(a) {
                b("FBLynxBase").revertSwapIfLynxURIPresent(a)
            }
        };
    e.exports = i
}), null);
__d("FBIDCheck", [], (function(a, b, c, d, e, f) {
    "use strict";
    var g = /^[1-9]\d*$/;

    function a(a) {
        a = a;
        if (a == null || typeof a === "string" && !g.test(a)) return !1;
        a = parseInt(a, 10);
        return !a ? !1 : a > 0 && a < 22e8 || a >= 1e14 && a <= 100099999989999 || a >= 89e12 && a <= 89999999999999 || a >= 6000001e7 && a <= 60000019999999
    }
    f.isUser_deprecated = a
}), 66);
__d("FocusEvent", ["Event", "Run", "ge", "getOrCreateDOMID"], (function(a, b, c, d, e, f, g) {
    "use strict";
    var h = {},
        i = !1;

    function j(a, b) {
        if (h[a]) {
            b = h[a].indexOf(b);
            b >= 0 && h[a].splice(b, 1);
            h[a].length === 0 && delete h[a]
        }
    }

    function k(a) {
        var b = a.getTarget();
        if (h[b.id] && h[b.id].length > 0) {
            var c = a.type === "focusin" || a.type === "focus";
            h[b.id].forEach(function(a) {
                a(c)
            })
        }
    }

    function l() {
        if (i) return;
        c("Event").listen(document.documentElement, "focusout", k);
        c("Event").listen(document.documentElement, "focusin", k);
        i = !0
    }

    function a(a, b) {
        l();
        var e = c("getOrCreateDOMID")(a);
        h[e] || (h[e] = []);
        h[e].push(b);
        var f = !1;

        function g() {
            f || (j(e, b), i && (i.remove(), i = null), f = !0)
        }
        var i = d("Run").onLeave(function() {
            c("ge")(e) || g()
        });
        return {
            remove: function() {
                g()
            }
        }
    }
    g.listen = a
}), 98);
__d("isStringNullOrEmpty", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        return a == null || a === ""
    }
    f["default"] = a
}), 66);
__d("tooltipPropsFor", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a, b, c) {
        if (!a) return {};
        a = {
            "data-tooltip-content": a,
            "data-hover": "tooltip"
        };
        b && (a["data-tooltip-position"] = b);
        c && (a["data-tooltip-alignh"] = c);
        return a
    }
    f["default"] = a
}), 66);
__d("TooltipData", ["DOM", "DataStore", "FBLogger", "URI", "getElementText", "ifRequired", "isStringNullOrEmpty", "isTextNode", "killswitch", "tooltipPropsFor"], (function(a, b, c, d, e, f) {
    var g;

    function h(a) {
        var c = a.getAttribute("data-tooltip-delay");
        c = c ? parseInt(c, 10) || 1e3 : 0;
        if (b("killswitch")("TOOLTIP_SEPARATE_DATASTORE_AND_ATTRIBUTE_CONTENT")) return babelHelpers["extends"]({
            className: a.getAttribute("data-tooltip-root-class"),
            content: a.getAttribute("data-tooltip-content"),
            delay: c,
            position: a.getAttribute("data-tooltip-position") || "above",
            alignH: a.getAttribute("data-tooltip-alignh") || "left",
            offsetY: a.getAttribute("data-tooltip-offsety") || 0,
            suppress: !1,
            overflowDisplay: a.getAttribute("data-tooltip-display") === "overflow",
            persistOnClick: a.getAttribute("data-pitloot-persistonclick"),
            textDirection: a.getAttribute("data-tooltip-text-direction")
        }, b("DataStore").get(a, "tooltip"));
        else {
            var d;
            d = (d = b("DataStore").get(a, "tooltip")) != null ? d : {};
            var e = d.content;
            d = babelHelpers.objectWithoutPropertiesLoose(d, ["content"]);
            var f = a.getAttribute("data-tooltip-content");
            !b("isStringNullOrEmpty")(e) && !b("isStringNullOrEmpty")(f) && b("FBLogger")("tooltip").warn('Getting DataStore tooltip content on an element that has both a "data-tooltip-content" attribute value (set to %s) and a value coming from the DataStore', a.getAttribute("data-tooltip-content"));
            return babelHelpers["extends"]({
                className: a.getAttribute("data-tooltip-root-class"),
                delay: c,
                position: a.getAttribute("data-tooltip-position") || "above",
                alignH: a.getAttribute("data-tooltip-alignh") || "left",
                offsetY: a.getAttribute("data-tooltip-offsety") || 0,
                suppress: !1,
                overflowDisplay: a.getAttribute("data-tooltip-display") === "overflow",
                persistOnClick: a.getAttribute("data-pitloot-persistonclick"),
                textDirection: a.getAttribute("data-tooltip-text-direction"),
                content: (a = (c = f) != null ? c : e) != null ? a : null
            }, d)
        }
    }

    function i(a, c) {
        var d = h(a);
        if (b("killswitch")("TOOLTIP_SEPARATE_DATASTORE_AND_ATTRIBUTE_CONTENT")) b("DataStore").set(a, "tooltip", {
            content: c.content || d.content,
            position: c.position || d.position,
            alignH: c.alignH || d.alignH,
            suppress: c.suppress !== void 0 ? c.suppress : d.suppress,
            overflowDisplay: c.overflowDisplay || d.overflowDisplay,
            persistOnClick: c.persistOnClick || d.persistOnClick
        });
        else {
            !b("isStringNullOrEmpty")(c.content) && !b("isStringNullOrEmpty")(a.getAttribute("data-tooltip-content")) && b("FBLogger")("tooltip").warn('Setting DataStore tooltip content on an element that already has the "data-tooltip-content" attribute (set to %s) is invalid', a.getAttribute("data-tooltip-content"));
            b("DataStore").set(a, "tooltip", {
                content: c.content || ((a = b("DataStore").get(a, "tooltip")) != null ? a : {}).content,
                position: c.position || d.position,
                alignH: c.alignH || d.alignH,
                suppress: c.suppress !== void 0 ? c.suppress : d.suppress,
                overflowDisplay: c.overflowDisplay || d.overflowDisplay,
                persistOnClick: c.persistOnClick || d.persistOnClick
            })
        }
    }

    function j(a, b) {
        i(a, b), a.setAttribute("data-hover", "tooltip")
    }

    function k(a, b) {}
    var l = {
        remove: function(a, c) {
            c = c === void 0 ? {} : c;
            c = c.onlyCleanupDataStore;
            c = c === void 0 ? !1 : c;
            b("DataStore").remove(a, "tooltip");
            c || (a.removeAttribute("data-hover"), a.removeAttribute("data-tooltip-position"), a.removeAttribute("data-tooltip-alignh"), b("ifRequired")("Tooltip", function(b) {
                b.isActive(a) && b.hide()
            }))
        },
        set: function(a, c, d, e) {
            k(a, c);
            if (c instanceof(g || (g = b("URI")))) a.setAttribute("data-tooltip-uri", c), b("ifRequired")("Tooltip", function(b) {
                b.isActive(a) && b.fetchIfNecessary(a)
            });
            else if (b("killswitch")("TOOLTIP_SEPARATE_DATASTORE_AND_ATTRIBUTE_CONTENT")) {
                var f = l._store({
                    context: a,
                    content: c,
                    position: d,
                    alignH: e
                });
                typeof f.content !== "string" ? a.setAttribute("data-tooltip-content", b("getElementText")(f.content)) : a.setAttribute("data-tooltip-content", f.content);
                l.refreshIfActive(a)
            } else a.removeAttribute("data-tooltip-content"), l._store({
                context: a,
                content: c,
                position: d,
                alignH: e
            }), l.refreshIfActive(a)
        },
        refreshIfActive: function(a) {
            b("ifRequired")("Tooltip", function(b) {
                b.isActive(a) && b.show(a)
            })
        },
        _store: function(a) {
            var c = a.context,
                d = a.content,
                e = a.position;
            a = a.alignH;
            k(c, d);
            b("isTextNode")(d) && (d = b("getElementText")(d));
            var f = !1;
            typeof d !== "string" ? d = b("DOM").create("div", {}, d) : f = d === "";
            a = {
                alignH: a,
                content: d,
                position: e,
                suppress: f
            };
            j(c, a);
            return a
        },
        propsFor: b("tooltipPropsFor"),
        enableDisplayOnOverflow: function(a) {
            a.removeAttribute("data-tooltip-display"), j(a, {
                overflowDisplay: !0
            })
        },
        enablePersistOnClick: function(a) {
            a.removeAttribute("data-pitloot-persistOnClick"), j(a, {
                persistOnClick: !0
            })
        },
        suppress: function(a, b) {
            i(a, {
                suppress: b
            })
        },
        _get: h
    };
    e.exports = l
}), null);
__d("Focus", ["cx", "CSS", "Event", "FocusEvent", "KeyStatus", "TooltipData", "ifRequired"], (function(a, b, c, d, e, f, g, h) {
    function a(a, b) {
        b === void 0 && (b = !1);
        if (a) {
            var e = c("ifRequired")("VirtualCursorStatus", function(a) {
                return a.isVirtualCursorTriggered()
            }, function() {
                return !1
            });
            b || d("KeyStatus").isKeyDown() || e ? k(a) : i(a)
        }
    }

    function i(a) {
        if (a) {
            d("CSS").addClass(a, "_5f0v");
            var b = c("Event").listen(a, "blur", function() {
                a && d("CSS").removeClass(a, "_5f0v"), b.remove()
            });
            d("TooltipData").suppress(a, !0);
            k(a);
            d("TooltipData").suppress(a, !1)
        }
    }

    function b(a, b) {
        d("CSS").addClass(a, "_5f0v");
        return d("FocusEvent").listen(a, function() {
            for (var c = arguments.length, d = new Array(c), e = 0; e < c; e++) d[e] = arguments[e];
            return j.apply(void 0, [a, b].concat(d))
        })
    }

    function j(a, b, e) {
        d("CSS").addClass(a, "_5f0v");
        a = c("ifRequired")("FocusRing", function(a) {
            return a.usingKeyboardNavigation()
        }, function() {
            return !0
        });
        e = e && a;
        d("CSS").conditionClass(b, "_3oxt", e);
        d("CSS").conditionClass(b, "_16jm", e)
    }

    function k(a) {
        try {
            a.tabIndex = a.tabIndex, a.focus()
        } catch (a) {}
    }
    g.set = a;
    g.setWithoutOutline = i;
    g.relocate = b;
    g.performRelocation = j
}), 98);
__d("PageTransitions", ["cr:917439"], (function(a, b, c, d, e, f, g) {
    g["default"] = b("cr:917439")
}), 98);
__d("debounceAcrossTransitions", ["debounce"], (function(a, b, c, d, e, f, g) {
    function a(a, b, d) {
        return c("debounce")(a, b, d, !0)
    }
    g["default"] = a
}), 98);
__d("PluginCSSReflowHack", ["Style"], (function(a, b, c, d, e, f, g) {
    function a(a) {
        setTimeout(function() {
            var b = "border-bottom-width",
                d = c("Style").get(a, b);
            c("Style").set(a, b, parseInt(d, 10) + 1 + "px");
            c("Style").set(a, b, d)
        }, 1e3)
    }
    g.trigger = a
}), 98);
__d("VirtualCursorStatus", ["Event", "UserAgent", "emptyFunction", "setImmediate"], (function(a, b, c, d, e, f) {
    var g = null,
        h = null;

    function i() {
        h || (h = b("Event").listen(window, "blur", function() {
            g = null, j()
        }))
    }

    function j() {
        h && (h.remove(), h = null)
    }

    function a(a) {
        g = a.keyCode, i()
    }

    function c() {
        g = null, j()
    }
    if (typeof window !== "undefined" && window.document && window.document.createElement) {
        d = document.documentElement;
        if (d)
            if (d.addEventListener) d.addEventListener("keydown", a, !0), d.addEventListener("keyup", c, !0);
            else if (d.attachEvent) {
            f = d.attachEvent;
            f("onkeydown", a);
            f("onkeyup", c)
        }
    }
    var k = {
            isKeyDown: function() {
                return !!g
            },
            getKeyDownCode: function() {
                return g
            }
        },
        l = !1,
        m = !1,
        n = null,
        o = !1;

    function p(a) {
        var c = new Set(),
            d = k.isKeyDown(),
            e = a.clientX,
            f = a.clientY,
            g = a.isPrimary,
            h = a.isTrusted,
            i = a.offsetX,
            j = a.offsetY,
            n = a.pointerType,
            o = a.mozInputSource,
            p = a.WEBKIT_FORCE_AT_MOUSE_DOWN,
            q = a.webkitForce;
        a = a.target;
        var r = a.clientWidth;
        a = a.clientHeight;
        e === 0 && f === 0 && i >= 0 && j >= 0 && m && h && o == null && c.add("Chrome");
        l && m && !d && q != null && q < p && i === 0 && j === 0 && o == null && c.add("Safari-edge");
        e === 0 && f === 0 && i < 0 && j < 0 && m && o == null && c.add("Safari-old");
        !l && !m && d && g === !1 && h && n === "" && e === 0 && f === 0 && i === 0 && j === 0 && o == null;
        !l && !m && !d && h && b("UserAgent").isBrowser("IE >= 10") && o == null && (e < 0 && f < 0 ? c.add("IE") : (i < 0 || i > r) && (j < 0 || j > a) && c.add("MSIE"));
        o === 0 && h && c.add("Firefox");
        return c
    }

    function q() {
        l = !0, b("setImmediate")(function() {
            l = !1
        })
    }

    function r() {
        m = !0, b("setImmediate")(function() {
            m = !1
        })
    }

    function s(a, c) {
        n === null && (n = p(a));
        o = n.size > 0;
        a = a.target.getAttribute("data-accessibilityid") === "virtual_cursor_trigger";
        c(o, n, a);
        b("setImmediate")(function() {
            o = !1, n = null
        })
    }
    d = {
        isVirtualCursorTriggered: function() {
            return o
        },
        add: function(a, c) {
            c === void 0 && (c = b("emptyFunction"));
            var d = function(a) {
                return s(a, c)
            };
            a.addEventListener("click", d);
            var e = b("Event").listen(a, "mousedown", q),
                f = b("Event").listen(a, "mouseup", r);
            return {
                remove: function() {
                    a.removeEventListener("click", d), e.remove(), f.remove()
                }
            }
        }
    };
    e.exports = d
}), null);
__d("getVendorPrefixedName", ["invariant", "ExecutionEnvironment", "UserAgent", "camelize"], (function(a, b, c, d, e, f, g, h) {
    var i = {},
        j = ["Webkit", "ms", "Moz", "O"],
        k = new RegExp("^(" + j.join("|") + ")"),
        l = d("ExecutionEnvironment").canUseDOM ? document.createElement("div").style : {};

    function m(a) {
        for (var b = 0; b < j.length; b++) {
            var c = j[b] + a;
            if (c in l) return c
        }
        return null
    }

    function n(a) {
        switch (a) {
            case "lineClamp":
                return c("UserAgent").isEngine("WebKit >= 315.14.2") ? "WebkitLineClamp" : null;
            default:
                return null
        }
    }

    function a(a) {
        var b = c("camelize")(a);
        if (i[b] === void 0) {
            var e = b.charAt(0).toUpperCase() + b.slice(1);
            k.test(e) && h(0, 957, a);
            d("ExecutionEnvironment").canUseDOM ? i[b] = b in l ? b : m(e) : i[b] = n(b)
        }
        return i[b]
    }
    g["default"] = a
}), 98);
__d("shield", [], (function(a, b, c, d, e, f) {
    function a(a, b) {
        for (var c = arguments.length, d = new Array(c > 2 ? c - 2 : 0), e = 2; e < c; e++) d[e - 2] = arguments[e];
        if (typeof a !== "function") throw new TypeError("shield expects a function as the first argument");
        return function() {
            return a.apply(b, d)
        }
    }
    f["default"] = a
}), 66);
__d("BrowserSupportCore", ["getVendorPrefixedName"], (function(a, b, c, d, e, f) {
    a = {
        hasCSSAnimations: function() {
            return !!b("getVendorPrefixedName")("animationName")
        },
        hasCSSTransforms: function() {
            return !!b("getVendorPrefixedName")("transform")
        },
        hasCSS3DTransforms: function() {
            return !!b("getVendorPrefixedName")("perspective")
        },
        hasCSSTransitions: function() {
            return !!b("getVendorPrefixedName")("transition")
        }
    };
    c = a;
    f["default"] = c
}), 66);
__d("firstx", ["invariant"], (function(a, b, c, d, e, f, g, h) {
    "use strict";

    function a(a) {
        for (var a = a, b = Array.isArray(a), c = 0, a = b ? a : a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
            var d;
            if (b) {
                if (c >= a.length) break;
                d = a[c++]
            } else {
                c = a.next();
                if (c.done) break;
                d = c.value
            }
            d = d;
            return d
        }
        h(0, 1145)
    }
    g["default"] = a
}), 98);
__d("keyMirror", ["unrecoverableViolation"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a(a) {
        var b = {};
        if (!(a instanceof Object && !Array.isArray(a))) throw c("unrecoverableViolation")("keyMirror(...): Argument must be an object.", "comet_infra");
        for (var d in a) {
            if (!Object.prototype.hasOwnProperty.call(a, d)) continue;
            b[d] = d
        }
        return b
    }
    g["default"] = a
}), 98);
__d("PagesPageActionClickFalcoEvent", ["FalcoLoggerInternal", "getFalcoLogPolicy_DO_NOT_USE"], (function(a, b, c, d, e, f) {
    "use strict";
    a = b("getFalcoLogPolicy_DO_NOT_USE")("1744141");
    c = b("FalcoLoggerInternal").create("pages_page_action_click", a);
    e.exports = c
}), null);
__d("BrowserSupport", ["BrowserSupportCore", "ExecutionEnvironment", "UserAgent_DEPRECATED", "getVendorPrefixedName", "memoize"], (function(a, b, c, d, e, f, g) {
    var h = null;

    function i() {
        if (d("ExecutionEnvironment").canUseDOM) {
            h || (h = document.createElement("div"));
            return h
        }
        return null
    }
    b = function(a) {
        return c("memoize")(function() {
            var b = i();
            return !b ? !1 : a(b)
        })
    };
    e = b(function(a) {
        a.style.cssText = "position:-moz-sticky;position:-webkit-sticky;position:-o-sticky;position:-ms-sticky;position:sticky;";
        return /sticky/.test(a.style.position)
    });
    f = b(function(a) {
        return "scrollSnapType" in a.style || "webkitScrollSnapType" in a.style || "msScrollSnapType" in a.style
    });
    var j = b(function(a) {
        return "scrollBehavior" in a.style
    });
    b = b(function(a) {
        if (!("pointerEvents" in a.style)) return !1;
        a.style.cssText = "pointer-events:auto";
        return a.style.pointerEvents === "auto"
    });
    var k = c("memoize")(function() {
            return !(d("UserAgent_DEPRECATED").webkit() && !d("UserAgent_DEPRECATED").chrome() && d("UserAgent_DEPRECATED").windows()) && "FileList" in window && "FormData" in window
        }),
        l = c("memoize")(function() {
            return !!a.blob
        }),
        m = c("memoize")(function() {
            return d("ExecutionEnvironment").canUseDOM && document.createElementNS && document.createElementNS("http://www.w3.org/2000/svg", "foreignObject").toString().includes("SVGForeignObject")
        }),
        n = c("memoize")(function() {
            return !!window.MutationObserver
        }),
        o = c("memoize")(function() {
            var a = {
                    transition: "transitionend",
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "mozTransitionEnd",
                    OTransition: "oTransitionEnd"
                },
                b = c("getVendorPrefixedName")("transition");
            return a[b] || null
        }),
        p = function() {
            return !!window.CanvasRenderingContext2D
        };
    g.hasCSSAnimations = c("BrowserSupportCore").hasCSSAnimations;
    g.hasCSSTransforms = c("BrowserSupportCore").hasCSSTransforms;
    g.hasCSS3DTransforms = c("BrowserSupportCore").hasCSS3DTransforms;
    g.hasCSSTransitions = c("BrowserSupportCore").hasCSSTransitions;
    g.hasPositionSticky = e;
    g.hasScrollSnapPoints = f;
    g.hasScrollBehavior = j;
    g.hasPointerEvents = b;
    g.hasFileAPI = k;
    g.hasBlobFactory = l;
    g.hasSVGForeignObject = m;
    g.hasMutationObserver = n;
    g.getTransitionEndEvent = o;
    g.hasCanvasRenderingContext2D = p
}), 98);
__d("queryThenMutateDOM", ["ErrorUtils", "Run", "TimeSlice", "emptyFunction", "gkx", "requestAnimationFrame"], (function(a, b, c, d, e, f) {
    var g, h, i, j = [],
        k = {};

    function l(a, c, d) {
        if (!a && !c) return {
            cancel: b("emptyFunction")
        };
        if (d && Object.prototype.hasOwnProperty.call(k, d)) return {
            cancel: b("emptyFunction")
        };
        else d && (k[d] = 1);
        c = b("TimeSlice").guard(c || b("emptyFunction"), "queryThenMutateDOM mutation callback", {
            propagationType: b("TimeSlice").PropagationType.CONTINUATION,
            registerCallStack: !0
        });
        a = b("TimeSlice").guard(a || b("emptyFunction"), "queryThenMutateDOM query callback", {
            propagationType: b("TimeSlice").PropagationType.CONTINUATION,
            registerCallStack: !0
        });
        var e = {
            queryFunction: a,
            mutateFunction: c,
            output: null,
            deleted: !1
        };
        j.push(e);
        n();
        h || (h = !0, b("gkx")("708253") || b("Run").onLeave(function() {
            h = !1, i = !1, k = {}, j.length = 0
        }));
        return {
            cancel: function() {
                e.deleted = !0, d && delete k[d]
            }
        }
    }
    l.prepare = function(a, b, c) {
        return function() {
            for (var d = arguments.length, e = new Array(d), f = 0; f < d; f++) e[f] = arguments[f];
            e.unshift(this);
            var g = Function.prototype.bind.apply(a, e),
                h = b.bind(this);
            l(g, h, c)
        }
    };
    var m = b("TimeSlice").guard(function() {
        while (j.length) {
            k = {};
            var a = [];
            window.document.body.getClientRects();
            while (j.length) {
                var b = j.shift();
                b.deleted || (b.output = o(b.queryFunction), a.push(b))
            }
            while (a.length) {
                b = a.shift();
                b.deleted || o(b.mutateFunction, null, [b.output])
            }
        }
        i = !1
    }, "queryThenMutateDOM runScheduledQueriesAndMutations", {
        propagationType: b("TimeSlice").PropagationType.ORPHAN
    });

    function n() {
        !i && j.length && (i = !0, b("requestAnimationFrame")(m))
    }

    function o(a, c, d, e, f) {
        return (g || (g = b("ErrorUtils"))).applyWithGuard(a, c, d, e, f)
    }
    e.exports = l
}), null);
__d("ReactDOMLegacy_DEPRECATED", ["cr:1108857", "cr:1294246"], (function(a, b, c, d, e, f, g) {
    g.createPortal = b("cr:1294246").createPortal, g.findDOMNode = b("cr:1294246").findDOMNode, g.flushSync = b("cr:1294246").flushSync, g.hydrate = b("cr:1294246").hydrate, g.render = b("cr:1294246").render, g.unmountComponentAtNode = b("cr:1294246").unmountComponentAtNode, g.unstable_batchedUpdates = b("cr:1294246").unstable_batchedUpdates, g.unstable_renderSubtreeIntoContainer = b("cr:1294246").unstable_renderSubtreeIntoContainer, g.version = b("cr:1294246").version, g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = b("cr:1294246").__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
}), 98);
__d("ReactDOM", ["ReactDOMLegacy_DEPRECATED"], (function(a, b, c, d, e, f) {
    Object.keys(importNamespace("ReactDOMLegacy_DEPRECATED")).forEach(function(a) {
        if (a === "default" || a === "__esModule") return;
        f[a] = importNamespace("ReactDOMLegacy_DEPRECATED")[a]
    })
}), null);
__d("castToEnum", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a, b, c) {
        var d = Object.keys(b);
        for (var e = 0; e < d.length; e++)
            if (b[d[e]] === a) return b[d[e]];
        return c
    }
    f["default"] = a
}), 66);
__d("filterNulls", [], (function(a, b, c, d, e, f) {
    "use strict";

    function a(a) {
        var b = [];
        for (var a = a, c = Array.isArray(a), d = 0, a = c ? a : a[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
            var e;
            if (c) {
                if (d >= a.length) break;
                e = a[d++]
            } else {
                d = a.next();
                if (d.done) break;
                e = d.value
            }
            e = e;
            e != null && b.push(e)
        }
        return b
    }
    f["default"] = a
}), 66);
__d("setByPath", ["invariant"], (function(a, b, c, d, e, f, g) {
    "use strict";

    function a(a, b, c) {
        a = a;
        for (var d = 0; d < b.length; d++) {
            var e = b[d];
            if (d === b.length - 1) {
                a[e] = c;
                return
            }!Object.prototype.hasOwnProperty.call(a, e) ? a[e] = {} : a[e] == null ? a[e] = {} : Array.isArray(a[e]) || Object.prototype.toString.call(a[e]) === "[object Object]" || g(0, 1041, a[e]);
            a = a[e]
        }
    }
    f["default"] = a
}), 66);
__d("ImmutableServerCallableWrapper", ["immutable"], (function(a, b, c, d, e, f, g) {
    "use strict";
    g["default"] = c("immutable")
}), 98);
__d("XEventsPermalinkController", ["XController"], (function(a, b, c, d, e, f) {
    e.exports = b("XController").create("/events/{?location_slug}/{?name_slug}/{event_id}/{?child_event_id}/", {
        privacy_mutation_token: {
            type: "String"
        },
        event_id: {
            type: "FBID",
            required: !0
        },
        location_slug: {
            type: "String"
        },
        name_slug: {
            type: "String"
        },
        event_time_id: {
            type: "FBID"
        },
        acontext: {
            type: "String"
        },
        active_tab: {
            type: "Enum",
            defaultValue: "about",
            enumType: 1
        },
        end_cursor: {
            type: "String"
        },
        filter: {
            type: "String"
        },
        multi_permalinks: {
            type: "String"
        },
        post_id: {
            type: "Int"
        },
        view: {
            type: "Enum",
            enumType: 1
        },
        ticket_order_id: {
            type: "FBID"
        },
        ref_page_id: {
            type: "FBID"
        },
        ti: {
            type: "String"
        },
        after_load_action: {
            type: "Enum",
            enumType: 0
        },
        child_event_id: {
            type: "FBID"
        }
    })
}), null);