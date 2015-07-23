
module.exports = function(context){

    var path = context.requireCordovaModule('path'),
        fs = context.requireCordovaModule('fs'),
        projectRoot = context.opts.projectRoot,
        ConfigParser = context.requireCordovaModule('cordova-lib').configparser,
        config = new ConfigParser(path.join(projectRoot, 'config.xml'));

    console.log('setting android url scheme...');
    var packageNames = config.android_packageName() || config.packageName();
    var targetFile = path.join(projectRoot, 'platforms', 'android', 'src', packageNames.replace(/\./g, path.sep), 'MainActivity.java');

    var content = fs.readFileSync(targetFile, {encoding: 'utf8'});
    if(content.indexOf('import com.mobishift.plugins.urlscheme') === -1){
        content = content.replace('import org.apache.cordova.*', 'import org.apache.cordova.*;\nimport com.mobishift.plugins.urlscheme.URLScheme');

        content = content.replace('loadUrl(launchUrl);', 'if(getIntent().getData() != null) { URLScheme.urlPath = getIntent().getData().toString();}\nloadUrl(launchUrl);');
        if(content.indexOf('onNewIntent') === -1){
            content = content.replace('@Override', '@Override\npublic void onNewIntent(){ super.onNewIntent(intent); if(intent.getData() != null){URLScheme.urlPath = intent.getData().toString();} }\n@Override');
        }else{
            content = content.replace('super.onNewIntent(intent);', 'super.onNewIntent(intent); if(intent.getData() != null){URLScheme.urlPath = intent.getData().toString();}');
        }
        fs.writeFileSync(targetFile, content);
    }
};
