package com.aptsmas.dataservice.mapper;

import com.aptsmas.dataservice.entity.TimeVariantItem;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TimeVariantMapper {
    TimeVariantItem getTimeVariantItemByType(String type);
}
