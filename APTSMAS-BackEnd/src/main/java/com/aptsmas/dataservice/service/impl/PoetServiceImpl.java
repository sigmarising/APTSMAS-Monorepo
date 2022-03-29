package com.aptsmas.dataservice.service.impl;

import com.aptsmas.dataservice.entity.GeoPoet;
import com.aptsmas.dataservice.entity.PoetDetail;
import com.aptsmas.dataservice.mapper.GeoPoetMapper;
import com.aptsmas.dataservice.mapper.PoetDetailMapper;
import com.aptsmas.dataservice.service.PoetService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class PoetServiceImpl implements PoetService {
    private final PoetDetailMapper poetMapper;
    private final GeoPoetMapper geoPoetMapper;

    @Autowired
    public PoetServiceImpl(PoetDetailMapper poetMapper, GeoPoetMapper geoPoetMapper) {
        this.poetMapper = poetMapper;
        this.geoPoetMapper = geoPoetMapper;
    }

    @Override
    @Cacheable("PoetServiceFindPoetById")
    public PoetDetail findPoetById(Integer id) {
        PoetDetail poetDetail = poetMapper.getPoetInfoById(id);
        log.info("Query by id={} result={}", id, poetDetail);

        return poetMapper.getPoetInfoById(id);
    }

    @Override
    @Cacheable("PoetServiceFindPoetsByLocationId")
    public List<PoetDetail> findPoetsByLocationId(String id){
        List<GeoPoet> geoPoetList = geoPoetMapper.getEntitiesByGeoId(id);
        List<Integer> poetIds = geoPoetList.stream().map(GeoPoet::getPoetId).collect(Collectors.toList());

        return poetMapper.getPoetInfoListByIds(poetIds);
    }
}
