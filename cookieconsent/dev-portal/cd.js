var cookiedeclarationserial = '85eb28ca-a284-4a5a-bc2a-df9e38fc9635';
var cookiedeclarationjumpURL = 'https://consent.cookiebot.com/85eb28ca-a284-4a5a-bc2a-df9e38fc9635/cdreport.js';
var CookieDeclaration, CookiePolicy;
"undefined" == typeof CookieControl && (CookieControl = {}), CookieControl.CookieDeclaration = function () {
  this.iswhitelabel = !1, this.scriptId = "CookieDeclaration", this.scriptElement = null, this.isInternalAlias = !1, this.geoRegions = [], this.culture = "en", this.userCulture = "en-GB", this.lastUpdatedDate = null, this.init = function () {
    var e = "", t = document.getElementById(this.scriptId);
    if (!(t && "script" == t.tagName.toLowerCase() || (this.iswhitelabel = !0, this.scriptId = "CookiePolicy", (t = document.getElementById(this.scriptId)) && "script" == t.tagName.toLowerCase()))) {
      var o = document.getElementsByTagName("script");
      for (i = 0; i < o.length; i++) {
        var n = o[i];
        if (this.hasAttr(n, "src") && 0 < n.getAttribute("src").toLowerCase().indexOf(cookiedeclarationserial.toLowerCase() + "/cd.js")) {
          t = n;
          break
        }
      }
      t && (this.hasAttr(t, "src") && 0 < t.getAttribute("src").toLowerCase().indexOf("consent.cookiebot.com") ? (this.scriptId = "CookieDeclaration", t.id = "CookieDeclaration", this.iswhitelabel = !1) : t.id = "CookiePolicy")
    }
    if (this.iswhitelabel || (window.CookiebotCookieDeclaration = this), t) {
      this.scriptElement = t, e = 0 < cookiedeclarationjumpURL.indexOf("?domain=") ? "&whitelabel=" + this.iswhitelabel + "&referer=" + encodeURIComponent(window.location.href) : "?whitelabel=" + this.iswhitelabel + "&referer=" + encodeURIComponent(window.location.href);
      var s = t.getAttribute("data-culture"), l = this.getURLParam("culture");
      l && (s = l), s && (e = e + "&culture=" + s, this.culture = s);
      var a = t.getAttribute("data-path"), r = this.getURLParam("path");
      r && (a = r), a && (e = e + "&path=" + encodeURIComponent(a));
      var c = t.getAttribute("data-georegions"), d = this.getURLParam("georegions");
      d && (c = d), c && (this.registerGeoRegions(c), 0 < this.geoRegions.length && (e = e + "&georegions=" + encodeURIComponent(JSON.stringify(this.geoRegions)))), this.getScript(cookiedeclarationjumpURL + e, !0)
    } else setTimeout(function () {
      CookieDeclaration.init()
    }, 100)
  }, this.getScript = function (e, t) {
    var o = document.getElementsByTagName("script")[0], i = document.createElement("script");
    i.type = "text/javascript", i.charset = "UTF-8", i.async = void 0 === t || t, i.src = e, o.parentNode.insertBefore(i, o)
  }, this.setTableCellTitles = function () {
    if ("undefined" == typeof CookieConsent) {
      var e = document.getElementById("CookieDeclarationUserStatusPanel");
      e && (e.style.display = "none")
    } else this.SetUserStatusLabel();
    if (document.getElementsByClassName) for (var t = document.getElementsByClassName("CookieDeclarationTable"), o = 0; o < t.length; o++) for (var i, n = t[o].tBodies[0], s = 0; i = n.rows[s]; s++) for (var l, a = 0; l = i.cells[a]; a++) 1 != a && (l.title = l.innerHTML.replace(/<br>/g, ", "))
  }, this.SetUserStatusLabel = function () {
    var e = !0;
    if ("undefined" == typeof CookieConsent || "-1" == CookieConsent.consentID || CookieConsent.isOutsideEU) e = !1; else {
      var t = !0;
      if (0 < CookieConsent.pathlist.length) {
        t = !1;
        for (var o = 0; o < CookieConsent.pathlist.length; o++) if (0 === window.location.pathname.toLowerCase().indexOf(CookieConsent.pathlist[o].toLowerCase())) {
          t = !0;
          break
        }
      }
      if (t) {
        var i = document.getElementById("CookieDeclarationUserStatusLabelOn"),
          n = document.getElementById("CookieDeclarationUserStatusLabelOff"),
          s = document.getElementById("CookieDeclarationUserStatusLabelMulti"),
          l = document.getElementById("CookieDeclarationUserStatusLabelConsentId"),
          a = document.getElementById("CookieDeclarationUserStatusLabelConsentDate"),
          r = document.getElementById("CookieDeclarationChangeConsent"),
          c = document.getElementById("CookieDeclarationDoNotSell"),
          d = document.getElementById("CookieDeclarationUserStatusLabelOffDoNotSell"),
          C = document.getElementById("CookieDeclarationConsentIdAndDate");
        if (null != i && null != n) {
          var u = document.getElementById("CookieDeclarationUserStatusPanel");
          if (u && (this.hasAttr(u, "data-responseMode") && (CookieConsent.responseMode = u.getAttribute("data-responseMode")), this.hasAttr(u, "data-dialogtemplate") && u.getAttribute("data-dialogtemplate")), 0 != CookieConsent.consentID && null != C && (C.style.display = "block"), null != l && (l.innerHTML = CookieConsent.consentID), null != a && null != CookieConsent.consentUTC) {
            var h = {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              timeZoneName: "short"
            };
            try {
              a.innerHTML = CookieConsent.consentUTC.toLocaleString(this.culture, h)
            } catch (e) {
              a.innerHTML = CookieConsent.consentUTC.toLocaleString("EN", h)
            }
          }
          var y = "optionaloptin" == CookieConsent.responseMode;
          if ("leveloptin" == CookieConsent.responseMode || "inlineoptin" == CookieConsent.responseMode || y) if (0 == CookieConsent.consent.preferences && 0 == CookieConsent.consent.statistics && 0 == CookieConsent.consent.marketing) i.style.display = "none", y ? (this.SetPropertyVisible(d, "block"), n.style.display = "none", s.style.display = "none") : (n.style.display = "block", s.style.display = "none", this.SetPropertyVisible(d, "none")), y && 0 != CookieConsent.consentID && (n.style.display = "none", this.SetPropertyVisible(d, "block"), this.SetPropertyVisible(r, "block"), this.SetPropertyVisible(c, "none")); else {
            i.style.display = "none", n.style.display = "none", s.style.display = "inline-block", y && 0 != CookieConsent.consentID && (this.SetPropertyVisible(d, "none"), this.SetPropertyVisible(r, "none"), this.SetPropertyVisible(c, "block"));
            var g = document.getElementById("CookieDeclarationUserStatusLabelMultiSettingsPref");
            CookieConsent.consent.preferences ? g.style.display = "inline" : g.style.display = "none";
            var p = document.getElementById("CookieDeclarationUserStatusLabelMultiSettingsStat");
            CookieConsent.consent.statistics ? p.style.display = "inline" : p.style.display = "none";
            var m = document.getElementById("CookieDeclarationUserStatusLabelMultiSettingsMark");
            CookieConsent.consent.marketing ? m.style.display = "inline" : m.style.display = "none"
          } else s.style.display = "none", CookieConsent.consented ? (i.style.display = "inline-block", n.style.display = "none") : (i.style.display = "none", n.style.display = "inline-block")
        }
      } else e = !1
    }
    if (e) {
      var k = document.getElementById("CookieDeclarationUserStatusPanel");
      if (k) {
        k.style.display = "block";
        var f = document.getElementById("CookieDeclarationUserStatusLabelWithdraw");
        (CookieConsent.consent.preferences || CookieConsent.consent.statistics || CookieConsent.consent.marketing) && CookieConsent.consented ? f.style.display = "inline-block" : f.style.display = "none"
      }
    }
  }, this.SetPropertyVisible = function (e, t) {
    null != e && (e.style.display = t)
  }, this.hasAttr = function (e, t) {
    return e.hasAttribute ? e.hasAttribute(t) : !!e.getAttribute(t)
  }, this.InjectCookieDeclaration = function (e) {
    var t = document.createElement("div");
    if (void 0 !== this.userCulture && null != this.userCulture && void 0 !== this.lastUpdatedDate && null != this.lastUpdatedDate) {
      var o = {timeZone: "UTC", dateStyle: "short"}, i = "", n = new Date(this.lastUpdatedDate);
      try {
        i = n.toLocaleDateString(this.userCulture, o)
      } catch (e) {
        i = n.toLocaleDateString("en-GB", o)
      }
      e = e.replace(/\[#LOCALIZED_CRAWLDATE#\]/g, i)
    }
    t.innerHTML = e;
    var s = document.getElementById(this.scriptId), l = (s = s || this.scriptElement).parentNode.insertBefore(t, s);
    if (this.isInternalAlias) {
      var a = document.createElement("div");
      a.innerHTML = "TEST", a.style.position = "relative", a.style.fontSize = "200px", a.style.opacity = "0.25", a.style.fontWeight = "bold", a.style.overflow = "visible", a.style.pointerEvents = "none", a.style.height = "0", a.style.width = "0", a.style.right = "0", l.insertBefore(a, l.firstChild)
    }
    this.setTableCellTitles(), "function" == typeof CookiebotCallback_OnDialogLoad && CookiebotCallback_OnDialogLoad()
  }, this.getURLParam = function (e) {
    var t = document.getElementById(this.scriptId);
    if ((t = t || this.scriptElement) && (e = new RegExp("[?&]" + encodeURIComponent(e) + "=([^&#]*)").exec(t.src))) return decodeURIComponent(e[1].replace(/\+/g, " "))
  }, this.registerGeoRegions = function (t) {
    if (this.geoRegions && 0 == this.geoRegions.length && t && 0 < t.length) {
      var e = '{"configs": [' + t.replace(/'/g, '"') + "]}";
      try {
        var o = JSON.parse(e);
        if (o.configs) for (var i = 0; i < o.configs.length; i++) o.configs[i].region && o.configs[i].cbid && this.geoRegions.push({
          r: o.configs[i].region,
          i: o.configs[i].cbid
        })
      } catch (e) {
        this.log("ERROR IN GEO-REGIONS ATTRIBUTE VALUE ON COOKIE DECLARATION TAG - NOT A VALID JSON ARRAY: " + t)
      }
    }
  }, this.init()
}, CookiePolicy = CookieDeclaration = new CookieControl.CookieDeclaration;

