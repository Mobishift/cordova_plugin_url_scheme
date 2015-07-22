
module.exports = function(context){
    var path = context.requireCordovaModule('path'),
        fs = context.requireCordovaModule('fs'),
        projectRoot = context.opts.projectRoot,
        ConfigParser = context.requireCordovaModule('cordova-lib').configparser,
        config = new ConfigParser(path.join(projectRoot, 'config.xml')),
        appName = config.name() || 'CordovaApp';

    console.log('setting ios url scheme...');
    var targetFile = path.join(projectRoot, 'platforms', 'ios', appName, 'Classes', 'AppDelegate.m');
    var content = fs.readFileSync(targetFile, {encoding: 'utf8'});
    if(content.indexOf('URLscheme.m') === -1){
        content = content.replace('#import <Cordova/CDVPlugin.h>', '#import <Cordova/CDVPlugin.h>\n#import "URLSCheme.h"');

        var index = content.indexOf('// all plugins will get the notification, and their handlers will be called');
        subString = content.substring(index);
        content = content.substring(0, index);
        content += "[URLScheme setUrlPath: [url path]];\n[URLScheme setUrlQuery: [url query]];\n";
        content += subString;
        fs.writeFileSync(targetFile, content);
    }
};
