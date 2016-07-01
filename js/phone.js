var util = {
        //判断是否为微信打开
        isWeiXin: function(opts) {
            var ua = window.navigator.userAgent.toLowerCase();
            var appId = document.getElementById("appId").value;
            var timestamp = document.getElementById("timestamp").value;
            var nonceStr = document.getElementById("nonceStr").value;
            var signature = document.getElementById("signature").value;
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {

                config(appId, timestamp, nonceStr, signature, opts.title, opts.contents, opts.link, opts.icon, function() {
                    //分享成功回调函数
                });
            } else {
                return false;
            }
        },
        /**
         * 判断手机横竖屏并给出提示
         */
        orient: function() {
            if (window.orientation == 90 || window.orientation == -90) {
                //横屏

                return false;
            } else if (window.orientation == 0 || window.orientation == 180) {
                //竖屏

                return false;
            }
        },
        phoneCode: function(sPhone) {
                if (!(/^1[3|4|5|8] \d{9}$/.test(sPhone))) {
                    return false;
                } else {
                    return true;
                }
            }

        };
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", util.orient, false);
        var browser = {
            versions: function() {
                var u = navigator.userAgent,
                    app = navigator.appVersion;
                return {
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                    weixin: u.indexOf('MicroMessenger') > -1
                };
            }(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        };

        function downloadFun() {

            if (browser.versions.weixin) {
                //  微信下 跳转 提示页面
                window.location.href = window.location.host + "down/wap_down_linger1.html";
            } else {
                if (browser.versions.android) {
                    //  android
                    window.location.href = "http://download.shengli.com/20160324/waphanghaiwang_910002.apk";
                } else if (browser.versions.ios) {
                    window.location.href = "https://itunes.apple.com/cn/app/hang-hai-wang-qiang-zhe-zhi/id1068435609?l=zh&ls=1&mt=8";
                    // ios

                }

            }
        }
        window.onload = function() {
            util.orient();
            util.isWeiXin({ title: "", contents: "", link: "", icon: "" });
            document.querySelectorAll(".downGame").onclick = function() {
                downloadFun();
            };
        };
