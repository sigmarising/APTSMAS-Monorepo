package com.aptsmas.dataservice.service;

import com.aptsmas.dataservice.vo.TimeVariantVO;

public interface TimeVariantService {
    TimeVariantVO getContentBySearchType(String type);
}
