package com.aptsmas.dataservice.entity;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.List;

@Data
@Accessors(chain = true)
public class PoetTravel implements Serializable {
    private Integer id;
    private List<PoetTravelItem> travel;
}
