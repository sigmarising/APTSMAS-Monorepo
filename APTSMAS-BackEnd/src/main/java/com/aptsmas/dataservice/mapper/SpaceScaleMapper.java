package com.aptsmas.dataservice.mapper;

import com.aptsmas.dataservice.entity.SpaceScaleItem;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SpaceScaleMapper {
    SpaceScaleItem getSpaceScaleItemByType(String type);
}
