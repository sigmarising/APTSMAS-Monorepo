package com.aptsmas.dataservice.mapper;

import com.aptsmas.dataservice.entity.PoetDetail;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PoetDetailMapper {
    PoetDetail getPoetInfoById(Integer id);

    List<PoetDetail> getPoetInfoListByIds(List<Integer> ids);

    List<Integer> getPoetIdsListByDynasty(String dynasty);
}
