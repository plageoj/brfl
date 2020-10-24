echo "<p><small>{{t(\"updated_at\")}}:" > page/$1.html
echo "<time pubdate datetime=\"$(date -R)\">{{date(\"$(date -R)\")}}</time></small></p>" >> page/$1.html
echo "<md-toc content='" >> page/$1.html