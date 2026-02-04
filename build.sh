npm run build
cp -r dist/* /Users/xhmigue/apps/react/totem-zuheros-build
cp -r assets /Users/xhmigue/apps/react/totem-zuheros-build

cd /Users/xhmigue/apps/react/totem-zuheros-build
git add .
git commit -m "$1"
git push origin build