
module.exports = function(context){

    var path = context.requireCordovaModule('path'),
        fs = context.requireCordovaModule('fs'),
        projectRoot = context.opts.projectRoot,
        ConfigParser = context.requireCordovaModule('cordova-lib').configparser,
        config = new ConfigParser(path.join(projectRoot, 'config.xml'));

    console.log('removing android url scheme setting...');
    var packageNames = config.android_packageName() || config.packageName();
    var targetFile = path.join(projectRoot, 'platforms', 'android', 'src', packageNames.replace(/\./g, path.sep), 'MainActivity.java');

    var content = fs.readFileSync(targetFile, {encoding: 'utf8'});
    if(content.indexOf('\nimport com.mobishift.plugins.urlscheme.URLScheme') >= 0){
        content = content.replace('\nimport com.mobishift.plugins.urlscheme.URLScheme;', '').replace('if(intent.getData() != null){URLScheme.urlPath = intent.getData().toString();}', '').replace('if(getIntent().getData() != null) { URLScheme.urlPath = getIntent().getData().toString();}\n', '');

        fs.writeFileSync(targetFile, content);
    }
};
