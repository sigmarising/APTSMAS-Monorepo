package com.aptsmas.dataservice.mapper;

import com.aptsmas.dataservice.entity.PoetLines;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PoetLinesMapper {
    List<PoetLines> getPoetLinesByPoetIds(List<Integer> ids);
}
