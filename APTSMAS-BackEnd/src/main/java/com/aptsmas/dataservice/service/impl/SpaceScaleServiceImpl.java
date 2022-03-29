package com.aptsmas.dataservice.service.impl;

import com.aptsmas.dataservice.entity.SpaceScaleItem;
import com.aptsmas.dataservice.mapper.SpaceScaleMapper;
import com.aptsmas.dataservice.service.SpaceScaleService;
import com.aptsmas.dataservice.vo.SpaceScaleVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class SpaceScaleServiceImpl implements SpaceScaleService {
    private final SpaceScaleMapper spaceScaleMapper;

    @Autowired
    public SpaceScaleServiceImpl(SpaceScaleMapper spaceScaleMapper) {
        this.spaceScaleMapper = spaceScaleMapper;
    }

    @Override
    @Cacheable("SpaceScaleServiceGetContentBySearchType")
    public SpaceScaleVO getContentBySearchType(String type) {
        SpaceScaleItem spaceScaleItem = spaceScaleMapper.getSpaceScaleItemByType(type);
        log.info("Query by type={} result={}", type, spaceScaleItem);

        SpaceScaleVO spaceScaleVO = new SpaceScaleVO();
        BeanUtils.copyProperties(spaceScaleItem, spaceScaleVO);

        return spaceScaleVO;
    }
}
