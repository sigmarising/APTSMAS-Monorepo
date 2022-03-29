package com.aptsmas.dataservice.entity;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class TrajectoryPoint {
    private Double lat;
    private Double lng;
}
