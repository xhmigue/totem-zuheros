npm run build
rm -rf /Users/xhmigue/apps/php/panel_modularbox/views/pages/totem_react/*
cp -r dist/* /Users/xhmigue/apps/php/panel_modularbox/views/pages/totem_react
# cp -r assets/images /Users/xhmigue/apps/php/panel_modularbox/views/pages/totem_react/assets/images

cd /Users/xhmigue/apps/php/panel_modularbox
bash push.sh "$1"
