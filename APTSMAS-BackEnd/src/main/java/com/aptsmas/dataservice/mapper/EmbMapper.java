package com.aptsmas.dataservice.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface EmbMapper {
    List<Integer> getNormalPoetIdsById(Integer id);

    List<Integer> getAbnormalPoetIdsById(Integer id);

    String getTypeNameById(Integer id);
}
