package com.aptsmas.dataservice.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@Schema(name = "TimeVariantVO", description = "The Time Variant Entity VO")
public class TimeVariantVO {
    @Schema(description = "the type of the return")
    private String type;

    @Schema(description = "the json result content string")
    private String content;
}
