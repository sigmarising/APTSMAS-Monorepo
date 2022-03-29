package com.aptsmas.dataservice.entity;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@Accessors(chain = true)
public class GeoPoet implements Serializable {
    private String geoId;
    private Integer poetId;
}
