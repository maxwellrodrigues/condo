const path=require("path"),{merge}=require("webpack-merge"),common=require("./webpack.common.js"),CopyPlugin=require("copy-webpack-plugin");module.exports=merge(common,{mode:"production",output:{path:path.resolve(__dirname,"dist")},plugins:[new CopyPlugin({patterns:[{from:"img",to:"img"},{from:"css",to:"css"},{from:"login",to:"login"},{from:"js/vendor",to:"js/vendor"},{from:"icon.svg",to:"icon.svg"},{from:"favicon.ico",to:"favicon.ico"},{from:"robots.txt",to:"robots.txt"},{from:"icon.png",to:"icon.png"},{from:"404.html",to:"404.html"},{from:".",to:".",globOptions:{ignore:["**/node_modules/**"]}},{from:"site.webmanifest",to:"site.webmanifest"}]})]});