
all: firefox/data/jquery-1.11.1.min.js firefox/data/kptalks-v1-min.js

firefox/data/jquery-1.11.1.min.js:
	wget -O $@ http://code.jquery.com/jquery-1.11.1.min.js

firefox/data/kptalks-v1-min.js: src/kptalks-v1-min.js
	cp $? $@

