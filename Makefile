PWD:=$(shell pwd)

ADDONSDK_VERSION?=1.17
ADDONSDK?=addon-sdk-$(ADDONSDK_VERSION)
ADDONSDK_URL?=https://ftp.mozilla.org/pub/mozilla.org/labs/jetpack/$(ADDONSDK).tar.gz

all: firefox/kp-slide.xpi

firefox/kp-slide.xpi: $(ADDONSDK) firefox/data/jquery-1.11.1.min.js firefox/data/kptalks-v2-min.js firefox/data/kptalks-v2.css firefox/lib/main.js
	cd $(ADDONSDK) && source bin/activate && cd $(PWD)/firefox && cfx xpi
	@echo "Firefox extension has been generated to $@"

run: firefox/data/jquery-1.11.1.min.js firefox/data/kptalks-v2-min.js firefox/data/kptalks-v2.css
	cd $(ADDONSDK) && source bin/activate && cd $(PWD)/firefox && cfx run

$(ADDONSDK):
	wget -qO- $(ADDONSDK_URL) | tar xvz

firefox/data/jquery-1.11.1.min.js:
	wget -O $@ http://code.jquery.com/jquery-1.11.1.min.js

firefox/data/kptalks-v2-min.js: src/kptalks-v2-min.js
	cp $? $@

firefox/data/kptalks-v2.css: src/kptalks-v2.css
	cp $? $@

.PHONY: chrome
chrome: chrome/jquery-1.11.1.min.js chrome/kptalks-v2-min.js chrome/kptalks-v2.css

chrome/jquery-1.11.1.min.js:
	wget -O $@ http://code.jquery.com/jquery-1.11.1.min.js

chrome/kptalks-v2-min.js: src/kptalks-v2-min.js
	cp $? $@

chrome/kptalks-v2.css: src/kptalks-v2.css
	cp $? $@

clean:
	rm -rf addon-sdk-* firefox/data/jquery-1.11.1.min.js firefox/data/kptalks-* chrome/kptalks-* chrome/jquery-1.11.1.min.js
