package com.aptsmas.dataservice.vo.OLAMvo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@Schema(name = "OLAMVecItemVO", description = "The vector item of OLAM VO")
public class OLAMVecItemVO {
    @Schema(description = "vector from XXX")
    private String from;

    @Schema(description = "vector to XXX")
    private String to;

    @Schema(description = "the value of this item")
    private Integer value;
}
