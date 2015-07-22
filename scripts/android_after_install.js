
module.exports = function(context){

    var path = context.requireCordovaModule('path'),
        fs = context.requireCordovaModule('fs'),
        projectRoot = context.opts.projectRoot,
        ConfigParser = context.requireCordovaModule('cordova-lib').configparser,
        config = new ConfigParser(path.join(projectRoot, 'config.xml'));

    console.log('setting android url scheme...');
    var packageName = config.android_packageName() || config.packageName();
    var targetFile = path.join(projectRoot, 'platforms', 'android', 'src', packageNames.replace(/\./g, path.sep), 'MainActivity.java');

    var content = fs.readFileSync(targetFile, {encoding: 'utf8'});
    if(content.indexOf('import com.mobishift.plugins.urlscheme') === -1){
        content = content.replace('import org.apache.cordova.*', 'import org.apache.cordova.*\nimport com.mobishift.plugins.urlscheme\n');

        if(content.indexOf('onResume') === -1){
            content = content.replace('@Override', '@Override\npublic void onResume(){ super.onResume(); URLScheme.urlPath = getIntent().getData().getPath(); URLScheme.urlQuery = getIntent().getData().getQuery(); }\n@Override');
        }else{
            content = content.replace('super.onResume();', 'super.onResume();URLScheme.urlPath = getIntent().getData().getPath(); URLScheme.urlQuery = getIntent().getData().getQuery();');
        }
        fs.writeFileSync(targetFile, content);
    }
};
