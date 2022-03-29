package com.aptsmas.dataservice.entity;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@Accessors(chain = true)
public class PoetTravelItem implements Serializable {
    private Integer year;
    private String country;
    private String province;
    private String city;
    private String location;
}
