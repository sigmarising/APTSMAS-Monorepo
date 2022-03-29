package com.aptsmas.dataservice.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@Accessors(chain = true)
public class PoetDetail implements Serializable {
    private Integer id;
    private String name;
    private String dynasty;
    private Integer lifeStart;
    private Integer lifeEnd;
    private String mapConfig;
    private String reference;
    private String agesDetail;
    private String travelDetail;
}
