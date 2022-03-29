package com.aptsmas.dataservice.service;

import com.aptsmas.dataservice.entity.OLAMPostBody.OLAMPostBody;
import com.aptsmas.dataservice.vo.OLAMvo.OLAMVO;

public interface OLAMService {
    OLAMVO olamOperation(OLAMPostBody body);

    void olamBodyPreSorted(OLAMPostBody body);
}
