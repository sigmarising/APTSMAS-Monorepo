package com.aptsmas.dataservice.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface GeoMapper {
    List<String> getLocationIdsFromCountryIds(List<String> ids);

    List<String> getLocationIdsFromProvinceIds(List<String> ids);

    List<String> getLocationIdsFromCityIds(List<String> ids);
}
