package com.aptsmas.dataservice.service;

import com.aptsmas.dataservice.vo.Embeddingvo.EmbVO;
import com.fasterxml.jackson.core.JsonProcessingException;

public interface EmbService {
    EmbVO getEmbResult(Integer typeId) throws JsonProcessingException;

    boolean isTypeIdValid(Integer typeId);
}
