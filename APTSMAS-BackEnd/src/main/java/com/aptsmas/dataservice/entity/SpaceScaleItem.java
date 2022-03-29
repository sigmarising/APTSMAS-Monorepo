package com.aptsmas.dataservice.entity;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class SpaceScaleItem {
    private String type;
    private String content;
}
