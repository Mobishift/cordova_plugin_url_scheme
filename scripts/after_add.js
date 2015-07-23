
module.exports = function(context){

    var path = context.requireCordovaModule('path'),
        fs = context.requireCordovaModule('fs'),
        projectRoot = context.opts.projectRoot,
        ConfigParser = context.requireCordovaModule('cordova-lib').configparser,
        config = new ConfigParser(path.join(projectRoot, 'config.xml'));

    var pluginDir = path.join(projectRoot, 'plugins', 'com.mobishift.plugins.URLScheme', 'plugin.xml');
    var content = fs.readFileSync(pluginDir, {encoding: 'utf8'});
    var urlscheme = config.getPreference('urlscheme');
    if(!urlscheme){
        var packageNames = config.packageName().split('.');
        urlscheme = packageNames[packageNames.length - 1];
    }

    console.log('set url scheme to ' + urlscheme);
    content = content.replace(/{{URL_SCHEME}}/g, urlscheme);
    fs.writeFileSync(pluginDir, content);
};
