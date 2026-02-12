npm run build
rm -rf /Users/xhmigue/apps/react/totem-zuheros-build
cp -r dist/* /Users/xhmigue/apps/react/totem-zuheros-build
cp .gitignore /Users/xhmigue/apps/react/totem-zuheros-build
cp -r assets/images /Users/xhmigue/apps/react/totem-zuheros-build
cp -r server/* /Users/xhmigue/apps/react/totem-zuheros-build

cd /Users/xhmigue/apps/react/totem-zuheros-build
git add .
git commit -m "$1"
git push origin build