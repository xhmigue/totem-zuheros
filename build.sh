sed -i '' 's/^BASE_NAME=.*/BASE_NAME=\//' .env
npm run build
rm -r /Users/xhmigue/apps/react/totem-zuheros-build/*
cp -r dist/* /Users/xhmigue/apps/react/totem-zuheros-build
cp .gitignore /Users/xhmigue/apps/react/totem-zuheros-build
cp -r assets/images /Users/xhmigue/apps/react/totem-zuheros-build
cp -r server/* /Users/xhmigue/apps/react/totem-zuheros-build

sed -i '' 's/^BASE_NAME=.*/BASE_NAME=\/views\/pages\/totem_react\//' .env
cd /Users/xhmigue/apps/react/totem-zuheros-build
git add .
git commit -m "$1"
git push origin build

