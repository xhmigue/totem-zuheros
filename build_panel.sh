npm run build
rm -rf /Users/xhmigue/Desktop/php/panel_modularbox/views/pages/totem_react/*
cp -r dist/* /Users/xhmigue/Desktop/php/panel_modularbox/views/pages/totem_react
# cp -r assets/images /Users/xhmigue/Desktop/php/panel_modularbox/views/pages/totem_react/assets/images

cd /Users/xhmigue/Desktop/php/panel_modularbox
bash push.sh "$1"
