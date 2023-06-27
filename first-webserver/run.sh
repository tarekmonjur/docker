#!/bin/bash

HOSTNAME=`hostname`
VERSION=${VERSION}

cat > /usr/share/nginx/html/index.html <<EOF
<HTML>
<HEAD>
<TITLE>This page is on $HOSTNAME and is version $VERSION</TITLE>
</HEAD><BODY>
<H1>THIS IS HOST $HOSTNAME</H1>
<H2>And we're running version: $VERSION</H2>
</BODY>
</HTML>
EOF

mkdir /usr/share/nginx/html/health
cat > /usr/share/nginx/html/health/index.html << EOF
<HTML>
<HEAD>
<TITLE>health check</TITLE>
</HEAD><BODY>
<H1>App is healthy</H1>
</BODY>
</HTML>
EOF

# run nginx on foreground by daemon off
nginx -g "daemon off;"
