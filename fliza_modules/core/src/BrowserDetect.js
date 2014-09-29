var BrowserDetect = {
    ua  : navigator.userAgent,
    andrioid_version:100,
    isAndroid:false,
    init: function () {
        this.OS = this.searchString(this.dataOS()) || "an unknown OS";
        this.Browser = this.searchBrowser(this.dataB());
        if(this.OS == 'iPhone' || this.OS == 'iPad' || this.OS == 'Android' || this.OS == 'Winphone' ){
            this.mobile = true;
        }else{
            this.mobile = false;
        }
        if(/Android (\d+\.\d+)/.test(navigator.userAgent)){
            this.andrioid_version = RegExp.$1;
            this.isAndroid = true;
        }
    },
    searchString: function (data) {
        for (var i=0;i<data.length;i++)	{
            var dataString = data[i].string;
            if (dataString) {
                if (dataString.indexOf(data[i].forSearch) != -1)
                    return data[i].forShow;
            }
        }
    },
    searchBrowser: function(data){
        var result = '';
        for (var i=0;i<data.length;i++)	{
            var dataString = data[i].string;
            if (dataString) {
                if (dataString.indexOf(data[i].forSearch) != -1){
                    result += data[i].forShow + '|';
                }
            }
        }
        return result;
    },
    dataOS : function(){
        return [
            {
                string: navigator.platform,
                forSearch: "Win",
                forShow: "Windows"
            },
            {
                string: navigator.platform,
                forSearch: "Mac",
                forShow: "Mac"
            },
            {
                string: this.ua,
                forSearch: "iPhone",
                forShow: "iPhone"
            },
            {
                string: this.ua,
                forSearch: "iPad",
                forShow: "iPad"
            },
            {
                string: this.ua,
                forSearch: "Android",
                forShow: "Android"
            },
            {
                string: this.ua,
                forSearch: "Windows Phone",
                forShow: "Winphone"
            }
        ];
    },
    dataB: function(){
        return [
            {
                string: this.ua,
                forSearch: "360browser",
                forShow: "360"
            },
            {
                string: this.ua,
                forSearch: "Maxthon",
                forShow: "Maxthon"
            },
            {
                string: this.ua,
                forSearch: "UCBrowser",
                forShow: "uc"
            },
            {
                string: this.ua,
                forSearch: "Oupeng",
                forShow: "opera"
            },
            {
                string: this.ua,
                forSearch: "Opera",
                forShow: "opera"
            },
            {
                string: this.ua,
                forSearch: "Sogou",
                forShow: "sogou"
            },
            {
                string: this.ua,
                forSearch: "baidu",
                forShow: "baidu"
            },
            {
                string: this.ua,
                forSearch: "Safari",
                forShow: "safari"
            },
            {
                string: this.ua,
                forSearch: "MicroMessenger",
                forShow: "weixin"
            },
            {
                string: this.ua,
                forSearch: "QQ/",
                forShow: "qq"
            },
            {
                string: this.ua,
                forSearch: "Weibo",
                forShow: "weibo"
            },
            {
                string: this.ua,
                forSearch: "MQBrowser",
                forShow: "360"
            },
            {
                string: this.ua,
                forSearch: "MQQBrowser",
                forShow: "qqbrowser"
            },
            {
                string: this.ua,
                forSearch: "CriOS",
                forShow: "Maxthon"
            }
        ];
    }

};

BrowserDetect.init();

Fui.client = BrowserDetect;