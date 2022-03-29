package com.aptsmas.dataservice.mapper;

import com.aptsmas.dataservice.entity.GeoPoet;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface GeoPoetMapper {
    List<GeoPoet> getEntitiesByGeoId(String geoId);
}
