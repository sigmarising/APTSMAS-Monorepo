package com.aptsmas.dataservice.service;

import com.aptsmas.dataservice.entity.PoetDetail;

import java.util.List;

public interface PoetService {
    PoetDetail findPoetById(Integer id);

    List<PoetDetail> findPoetsByLocationId(String id);
}
