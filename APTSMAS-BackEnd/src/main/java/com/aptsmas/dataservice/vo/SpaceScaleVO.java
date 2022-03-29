package com.aptsmas.dataservice.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@Schema(name = "SpaceScaleVO", description = "The Space Scale Entity VO")
public class SpaceScaleVO {
    @Schema(description = "the type of the return")
    private String type;

    @Schema(description = "the json result content string")
    private String content;
}
