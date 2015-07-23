
module.exports = function(context){
    var path = context.requireCordovaModule('path'),
        fs = context.requireCordovaModule('fs'),
        projectRoot = context.opts.projectRoot,
        ConfigParser = context.requireCordovaModule('cordova-lib').configparser,
        config = new ConfigParser(path.join(projectRoot, 'config.xml')),
        appName = config.name() || 'CordovaApp';

    console.log('removing ios url scheme setting...');

    var targetFile = path.join(projectRoot, 'platforms', 'ios', appName, 'Classes', 'AppDelegate.m');

    var content = fs.readFileSync(targetFile, { encoding: 'utf8'});
    if(content.indexOf('#import "URLSCheme.h"') >= 0){
        content = content.replace('\n#import "URLSCheme.h"', '').replace('[URLScheme setUrlPath: [url absoluteString]];\n', '');

        fs.writeFileSync(targetFile, content);
    }
};
