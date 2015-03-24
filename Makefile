PWD:=$(shell pwd)

ADDONSDK_VERSION?=1.17
ADDONSDK?=addon-sdk-$(ADDONSDK_VERSION)
ADDONSDK_URL?=https://ftp.mozilla.org/pub/mozilla.org/labs/jetpack/$(ADDONSDK).tar.gz

all: firefox/yifan-slideshow.xpi

firefox/yifan-slideshow.xpi: $(ADDONSDK) firefox/data/jquery-1.11.1.min.js firefox/data/yifansays.js firefox/data/yifansays.css firefox/lib/main.js
	cd $(ADDONSDK) && source bin/activate && cd $(PWD)/firefox && cfx xpi
	@echo "Firefox extension has been generated to $@"

run: firefox/data/jquery-1.11.1.min.js firefox/data/yifansays.js firefox/data/yifansays.css
	cd $(ADDONSDK) && source bin/activate && cd $(PWD)/firefox && cfx run

$(ADDONSDK):
	wget -qO- $(ADDONSDK_URL) | tar xvz

firefox/data/jquery-1.11.1.min.js:
	wget -O $@ http://code.jquery.com/jquery-1.11.1.min.js

firefox/data/yifansays.js: src/yifansays.js
	cp $? $@

firefox/data/yifansays.css: src/yifansays.css
	cp $? $@

.PHONY: chrome
chrome: chrome/jquery-1.11.1.min.js chrome/yifansays.js chrome/yifansays.css

chrome/jquery-1.11.1.min.js:
	wget -O $@ http://code.jquery.com/jquery-1.11.1.min.js

chrome/yifansays.js: src/yifansays.js
	cp $? $@

chrome/yifansays.css: src/yifansays.css
	cp $? $@

clean:
	rm -rf addon-sdk-* firefox/data/jquery-1.11.1.min.js firefox/data/yifansays* chrome/yifansays* chrome/jquery-1.11.1.min.js
