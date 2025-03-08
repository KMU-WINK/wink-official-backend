package com.github.son_daehyeon.global.communication.msg;

import java.util.Collection;

public interface SmsSender {

	void send(Collection<SmsObject> smsObjects);
	int remain();
}
