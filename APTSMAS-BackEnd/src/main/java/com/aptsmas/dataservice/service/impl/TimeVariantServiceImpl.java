package com.aptsmas.dataservice.service.impl;

import com.aptsmas.dataservice.entity.TimeVariantItem;
import com.aptsmas.dataservice.mapper.TimeVariantMapper;
import com.aptsmas.dataservice.service.TimeVariantService;
import com.aptsmas.dataservice.vo.TimeVariantVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class TimeVariantServiceImpl implements TimeVariantService {
    private final TimeVariantMapper timeVariantMapper;

    @Autowired
    public TimeVariantServiceImpl(TimeVariantMapper timeVariantMapper) {
        this.timeVariantMapper = timeVariantMapper;
    }

    @Override
    @Cacheable("TimeVariantServiceGetContentBySearchType")
    public TimeVariantVO getContentBySearchType(String type) {
        TimeVariantItem timeVariantItem = timeVariantMapper.getTimeVariantItemByType(type);
        log.info("Query by type={} result={}", type, timeVariantItem);

        TimeVariantVO timeVariantVO = new TimeVariantVO();
        BeanUtils.copyProperties(timeVariantItem, timeVariantVO);

        return timeVariantVO;
    }
}
