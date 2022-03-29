package com.aptsmas.dataservice.entity;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@Accessors(chain = true)
public class PoetLines implements Serializable {
    private Integer poetId;
    private Double lat;
    private Double lng;
    private String countryId;
    private String provinceId;
    private String cityId;
    private String locationId;
    private Integer visitYear;
}
